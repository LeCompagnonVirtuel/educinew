import {
  GecirapCloudProviderError,
  GecirapCloudProviderNotFoundError,
  GecirapCloudAccountError,
  GecirapCloudAccountConflictError,
  GecirapCloudQuotaExceededError,
  GecirapCloudEnvironmentError,
  GecirapCloudDeploymentError,
  GecirapCloudDeploymentFailedError,
  GecirapCloudHealthCheckError,
} from '@educi/errors';
import {
  createCloudProviderSchema,
  updateCloudProviderSchema,
  createCloudAccountSchema,
  updateCloudAccountSchema,
  createCloudRegionSchema,
  updateCloudRegionSchema,
  createCloudEnvironmentSchema,
  updateCloudEnvironmentSchema,
  createCloudDeploymentSchema,
  updateCloudDeploymentSchema,
  createCloudQuotaSchema,
  updateCloudQuotaSchema,
} from '../validators/cloud-infrastructure';
import type {
  GecirapCloudProvider,
  GecirapCloudAccount,
  GecirapCloudRegion,
  GecirapCloudEnvironment,
  GecirapCloudDeployment,
  GecirapCloudQuota,
  CloudProviderRepository,
  CloudAccountRepository,
  CloudRegionRepository,
  CloudEnvironmentRepository,
  CloudDeploymentRepository,
  CloudQuotaRepository,
} from '../repositories/cloud-infrastructure-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Cloud Provider Service
// ============================================================================

export class CloudProviderService extends BaseGecirapService {
  constructor(
    private readonly providerRepo: CloudProviderRepository,
    private readonly accountRepo: CloudAccountRepository,
    private readonly regionRepo: CloudRegionRepository,
    private readonly environmentRepo: CloudEnvironmentRepository,
    private readonly deploymentRepo: CloudDeploymentRepository,
    private readonly quotaRepo: CloudQuotaRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Providers ───────────────────────────────────────────────────────────

  async listProviders(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudProvider>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.providerRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getProvider(schoolId: string, id: string): Promise<GecirapCloudProvider> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Fournisseur cloud');
    return this.ensureExists(this.providerRepo, id, schoolId, 'Fournisseur cloud');
  }

  async createProvider(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudProvider> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'display_name', 'provider_type', 'auth_method'], 'Fournisseur cloud');

    const validated = this.validateSchema(createCloudProviderSchema, data, 'Fournisseur cloud');

