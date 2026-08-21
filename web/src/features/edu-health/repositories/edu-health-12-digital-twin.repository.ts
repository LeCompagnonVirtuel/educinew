import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './edu-health-base.repository';

// ============================================================================
// EDU-HEALTH-12: Digital Twin — Simulations, Scenarios & Virtual Models
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface EHDigitalTwin extends BaseEntity { twin_name: string; twin_type: 'campus'|'student'| 'department'|'system'|'flow'; description: string; model_data: Record<string,unknown>; data_sources: string[]; last_synced_at: string; sync_frequency: string; version: string; status: 'building'|'active'|'paused'|'archived'; }
export interface EHSimulationScenario extends BaseEntity { twin_id: string; scenario_name: string; scenario_type: 'health_outbreak'|'emergency_response'| 'capacity_planning'| 'resource_allocation'|'weather_impact'|'policy_change'; description: string; parameters: Record<string,unknown>; variables: Record<string,unknown>[]; start_state: Record<string,unknown>; status: 'draft'|'running'|'completed'|'failed'; }
export interface EHSimulationRun extends BaseEntity { scenario_id: string; run_date: string; duration_seconds: number; parameters_used: Record<string,unknown>; initial_state: Record<string,unknown>; final_state: Record<string,unknown>; events: Record<string,unknown>[]; metrics_collected: Record<string,unknown>; status: 'completed'|'failed'|'cancelled'; error_message?: string; }
export interface EHSimulationResult extends BaseEntity { run_id: string; metric_name: string; metric_value: number; unit: string; timeline: Record<string,unknown>[]; comparison_baseline?: number; improvement_percentage?: number; confidence_interval?: Record<string,number>; }
export interface EHWhatIfAnalysis extends BaseEntity { twin_id: string; analysis_name: string; base_scenario_id: string; variable_changes: Record<string,unknown>; description: string; results_summary: Record<string,unknown>; key_findings: string[]; recommendations: string[]; created_by: string; status: 'completed'|'pending'|'failed'; }
export interface EHVirtualCampusModel extends BaseEntity { campus_id: string; model_type: '2d_layout'|'3d_model'|'flow_simulation'| 'environmental'; file_url: string; file_format: string; file_size: number; version: string; created_by: string; last_updated: string; interactive: boolean; status: 'active'|'outdated'|'archived'; }
export interface EHHealthFlowSimulation extends BaseEntity { twin_id: string; flow_type: 'student_movement'| 'incident_response'| 'medical_referral'| 'emergency_evacuation'| 'service_delivery'; description: string; bottlenecks_identified: Record<string,unknown>[]; optimization_suggestions: string[]; efficiency_score: number; status: 'completed'|'running'|'failed'; }
export interface EHResourceOptimization extends BaseEntity { twin_id: string; optimization_type: 'staff_allocation'| 'equipment_placement'| 'space_utilization'| 'budget_distribution'; current_allocation: Record<string,unknown>; optimized_allocation: Record<string,unknown>; savings_percentage: number; implementation_complexity: 'low'|'medium'|'high'; estimated_impact: string; status: 'proposed'|'approved'|'implementing'|'implemented'; }
export interface EHDigitalTwinSync extends BaseEntity { twin_id: string; sync_source: string; sync_type: 'full'|'incremental'|'selective'; sync_date: string; records_synced: number; sync_duration_ms: number; data_freshness: string; status: 'completed'|'in_progress'|'failed'; error_log?: string; }
export interface EHVisualizationConfig extends BaseEntity { twin_id: string; viz_type: 'heatmap'|'timeline'| 'scatter'|'network'|'geospatial'|'3d'; title: string; configuration: Record<string,unknown>; data_query: string; refresh_interval: number; shared: boolean; status: 'active'|'hidden'|'error'; }
export interface EHScenarioTemplate extends BaseEntity { template_name: string; scenario_type: string; description: string; default_parameters: Record<string,unknown>; variable_definitions: Record<string,unknown>[]; use_cases: string[]; created_by: string; status: 'draft'|'published'|'archived'; }
export interface EHDigitalTwinAlert extends BaseEntity { twin_id: string; alert_type: 'sync_failure'| 'anomaly_detected'| 'threshold_breach'|'model_drift'|'data_stale'; severity: 'info'|'warning'|'critical'; title: string; message: string; metric_name?: string; metric_value?: number; acknowledged: boolean; action_taken?: string; }
export interface EHDigitalTwinVersion extends BaseEntity { twin_id: string; version: string; changelog: string; model_snapshot: Record<string,unknown>; created_by: string; created_at_version: string; status: 'current'|'previous'|'archived'; }
export interface EHDigitalTwinMetric extends BaseEntity { metric_type: string; value: number; unit: string; dimension: Record<string,string>; period: string; calculated_at: string; }
export interface EHDigitalTwinCollaboration extends BaseEntity { twin_id: string; collaborator_id: string; role: 'viewer'|'editor'|'admin'; granted_by: string; granted_at: string; last_access?: string; status: 'active'|'revoked'; }

