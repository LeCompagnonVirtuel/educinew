import {
  GecirapClusterError,
  GecirapClusterNotFoundError,
  GecirapNodeError,
  GecirapNamespaceError,
} from '@educi/errors';
import {
  createClusterSchema,
  updateClusterSchema,
  createNodeSchema,
  updateNodeSchema,
  createNodePoolSchema,
  updateNodePoolSchema,
  createNamespaceSchema,
  updateNamespaceSchema,
} from '../validators/containers';
import type {
  GecirapCluster,
  GecirapNode,
  GecirapNodePool,
  GecirapNamespace,
  ClusterRepository,
  NodeRepository,
  NodePoolRepository,
  NamespaceRepository,
} from '../repositories/container-orchestration-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Cluster Service
// ============================================================================

export class ClusterService extends BaseGecirapService {
  constructor(
    private readonly clusterRepo: ClusterRepository,
    private readonly nodeRepo: NodeRepository,
    private readonly nodePoolRepo: NodePoolRepository,
    private readonly namespaceRepo: NamespaceRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Clusters ────────────────────────────────────────────────────────────

  async listClusters(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapCluster>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.clusterRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getCluster(schoolId: string, id: string): Promise<GecirapCluster> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Cluster');
    return this.ensureExists(this.clusterRepo, id, schoolId, 'Cluster');
  }

  async createCluster(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCluster> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'provider', 'region_code', 'kubernetes_version'], 'Cluster');

    const validated = this.validateSchema(createClusterSchema, data, 'Cluster');

