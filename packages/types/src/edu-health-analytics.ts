export enum AnalyticsDashboardType {
  OVERVIEW = "overview",
  WELLBEING = "wellbeing",
  SAFEGUARDING = "safeguarding",
  BULLYING = "bullying",
  INCIDENTS = "incidents",
  SAFETY = "safety",
  INCLUSION = "inclusion",
  HEALTH_TRENDS = "health_trends",
  RISK_HEATMAP = "risk_heatmap",
  COMPARISON = "comparison",
}

export enum KPIType {
  HEALTH_SCORE = "health_score",
  WELLBEING_INDEX = "wellbeing_index",
  SAFEGUARDING_CASES = "safeguarding_cases",
  BULLYING_INCIDENTS = "bullying_incidents",
  INCIDENT_RATE = "incident_rate",
  SAFETY_COMPLIANCE = "safety_compliance",
  INCLUSION_RATE = "inclusion_rate",
  COUNSELING_SESSIONS = "counseling_sessions",
  PARENT_ENGAGEMENT = "parent_engagement",
  RESPONSE_TIME = "response_time",
}

export enum TrendDirection {
  IMPROVING = "improving",
  STABLE = "stable",
  DECLINING = "declining",
  VOLATILE = "volatile",
  NO_DATA = "no_data",
}

export enum ComparisonType {
  YEAR_OVER_YEAR = "year_over_year",
  QUARTER_OVER_QUARTER = "quarter_over_quarter",
  MONTH_OVER_MONTH = "month_over_month",
  WEEK_OVER_WEEK = "week_over_week",
  SCHOOL_AVERAGE = "school_average",
  REGIONAL_AVERAGE = "regional_average",
  NATIONAL_AVERAGE = "national_average",
}

export enum ForecastMethod {
  LINEAR_REGRESSION = "linear_regression",
  MOVING_AVERAGE = "moving_average",
  EXPONENTIAL_SMOOTHING = "exponential_smoothing",
  SEASONAL_DECOMPOSITION = "seasonal_decomposition",
  MACHINE_LEARNING = "machine_learning",
  ENSEMBLE = "ensemble",
}

export enum AnomalyType {
  SPIKE = "spike",
  DROP = "drop",
  PATTERN_BREAK = "pattern_break",
  SEASONAL_OUTLIER = "seasonal_outlier",
  CLUSTER_OUTLIER = "cluster_outlier",
}

export enum CohortType {
  GRADE_LEVEL = "grade_level",
  AGE_GROUP = "age_group",
  GENDER = "gender",
  CLASS = "class",
  HOUSE = "house",
  DEPARTMENT = "department",
  RISK_LEVEL = "risk_level",
}

export enum GeographicLevel {
  CLASSROOM = "classroom",
  BUILDING = "building",
  CAMPUS = "campus",
  DISTRICT = "district",
  REGION = "region",
  COUNTRY = "country",
}

export enum ReportFrequency {
  REAL_TIME = "real_time",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  ANNUAL = "annual",
}

export enum DataVisualizationType {
  BAR_CHART = "bar_chart",
  LINE_CHART = "line_chart",
  PIE_CHART = "pie_chart",
  HEATMAP = "heatmap",
  SCATTER_PLOT = "scatter_plot",
  TABLE = "table",
}