// ============================================================================
// Entity table name map
// ============================================================================
export const EDU_HEALTH_12_TABLE_NAMES: Record<string, string> = {
  EHDigitalTwin: 'eh_digital_twins',
  EHSimulationScenario: 'eh_simulation_scenarios',
  EHSimulationRun: 'eh_simulation_runs',
  EHSimulationResult: 'eh_simulation_results',
  EHWhatIfAnalysis: 'eh_what_if_analyses',
  EHVirtualCampusModel: 'eh_virtual_campus_models',
  EHHealthFlowSimulation: 'eh_health_flow_simulations',
  EHResourceOptimization: 'eh_resource_optimizations',
  EHDigitalTwinSync: 'eh_digital_twin_syncs',
  EHVisualizationConfig: 'eh_visualization_configs',
  EHScenarioTemplate: 'eh_scenario_templates',
  EHDigitalTwinAlert: 'eh_digital_twin_alerts',
  EHDigitalTwinVersion: 'eh_digital_twin_versions',
  EHDigitalTwinMetric: 'eh_digital_twin_metrics',
  EHDigitalTwinCollaboration: 'eh_digital_twin_collaborations',
};

// ============================================================================
// Repository Interface — typed CRUD for each entity
// ============================================================================
export interface EDU_HEALTH_12_Repository {
  digitalTwins: CrudRepository<EHDigitalTwin>;
  simulationScenarios: CrudRepository<EHSimulationScenario>;
  simulationRuns: CrudRepository<EHSimulationRun>;
  simulationResults: CrudRepository<EHSimulationResult>;
  whatIfAnalyses: CrudRepository<EHWhatIfAnalysis>;
  virtualCampusModels: CrudRepository<EHVirtualCampusModel>;
  healthFlowSimulations: CrudRepository<EHHealthFlowSimulation>;
  resourceOptimizations: CrudRepository<EHResourceOptimization>;
  digitalTwinSyncs: CrudRepository<EHDigitalTwinSync>;
  visualizationConfigs: CrudRepository<EHVisualizationConfig>;
  scenarioTemplates: CrudRepository<EHScenarioTemplate>;
  digitalTwinAlerts: CrudRepository<EHDigitalTwinAlert>;
  digitalTwinVersions: CrudRepository<EHDigitalTwinVersion>;
  digitalTwinMetrics: CrudRepository<EHDigitalTwinMetric>;
  digitalTwinCollaborations: CrudRepository<EHDigitalTwinCollaboration>;
}

// ============================================================================
// Factory
// ============================================================================
export function createEDU_HEALTH_12_Repository(supabase: SupabaseClient): EDU_HEALTH_12_Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    digitalTwins: crud<EHDigitalTwin>(EDU_HEALTH_12_TABLE_NAMES.EHDigitalTwin),
    simulationScenarios: crud<EHSimulationScenario>(EDU_HEALTH_12_TABLE_NAMES.EHSimulationScenario),
    simulationRuns: crud<EHSimulationRun>(EDU_HEALTH_12_TABLE_NAMES.EHSimulationRun),
    simulationResults: crud<EHSimulationResult>(EDU_HEALTH_12_TABLE_NAMES.EHSimulationResult),
    whatIfAnalyses: crud<EHWhatIfAnalysis>(EDU_HEALTH_12_TABLE_NAMES.EHWhatIfAnalysis),
    virtualCampusModels: crud<EHVirtualCampusModel>(EDU_HEALTH_12_TABLE_NAMES.EHVirtualCampusModel),
    healthFlowSimulations: crud<EHHealthFlowSimulation>(EDU_HEALTH_12_TABLE_NAMES.EHHealthFlowSimulation),
    resourceOptimizations: crud<EHResourceOptimization>(EDU_HEALTH_12_TABLE_NAMES.EHResourceOptimization),
    digitalTwinSyncs: crud<EHDigitalTwinSync>(EDU_HEALTH_12_TABLE_NAMES.EHDigitalTwinSync),
    visualizationConfigs: crud<EHVisualizationConfig>(EDU_HEALTH_12_TABLE_NAMES.EHVisualizationConfig),
    scenarioTemplates: crud<EHScenarioTemplate>(EDU_HEALTH_12_TABLE_NAMES.EHScenarioTemplate),
    digitalTwinAlerts: crud<EHDigitalTwinAlert>(EDU_HEALTH_12_TABLE_NAMES.EHDigitalTwinAlert),
    digitalTwinVersions: crud<EHDigitalTwinVersion>(EDU_HEALTH_12_TABLE_NAMES.EHDigitalTwinVersion),
    digitalTwinMetrics: crud<EHDigitalTwinMetric>(EDU_HEALTH_12_TABLE_NAMES.EHDigitalTwinMetric),
    digitalTwinCollaborations: crud<EHDigitalTwinCollaboration>(EDU_HEALTH_12_TABLE_NAMES.EHDigitalTwinCollaboration),
  };
}
