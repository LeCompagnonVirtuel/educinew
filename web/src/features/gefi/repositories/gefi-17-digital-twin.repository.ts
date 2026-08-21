import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-17: Digital Twin — Financial Simulation, Scenario Planning, Modeling
// ============================================================================

export interface GEFIDigitalTwin extends BaseEntity { name: string; description: string; type: 'SCHOOL'|'DEPARTMENT'|'PROGRAM'|'PORTFOLIO'|'CUSTOM'; entity_type: string; entity_id: string; model_version: string; parameters: Record<string,unknown>; last_synced: string; status: 'ACTIVE'|'INACTIVE'|'OUTDATED'; metadata: Record<string,unknown>; }
export interface GEFIDigitalTwinParameter extends BaseEntity { twin_id: string; name: string; type: 'INPUT'|'OUTPUT'|'CONSTANT'|'VARIABLE'; data_type: string; value: unknown; default_value?: unknown; min_value?: number; max_value?: number; unit?: string; description: string; metadata: Record<string,unknown>; }
export interface GEFIDigitalTwinState extends BaseEntity { twin_id: string; state_data: Record<string,unknown>; snapshot_date: string; data_sources: string[]; status: 'CURRENT'|'STALE'|'ERROR'; metadata: Record<string,unknown>; }
export interface GEFIDigitalTwinSimulation extends BaseEntity { twin_id: string; name: string; description: string; scenario_id?: string; parameters: Record<string,unknown>; duration_months: number; iterations: number; status: 'PENDING'|'RUNNING'|'COMPLETED'|'FAILED'; started_at?: string; completed_at?: string; result_summary?: Record<string,unknown>; metadata: Record<string,unknown>; }
export interface GEFIDigitalTwinSimulationResult extends BaseEntity { simulation_id: string; iteration: number; period: string; metrics: Record<string,unknown>; events: Record<string,unknown>[]; generated_at: string; metadata: Record<string,unknown>; }
export interface GEFIDigitalTwinScenario extends BaseEntity { name: string; description: string; type: 'BASE'|'OPTIMISTIC'|'PESSIMISTIC'|'STRESS'|'CUSTOM'; assumptions: Record<string,unknown>; probability: number; status: 'DRAFT'|'ACTIVE'|'ARCHIVED'; created_by: string; metadata: Record<string,unknown>; }
export interface GEFIDigitalTwinScenarioComparison extends BaseEntity { scenario_ids: string[]; metrics: Record<string,unknown>[]; winner?: string; analysis: string; generated_at: string; metadata: Record<string,unknown>; }
export interface GEFIDigitalTwinForecast extends BaseEntity { twin_id: string; metric_name: string; forecast_type: 'SHORT_TERM'|'MEDIUM_TERM'|'LONG_TERM'; horizon_months: number; predictions: Record<string,unknown>[]; confidence_intervals: Record<string,unknown>; model_used: string; accuracy_score: number; generated_at: string; metadata: Record<string,unknown>; }
export interface GEFIDigitalTwinOptimization extends BaseEntity { twin_id: string; objective: string; constraints: Record<string,unknown>[]; objective_function: string; status: 'PENDING'|'RUNNING'|'COMPLETED'|'FAILED'; optimal_solution?: Record<string,unknown>; improvement_percentage?: number; calculated_at: string; metadata: Record<string,unknown>; }
export interface GEFIDigitalTwinAlert extends BaseEntity { twin_id: string; alert_type: string; severity: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL'; message: string; metric_name: string; current_value: number; threshold_value: number; triggered_at: string; acknowledged: boolean; metadata: Record<string,unknown>; }
export interface GEFIDigitalTwinDashboard extends BaseEntity { twin_id: string; name: string; layout: Record<string,unknown>; widgets: Record<string,unknown>[]; refresh_interval: number; is_default: boolean; metadata: Record<string,unknown>; }
export interface GEFIDigitalTwinWidget extends BaseEntity { dashboard_id: string; widget_type: string; title: string; config: Record<string,unknown>; position: Record<string,unknown>; refresh_interval: number; metadata: Record<string,unknown>; }
export interface GEFIDigitalTwinDataMapping extends BaseEntity { twin_id: string; source_entity: string; source_field: string; target_parameter: string; transformation?: string; is_active: boolean; last_synced: string; metadata: Record<string,unknown>; }
export interface GEFIDigitalTwinSyncLog extends BaseEntity { twin_id: string; direction: string; records_synced: number; errors: number; started_at: string; completed_at?: string; status: 'RUNNING'|'COMPLETED'|'FAILED'; error_message?: string; metadata: Record<string,unknown>; }
export interface GEFIDigitalTwinVersion extends BaseEntity { twin_id: string; version_number: number; description: string; parameters: Record<string,unknown>; created_by: string; created_at: string; status: 'ACTIVE'|'ARCHIVED'; metadata: Record<string,unknown>; }
export interface GEFIDigitalTwinStressTest extends BaseEntity { twin_id: string; name: string; stress_factors: Record<string,unknown>; duration_months: number; results: Record<string,unknown>; severity: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL'; status: 'PENDING'|'RUNNING'|'COMPLETED'|'FAILED'; generated_at: string; metadata: Record<string,unknown>; }
export interface GEFIAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI17Repository {
  digitalTwin: CrudRepository<GEFIDigitalTwin>;
  digitalTwinParameter: CrudRepository<GEFIDigitalTwinParameter>;
  digitalTwinState: CrudRepository<GEFIDigitalTwinState>;
  digitalTwinSimulation: CrudRepository<GEFIDigitalTwinSimulation>;
  digitalTwinSimulationResult: CrudRepository<GEFIDigitalTwinSimulationResult>;
  digitalTwinScenario: CrudRepository<GEFIDigitalTwinScenario>;
  digitalTwinScenarioComparison: CrudRepository<GEFIDigitalTwinScenarioComparison>;
  digitalTwinForecast: CrudRepository<GEFIDigitalTwinForecast>;
  digitalTwinOptimization: CrudRepository<GEFIDigitalTwinOptimization>;
  digitalTwinAlert: CrudRepository<GEFIDigitalTwinAlert>;
  digitalTwinDashboard: CrudRepository<GEFIDigitalTwinDashboard>;
  digitalTwinWidget: CrudRepository<GEFIDigitalTwinWidget>;
  digitalTwinDataMapping: CrudRepository<GEFIDigitalTwinDataMapping>;
  digitalTwinSyncLog: CrudRepository<GEFIDigitalTwinSyncLog>;
  digitalTwinVersion: CrudRepository<GEFIDigitalTwinVersion>;
  digitalTwinStressTest: CrudRepository<GEFIDigitalTwinStressTest>;
  auditTrail: CrudRepository<GEFIAuditTrail>;
}

export function createGEFI17Repository(supabase: SupabaseClient): GEFI17Repository {
  return {
    digitalTwin: createCrudRepository<GEFIDigitalTwin>(supabase, 'gefi_digital_twins'),
    digitalTwinParameter: createCrudRepository<GEFIDigitalTwinParameter>(supabase, 'gefi_digital_twin_parameters'),
    digitalTwinState: createCrudRepository<GEFIDigitalTwinState>(supabase, 'gefi_digital_twin_states'),
    digitalTwinSimulation: createCrudRepository<GEFIDigitalTwinSimulation>(supabase, 'gefi_digital_twin_simulations'),
    digitalTwinSimulationResult: createCrudRepository<GEFIDigitalTwinSimulationResult>(supabase, 'gefi_digital_twin_simulation_results'),
    digitalTwinScenario: createCrudRepository<GEFIDigitalTwinScenario>(supabase, 'gefi_digital_twin_scenarios'),
    digitalTwinScenarioComparison: createCrudRepository<GEFIDigitalTwinScenarioComparison>(supabase, 'gefi_digital_twin_scenario_comparisons'),
    digitalTwinForecast: createCrudRepository<GEFIDigitalTwinForecast>(supabase, 'gefi_digital_twin_forecasts'),
    digitalTwinOptimization: createCrudRepository<GEFIDigitalTwinOptimization>(supabase, 'gefi_digital_twin_optimizations'),
    digitalTwinAlert: createCrudRepository<GEFIDigitalTwinAlert>(supabase, 'gefi_digital_twin_alerts'),
    digitalTwinDashboard: createCrudRepository<GEFIDigitalTwinDashboard>(supabase, 'gefi_digital_twin_dashboards'),
    digitalTwinWidget: createCrudRepository<GEFIDigitalTwinWidget>(supabase, 'gefi_digital_twin_widgets'),
    digitalTwinDataMapping: createCrudRepository<GEFIDigitalTwinDataMapping>(supabase, 'gefi_digital_twin_data_mappings'),
    digitalTwinSyncLog: createCrudRepository<GEFIDigitalTwinSyncLog>(supabase, 'gefi_digital_twin_sync_logs'),
    digitalTwinVersion: createCrudRepository<GEFIDigitalTwinVersion>(supabase, 'gefi_digital_twin_versions'),
    digitalTwinStressTest: createCrudRepository<GEFIDigitalTwinStressTest>(supabase, 'gefi_digital_twin_stress_tests'),
    auditTrail: createCrudRepository<GEFIAuditTrail>(supabase, 'gefi_digital_twin_audit_trails'),
  };
}
