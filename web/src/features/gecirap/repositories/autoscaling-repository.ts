import { SupabaseClient } from '@supabase/supabase-js';
import {
  GecirapScalingPolicyNotFoundError,
  GecirapScalingFailedError,
  GecirapCapacityForecastError,
  GecirapCapacityAlertError,
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

export interface GecirapScalingPolicy extends GecirapBaseEntity {
  name: string;
  description?: string;
  resource_type: string;
  resource_id: string;
  policy_type: string;
  min_replicas: number;
  max_replicas: number;
  scale_up_threshold?: number;
  scale_down_threshold?: number;
  cooldown_seconds: number;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapScalingEvent extends GecirapBaseEntity {
  policy_id: string;
  event_type: string;
  previous_replicas: number;
  desired_replicas: number;
  reason?: string;
  triggered_at: string;
  completed_at?: string;
  status: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapCapacityForecast extends GecirapBaseEntity {
  resource_type: string;
  resource_id: string;
  forecast_period_days: number;
  predicted_usage_percent?: number;
  recommended_replicas?: number;
  confidence_score?: number;
  forecasted_at: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapCapacityPlan extends GecirapBaseEntity {
  name: string;
  description?: string;
  resource_type: string;
  target_utilization_percent: number;
  headroom_percent: number;
  planning_horizon_days: number;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface GecirapResourceUtilization extends GecirapBaseEntity {
  resource_type: string;
  resource_id: string;
  cpu_percent?: number;
  memory_percent?: number;
  disk_percent?: number;
  network_in_bytes?: number;
  network_out_bytes?: number;
  measured_at: string;
  metadata?: Record<string, unknown>;
}

export interface GecirapCapacityAlert extends GecirapBaseEntity {
  resource_type: string;
  resource_id: string;
  alert_type: string;
  severity: string;
  message: string;
  threshold_percent: number;
  current_percent: number;
  acknowledged_at?: string;
  resolved_at?: string;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Repository Implementations
// ============================================================================

export class ScalingPolicyRepository extends GecirapCrudRepositoryImpl<GecirapScalingPolicy> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_scaling_policies', (msg) => {
      throw new GecirapScalingPolicyNotFoundError(msg);
    });
  }

  async findByResource(
    resourceType: string,
    resourceId: string,
    schoolId: string,
  ): Promise<GecirapScalingPolicy[]> {
    const result = await this.findAll(schoolId, {
      resource_type: resourceType,
      resource_id: resourceId,
      limit: 200,
    });
    return result.data;
  }

  async findActive(schoolId: string): Promise<GecirapScalingPolicy[]> {
    const result = await this.findAll(schoolId, { is_active: true, limit: 200 });
    return result.data;
  }
}

export class ScalingEventRepository extends GecirapCrudRepositoryImpl<GecirapScalingEvent> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_scaling_events', (msg) => {
      throw new GecirapScalingFailedError(msg);
    });
  }

  async findByPolicyId(
    policyId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapScalingEvent>> {
    return this.findAll(schoolId, { ...params, policy_id: policyId });
  }

  async findRecent(schoolId: string, limitCount = 50): Promise<GecirapScalingEvent[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('triggered_at', { ascending: false })
      .limit(limitCount);

    if (error) {
      throw new GecirapScalingFailedError(
        `Erreur lors de la récupération des événements récents: ${error.message}`,
      );
    }

    return (data || []) as GecirapScalingEvent[];
  }
}

export class CapacityForecastRepository extends GecirapCrudRepositoryImpl<GecirapCapacityForecast> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_capacity_forecasts', (msg) => {
      throw new GecirapCapacityForecastError(msg);
    });
  }

  async findByResource(
    resourceType: string,
    resourceId: string,
    schoolId: string,
  ): Promise<GecirapCapacityForecast[]> {
    const result = await this.findAll(schoolId, {
      resource_type: resourceType,
      resource_id: resourceId,
      limit: 200,
    });
    return result.data;
  }

  async findLatest(resourceType: string, resourceId: string, schoolId: string): Promise<GecirapCapacityForecast | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('resource_type', resourceType)
      .eq('resource_id', resourceId)
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('forecasted_at', { ascending: false })
      .limit(1)
      .single();

    if (error) return null;
    return data as GecirapCapacityForecast;
  }
}

export class CapacityPlanRepository extends GecirapCrudRepositoryImpl<GecirapCapacityPlan> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_capacity_plans', (msg) => {
      throw new GecirapCapacityForecastError(msg);
    });
  }

  async findByResourceType(
    resourceType: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCapacityPlan>> {
    return this.findAll(schoolId, { ...params, resource_type: resourceType });
  }

  async findActive(schoolId: string): Promise<GecirapCapacityPlan[]> {
    const result = await this.findAll(schoolId, { is_active: true, limit: 200 });
    return result.data;
  }
}

export class ResourceUtilizationRepository extends GecirapCrudRepositoryImpl<GecirapResourceUtilization> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_resource_utilizations', (msg) => {
      throw new GecirapCapacityForecastError(msg);
    });
  }

  async findByResource(
    resourceType: string,
    resourceId: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapResourceUtilization>> {
    return this.findAll(schoolId, {
      ...params,
      resource_type: resourceType,
      resource_id: resourceId,
    });
  }

  async findLatest(resourceType: string, resourceId: string, schoolId: string): Promise<GecirapResourceUtilization | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('resource_type', resourceType)
      .eq('resource_id', resourceId)
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('measured_at', { ascending: false })
      .limit(1)
      .single();

    if (error) return null;
    return data as GecirapResourceUtilization;
  }
}

export class CapacityAlertRepository extends GecirapCrudRepositoryImpl<GecirapCapacityAlert> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gecirap_capacity_alerts', (msg) => {
      throw new GecirapCapacityAlertError(msg);
    });
  }

  async findUnresolved(schoolId: string): Promise<GecirapCapacityAlert[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .is('resolved_at', null);

    if (error) {
      throw new GecirapCapacityAlertError(
        `Erreur lors de la récupération des alertes non résolues: ${error.message}`,
      );
    }

    return (data || []) as GecirapCapacityAlert[];
  }

  async findBySeverity(
    severity: string,
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<GecirapCapacityAlert>> {
    return this.findAll(schoolId, { ...params, severity });
  }
}
