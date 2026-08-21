import { SupabaseClient } from '@supabase/supabase-js';
import { GedkinCrudRepositoryImpl, GedkinBaseEntity, PaginatedResult, PaginationParams, FilterParams } from './base-gedkin-repository';

// ============================================================================
// Forecasting Types
// ============================================================================

export interface Forecast extends GedkinBaseEntity {
  name: string;
  description: string;
  model_id: string;
  target_metric: string;
  forecast_horizon: string;
  status: 'active' | 'inactive' | 'archived' | 'pending';
}

export interface ForecastModel extends GedkinBaseEntity {
  name: string;
  description: string;
  algorithm: string;
  parameters: Record<string, unknown>;
  accuracy_score?: number;
  training_data_id?: string;
  status: 'active' | 'inactive' | 'archived' | 'training';
}

export interface ForecastPrediction extends GedkinBaseEntity {
  forecast_id: string;
  timestamp: string;
  predicted_value: number;
  confidence_lower?: number;
  confidence_upper?: number;
  actual_value?: number;
  status: 'active' | 'inactive' | 'archived';
}

export interface CapacityForecast extends GedkinBaseEntity {
  resource_type: string;
  current_capacity: number;
  projected_demand: number;
  utilization_rate: number;
  time_period: string;
  status: 'active' | 'inactive' | 'archived';
}

export interface ModelDrift extends GedkinBaseEntity {
  model_id: string;
  drift_score: number;
  drift_type: 'data' | 'concept' | 'prediction';
  detection_date: string;
  features_affected: string[];
  status: 'detected' | 'resolved' | 'monitoring';
}

// ============================================================================
// Forecasting Repository
// ============================================================================

export class ForecastRepository extends GedkinCrudRepositoryImpl<Forecast> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gedkin_forecasts');
  }

  async findByModel(modelId: string, schoolId: string, params: PaginationParams & FilterParams = {}): Promise<PaginatedResult<Forecast>> {
    return this.findAll(schoolId, { ...params, model_id: modelId });
  }
}

export class ForecastModelRepository extends GedkinCrudRepositoryImpl<ForecastModel> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gedkin_forecast_models');
  }
}

export class ForecastPredictionRepository extends GedkinCrudRepositoryImpl<ForecastPrediction> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gedkin_forecast_predictions');
  }

  async findByForecast(forecastId: string, schoolId: string, params: PaginationParams & FilterParams = {}): Promise<PaginatedResult<ForecastPrediction>> {
    return this.findAll(schoolId, { ...params, forecast_id: forecastId });
  }
}

export class CapacityForecastRepository extends GedkinCrudRepositoryImpl<CapacityForecast> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gedkin_capacity_forecasts');
  }

  async findByResourceType(resourceType: string, schoolId: string, params: PaginationParams & FilterParams = {}): Promise<PaginatedResult<CapacityForecast>> {
    return this.findAll(schoolId, { ...params, resource_type: resourceType });
  }
}

export class ModelDriftRepository extends GedkinCrudRepositoryImpl<ModelDrift> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'gedkin_model_drifts');
  }

  async findByModel(modelId: string, schoolId: string, params: PaginationParams & FilterParams = {}): Promise<PaginatedResult<ModelDrift>> {
    return this.findAll(schoolId, { ...params, model_id: modelId });
  }
}
