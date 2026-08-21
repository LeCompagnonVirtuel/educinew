import {
  GecirapEdgeSyncError,
  GecirapEdgeSyncConflictError,
  GecirapOfflinePackageError,
} from '@educi/errors';
import {
  createEdgeSyncJobSchema,
  updateEdgeSyncJobSchema,
  createEdgeCacheSchema,
  updateEdgeCacheSchema,
  createOfflinePackageSchema,
  updateOfflinePackageSchema,
} from '../validators/edge';
import type {
  GecirapEdgeSyncJob,
  GecirapEdgeCache,
  GecirapOfflinePackage,
  EdgeSyncJobRepository,
  EdgeCacheRepository,
  OfflinePackageRepository,
  EdgeClusterRepository,
} from '../repositories/edge-computing-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Edge Sync Service
// ============================================================================

export class EdgeSyncService extends BaseGecirapService {
  constructor(
    private readonly syncJobRepo: EdgeSyncJobRepository,
    private readonly cacheRepo: EdgeCacheRepository,
    private readonly packageRepo: OfflinePackageRepository,
    private readonly clusterRepo: EdgeClusterRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Sync Jobs ───────────────────────────────────────────────────────────

  async listSyncJobs(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapEdgeSyncJob>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.syncJobRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getSyncJob(schoolId: string, id: string): Promise<GecirapEdgeSyncJob> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Job synchronisation edge');
    return this.ensureExists(this.syncJobRepo, id, schoolId, 'Job synchronisation edge');
  }

  async createSyncJob(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapEdgeSyncJob> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['cluster_id', 'job_name', 'sync_type'], 'Job synchronisation edge');

    const validated = this.validateSchema(createEdgeSyncJobSchema, data, 'Job synchronisation edge');

    await this.ensureExists(this.clusterRepo, validated.cluster_id, schoolId, 'Cluster edge');

    return this.syncJobRepo.create(
      {
        cluster_id: validated.cluster_id,
        job_name: validated.job_name,
        sync_type: validated.sync_type,
        status: validated.status ?? 'pending',
        started_at: new Date().toISOString(),
        completed_at: validated.completed_at,
        items_synced: validated.items_synced ?? 0,
        items_failed: validated.items_failed ?? 0,
        error_message: validated.error_message,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateSyncJob(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapEdgeSyncJob> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Job synchronisation edge');

    const existing = await this.ensureExists(this.syncJobRepo, id, schoolId, 'Job synchronisation edge');
    this.validateOwnership(existing, schoolId, 'Job synchronisation edge');

    const validated = this.validateSchema(updateEdgeSyncJobSchema, data, 'Job synchronisation edge');
    return this.syncJobRepo.update(id, schoolId, validated);
  }

  async listRunningJobs(schoolId: string): Promise<GecirapEdgeSyncJob[]> {
    this.validateSchoolId(schoolId);
    return this.syncJobRepo.findRunning(schoolId);
  }

  async listFailedJobs(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapEdgeSyncJob>> {
    this.validateSchoolId(schoolId);
    return this.syncJobRepo.findFailed(schoolId, this.validatePagination(params));
  }

  async listByCluster(
    schoolId: string,
    clusterId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapEdgeSyncJob>> {
    this.validateSchoolId(schoolId);
    this.validateId(clusterId, 'Cluster edge');
    return this.syncJobRepo.findByClusterId(clusterId, schoolId, this.validatePagination(params));
  }

  // ─── Edge Caches ─────────────────────────────────────────────────────────

  async listCaches(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapEdgeCache>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.cacheRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getCache(schoolId: string, id: string): Promise<GecirapEdgeCache> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Cache edge');
    return this.ensureExists(this.cacheRepo, id, schoolId, 'Cache edge');
  }

  async createCache(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapEdgeCache> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['cluster_id', 'cache_name', 'cache_type', 'max_size_mb', 'ttl_seconds'], 'Cache edge');

    const validated = this.validateSchema(createEdgeCacheSchema, data, 'Cache edge');

    await this.ensureExists(this.clusterRepo, validated.cluster_id, schoolId, 'Cluster edge');

    return this.cacheRepo.create(
      {
        cluster_id: validated.cluster_id,
        cache_name: validated.cache_name,
        cache_type: validated.cache_type,
        max_size_mb: validated.max_size_mb,
        current_size_mb: validated.current_size_mb ?? 0,
        hit_rate_percent: validated.hit_rate_percent,
        ttl_seconds: validated.ttl_seconds,
        is_active: validated.is_active ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateCache(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapEdgeCache> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Cache edge');

    const existing = await this.ensureExists(this.cacheRepo, id, schoolId, 'Cache edge');
    this.validateOwnership(existing, schoolId, 'Cache edge');

    const validated = this.validateSchema(updateEdgeCacheSchema, data, 'Cache edge');
    return this.cacheRepo.update(id, schoolId, validated);
  }

  async deleteCache(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Cache edge');

    const existing = await this.ensureExists(this.cacheRepo, id, schoolId, 'Cache edge');
    this.validateOwnership(existing, schoolId, 'Cache edge');

    await this.cacheRepo.softDelete(id, schoolId);
  }

  async listActiveCaches(schoolId: string): Promise<GecirapEdgeCache[]> {
    this.validateSchoolId(schoolId);
    return this.cacheRepo.findActive(schoolId);
  }

  async listCachesByCluster(
    schoolId: string,
    clusterId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapEdgeCache>> {
    this.validateSchoolId(schoolId);
    this.validateId(clusterId, 'Cluster edge');
    return this.cacheRepo.findByClusterId(clusterId, schoolId, this.validatePagination(params));
  }

  // ─── Offline Packages ────────────────────────────────────────────────────

  async listPackages(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapOfflinePackage>> {
    this.validateSchoolId(schoolId);
    return this.packageRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getPackage(schoolId: string, id: string): Promise<GecirapOfflinePackage> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Package hors-ligne');
    return this.ensureExists(this.packageRepo, id, schoolId, 'Package hors-ligne');
  }

  async createPackage(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapOfflinePackage> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['cluster_id', 'package_name', 'version', 'size_bytes', 'checksum_sha256'], 'Package hors-ligne');

    const validated = this.validateSchema(createOfflinePackageSchema, data, 'Package hors-ligne');

    await this.ensureExists(this.clusterRepo, validated.cluster_id, schoolId, 'Cluster edge');

    return this.packageRepo.create(
      {
        cluster_id: validated.cluster_id,
        package_name: validated.package_name,
        version: validated.version,
        size_bytes: validated.size_bytes,
        checksum_sha256: validated.checksum_sha256,
        download_url: validated.download_url,
        expires_at: validated.expires_at,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updatePackage(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapOfflinePackage> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Package hors-ligne');

    const existing = await this.ensureExists(this.packageRepo, id, schoolId, 'Package hors-ligne');
    this.validateOwnership(existing, schoolId, 'Package hors-ligne');

    const validated = this.validateSchema(updateOfflinePackageSchema, data, 'Package hors-ligne');
    return this.packageRepo.update(id, schoolId, validated);
  }

  async deletePackage(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Package hors-ligne');

    const existing = await this.ensureExists(this.packageRepo, id, schoolId, 'Package hors-ligne');
    this.validateOwnership(existing, schoolId, 'Package hors-ligne');

    await this.packageRepo.softDelete(id, schoolId);
  }

  async listExpiredPackages(schoolId: string): Promise<GecirapOfflinePackage[]> {
    this.validateSchoolId(schoolId);
    return this.packageRepo.findExpired(schoolId);
  }

  async listByClusterPackages(
    schoolId: string,
    clusterId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapOfflinePackage>> {
    this.validateSchoolId(schoolId);
    this.validateId(clusterId, 'Cluster edge');
    return this.packageRepo.findByClusterId(clusterId, schoolId, this.validatePagination(params));
  }

  async getEdgeSyncOverview(schoolId: string): Promise<{
    totalSyncJobs: number;
    runningJobs: number;
    failedJobs: number;
    totalCaches: number;
    activeCaches: number;
    totalPackages: number;
    expiredPackages: number;
  }> {
    this.validateSchoolId(schoolId);

    const jobs = await this.syncJobRepo.findRunning(schoolId);
    const failed = await this.syncJobRepo.findFailed(schoolId, { limit: 1 });
    const caches = await this.cacheRepo.findActive(schoolId);
    const allCaches = await this.cacheRepo.findAll(schoolId, { limit: 1 });
    const packages = await this.packageRepo.findAll(schoolId, { limit: 1 });
    const expired = await this.packageRepo.findExpired(schoolId);

    return {
      totalSyncJobs: jobs.length,
      runningJobs: jobs.length,
      failedJobs: failed.total,
      totalCaches: allCaches.total,
      activeCaches: caches.length,
      totalPackages: packages.total,
      expiredPackages: expired.length,
    };
  }
}
