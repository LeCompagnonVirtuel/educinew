import { SupabaseClient } from '@supabase/supabase-js';
import {
  GecirapCostError,
  GecirapBudgetNotFoundError,
  GecirapBudgetExceededError,
  GecirapForecastError,
  GecirapCostAnomalyDetectedError,
  GecirapOptimizationError,
  GecirapCommitmentError,
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

export interface GecirapCloudCost extends GecirapBaseEntity {
  account_id: string;
  provider: string;
  service_name: string;
  region_code: string;
  cost_amount: number;
  currency: string;
  cost_date: string;
  usage_hours?: number;
  tags?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface GecirapCostAllocation extends GecirapBaseEntity {
  cost_center_id: string;
  account_id: string;
  allocation_percent: number;
  cost_amount: number;
  period_start: string;
  period_end: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapCostCenter extends GecirapBaseEntity {
  name: string;
  description?: string;
  parent_id?: string;
  budget_limit?: number;
  currency: string;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapBudget extends GecirapBaseEntity {
  cost_center_id: string;
  name: string;
  amount: number;
  currency: string;
  period_type: string;
  start_date: string;
  end_date: string;
  spent_amount: number;
  alert_threshold_percent: number;
  status: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapCostForecast extends GecirapBaseEntity {
  cost_center_id: string;
  forecast_period_days: number;
  predicted_amount: number;
  currency: string;
  confidence_score?: number;
  forecasted_at: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapCostAnomaly extends GecirapBaseEntity {
  account_id: string;
  service_name: string;
  anomaly_type: string;
  severity: string;
  expected_amount: number;
  actual_amount: number;
  deviation_percent: number;
  detected_at: string;
  resolved_at?: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapOptimizationRecommendation extends GecirapBaseEntity {
  recommendation_type: string;
  resource_type: string;
  resource_id: string;
  current_monthly_cost: number;
  recommended_monthly_cost: number;
  savings_amount: number;
  savings_percent: number;
  implementation_effort: string;
  status: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapReservedCapacity extends GecirapBaseEntity {
  provider: string;
  account_id: string;
  resource_type: string;
  reserved_count: number;
  term_months: number;
  upfront_cost: number;
  monthly_recurring_cost: number;
  utilization_percent?: number;
  expiry_date: string;
  status: string;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Repository Implementations
// ============================================================================

export class CloudCostRepository extends GecirapCrudRepositoryImpl<GecirapCloudCost> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cloud_costs', (msg) => {
      throw new GecirapCostError(msg);
    });
  }

  async findByAccountId(
    accountId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudCost>> {
    return this.findAll(schoolId, { ...params, account_id: accountId });
  }

  async findByProvider(
    provider: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudCost>> {
    return this.findAll(schoolId, { ...params, provider });
  }

  async findByDateRange(
    startDate: string,
    endDate: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCloudCost>> {
    const { data, error, count } = await this.supabase
      .from(this.tableName)
      .select('*', { count: 'exact' })
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .gte('cost_date', startDate)
      .lte('cost_date', endDate)
      .range(params.offset || 0, (params.offset || 0) + (params.limit || 50) - 1);

    if (error) {
      throw new GecirapCostError(
        `Erreur lors de la récupération des coûts par période: ${error.message}`,
      );
    }

    return {
      data: (data || []) as GecirapCloudCost[],
      total: count || 0,
      offset: params.offset || 0,
      limit: params.limit || 50,
    };
  }
}

export class CostAllocationRepository extends GecirapCrudRepositoryImpl<GecirapCostAllocation> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cost_allocations', (msg) => {
      throw new GecirapCostError(msg);
    });
  }

  async findByCostCenterId(
    costCenterId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCostAllocation>> {
    return this.findAll(schoolId, { ...params, cost_center_id: costCenterId });
  }

  async findByAccountId(
    accountId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCostAllocation>> {
    return this.findAll(schoolId, { ...params, account_id: accountId });
  }
}

export class CostCenterRepository extends GecirapCrudRepositoryImpl<GecirapCostCenter> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cost_centers', (msg) => {
      throw new GecirapBudgetNotFoundError(msg);
    });
  }

  async findByParentId(
    parentId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCostCenter>> {
    return this.findAll(schoolId, { ...params, parent_id: parentId });
  }

  async findRoots(schoolId: string): Promise<GecirapCostCenter[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .is('parent_id', null);

    if (error) {
      throw new GecirapBudgetNotFoundError(
        `Erreur lors de la récupération des centres racines: ${error.message}`,
      );
    }

    return (data || []) as GecirapCostCenter[];
  }
}

export class BudgetRepository extends GecirapCrudRepositoryImpl<GecirapBudget> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_budgets', (msg) => {
      throw new GecirapBudgetNotFoundError(msg);
    });
  }

  async findByCostCenterId(
    costCenterId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapBudget>> {
    return this.findAll(schoolId, { ...params, cost_center_id: costCenterId });
  }

  async findExceeded(schoolId: string): Promise<GecirapBudget[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .filter('spent_amount', 'gt', 'amount');

    if (error) {
      throw new GecirapBudgetExceededError(
        `Erreur lors de la récupération des budgets dépassés: ${error.message}`,
      );
    }

    return (data || []) as GecirapBudget[];
  }

  async findActive(schoolId: string): Promise<GecirapBudget[]> {
    const now = new Date().toISOString();
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .eq('status', 'active')
      .lte('start_date', now)
      .gte('end_date', now);

    if (error) {
      throw new GecirapBudgetNotFoundError(
        `Erreur lors de la récupération des budgets actifs: ${error.message}`,
      );
    }

    return (data || []) as GecirapBudget[];
  }
}

