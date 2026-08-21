export enum TwinSimulationType {
  SCENARIO_PLANNING = "scenario_planning",
  WHAT_IF = "what_if",
  STRESS_TEST = "stress_test",
  CAPACITY_PLANNING = "capacity_planning",
  RESOURCE_OPTIMIZATION = "resource_optimization",
  RISK_ASSESSMENT = "risk_assessment",
  EMERGENCY_SIMULATION = "emergency_simulation",
  TREND_EXTRAPOLATION = "trend_extrapolation",
}

export enum WhatIfParameter {
  STAFFING_LEVEL = "staffing_level",
  BUDGET_ALLOCATION = "budget_allocation",
  CLASS_SIZE = "class_size",
  PROGRAM_FUNDING = "program_funding",
  TECHNOLOGY_INVESTMENT = "technology_investment",
  TRAINING_HOURS = "training_hours",
  EMERGENCY_RESPONSE_TIME = "emergency_response_time",
  STUDENT_RATIO = "student_ratio",
}

export enum ScenarioOutcome {
  OPTIMISTIC = "optimistic",
  BASELINE = "baseline",
  PESSIMISTIC = "pessimistic",
  CRISIS = "crisis",
  RECOVERY = "recovery",
}

export enum ResourceAllocationType {
  HUMAN_RESOURCES = "human_resources",
  FINANCIAL = "financial",
  EQUIPMENT = "equipment",
  SPACE = "space",
  TIME = "time",
  TECHNOLOGY = "technology",
}

export enum RiskProjection {
  LOW_RISK = "low_risk",
  MEDIUM_RISK = "medium_risk",
  HIGH_RISK = "high_risk",
  CRITICAL_RISK = "critical_risk",
  UNACCEPTABLE_RISK = "unacceptable_risk",
}

export enum TwinSyncFrequency {
  REAL_TIME = "real_time",
  HOURLY = "hourly",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

export enum SimulationStatus {
  DRAFT = "draft",
  RUNNING = "running",
  COMPLETED = "completed",
  FAILED = "failed",
  ARCHIVED = "archived",
}

export enum DataFidelityLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  VERY_HIGH = "very_high",
  EXACT = "exact",
}

export enum TwinVisualizationType {
  DASHBOARD = "dashboard",
  HEATMAP = "heatmap",
  TIMELINE = "timeline",
  NETWORK = "network",
  COMPARISON = "comparison",
}

export enum ScenarioComplexity {
  SIMPLE = "simple",
  MODERATE = "moderate",
  COMPLEX = "complex",
  HIGHLY_COMPLEX = "highly_complex",
}

export interface StudentWellbeingTwin {
  id: string;
  school_id: string;
  student_id: string;
  twin_version: string;
  wellbeing_score: number;
  dimension_scores: Record<string, number>;
  risk_factors: string[];
  protective_factors: string[];
  predicted_trajectory: number[];
  confidence_level: number;
  last_synced: string;
  data_sources: string[];
  alerts: TwinAlert[];
  created_at: string;
  updated_at: string;
}

export interface SchoolSafetyTwin {
  id: string;
  school_id: string;
  school_name: string;
  twin_version: string;
  overall_safety_score: number;
  zone_scores: Record<string, number>;
  risk_areas: string[];
  safety_trends: number[];
  resource_allocation: Record<string, number>;
  capacity_utilization: number;
  last_synced: string;
  alerts: TwinAlert[];
  created_at: string;
  updated_at: string;
}

