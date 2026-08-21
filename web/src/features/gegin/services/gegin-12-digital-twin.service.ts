import { SupabaseClient } from '@supabase/supabase-js';
import { GEGINBaseService } from '../gegin-base.service';
import { GEGINMapLayer, GEGINSimulation, GEGINForecast, GEGINWhatIfScenario, GEGINDataIngestion, GEGINVisualizationTemplate, GEGIN12_TABLE_NAMES } from '../repositories/gegin-12-digital-twin.repository';
import { logger } from '@educi/logger';

export class GEGINMapLayerService extends GEGINBaseService<GEGINMapLayer> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN12_TABLE_NAMES.GEGINMapLayer, moduleName: 'MapLayer' });
  }
}

export class GEGINSimulationService extends GEGINBaseService<GEGINSimulation> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN12_TABLE_NAMES.GEGINSimulation, moduleName: 'Simulation' });
  }
}

export class GEGINForecastService extends GEGINBaseService<GEGINForecast> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN12_TABLE_NAMES.GEGINForecast, moduleName: 'Forecast' });
  }
}

export class GEGINWhatIfScenarioService extends GEGINBaseService<GEGINWhatIfScenario> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN12_TABLE_NAMES.GEGINWhatIfScenario, moduleName: 'WhatIfScenario' });
  }
}

export class GEGINDataIngestionService extends GEGINBaseService<GEGINDataIngestion> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN12_TABLE_NAMES.GEGINDataIngestion, moduleName: 'DataIngestion' });
  }
}

export class GEGINVisualizationTemplateService extends GEGINBaseService<GEGINVisualizationTemplate> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN12_TABLE_NAMES.GEGINVisualizationTemplate, moduleName: 'VisualizationTemplate' });
  }
}

export class GEGIN12DigitalTwinService {
  readonly mapLayers: GEGINMapLayerService;
  readonly simulations: GEGINSimulationService;
  readonly forecasts: GEGINForecastService;
  readonly whatIfScenarios: GEGINWhatIfScenarioService;
  readonly dataIngestions: GEGINDataIngestionService;
  readonly visualizationTemplates: GEGINVisualizationTemplateService;

  constructor(supabase: SupabaseClient) {
    this.mapLayers = new GEGINMapLayerService(supabase);
    this.simulations = new GEGINSimulationService(supabase);
    this.forecasts = new GEGINForecastService(supabase);
    this.whatIfScenarios = new GEGINWhatIfScenarioService(supabase);
    this.dataIngestions = new GEGINDataIngestionService(supabase);
    this.visualizationTemplates = new GEGINVisualizationTemplateService(supabase);
  }
}

export function createGEGIN12DigitalTwinService(supabase: SupabaseClient): GEGIN12DigitalTwinService {
  return new GEGIN12DigitalTwinService(supabase);
}
