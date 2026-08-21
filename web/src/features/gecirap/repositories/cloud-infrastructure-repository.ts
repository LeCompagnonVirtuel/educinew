import { SupabaseClient } from '@supabase/supabase-js';
import {
  GecirapCloudProviderNotFoundError,
  GecirapCloudAccountNotFoundError,
  GecirapCloudResourceNotFoundError,
  GecirapCloudRegionNotFoundError,
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

export interface GecirapCloudProvider extends GecirapBaseEntity {
  name: string;
  display_name: string;
  provider_type: string;
  base_url?: string;
  auth_method: string;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapCloudAccount extends GecirapBaseEntity {
  provider_id: string;
  account_name: string;
  account_external_id: string;
  status: string;
  credential_ref?: string;
  region?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapCloudRegion extends GecirapBaseEntity {
  provider_id: string;
  region_code: string;
  display_name: string;
  continent: string;
  country: string;
  latitude?: number;
  longitude?: number;
  availability_zones: number;
  is_active: boolean;
}

export interface GecirapCloudResource extends GecirapBaseEntity {
  account_id: string;
  region_code: string;
  resource_type: string;
  external_id: string;
  name: string;
  status: string;
  specification?: Record<string, unknown>;
  monthly_cost_estimate?: number;
  metadata?: Record<string, unknown>;
}

export interface GecirapCloudEnvironment extends GecirapBaseEntity {
  name: string;
  description?: string;
  environment_type: string;
  provider_ids: string[];
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapCloudDeployment extends GecirapBaseEntity {
  environment_id: string;
  account_id: string;
  name: string;
  version: string;
  status: string;
  deployed_at?: string;
  completed_at?: string;
  artifacts?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface GecirapCloudQuota extends GecirapBaseEntity {
  account_id: string;
  region_code: string;
  quota_name: string;
  quota_limit: number;
  quota_used: number;
  unit: string;
  alert_threshold?: number;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Repository Implementations
// ============================================================================

export class CloudProviderRepository extends GecirapCrudRepositoryImpl<GecirapCloudProvider> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cloud_providers', (msg) => {
      throw new GecirapCloudProviderNotFoundError(msg);
    });
  }
}

export class CloudAccountRepository extends GecirapCrudRepositoryImpl<GecirapCloudAccount> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cloud_accounts', (msg) => {
      throw new GecirapCloudAccountNotFoundError(msg);
    });
  }

  async findByProviderId(
    providerId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudAccount>> {
    return this.findAll(schoolId, { ...params, provider_id: providerId });
  }

  async findByExternalId(externalId: string, schoolId: string): Promise<GecirapCloudAccount | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('account_external_id', externalId)
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .single();

    if (error) return null;
    return data as GecirapCloudAccount;
  }
}

export class CloudRegionRepository extends GecirapCrudRepositoryImpl<GecirapCloudRegion> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cloud_regions', (msg) => {
      throw new GecirapCloudRegionNotFoundError(msg);
    });
  }

  async findByProviderId(
    providerId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudRegion>> {
    return this.findAll(schoolId, { ...params, provider_id: providerId });
  }

  async findByContinent(
    continent: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudRegion>> {
    return this.findAll(schoolId, { ...params, continent });
  }
}

export class CloudResourceRepository extends GecirapCrudRepositoryImpl<GecirapCloudResource> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cloud_resources', (msg) => {
      throw new GecirapCloudResourceNotFoundError(msg);
    });
  }

  async findByAccountId(
    accountId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudResource>> {
    return this.findAll(schoolId, { ...params, account_id: accountId });
  }

  async findByRegionCode(
    regionCode: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudResource>> {
    return this.findAll(schoolId, { ...params, region_code: regionCode });
  }

  async findByResourceType(
    resourceType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudResource>> {
    return this.findAll(schoolId, { ...params, resource_type: resourceType });
  }
}

export class CloudEnvironmentRepository extends GecirapCrudRepositoryImpl<GecirapCloudEnvironment> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cloud_environments', (msg) => {
      throw new GecirapCloudResourceNotFoundError(msg);
    });
  }
}

export class CloudDeploymentRepository extends GecirapCrudRepositoryImpl<GecirapCloudDeployment> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cloud_deployments', (msg) => {
      throw new GecirapCloudResourceNotFoundError(msg);
    });
  }

  async findByEnvironmentId(
    environmentId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudDeployment>> {
    return this.findAll(schoolId, { ...params, environment_id: environmentId });
  }

  async findActive(schoolId: string): Promise<GecirapCloudDeployment[]> {
    const result = await this.findAll(schoolId, { status: 'active', limit: 200 });
    return result.data;
  }
}

export class CloudQuotaRepository extends GecirapCrudRepositoryImpl<GecirapCloudQuota> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cloud_quotas', (msg) => {
      throw new GecirapCloudResourceNotFoundError(msg);
    });
  }

  async findByAccountId(
    accountId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudQuota>> {
    return this.findAll(schoolId, { ...params, account_id: accountId });
  }

  async findExceeded(schoolId: string): Promise<GecirapCloudQuota[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .filter('quota_used', 'gt', 'quota_limit');

    if (error) {
      throw new GecirapCloudResourceNotFoundError(
        `Erreur lors de la récupération des quotas dépassés: ${error.message}`,
      );
    }

    return (data || []) as GecirapCloudQuota[];
  }
}
