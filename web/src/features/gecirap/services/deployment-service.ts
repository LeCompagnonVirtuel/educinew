import {
  GecirapCloudDeploymentError,
  GecirapCloudDeploymentFailedError,
} from '@educi/errors';
import {
  createCloudDeploymentSchema,
  updateCloudDeploymentSchema,
  createRegionalDeploymentSchema,
  updateRegionalDeploymentSchema,
} from '../validators/cloud-infrastructure';
import {
  createRegionalDeploymentSchema as createRegionalSchema,
  updateRegionalDeploymentSchema as updateRegionalSchema,
} from '../validators/multi-region';
import type {
  GecirapCloudDeployment,
  CloudDeploymentRepository,
} from '../repositories/cloud-infrastructure-repository';
import type {
  GecirapRegionalDeployment,
  RegionalDeploymentRepository,
} from '../repositories/multi-region-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Deployment Service
// ============================================================================

export class DeploymentService extends BaseGecirapService {
  constructor(
    private readonly cloudDeploymentRepo: CloudDeploymentRepository,
    private readonly regionalDeploymentRepo: RegionalDeploymentRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Cloud Deployments ───────────────────────────────────────────────────

  async listCloudDeployments(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudDeployment>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.cloudDeploymentRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getCloudDeployment(schoolId: string, id: string): Promise<GecirapCloudDeployment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Déploiement cloud');
    return this.ensureExists(this.cloudDeploymentRepo, id, schoolId, 'Déploiement cloud');
  }

  async createCloudDeployment(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudDeployment> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['environment_id', 'account_id', 'name', 'version'], 'Déploiement cloud');

    const validated = this.validateSchema(createCloudDeploymentSchema, data, 'Déploiement cloud');
    return this.cloudDeploymentRepo.create(
      {
        environment_id: validated.environment_id,
        account_id: validated.account_id,
        name: validated.name,
        version: validated.version,
        status: validated.status ?? 'pending',
        deployed_at: new Date().toISOString(),
        completed_at: validated.completed_at,
        artifacts: validated.artifacts,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateCloudDeployment(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudDeployment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Déploiement cloud');

    const existing = await this.ensureExists(this.cloudDeploymentRepo, id, schoolId, 'Déploiement cloud');
    this.validateOwnership(existing, schoolId, 'Déploiement cloud');

    const validated = this.validateSchema(updateCloudDeploymentSchema, data, 'Déploiement cloud');
    return this.cloudDeploymentRepo.update(id, schoolId, validated);
  }

  async cancelCloudDeployment(schoolId: string, id: string): Promise<GecirapCloudDeployment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Déploiement cloud');

    const existing = await this.ensureExists(this.cloudDeploymentRepo, id, schoolId, 'Déploiement cloud');
    this.validateOwnership(existing, schoolId, 'Déploiement cloud');

    if (!['pending', 'running'].includes(existing.status)) {
      throw new GecirapCloudDeploymentFailedError(
        `Impossible d'annuler un déploiement avec le statut "${existing.status}"`,
      );
    }

    return this.cloudDeploymentRepo.update(id, schoolId, { status: 'cancelled' });
  }

  async listActiveDeployments(schoolId: string): Promise<GecirapCloudDeployment[]> {
    this.validateSchoolId(schoolId);
    return this.cloudDeploymentRepo.findActive(schoolId);
  }

  async listByEnvironment(
    schoolId: string,
    environmentId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCloudDeployment>> {
    this.validateSchoolId(schoolId);
    this.validateId(environmentId, 'Environnement');
    return this.cloudDeploymentRepo.findByEnvironmentId(environmentId, schoolId, this.validatePagination(params));
  }

  // ─── Regional Deployments ────────────────────────────────────────────────

  async listRegionalDeployments(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapRegionalDeployment>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.regionalDeploymentRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getRegionalDeployment(schoolId: string, id: string): Promise<GecirapRegionalDeployment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Déploiement régional');
    return this.ensureExists(this.regionalDeploymentRepo, id, schoolId, 'Déploiement régional');
  }

  async createRegionalDeployment(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRegionalDeployment> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['deployment_name', 'region_id', 'environment_id'], 'Déploiement régional');

    const validated = this.validateSchema(createRegionalSchema, data, 'Déploiement régional');
    return this.regionalDeploymentRepo.create(
      {
        deployment_name: validated.deployment_name,
        region_id: validated.region_id,
        environment_id: validated.environment_id,
        status: validated.status ?? 'pending',
        deployed_at: new Date().toISOString(),
        completed_at: validated.completed_at,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateRegionalDeployment(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapRegionalDeployment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Déploiement régional');

    const existing = await this.ensureExists(this.regionalDeploymentRepo, id, schoolId, 'Déploiement régional');
    this.validateOwnership(existing, schoolId, 'Déploiement régional');

    const validated = this.validateSchema(updateRegionalSchema, data, 'Déploiement régional');
    return this.regionalDeploymentRepo.update(id, schoolId, validated);
  }

  async listByRegion(
    schoolId: string,
    regionId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapRegionalDeployment>> {
    this.validateSchoolId(schoolId);
    this.validateId(regionId, 'Région');
    return this.regionalDeploymentRepo.findByRegionId(regionId, schoolId, this.validatePagination(params));
  }

  // ─── Orchestration ───────────────────────────────────────────────────────

  async deployToRegion(
    schoolId: string,
    cloudDeploymentId: string,
    regionId: string,
  ): Promise<GecirapRegionalDeployment> {
    this.validateSchoolId(schoolId);
    this.validateId(cloudDeploymentId, 'Déploiement cloud');
    this.validateId(regionId, 'Région');

    const cloudDeployment = await this.ensureExists(
      this.cloudDeploymentRepo,
      cloudDeploymentId,
      schoolId,
      'Déploiement cloud',
    );

    return this.regionalDeploymentRepo.create(
      {
        deployment_name: cloudDeployment.name,
        region_id: regionId,
        environment_id: cloudDeployment.environment_id,
        status: 'pending',
        deployed_at: new Date().toISOString(),
        metadata: { source_cloud_deployment_id: cloudDeploymentId },
      },
      schoolId,
    );
  }

  async getDeploymentOverview(schoolId: string): Promise<{
    cloudDeployments: { total: number; active: number; failed: number };
    regionalDeployments: { total: number; active: number; failed: number };
  }> {
    this.validateSchoolId(schoolId);

    const cloudDeployments = await this.cloudDeploymentRepo.findAll(schoolId, { limit: 500 });
    const regionalDeployments = await this.regionalDeploymentRepo.findAll(schoolId, { limit: 500 });

    const cloudActive = cloudDeployments.data.filter((d) => d.status === 'active').length;
    const cloudFailed = cloudDeployments.data.filter((d) => d.status === 'failed').length;
    const regionalActive = regionalDeployments.data.filter((d) => d.status === 'active').length;
    const regionalFailed = regionalDeployments.data.filter((d) => d.status === 'failed').length;

    return {
      cloudDeployments: {
        total: cloudDeployments.total,
        active: cloudActive,
        failed: cloudFailed,
      },
      regionalDeployments: {
        total: regionalDeployments.total,
        active: regionalActive,
        failed: regionalFailed,
      },
    };
  }
}
