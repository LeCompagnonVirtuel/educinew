import {
  GecirapNetworkError,
  GecirapNetworkNotFoundError,
  GecirapNetworkRouteError,
  GecirapLoadBalancerError,
  GecirapDNSRecordError,
} from '@educi/errors';
import {
  createNetworkSchema,
  updateNetworkSchema,
  createNetworkRouteSchema,
  updateNetworkRouteSchema,
  createLoadBalancerSchema,
  updateLoadBalancerSchema,
  createDNSRecordSchema,
  updateDNSRecordSchema,
} from '../validators/network';
import type {
  GecirapNetwork,
  GecirapNetworkRoute,
  GecirapLoadBalancer,
  GecirapDNSRecord,
  GecirapNetworkHealth,
  NetworkRepository,
  NetworkRouteRepository,
  LoadBalancerRepository,
  DNSRecordRepository,
  NetworkHealthRepository,
} from '../repositories/network-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Network Service
// ============================================================================

export class NetworkService extends BaseGecirapService {
  constructor(
    private readonly networkRepo: NetworkRepository,
    private readonly routeRepo: NetworkRouteRepository,
    private readonly lbRepo: LoadBalancerRepository,
    private readonly dnsRepo: DNSRecordRepository,
    private readonly healthRepo: NetworkHealthRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // ─── Networks ────────────────────────────────────────────────────────────

  async listNetworks(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapNetwork>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.networkRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getNetwork(schoolId: string, id: string): Promise<GecirapNetwork> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Réseau');
    return this.ensureExists(this.networkRepo, id, schoolId, 'Réseau');
  }

  async createNetwork(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapNetwork> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'network_type', 'region_code'], 'Réseau');

    const validated = this.validateSchema(createNetworkSchema, data, 'Réseau');

