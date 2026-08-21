import {
  GecirapScalingPolicyError,
  GecirapScalingPolicyNotFoundError,
  GecirapScalingFailedError,
} from '@educi/errors';
import {
  createScalingPolicySchema,
  updateScalingPolicySchema,
  createScalingEventSchema,
} from '../validators/autoscaling';
import type {
  GecirapScalingPolicy,
  GecirapScalingEvent,
  ScalingPolicyRepository,
  ScalingEventRepository,
} from '../repositories/autoscaling-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Autoscaling Service
// ============================================================================

export class AutoscalingService extends BaseGecirapService {
  constructor(
    private readonly policyRepo: ScalingPolicyRepository,
    private readonly eventRepo: ScalingEventRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Scaling Policies ────────────────────────────────────────────────────

  async listPolicies(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapScalingPolicy>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.policyRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getPolicy(schoolId: string, id: string): Promise<GecirapScalingPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique autoscaling');
    return this.ensureExists(this.policyRepo, id, schoolId, 'Politique autoscaling');
  }

  async createPolicy(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapScalingPolicy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'resource_type', 'resource_id', 'policy_type', 'min_replicas', 'max_replicas'], 'Politique autoscaling');

    const validated = this.validateSchema(createScalingPolicySchema, data, 'Politique autoscaling');

    this.validateRange(validated.min_replicas, 0, 1000, 'min_replicas', 'Politique autoscaling');
    this.validateRange(validated.max_replicas, validated.min_replicas, 1000, 'max_replicas', 'Politique autoscaling');

    const existing = await this.policyRepo.findAll(schoolId, {
      name: validated.name,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GecirapScalingPolicyError(
        `Une politique "${validated.name}" existe déjà`,
      );
    }

    return this.policyRepo.create(
      {
        name: validated.name,
        description: validated.description,
        resource_type: validated.resource_type,
        resource_id: validated.resource_id,
        policy_type: validated.policy_type,
        min_replicas: validated.min_replicas,
        max_replicas: validated.max_replicas,
        scale_up_threshold: validated.scale_up_threshold,
        scale_down_threshold: validated.scale_down_threshold,
        cooldown_seconds: validated.cooldown_seconds ?? 300,
        is_active: validated.is_active ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updatePolicy(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapScalingPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique autoscaling');

    const existing = await this.ensureExists(this.policyRepo, id, schoolId, 'Politique autoscaling');
    this.validateOwnership(existing, schoolId, 'Politique autoscaling');

    const validated = this.validateSchema(updateScalingPolicySchema, data, 'Politique autoscaling');
    return this.policyRepo.update(id, schoolId, validated);
  }

  async deletePolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique autoscaling');

    const existing = await this.ensureExists(this.policyRepo, id, schoolId, 'Politique autoscaling');
    this.validateOwnership(existing, schoolId, 'Politique autoscaling');

    await this.policyRepo.softDelete(id, schoolId);
  }

  async togglePolicy(schoolId: string, id: string, isActive: boolean): Promise<GecirapScalingPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique autoscaling');

    const existing = await this.ensureExists(this.policyRepo, id, schoolId, 'Politique autoscaling');
    this.validateOwnership(existing, schoolId, 'Politique autoscaling');

    return this.policyRepo.update(id, schoolId, { is_active: isActive });
  }

  async listActivePolicies(schoolId: string): Promise<GecirapScalingPolicy[]> {
    this.validateSchoolId(schoolId);
    return this.policyRepo.findActive(schoolId);
  }

  async listByResource(
    schoolId: string,
    resourceType: string,
    resourceId: string,
  ): Promise<GecirapScalingPolicy[]> {
    this.validateSchoolId(schoolId);
    return this.policyRepo.findByResource(resourceType, resourceId, schoolId);
  }

  // ─── Scaling Events ──────────────────────────────────────────────────────

  async listEvents(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapScalingEvent>> {
    this.validateSchoolId(schoolId);
    return this.eventRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getEvent(schoolId: string, id: string): Promise<GecirapScalingEvent> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Événement autoscaling');
    return this.ensureExists(this.eventRepo, id, schoolId, 'Événement autoscaling');
  }

  async createEvent(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapScalingEvent> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['policy_id', 'event_type', 'previous_replicas', 'desired_replicas'], 'Événement autoscaling');

    const validated = this.validateSchema(createScalingEventSchema, data, 'Événement autoscaling');

    await this.ensureExists(this.policyRepo, validated.policyId, schoolId, 'Politique autoscaling');

    return this.eventRepo.create(
      {
        policy_id: validated.policyId,
        event_type: validated.event_type,
        previous_replicas: validated.previous_replicas,
        desired_replicas: validated.desired_replicas,
        reason: validated.reason,
        triggered_at: new Date().toISOString(),
        completed_at: validated.completed_at,
        status: validated.status ?? 'pending',
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async listRecentEvents(
    schoolId: string,
    limitCount = 50,
  ): Promise<GecirapScalingEvent[]> {
    this.validateSchoolId(schoolId);
    return this.eventRepo.findRecent(schoolId, limitCount);
  }

  async listByPolicy(
    schoolId: string,
    policyId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapScalingEvent>> {
    this.validateSchoolId(schoolId);
    this.validateId(policyId, 'Politique autoscaling');
    return this.eventRepo.findByPolicyId(policyId, schoolId, this.validatePagination(params));
  }

  async getScalingOverview(schoolId: string): Promise<{
    totalPolicies: number;
    activePolicies: number;
    totalEvents: number;
    recentEvents: number;
    byEventType: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);

    const policies = await this.policyRepo.findAll(schoolId, { limit: 500 });
    const events = await this.eventRepo.findRecent(schoolId, 200);

    const activePolicies = policies.data.filter((p) => p.is_active).length;
    const byEventType: Record<string, number> = {};

    for (const event of events) {
      byEventType[event.event_type] = (byEventType[event.event_type] ?? 0) + 1;
    }

    return {
      totalPolicies: policies.total,
      activePolicies,
      totalEvents: events.length,
      recentEvents: events.length,
      byEventType,
    };
  }
}
