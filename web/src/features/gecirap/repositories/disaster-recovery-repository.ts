import { SupabaseClient } from '@supabase/supabase-js';
import {
  GecirapRecoveryPlanNotFoundError,
  GecirapRecoveryFailedError,
  GecirapRecoveryTestError,
  GecirapDependencyError,
} from '@educi/errors';
import {
  GecirapBaseEntity,
  PaginatedResult,
  PaginationParams,
  FilterParams,
  GecirapCrudRepositoryImpl,
} from './base-gecirap-repository';

// ============================================================================
// Entity Interfaces
// ============================================================================

export interface GecirapDisasterRecoveryPlan extends GecirapBaseEntity {
  name: string;
  description?: string;
  plan_type: string;
  priority: number;
  rto_hours: number;
  rpo_hours: number;
  status: string;
  last_tested_at?: string;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapRecoveryStrategy extends GecirapBaseEntity {
  plan_id: string;
  strategy_name: string;
  strategy_type: string;
  target_region_id?: string;
  target_cluster_id?: string;
  priority: number;
  estimated_recovery_time_minutes: number;
  steps: Record<string, unknown>[];
  metadata?: Record<string, unknown>;
}

export interface GecirapRecoveryExecution extends GecirapBaseEntity {
  plan_id: string;
  strategy_id: string;
  trigger_type: string;
  status: string;
  started_at: string;
  completed_at?: string;
  duration_minutes?: number;
  success: boolean;
  error_message?: string;
  logs?: Record<string, unknown>[];
  metadata?: Record<string, unknown>;
}

export interface GecirapRecoveryTest extends GecirapBaseEntity {
  plan_id: string;
  test_type: string;
  status: string;
  scheduled_at: string;
  executed_at?: string;
  completed_at?: string;
  passed: boolean;
  rto_actual_minutes?: number;
  rpo_actual_minutes?: number;
  findings?: Record<string, unknown>[];
  metadata?: Record<string, unknown>;
}

export interface GecirapRecoveryDependency extends GecirapBaseEntity {
  plan_id: string;
  dependency_name: string;
  dependency_type: string;
  resource_id: string;
  priority: number;
  max_downtime_minutes: number;
  auto_failover: boolean;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Repository Implementations
// ============================================================================

export class DisasterRecoveryPlanRepository extends GecirapCrudRepositoryImpl<GecirapDisasterRecoveryPlan> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_disaster_recovery_plans', (msg) => {
      throw new GecirapRecoveryPlanNotFoundError(msg);
    });
  }

  async findByPlanType(
    planType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapDisasterRecoveryPlan>> {
    return this.findAll(schoolId, { ...params, plan_type: planType });
  }

  async findActive(schoolId: string): Promise<GecirapDisasterRecoveryPlan[]> {
    const result = await this.findAll(schoolId, { is_active: true, limit: 200 });
    return result.data;
  }

  async findExpired(schoolId: string): Promise<GecirapDisasterRecoveryPlan[]> {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .eq('is_active', true)
      .or(`last_tested_at.is.null,last_tested_at.lt.${thirtyDaysAgo}`);

    if (error) {
      throw new GecirapRecoveryPlanNotFoundError(
        `Erreur lors de la récupération des plans expirés: ${error.message}`,
      );
    }

    return (data || []) as GecirapDisasterRecoveryPlan[];
  }
}

export class RecoveryStrategyRepository extends GecirapCrudRepositoryImpl<GecirapRecoveryStrategy> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_recovery_strategies', (msg) => {
      throw new GecirapRecoveryFailedError(msg);
    });
  }

  async findByPlanId(
    planId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapRecoveryStrategy>> {
    return this.findAll(schoolId, { ...params, plan_id: planId });
  }

  async findByStrategyType(
    strategyType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapRecoveryStrategy>> {
    return this.findAll(schoolId, { ...params, strategy_type: strategyType });
  }
}

export class RecoveryExecutionRepository extends GecirapCrudRepositoryImpl<GecirapRecoveryExecution> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_recovery_executions', (msg) => {
      throw new GecirapRecoveryFailedError(msg);
    });
  }

  async findByPlanId(
    planId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapRecoveryExecution>> {
    return this.findAll(schoolId, { ...params, plan_id: planId });
  }

  async findRunning(schoolId: string): Promise<GecirapRecoveryExecution[]> {
    const result = await this.findAll(schoolId, { status: 'running', limit: 200 });
    return result.data;
  }

  async findFailed(schoolId: string, params: PaginationParams & FilterParams = {}): Promise<PaginatedResult<GecirapRecoveryExecution>> {
    return this.findAll(schoolId, { ...params, success: false });
  }
}

export class RecoveryTestRepository extends GecirapCrudRepositoryImpl<GecirapRecoveryTest> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_recovery_tests', (msg) => {
      throw new GecirapRecoveryTestError(msg);
    });
  }

  async findByPlanId(
    planId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapRecoveryTest>> {
    return this.findAll(schoolId, { ...params, plan_id: planId });
  }

  async findFailed(schoolId: string, params: PaginationParams & FilterParams = {}): Promise<PaginatedResult<GecirapRecoveryTest>> {
    return this.findAll(schoolId, { ...params, passed: false });
  }

  async findScheduled(schoolId: string): Promise<GecirapRecoveryTest[]> {
    const now = new Date().toISOString();
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .eq('status', 'scheduled')
      .gte('scheduled_at', now);

    if (error) {
      throw new GecirapRecoveryTestError(
        `Erreur lors de la récupération des tests planifiés: ${error.message}`,
      );
    }

    return (data || []) as GecirapRecoveryTest[];
  }
}

export class RecoveryDependencyRepository extends GecirapCrudRepositoryImpl<GecirapRecoveryDependency> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_recovery_dependencies', (msg) => {
      throw new GecirapDependencyError(msg);
    });
  }

  async findByPlanId(
    planId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapRecoveryDependency>> {
    return this.findAll(schoolId, { ...params, plan_id: planId });
  }

  async findByResource(
    resourceType: string,
    resourceId: string,
    schoolId: string,
  ): Promise<GecirapRecoveryDependency[]> {
    const result = await this.findAll(schoolId, {
      dependency_type: resourceType,
      resource_id: resourceId,
      limit: 200,
    });
    return result.data;
  }
}
