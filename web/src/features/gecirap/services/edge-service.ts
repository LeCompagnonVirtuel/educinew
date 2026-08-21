import {
  GecirapEdgeNodeError,
  GecirapEdgeNodeNotFoundError,
  GecirapEdgeClusterError,
  GecirapEdgeDeploymentError,
  GecirapEdgePolicyError,
} from '@educi/errors';
import {
  createEdgeNodeSchema,
  updateEdgeNodeSchema,
  createEdgeClusterSchema,
  updateEdgeClusterSchema,
  createEdgeDeploymentSchema,
  updateEdgeDeploymentSchema,
  createEdgePolicySchema,
  updateEdgePolicySchema,
} from '../validators/edge';
import type {
  GecirapEdgeNode,
  GecirapEdgeCluster,
  GecirapEdgeDeployment,
  GecirapEdgePolicy,
  EdgeNodeRepository,
  EdgeClusterRepository,
  EdgeDeploymentRepository,
  EdgePolicyRepository,
} from '../repositories/edge-computing-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Edge Service
// ============================================================================

export class EdgeService extends BaseGecirapService {
  constructor(
    private readonly nodeRepo: EdgeNodeRepository,
    private readonly clusterRepo: EdgeClusterRepository,
    private readonly deploymentRepo: EdgeDeploymentRepository,
    private readonly policyRepo: EdgePolicyRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Edge Nodes ──────────────────────────────────────────────────────────

  async listNodes(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapEdgeNode>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.nodeRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getNode(schoolId: string, id: string): Promise<GecirapEdgeNode> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Nœud edge');
    return this.ensureExists(this.nodeRepo, id, schoolId, 'Nœud edge');
  }

  async createNode(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapEdgeNode> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'location', 'node_type'], 'Nœud edge');

    const validated = this.validateSchema(createEdgeNodeSchema, data, 'Nœud edge');

