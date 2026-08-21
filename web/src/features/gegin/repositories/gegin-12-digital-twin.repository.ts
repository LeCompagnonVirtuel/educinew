import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gegin-base.repository';

// ============================================================================
// GEGIN-12: Digital Twin — Campus Digital Twin Framework
// ============================================================================

export interface GEGINMapLayer extends BaseEntity {
  name: string;
  description?: string;
  type: 'building' | 'infrastructure' | 'environment' | 'sensor' | 'asset' | 'custom';
  data_source: string;
  refresh_interval: number;
  visibility: 'public' | 'internal' | 'restricted';
  status: 'active' | 'inactive' | 'draft';
  style_config: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface GEGINSimulation extends BaseEntity {
  name: string;
  description: string;
  type: 'capacity' | 'energy' | 'traffic' | 'emergency' | 'environmental' | 'custom';
  parameters: Record<string, unknown>;
  input_data: Record<string, unknown>;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: Record<string, unknown>;
  started_at?: string;
  completed_at?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINForecast extends BaseEntity {
  name: string;
  description: string;
  metric: string;
  model_type: 'linear' | 'polynomial' | 'arima' | 'ml' | 'custom';
  historical_data: Record<string, unknown>[];
  predictions: Record<string, unknown>[];
  confidence_interval: number;
  accuracy_score?: number;
  status: 'draft' | 'active' | 'archived';
  metadata: Record<string, unknown>;
}

export interface GEGINWhatIfScenario extends BaseEntity {
  name: string;
  description: string;
  base_scenario_id?: string;
  changes: Record<string, unknown>[];
  expected_impact: Record<string, unknown>;
  status: 'draft' | 'evaluated' | 'approved' | 'implemented';
  evaluated_at?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINDataIngestion extends BaseEntity {
  name: string;
  source_type: 'api' | 'csv' | 'database' | 'sensor' | 'manual';
  source_config: Record<string, unknown>;
  schedule?: Record<string, unknown>;
  last_run?: string;
  next_run?: string;
  status: 'active' | 'paused' | 'error';
  error_message?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINVisualizationTemplate extends BaseEntity {
  name: string;
  description: string;
  type: 'chart' | 'map' | '3d_model' | 'dashboard' | 'report';
  template_config: Record<string, unknown>;
  data_requirements: string[];
  status: 'active' | 'inactive' | 'draft';
  metadata: Record<string, unknown>;
}

// ============================================================================
// Table Name Map
// ============================================================================
export const GEGIN12_TABLE_NAMES: Record<string, string> = {
  GEGINMapLayer: 'gegin_map_layers',
  GEGINSimulation: 'gegin_simulations',
  GEGINForecast: 'gegin_forecasts',
  GEGINWhatIfScenario: 'gegin_what_if_scenarios',
  GEGINDataIngestion: 'gegin_data_ingestions',
  GEGINVisualizationTemplate: 'gegin_visualization_templates',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEGIN12Repository {
  mapLayers: CrudRepository<GEGINMapLayer>;
  simulations: CrudRepository<GEGINSimulation>;
  forecasts: CrudRepository<GEGINForecast>;
  whatIfScenarios: CrudRepository<GEGINWhatIfScenario>;
  dataIngestions: CrudRepository<GEGINDataIngestion>;
  visualizationTemplates: CrudRepository<GEGINVisualizationTemplate>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEGIN12Repository(supabase: SupabaseClient): GEGIN12Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    mapLayers: crud<GEGINMapLayer>(GEGIN12_TABLE_NAMES.GEGINMapLayer),
    simulations: crud<GEGINSimulation>(GEGIN12_TABLE_NAMES.GEGINSimulation),
    forecasts: crud<GEGINForecast>(GEGIN12_TABLE_NAMES.GEGINForecast),
    whatIfScenarios: crud<GEGINWhatIfScenario>(GEGIN12_TABLE_NAMES.GEGINWhatIfScenario),
    dataIngestions: crud<GEGINDataIngestion>(GEGIN12_TABLE_NAMES.GEGINDataIngestion),
    visualizationTemplates: crud<GEGINVisualizationTemplate>(GEGIN12_TABLE_NAMES.GEGINVisualizationTemplate),
  };
}
