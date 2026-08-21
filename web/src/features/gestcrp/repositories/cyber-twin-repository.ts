import { SupabaseClient } from '@supabase/supabase-js';
import {
  GestcrpDigitalTwinError,
  GestcrpTwinResultError,
  GestcrpAttackScenarioError,
} from '@educi/errors';
import {
  GestcrpBaseEntity,
  GestcrpCrudRepository,
  PaginatedResult,
  PaginationParams,
  createGestcrpCrudRepository,
} from './base-gestcrp-repository';

// ============================================================================
// Cyber Digital Twin Entity Interfaces
// ============================================================================

export interface GestcrpCyberDigitalTwin extends GestcrpBaseEntity {
  name: string;
  description: string;
  status: 'DRAFT' | 'READY' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'PAUSED';
  simulation_type: 'ATTACK_SIMULATION' | 'PENETRATION_TEST' | 'RED_TEAM' | 'BLUE_TEAM' | 'PURPLE_TEAM' | 'CHAOS_ENGINEERING' | 'DISASTER_RECOVERY' | 'INCIDENT_RESPONSE';
  scope: string;
  environment: Record<string, unknown>;
  attack_scenarios: Record<string, unknown>[];
  defenses: Record<string, unknown>[];
  created_by: string;
  started_at?: string;
  completed_at?: string;
  duration?: number;
}

export interface GestcrpTwinResult extends GestcrpBaseEntity {
  twin_id: string;
  scenario_id: string;
  success: boolean;
  detection_time: number;
  response_time: number;
  mitigation_time: number;
  findings: Record<string, unknown>[];
  recommendations: string[];
  score: number;
}

export interface GestcrpAttackScenario extends GestcrpBaseEntity {
  twin_id: string;
  name: string;
  description: string;
  technique: string;
  mitre_attack_id?: string;
  severity: string;
  target: string;
  expected_duration: number;
  steps: Record<string, unknown>[];
  success_criteria: string[];
  rollback_plan: string;
}

// ============================================================================
// Table Names
// ============================================================================

export const CYBER_TWIN_TABLE_NAMES = {
  twins: 'gestcrp_cyber_digital_twins',
  results: 'gestcrp_twin_results',
  attackScenarios: 'gestcrp_attack_scenarios',
} as const;

// ============================================================================
// Repository Interface
// ============================================================================

export interface CyberTwinRepository {
  twins: GestcrpCrudRepository<GestcrpCyberDigitalTwin>;
  results: GestcrpCrudRepository<GestcrpTwinResult>;
  attackScenarios: GestcrpCrudRepository<GestcrpAttackScenario>;
  findCompletedTwins(schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpCyberDigitalTwin>>;
  findResultsByTwinId(twinId: string, schoolId: string): Promise<PaginatedResult<GestcrpTwinResult>>;
  findScenariosByTwinId(twinId: string, schoolId: string): Promise<PaginatedResult<GestcrpAttackScenario>>;
}

// ============================================================================
// Factory
// ============================================================================

export function createCyberTwinRepository(supabase: SupabaseClient): CyberTwinRepository {
  const crud = <T extends GestcrpBaseEntity>(table: string): GestcrpCrudRepository<T> =>
    createGestcrpCrudRepository<T>(supabase, table);

  return {
    twins: crud<GestcrpCyberDigitalTwin>(CYBER_TWIN_TABLE_NAMES.twins),
    results: crud<GestcrpTwinResult>(CYBER_TWIN_TABLE_NAMES.results),
    attackScenarios: crud<GestcrpAttackScenario>(CYBER_TWIN_TABLE_NAMES.attackScenarios),

    async findCompletedTwins(schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(CYBER_TWIN_TABLE_NAMES.twins)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('status', 'COMPLETED')
        .is('deleted_at', null)
        .order('completed_at', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpDigitalTwinError(
          `Erreur lors de la récupération des twins terminés: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpCyberDigitalTwin[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },

    async findResultsByTwinId(twinId: string, schoolId: string) {
      const { data, error, count } = await supabase
        .from(CYBER_TWIN_TABLE_NAMES.results)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('twin_id', twinId)
        .is('deleted_at', null)
        .order('score', { ascending: false });

      if (error) {
        throw new GestcrpTwinResultError(
          `Erreur lors de la récupération des résultats: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpTwinResult[],
        total: count || 0,
        offset: 0,
        limit: data?.length || 0,
      };
    },

    async findScenariosByTwinId(twinId: string, schoolId: string) {
      const { data, error, count } = await supabase
        .from(CYBER_TWIN_TABLE_NAMES.attackScenarios)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('twin_id', twinId)
        .is('deleted_at', null)
        .order('created_at', { ascending: true });

      if (error) {
        throw new GestcrpAttackScenarioError(
          `Erreur lors de la récupération des scénarios: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpAttackScenario[],
        total: count || 0,
        offset: 0,
        limit: data?.length || 0,
      };
    },
  };
}
