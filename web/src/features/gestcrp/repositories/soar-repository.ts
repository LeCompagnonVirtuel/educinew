import { SupabaseClient } from '@supabase/supabase-js';
import {
  GestcrpSOARPlaybookError,
  GestcrpSOARExecutionError,
} from '@educi/errors';
import {
  GestcrpBaseEntity,
  GestcrpCrudRepository,
  PaginatedResult,
  PaginationParams,
  createGestcrpCrudRepository,
} from './base-gestcrp-repository';

// ============================================================================
// SOAR Entity Interfaces
// ============================================================================

export interface GestcrpSOARPlaybook extends GestcrpBaseEntity {
  name: string;
  description: string;
  enabled: boolean;
  trigger: string;
  conditions: Record<string, unknown>[];
  steps: Record<string, unknown>[];
  on_success: Record<string, unknown>[];
  on_failure: Record<string, unknown>[];
  execution_count: number;
  last_executed_at?: string;
  average_execution_time: number;
}

export interface GestcrpSOARExecution extends GestcrpBaseEntity {
  playbook_id: string;
  trigger: string;
  triggered_by: string;
  status: 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'PAUSED';
  steps: Record<string, unknown>[];
  started_at: string;
  completed_at?: string;
  duration?: number;
  error?: string;
  result: Record<string, unknown>;
}

// ============================================================================
// Table Names
// ============================================================================

export const SOAR_TABLE_NAMES = {
  playbooks: 'gestcrp_soar_playbooks',
  executions: 'gestcrp_soar_executions',
} as const;

// ============================================================================
// Repository Interface
// ============================================================================

export interface SOARRepository {
  playbooks: GestcrpCrudRepository<GestcrpSOARPlaybook>;
  executions: GestcrpCrudRepository<GestcrpSOARExecution>;
  findActivePlaybooks(schoolId: string): Promise<PaginatedResult<GestcrpSOARPlaybook>>;
  findRecentExecutions(playbookId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpSOARExecution>>;
  findFailedExecutions(schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpSOARExecution>>;
}

// ============================================================================
// Factory
// ============================================================================

export function createSOARRepository(supabase: SupabaseClient): SOARRepository {
  const crud = <T extends GestcrpBaseEntity>(table: string): GestcrpCrudRepository<T> =>
    createGestcrpCrudRepository<T>(supabase, table);

  return {
    playbooks: crud<GestcrpSOARPlaybook>(SOAR_TABLE_NAMES.playbooks),
    executions: crud<GestcrpSOARExecution>(SOAR_TABLE_NAMES.executions),

    async findActivePlaybooks(schoolId: string) {
      const { data, error, count } = await supabase
        .from(SOAR_TABLE_NAMES.playbooks)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('enabled', true)
        .is('deleted_at', null)
        .order('execution_count', { ascending: false });

      if (error) {
        throw new GestcrpSOARPlaybookError(
          `Erreur lors de la récupération des playbooks actifs: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpSOARPlaybook[],
        total: count || 0,
        offset: 0,
        limit: data?.length || 0,
      };
    },

    async findRecentExecutions(playbookId: string, schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(SOAR_TABLE_NAMES.executions)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('playbook_id', playbookId)
        .is('deleted_at', null)
        .order('started_at', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpSOARExecutionError(
          `Erreur lors de la récupération des exécutions récentes: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpSOARExecution[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },

    async findFailedExecutions(schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(SOAR_TABLE_NAMES.executions)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('status', 'FAILED')
        .is('deleted_at', null)
        .order('started_at', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpSOARExecutionError(
          `Erreur lors de la récupération des exécutions échouées: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpSOARExecution[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },
  };
}
