import {
  GecirapRemediationError,
  GecirapRemediationDeniedError,
  GecirapRemediationFailedError,
  GecirapAutoActionError,
} from '@educi/errors';
import {
  createRemediationPlanSchema,
  updateRemediationPlanSchema,
  createAutomatedActionSchema,
  updateAutomatedActionSchema,
} from '../validators/aiops';
import type {
  GecirapRemediationPlan,
  GecirapAutomatedAction,
  RemediationPlanRepository,
  AutomatedActionRepository,
} from '../repositories/aiops-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Remediation Service
// ============================================================================

export class RemediationService extends BaseGecirapService {
  constructor(
    private readonly planRepo: RemediationPlanRepository,
    private readonly actionRepo: AutomatedActionRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Remediation Plans ───────────────────────────────────────────────────

  async listPlans(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapRemediationPlan>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.planRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getPlan(schoolId: string, id: string): Promise<GecirapRemediationPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan de remédiation');
    return this.ensureExists(this.planRepo, id, schoolId, 'Plan de remédiation');
  }

  async createPlan(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRemediationPlan> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['plan_name', 'correlation_id', 'steps', 'auto_execute'], 'Plan de remédiation');

    const validated = this.validateSchema(createRemediationPlanSchema, data, 'Plan de remédiation');

    return this.planRepo.create(
      {
        plan_name: validated.plan_name,
        correlation_id: validated.correlation_id,
        steps: validated.steps,
        status: validated.status ?? 'pending_approval',
        auto_execute: validated.auto_execute,
        approved_by: validated.approved_by,
        approved_at: validated.approved_at,
        executed_at: validated.executed_at,
        completed_at: validated.completed_at,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updatePlan(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRemediationPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan de remédiation');

    const existing = await this.ensureExists(this.planRepo, id, schoolId, 'Plan de remédiation');
    this.validateOwnership(existing, schoolId, 'Plan de remédiation');

    const validated = this.validateSchema(updateRemediationPlanSchema, data, 'Plan de remédiation');
    return this.planRepo.update(id, schoolId, validated);
  }

  async deletePlan(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan de remédiation');

    const existing = await this.ensureExists(this.planRepo, id, schoolId, 'Plan de remédiation');
    this.validateOwnership(existing, schoolId, 'Plan de remédiation');

    await this.planRepo.softDelete(id, schoolId);
  }

  async approvePlan(
    schoolId: string,
    id: string,
    approvedBy: string,
  ): Promise<GecirapRemediationPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan de remédiation');
    if (!approvedBy || approvedBy.trim().length === 0) {
      throw new GecirapRemediationError('L\'approbateur est requis');
    }

    const existing = await this.ensureExists(this.planRepo, id, schoolId, 'Plan de remédiation');
    this.validateOwnership(existing, schoolId, 'Plan de remédiation');

    if (existing.status !== 'pending_approval') {
      throw new GecirapRemediationDeniedError(
        `Impossible d'approuver un plan avec le statut "${existing.status}"`,
      );
    }

    return this.planRepo.update(id, schoolId, {
      status: 'approved',
      approved_by: approvedBy,
      approved_at: new Date().toISOString(),
    });
  }

  async rejectPlan(
    schoolId: string,
    id: string,
  ): Promise<GecirapRemediationPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan de remédiation');

    const existing = await this.ensureExists(this.planRepo, id, schoolId, 'Plan de remédiation');
    this.validateOwnership(existing, schoolId, 'Plan de remédiation');

    if (existing.status !== 'pending_approval') {
      throw new GecirapRemediationDeniedError(
        `Impossible de rejeter un plan avec le statut "${existing.status}"`,
      );
    }

    return this.planRepo.update(id, schoolId, {
      status: 'rejected',
    });
  }

  async executePlan(schoolId: string, id: string): Promise<GecirapRemediationPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan de remédiation');

    const existing = await this.ensureExists(this.planRepo, id, schoolId, 'Plan de remédiation');
    this.validateOwnership(existing, schoolId, 'Plan de remédiation');

    if (existing.status !== 'approved') {
      throw new GecirapRemediationFailedError(
        `Impossible d'exécuter un plan avec le statut "${existing.status}"`,
      );
    }

    return this.planRepo.update(id, schoolId, {
      status: 'executing',
      executed_at: new Date().toISOString(),
    });
  }