export interface WellbeingScenario {
  id: string;
  school_id: string;
  scenario_name: string;
  simulation_type: TwinSimulationType;
  parameters: Record<string, string>;
  outcomes: ScenarioOutcome;
  predicted_wellbeing_score: number;
  affected_students: number;
  resource_requirements: Record<string, number>;
  implementation_cost: number;
  timeline_months: number;
  risk_level: RiskProjection;
  assumptions: string[];
  recommendations: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SafetyScenario {
  id: string;
  school_id: string;
  scenario_name: string;
  simulation_type: TwinSimulationType;
  parameters: Record<string, string>;
  outcomes: ScenarioOutcome;
  predicted_safety_score: number;
  affected_zones: string[];
  resource_requirements: Record<string, number>;
  implementation_cost: number;
  timeline_months: number;
  risk_level: RiskProjection;
  assumptions: string[];
  recommendations: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencySimulation {
  id: string;
  school_id: string;
  simulation_name: string;
  emergency_type: string;
  simulation_date: string;
  participants: string[];
  duration_minutes: number;
  scenario_parameters: Record<string, string>;
  response_time: number;
  evacuation_time: number;
  communication_effectiveness: number;
  resource_utilization: Record<string, number>;
  lessons_learned: string[];
  improvement_areas: string[];
  overall_score: number;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BullyingInterventionScenario {
  id: string;
  school_id: string;
  scenario_name: string;
  intervention_type: string;
  parameters: Record<string, string>;
  predicted_incident_reduction: number;
  affected_students: number;
  resource_cost: number;
  implementation_timeline: number;
  effectiveness_score: number;
  side_effects: string[];
  prerequisites: string[];
  success_factors: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ResourceAllocationScenario {
  id: string;
  school_id: string;
  scenario_name: string;
  resource_type: ResourceAllocationType;
  current_allocation: Record<string, number>;
  proposed_allocation: Record<string, number>;
  impact_analysis: Record<string, number>;
  cost_benefit_ratio: number;
  return_on_investment: number;
  risk_assessment: RiskProjection;
  stakeholder_impact: string[];
  implementation_complexity: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CounselorCapacityScenario {
  id: string;
  school_id: string;
  scenario_name: string;
  current_counselors: number;
  proposed_counselors: number;
  student_to_counselor_ratio: number;
  projected_caseload: number;
  capacity_utilization: number;
  wait_time_reduction: number;
  outcome_improvement: number;
  cost_per_session: number;
  annual_cost: number;
  funding_sources: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface HealthServiceDemand {
  id: string;
  school_id: string;
  service_type: string;
  current_demand: number;
  projected_demand: number;
  capacity: number;
  gap: number;
  utilization_rate: number;
  peak_periods: string[];
  demand_trend: number[];
  resource_needs: Record<string, number>;
  priority_level: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegionalRiskScenario {
  id: string;
  region_id: string;
  region_name: string;
  scenario_name: string;
  risk_type: string;
  affected_schools: number;
  affected_students: number;
  risk_level: RiskProjection;
  impact_score: number;
  resource_requirements: Record<string, number>;
  coordination_needs: string[];
  timeline_months: number;
  mitigation_strategies: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface NationalHealthScenario {
  id: string;
  country_id: string;
  country_name: string;
  scenario_name: string;
  policy_focus: string;
  target_population: number;
  projected_outcomes: Record<string, number>;
  budget_requirement: number;
  implementation_phases: string[];
  success_metrics: string[];
  risk_factors: string[];
  international_benchmarks: Record<string, number>;
  timeline_years: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SimulationResult {
  id: string;
  school_id: string;
  scenario_id: string;
  simulation_date: string;
  outcome_metrics: Record<string, number>;
  confidence_interval: Record<string, number>;
  statistical_significance: number;
  sensitivity_analysis: Record<string, number>;
  Monte_carlo_iterations: number;
  convergence_achieved: boolean;
  key_findings: string[];
  recommendations: string[];
  visualization_data: Record<string, string>;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface WhatIfAnalysis {
  id: string;
  school_id: string;
  analysis_name: string;
  base_scenario: string;
  parameters_varied: WhatIfParameter[];
  parameter_ranges: Record<string, number>;
  results_matrix: Record<string, Record<string, number>>;
  optimal_values: Record<string, number>;
  breaking_points: Record<string, number>;
  recommendations: string[];
  confidence_level: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface TwinAlert {
  id: string;
  school_id: string;
  twin_id: string;
  alert_type: string;
  severity: string;
  metric_name: string;
  current_value: number;
  threshold_value: number;
  message: string;
  triggered_at: string;
  acknowledged_by: string;
  acknowledged_at: string;
  resolved_by: string;
  resolved_at: string;
  resolution_notes: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ScenarioComparison {
  id: string;
  school_id: string;
  comparison_name: string;
  scenario_ids: string[];
  scenario_names: string[];
  comparison_metrics: Record<string, number>[];
  ranking: string[];
  best_scenario: string;
  worst_scenario: string;
  key_differences: string[];
  trade_offs: string[];
  recommendation: string;
  generated_at: string;
  created_at: string;
  updated_at: string;
}