    return this.networkRepo.create(
      {
        name: validated.name,
        description: validated.description,
        network_type: validated.network_type,
        cidr_block: validated.cidr_block,
        region_code: validated.region_code,
        is_active: validated.is_active ?? true,
        configuration: validated.configuration,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateNetwork(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapNetwork> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Réseau');

    const existing = await this.ensureExists(this.networkRepo, id, schoolId, 'Réseau');
    this.validateOwnership(existing, schoolId, 'Réseau');

    const validated = this.validateSchema(updateNetworkSchema, data, 'Réseau');
    return this.networkRepo.update(id, schoolId, validated);
  }

  async deleteNetwork(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Réseau');

    const existing = await this.ensureExists(this.networkRepo, id, schoolId, 'Réseau');
    this.validateOwnership(existing, schoolId, 'Réseau');

    await this.networkRepo.softDelete(id, schoolId);
  }

  async listByNetworkType(
    schoolId: string,
    networkType: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapNetwork>> {
    this.validateSchoolId(schoolId);
    return this.networkRepo.findByNetworkType(networkType, schoolId, this.validatePagination(params));
  }

  // ─── Network Routes ──────────────────────────────────────────────────────

  async listRoutes(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapNetworkRoute>> {
    this.validateSchoolId(schoolId);
    return this.routeRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getRoute(schoolId: string, id: string): Promise<GecirapNetworkRoute> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Route réseau');
    return this.ensureExists(this.routeRepo, id, schoolId, 'Route réseau');
  }

  async createRoute(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapNetworkRoute> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['network_id', 'destination_cidr', 'target_type', 'metric'], 'Route réseau');

    const validated = this.validateSchema(createNetworkRouteSchema, data, 'Route réseau');

    await this.ensureExists(this.networkRepo, validated.networkId, schoolId, 'Réseau');

    return this.routeRepo.create(
      {
        network_id: validated.networkId,
        destination_cidr: validated.destination_cidr,
        target_type: validated.target_type,
        target_id: validated.target_id,
        metric: validated.metric,
        is_active: validated.is_active ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateRoute(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapNetworkRoute> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Route réseau');

    const existing = await this.ensureExists(this.routeRepo, id, schoolId, 'Route réseau');
    this.validateOwnership(existing, schoolId, 'Route réseau');

    const validated = this.validateSchema(updateNetworkRouteSchema, data, 'Route réseau');
    return this.routeRepo.update(id, schoolId, validated);
  }

  async deleteRoute(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Route réseau');

    const existing = await this.ensureExists(this.routeRepo, id, schoolId, 'Route réseau');
    this.validateOwnership(existing, schoolId, 'Route réseau');

    await this.routeRepo.softDelete(id, schoolId);
  }

  async listActiveRoutes(schoolId: string): Promise<GecirapNetworkRoute[]> {
    this.validateSchoolId(schoolId);
    return this.routeRepo.findActive(schoolId);
  }

  // ─── Load Balancers ──────────────────────────────────────────────────────

  async listLoadBalancers(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapLoadBalancer>> {
    this.validateSchoolId(schoolId);
    return this.lbRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getLoadBalancer(schoolId: string, id: string): Promise<GecirapLoadBalancer> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Équilibreur de charge');
    return this.ensureExists(this.lbRepo, id, schoolId, 'Équilibreur de charge');
  }

  async createLoadBalancer(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapLoadBalancer> {
    this.validateSchoolId(schoolId);

    const validated = this.validateSchema(createLoadBalancerSchema, data, 'Équilibreur de charge');

    return this.lbRepo.create(
      {
        name: validated.name,
        lb_type: validated.algorithm,
        scheme: 'internal',
        backends: validated.backends,
        health_check_config: validated.healthCheck,
        status: validated.status ?? 'pending',
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateLoadBalancer(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapLoadBalancer> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Équilibreur de charge');

    const existing = await this.ensureExists(this.lbRepo, id, schoolId, 'Équilibreur de charge');
    this.validateOwnership(existing, schoolId, 'Équilibreur de charge');

    const validated = this.validateSchema(updateLoadBalancerSchema, data, 'Équilibreur de charge');
    return this.lbRepo.update(id, schoolId, validated);
  }

  async deleteLoadBalancer(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Équilibreur de charge');

    const existing = await this.ensureExists(this.lbRepo, id, schoolId, 'Équilibreur de charge');
    this.validateOwnership(existing, schoolId, 'Équilibreur de charge');

    await this.lbRepo.softDelete(id, schoolId);
  }

  async listActiveLoadBalancers(schoolId: string): Promise<GecirapLoadBalancer[]> {
    this.validateSchoolId(schoolId);
    return this.lbRepo.findActive(schoolId);
  }

  // ─── DNS Records ─────────────────────────────────────────────────────────

  async listDNSRecords(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapDNSRecord>> {
    this.validateSchoolId(schoolId);
    return this.dnsRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getDNSRecord(schoolId: string, id: string): Promise<GecirapDNSRecord> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Enregistrement DNS');
    return this.ensureExists(this.dnsRepo, id, schoolId, 'Enregistrement DNS');
  }

  async createDNSRecord(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapDNSRecord> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['domain_name', 'record_type', 'record_name', 'record_value', 'ttl_seconds'], 'Enregistrement DNS');

    const validated = this.validateSchema(createDNSRecordSchema, data, 'Enregistrement DNS');

    return this.dnsRepo.create(
      {
        domain_name: validated.domain_name,
        record_type: validated.record_type,
        record_name: validated.record_name,
        record_value: validated.record_value,
        ttl_seconds: validated.ttl_seconds,
        priority: validated.priority,
        is_active: validated.is_active ?? true,
        metadata: validated.metadata,
      },
      schoolId,
    );
  }

  async updateDNSRecord(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapDNSRecord> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Enregistrement DNS');

    const existing = await this.ensureExists(this.dnsRepo, id, schoolId, 'Enregistrement DNS');
    this.validateOwnership(existing, schoolId, 'Enregistrement DNS');

    const validated = this.validateSchema(updateDNSRecordSchema, data, 'Enregistrement DNS');
    return this.dnsRepo.update(id, schoolId, validated);
  }

  async deleteDNSRecord(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Enregistrement DNS');

    const existing = await this.ensureExists(this.dnsRepo, id, schoolId, 'Enregistrement DNS');
    this.validateOwnership(existing, schoolId, 'Enregistrement DNS');

    await this.dnsRepo.softDelete(id, schoolId);
  }

  async listByDomain(
    schoolId: string,
    domainName: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapDNSRecord>> {
    this.validateSchoolId(schoolId);
    return this.dnsRepo.findByDomainName(domainName, schoolId, this.validatePagination(params));
  }

  async listActiveDNSRecords(schoolId: string): Promise<GecirapDNSRecord[]> {
    this.validateSchoolId(schoolId);
    return this.dnsRepo.findActive(schoolId);
  }

  // ─── Network Health ──────────────────────────────────────────────────────

  async getNetworkHealth(schoolId: string): Promise<GecirapNetworkHealth[]> {
    this.validateSchoolId(schoolId);
    return this.healthRepo.findUnhealthy(schoolId);
  }

  async getNetworkOverview(schoolId: string): Promise<{
    totalNetworks: number;
    activeRoutes: number;
    activeLoadBalancers: number;
    activeDNSRecords: number;
    unhealthyNetworks: number;
  }> {
    this.validateSchoolId(schoolId);

    const networks = await this.networkRepo.findAll(schoolId, { limit: 500 });
    const routes = await this.routeRepo.findActive(schoolId);
    const lbs = await this.lbRepo.findActive(schoolId);
    const dns = await this.dnsRepo.findActive(schoolId);
    const unhealthy = await this.healthRepo.findUnhealthy(schoolId);

    return {
      totalNetworks: networks.total,
      activeRoutes: routes.length,
      activeLoadBalancers: lbs.length,
      activeDNSRecords: dns.length,
      unhealthyNetworks: unhealthy.length,
    };
  }
}
