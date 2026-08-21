import { SupabaseClient } from '@supabase/supabase-js';
import {
  GecirapNetworkNotFoundError,
  GecirapNetworkRouteError,
  GecirapLoadBalancerError,
  GecirapCDNError,
  GecirapDNSRecordError,
  GecirapTrafficAnomalyError,
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

export interface GecirapNetwork extends GecirapBaseEntity {
  name: string;
  description?: string;
  network_type: string;
  cidr_block?: string;
  region_code: string;
  is_active: boolean;
  configuration?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface GecirapNetworkRoute extends GecirapBaseEntity {
  network_id: string;
  destination_cidr: string;
  target_type: string;
  target_id?: string;
  metric: number;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapLoadBalancer extends GecirapBaseEntity {
  name: string;
  network_id: string;
  lb_type: string;
  scheme: string;
  ip_address?: string;
  dns_name?: string;
  status: string;
  health_check_config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface GecirapCDNDistribution extends GecirapBaseEntity {
  distribution_name: string;
  origin_domain: string;
  origin_path?: string;
  aliases?: string[];
  cache_behaviors?: Record<string, unknown>[];
  ssl_certificate_arn?: string;
  status: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapDNSRecord extends GecirapBaseEntity {
  domain_name: string;
  record_type: string;
  record_name: string;
  record_value: string;
  ttl_seconds: number;
  priority?: number;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapNetworkHealth extends GecirapBaseEntity {
  network_id: string;
  status: string;
  latency_ms?: number;
  packet_loss_percent?: number;
  bandwidth_mbps?: number;
  last_checked_at: string;
  issues?: Record<string, unknown>[];
  metadata?: Record<string, unknown>;
}

export interface GecirapTrafficMetric extends GecirapBaseEntity {
  network_id: string;
  metric_type: string;
  value: number;
  unit: string;
  source_ip?: string;
  destination_ip?: string;
  port?: number;
  protocol?: string;
  measured_at: string;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Repository Implementations
// ============================================================================

export class NetworkRepository extends GecirapCrudRepositoryImpl<GecirapNetwork> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_networks', (msg) => {
      throw new GecirapNetworkNotFoundError(msg);
    });
  }

  async findByNetworkType(
    networkType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapNetwork>> {
    return this.findAll(schoolId, { ...params, network_type: networkType });
  }

  async findByRegionCode(
    regionCode: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapNetwork>> {
    return this.findAll(schoolId, { ...params, region_code: regionCode });
  }
}

export class NetworkRouteRepository extends GecirapCrudRepositoryImpl<GecirapNetworkRoute> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_network_routes', (msg) => {
      throw new GecirapNetworkRouteError(msg);
    });
  }

  async findByNetworkId(
    networkId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapNetworkRoute>> {
    return this.findAll(schoolId, { ...params, network_id: networkId });
  }

  async findActive(schoolId: string): Promise<GecirapNetworkRoute[]> {
    const result = await this.findAll(schoolId, { is_active: true, limit: 200 });
    return result.data;
  }
}

export class LoadBalancerRepository extends GecirapCrudRepositoryImpl<GecirapLoadBalancer> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_load_balancers', (msg) => {
      throw new GecirapLoadBalancerError(msg);
    });
  }

  async findByNetworkId(
    networkId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapLoadBalancer>> {
    return this.findAll(schoolId, { ...params, network_id: networkId });
  }

  async findByLbType(
    lbType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapLoadBalancer>> {
    return this.findAll(schoolId, { ...params, lb_type: lbType });
  }

  async findActive(schoolId: string): Promise<GecirapLoadBalancer[]> {
    const result = await this.findAll(schoolId, { status: 'active', limit: 200 });
    return result.data;
  }
}

export class CDNDistributionRepository extends GecirapCrudRepositoryImpl<GecirapCDNDistribution> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cdn_distributions', (msg) => {
      throw new GecirapCDNError(msg);
    });
  }

  async findByOriginDomain(
    originDomain: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCDNDistribution>> {
    return this.findAll(schoolId, { ...params, origin_domain: originDomain });
  }

  async findActive(schoolId: string): Promise<GecirapCDNDistribution[]> {
    const result = await this.findAll(schoolId, { status: 'active', limit: 200 });
    return result.data;
  }
}

export class DNSRecordRepository extends GecirapCrudRepositoryImpl<GecirapDNSRecord> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_dns_records', (msg) => {
      throw new GecirapDNSRecordError(msg);
    });
  }

  async findByDomainName(
    domainName: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapDNSRecord>> {
    return this.findAll(schoolId, { ...params, domain_name: domainName });
  }

  async findByRecordType(
    recordType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapDNSRecord>> {
    return this.findAll(schoolId, { ...params, record_type: recordType });
  }

  async findActive(schoolId: string): Promise<GecirapDNSRecord[]> {
    const result = await this.findAll(schoolId, { is_active: true, limit: 200 });
    return result.data;
  }
}

export class NetworkHealthRepository extends GecirapCrudRepositoryImpl<GecirapNetworkHealth> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_network_health', (msg) => {
      throw new GecirapTrafficAnomalyError(msg);
    });
  }

  async findByNetworkId(
    networkId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapNetworkHealth>> {
    return this.findAll(schoolId, { ...params, network_id: networkId });
  }

  async findUnhealthy(schoolId: string): Promise<GecirapNetworkHealth[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .neq('status', 'healthy');

    if (error) {
      throw new GecirapTrafficAnomalyError(
        `Erreur lors de la récupération des réseaux non sains: ${error.message}`,
      );
    }

    return (data || []) as GecirapNetworkHealth[];
  }
}

export class TrafficMetricRepository extends GecirapCrudRepositoryImpl<GecirapTrafficMetric> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_traffic_metrics', (msg) => {
      throw new GecirapTrafficAnomalyError(msg);
    });
  }

  async findByNetworkId(
    networkId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapTrafficMetric>> {
    return this.findAll(schoolId, { ...params, network_id: networkId });
  }

  async findByMetricType(
    metricType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapTrafficMetric>> {
    return this.findAll(schoolId, { ...params, metric_type: metricType });
  }

  async findRecent(networkId: string, schoolId: string, limitCount = 100): Promise<GecirapTrafficMetric[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('network_id', networkId)
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('measured_at', { ascending: false })
      .limit(limitCount);

    if (error) {
      throw new GecirapTrafficAnomalyError(
        `Erreur lors de la récupération des métriques récentes: ${error.message}`,
      );
    }

    return (data || []) as GecirapTrafficMetric[];
  }
}
