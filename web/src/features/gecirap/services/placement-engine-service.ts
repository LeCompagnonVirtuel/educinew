import {
  GecirapPlacementError,
} from '@educi/errors';
import {
  createPlacementDecisionSchema,
  updatePlacementDecisionSchema,
} from '../validators/multi-cloud';
import type {
  GecirapCloudPlacementDecision,
  GecirapProviderCapability,
  CloudPlacementDecisionRepository,
  ProviderCapabilityRepository,
} from '../repositories/multi-cloud-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Placement Engine Service
// ============================================================================

export class PlacementEngineService extends BaseGecirapService {
  constructor(
    private readonly placementRepo: CloudPlacementDecisionRepository,
    private readonly capabilityRepo: ProviderCapabilityRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  async listDecisions(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudPlacementDecision>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.placementRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getDecision(schoolId: string, id: string): Promise<GecirapCloudPlacementDecision> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Décision placement');
    return this.ensureExists(this.placementRepo, id, schoolId, 'Décision placement');
  }

  async createDecision(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudPlacementDecision> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['resource_type', 'resource_name', 'target_provider', 'target_account_id', 'target_region', 'decision_reason'], 'Décision placement');

    const validated = this.validateSchema(createPlacementDecisionSchema, data, 'Décision placement');

    return this.placementRepo.create(
      {
        resource_type: validated.resource_type,
        resource_name: validated.resource_name,
        target_provider: validated.target_provider,
        target_account_id: validated.target_account_id,
        target_region: validated.target_region,
        decision_reason: validated.decision_reason,
        estimated_monthly_cost: validated.estimated_monthly_cost,
        status: validated.status ?? 'pending',
        decided_at: new Date().toISOString(),
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateDecision(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudPlacementDecision> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Décision placement');

    const existing = await this.ensureExists(this.placementRepo, id, schoolId, 'Décision placement');
    this.validateOwnership(existing, schoolId, 'Décision placement');

    const validated = this.validateSchema(updatePlacementDecisionSchema, data, 'Décision placement');
    return this.placementRepo.update(id, schoolId, validated);
  }

  async approveDecision(
    schoolId: string,
    id: string,
  ): Promise<GecirapCloudPlacementDecision> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Décision placement');

    const existing = await this.ensureExists(this.placementRepo, id, schoolId, 'Décision placement');
    this.validateOwnership(existing, schoolId, 'Décision placement');

    if (existing.status !== 'pending') {
      throw new GecirapPlacementError(
        `Impossible d'approuver une décision avec le statut "${existing.status}"`,
      );
    }

    return this.placementRepo.update(id, schoolId, { status: 'approved' });
  }

  async rejectDecision(
    schoolId: string,
    id: string,
  ): Promise<GecirapCloudPlacementDecision> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Décision placement');

    const existing = await this.ensureExists(this.placementRepo, id, schoolId, 'Décision placement');
    this.validateOwnership(existing, schoolId, 'Décision placement');

    if (existing.status !== 'pending') {
      throw new GecirapPlacementError(
        `Impossible de rejeter une décision avec le statut "${existing.status}"`,
      );
    }

    return this.placementRepo.update(id, schoolId, { status: 'rejected' });
  }

  async evaluatePlacement(
    schoolId: string,
    resourceType: string,
    requirements: Record<string, unknown>,
  ): Promise<{
    recommendations: Array<{
      provider: string;
      region: string;
      estimatedCost: number;
      score: number;
    }>;
  }> {
    this.validateSchoolId(schoolId);
    if (!resourceType || resourceType.trim().length === 0) {
      throw new GecirapPlacementError('Le type de ressource est requis');
    }

    const capabilities = await this.capabilityRepo.findAvailable(schoolId);

    const recommendations = capabilities.map((cap) => ({
      provider: cap.provider,
      region: cap.region_code ?? 'global',
      estimatedCost: 0,
      score: 1,
    }));

    return { recommendations };
  }

  async listByResource(
    schoolId: string,
    resourceType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCloudPlacementDecision>> {
    this.validateSchoolId(schoolId);
    return this.placementRepo.findByResource(resourceType, schoolId, this.validatePagination(params));
  }

  async listByProvider(
    schoolId: string,
    provider: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCloudPlacementDecision>> {
    this.validateSchoolId(schoolId);
    return this.placementRepo.findByProvider(provider, schoolId, this.validatePagination(params));
  }

  async listRecent(
    schoolId: string,
    limitCount = 50,
  ): Promise<GecirapCloudPlacementDecision[]> {
    this.validateSchoolId(schoolId);
    return this.placementRepo.findRecent(schoolId, limitCount);
  }

  async getPlacementOverview(schoolId: string): Promise<{
    totalDecisions: number;
    pending: number;
    approved: number;
    rejected: number;
    totalEstimatedCost: number;
  }> {
    this.validateSchoolId(schoolId);
    const all = await this.placementRepo.findAll(schoolId, { limit: 500 });

    let pending = 0;
    let approved = 0;
    let rejected = 0;
    let totalEstimatedCost = 0;

    for (const decision of all.data) {
      if (decision.status === 'pending') pending++;
      else if (decision.status === 'approved') approved++;
      else if (decision.status === 'rejected') rejected++;
      totalEstimatedCost += decision.estimated_monthly_cost ?? 0;
    }

    return {
      totalDecisions: all.total,
      pending,
      approved,
      rejected,
      totalEstimatedCost,
    };
  }
}