  async listPendingApproval(schoolId: string): Promise<GecirapRemediationPlan[]> {
    this.validateSchoolId(schoolId);
    return this.planRepo.findPendingApproval(schoolId);
  }

  async listByCorrelation(
    schoolId: string,
    correlationId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRemediationPlan>> {
    this.validateSchoolId(schoolId);
    this.validateId(correlationId, 'Corrélation');
    return this.planRepo.findByCorrelationId(correlationId, schoolId, this.validatePagination(params));
  }

  // ─── Automated Actions ───────────────────────────────────────────────────

  async listActions(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapAutomatedAction>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.actionRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getAction(schoolId: string, id: string): Promise<GecirapAutomatedAction> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Action automatique');
    return this.ensureExists(this.actionRepo, id, schoolId, 'Action automatique');
  }

  async createAction(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapAutomatedAction> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['action_type', 'target_resource_type', 'target_resource_id', 'action_payload'], 'Action automatique');

    const validated = this.validateSchema(createAutomatedActionSchema, data, 'Action automatique');

    return this.actionRepo.create(
      {
        action_type: validated.action_type,
        trigger_event_id: validated.trigger_event_id,
        trigger_correlation_id: validated.trigger_correlation_id,
        target_resource_type: validated.target_resource_type,
        target_resource_id: validated.target_resource_id,
        action_payload: validated.action_payload,
        status: validated.status ?? 'pending',
        executed_at: validated.executed_at,
        completed_at: validated.completed_at,
        error_message: validated.error_message,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateAction(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapAutomatedAction> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Action automatique');

    const existing = await this.ensureExists(this.actionRepo, id, schoolId, 'Action automatique');
    this.validateOwnership(existing, schoolId, 'Action automatique');

    const validated = this.validateSchema(updateAutomatedActionSchema, data, 'Action automatique');
    return this.actionRepo.update(id, schoolId, validated);
  }

  async deleteAction(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Action automatique');

    const existing = await this.ensureExists(this.actionRepo, id, schoolId, 'Action automatique');
    this.validateOwnership(existing, schoolId, 'Action automatique');

    await this.actionRepo.softDelete(id, schoolId);
  }

  async listRunningActions(schoolId: string): Promise<GecirapAutomatedAction[]> {
    this.validateSchoolId(schoolId);
    return this.actionRepo.findRunning(schoolId);
  }

  async listByActionType(
    schoolId: string,
    actionType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapAutomatedAction>> {
    this.validateSchoolId(schoolId);
    return this.actionRepo.findByActionType(actionType, schoolId, this.validatePagination(params));
  }

  async getRemediationOverview(schoolId: string): Promise<{
    totalPlans: number;
    pendingApproval: number;
    executing: number;
    completed: number;
    totalActions: number;
    runningActions: number;
    failedActions: number;
  }> {
    this.validateSchoolId(schoolId);

    const plans = await this.planRepo.findAll(schoolId, { limit: 500 });
    const pending = await this.planRepo.findPendingApproval(schoolId);
    const actions = await this.actionRepo.findAll(schoolId, { limit: 500 });
    const running = await this.actionRepo.findRunning(schoolId);

    return {
      totalPlans: plans.total,
      pendingApproval: pending.length,
      executing: plans.data.filter((p) => p.status === 'executing').length,
      completed: plans.data.filter((p) => p.status === 'completed').length,
      totalActions: actions.total,
      runningActions: running.length,
      failedActions: actions.data.filter((a) => a.status === 'failed').length,
    };
  }
}
