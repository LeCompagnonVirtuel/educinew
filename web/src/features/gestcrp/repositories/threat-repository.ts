import { SupabaseClient } from '@supabase/supabase-js';
import {
  GestcrpThreatIndicatorError,
  GestcrpThreatFeedError,
  GestcrpThreatAnalysisError,
} from '@educi/errors';
import {
  GestcrpBaseEntity,
  GestcrpCrudRepository,
  PaginatedResult,
  PaginationParams,
  createGestcrpCrudRepository,
} from './base-gestcrp-repository';

// ============================================================================
// Threat Entity Interfaces
// ============================================================================

export interface GestcrpThreatIndicator extends GestcrpBaseEntity {
  type: 'IP' | 'DOMAIN' | 'URL' | 'FILE_HASH' | 'EMAIL' | 'CVE' | 'YARA' | 'Sigma' | 'BEHAVIOR' | 'TTP';
  value: string;
  confidence: number;
  severity: string;
  category: string;
  source: string;
  tags: string[];
  description: string;
  first_seen: string;
  last_seen: string;
  expiry?: string;
  mitre_attack_ids: string[];
  associated_threats: string[];
}

export interface GestcrpThreatFeed extends GestcrpBaseEntity {
  name: string;
  url: string;
  feed_type: 'STIX' | 'TAXII' | 'CSV' | 'JSON' | 'MISP' | 'CUSTOM';
  format: string;
  refresh_interval_minutes: number;
  enabled: boolean;
  last_synced_at?: string;
  indicators_count: number;
  reliability: number;
}

export interface GestcrpThreatAnalysis extends GestcrpBaseEntity {
  threat_id: string;
  analyst: string;
  methodology: string;
  findings: Record<string, unknown>[];
  risk_assessment: Record<string, unknown>;
  recommendations: string[];
  evidence: string[];
}

export interface GestcrpThreatFeedMatch extends GestcrpBaseEntity {
  feed_id: string;
  indicator_id: string;
  matched_event: string;
  confidence: number;
  acknowledged: boolean;
  acknowledged_by?: string;
}

// ============================================================================
// Table Names
// ============================================================================

export const THREAT_TABLE_NAMES = {
  indicators: 'gestcrp_threat_indicators',
  feeds: 'gestcrp_threat_feeds',
  analyses: 'gestcrp_threat_analyses',
  feedMatches: 'gestcrp_threat_feed_matches',
} as const;

// ============================================================================
// Repository Interface
// ============================================================================

export interface ThreatRepository {
  indicators: GestcrpCrudRepository<GestcrpThreatIndicator>;
  feeds: GestcrpCrudRepository<GestcrpThreatFeed>;
  analyses: GestcrpCrudRepository<GestcrpThreatAnalysis>;
  feedMatches: GestcrpCrudRepository<GestcrpThreatFeedMatch>;
  findActiveFeeds(schoolId: string): Promise<PaginatedResult<GestcrpThreatFeed>>;
  findByCategory(category: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpThreatIndicator>>;
}

// ============================================================================
// Factory
// ============================================================================

export function createThreatRepository(supabase: SupabaseClient): ThreatRepository {
  const crud = <T extends GestcrpBaseEntity>(table: string): GestcrpCrudRepository<T> =>
    createGestcrpCrudRepository<T>(supabase, table);

  return {
    indicators: crud<GestcrpThreatIndicator>(THREAT_TABLE_NAMES.indicators),
    feeds: crud<GestcrpThreatFeed>(THREAT_TABLE_NAMES.feeds),
    analyses: crud<GestcrpThreatAnalysis>(THREAT_TABLE_NAMES.analyses),
    feedMatches: crud<GestcrpThreatFeedMatch>(THREAT_TABLE_NAMES.feedMatches),

    async findActiveFeeds(schoolId: string) {
      const { data, error, count } = await supabase
        .from(THREAT_TABLE_NAMES.feeds)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('enabled', true)
        .is('deleted_at', null)
        .order('indicators_count', { ascending: false });

      if (error) {
        throw new GestcrpThreatFeedError(
          `Erreur lors de la récupération des flux actifs: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpThreatFeed[],
        total: count || 0,
        offset: 0,
        limit: data?.length || 0,
      };
    },

    async findByCategory(category: string, schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(THREAT_TABLE_NAMES.indicators)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('category', category)
        .is('deleted_at', null)
        .order('severity', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpThreatIndicatorError(
          `Erreur lors de la récupération par catégorie: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpThreatIndicator[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },
  };
}