    return this.nodeRepo.create(
      {
        name: validated.name,
        location: validated.location,
        latitude: validated.latitude,
        longitude: validated.longitude,
        node_type: validated.node_type,
        status: validated.status ?? 'pending',
        ip_address: validated.ip_address,
        last_heartbeat_at: validated.last_heartbeat_at,
        capacity: validated.capacity,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateNode(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapEdgeNode> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Nœud edge');

    const existing = await this.ensureExists(this.nodeRepo, id, schoolId, 'Nœud edge');
    this.validateOwnership(existing, schoolId, 'Nœud edge');

    const validated = this.validateSchema(updateEdgeNodeSchema, data, 'Nœud edge');
    return this.nodeRepo.update(id, schoolId, validated);
  }

  async deleteNode(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Nœud edge');

    const existing = await this.ensureExists(this.nodeRepo, id, schoolId, 'Nœud edge');
    this.validateOwnership(existing, schoolId, 'Nœud edge');

    await this.nodeRepo.softDelete(id, schoolId);
  }

  async listByNodeType(
    schoolId: string,
    nodeType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapEdgeNode>> {
    this.validateSchoolId(schoolId);
    return this.nodeRepo.findByNodeType(nodeType, schoolId, this.validatePagination(params));
  }

  async getOfflineNodes(schoolId: string): Promise<GecirapEdgeNode[]> {
    this.validateSchoolId(schoolId);
    return this.nodeRepo.findOffline(schoolId);
  }

  // ─── Edge Clusters ───────────────────────────────────────────────────────

  async listClusters(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapEdgeCluster>> {
    this.validateSchoolId(schoolId);
    return this.clusterRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getCluster(schoolId: string, id: string): Promise<GecirapEdgeCluster> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Cluster edge');
    return this.ensureExists(this.clusterRepo, id, schoolId, 'Cluster edge');
  }

  async createCluster(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapEdgeCluster> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'cluster_type'], 'Cluster edge');

    const validated = this.validateSchema(createEdgeClusterSchema, data, 'Cluster edge');

    return this.clusterRepo.create(
      {
        name: validated.name,
        description: validated.description,
        cluster_type: validated.cluster_type,
        status: validated.status ?? 'pending',
        node_count: validated.node_count ?? 0,
        orchestration_platform: validated.orchestration_platform,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateCluster(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapEdgeCluster> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Cluster edge');

    const existing = await this.ensureExists(this.clusterRepo, id, schoolId, 'Cluster edge');
    this.validateOwnership(existing, schoolId, 'Cluster edge');

    const validated = this.validateSchema(updateEdgeClusterSchema, data, 'Cluster edge');
    return this.clusterRepo.update(id, schoolId, validated);
  }

  async deleteCluster(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Cluster edge');

    const existing = await this.ensureExists(this.clusterRepo, id, schoolId, 'Cluster edge');
    this.validateOwnership(existing, schoolId, 'Cluster edge');

    await this.clusterRepo.softDelete(id, schoolId);
  }

  // ─── Edge Deployments ────────────────────────────────────────────────────

  async listDeployments(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapEdgeDeployment>> {
    this.validateSchoolId(schoolId);
    return this.deploymentRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getDeployment(schoolId: string, id: string): Promise<GecirapEdgeDeployment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Déploiement edge');
    return this.ensureExists(this.deploymentRepo, id, schoolId, 'Déploiement edge');
  }

  async createDeployment(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapEdgeDeployment> {
    this.validateSchoolId(schoolId);

    const validated = this.validateSchema(createEdgeDeploymentSchema, data, 'Déploiement edge');

    await this.ensureExists(this.nodeRepo, validated.edgeNodeId, schoolId, 'Nœud edge');

    return this.deploymentRepo.create(
      {
        cluster_id: validated.edgeNodeId,
        name: validated.name,
        version: validated.image,
        status: validated.status ?? 'pending',
        deployed_at: new Date().toISOString(),
        completed_at: validated.completed_at,
        rollback_version: validated.rollback_version,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateDeployment(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapEdgeDeployment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Déploiement edge');

    const existing = await this.ensureExists(this.deploymentRepo, id, schoolId, 'Déploiement edge');
    this.validateOwnership(existing, schoolId, 'Déploiement edge');

    const validated = this.validateSchema(updateEdgeDeploymentSchema, data, 'Déploiement edge');
    return this.deploymentRepo.update(id, schoolId, validated);
  }

  async deleteDeployment(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Déploiement edge');

    const existing = await this.ensureExists(this.deploymentRepo, id, schoolId, 'Déploiement edge');
    this.validateOwnership(existing, schoolId, 'Déploiement edge');

    await this.deploymentRepo.softDelete(id, schoolId);
  }

  async listActiveDeployments(schoolId: string): Promise<GecirapEdgeDeployment[]> {
    this.validateSchoolId(schoolId);
    return this.deploymentRepo.findActive(schoolId);
  }

  async listByCluster(
    schoolId: string,
    clusterId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapEdgeDeployment>> {
    this.validateSchoolId(schoolId);
    this.validateId(clusterId, 'Cluster edge');
    return this.deploymentRepo.findByClusterId(clusterId, schoolId, this.validatePagination(params));
  }

  // ─── Edge Policies ───────────────────────────────────────────────────────

  async listPolicies(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapEdgePolicy>> {
    this.validateSchoolId(schoolId);
    return this.policyRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getPolicy(schoolId: string, id: string): Promise<GecirapEdgePolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique edge');
    return this.ensureExists(this.policyRepo, id, schoolId, 'Politique edge');
  }

  async createPolicy(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapEdgePolicy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'policy_type', 'rules', 'target_clusters'], 'Politique edge');

    const validated = this.validateSchema(createEdgePolicySchema, data, 'Politique edge');

    return this.policyRepo.create(
      {
        name: validated.name,
        description: validated.description,
        policy_type: validated.policy_type,
        rules: validated.rules,
        target_clusters: validated.target_clusters,
        is_active: validated.is_active ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updatePolicy(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapEdgePolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique edge');

    const existing = await this.ensureExists(this.policyRepo, id, schoolId, 'Politique edge');
    this.validateOwnership(existing, schoolId, 'Politique edge');

    const validated = this.validateSchema(updateEdgePolicySchema, data, 'Politique edge');
    return this.policyRepo.update(id, schoolId, validated);
  }

  async deletePolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique edge');

    const existing = await this.ensureExists(this.policyRepo, id, schoolId, 'Politique edge');
    this.validateOwnership(existing, schoolId, 'Politique edge');

    await this.policyRepo.softDelete(id, schoolId);
  }

  async listActivePolicies(schoolId: string): Promise<GecirapEdgePolicy[]> {
    this.validateSchoolId(schoolId);
    return this.policyRepo.findActive(schoolId);
  }

  async getEdgeOverview(schoolId: string): Promise<{
    totalNodes: number;
    onlineNodes: number;
    offlineNodes: number;
    totalClusters: number;
    activeDeployments: number;
    activePolicies: number;
  }> {
    this.validateSchoolId(schoolId);

    const nodes = await this.nodeRepo.findAll(schoolId, { limit: 500 });
    const clusters = await this.clusterRepo.findAll(schoolId, { limit: 500 });
    const deployments = await this.deploymentRepo.findActive(schoolId);
    const policies = await this.policyRepo.findActive(schoolId);
    const offline = await this.nodeRepo.findOffline(schoolId);

    return {
      totalNodes: nodes.total,
      onlineNodes: nodes.total - offline.length,
      offlineNodes: offline.length,
      totalClusters: clusters.total,
      activeDeployments: deployments.length,
      activePolicies: policies.length,
    };
  }
}
