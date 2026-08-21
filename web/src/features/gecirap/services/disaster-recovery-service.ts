import {
  GecirapRecoveryPlanNotFoundError,
  GecirapRecoveryFailedError,
  GecirapRecoveryTestError,
  GecirapRTONotMetError,
  GecirapRPONotMetError,
  GecirapDependencyError,
} from '@educi/errors';
import {
  createDisasterRecoveryPlanSchema,
  updateDisasterRecoveryPlanSchema,
  createRecoveryStrategySchema,
  updateRecoveryStrategySchema,
  createRecoveryExecutionSchema,
  createRecoveryTestSchema,
  updateRecoveryTestSchema,
  createRecoveryDependencySchema,
} from '../validators/disaster-recovery';
import type {
  GecirapDisasterRecoveryPlan,
  GecirapRecoveryStrategy,
  GecirapRecoveryExecution,
  GecirapRecoveryTest,
  GecirapRecoveryDependency,
  DisasterRecoveryPlanRepository,
  RecoveryStrategyRepository,
  RecoveryExecutionRepository,
  RecoveryTestRepository,
  RecoveryDependencyRepository,
} from '../repositories/disaster-recovery-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Disaster Recovery Service
// ============================================================================

export class DisasterRecoveryService extends BaseGecirapService {
  constructor(
    private readonly planRepo: DisasterRecoveryPlanRepository,
    private readonly strategyRepo: RecoveryStrategyRepository,
    private readonly executionRepo: RecoveryExecutionRepository,
    private readonly testRepo: RecoveryTestRepository,
    private readonly dependencyRepo: RecoveryDependencyRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── DR Plans ────────────────────────────────────────────────────────────

  async listPlans(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapDisasterRecoveryPlan>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.planRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getPlan(schoolId: string, id: string): Promise<GecirapDisasterRecoveryPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan de récupération');
    return this.ensureExists(this.planRepo, id, schoolId, 'Plan de récupération');
  }

  async createPlan(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapDisasterRecoveryPlan> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'plan_type', 'priority', 'rto_hours', 'rpo_hours'], 'Plan de récupération');

    const validated = this.validateSchema(createDisasterRecoveryPlanSchema, data, 'Plan de récupération');

    this.validateRange(validated.priority, 1, 100, 'priority', 'Plan de récupération');
    this.validateRange(validated.rto_hours, 0, 720, 'rto_hours', 'Plan de récupération');
    this.validateRange(validated.rpo_hours, 0, 720, 'rpo_hours', 'Plan de récupération');

