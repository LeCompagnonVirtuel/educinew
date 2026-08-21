import { SupabaseClient } from '@supabase/supabase-js';
import {
  GecirapPlacementError,
  GecirapMigrationError,
  GecirapCloudBalanceError,
  GecirapCapabilityError,
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

export interface GecirapCloudPlacementDecision extends GecirapBaseEntity {
  resource_type: string;
  resource_name: string;
  target_provider: string;
  target_account_id: string;
  target_region: string;
  decision_reason: string;
  estimated_monthly_cost?: number;
  status: string;
  decided_at: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapCloudMigration extends GecirapBaseEntity {
  migration_name: string;
  source_provider: string;
  source_account_id: string;
  source_resource_id: string;
  target_provider: string;
  target_account_id: string;
  target_region: string;
  migration_type: string;
  status: string;
  started_at?: string;
  completed_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapCloudBalance extends GecirapBaseEntity {
  provider: string;
  account_id: string;
  balance_amount: number;
  currency: string;
  last_synced_at: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapProviderCapability extends GecirapBaseEntity {
  provider: string;
  capability_name: string;
  capability_type: string;
  region_code?: string;
  is_available: boolean;
  specifications?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Repository Implementations
// ============================================================================

export class CloudPlacementDecisionRepository extends GecirapCrudRepositoryImpl<GecirapCloudPlacementDecision> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cloud_placement_decisions', (msg) => {
      throw new GecirapPlacementError(msg);
    });
  }

  async findByResource(
    resourceType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudPlacementDecision>> {
    return this.findAll(schoolId, { ...params, resource_type: resourceType });
  }

  async findByProvider(
    provider: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudPlacementDecision>> {
    return this.findAll(schoolId, { ...params, target_provider: provider });
  }

  async findRecent(schoolId: string, limitCount = 50): Promise<GecirapCloudPlacementDecision[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('decided_at', { ascending: false })
      .limit(limitCount);

    if (error) {
      throw new GecirapPlacementError(
        `Erreur lors de la récupération des décisions récentes: ${error.message}`,
      );
    }

    return (data || []) as GecirapCloudPlacementDecision[];
  }
}

export class CloudMigrationRepository extends GecirapCrudRepositoryImpl<GecirapCloudMigration> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cloud_migrations', (msg) => {
      throw new GecirapMigrationError(msg);
    });
  }

  async findBySourceProvider(
    sourceProvider: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudMigration>> {
    return this.findAll(schoolId, { ...params, source_provider: sourceProvider });
  }

  async findByTargetProvider(
    targetProvider: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudMigration>> {
    return this.findAll(schoolId, { ...params, target_provider: targetProvider });
  }

  async findRunning(schoolId: string): Promise<GecirapCloudMigration[]> {
    const result = await this.findAll(schoolId, { status: 'running', limit: 200 });
    return result.data;
  }

  async findFailed(schoolId: string, params: PaginationParams & FilterParams = {}): Promise<PaginatedResult<GecirapCloudMigration>> {
    return this.findAll(schoolId, { ...params, status: 'failed' });
  }
}

export class CloudBalanceRepository extends GecirapCrudRepositoryImpl<GecirapCloudBalance> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cloud_balances', (msg) => {
      throw new GecirapCloudBalanceError(msg);
    });
  }

  async findByProvider(
    provider: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudBalance>> {
    return this.findAll(schoolId, { ...params, provider });
  }

  async findByAccountId(
    accountId: string,
    schoolId: string,
  ): Promise<GecirapCloudBalance | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('account_id', accountId)
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .single();

    if (error) return null;
    return data as GecirapCloudBalance;
  }

  async findLowBalance(schoolId: string, thresholdAmount: number): Promise<GecirapCloudBalance[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .lt('balance_amount', thresholdAmount);

    if (error) {
      throw new GecirapCloudBalanceError(
        `Erreur lors de la récupération des soldes faibles: ${error.message}`,
      );
    }

    return (data || []) as GecirapCloudBalance[];
  }
}

export class ProviderCapabilityRepository extends GecirapCrudRepositoryImpl<GecirapProviderCapability> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_provider_capabilities', (msg) => {
      throw new GecirapCapabilityError(msg);
    });
  }

  async findByProvider(
    provider: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapProviderCapability>> {
    return this.findAll(schoolId, { ...params, provider });
  }

  async findByCapabilityType(
    capabilityType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapProviderCapability>> {
    return this.findAll(schoolId, { ...params, capability_type: capabilityType });
  }

  async findAvailable(schoolId: string): Promise<GecirapProviderCapability[]> {
    const result = await this.findAll(schoolId, { is_available: true, limit: 200 });
    return result.data;
  }
}
