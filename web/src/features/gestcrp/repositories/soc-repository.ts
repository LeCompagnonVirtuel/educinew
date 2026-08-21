import { SupabaseClient } from '@supabase/supabase-js';
import {
  GestcrpSOCIncidentError,
  GestcrpSOCIndicatorError,
  GestcrpSOCAPTTActionError,
} from '@educi/errors';
import {
  GestcrpBaseEntity,
  GestcrpCrudRepository,
  PaginatedResult,
  PaginationParams,
  FilterParams,
  createGestcrpCrudRepository,
} from './base-gestcrp-repository';

// ============================================================================
// SOC Entity Interfaces
// ============================================================================

export interface GestcrpSOCIncident extends GestcrpBaseEntity {
  title: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'EMERGENCY';
  status: 'NEW' | 'TRIAGED' | 'INVESTIGATING' | 'CONTAINED' | 'ERADICATED' | 'RECOVERED' | 'CLOSED' | 'FALSE_POSITIVE';
  category: string;
  source: string;
  affected_systems: string[];
  affected_users: string[];
  indicators: Record<string, unknown>[];
  timeline: Record<string, unknown>[];
  apt_actions: Record<string, unknown>[];
  assigned_to?: string;
  resolved_at?: string;
  root_cause?: string;
  remediation?: string;
  lessons_learned?: string;
  risk_score: number;
  estimated_impact: number;
}

export interface GestcrpSOCIndicator extends GestcrpBaseEntity {
  incident_id: string;
  type: 'IP' | 'DOMAIN' | 'HASH' | 'URL' | 'EMAIL' | 'FILE' | 'BEHAVIOR';
  value: string;
  confidence: number;
  severity: string;
  source: string;
  tags: string[];
  first_seen: string;
  last_seen: string;
  expiry?: string;
}

export interface GestcrpAPTAction extends GestcrpBaseEntity {
  incident_id: string;
  action: string;
  parameters: Record<string, unknown>;
  executed_by: string;
  executed_at: string;
  result: 'SUCCESS' | 'FAILURE' | 'PARTIAL' | 'PENDING';
  rollback_available: boolean;
  rollback_at?: string;
}

// ============================================================================
// Table Names
// ============================================================================

export const SOC_TABLE_NAMES = {
  incidents: 'gestcrp_soc_incidents',
  indicators: 'gestcrp_soc_indicators',
  aptActions: 'gestcrp_apt_actions',
} as const;

// ============================================================================
// Repository Interface
// ============================================================================

export interface SOCRepository {
  incidents: GestcrpCrudRepository<GestcrpSOCIncident>;
  indicators: GestcrpCrudRepository<GestcrpSOCIndicator>;
  aptActions: GestcrpCrudRepository<GestcrpAPTAction>;
  findOpenIncidents(schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpSOCIncident>>;
  findBySeverity(severity: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpSOCIncident>>;
  findByIncidentId(incidentId: string, schoolId: string): Promise<PaginatedResult<GestcrpSOCIndicator>>;
}

// ============================================================================
// Factory
// ============================================================================

export function createSOCRepository(supabase: SupabaseClient): SOCRepository {
  const crud = <T extends GestcrpBaseEntity>(table: string): GestcrpCrudRepository<T> =>
    createGestcrpCrudRepository<T>(supabase, table);

  return {
    incidents: crud<GestcrpSOCIncident>(SOC_TABLE_NAMES.incidents),
    indicators: crud<GestcrpSOCIndicator>(SOC_TABLE_NAMES.indicators),
    aptActions: crud<GestcrpAPTAction>(SOC_TABLE_NAMES.aptActions),

    async findOpenIncidents(schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(SOC_TABLE_NAMES.incidents)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .in('status', ['NEW', 'TRIAGED', 'INVESTIGATING', 'CONTAINED'])
        .is('deleted_at', null)
        .order('severity', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpSOCIncidentError(
          `Erreur lors de la récupération des incidents ouverts: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpSOCIncident[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },

    async findBySeverity(severity: string, schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(SOC_TABLE_NAMES.incidents)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('severity', severity)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpSOCIncidentError(
          `Erreur lors de la récupération par sévérité: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpSOCIncident[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },

    async findByIncidentId(incidentId: string, schoolId: string) {
      const { data, error, count } = await supabase
        .from(SOC_TABLE_NAMES.indicators)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('incident_id', incidentId)
        .is('deleted_at', null);

      if (error) {
        throw new GestcrpSOCIndicatorError(
          `Erreur lors de la récupération des indicateurs: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpSOCIndicator[],
        total: count || 0,
        offset: 0,
        limit: data?.length || 0,
      };
    },
  };
}