    return this.planRepo.create(
      {
        name: validated.name,
        description: validated.description,
        plan_type: validated.plan_type,
        priority: validated.priority,
        rto_hours: validated.rto_hours,
        rpo_hours: validated.rpo_hours,
        status: validated.status ?? 'draft',
        last_tested_at: validated.last_tested_at,
        is_active: validated.is_active ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updatePlan(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapDisasterRecoveryPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan de récupération');

    const existing = await this.ensureExists(this.planRepo, id, schoolId, 'Plan de récupération');
    this.validateOwnership(existing, schoolId, 'Plan de récupération');

    const validated = this.validateSchema(updateDisasterRecoveryPlanSchema, data, 'Plan de récupération');
    return this.planRepo.update(id, schoolId, validated);
  }

  async deletePlan(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan de récupération');

    const existing = await this.ensureExists(this.planRepo, id, schoolId, 'Plan de récupération');
    this.validateOwnership(existing, schoolId, 'Plan de récupération');

    await this.planRepo.softDelete(id, schoolId);
  }

  async listActivePlans(schoolId: string): Promise<GecirapDisasterRecoveryPlan[]> {
    this.validateSchoolId(schoolId);
    return this.planRepo.findActive(schoolId);
  }

  async listExpiredPlans(schoolId: string): Promise<GecirapDisasterRecoveryPlan[]> {
    this.validateSchoolId(schoolId);
    return this.planRepo.findExpired(schoolId);
  }

  // ─── Recovery Strategies ─────────────────────────────────────────────────

  async listStrategies(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRecoveryStrategy>> {
    this.validateSchoolId(schoolId);
    return this.strategyRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getStrategy(schoolId: string, id: string): Promise<GecirapRecoveryStrategy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Stratégie de récupération');
    return this.ensureExists(this.strategyRepo, id, schoolId, 'Stratégie de récupération');
  }

  async createStrategy(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRecoveryStrategy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['plan_id', 'strategy_name', 'strategy_type', 'priority', 'estimated_recovery_time_minutes', 'steps'], 'Stratégie de récupération');

    const validated = this.validateSchema(createRecoveryStrategySchema, data, 'Stratégie de récupération');

    await this.ensureExists(this.planRepo, validated.planId, schoolId, 'Plan de récupération');

    return this.strategyRepo.create(
      {
        plan_id: validated.planId,
        strategy_name: validated.name,
        strategy_type: validated.type,
        priority: validated.priority,
        steps: validated.steps,
        metadata: { automated: validated.automated },
      },
      schoolId,
    );
  }

  async updateStrategy(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRecoveryStrategy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Stratégie de récupération');

    const existing = await this.ensureExists(this.strategyRepo, id, schoolId, 'Stratégie de récupération');
    this.validateOwnership(existing, schoolId, 'Stratégie de récupération');

    const validated = this.validateSchema(updateRecoveryStrategySchema, data, 'Stratégie de récupération');
    return this.strategyRepo.update(id, schoolId, validated);
  }

  async deleteStrategy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Stratégie de récupération');

    const existing = await this.ensureExists(this.strategyRepo, id, schoolId, 'Stratégie de récupération');
    this.validateOwnership(existing, schoolId, 'Stratégie de récupération');

    await this.strategyRepo.softDelete(id, schoolId);
  }

  async listByPlan(
    schoolId: string,
    planId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRecoveryStrategy>> {
    this.validateSchoolId(schoolId);
    this.validateId(planId, 'Plan de récupération');
    return this.strategyRepo.findByPlanId(planId, schoolId, this.validatePagination(params));
  }

  // ─── Executions ──────────────────────────────────────────────────────────

  async listExecutions(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRecoveryExecution>> {
    this.validateSchoolId(schoolId);
    return this.executionRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getExecution(schoolId: string, id: string): Promise<GecirapRecoveryExecution> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Exécution récupération');
    return this.ensureExists(this.executionRepo, id, schoolId, 'Exécution récupération');
  }

  async createExecution(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRecoveryExecution> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['plan_id', 'strategy_id', 'trigger_type'], 'Exécution récupération');

    const validated = this.validateSchema(createRecoveryExecutionSchema, data, 'Exécution récupération');

    await this.ensureExists(this.planRepo, validated.planId, schoolId, 'Plan de récupération');
    await this.ensureExists(this.strategyRepo, validated.strategyId, schoolId, 'Stratégie de récupération');

    return this.executionRepo.create(
      {
        plan_id: validated.planId,
        strategy_id: validated.strategyId,
        trigger_type: 'manual',
        status: validated.status ?? 'IN_PROGRESS',
        started_at: new Date().toISOString(),
        completed_at: undefined,
        duration_minutes: undefined,
        success: false,
        error_message: undefined,
        logs: [],
        metadata: undefined,
      },
      schoolId,
    );
  }

  async listRunningExecutions(schoolId: string): Promise<GecirapRecoveryExecution[]> {
    this.validateSchoolId(schoolId);
    return this.executionRepo.findRunning(schoolId);
  }

  async listFailedExecutions(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRecoveryExecution>> {
    this.validateSchoolId(schoolId);
    return this.executionRepo.findFailed(schoolId, this.validatePagination(params));
  }

  // ─── Tests ───────────────────────────────────────────────────────────────

  async listTests(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRecoveryTest>> {
    this.validateSchoolId(schoolId);
    return this.testRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getTest(schoolId: string, id: string): Promise<GecirapRecoveryTest> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Test récupération');
    return this.ensureExists(this.testRepo, id, schoolId, 'Test récupération');
  }

  async createTest(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRecoveryTest> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['plan_id', 'test_type', 'scheduled_at'], 'Test récupération');

    const validated = this.validateSchema(createRecoveryTestSchema, data, 'Test récupération');

    await this.ensureExists(this.planRepo, validated.planId, schoolId, 'Plan de récupération');

    return this.testRepo.create(
      {
        plan_id: validated.planId,
        test_type: 'manual',
        status: validated.status ?? 'SCHEDULED',
        scheduled_at: new Date().toISOString(),
        executed_at: undefined,
        completed_at: undefined,
        passed: false,
        rto_actual_minutes: undefined,
        rpo_actual_minutes: undefined,
        findings: [],
        metadata: undefined,
      },
      schoolId,
    );
  }

  async updateTest(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRecoveryTest> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Test récupération');

    const existing = await this.ensureExists(this.testRepo, id, schoolId, 'Test récupération');
    this.validateOwnership(existing, schoolId, 'Test récupération');

    const validated = this.validateSchema(updateRecoveryTestSchema, data, 'Test récupération');
    return this.testRepo.update(id, schoolId, validated);
  }

  async listFailedTests(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRecoveryTest>> {
    this.validateSchoolId(schoolId);
    return this.testRepo.findFailed(schoolId, this.validatePagination(params));
  }

  async listScheduledTests(schoolId: string): Promise<GecirapRecoveryTest[]> {
    this.validateSchoolId(schoolId);
    return this.testRepo.findScheduled(schoolId);
  }

  // ─── Dependencies ────────────────────────────────────────────────────────

  async listDependencies(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRecoveryDependency>> {
    this.validateSchoolId(schoolId);
    return this.dependencyRepo.findAll(schoolId, this.validatePagination(params));
  }

  async createDependency(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRecoveryDependency> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['plan_id', 'dependency_name', 'dependency_type', 'resource_id', 'priority', 'max_downtime_minutes'], 'Dépendance récupération');

    const validated = this.validateSchema(createRecoveryDependencySchema, data, 'Dépendance récupération');

    await this.ensureExists(this.planRepo, validated.plan_id, schoolId, 'Plan de récupération');

    return this.dependencyRepo.create(
      {
        plan_id: validated.plan_id,
        dependency_name: validated.dependency_name,
        dependency_type: validated.dependency_type,
        resource_id: validated.resource_id,
        priority: validated.priority,
        max_downtime_minutes: validated.max_downtime_minutes,
        auto_failover: validated.auto_failover ?? false,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async listByPlanDependencies(
    schoolId: string,
    planId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRecoveryDependency>> {
    this.validateSchoolId(schoolId);
    this.validateId(planId, 'Plan de récupération');
    return this.dependencyRepo.findByPlanId(planId, schoolId, this.validatePagination(params));
  }

  async getDROverview(schoolId: string): Promise<{
    totalPlans: number;
    activePlans: number;
    expiredPlans: number;
    totalStrategies: number;
    recentExecutions: number;
    failedExecutions: number;
    scheduledTests: number;
  }> {
    this.validateSchoolId(schoolId);

    const plans = await this.planRepo.findAll(schoolId, { limit: 500 });
    const strategies = await this.strategyRepo.findAll(schoolId, { limit: 500 });
    const executions = await this.executionRepo.findAll(schoolId, { limit: 100 });
    const tests = await this.testRepo.findScheduled(schoolId);
    const expired = await this.planRepo.findExpired(schoolId);

    return {
      totalPlans: plans.total,
      activePlans: plans.data.filter((p) => p.is_active).length,
      expiredPlans: expired.length,
      totalStrategies: strategies.total,
      recentExecutions: executions.total,
      failedExecutions: executions.data.filter((e) => !e.success).length,
      scheduledTests: tests.length,
    };
  }
}
