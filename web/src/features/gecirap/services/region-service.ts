import {
  GecirapGeoRegionError,
  GecirapGeoRegionNotFoundError,
  GecirapRegionPolicyError,
  GecirapRegionHealthError,
} from '@educi/errors';
import {
  createGeoRegionSchema,
  updateGeoRegionSchema,
  createRegionPolicySchema,
  updateRegionPolicySchema,
  createRegionHealthSchema,
  updateRegionHealthSchema,
} from '../validators/multi-region';
import type {
  GecirapGeoRegion,
  GecirapRegionPolicy,
  GecirapRegionHealth,
  GeoRegionRepository,
  RegionPolicyRepository,
  RegionHealthRepository,
} from '../repositories/multi-region-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Region Service
// ============================================================================

export class RegionService extends BaseGecirapService {
  constructor(
    private readonly regionRepo: GeoRegionRepository,
    private readonly policyRepo: RegionPolicyRepository,
    private readonly healthRepo: RegionHealthRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Geo Regions ─────────────────────────────────────────────────────────

  async listRegions(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapGeoRegion>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.regionRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getRegion(schoolId: string, id: string): Promise<GecirapGeoRegion> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Région géographique');
    return this.ensureExists(this.regionRepo, id, schoolId, 'Région géographique');
  }

  async createRegion(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapGeoRegion> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'display_name', 'code', 'continent', 'country', 'timezone'], 'Région géographique');

    const validated = this.validateSchema(createGeoRegionSchema, data, 'Région géographique');

    const existing = await this.regionRepo.findByCode(validated.code, schoolId);
    if (existing) {
      throw new GecirapGeoRegionError(
        `Une région avec le code "${validated.code}" existe déjà`,
      );
    }

    return this.regionRepo.create(
      {
        name: validated.name,
        display_name: validated.display_name,
        code: validated.code,
        continent: validated.continent,
        country: validated.country,
        timezone: validated.timezone,
        latitude: validated.latitude,
        longitude: validated.longitude,
        data_residency_rules: validated.data_residency_rules,
        is_active: validated.is_active ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateRegion(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapGeoRegion> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Région géographique');

    const existing = await this.ensureExists(this.regionRepo, id, schoolId, 'Région géographique');
    this.validateOwnership(existing, schoolId, 'Région géographique');

    const validated = this.validateSchema(updateGeoRegionSchema, data, 'Région géographique');
    return this.regionRepo.update(id, schoolId, validated);
  }

  async deleteRegion(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Région géographique');

    const existing = await this.ensureExists(this.regionRepo, id, schoolId, 'Région géographique');
    this.validateOwnership(existing, schoolId, 'Région géographique');

    await this.regionRepo.softDelete(id, schoolId);
  }

  async listByContinent(
    schoolId: string,
    continent: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapGeoRegion>> {
    this.validateSchoolId(schoolId);
    return this.regionRepo.findByContinent(continent, schoolId, this.validatePagination(params));
  }

  // ─── Region Policies ─────────────────────────────────────────────────────

  async listPolicies(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRegionPolicy>> {
    this.validateSchoolId(schoolId);
    return this.policyRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getPolicy(schoolId: string, id: string): Promise<GecirapRegionPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique région');
    return this.ensureExists(this.policyRepo, id, schoolId, 'Politique région');
  }

  async createPolicy(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRegionPolicy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['region_id', 'policy_name', 'policy_type', 'rules'], 'Politique région');

    const validated = this.validateSchema(createRegionPolicySchema, data, 'Politique région');

    await this.ensureExists(this.regionRepo, validated.primaryRegionId, schoolId, 'Région géographique');

    return this.policyRepo.create(
      {
        region_id: validated.primaryRegionId,
        policy_name: validated.name,
        policy_type: 'DATA_RESIDENCY',
        rules: [{ primaryRegionId: validated.primaryRegionId, secondaryRegionIds: validated.secondaryRegionIds, failoverMode: validated.failoverMode, replicationMode: validated.replicationMode, rto: validated.rto, rpo: validated.rpo }],
        is_active: validated.enabled ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updatePolicy(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRegionPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique région');

    const existing = await this.ensureExists(this.policyRepo, id, schoolId, 'Politique région');
    this.validateOwnership(existing, schoolId, 'Politique région');

    const validated = this.validateSchema(updateRegionPolicySchema, data, 'Politique région');
    return this.policyRepo.update(id, schoolId, validated);
  }

  async deletePolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique région');

    const existing = await this.ensureExists(this.policyRepo, id, schoolId, 'Politique région');
    this.validateOwnership(existing, schoolId, 'Politique région');

    await this.policyRepo.softDelete(id, schoolId);
  }

  // ─── Region Health ───────────────────────────────────────────────────────

  async listHealth(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRegionHealth>> {
    this.validateSchoolId(schoolId);
    return this.healthRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getHealth(schoolId: string, id: string): Promise<GecirapRegionHealth> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Santé région');
    return this.ensureExists(this.healthRepo, id, schoolId, 'Santé région');
  }

  async createHealthCheck(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRegionHealth> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['region_id', 'status'], 'Santé région');

    const validated = this.validateSchema(createRegionHealthSchema, data, 'Santé région');

    await this.ensureExists(this.regionRepo, validated.regionId, schoolId, 'Région géographique');

    return this.healthRepo.create(
      {
        region_id: validated.regionId,
        status: validated.status,
        latency_ms: validated.latency,
        availability_percent: validated.availability,
        last_checked_at: new Date().toISOString(),
        issues: [],
        metadata: undefined,
      },
      schoolId,
    );
  }

  async updateHealth(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRegionHealth> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Santé région');

    const existing = await this.ensureExists(this.healthRepo, id, schoolId, 'Santé région');
    this.validateOwnership(existing, schoolId, 'Santé région');

    const validated = this.validateSchema(updateRegionHealthSchema, data, 'Santé région');
    return this.healthRepo.update(id, schoolId, validated);
  }

  async getUnhealthyRegions(schoolId: string): Promise<GecirapRegionHealth[]> {
    this.validateSchoolId(schoolId);
    return this.healthRepo.findUnhealthy(schoolId);
  }

  async getRegionOverview(schoolId: string): Promise<{
    totalRegions: number;
    healthy: number;
    degraded: number;
    unhealthy: number;
    avgLatencyMs: number;
  }> {
    this.validateSchoolId(schoolId);
    const allHealth = await this.healthRepo.findAll(schoolId, { limit: 500 });

    let healthy = 0;
    let degraded = 0;
    let unhealthy = 0;
    let totalLatency = 0;
    let latencyCount = 0;

    for (const health of allHealth.data) {
      if (health.status === 'healthy') {
        healthy++;
      } else if (health.status === 'degraded') {
        degraded++;
      } else {
        unhealthy++;
      }
      if (health.latency_ms !== undefined) {
        totalLatency += health.latency_ms;
        latencyCount++;
      }
    }

    return {
      totalRegions: allHealth.total,
      healthy,
      degraded,
      unhealthy,
      avgLatencyMs: latencyCount > 0 ? totalLatency / latencyCount : 0,
    };
  }
}
