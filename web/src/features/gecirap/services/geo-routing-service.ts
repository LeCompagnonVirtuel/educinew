import {
  GecirapTrafficRouteError,
  GecirapFailoverError,
  GecirapFailoverFailedError,
} from '@educi/errors';
import {
  createTrafficRouteSchema,
  updateTrafficRouteSchema,
  createFailoverPolicySchema,
  updateFailoverPolicySchema,
} from '../validators/multi-region';
import type {
  GecirapTrafficRoute,
  GecirapFailoverPolicy,
  TrafficRouteRepository,
  FailoverPolicyRepository,
  GeoRegionRepository,
} from '../repositories/multi-region-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Geo Routing Service
// ============================================================================

export class GeoRoutingService extends BaseGecirapService {
  constructor(
    private readonly trafficRouteRepo: TrafficRouteRepository,
    private readonly failoverPolicyRepo: FailoverPolicyRepository,
    private readonly regionRepo: GeoRegionRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Traffic Routes ──────────────────────────────────────────────────────

  async listRoutes(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapTrafficRoute>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.trafficRouteRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getRoute(schoolId: string, id: string): Promise<GecirapTrafficRoute> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Route trafic');
    return this.ensureExists(this.trafficRouteRepo, id, schoolId, 'Route trafic');
  }

  async createRoute(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapTrafficRoute> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'source_region_id', 'destination_region_id', 'weight'], 'Route trafic');

    const validated = this.validateSchema(createTrafficRouteSchema, data, 'Route trafic');

    await this.ensureExists(this.regionRepo, validated.source_region_id, schoolId, 'Région source');
    await this.ensureExists(this.regionRepo, validated.destination_region_id, schoolId, 'Région destination');

    this.validateRange(validated.weight, 0, 100, 'weight', 'Route trafic');

    return this.trafficRouteRepo.create(
      {
        name: validated.name,
        source_region_id: validated.source_region_id,
        destination_region_id: validated.destination_region_id,
        weight: validated.weight,
        health_check_url: validated.health_check_url,
        is_active: validated.is_active ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateRoute(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapTrafficRoute> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Route trafic');

    const existing = await this.ensureExists(this.trafficRouteRepo, id, schoolId, 'Route trafic');
    this.validateOwnership(existing, schoolId, 'Route trafic');

    const validated = this.validateSchema(updateTrafficRouteSchema, data, 'Route trafic');

    if (validated.weight !== undefined) {
      this.validateRange(validated.weight, 0, 100, 'weight', 'Route trafic');
    }

    return this.trafficRouteRepo.update(id, schoolId, validated);
  }

  async deleteRoute(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Route trafic');

    const existing = await this.ensureExists(this.trafficRouteRepo, id, schoolId, 'Route trafic');
    this.validateOwnership(existing, schoolId, 'Route trafic');

    await this.trafficRouteRepo.softDelete(id, schoolId);
  }

  async listBySourceRegion(
    schoolId: string,
    sourceRegionId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapTrafficRoute>> {
    this.validateSchoolId(schoolId);
    this.validateId(sourceRegionId, 'Région source');
    return this.trafficRouteRepo.findBySourceRegion(sourceRegionId, schoolId, this.validatePagination(params));
  }

  async listByDestinationRegion(
    schoolId: string,
    destinationRegionId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapTrafficRoute>> {
    this.validateSchoolId(schoolId);
    this.validateId(destinationRegionId, 'Région destination');
    return this.trafficRouteRepo.findByDestinationRegion(destinationRegionId, schoolId, this.validatePagination(params));
  }

  async toggleRoute(schoolId: string, id: string, isActive: boolean): Promise<GecirapTrafficRoute> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Route trafic');

    const existing = await this.ensureExists(this.trafficRouteRepo, id, schoolId, 'Route trafic');
    this.validateOwnership(existing, schoolId, 'Route trafic');

    return this.trafficRouteRepo.update(id, schoolId, { is_active: isActive });
  }

  // ─── Failover Policies ───────────────────────────────────────────────────

  async listFailoverPolicies(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapFailoverPolicy>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.failoverPolicyRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getFailoverPolicy(schoolId: string, id: string): Promise<GecirapFailoverPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique failover');
    return this.ensureExists(this.failoverPolicyRepo, id, schoolId, 'Politique failover');
  }

  async createFailoverPolicy(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapFailoverPolicy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'source_region_id', 'target_region_id', 'trigger_condition', 'priority'], 'Politique failover');

    const validated = this.validateSchema(createFailoverPolicySchema, data, 'Politique failover');

    await this.ensureExists(this.regionRepo, validated.source_region_id, schoolId, 'Région source');
    await this.ensureExists(this.regionRepo, validated.target_region_id, schoolId, 'Région cible');

    if (validated.source_region_id === validated.target_region_id) {
      throw new GecirapFailoverError('La région source et la région cible doivent être différentes');
    }

    return this.failoverPolicyRepo.create(
      {
        name: validated.name,
        source_region_id: validated.source_region_id,
        target_region_id: validated.target_region_id,
        trigger_condition: validated.trigger_condition,
        priority: validated.priority,
        is_active: validated.is_active ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateFailoverPolicy(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapFailoverPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique failover');

    const existing = await this.ensureExists(this.failoverPolicyRepo, id, schoolId, 'Politique failover');
    this.validateOwnership(existing, schoolId, 'Politique failover');

    const validated = this.validateSchema(updateFailoverPolicySchema, data, 'Politique failover');
    return this.failoverPolicyRepo.update(id, schoolId, validated);
  }

  async deleteFailoverPolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique failover');

    const existing = await this.ensureExists(this.failoverPolicyRepo, id, schoolId, 'Politique failover');
    this.validateOwnership(existing, schoolId, 'Politique failover');

    await this.failoverPolicyRepo.softDelete(id, schoolId);
  }

  async listBySourceRegionPolicies(
    schoolId: string,
    sourceRegionId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapFailoverPolicy>> {
    this.validateSchoolId(schoolId);
    this.validateId(sourceRegionId, 'Région source');
    return this.failoverPolicyRepo.findBySourceRegion(sourceRegionId, schoolId, this.validatePagination(params));
  }

  async executeFailover(
    schoolId: string,
    policyId: string,
  ): Promise<{ success: boolean; sourceRegionId: string; targetRegionId: string; message: string }> {
    this.validateSchoolId(schoolId);
    this.validateId(policyId, 'Politique failover');

    const policy = await this.ensureExists(this.failoverPolicyRepo, policyId, schoolId, 'Politique failover');
    this.validateOwnership(policy, schoolId, 'Politique failover');

    if (!policy.is_active) {
      throw new GecirapFailoverFailedError('La politique de failover est désactivée');
    }

    return {
      success: true,
      sourceRegionId: policy.source_region_id,
      targetRegionId: policy.target_region_id,
      message: `Failover déclenché de ${policy.source_region_id} vers ${policy.target_region_id}`,
    };
  }
}
