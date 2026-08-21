import {
  GecirapCDNError,
} from '@educi/errors';
import {
  createCDNDistributionSchema,
  updateCDNDistributionSchema,
} from '../validators/network';
import type {
  GecirapCDNDistribution,
  CDNDistributionRepository,
} from '../repositories/network-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// CDN Service
// ============================================================================

export class CDNService extends BaseGecirapService {
  constructor(
    private readonly cdnRepo: CDNDistributionRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  async listDistributions(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapCDNDistribution>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.cdnRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getDistribution(schoolId: string, id: string): Promise<GecirapCDNDistribution> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Distribution CDN');
    return this.ensureExists(this.cdnRepo, id, schoolId, 'Distribution CDN');
  }

  async createDistribution(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCDNDistribution> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['distribution_name', 'origin_domain'], 'Distribution CDN');

    const validated = this.validateSchema(createCDNDistributionSchema, data, 'Distribution CDN');

    return this.cdnRepo.create(
      {
        distribution_name: validated.distribution_name,
        origin_domain: validated.origin_domain,
        origin_path: validated.origin_path,
        aliases: validated.aliases ?? [],
        cache_behaviors: validated.cache_behaviors ?? [],
        ssl_certificate_arn: validated.ssl_certificate_arn,
        status: validated.status ?? 'pending',
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateDistribution(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCDNDistribution> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Distribution CDN');

    const existing = await this.ensureExists(this.cdnRepo, id, schoolId, 'Distribution CDN');
    this.validateOwnership(existing, schoolId, 'Distribution CDN');

    const validated = this.validateSchema(updateCDNDistributionSchema, data, 'Distribution CDN');
    return this.cdnRepo.update(id, schoolId, validated);
  }

  async deleteDistribution(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Distribution CDN');

    const existing = await this.ensureExists(this.cdnRepo, id, schoolId, 'Distribution CDN');
    this.validateOwnership(existing, schoolId, 'Distribution CDN');

    await this.cdnRepo.softDelete(id, schoolId);
  }

  async listByOriginDomain(
    schoolId: string,
    originDomain: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCDNDistribution>> {
    this.validateSchoolId(schoolId);
    return this.cdnRepo.findByOriginDomain(originDomain, schoolId, this.validatePagination(params));
  }

  async listActiveDistributions(schoolId: string): Promise<GecirapCDNDistribution[]> {
    this.validateSchoolId(schoolId);
    return this.cdnRepo.findActive(schoolId);
  }

  async getCDNOverview(schoolId: string): Promise<{
    totalDistributions: number;
    activeDistributions: number;
    pendingDistributions: number;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.cdnRepo.findAll(schoolId, { limit: 500 });
    const active = all.data.filter((d) => d.status === 'active');
    const pending = all.data.filter((d) => d.status === 'pending');

    return {
      totalDistributions: all.total,
      activeDistributions: active.length,
      pendingDistributions: pending.length,
    };
  }
}
