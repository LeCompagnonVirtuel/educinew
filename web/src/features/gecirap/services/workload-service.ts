import {
  GecirapWorkloadError,
  GecirapWorkloadSchedulingError,
  GecirapContainerError,
  GecirapServiceError,
  GecirapIngressError,
} from '@educi/errors';
import {
  createWorkloadSchema,
  updateWorkloadSchema,
  createContainerSchema,
  updateContainerSchema,
  createServiceSchema,
  updateServiceSchema,
  createIngressSchema,
  updateIngressSchema,
} from '../validators/containers';
import type {
  GecirapWorkload,
  GecirapContainer,
  GecirapService,
  GecirapIngress,
  WorkloadRepository,
  ContainerRepository,
  ServiceRepository,
  IngressRepository,
  NamespaceRepository,
} from '../repositories/container-orchestration-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Workload Service
// ============================================================================

export class WorkloadService extends BaseGecirapService {
  constructor(
    private readonly workloadRepo: WorkloadRepository,
    private readonly containerRepo: ContainerRepository,
    private readonly serviceRepo: ServiceRepository,
    private readonly ingressRepo: IngressRepository,
    private readonly namespaceRepo: NamespaceRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Workloads ───────────────────────────────────────────────────────────

  async listWorkloads(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapWorkload>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.workloadRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getWorkload(schoolId: string, id: string): Promise<GecirapWorkload> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Charge de travail');
    return this.ensureExists(this.workloadRepo, id, schoolId, 'Charge de travail');
  }

  async createWorkload(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapWorkload> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['cluster_id', 'namespace_id', 'name', 'workload_type', 'image'], 'Charge de travail');

    const validated = this.validateSchema(createWorkloadSchema, data, 'Charge de travail');

    await this.ensureExists(this.namespaceRepo, validated.namespaceId, schoolId, 'Namespace');

    return this.workloadRepo.create(
      {
        cluster_id: validated.clusterId,
        namespace_id: validated.namespaceId,
        name: validated.name,
        workload_type: validated.type,
        replicas_desired: validated.replicas_desired ?? 1,
        replicas_ready: validated.replicas_ready ?? 0,
        status: validated.status ?? 'pending',
        image: validated.image,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateWorkload(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapWorkload> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Charge de travail');

    const existing = await this.ensureExists(this.workloadRepo, id, schoolId, 'Charge de travail');
    this.validateOwnership(existing, schoolId, 'Charge de travail');

    const validated = this.validateSchema(updateWorkloadSchema, data, 'Charge de travail');
    return this.workloadRepo.update(id, schoolId, validated);
  }

  async deleteWorkload(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Charge de travail');

    const existing = await this.ensureExists(this.workloadRepo, id, schoolId, 'Charge de travail');
    this.validateOwnership(existing, schoolId, 'Charge de travail');

    await this.workloadRepo.softDelete(id, schoolId);
  }

  async scaleWorkload(
    schoolId: string,
    id: string,
    replicas: number,
  ): Promise<GecirapWorkload> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Charge de travail');
    this.validateRange(replicas, 0, 100, 'replicas', 'Charge de travail');

    const existing = await this.ensureExists(this.workloadRepo, id, schoolId, 'Charge de travail');
    this.validateOwnership(existing, schoolId, 'Charge de travail');

    return this.workloadRepo.update(id, schoolId, {
      replicas_desired: replicas,
    });
  }

  async listByNamespace(
    schoolId: string,
    namespaceId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapWorkload>> {
    this.validateSchoolId(schoolId);
    this.validateId(namespaceId, 'Namespace');
    return this.workloadRepo.findByNamespaceId(namespaceId, schoolId, this.validatePagination(params));
  }

  async listByType(
    schoolId: string,
    workloadType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapWorkload>> {
    this.validateSchoolId(schoolId);
    return this.workloadRepo.findByWorkloadType(workloadType, schoolId, this.validatePagination(params));
  }

  // ─── Containers ──────────────────────────────────────────────────────────

  async listContainers(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapContainer>> {
    this.validateSchoolId(schoolId);
    return this.containerRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getContainer(schoolId: string, id: string): Promise<GecirapContainer> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Conteneur');
    return this.ensureExists(this.containerRepo, id, schoolId, 'Conteneur');
  }

  async createContainer(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapContainer> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['workload_id', 'name', 'image'], 'Conteneur');

    const validated = this.validateSchema(createContainerSchema, data, 'Conteneur');

    await this.ensureExists(this.workloadRepo, validated.workloadId, schoolId, 'Charge de travail');

    return this.containerRepo.create(
      {
        workload_id: validated.workloadId,
        name: validated.name,
        image: validated.image,
        status: validated.status ?? 'pending',
        restart_count: validated.restart_count ?? 0,
        cpu_request: validated.cpu_request,
        cpu_limit: validated.cpu_limit,
        memory_request: validated.memory_request,
        memory_limit: validated.memory_limit,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateContainer(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapContainer> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Conteneur');

    const existing = await this.ensureExists(this.containerRepo, id, schoolId, 'Conteneur');
    this.validateOwnership(existing, schoolId, 'Conteneur');

    const validated = this.validateSchema(updateContainerSchema, data, 'Conteneur');
    return this.containerRepo.update(id, schoolId, validated);
  }

  async deleteContainer(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Conteneur');

    const existing = await this.ensureExists(this.containerRepo, id, schoolId, 'Conteneur');
    this.validateOwnership(existing, schoolId, 'Conteneur');

    await this.containerRepo.softDelete(id, schoolId);
  }

  async getUnhealthyContainers(schoolId: string): Promise<GecirapContainer[]> {
    this.validateSchoolId(schoolId);
    return this.containerRepo.findUnhealthy(schoolId);
  }

  // ─── Services ────────────────────────────────────────────────────────────

  async listServices(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapService>> {
    this.validateSchoolId(schoolId);
    return this.serviceRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getService(schoolId: string, id: string): Promise<GecirapService> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Service');
    return this.ensureExists(this.serviceRepo, id, schoolId, 'Service');
  }

  async createService(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapService> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['cluster_id', 'namespace_id', 'name', 'service_type'], 'Service');

    const validated = this.validateSchema(createServiceSchema, data, 'Service');

    await this.ensureExists(this.namespaceRepo, validated.namespaceId, schoolId, 'Namespace');

    return this.serviceRepo.create(
      {
        cluster_id: validated.clusterId,
        namespace_id: validated.namespaceId,
        name: validated.name,
        service_type: validated.type,
        cluster_ip: validated.cluster_ip,
        external_ip: validated.external_ip,
        ports: validated.ports ?? [],
        status: validated.status ?? 'pending',
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateService(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapService> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Service');

    const existing = await this.ensureExists(this.serviceRepo, id, schoolId, 'Service');
    this.validateOwnership(existing, schoolId, 'Service');

    const validated = this.validateSchema(updateServiceSchema, data, 'Service');
    return this.serviceRepo.update(id, schoolId, validated);
  }

  async deleteService(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Service');

    const existing = await this.ensureExists(this.serviceRepo, id, schoolId, 'Service');
    this.validateOwnership(existing, schoolId, 'Service');

    await this.serviceRepo.softDelete(id, schoolId);
  }

  // ─── Ingresses ───────────────────────────────────────────────────────────

  async listIngresses(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapIngress>> {
    this.validateSchoolId(schoolId);
    return this.ingressRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getIngress(schoolId: string, id: string): Promise<GecirapIngress> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Ingress');
    return this.ensureExists(this.ingressRepo, id, schoolId, 'Ingress');
  }

  async createIngress(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapIngress> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['cluster_id', 'namespace_id', 'name', 'hostname'], 'Ingress');

    const validated = this.validateSchema(createIngressSchema, data, 'Ingress');

    const existingHostname = await this.ingressRepo.findByHostname(validated.host, schoolId);
    if (existingHostname) {
      throw new GecirapIngressError(
        `Un ingress avec le hostname "${validated.host}" existe déjà`,
      );
    }

    return this.ingressRepo.create(
      {
        cluster_id: validated.clusterId,
        namespace_id: validated.namespaceId,
        name: validated.name,
        hostname: validated.host,
        paths: validated.paths ?? [],
        tls_enabled: validated.tls?.length > 0,
        status: validated.status ?? 'pending',
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateIngress(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapIngress> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Ingress');

    const existing = await this.ensureExists(this.ingressRepo, id, schoolId, 'Ingress');
    this.validateOwnership(existing, schoolId, 'Ingress');

    const validated = this.validateSchema(updateIngressSchema, data, 'Ingress');
    return this.ingressRepo.update(id, schoolId, validated);
  }

  async deleteIngress(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Ingress');

    const existing = await this.ensureExists(this.ingressRepo, id, schoolId, 'Ingress');
    this.validateOwnership(existing, schoolId, 'Ingress');

    await this.ingressRepo.softDelete(id, schoolId);
  }

  async getWorkloadOverview(schoolId: string): Promise<{
    totalWorkloads: number;
    running: number;
    pending: number;
    failed: number;
    totalContainers: number;
    unhealthyContainers: number;
  }> {
    this.validateSchoolId(schoolId);

    const workloads = await this.workloadRepo.findAll(schoolId, { limit: 500 });
    const containers = await this.containerRepo.findAll(schoolId, { limit: 500 });
    const unhealthy = await this.containerRepo.findUnhealthy(schoolId);

    return {
      totalWorkloads: workloads.total,
      running: workloads.data.filter((w) => w.status === 'RUNNING').length,
      pending: workloads.data.filter((w) => w.status === 'PENDING').length,
      failed: workloads.data.filter((w) => w.status === 'FAILED').length,
      totalContainers: containers.total,
      unhealthyContainers: unhealthy.length,
    };
  }
}