    const existing = await this.providerRepo.findAll(schoolId, {
      name: validated.name,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GecirapCloudProviderError(
        `Un fournisseur cloud "${validated.name}" existe déjà`,
      );
    }

    return this.providerRepo.create(
      {
        name: validated.name,
        display_name: validated.display_name,
        provider_type: validated.provider_type,
        base_url: validated.base_url,
        auth_method: validated.auth_method,
        is_active: validated.is_active ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateProvider(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudProvider> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Fournisseur cloud');

    const existing = await this.ensureExists(this.providerRepo, id, schoolId, 'Fournisseur cloud');
    this.validateOwnership(existing, schoolId, 'Fournisseur cloud');

    const validated = this.validateSchema(updateCloudProviderSchema, data, 'Fournisseur cloud');
    return this.providerRepo.update(id, schoolId, validated);
  }

  async deleteProvider(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Fournisseur cloud');

    const existing = await this.ensureExists(this.providerRepo, id, schoolId, 'Fournisseur cloud');
    this.validateOwnership(existing, schoolId, 'Fournisseur cloud');

    const accounts = await this.accountRepo.findByProviderId(id, schoolId, { limit: 1 });
    if (accounts.total > 0) {
      throw new GecirapCloudProviderError(
        'Impossible de supprimer un fournisseur avec des comptes associés',
      );
    }

    await this.providerRepo.softDelete(id, schoolId);
  }

  async toggleProvider(schoolId: string, id: string, isActive: boolean): Promise<GecirapCloudProvider> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Fournisseur cloud');

    const existing = await this.ensureExists(this.providerRepo, id, schoolId, 'Fournisseur cloud');
    this.validateOwnership(existing, schoolId, 'Fournisseur cloud');

    return this.providerRepo.update(id, schoolId, { is_active: isActive });
  }

  // ─── Accounts ────────────────────────────────────────────────────────────

  async listAccounts(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudAccount>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.accountRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getAccount(schoolId: string, id: string): Promise<GecirapCloudAccount> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Compte cloud');
    return this.ensureExists(this.accountRepo, id, schoolId, 'Compte cloud');
  }

  async createAccount(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudAccount> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['provider_id', 'account_name', 'account_external_id'], 'Compte cloud');

    const validated = this.validateSchema(createCloudAccountSchema, data, 'Compte cloud');

    const existing = await this.accountRepo.findByExternalId(validated.account_external_id, schoolId);
    if (existing) {
      throw new GecirapCloudAccountConflictError(
        `Un compte avec l'ID externe "${validated.account_external_id}" existe déjà`,
      );
    }

    return this.accountRepo.create(
      {
        provider_id: validated.provider_id,
        account_name: validated.account_name,
        account_external_id: validated.account_external_id,
        status: validated.status ?? 'pending',
        credential_ref: validated.credential_ref,
        region: validated.region,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateAccount(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudAccount> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Compte cloud');

    const existing = await this.ensureExists(this.accountRepo, id, schoolId, 'Compte cloud');
    this.validateOwnership(existing, schoolId, 'Compte cloud');

    const validated = this.validateSchema(updateCloudAccountSchema, data, 'Compte cloud');
    return this.accountRepo.update(id, schoolId, validated);
  }

  async deleteAccount(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Compte cloud');

    const existing = await this.ensureExists(this.accountRepo, id, schoolId, 'Compte cloud');
    this.validateOwnership(existing, schoolId, 'Compte cloud');

    await this.accountRepo.softDelete(id, schoolId);
  }

  // ─── Regions ─────────────────────────────────────────────────────────────

  async listRegions(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudRegion>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.regionRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getRegion(schoolId: string, id: string): Promise<GecirapCloudRegion> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Région cloud');
    return this.ensureExists(this.regionRepo, id, schoolId, 'Région cloud');
  }

  async createRegion(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudRegion> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['provider_id', 'region_code', 'display_name', 'continent', 'country'], 'Région cloud');

    const validated = this.validateSchema(createCloudRegionSchema, data, 'Région cloud');
    return this.regionRepo.create(
      {
        provider_id: validated.provider_id,
        region_code: validated.region_code,
        display_name: validated.display_name,
        continent: validated.continent,
        country: validated.country,
        latitude: validated.latitude,
        longitude: validated.longitude,
        availability_zones: validated.availability_zones ?? 1,
        is_active: validated.is_active ?? true,
      },
      schoolId,
    );
  }

  async updateRegion(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudRegion> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Région cloud');

    const existing = await this.ensureExists(this.regionRepo, id, schoolId, 'Région cloud');
    this.validateOwnership(existing, schoolId, 'Région cloud');

    const validated = this.validateSchema(updateCloudRegionSchema, data, 'Région cloud');
    return this.regionRepo.update(id, schoolId, validated);
  }

  async deleteRegion(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Région cloud');

    const existing = await this.ensureExists(this.regionRepo, id, schoolId, 'Région cloud');
    this.validateOwnership(existing, schoolId, 'Région cloud');

    await this.regionRepo.softDelete(id, schoolId);
  }

  // ─── Environments ────────────────────────────────────────────────────────

  async listEnvironments(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCloudEnvironment>> {
    this.validateSchoolId(schoolId);
    return this.environmentRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getEnvironment(schoolId: string, id: string): Promise<GecirapCloudEnvironment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Environnement cloud');
    return this.ensureExists(this.environmentRepo, id, schoolId, 'Environnement cloud');
  }

  async createEnvironment(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudEnvironment> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'environment_type'], 'Environnement cloud');

    const validated = this.validateSchema(createCloudEnvironmentSchema, data, 'Environnement cloud');
    return this.environmentRepo.create(
      {
        name: validated.name,
        description: validated.description,
        environment_type: validated.environment_type,
        provider_ids: validated.provider_ids ?? [],
        is_active: validated.is_active ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateEnvironment(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudEnvironment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Environnement cloud');

    const existing = await this.ensureExists(this.environmentRepo, id, schoolId, 'Environnement cloud');
    this.validateOwnership(existing, schoolId, 'Environnement cloud');

    const validated = this.validateSchema(updateCloudEnvironmentSchema, data, 'Environnement cloud');
    return this.environmentRepo.update(id, schoolId, validated);
  }

  async deleteEnvironment(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Environnement cloud');

    const existing = await this.ensureExists(this.environmentRepo, id, schoolId, 'Environnement cloud');
    this.validateOwnership(existing, schoolId, 'Environnement cloud');

    await this.environmentRepo.softDelete(id, schoolId);
  }

  // ─── Deployments ─────────────────────────────────────────────────────────

  async listDeployments(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCloudDeployment>> {
    this.validateSchoolId(schoolId);
    return this.deploymentRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getDeployment(schoolId: string, id: string): Promise<GecirapCloudDeployment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Déploiement cloud');
    return this.ensureExists(this.deploymentRepo, id, schoolId, 'Déploiement cloud');
  }

  async createDeployment(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudDeployment> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['environment_id', 'account_id', 'name', 'version'], 'Déploiement cloud');

    const validated = this.validateSchema(createCloudDeploymentSchema, data, 'Déploiement cloud');
    return this.deploymentRepo.create(
      {
        environment_id: validated.environment_id,
        account_id: validated.account_id,
        name: validated.name,
        version: validated.version,
        status: validated.status ?? 'pending',
        deployed_at: validated.deployed_at,
        completed_at: validated.completed_at,
        artifacts: validated.artifacts,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateDeployment(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudDeployment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Déploiement cloud');

    const existing = await this.ensureExists(this.deploymentRepo, id, schoolId, 'Déploiement cloud');
    this.validateOwnership(existing, schoolId, 'Déploiement cloud');

    const validated = this.validateSchema(updateCloudDeploymentSchema, data, 'Déploiement cloud');
    return this.deploymentRepo.update(id, schoolId, validated);
  }

  async cancelDeployment(schoolId: string, id: string): Promise<GecirapCloudDeployment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Déploiement cloud');

    const existing = await this.ensureExists(this.deploymentRepo, id, schoolId, 'Déploiement cloud');
    this.validateOwnership(existing, schoolId, 'Déploiement cloud');

    if (!['pending', 'running'].includes(existing.status)) {
      throw new GecirapCloudDeploymentFailedError(
        `Impossible d'annuler un déploiement avec le statut "${existing.status}"`,
      );
    }

    return this.deploymentRepo.update(id, schoolId, { status: 'cancelled' });
  }

  // ─── Quotas ──────────────────────────────────────────────────────────────

  async listQuotas(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCloudQuota>> {
    this.validateSchoolId(schoolId);
    return this.quotaRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getQuota(schoolId: string, id: string): Promise<GecirapCloudQuota> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Quota cloud');
    return this.ensureExists(this.quotaRepo, id, schoolId, 'Quota cloud');
  }

  async createQuota(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudQuota> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['account_id', 'region_code', 'quota_name', 'quota_limit', 'unit'], 'Quota cloud');

    const validated = this.validateSchema(createCloudQuotaSchema, data, 'Quota cloud');
    return this.quotaRepo.create(
      {
        account_id: validated.account_id,
        region_code: validated.region_code,
        quota_name: validated.quota_name,
        quota_limit: validated.quota_limit,
        quota_used: validated.quota_used ?? 0,
        unit: validated.unit,
        alert_threshold: validated.alert_threshold ?? 80,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateQuota(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudQuota> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Quota cloud');

    const existing = await this.ensureExists(this.quotaRepo, id, schoolId, 'Quota cloud');
    this.validateOwnership(existing, schoolId, 'Quota cloud');

    const validated = this.validateSchema(updateCloudQuotaSchema, data, 'Quota cloud');
    return this.quotaRepo.update(id, schoolId, validated);
  }

  async getExceededQuotas(schoolId: string): Promise<GecirapCloudQuota[]> {
    this.validateSchoolId(schoolId);
    return this.quotaRepo.findExceeded(schoolId);
  }

  async checkQuotaHealth(schoolId: string): Promise<{
    total: number;
    exceeded: number;
    warning: number;
    healthy: number;
  }> {
    this.validateSchoolId(schoolId);
    const quotas = await this.quotaRepo.findAll(schoolId, { limit: 500 });
    let exceeded = 0;
    let warning = 0;
    let healthy = 0;

    for (const quota of quotas.data) {
      const usagePercent = quota.quota_limit > 0
        ? (quota.quota_used / quota.quota_limit) * 100
        : 0;
      const threshold = quota.alert_threshold ?? 80;

      if (usagePercent > 100) {
        exceeded++;
      } else if (usagePercent >= threshold) {
        warning++;
      } else {
        healthy++;
      }
    }

    return {
      total: quotas.total,
      exceeded,
      warning,
      healthy,
    };
  }
}
