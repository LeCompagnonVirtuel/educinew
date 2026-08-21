import {
  GecirapFailoverError,
  GecirapFailoverFailedError,
} from '@educi/errors';
import {
  createFailoverPolicySchema,
  updateFailoverPolicySchema,
} from '../validators/multi-region';
import type {
  GecirapFailoverPolicy,
  GecirapRegionHealth,
  FailoverPolicyRepository,
  RegionHealthRepository,
} from '../repositories/multi-region-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Failover Service
// ============================================================================

export class FailoverService extends BaseGecirapService {
  constructor(
    private readonly failoverRepo: FailoverPolicyRepository,
    private readonly healthRepo: RegionHealthRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  async listPolicies(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapFailoverPolicy>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.failoverRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getPolicy(schoolId: string, id: string): Promise<GecirapFailoverPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique failover');
    return this.ensureExists(this.failoverRepo, id, schoolId, 'Politique failover');
  }

  async createPolicy(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapFailoverPolicy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'source_region_id', 'target_region_id', 'trigger_condition', 'priority'], 'Politique failover');

    const validated = this.validateSchema(createFailoverPolicySchema, data, 'Politique failover');

    if (validated.source_region_id === validated.target_region_id) {
      throw new GecirapFailoverError('La région source et la région cible doivent être différentes');
    }

    return this.failoverRepo.create(
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

  async updatePolicy(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapFailoverPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique failover');

    const existing = await this.ensureExists(this.failoverRepo, id, schoolId, 'Politique failover');
    this.validateOwnership(existing, schoolId, 'Politique failover');

    const validated = this.validateSchema(updateFailoverPolicySchema, data, 'Politique failover');
    return this.failoverRepo.update(id, schoolId, validated);
  }

  async deletePolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique failover');

    const existing = await this.ensureExists(this.failoverRepo, id, schoolId, 'Politique failover');
    this.validateOwnership(existing, schoolId, 'Politique failover');

    await this.failoverRepo.softDelete(id, schoolId);
  }

  async togglePolicy(schoolId: string, id: string, isActive: boolean): Promise<GecirapFailoverPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique failover');

    const existing = await this.ensureExists(this.failoverRepo, id, schoolId, 'Politique failover');
    this.validateOwnership(existing, schoolId, 'Politique failover');

    return this.failoverRepo.update(id, schoolId, { is_active: isActive });
  }

  async listBySourceRegion(
    schoolId: string,
    sourceRegionId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapFailoverPolicy>> {
    this.validateSchoolId(schoolId);
    this.validateId(sourceRegionId, 'Région source');
    return this.failoverRepo.findBySourceRegion(sourceRegionId, schoolId, this.validatePagination(params));
  }

  async listByTargetRegion(
    schoolId: string,
    targetRegionId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapFailoverPolicy>> {
    this.validateSchoolId(schoolId);
    this.validateId(targetRegionId, 'Région cible');
    return this.failoverRepo.findByTargetRegion(targetRegionId, schoolId, this.validatePagination(params));
  }

  async evaluateFailover(
    schoolId: string,
    sourceRegionId: string,
  ): Promise<{ shouldFailover: boolean; policies: GecirapFailoverPolicy[]; unhealthyRegions: GecirapRegionHealth[] }> {
    this.validateSchoolId(schoolId);
    this.validateId(sourceRegionId, 'Région source');

    const activePolicies = await this.failoverRepo.findBySourceRegion(sourceRegionId, schoolId, {
      is_active: true,
      limit: 100,
    });

    const unhealthy = await this.healthRepo.findUnhealthy(schoolId);

    return {
      shouldFailover: unhealthy.length > 0 && activePolicies.total > 0,
      policies: activePolicies.data,
      unhealthyRegions: unhealthy,
    };
  }

  async getFailoverOverview(schoolId: string): Promise<{
    totalPolicies: number;
    activePolicies: number;
    unhealthyRegions: number;
    recentFailovers: number;
  }> {
    this.validateSchoolId(schoolId);

    const policies = await this.failoverRepo.findAll(schoolId, { limit: 500 });
    const unhealthy = await this.healthRepo.findUnhealthy(schoolId);

    return {
      totalPolicies: policies.total,
      activePolicies: policies.data.filter((p) => p.is_active).length,
      unhealthyRegions: unhealthy.length,
      recentFailovers: 0,
    };
  }
}