    const existing = await this.clusterRepo.findAll(schoolId, {
      name: validated.name,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GecirapClusterError(
        `Un cluster "${validated.name}" existe déjà`,
      );
    }

    return this.clusterRepo.create(
      {
        name: validated.name,
        provider: validated.provider,
        region_code: validated.region_code,
        kubernetes_version: validated.kubernetes_version,
        status: validated.status ?? 'pending',
        node_count: validated.node_count ?? 0,
        endpoint_url: validated.endpoint_url,
        certificate_authority: validated.certificate_authority,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateCluster(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapCluster> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Cluster');

    const existing = await this.ensureExists(this.clusterRepo, id, schoolId, 'Cluster');
    this.validateOwnership(existing, schoolId, 'Cluster');

    const validated = this.validateSchema(updateClusterSchema, data, 'Cluster');
    return this.clusterRepo.update(id, schoolId, validated);
  }

  async deleteCluster(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Cluster');

    const existing = await this.ensureExists(this.clusterRepo, id, schoolId, 'Cluster');
    this.validateOwnership(existing, schoolId, 'Cluster');

    const nodes = await this.nodeRepo.findByClusterId(id, schoolId, { limit: 1 });
    if (nodes.total > 0) {
      throw new GecirapClusterError(
        'Impossible de supprimer un cluster avec des nœuds associés',
      );
    }

    await this.clusterRepo.softDelete(id, schoolId);
  }

  async listByProvider(
    schoolId: string,
    provider: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapCluster>> {
    this.validateSchoolId(schoolId);
    return this.clusterRepo.findByProvider(provider, schoolId, this.validatePagination(params));
  }

  // ─── Nodes ───────────────────────────────────────────────────────────────

  async listNodes(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapNode>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.nodeRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getNode(schoolId: string, id: string): Promise<GecirapNode> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Nœud');
    return this.ensureExists(this.nodeRepo, id, schoolId, 'Nœud');
  }

  async createNode(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapNode> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['cluster_id', 'name', 'role', 'instance_type'], 'Nœud');

    const validated = this.validateSchema(createNodeSchema, data, 'Nœud');

    await this.ensureExists(this.clusterRepo, validated.clusterId, schoolId, 'Cluster');

    return this.nodeRepo.create(
      {
        cluster_id: validated.clusterId,
        name: validated.name,
        external_id: validated.external_id,
        status: validated.status ?? 'pending',
        role: validated.role,
        instance_type: validated.instance_type,
        ip_address: validated.ip_address,
        ready_at: validated.ready_at,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateNode(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapNode> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Nœud');

    const existing = await this.ensureExists(this.nodeRepo, id, schoolId, 'Nœud');
    this.validateOwnership(existing, schoolId, 'Nœud');

    const validated = this.validateSchema(updateNodeSchema, data, 'Nœud');
    return this.nodeRepo.update(id, schoolId, validated);
  }

  async deleteNode(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Nœud');

    const existing = await this.ensureExists(this.nodeRepo, id, schoolId, 'Nœud');
    this.validateOwnership(existing, schoolId, 'Nœud');

    await this.nodeRepo.softDelete(id, schoolId);
  }

  async listByCluster(
    schoolId: string,
    clusterId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapNode>> {
    this.validateSchoolId(schoolId);
    this.validateId(clusterId, 'Cluster');
    return this.nodeRepo.findByClusterId(clusterId, schoolId, this.validatePagination(params));
  }

  async getUnhealthyNodes(schoolId: string): Promise<GecirapNode[]> {
    this.validateSchoolId(schoolId);
    return this.nodeRepo.findUnhealthy(schoolId);
  }

  // ─── Node Pools ──────────────────────────────────────────────────────────

  async listNodePools(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapNodePool>> {
    this.validateSchoolId(schoolId);
    return this.nodePoolRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getNodePool(schoolId: string, id: string): Promise<GecirapNodePool> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Pool de nœuds');
    return this.ensureExists(this.nodePoolRepo, id, schoolId, 'Pool de nœuds');
  }

  async createNodePool(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapNodePool> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['cluster_id', 'name', 'instance_type', 'min_size', 'max_size', 'desired_size'], 'Pool de nœuds');

    const validated = this.validateSchema(createNodePoolSchema, data, 'Pool de nœuds');

    await this.ensureExists(this.clusterRepo, validated.clusterId, schoolId, 'Cluster');

    this.validateRange(validated.minSize, 0, 1000, 'min_size', 'Pool de nœuds');
    this.validateRange(validated.maxSize, validated.minSize, 1000, 'max_size', 'Pool de nœuds');
    this.validateRange(validated.desiredSize, validated.minSize, validated.maxSize, 'desired_size', 'Pool de nœuds');

    return this.nodePoolRepo.create(
      {
        cluster_id: validated.clusterId,
        name: validated.name,
        instance_type: validated.instanceType,
        min_size: validated.minSize,
        max_size: validated.maxSize,
        desired_size: validated.desiredSize,
        auto_scaling: validated.auto_scaling ?? true,
        status: validated.status ?? 'active',
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateNodePool(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapNodePool> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Pool de nœuds');

    const existing = await this.ensureExists(this.nodePoolRepo, id, schoolId, 'Pool de nœuds');
    this.validateOwnership(existing, schoolId, 'Pool de nœuds');

    const validated = this.validateSchema(updateNodePoolSchema, data, 'Pool de nœuds');
    return this.nodePoolRepo.update(id, schoolId, validated);
  }

  async deleteNodePool(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Pool de nœuds');

    const existing = await this.ensureExists(this.nodePoolRepo, id, schoolId, 'Pool de nœuds');
    this.validateOwnership(existing, schoolId, 'Pool de nœuds');

    await this.nodePoolRepo.softDelete(id, schoolId);
  }

  // ─── Namespaces ──────────────────────────────────────────────────────────

  async listNamespaces(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapNamespace>> {
    this.validateSchoolId(schoolId);
    return this.namespaceRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getNamespace(schoolId: string, id: string): Promise<GecirapNamespace> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Namespace');
    return this.ensureExists(this.namespaceRepo, id, schoolId, 'Namespace');
  }

  async createNamespace(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapNamespace> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['cluster_id', 'name'], 'Namespace');

    const validated = this.validateSchema(createNamespaceSchema, data, 'Namespace');

    await this.ensureExists(this.clusterRepo, validated.clusterId, schoolId, 'Cluster');

    const existing = await this.namespaceRepo.findByName(validated.name, validated.clusterId, schoolId);
    if (existing) {
      throw new GecirapNamespaceError(
        `Un namespace "${validated.name}" existe déjà dans ce cluster`,
      );
    }

    return this.namespaceRepo.create(
      {
        cluster_id: validated.clusterId,
        name: validated.name,
        status: validated.status ?? 'active',
        labels: validated.labels,
        annotations: validated.annotations,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateNamespace(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapNamespace> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Namespace');

    const existing = await this.ensureExists(this.namespaceRepo, id, schoolId, 'Namespace');
    this.validateOwnership(existing, schoolId, 'Namespace');

    const validated = this.validateSchema(updateNamespaceSchema, data, 'Namespace');
    return this.namespaceRepo.update(id, schoolId, validated);
  }

  async deleteNamespace(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Namespace');

    const existing = await this.ensureExists(this.namespaceRepo, id, schoolId, 'Namespace');
    this.validateOwnership(existing, schoolId, 'Namespace');

    await this.namespaceRepo.softDelete(id, schoolId);
  }

  async listNamespacesByCluster(
    schoolId: string,
    clusterId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapNamespace>> {
    this.validateSchoolId(schoolId);
    this.validateId(clusterId, 'Cluster');
    return this.namespaceRepo.findByClusterId(clusterId, schoolId, this.validatePagination(params));
  }

  async getClusterOverview(schoolId: string): Promise<{
    totalClusters: number;
    active: number;
    totalNodes: number;
    healthyNodes: number;
    totalNamespaces: number;
  }> {
    this.validateSchoolId(schoolId);

    const clusters = await this.clusterRepo.findAll(schoolId, { limit: 500 });
    const nodes = await this.nodeRepo.findAll(schoolId, { limit: 500 });
    const namespaces = await this.namespaceRepo.findAll(schoolId, { limit: 500 });

    const active = clusters.data.filter((c) => c.status === 'active').length;
    const healthyNodes = nodes.data.filter((n) => n.status === 'ready').length;

    return {
      totalClusters: clusters.total,
      active,
      totalNodes: nodes.total,
      healthyNodes,
      totalNamespaces: namespaces.total,
    };
  }
}
