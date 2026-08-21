import {
  GecirapTwinError,
  GecirapTwinNotFoundError,
  GecirapTwinSyncError,
} from '@educi/errors';
import {
  createInfrastructureTwinSchema,
  updateInfrastructureTwinSchema,
  createTwinSyncSchema,
  updateTwinSyncSchema,
} from '../validators/digital-twin';
import type {
  GecirapInfrastructureTwin,
  GecirapTwinSync,
  InfrastructureTwinRepository,
  TwinSyncRepository,
} from '../repositories/digital-twin-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Infrastructure Twin Service
// ============================================================================

export class InfrastructureTwinService extends BaseGecirapService {
  constructor(
    private readonly twinRepo: InfrastructureTwinRepository,
    private readonly syncRepo: TwinSyncRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Infrastructure Twins ────────────────────────────────────────────────

  async listTwins(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapInfrastructureTwin>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.twinRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getTwin(schoolId: string, id: string): Promise<GecirapInfrastructureTwin> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Jumeau numérique');
    return this.ensureExists(this.twinRepo, id, schoolId, 'Jumeau numérique');
  }

  async createTwin(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapInfrastructureTwin> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'twin_type', 'resource_type', 'resource_id', 'state'], 'Jumeau numérique');

    const validated = this.validateSchema(createInfrastructureTwinSchema, data, 'Jumeau numérique');

    const existing = await this.twinRepo.findByResource(
      validated.resource_type,
      validated.resource_id,
      schoolId,
    );
    if (existing) {
      throw new GecirapTwinError(
        `Un jumeau numérique existe déjà pour la ressource "${validated.resource_id}"`,
      );
    }

    return this.twinRepo.create(
      {
        name: validated.name,
        description: validated.description,
        twin_type: validated.twin_type,
        resource_type: validated.resource_type,
        resource_id: validated.resource_id,
        state: validated.state,
        status: validated.status ?? 'active',
        last_synced_at: validated.last_synced_at,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateTwin(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapInfrastructureTwin> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Jumeau numérique');

    const existing = await this.ensureExists(this.twinRepo, id, schoolId, 'Jumeau numérique');
    this.validateOwnership(existing, schoolId, 'Jumeau numérique');

    const validated = this.validateSchema(updateInfrastructureTwinSchema, data, 'Jumeau numérique');
    return this.twinRepo.update(id, schoolId, validated);
  }

  async deleteTwin(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Jumeau numérique');

    const existing = await this.ensureExists(this.twinRepo, id, schoolId, 'Jumeau numérique');
    this.validateOwnership(existing, schoolId, 'Jumeau numérique');

    await this.twinRepo.softDelete(id, schoolId);
  }

  async findByResource(
    schoolId: string,
    resourceType: string,
    resourceId: string,
  ): Promise<GecirapInfrastructureTwin | null> {
    this.validateSchoolId(schoolId);
    return this.twinRepo.findByResource(resourceType, resourceId, schoolId);
  }

  async listByTwinType(
    schoolId: string,
    twinType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapInfrastructureTwin>> {
    this.validateSchoolId(schoolId);
    return this.twinRepo.findByTwinType(twinType, schoolId, this.validatePagination(params));
  }

  async listActive(schoolId: string): Promise<GecirapInfrastructureTwin[]> {
    this.validateSchoolId(schoolId);
    return this.twinRepo.findActive(schoolId);
  }

  // ─── Twin Sync ───────────────────────────────────────────────────────────

  async listSyncs(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapTwinSync>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.syncRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getSync(schoolId: string, id: string): Promise<GecirapTwinSync> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Synchronisation jumeau');
    return this.ensureExists(this.syncRepo, id, schoolId, 'Synchronisation jumeau');
  }

  async createSync(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapTwinSync> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['twin_id', 'sync_type'], 'Synchronisation jumeau');

    const validated = this.validateSchema(createTwinSyncSchema, data, 'Synchronisation jumeau');

    await this.ensureExists(this.twinRepo, validated.twin_id, schoolId, 'Jumeau numérique');

    return this.syncRepo.create(
      {
        twin_id: validated.twin_id,
        sync_type: validated.sync_type,
        status: validated.status ?? 'running',
        started_at: new Date().toISOString(),
        completed_at: validated.completed_at,
        items_synced: validated.items_synced ?? 0,
        error_message: validated.error_message,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateSync(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapTwinSync> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Synchronisation jumeau');

    const existing = await this.ensureExists(this.syncRepo, id, schoolId, 'Synchronisation jumeau');
    this.validateOwnership(existing, schoolId, 'Synchronisation jumeau');

    const validated = this.validateSchema(updateTwinSyncSchema, data, 'Synchronisation jumeau');
    return this.syncRepo.update(id, schoolId, validated);
  }

  async deleteSync(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Synchronisation jumeau');

    const existing = await this.ensureExists(this.syncRepo, id, schoolId, 'Synchronisation jumeau');
    this.validateOwnership(existing, schoolId, 'Synchronisation jumeau');

    await this.syncRepo.softDelete(id, schoolId);
  }

  async listRunningSyncs(schoolId: string): Promise<GecirapTwinSync[]> {
    this.validateSchoolId(schoolId);
    return this.syncRepo.findRunning(schoolId);
  }

  async listFailedSyncs(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapTwinSync>> {
    this.validateSchoolId(schoolId);
    return this.syncRepo.findFailed(schoolId, this.validatePagination(params));
  }

  async listByTwinSyncs(
    schoolId: string,
    twinId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapTwinSync>> {
    this.validateSchoolId(schoolId);
    this.validateId(twinId, 'Jumeau numérique');
    return this.syncRepo.findByTwinId(twinId, schoolId, this.validatePagination(params));
  }

  async getLatestSync(
    schoolId: string,
    twinId: string,
  ): Promise<GecirapTwinSync | null> {
    this.validateSchoolId(schoolId);
    return this.syncRepo.findLatest(twinId, schoolId);
  }

  async getDigitalTwinOverview(schoolId: string): Promise<{
    totalTwins: number;
    activeTwins: number;
    totalSyncs: number;
    runningSyncs: number;
    failedSyncs: number;
    byTwinType: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);

    const twins = await this.twinRepo.findAll(schoolId, { limit: 500 });
    const active = await this.twinRepo.findActive(schoolId);
    const syncs = await this.syncRepo.findRunning(schoolId);
    const failed = await this.syncRepo.findFailed(schoolId, { limit: 1 });
    const allSyncs = await this.syncRepo.findAll(schoolId, { limit: 1 });

    const byTwinType: Record<string, number> = {};
    for (const twin of twins.data) {
      byTwinType[twin.twin_type] = (byTwinType[twin.twin_type] ?? 0) + 1;
    }

    return {
      totalTwins: twins.total,
      activeTwins: active.length,
      totalSyncs: allSyncs.total,
      runningSyncs: syncs.length,
      failedSyncs: failed.total,
      byTwinType,
    };
  }
}
