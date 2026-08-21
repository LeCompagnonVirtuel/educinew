import { SupabaseClient } from '@supabase/supabase-js';
import {
  GestcrpZeroTrustPolicyError,
  GestcrpZeroTrustAssessmentError,
  GestcrpZeroTrustEvaluationError,
  GestcrpZeroTrustContextError,
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
// Zero Trust Entity Interfaces
// ============================================================================

export interface GestcrpZeroTrustPolicy extends GestcrpBaseEntity {
  name: string;
  description: string;
  enabled: boolean;
  priority: number;
  zones: string[];
  conditions: Record<string, unknown>[];
  actions: Record<string, unknown>[];
  enforcement_mode: 'STRICT' | 'MODERATE' | 'ADVISORY';
}

export interface GestcrpZeroTrustAssessment extends GestcrpBaseEntity {
  subject_type: 'USER' | 'DEVICE' | 'SERVICE' | 'DATA';
  subject_id: string;
  decision: string;
  confidence: number;
  risk_score: number;
  risk_factors: string[];
  policies_evaluated: string[];
  enforcement_actions: string[];
  expires_at: string;
}

export interface GestcrpZeroTrustEvaluation extends GestcrpBaseEntity {
  policy_id: string;
  subject_type: string;
  subject_id: string;
  result: string;
  score: number;
  factors: Record<string, unknown>;
  evaluated_at: string;
}

export interface GestcrpZeroTrustZone extends GestcrpBaseEntity {
  name: string;
  description: string;
  level: number;
  policies: string[];
  enabled: boolean;
}

export interface GestcrpZeroTrustContext extends GestcrpBaseEntity {
  user_id: string;
  device_id: string;
  session_id: string;
  ip_address: string;
  user_agent: string;
  geolocation: Record<string, unknown>;
  risk_score: number;
  verification_level: string;
  trust_level: string;
  last_verified_at: string;
}

// ============================================================================
// Table Names
// ============================================================================

export const ZERO_TRUST_TABLE_NAMES = {
  policies: 'gestcrp_zero_trust_policies',
  assessments: 'gestcrp_zero_trust_assessments',
  evaluations: 'gestcrp_zero_trust_evaluations',
  zones: 'gestcrp_zero_trust_zones',
  contexts: 'gestcrp_zero_trust_contexts',
} as const;

// ============================================================================
// Repository Interface
// ============================================================================

export interface ZeroTrustRepository {
  policies: GestcrpCrudRepository<GestcrpZeroTrustPolicy>;
  assessments: GestcrpCrudRepository<GestcrpZeroTrustAssessment>;
  evaluations: GestcrpCrudRepository<GestcrpZeroTrustEvaluation>;
  zones: GestcrpCrudRepository<GestcrpZeroTrustZone>;
  contexts: GestcrpCrudRepository<GestcrpZeroTrustContext>;
  findBySubjectId(subjectId: string, schoolId: string): Promise<PaginatedResult<GestcrpZeroTrustAssessment>>;
  findActivePolicies(schoolId: string): Promise<PaginatedResult<GestcrpZeroTrustPolicy>>;
}

// ============================================================================
// Factory
// ============================================================================

export function createZeroTrustRepository(supabase: SupabaseClient): ZeroTrustRepository {
  const crud = <T extends GestcrpBaseEntity>(table: string): GestcrpCrudRepository<T> =>
    createGestcrpCrudRepository<T>(supabase, table);

  return {
    policies: crud<GestcrpZeroTrustPolicy>(ZERO_TRUST_TABLE_NAMES.policies),
    assessments: crud<GestcrpZeroTrustAssessment>(ZERO_TRUST_TABLE_NAMES.assessments),
    evaluations: crud<GestcrpZeroTrustEvaluation>(ZERO_TRUST_TABLE_NAMES.evaluations),
    zones: crud<GestcrpZeroTrustZone>(ZERO_TRUST_TABLE_NAMES.zones),
    contexts: crud<GestcrpZeroTrustContext>(ZERO_TRUST_TABLE_NAMES.contexts),

    async findBySubjectId(subjectId: string, schoolId: string) {
      const { data, error, count } = await supabase
        .from(ZERO_TRUST_TABLE_NAMES.assessments)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('subject_id', subjectId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) {
        throw new GestcrpZeroTrustAssessmentError(
          `Erreur lors de la recherche par sujet: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpZeroTrustAssessment[],
        total: count || 0,
        offset: 0,
        limit: data?.length || 0,
      };
    },

    async findActivePolicies(schoolId: string) {
      const { data, error, count } = await supabase
        .from(ZERO_TRUST_TABLE_NAMES.policies)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('enabled', true)
        .is('deleted_at', null)
        .order('priority', { ascending: true });

      if (error) {
        throw new GestcrpZeroTrustPolicyError(
          `Erreur lors de la récupération des politiques actives: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpZeroTrustPolicy[],
        total: count || 0,
        offset: 0,
        limit: data?.length || 0,
      };
    },
  };
}
