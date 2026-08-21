import { SupabaseClient } from '@supabase/supabase-js';
import {
  GecirapEdgeNodeNotFoundError,
  GecirapEdgeClusterError,
  GecirapEdgeDeploymentError,
  GecirapEdgeSyncError,
  GecirapEdgePolicyError,
  GecirapOfflinePackageError,
} from '@educi/errors';
import {
  GecirapBaseEntity,
  PaginatedResult,
  PaginationParams,
  FilterParams,
  GecirapCrudRepositoryImpl,
} from './base-gecirap-repository';

// ============================================================================
// Entity Interfaces
// ============================================================================

export interface GecirapEdgeNode extends GecirapBaseEntity {
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  node_type: string;
  status: string;
  ip_address?: string;
  last_heartbeat_at?: string;
  capacity?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface GecirapEdgeCluster extends GecirapBaseEntity {
  name: string;
  description?: string;
  cluster_type: string;
  status: string;
  node_count: number;
  orchestration_platform?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapEdgeDeployment extends GecirapBaseEntity {
  cluster_id: string;
  name: string;
  version: string;
  status: string;
  deployed_at?: string;
  completed_at?: string;
  rollback_version?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapEdgeSyncJob extends GecirapBaseEntity {
  cluster_id: string;
  job_name: string;
  sync_type: string;
  status: string;
  started_at?: string;
  completed_at?: string;
  items_synced: number;
  items_failed: number;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapEdgeCache extends GecirapBaseEntity {
  cluster_id: string;
  cache_name: string;
  cache_type: string;
  max_size_mb: number;
  current_size_mb: number;
  hit_rate_percent?: number;
  ttl_seconds: number;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapEdgePolicy extends GecirapBaseEntity {
  name: string;
  description?: string;
  policy_type: string;
  rules: Record<string, unknown>;
  target_clusters: string[];
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapOfflinePackage extends GecirapBaseEntity {
  cluster_id: string;
  package_name: string;
  version: string;
  size_bytes: number;
  checksum_sha256: string;
  download_url?: string;
  expires_at?: string;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Repository Implementations
// ============================================================================

export class EdgeNodeRepository extends GecirapCrudRepositoryImpl<GecirapEdgeNode> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_edge_nodes', (msg) => {
      throw new GecirapEdgeNodeNotFoundError(msg);
    });
  }

  async findByNodeType(
    nodeType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapEdgeNode>> {
    return this.findAll(schoolId, { ...params, node_type: nodeType });
  }

  async findOffline(schoolId: string): Promise<GecirapEdgeNode[]> {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .or(`last_heartbeat_at.is.null,last_heartbeat_at.lt.${fiveMinutesAgo}`);

    if (error) {
      throw new GecirapEdgeNodeNotFoundError(
        `Erreur lors de la récupération des nœuds hors-ligne: ${error.message}`,
      );
    }

    return (data || []) as GecirapEdgeNode[];
  }
}

export class EdgeClusterRepository extends GecirapCrudRepositoryImpl<GecirapEdgeCluster> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_edge_clusters', (msg) => {
      throw new GecirapEdgeClusterError(msg);
    });
  }

  async findByClusterType(
    clusterType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapEdgeCluster>> {
    return this.findAll(schoolId, { ...params, cluster_type: clusterType });
  }
}

export class EdgeDeploymentRepository extends GecirapCrudRepositoryImpl<GecirapEdgeDeployment> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_edge_deployments', (msg) => {
      throw new GecirapEdgeDeploymentError(msg);
    });
  }

  async findByClusterId(
    clusterId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapEdgeDeployment>> {
    return this.findAll(schoolId, { ...params, cluster_id: clusterId });
  }

  async findActive(schoolId: string): Promise<GecirapEdgeDeployment[]> {
    const result = await this.findAll(schoolId, { status: 'active', limit: 200 });
    return result.data;
  }
}

export class EdgeSyncJobRepository extends GecirapCrudRepositoryImpl<GecirapEdgeSyncJob> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_edge_sync_jobs', (msg) => {
      throw new GecirapEdgeSyncError(msg);
    });
  }

  async findByClusterId(
    clusterId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapEdgeSyncJob>> {
    return this.findAll(schoolId, { ...params, cluster_id: clusterId });
  }

  async findRunning(schoolId: string): Promise<GecirapEdgeSyncJob[]> {
    const result = await this.findAll(schoolId, { status: 'running', limit: 200 });
    return result.data;
  }

  async findFailed(schoolId: string, params: PaginationParams & FilterParams = {}): Promise<PaginatedResult<GecirapEdgeSyncJob>> {
    return this.findAll(schoolId, { ...params, status: 'failed' });
  }
}

export class EdgeCacheRepository extends GecirapCrudRepositoryImpl<GecirapEdgeCache> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_edge_caches', (msg) => {
      throw new GecirapEdgeClusterError(msg);
    });
  }

  async findByClusterId(
    clusterId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapEdgeCache>> {
    return this.findAll(schoolId, { ...params, cluster_id: clusterId });
  }

  async findActive(schoolId: string): Promise<GecirapEdgeCache[]> {
    const result = await this.findAll(schoolId, { is_active: true, limit: 200 });
    return result.data;
  }
}

export class EdgePolicyRepository extends GecirapCrudRepositoryImpl<GecirapEdgePolicy> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_edge_policies', (msg) => {
      throw new GecirapEdgePolicyError(msg);
    });
  }

  async findByPolicyType(
    policyType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapEdgePolicy>> {
    return this.findAll(schoolId, { ...params, policy_type: policyType });
  }

  async findActive(schoolId: string): Promise<GecirapEdgePolicy[]> {
    const result = await this.findAll(schoolId, { is_active: true, limit: 200 });
    return result.data;
  }
}

export class OfflinePackageRepository extends GecirapCrudRepositoryImpl<GecirapOfflinePackage> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_offline_packages', (msg) => {
      throw new GecirapOfflinePackageError(msg);
    });
  }

  async findByClusterId(
    clusterId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapOfflinePackage>> {
    return this.findAll(schoolId, { ...params, cluster_id: clusterId });
  }

  async findExpired(schoolId: string): Promise<GecirapOfflinePackage[]> {
    const now = new Date().toISOString();
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .not('expires_at', 'is', null)
      .lt('expires_at', now);

    if (error) {
      throw new GecirapOfflinePackageError(
        `Erreur lors de la récupération des packages expirés: ${error.message}`,
      );
    }

    return (data || []) as GecirapOfflinePackage[];
  }
}
