import { SupabaseClient } from '@supabase/supabase-js';
import {
  GestcrpBCPPlanError,
  GestcrpBackupPolicyError,
  GestcrpBackupJobError,
  GestcrpDRTestError,
} from '@educi/errors';
import {
  GestcrpBaseEntity,
  GestcrpCrudRepository,
  PaginatedResult,
  PaginationParams,
  createGestcrpCrudRepository,
} from './base-gestcrp-repository';

// ============================================================================
// BCP Entity Interfaces
// ============================================================================

export interface GestcrpBCPPlan extends GestcrpBaseEntity {
  name: string;
  description: string;
  status: 'DRAFT' | 'ACTIVE' | 'TESTING' | 'FAILED' | 'ARCHIVED';
  scope: string;
  objectives: string[];
  critical_functions: Record<string, unknown>[];
  recovery_procedures: Record<string, unknown>[];
  roles: Record<string, unknown>[];
  communication_plan: Record<string, unknown>;
  testing_schedule: Record<string, unknown>;
  last_tested_at?: string;
  next_test_at?: string;
  last_review_at?: string;
  next_review_at?: string;
}

export interface GestcrpBackupPolicy extends GestcrpBaseEntity {
  name: string;
  description: string;
  enabled: boolean;
  backup_type: 'FULL' | 'INCREMENTAL' | 'DIFFERENTIAL';
  schedule: string;
  retention_days: number;
  encryption_enabled: boolean;
  compression_enabled: boolean;
  target_location: 'PRIMARY' | 'SECONDARY' | 'CLOUD' | 'OFFSITE';
  sources: string[];
  verify_after_backup: boolean;
  last_backup_at?: string;
  last_backup_status: 'SUCCESS' | 'FAILED' | 'PARTIAL';
  next_backup_at?: string;
}

export interface GestcrpBackupJob extends GestcrpBaseEntity {
  policy_id: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  started_at: string;
  completed_at?: string;
  duration?: number;
  total_size: number;
  compressed_size: number;
  files_count: number;
  encrypted: boolean;
  verified: boolean;
  error?: string;
}

export interface GestcrpDRTestResult extends GestcrpBaseEntity {
  plan_id: string;
  procedure_id: string;
  test_date: string;
  duration: number;
  success: boolean;
  issues: string[];
  improvements: string[];
  participant_feedback: string[];
  next_steps: string[];
}

// ============================================================================
// Table Names
// ============================================================================

export const BCP_TABLE_NAMES = {
  plans: 'gestcrp_bcp_plans',
  backupPolicies: 'gestcrp_backup_policies',
  backupJobs: 'gestcrp_backup_jobs',
  drTestResults: 'gestcrp_dr_test_results',
} as const;

// ============================================================================
// Repository Interface
// ============================================================================

export interface BCPRepository {
  plans: GestcrpCrudRepository<GestcrpBCPPlan>;
  backupPolicies: GestcrpCrudRepository<GestcrpBackupPolicy>;
  backupJobs: GestcrpCrudRepository<GestcrpBackupJob>;
  drTestResults: GestcrpCrudRepository<GestcrpDRTestResult>;
  findActivePlans(schoolId: string): Promise<PaginatedResult<GestcrpBCPPlan>>;
  findRecentBackupJobs(policyId: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpBackupJob>>;
  findFailedBackupJobs(schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpBackupJob>>;
}

// ============================================================================
// Factory
// ============================================================================

export function createBCPRepository(supabase: SupabaseClient): BCPRepository {
  const crud = <T extends GestcrpBaseEntity>(table: string): GestcrpCrudRepository<T> =>
    createGestcrpCrudRepository<T>(supabase, table);

  return {
    plans: crud<GestcrpBCPPlan>(BCP_TABLE_NAMES.plans),
    backupPolicies: crud<GestcrpBackupPolicy>(BCP_TABLE_NAMES.backupPolicies),
    backupJobs: crud<GestcrpBackupJob>(BCP_TABLE_NAMES.backupJobs),
    drTestResults: crud<GestcrpDRTestResult>(BCP_TABLE_NAMES.drTestResults),

    async findActivePlans(schoolId: string) {
      const { data, error, count } = await supabase
        .from(BCP_TABLE_NAMES.plans)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('status', 'ACTIVE')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) {
        throw new GestcrpBCPPlanError(
          `Erreur lors de la récupération des plans BCP actifs: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpBCPPlan[],
        total: count || 0,
        offset: 0,
        limit: data?.length || 0,
      };
    },

    async findRecentBackupJobs(policyId: string, schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(BCP_TABLE_NAMES.backupJobs)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('policy_id', policyId)
        .is('deleted_at', null)
        .order('started_at', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpBackupJobError(
          `Erreur lors de la récupération des jobs de backup récents: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpBackupJob[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },

    async findFailedBackupJobs(schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(BCP_TABLE_NAMES.backupJobs)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('status', 'FAILED')
        .is('deleted_at', null)
        .order('started_at', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpBackupJobError(
          `Erreur lors de la récupération des jobs de backup échoués: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpBackupJob[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },
  };
}
