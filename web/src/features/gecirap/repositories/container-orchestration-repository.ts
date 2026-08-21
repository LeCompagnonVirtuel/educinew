import { SupabaseClient } from '@supabase/supabase-js';
import {
  GecirapClusterNotFoundError,
  GecirapNodeNotFoundError,
  GecirapWorkloadNotFoundError,
  GecirapNamespaceError,
  GecirapContainerError,
  GecirapServiceError,
  GecirapIngressError,
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

export interface GecirapCluster extends GecirapBaseEntity {
  name: string;
  provider: string;
  region_code: string;
  kubernetes_version: string;
  status: string;
  node_count: number;
  endpoint_url?: string;
  certificate_authority?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapNode extends GecirapBaseEntity {
  cluster_id: string;
  name: string;
  external_id?: string;
  status: string;
  role: string;
  instance_type: string;
  ip_address?: string;
  ready_at?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapNodePool extends GecirapBaseEntity {
  cluster_id: string;
  name: string;
  instance_type: string;
  min_size: number;
  max_size: number;
  desired_size: number;
  auto_scaling: boolean;
  status: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapNamespace extends GecirapBaseEntity {
  cluster_id: string;
  name: string;
  status: string;
  labels?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface GecirapWorkload extends GecirapBaseEntity {
  cluster_id: string;
  namespace_id: string;
  name: string;
  workload_type: string;
  replicas_desired: number;
  replicas_ready: number;
  status: string;
  image: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapContainer extends GecirapBaseEntity {
  workload_id: string;
  name: string;
  image: string;
  status: string;
  restart_count: number;
  cpu_request?: string;
  cpu_limit?: string;
  memory_request?: string;
  memory_limit?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapService extends GecirapBaseEntity {
  cluster_id: string;
  namespace_id: string;
  name: string;
  service_type: string;
  cluster_ip?: string;
  external_ip?: string;
  ports?: Record<string, unknown>[];
  status: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapIngress extends GecirapBaseEntity {
  cluster_id: string;
  namespace_id: string;
  name: string;
  hostname: string;
  paths?: Record<string, unknown>[];
  tls_enabled: boolean;
  status: string;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Repository Implementations
// ============================================================================

export class ClusterRepository extends GecirapCrudRepositoryImpl<GecirapCluster> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_clusters', (msg) => {
      throw new GecirapClusterNotFoundError(msg);
    });
  }

  async findByProvider(
    provider: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCluster>> {
    return this.findAll(schoolId, { ...params, provider });
  }

  async findByRegionCode(
    regionCode: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCluster>> {
    return this.findAll(schoolId, { ...params, region_code: regionCode });
  }
}

export class NodeRepository extends GecirapCrudRepositoryImpl<GecirapNode> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_nodes', (msg) => {
      throw new GecirapNodeNotFoundError(msg);
    });
  }

  async findByClusterId(
    clusterId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapNode>> {
    return this.findAll(schoolId, { ...params, cluster_id: clusterId });
  }

  async findUnhealthy(schoolId: string): Promise<GecirapNode[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .neq('status', 'ready');

    if (error) {
      throw new GecirapNodeNotFoundError(
        `Erreur lors de la récupération des nœuds non sains: ${error.message}`,
      );
    }

    return (data || []) as GecirapNode[];
  }
}

export class NodePoolRepository extends GecirapCrudRepositoryImpl<GecirapNodePool> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_node_pools', (msg) => {
      throw new GecirapNodeNotFoundError(msg);
    });
  }

  async findByClusterId(
    clusterId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapNodePool>> {
    return this.findAll(schoolId, { ...params, cluster_id: clusterId });
  }
}

export class NamespaceRepository extends GecirapCrudRepositoryImpl<GecirapNamespace> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_namespaces', (msg) => {
      throw new GecirapNamespaceError(msg);
    });
  }

  async findByClusterId(
    clusterId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapNamespace>> {
    return this.findAll(schoolId, { ...params, cluster_id: clusterId });
  }

  async findByName(name: string, clusterId: string, schoolId: string): Promise<GecirapNamespace | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('name', name)
      .eq('cluster_id', clusterId)
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .single();

    if (error) return null;
    return data as GecirapNamespace;
  }
}

export class WorkloadRepository extends GecirapCrudRepositoryImpl<GecirapWorkload> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_workloads', (msg) => {
      throw new GecirapWorkloadNotFoundError(msg);
    });
  }

  async findByClusterId(
    clusterId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapWorkload>> {
    return this.findAll(schoolId, { ...params, cluster_id: clusterId });
  }

  async findByNamespaceId(
    namespaceId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapWorkload>> {
    return this.findAll(schoolId, { ...params, namespace_id: namespaceId });
  }

  async findByWorkloadType(
    workloadType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapWorkload>> {
    return this.findAll(schoolId, { ...params, workload_type: workloadType });
  }
}

export class ContainerRepository extends GecirapCrudRepositoryImpl<GecirapContainer> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_containers', (msg) => {
      throw new GecirapContainerError(msg);
    });
  }

  async findByWorkloadId(
    workloadId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapContainer>> {
    return this.findAll(schoolId, { ...params, workload_id: workloadId });
  }

  async findUnhealthy(schoolId: string): Promise<GecirapContainer[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .neq('status', 'running');

    if (error) {
      throw new GecirapContainerError(
        `Erreur lors de la récupération des conteneurs non sains: ${error.message}`,
      );
    }

    return (data || []) as GecirapContainer[];
  }
}

export class ServiceRepository extends GecirapCrudRepositoryImpl<GecirapService> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_services', (msg) => {
      throw new GecirapServiceError(msg);
    });
  }

  async findByClusterId(
    clusterId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapService>> {
    return this.findAll(schoolId, { ...params, cluster_id: clusterId });
  }

  async findByNamespaceId(
    namespaceId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapService>> {
    return this.findAll(schoolId, { ...params, namespace_id: namespaceId });
  }
}

export class IngressRepository extends GecirapCrudRepositoryImpl<GecirapIngress> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_ingresses', (msg) => {
      throw new GecirapIngressError(msg);
    });
  }

  async findByClusterId(
    clusterId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapIngress>> {
    return this.findAll(schoolId, { ...params, cluster_id: clusterId });
  }

  async findByNamespaceId(
    namespaceId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapIngress>> {
    return this.findAll(schoolId, { ...params, namespace_id: namespaceId });
  }

  async findByHostname(hostname: string, schoolId: string): Promise<GecirapIngress | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('hostname', hostname)
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .single();

    if (error) return null;
    return data as GecirapIngress;
  }
}
