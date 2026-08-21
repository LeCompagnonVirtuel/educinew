import { SupabaseClient } from '@supabase/supabase-js';
import {
  GestcrpSIEMEventError,
  GestcrpSIEMRuleError,
  GestcrpSIEMCorrelationError,
} from '@educi/errors';
import {
  GestcrpBaseEntity,
  GestcrpCrudRepository,
  PaginatedResult,
  PaginationParams,
  createGestcrpCrudRepository,
} from './base-gestcrp-repository';

// ============================================================================
// SIEM Entity Interfaces
// ============================================================================

export interface GestcrpSIEMEvent extends GestcrpBaseEntity {
  source: string;
  event_type: string;
  severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  raw_log: string;
  parsed_fields: Record<string, unknown>;
  user?: string;
  ip_address?: string;
  device?: string;
  application?: string;
  tags: string[];
  ioc_matches: string[];
  correlated_events: string[];
  normalized: boolean;
  timestamp: string;
  ingested_at: string;
}

export interface GestcrpSIEMRule extends GestcrpBaseEntity {
  name: string;
  description: string;
  enabled: boolean;
  severity: string;
  event_type: string;
  conditions: Record<string, unknown>[];
  actions: Record<string, unknown>[];
  suppression_window: number;
  match_count: number;
  last_matched_at?: string;
}

export interface GestcrpSIEMCorrelation extends GestcrpBaseEntity {
  name: string;
  description: string;
  enabled: boolean;
  events: Record<string, unknown>[];
  time_window: number;
  threshold: number;
  severity: string;
  actions: Record<string, unknown>[];
}

// ============================================================================
// Table Names
// ============================================================================

export const SIEM_TABLE_NAMES = {
  events: 'gestcrp_siem_events',
  rules: 'gestcrp_siem_rules',
  correlations: 'gestcrp_siem_correlations',
} as const;

// ============================================================================
// Repository Interface
// ============================================================================

export interface SIEMRepository {
  events: GestcrpCrudRepository<GestcrpSIEMEvent>;
  rules: GestcrpCrudRepository<GestcrpSIEMRule>;
  correlations: GestcrpCrudRepository<GestcrpSIEMCorrelation>;
  findRecentEvents(schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpSIEMEvent>>;
  findActiveRules(schoolId: string): Promise<PaginatedResult<GestcrpSIEMRule>>;
  findBySourceType(source: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpSIEMEvent>>;
}

// ============================================================================
// Factory
// ============================================================================

export function createSIEMRepository(supabase: SupabaseClient): SIEMRepository {
  const crud = <T extends GestcrpBaseEntity>(table: string): GestcrpCrudRepository<T> =>
    createGestcrpCrudRepository<T>(supabase, table);

  return {
    events: crud<GestcrpSIEMEvent>(SIEM_TABLE_NAMES.events),
    rules: crud<GestcrpSIEMRule>(SIEM_TABLE_NAMES.rules),
    correlations: crud<GestcrpSIEMCorrelation>(SIEM_TABLE_NAMES.correlations),

    async findRecentEvents(schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(SIEM_TABLE_NAMES.events)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpSIEMEventError(
          `Erreur lors de la récupération des événements récents: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpSIEMEvent[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },

    async findActiveRules(schoolId: string) {
      const { data, error, count } = await supabase
        .from(SIEM_TABLE_NAMES.rules)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('enabled', true)
        .is('deleted_at', null)
        .order('match_count', { ascending: false });

      if (error) {
        throw new GestcrpSIEMRuleError(
          `Erreur lors de la récupération des règles actives: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpSIEMRule[],
        total: count || 0,
        offset: 0,
        limit: data?.length || 0,
      };
    },

    async findBySourceType(source: string, schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(SIEM_TABLE_NAMES.events)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('source', source)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpSIEMEventError(
          `Erreur lors de la récupération par source: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpSIEMEvent[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },
  };
}