export interface SchoolHealthDashboard {
  id: string;
  school_id: string;
  school_name: string;
  period_start: string;
  period_end: string;
  overall_health_score: number;
  total_students: number;
  students_with_health_profiles: number;
  active_health_alerts: number;
  pending_screenings: number;
  upcoming_appointments: number;
  vaccination_coverage: number;
  nutrition_status_distribution: Record<string, number>;
  fitness_level_distribution: Record<string, number>;
  dental_status_distribution: Record<string, number>;
  vision_status_distribution: Record<string, number>;
  health_trend: TrendDirection;
  kpis: HealthKPI[];
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface WellbeingDashboard {
  id: string;
  school_id: string;
  school_name: string;
  period_start: string;
  period_end: string;
  overall_wellbeing_score: number;
  total_assessments: number;
  wellbeing_distribution: Record<string, number>;
  dimension_scores: Record<string, number>;
  high_risk_students: number;
  medium_risk_students: number;
  low_risk_students: number;
  active_support_plans: number;
  counseling_sessions_completed: number;
  referral_count: number;
  wellbeing_trend: TrendDirection;
  kpis: WellbeingKPI[];
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface SafeguardingDashboard {
  id: string;
  school_id: string;
  school_name: string;
  period_start: string;
  period_end: string;
  total_cases: number;
  open_cases: number;
  closed_cases: number;
  escalated_cases: number;
  cases_by_severity: Record<string, number>;
  cases_by_type: Record<string, number>;
  average_resolution_days: number;
  mandatory_reports_submitted: number;
  pending_investigations: number;
  training_compliance: number;
  safeguarding_trend: TrendDirection;
  kpis: SafeguardingKPI[];
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface BullyingDashboard {
  id: string;
  school_id: string;
  school_name: string;
  period_start: string;
  period_end: string;
  total_reports: number;
  confirmed_incidents: number;
  unconfirmed_reports: number;
  false_reports: number;
  reports_by_type: Record<string, number>;
  reports_by_severity: Record<string, number>;
  reports_by_source: Record<string, number>;
  average_investigation_days: number;
  resolution_rate: number;
  repeat_offender_rate: number;
  victim_support_rate: number;
  bullying_trend: TrendDirection;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface IncidentDashboard {
  id: string;
  school_id: string;
  school_name: string;
  period_start: string;
  period_end: string;
  total_incidents: number;
  incidents_by_type: Record<string, number>;
  incidents_by_severity: Record<string, number>;
  average_response_time: number;
  evacuation_count: number;
  emergency_service_calls: number;
  post_incident_reviews_completed: number;
  lessons_learned_count: number;
  incident_trend: TrendDirection;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface SafetyDashboard {
  id: string;
  school_id: string;
  school_name: string;
  period_start: string;
  period_end: string;
  overall_safety_score: number;
  compliance_score: number;
  inspections_completed: number;
  pending_inspections: number;
  violations_found: number;
  violations_resolved: number;
  security_alerts: number;
  false_alarms: number;
  safety_trend: TrendDirection;
  kpis: SafetyKPI[];
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface InclusionDashboard {
  id: string;
  school_id: string;
  school_name: string;
  period_start: string;
  period_end: string;
  students_with_plans: number;
  accommodation_usage: Record<string, number>;
  support_service_enrollment: Record<string, number>;
  academic_progress: number;
  attendance_rate: number;
  graduation_rate: number;
  parent_satisfaction: number;
  staff_satisfaction: number;
  inclusion_trend: TrendDirection;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface RegionalHealthDashboard {
  id: string;
  region_id: string;
  region_name: string;
  period_start: string;
  period_end: string;
  total_schools: number;
  average_health_score: number;
  average_wellbeing_score: number;
  total_safeguarding_cases: number;
  total_bullying_reports: number;
  total_incidents: number;
  safety_compliance_average: number;
  regional_trends: TrendDirection;
  top_performing_schools: string[];
  schools_needing_support: string[];
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface NationalHealthDashboard {
  id: string;
  country_id: string;
  country_name: string;
  period_start: string;
  period_end: string;
  total_regions: number;
  total_schools: number;
  national_health_score: number;
  national_wellbeing_score: number;
  national_safety_score: number;
  total_safeguarding_cases: number;
  total_bullying_reports: number;
  national_trends: TrendDirection;
  policy_compliance_rate: number;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface InternationalWellbeingDashboard {
  id: string;
  organization_name: string;
  report_period: string;
  countries_participating: number;
  total_schools: number;
  global_wellbeing_index: number;
  regional_comparisons: Record<string, number>;
  best_practices: string[];
  global_trends: TrendDirection;
  sdg_alignment: Record<string, number>;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface HealthKPI {
  id: string;
  dashboard_id: string;
  kpi_name: string;
  kpi_type: KPIType;
  current_value: number;
  target_value: number;
  unit: string;
  trend: TrendDirection;
  change_percentage: number;
  period_comparison: ComparisonType;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface WellbeingKPI {
  id: string;
  dashboard_id: string;
  kpi_name: string;
  kpi_type: KPIType;
  current_value: number;
  target_value: number;
  dimension: string;
  trend: TrendDirection;
  change_percentage: number;
  period_comparison: ComparisonType;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SafeguardingKPI {
  id: string;
  dashboard_id: string;
  kpi_name: string;
  kpi_type: KPIType;
  current_value: number;
  target_value: number;
  trend: TrendDirection;
  change_percentage: number;
  period_comparison: ComparisonType;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SafetyKPI {
  id: string;
  dashboard_id: string;
  kpi_name: string;
  kpi_type: KPIType;
  current_value: number;
  target_value: number;
  unit: string;
  trend: TrendDirection;
  change_percentage: number;
  period_comparison: ComparisonType;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface HealthTrend {
  id: string;
  school_id: string;
  metric_name: string;
  period: string;
  value: number;
  previous_value: number;
  change_percentage: number;
  trend_direction: TrendDirection;
  data_points: Array<{
    date: string;
    value: number;
  }>;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface HealthForecast {
  id: string;
  school_id: string;
  metric_name: string;
  forecast_method: ForecastMethod;
  forecast_period: string;
  historical_data: number[];
  predicted_values: number[];
  confidence_intervals: Array<{
    lower: number;
    upper: number;
  }>;
  accuracy_score: number;
  assumptions: string[];
  recommendations: string[];
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface HealthAnomaly {
  id: string;
  school_id: string;
  anomaly_type: AnomalyType;
  metric_name: string;
  detected_date: string;
  expected_value: number;
  actual_value: number;
  deviation: number;
  severity: string;
  possible_causes: string[];
  investigation_status: string;
  resolution: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface HealthCohort {
  id: string;
  school_id: string;
  cohort_type: CohortType;
  cohort_name: string;
  student_count: number;
  health_metrics: Record<string, number>;
  wellbeing_metrics: Record<string, number>;
  risk_distribution: Record<string, number>;
  trend: TrendDirection;
  period: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface GeographicHealthAnalysis {
  id: string;
  geographic_level: GeographicLevel;
  region_name: string;
  total_schools: number;
  total_students: number;
  average_health_score: number;
  average_wellbeing_score: number;
  safety_compliance_rate: number;
  top_health_concerns: string[];
  resource_distribution: Record<string, number>;
  disparity_index: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface RiskHeatmap {
  id: string;
  school_id: string;
  heatmap_name: string;
  period: string;
  risk_categories: string[];
  zones: string[];
  risk_matrix: number[][];
  highest_risk_areas: string[];
  lowest_risk_areas: string[];
  recommendations: string[];
  generated_at: string;
  created_at: string;
  updated_at: string;
}
