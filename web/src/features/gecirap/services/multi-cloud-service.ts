import {
  GecirapPlacementError,
  GecirapMigrationError,
  GecirapMigrationFailedError,
  GecirapCloudBalanceError,
} from '@educi/errors';
import {
  createPlacementDecisionSchema,
  updatePlacementDecisionSchema,
  createCloudMigrationSchema,
  updateCloudMigrationSchema,
  createCloudBalanceSchema,
  updateCloudBalanceSchema,
  createProviderCapabilitySchema,
  updateProviderCapabilitySchema,
} from '../validators/multi-cloud';
import type {
  GecirapCloudPlacementDecision,
  GecirapCloudMigration,
  GecirapCloudBalance,
  GecirapProviderCapability,
  CloudPlacementDecisionRepository,
  CloudMigrationRepository,
  CloudBalanceRepository,
  ProviderCapabilityRepository,
} from '../repositories/multi-cloud-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Multi-Cloud Service
// ============================================================================

export class MultiCloudService extends BaseGecirapService {
  constructor(
    private readonly placementRepo: CloudPlacementDecisionRepository,
    private readonly migrationRepo: CloudMigrationRepository,
    private readonly balanceRepo: CloudBalanceRepository,
    private readonly capabilityRepo: ProviderCapabilityRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Placement Decisions ─────────────────────────────────────────────────

  async listPlacements(
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

  async getPlacement(schoolId: string, id: string): Promise<GecirapCloudPlacementDecision> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Décision placement');
    return this.ensureExists(this.placementRepo, id, schoolId, 'Décision placement');
  }

  async createPlacement(
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

  async updatePlacement(
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

  async listRecentPlacements(
    schoolId: string,
    limitCount = 50,
  ): Promise<GecirapCloudPlacementDecision[]> {
    this.validateSchoolId(schoolId);
    return this.placementRepo.findRecent(schoolId, limitCount);
  }

  // ─── Migrations ──────────────────────────────────────────────────────────

  async listMigrations(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudMigration>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.migrationRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getMigration(schoolId: string, id: string): Promise<GecirapCloudMigration> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Migration cloud');
    return this.ensureExists(this.migrationRepo, id, schoolId, 'Migration cloud');
  }

  async createMigration(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudMigration> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['migration_name', 'source_provider', 'source_account_id', 'source_resource_id', 'target_provider', 'target_account_id', 'target_region', 'migration_type'], 'Migration cloud');

    const validated = this.validateSchema(createCloudMigrationSchema, data, 'Migration cloud');

    return this.migrationRepo.create(
      {
        migration_name: validated.migration_name,
        source_provider: validated.source_provider,
        source_account_id: validated.source_account_id,
        source_resource_id: validated.source_resource_id,
        target_provider: validated.target_provider,
        target_account_id: validated.target_account_id,
        target_region: validated.target_region,
        migration_type: validated.migration_type,
        status: validated.status ?? 'pending',
        started_at: new Date().toISOString(),
        completed_at: validated.completed_at,
        error_message: validated.error_message,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateMigration(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudMigration> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Migration cloud');

    const existing = await this.ensureExists(this.migrationRepo, id, schoolId, 'Migration cloud');
    this.validateOwnership(existing, schoolId, 'Migration cloud');

    const validated = this.validateSchema(updateCloudMigrationSchema, data, 'Migration cloud');
    return this.migrationRepo.update(id, schoolId, validated);
  }

  async listRunningMigrations(schoolId: string): Promise<GecirapCloudMigration[]> {
    this.validateSchoolId(schoolId);
    return this.migrationRepo.findRunning(schoolId);
  }

  async listFailedMigrations(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCloudMigration>> {
    this.validateSchoolId(schoolId);
    return this.migrationRepo.findFailed(schoolId, this.validatePagination(params));
  }

  // ─── Balances ────────────────────────────────────────────────────────────

  async listBalances(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCloudBalance>> {
    this.validateSchoolId(schoolId);
    return this.balanceRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getBalance(schoolId: string, id: string): Promise<GecirapCloudBalance> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Solde cloud');
    return this.ensureExists(this.balanceRepo, id, schoolId, 'Solde cloud');
  }

  async createBalance(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudBalance> {
    this.validateSchoolId(schoolId);

    const validated = this.validateSchema(createCloudBalanceSchema, data, 'Solde cloud');

    return this.balanceRepo.create(
      {
        name: validated.name,
        strategy: validated.strategy,
        targets: validated.targets,
        status: validated.status ?? 'UNBALANCED',
      },
      schoolId,
    );
  }

  async updateBalance(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCloudBalance> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Solde cloud');

    const existing = await this.ensureExists(this.balanceRepo, id, schoolId, 'Solde cloud');
    this.validateOwnership(existing, schoolId, 'Solde cloud');

    const validated = this.validateSchema(updateCloudBalanceSchema, data, 'Solde cloud');
    return this.balanceRepo.update(id, schoolId, validated);
  }

  async getLowBalances(
    schoolId: string,
    thresholdAmount: number,
  ): Promise<GecirapCloudBalance[]> {
    this.validateSchoolId(schoolId);
    return this.balanceRepo.findLowBalance(schoolId, thresholdAmount);
  }

  // ─── Capabilities ────────────────────────────────────────────────────────

  async listCapabilities(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapProviderCapability>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.capabilityRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getCapability(schoolId: string, id: string): Promise<GecirapProviderCapability> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Capacité provider');
    return this.ensureExists(this.capabilityRepo, id, schoolId, 'Capacité provider');
  }

  async createCapability(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapProviderCapability> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['provider', 'capability_name', 'capability_type'], 'Capacité provider');

    const validated = this.validateSchema(createProviderCapabilitySchema, data, 'Capacité provider');

    return this.capabilityRepo.create(
      {
        provider: validated.provider,
        capability_name: validated.capability_name,
        capability_type: validated.capability_type,
        region_code: validated.region_code,
        is_available: validated.is_available ?? true,
        specifications: validated.specifications,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateCapability(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapProviderCapability> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Capacité provider');

    const existing = await this.ensureExists(this.capabilityRepo, id, schoolId, 'Capacité provider');
    this.validateOwnership(existing, schoolId, 'Capacité provider');

    const validated = this.validateSchema(updateProviderCapabilitySchema, data, 'Capacité provider');
    return this.capabilityRepo.update(id, schoolId, validated);
  }

  async listAvailableCapabilities(schoolId: string): Promise<GecirapProviderCapability[]> {
    this.validateSchoolId(schoolId);
    return this.capabilityRepo.findAvailable(schoolId);
  }

  async getMultiCloudOverview(schoolId: string): Promise<{
    totalPlacements: number;
    activeMigrations: number;
    failedMigrations: number;
    totalBalances: number;
    lowBalances: number;
    availableCapabilities: number;
  }> {
    this.validateSchoolId(schoolId);

    const placements = await this.placementRepo.findAll(schoolId, { limit: 1 });
    const migrations = await this.migrationRepo.findRunning(schoolId);
    const failed = await this.migrationRepo.findFailed(schoolId, { limit: 1 });
    const balances = await this.balanceRepo.findAll(schoolId, { limit: 500 });
    const low = await this.balanceRepo.findLowBalance(schoolId, 100);
    const capabilities = await this.capabilityRepo.findAvailable(schoolId);

    return {
      totalPlacements: placements.total,
      activeMigrations: migrations.length,
      failedMigrations: failed.total,
      totalBalances: balances.total,
      lowBalances: low.length,
      availableCapabilities: capabilities.length,
    };
  }
}