export class CostForecastRepository extends GecirapCrudRepositoryImpl<GecirapCostForecast> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cost_forecasts', (msg) => {
      throw new GecirapForecastError(msg);
    });
  }

  async findByCostCenterId(
    costCenterId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCostForecast>> {
    return this.findAll(schoolId, { ...params, cost_center_id: costCenterId });
  }

  async findLatest(costCenterId: string, schoolId: string): Promise<GecirapCostForecast | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('cost_center_id', costCenterId)
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('forecasted_at', { ascending: false })
      .limit(1)
      .single();

    if (error) return null;
    return data as GecirapCostForecast;
  }
}

export class CostAnomalyRepository extends GecirapCrudRepositoryImpl<GecirapCostAnomaly> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_cost_anomalies', (msg) => {
      throw new GecirapCostAnomalyDetectedError(msg);
    });
  }

  async findByAccountId(
    accountId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCostAnomaly>> {
    return this.findAll(schoolId, { ...params, account_id: accountId });
  }

  async findUnresolved(schoolId: string): Promise<GecirapCostAnomaly[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .is('resolved_at', null);

    if (error) {
      throw new GecirapCostAnomalyDetectedError(
        `Erreur lors de la récupération des anomalies non résolues: ${error.message}`,
      );
    }

    return (data || []) as GecirapCostAnomaly[];
  }

  async findBySeverity(
    severity: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCostAnomaly>> {
    return this.findAll(schoolId, { ...params, severity });
  }
}

export class OptimizationRecommendationRepository extends GecirapCrudRepositoryImpl<GecirapOptimizationRecommendation> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_optimization_recommendations', (msg) => {
      throw new GecirapOptimizationError(msg);
    });
  }

  async findByResource(
    resourceType: string,
    resourceId: string,
    schoolId: string,
  ): Promise<GecirapOptimizationRecommendation[]> {
    const result = await this.findAll(schoolId, {
      resource_type: resourceType,
      resource_id: resourceId,
      limit: 200,
    });
    return result.data;
  }

  async findPending(schoolId: string): Promise<GecirapOptimizationRecommendation[]> {
    const result = await this.findAll(schoolId, { status: 'pending', limit: 200 });
    return result.data;
  }

  async findHighSavings(schoolId: string, minSavingsPercent = 20): Promise<GecirapOptimizationRecommendation[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .gte('savings_percent', minSavingsPercent)
      .order('savings_amount', { ascending: false });

    if (error) {
      throw new GecirapOptimizationError(
        `Erreur lors de la récupération des recommandations haute économie: ${error.message}`,
      );
    }

    return (data || []) as GecirapOptimizationRecommendation[];
  }
}

export class ReservedCapacityRepository extends GecirapCrudRepositoryImpl<GecirapReservedCapacity> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_reserved_capacities', (msg) => {
      throw new GecirapCommitmentError(msg);
    });
  }

  async findByProvider(
    provider: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapReservedCapacity>> {
    return this.findAll(schoolId, { ...params, provider });
  }

  async findByAccountId(
    accountId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapReservedCapacity>> {
    return this.findAll(schoolId, { ...params, account_id: accountId });
  }

  async findExpiring(schoolId: string, withinDays = 30): Promise<GecirapReservedCapacity[]> {
    const expiryDate = new Date(Date.now() + withinDays * 24 * 60 * 60 * 1000).toISOString();
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .lte('expiry_date', expiryDate);

    if (error) {
      throw new GecirapCommitmentError(
        `Erreur lors de la récupération des réservations expirant: ${error.message}`,
      );
    }

    return (data || []) as GecirapReservedCapacity[];
  }
}
