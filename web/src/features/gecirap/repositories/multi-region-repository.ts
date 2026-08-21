import { SupabaseClient } from '@supabase/supabase-js';
import {
  GecirapGeoRegionNotFoundError,
  GecirapRegionPolicyError,
  GecirapRegionHealthError,
  GecirapFailoverError,
  GecirapTrafficRouteError,
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

export interface GecirapGeoRegion extends GecirapBaseEntity {
  name: string;
  display_name: string;
  code: string;
  continent: string;
  country: string;
  timezone: string;
  latitude?: number;
  longitude?: number;
  data_residency_rules?: Record<string, unknown>;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapRegionPolicy extends GecirapBaseEntity {
  region_id: string;
  policy_name: string;
  policy_type: string;
  rules: Record<string, unknown>;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapRegionHealth extends GecirapBaseEntity {
  region_id: string;
  status: string;
  latency_ms?: number;
  availability_percent?: number;
  last_checked_at: string;
  issues?: Record<string, unknown>[];
  metadata?: Record<string, unknown>;
}

export interface GecirapFailoverPolicy extends GecirapBaseEntity {
  name: string;
  source_region_id: string;
  target_region_id: string;
  trigger_condition: string;
  priority: number;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapTrafficRoute extends GecirapBaseEntity {
  name: string;
  source_region_id: string;
  destination_region_id: string;
  weight: number;
  health_check_url?: string;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapRegionalDeployment extends GecirapBaseEntity {
  deployment_name: string;
  region_id: string;
  environment_id: string;
  status: string;
  deployed_at?: string;
  completed_at?: string;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Repository Implementations
// ============================================================================

export class GeoRegionRepository extends GecirapCrudRepositoryImpl<GecirapGeoRegion> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_geo_regions', (msg) => {
      throw new GecirapGeoRegionNotFoundError(msg);
    });
  }

  async findByCode(code: string, schoolId: string): Promise<GecirapGeoRegion | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('code', code)
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .single();

    if (error) return null;
    return data as GecirapGeoRegion;
  }

  async findByContinent(
    continent: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapGeoRegion>> {
    return this.findAll(schoolId, { ...params, continent });
  }
}

export class RegionPolicyRepository extends GecirapCrudRepositoryImpl<GecirapRegionPolicy> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_region_policies', (msg) => {
      throw new GecirapRegionPolicyError(msg);
    });
  }

  async findByRegionId(
    regionId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapRegionPolicy>> {
    return this.findAll(schoolId, { ...params, region_id: regionId });
  }
}

export class RegionHealthRepository extends GecirapCrudRepositoryImpl<GecirapRegionHealth> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_region_health', (msg) => {
      throw new GecirapRegionHealthError(msg);
    });
  }

  async findByRegionId(
    regionId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapRegionHealth>> {
    return this.findAll(schoolId, { ...params, region_id: regionId });
  }

  async findUnhealthy(schoolId: string): Promise<GecirapRegionHealth[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .neq('status', 'healthy');

    if (error) {
      throw new GecirapRegionHealthError(
        `Erreur lors de la récupération des régions non saines: ${error.message}`,
      );
    }

    return (data || []) as GecirapRegionHealth[];
  }
}

export class FailoverPolicyRepository extends GecirapCrudRepositoryImpl<GecirapFailoverPolicy> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_failover_policies', (msg) => {
      throw new GecirapFailoverError(msg);
    });
  }

  async findBySourceRegion(
    sourceRegionId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapFailoverPolicy>> {
    return this.findAll(schoolId, { ...params, source_region_id: sourceRegionId });
  }

  async findByTargetRegion(
    targetRegionId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapFailoverPolicy>> {
    return this.findAll(schoolId, { ...params, target_region_id: targetRegionId });
  }
}

export class TrafficRouteRepository extends GecirapCrudRepositoryImpl<GecirapTrafficRoute> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_traffic_routes', (msg) => {
      throw new GecirapTrafficRouteError(msg);
    });
  }

  async findBySourceRegion(
    sourceRegionId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapTrafficRoute>> {
    return this.findAll(schoolId, { ...params, source_region_id: sourceRegionId });
  }

  async findByDestinationRegion(
    destinationRegionId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapTrafficRoute>> {
    return this.findAll(schoolId, { ...params, destination_region_id: destinationRegionId });
  }
}

export class RegionalDeploymentRepository extends GecirapCrudRepositoryImpl<GecirapRegionalDeployment> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_regional_deployments', (msg) => {
      throw new GecirapGeoRegionNotFoundError(msg);
    });
  }

  async findByRegionId(
    regionId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapRegionalDeployment>> {
    return this.findAll(schoolId, { ...params, region_id: regionId });
  }
}
