import {
  GecirapCloudResourceError,
  GecirapCloudResourceNotFoundError,
  GecirapCloudHealthCheckError,
} from '@educi/errors';
import {
  createCloudResourceSchema,
  updateCloudResourceSchema,
} from '../validators/cloud-infrastructure';
import type {
  GecirapCloudResource,
  CloudResourceRepository,
  CloudAccountRepository,
} from '../repositories/cloud-infrastructure-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Cloud Resource Service
// ============================================================================

export class CloudResourceService extends BaseGecirapService {
  constructor(
    private readonly resourceRepo: CloudResourceRepository,
    private readonly accountRepo: CloudAccountRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  async listResources(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudResource>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.resourceRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getResource(schoolId: string, id: string): Promise<GecirapCloudResource> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Ressource cloud');
    return this.ensureExists(this.resourceRepo, id, schoolId, 'Ressource cloud');
  }

  async listByAccount(
    schoolId: string,
    accountId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCloudResource>> {
    this.validateSchoolId(schoolId);
    this.validateId(accountId, 'Compte cloud');
    await this.ensureExists(this.accountRepo, accountId, schoolId, 'Compte cloud');
    return this.resourceRepo.findByAccountId(accountId, schoolId, this.validatePagination(params));
  }

  async listByRegion(
    schoolId: string,
    regionCode: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCloudResource>> {
    this.validateSchoolId(schoolId);
    if (!regionCode || regionCode.trim().length === 0) {
      throw new GecirapCloudResourceError('Le code de région est requis');
    }
    return this.resourceRepo.findByRegionCode(regionCode, schoolId, this.validatePagination(params));
  }

  async listByType(
    schoolId: string,
    resourceType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCloudResource>> {
    this.validateSchoolId(schoolId);
    if (!resourceType || resourceType.trim().length === 0) {
      throw new GecirapCloudResourceError('Le type de ressource est requis');
    }
    return this.resourceRepo.findByResourceType(resourceType, schoolId, this.validatePagination(params));
  }

  async createResource(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudResource> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['account_id', 'region_code', 'resource_type', 'external_id', 'name'],
      'Ressource cloud',
    );

    const validated = this.validateSchema(createCloudResourceSchema, data, 'Ressource cloud');

    await this.ensureExists(this.accountRepo, validated.account_id, schoolId, 'Compte cloud');

    return this.resourceRepo.create(
      {
        account_id: validated.account_id,
        region_code: validated.region_code,
        resource_type: validated.resource_type,
        external_id: validated.external_id,
        name: validated.name,
        status: validated.status ?? 'pending',
        specification: validated.specification,
        monthly_cost_estimate: validated.monthly_cost_estimate,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateResource(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudResource> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Ressource cloud');

    const existing = await this.ensureExists(this.resourceRepo, id, schoolId, 'Ressource cloud');
    this.validateOwnership(existing, schoolId, 'Ressource cloud');

    const validated = this.validateSchema(updateCloudResourceSchema, data, 'Ressource cloud');
    return this.resourceRepo.update(id, schoolId, validated);
  }

  async deleteResource(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Ressource cloud');

    const existing = await this.ensureExists(this.resourceRepo, id, schoolId, 'Ressource cloud');
    this.validateOwnership(existing, schoolId, 'Ressource cloud');

    await this.resourceRepo.softDelete(id, schoolId);
  }

  async getHealthStatus(
    schoolId: string,
    id: string,
  ): Promise<{ healthy: boolean; status: string; lastChecked: string }> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Ressource cloud');

    const resource = await this.ensureExists(this.resourceRepo, id, schoolId, 'Ressource cloud');

    const healthy = resource.status === 'running' || resource.status === 'active';

    return {
      healthy,
      status: resource.status,
      lastChecked: new Date().toISOString(),
    };
  }

  async getResourceStats(schoolId: string): Promise<{
    total: number;
    byStatus: Record<string, number>;
    byType: Record<string, number>;
    totalMonthlyEstimate: number;
  }> {
    this.validateSchoolId(schoolId);
    const all = await this.resourceRepo.findAll(schoolId, { limit: 500 });

    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let totalMonthlyEstimate = 0;

    for (const resource of all.data) {
      byStatus[resource.status] = (byStatus[resource.status] ?? 0) + 1;
      byType[resource.resource_type] = (byType[resource.resource_type] ?? 0) + 1;
      totalMonthlyEstimate += resource.monthly_cost_estimate ?? 0;
    }

    return {
      total: all.total,
      byStatus,
      byType,
      totalMonthlyEstimate,
    };
  }
}
