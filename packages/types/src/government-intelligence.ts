// ─── Enums ───────────────────────────────────────────────────────────────────

export enum DashboardType {
  NATIONAL = "NATIONAL",
  MINISTRY = "MINISTRY",
  REGIONAL = "REGIONAL",
  POLICY = "POLICY",
  EXECUTIVE = "EXECUTIVE",
  OPERATIONAL = "OPERATIONAL",
  STRATEGIC = "STRATEGIC",
  TACTICAL = "TACTICAL",
}

export enum KPICategory {
  EDUCATION = "EDUCATION",
  FINANCE = "FINANCE",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  EMPLOYMENT = "EMPLOYMENT",
  HEALTH = "HEALTH",
  SAFETY = "SAFETY",
  SUSTAINABILITY = "SUSTAINABILITY",
  INNOVATION = "INNOVATION",
}

export enum KPIStatus {
  ON_TRACK = "ON_TRACK",
  AT_RISK = "AT_RISK",
  OFF_TRACK = "OFF_TRACK",
  CRITICAL = "CRITICAL",
  NOT_MEASURED = "NOT_MEASURED",
}

export enum TrendDirection {
  IMPROVING = "IMPROVING",
  STABLE = "STABLE",
  DECLINING = "DECLINING",
  VOLATILE = "VOLATILE",
  SEASONAL = "SEASONAL",
}

export enum AlertLevel {
  INFO = "INFO",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
  EMERGENCY = "EMERGENCY",
}

export enum DecisionType {
  STRATEGIC = "STRATEGIC",
  TACTICAL = "TACTICAL",
  OPERATIONAL = "OPERATIONAL",
  FINANCIAL = "FINANCIAL",
  PERSONNEL = "PERSONNEL",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  POLICY = "POLICY",
}

export enum DecisionStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  IMPLEMENTING = "IMPLEMENTING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum ScenarioType {
  BASELINE = "BASELINE",
  OPTIMISTIC = "OPTIMISTIC",
  PESSIMISTIC = "PESSIMISTIC",
  STRESS = "STRESS",
  DISASTER = "DISASTER",
  RECOVERY = "RECOVERY",
}

export enum ScenarioStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
}

export enum WhatIfType {
  BUDGET = "BUDGET",
  ENROLLMENT = "ENROLLMENT",
  STAFFING = "STAFFING",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  POLICY = "POLICY",
  REGULATION = "REGULATION",
}

export enum ReportType {
  EXECUTIVE_SUMMARY = "EXECUTIVE_SUMMARY",
  DETAILED = "DETAILED",
  ANALYTICS = "ANALYTICS",
  FORECAST = "FORECAST",
  COMPARISON = "COMPARISON",
  BENCHMARK = "BENCHMARK",
}

export enum ReportFormat {
  PDF = "PDF",
  EXCEL = "EXCEL",
  JSON = "JSON",
  HTML = "HTML",
  DASHBOARD = "DASHBOARD",
  API = "API",
  EMAIL = "EMAIL",
}

export enum HeatmapType {
  ENROLLMENT = "ENROLLMENT",
  PERFORMANCE = "PERFORMANCE",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  BUDGET = "BUDGET",
  SAFETY = "SAFETY",
  EMPLOYMENT = "EMPLOYMENT",
}

export enum ForecastModel {
  LINEAR = "LINEAR",
  POLYNOMIAL = "POLYNOMIAL",
  ARIMA = "ARIMA",
  PROPHET = "PROPHET",
  NEURAL_NETWORK = "NEURAL_NETWORK",
  ENSEMBLE = "ENSEMBLE",
}

export enum IntelligenceSource {
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL",
  SURVEY = "SURVEY",
  CENSUS = "CENSUS",
  RESEARCH = "RESEARCH",
  IoT = "IoT",
  AI = "AI",
}

export enum PolicyImpact {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
  NEUTRAL = "NEUTRAL",
  MIXED = "MIXED",
  UNKNOWN = "UNKNOWN",
}

export enum BudgetCategory {
  CAPITAL = "CAPITAL",
  OPERATIONAL = "OPERATIONAL",
  MAINTENANCE = "MAINTENANCE",
  EMERGENCY = "EMERGENCY",
  DEVELOPMENT = "DEVELOPMENT",
  RESEARCH = "RESEARCH",
  TRANSFER = "TRANSFER",
}

export enum TeacherMetricType {
  HEADCOUNT = "HEADCOUNT",
  RATIO = "RATIO",
  QUALIFICATION = "QUALIFICATION",
  SATISFACTION = "SATISFACTION",
  RETENTION = "RETENTION",
  PERFORMANCE = "PERFORMANCE",
}

export enum InfrastructureMetricType {
  BUILDINGS = "BUILDINGS",
  CLASSROOMS = "CLASSROOMS",
  LABORATORIES = "LABORATORIES",
  LIBRARIES = "LIBRARIES",
  SPORTS = "SPORTS",
  ICT = "ICT",
  ENERGY = "ENERGY",
  WATER = "WATER",
}

export enum StudentMetricType {
  ENROLLMENT = "ENROLLMENT",
  ATTENDANCE = "ATTENDANCE",
  PERFORMANCE = "PERFORMANCE",
  GRADUATION = "GRADUATION",
  EMPLOYMENT = "EMPLOYMENT",
  SATISFACTION = "SATISFACTION",
}

export enum EmploymentMetricType {
  PLACEMENT_RATE = "PLACEMENT_RATE",
  SALARY = "SALARY",
  SECTOR = "SECTOR",
  GEOGRAPHY = "GEOGRAPHY",
  SKILLS_MATCH = "SKILLS_MATCH",
  SATISFACTION = "SATISFACTION",
}

export enum RecommendationPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
  URGENT = "URGENT",
}

export enum RecommendationCategory {
  POLICY = "POLICY",
  BUDGET = "BUDGET",
  STAFFING = "STAFFING",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  PROGRAM = "PROGRAM",
  PARTNERSHIP = "PARTNERSHIP",
}

export enum RecommendationStatus {
  NEW = "NEW",
  REVIEWED = "REVIEWED",
  APPROVED = "APPROVED",
  IMPLEMENTING = "IMPLEMENTING",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
}

export enum CrisisType {
  NATURAL_DISASTER = "NATURAL_DISASTER",
  PANDEMIC = "PANDEMIC",
  SECURITY = "SECURITY",
  FINANCIAL = "FINANCIAL",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  REPUTATIONAL = "REPUTATIONAL",
  LEGAL = "LEGAL",
}

export enum CrisisLevel {
  LEVEL_1_MINOR = "LEVEL_1_MINOR",
  LEVEL_2_MODERATE = "LEVEL_2_MODERATE",
  LEVEL_3_SERIOUS = "LEVEL_3_SERIOUS",
  LEVEL_4_SEVERE = "LEVEL_4_SEVERE",
  LEVEL_5_EXTREME = "LEVEL_5_EXTREME",
}

export enum CrisisPhase {
  DETECTION = "DETECTION",
  RESPONSE = "RESPONSE",
  RECOVERY = "RECOVERY",
  MITIGATION = "MITIGATION",
  PREVENTION = "PREVENTION",
}

export enum WarRoomMode {
  MONITORING = "MONITORING",
  RESPONSE = "RESPONSE",
  ANALYSIS = "ANALYSIS",
  PLANNING = "PLANNING",
  BRIEFING = "BRIEFING",
}

export enum LiveMetricType {
  ENROLLMENT = "ENROLLMENT",
  ATTENDANCE = "ATTENDANCE",
  PERFORMANCE = "PERFORMANCE",
  BUDGET = "BUDGET",
  SAFETY = "SAFETY",
  ENERGY = "ENERGY",
  TRANSPORT = "TRANSPORT",
}

export enum StrategicGoal {
  QUALITY = "QUALITY",
  EQUITY = "EQUITY",
  EFFICIENCY = "EFFICIENCY",
  INNOVATION = "INNOVATION",
  SUSTAINABILITY = "SUSTAINABILITY",
  SAFETY = "SAFETY",
}

export enum NationalPriority {
  ACCESS = "ACCESS",
  QUALITY = "QUALITY",
  RELEVANCE = "RELEVANCE",
  EFFICIENCY = "EFFICIENCY",
  GOVERNANCE = "GOVERNANCE",
  INNOVATION = "INNOVATION",
}

export enum ComplianceArea {
  ACADEMIC = "ACADEMIC",
  FINANCIAL = "FINANCIAL",
  OPERATIONAL = "OPERATIONAL",
  SAFETY = "SAFETY",
  ENVIRONMENTAL = "ENVIRONMENTAL",
  LEGAL = "LEGAL",
}

export enum BenchmarkType {
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  HISTORICAL = "HISTORICAL",
  PEER = "PEER",
}

export enum DataSource {
  DATABASE = "DATABASE",
  API = "API",
  SURVEY = "SURVEY",
  IOT = "IOT",
  MANUAL = "MANUAL",
  EXTERNAL = "EXTERNAL",
  AI = "AI",
}

export enum VisualizationType {
  CHART = "CHART",
  MAP = "MAP",
  HEATMAP = "HEATMAP",
  TIMELINE = "TIMELINE",
  TABLE = "TABLE",
  CARD = "CARD",
  GAUGE = "GAUGE",
  TREEMAP = "TREEMAP",
}

export enum FilterType {
  DATE = "DATE",
  REGION = "REGION",
  SCHOOL_TYPE = "SCHOOL_TYPE",
  LEVEL = "LEVEL",
  GENDER = "GENDER",
  PROGRAM = "PROGRAM",
  STATUS = "STATUS",
}

export enum ExportType {
  PDF = "PDF",
  EXCEL = "EXCEL",
  CSV = "CSV",
  JSON = "JSON",
  API = "API",
  EMAIL = "EMAIL",
  PRINT = "PRINT",
}

export enum NotificationType {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  IN_APP = "IN_APP",
  WEBHOOK = "WEBHOOK",
  VOICE = "VOICE",
}

export enum ActionPriority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum ActionStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  OVERDUE = "OVERDUE",
}

export enum GovernanceLevel {
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  DISTRICT = "DISTRICT",
  SCHOOL = "SCHOOL",
  DEPARTMENT = "DEPARTMENT",
}

export enum ComplianceStatus {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  PARTIAL = "PARTIAL",
  UNDER_REVIEW = "UNDER_REVIEW",
  EXEMPT = "EXEMPT",
}

export enum AuditType {
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL",
  REGULATORY = "REGULATORY",
  FINANCIAL = "FINANCIAL",
  OPERATIONAL = "OPERATIONAL",
  SECURITY = "SECURITY",
}

export enum AuditStatus {
  PLANNED = "PLANNED",
  IN_PROGRESS = "IN_PROGRESS",
  FINDINGS = "FINDINGS",
  REPORT = "REPORT",
  FOLLOW_UP = "FOLLOW_UP",
  CLOSED = "CLOSED",
}

export enum RiskLevel {
  VERY_LOW = "VERY_LOW",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum RiskCategory {
  STRATEGIC = "STRATEGIC",
  OPERATIONAL = "OPERATIONAL",
  FINANCIAL = "FINANCIAL",
  COMPLIANCE = "COMPLIANCE",
  REPUTATIONAL = "REPUTATIONAL",
  TECHNOLOGICAL = "TECHNOLOGICAL",
}

export enum ImpactArea {
  STUDENTS = "STUDENTS",
  TEACHERS = "TEACHERS",
  STAFF = "STAFF",
  PARENTS = "PARENTS",
  COMMUNITY = "COMMUNITY",
  GOVERNMENT = "GOVERNMENT",
  PARTNERS = "PARTNERS",
}

export enum ROIType {
  FINANCIAL = "FINANCIAL",
  SOCIAL = "SOCIAL",
  EDUCATIONAL = "EDUCATIONAL",
  ENVIRONMENTAL = "ENVIRONMENTAL",
  STRATEGIC = "STRATEGIC",
}

export enum StakeholderType {
  GOVERNMENT = "GOVERNMENT",
  MINISTRY = "MINISTRY",
  SCHOOL = "SCHOOL",
  PARENT = "PARENT",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  EMPLOYER = "EMPLOYER",
  NGO = "NGO",
  INTERNATIONAL = "INTERNATIONAL",
}

export enum CommunicationChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  VOICE = "VOICE",
  VIDEO = "VIDEO",
  IN_PERSON = "IN_PERSON",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
}

export enum DataRefreshFrequency {
  REALTIME = "REALTIME",
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
}

// ─── Base Types ──────────────────────────────────────────────────────────────

export interface Base {
  id: string;
  school_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  region: string;
  district: string;
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface MetricValue {
  current: number;
  previous: number;
  target: number;
  unit: string;
  change_percent: number;
  change_direction: TrendDirection;
}

// ─── Dashboard Interfaces ────────────────────────────────────────────────────

export interface NationalDashboard {
  id: string;
  school_id: string;
  type: DashboardType.NATIONAL;
  total_schools: number;
  total_students: number;
  total_teachers: number;
  national_budget: number;
  kpis: NationalKPI[];
  alerts: GovernmentAlert[];
  strategic_goals: StrategicGoal[];
  national_priorities: NationalPriority[];
  last_updated: string;
  refresh_frequency: DataRefreshFrequency;
  created_at: string;
  updated_at: string;
}

export interface MinistryDashboard {
  id: string;
  school_id: string;
  type: DashboardType.MINISTRY;
  ministry_name: string;
  minister_name: string;
  portfolio: string;
  total_schools: number;
  total_students: number;
  total_teachers: number;
  budget_allocated: number;
  budget_spent: number;
  kpis: NationalKPI[];
  policies: NationalPolicy[];
  alerts: GovernmentAlert[];
  reports: ExecutiveReport[];
  created_at: string;
  updated_at: string;
}

export interface RegionalDashboard {
  id: string;
  school_id: string;
  type: DashboardType.REGIONAL;
  region: string;
  region_code: string;
  governor: string;
  total_districts: number;
  total_schools: number;
  total_students: number;
  total_teachers: number;
  regional_budget: number;
  kpis: RegionalKPI[];
  districts: string[];
  heatmaps: RegionalHeatmap[];
  alerts: GovernmentAlert[];
  created_at: string;
  updated_at: string;
}

export interface PolicyDashboard {
  id: string;
  school_id: string;
  type: DashboardType.POLICY;
  active_policies: number;
  pending_policies: number;
  expired_policies: number;
  total_impact_score: number;
  policies: NationalPolicy[];
  analyses: PolicyAnalysis[];
  recommendations: AIRecommendation[];
  compliance_overview: ComplianceReport[];
  created_at: string;
  updated_at: string;
}

export interface ExecutiveDashboard {
  id: string;
  school_id: string;
  type: DashboardType.EXECUTIVE;
  executive_name: string;
  role: string;
  widgets: ExecutiveWidget[];
  filters: ExecutiveFilter[];
  alerts: GovernmentAlert[];
  decisions: DecisionRecommendation[];
  insights: AIInsight[];
  last_refreshed: string;
  created_at: string;
  updated_at: string;
}

// ─── KPI Interfaces ─────────────────────────────────────────────────────────

export interface NationalKPI {
  id: string;
  school_id: string;
  name: string;
  category: KPICategory;
  status: KPIStatus;
  trend: TrendDirection;
  metric: MetricValue;
  national_target: number;
  national_average: number;
  regions_above_target: number;
  regions_below_target: number;
  last_measured: string;
  data_source: DataSource;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface RegionalKPI {
  id: string;
  school_id: string;
  region: string;
  name: string;
  category: KPICategory;
  status: KPIStatus;
  trend: TrendDirection;
  metric: MetricValue;
  national_ranking: number;
  regional_ranking: number;
  districts_above_target: number;
  districts_below_target: number;
  last_measured: string;
  data_source: DataSource;
  created_at: string;
  updated_at: string;
}

export interface DistrictKPI {
  id: string;
  school_id: string;
  district: string;
  region: string;
  name: string;
  category: KPICategory;
  status: KPIStatus;
  trend: TrendDirection;
  metric: MetricValue;
  district_ranking: number;
  schools_above_target: number;
  schools_below_target: number;
  last_measured: string;
  data_source: DataSource;
  created_at: string;
  updated_at: string;
}

export interface SchoolKPI {
  id: string;
  school_id: string;
  school_name: string;
  district: string;
  region: string;
  name: string;
  category: KPICategory;
  status: KPIStatus;
  trend: TrendDirection;
  metric: MetricValue;
  school_ranking: number;
  district_ranking: number;
  last_measured: string;
  data_source: DataSource;
  created_at: string;
  updated_at: string;
}

// ─── Budget Intelligence Interfaces ──────────────────────────────────────────

export interface BudgetIntelligence {
  id: string;
  school_id: string;
  fiscal_year: number;
  total_budget: number;
  total_spent: number;
  total_remaining: number;
  utilization_rate: number;
  allocations: BudgetAllocation[];
  forecasts: BudgetForecast[];
  optimizations: BudgetOptimization[];
  alerts: GovernmentAlert[];
  created_at: string;
  updated_at: string;
}

export interface BudgetAllocation {
  id: string;
  school_id: string;
  budget_intelligence_id: string;
  category: BudgetCategory;
  amount: number;
  spent: number;
  remaining: number;
  utilization_rate: number;
  region: string;
  district?: string;
  school_name?: string;
  fiscal_quarter: number;
  approved_by: string;
  approved_at: string;
  status: DecisionStatus;
  created_at: string;
  updated_at: string;
}

export interface BudgetForecast {
  id: string;
  school_id: string;
  budget_intelligence_id: string;
  category: BudgetCategory;
  forecast_model: ForecastModel;
  predicted_amount: number;
  confidence_interval: [number, number];
  forecast_period: TimeRange;
  accuracy_score: number;
  factors: string[];
  scenario_type: ScenarioType;
  created_at: string;
  updated_at: string;
}

export interface BudgetOptimization {
  id: string;
  school_id: string;
  budget_intelligence_id: string;
  current_allocation: number;
  recommended_allocation: number;
  potential_savings: number;
  impact_score: number;
  category: BudgetCategory;
  recommendation: string;
  priority: RecommendationPriority;
  status: RecommendationStatus;
  created_at: string;
  updated_at: string;
}

// ─── Teacher Intelligence Interfaces ─────────────────────────────────────────

export interface TeacherIntelligence {
  id: string;
  school_id: string;
  total_teachers: number;
  qualified_teachers: number;
  student_teacher_ratio: number;
  average_salary: number;
  retention_rate: number;
  satisfaction_score: number;
  distributions: TeacherDistribution[];
  forecasts: TeacherForecast[];
  optimizations: TeacherOptimization[];
  created_at: string;
  updated_at: string;
}

export interface TeacherDistribution {
  id: string;
  school_id: string;
  teacher_intelligence_id: string;
  metric_type: TeacherMetricType;
  region: string;
  district?: string;
  school_name?: string;
  total_count: number;
  qualified_count: number;
  average_experience: number;
  gender_ratio: { male: number; female: number };
  qualification_distribution: Record<string, number>;
  created_at: string;
  updated_at: string;
}

export interface TeacherForecast {
  id: string;
  school_id: string;
  teacher_intelligence_id: string;
  metric_type: TeacherMetricType;
  forecast_model: ForecastModel;
  predicted_value: number;
  confidence_interval: [number, number];
  forecast_period: TimeRange;
  accuracy_score: number;
  factors: string[];
  created_at: string;
  updated_at: string;
}

export interface TeacherOptimization {
  id: string;
  school_id: string;
  teacher_intelligence_id: string;
  metric_type: TeacherMetricType;
  current_value: number;
  recommended_value: number;
  impact_score: number;
  region: string;
  district?: string;
  recommendation: string;
  priority: RecommendationPriority;
  status: RecommendationStatus;
  created_at: string;
  updated_at: string;
}

// ─── Infrastructure Intelligence Interfaces ──────────────────────────────────

export interface InfrastructureIntelligence {
  id: string;
  school_id: string;
  total_buildings: number;
  total_classrooms: number;
  total_labs: number;
  total_libraries: number;
  total_sports_facilities: number;
  ict_infrastructure_score: number;
  energy_score: number;
  water_score: number;
  overall_condition_score: number;
  maps: InfrastructureMap[];
  forecasts: InfrastructureForecast[];
  alerts: GovernmentAlert[];
  created_at: string;
  updated_at: string;
}

export interface InfrastructureMap {
  id: string;
  school_id: string;
  infrastructure_intelligence_id: string;
  heatmap_type: HeatmapType;
  region: string;
  district: string;
  school_name: string;
  location: GeoLocation;
  buildings: number;
  classrooms: number;
  labs: number;
  condition_score: number;
  needs_renovation: boolean;
  capacity: number;
  utilization_rate: number;
  created_at: string;
  updated_at: string;
}

export interface InfrastructureForecast {
  id: string;
  school_id: string;
  infrastructure_intelligence_id: string;
  metric_type: InfrastructureMetricType;
  forecast_model: ForecastModel;
  predicted_value: number;
  confidence_interval: [number, number];
  forecast_period: TimeRange;
  investment_required: number;
  priority: RecommendationPriority;
  factors: string[];
  created_at: string;
  updated_at: string;
}

// ─── Student Intelligence Interfaces ─────────────────────────────────────────

export interface StudentIntelligence {
  id: string;
  school_id: string;
  total_enrolled: number;
  total_attending: number;
  attendance_rate: number;
  graduation_rate: number;
  employment_rate: number;
  satisfaction_score: number;
  distributions: StudentDistribution[];
  forecasts: StudentForecast[];
  outcomes: StudentOutcome[];
  created_at: string;
  updated_at: string;
}

export interface StudentDistribution {
  id: string;
  school_id: string;
  student_intelligence_id: string;
  metric_type: StudentMetricType;
  region: string;
  district?: string;
  school_name?: string;
  total_count: number;
  gender_distribution: { male: number; female: number };
  age_distribution: Record<string, number>;
  level_distribution: Record<string, number>;
  created_at: string;
  updated_at: string;
}

export interface StudentForecast {
  id: string;
  school_id: string;
  student_intelligence_id: string;
  metric_type: StudentMetricType;
  forecast_model: ForecastModel;
  predicted_value: number;
  confidence_interval: [number, number];
  forecast_period: TimeRange;
  accuracy_score: number;
  factors: string[];
  scenario_type: ScenarioType;
  created_at: string;
  updated_at: string;
}

export interface StudentOutcome {
  id: string;
  school_id: string;
  student_intelligence_id: string;
  cohort_year: number;
  total_graduates: number;
  employed_count: number;
  employed_rate: number;
  higher_education_count: number;
  higher_education_rate: number;
  average_salary: number;
  top_sectors: string[];
  satisfaction_score: number;
  created_at: string;
  updated_at: string;
}

// ─── Employment Intelligence Interfaces ──────────────────────────────────────

export interface EmploymentIntelligence {
  id: string;
  school_id: string;
  total_graduates: number;
  total_employed: number;
  placement_rate: number;
  average_time_to_employment: number;
  average_salary: number;
  maps: EmploymentMap[];
  forecasts: EmploymentForecast[];
  trends: EmploymentTrend[];
  created_at: string;
  updated_at: string;
}

export interface EmploymentMap {
  id: string;
  school_id: string;
  employment_intelligence_id: string;
  metric_type: EmploymentMetricType;
  region: string;
  district: string;
  sector: string;
  graduates_count: number;
  employed_count: number;
  placement_rate: number;
  average_salary: number;
  skills_match_rate: number;
  satisfaction_score: number;
  created_at: string;
  updated_at: string;
}

export interface EmploymentForecast {
  id: string;
  school_id: string;
  employment_intelligence_id: string;
  metric_type: EmploymentMetricType;
  forecast_model: ForecastModel;
  predicted_value: number;
  confidence_interval: [number, number];
  forecast_period: TimeRange;
  accuracy_score: number;
  factors: string[];
  created_at: string;
  updated_at: string;
}

export interface EmploymentTrend {
  id: string;
  school_id: string;
  employment_intelligence_id: string;
  metric_type: EmploymentMetricType;
  period: string;
  value: number;
  change_percent: number;
  direction: TrendDirection;
  region: string;
  sector: string;
  created_at: string;
  updated_at: string;
}

// ─── AI Recommendation Interfaces ────────────────────────────────────────────

export interface AIRecommendation {
  id: string;
  school_id: string;
  title: string;
  description: string;
  category: RecommendationCategory;
  priority: RecommendationPriority;
  status: RecommendationStatus;
  confidence_score: number;
  impact_score: number;
  implementation_cost: number;
  expected_roi: number;
  implementation_timeline: TimeRange;
  data_sources: DataSource[];
  model_version: string;
  region?: string;
  district?: string;
  school_name?: string;
  created_at: string;
  updated_at: string;
}

export interface AIInsight {
  id: string;
  school_id: string;
  title: string;
  description: string;
  category: KPICategory;
  confidence_score: number;
  supporting_data: Record<string, unknown>;
  recommended_actions: string[];
  severity: AlertLevel;
  source: IntelligenceSource;
  model_version: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AIPrediction {
  id: string;
  school_id: string;
  metric_name: string;
  category: KPICategory;
  predicted_value: number;
  confidence_interval: [number, number];
  confidence_score: number;
  forecast_model: ForecastModel;
  prediction_horizon: number;
  input_features: string[];
  model_version: string;
  accuracy_score: number;
  created_at: string;
  updated_at: string;
}

export interface AIForecast {
  id: string;
  school_id: string;
  metric_name: string;
  category: KPICategory;
  historical_data: { period: string; value: number }[];
  forecasted_data: { period: string; value: number; lower_bound: number; upper_bound: number }[];
  forecast_model: ForecastModel;
  accuracy_score: number;
  model_version: string;
  factors: string[];
  created_at: string;
  updated_at: string;
}

// ─── Forecast Interfaces ─────────────────────────────────────────────────────

export interface NationalForecast {
  id: string;
  school_id: string;
  forecast_type: string;
  forecast_model: ForecastModel;
  period: TimeRange;
  metrics: { name: string; predicted_value: number; confidence_interval: [number, number] }[];
  accuracy_score: number;
  model_version: string;
  factors: string[];
  scenarios: ScenarioResult[];
  created_at: string;
  updated_at: string;
}

export interface RegionalForecast {
  id: string;
  school_id: string;
  region: string;
  forecast_type: string;
  forecast_model: ForecastModel;
  period: TimeRange;
  metrics: { name: string; predicted_value: number; confidence_interval: [number, number] }[];
  accuracy_score: number;
  model_version: string;
  national_comparison: { metric: string; national_average: number; regional_value: number }[];
  created_at: string;
  updated_at: string;
}

export interface SectorForecast {
  id: string;
  school_id: string;
  sector: string;
  forecast_model: ForecastModel;
  period: TimeRange;
  predicted_graduates: number;
  predicted_employment_rate: number;
  predicted_average_salary: number;
  demand_forecast: number;
  supply_forecast: number;
  gap_analysis: { skill: string; demand: number; supply: number; gap: number }[];
  created_at: string;
  updated_at: string;
}

// ─── War Room & Crisis Interfaces ────────────────────────────────────────────

export interface ExecutiveWarRoom {
  id: string;
  school_id: string;
  mode: WarRoomMode;
  active_crisis?: CrisisCenter;
  live_monitors: LiveMonitor[];
  alerts: GovernmentAlert[];
  active_participants: string[];
  decisions_pending: DecisionRecommendation[];
  last_updated: string;
  created_at: string;
  updated_at: string;
}

export interface CrisisCenter {
  id: string;
  school_id: string;
  crisis_type: CrisisType;
  crisis_level: CrisisLevel;
  current_phase: CrisisPhase;
  title: string;
  description: string;
  affected_areas: string[];
  affected_schools: number;
  affected_students: number;
  affected_teachers: number;
  response_team: string[];
  resources_deployed: string[];
  timeline: { timestamp: string; action: string; actor: string }[];
  status: DecisionStatus;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface LiveMonitor {
  id: string;
  school_id: string;
  metric_type: LiveMetricType;
  current_value: number;
  threshold_critical: number;
  threshold_warning: number;
  trend: TrendDirection;
  last_updated: string;
  is_alert: boolean;
  alert_message?: string;
  region?: string;
  district?: string;
  created_at: string;
  updated_at: string;
}

// ─── Strategic Interfaces ────────────────────────────────────────────────────

export interface StrategicKPI {
  id: string;
  school_id: string;
  goal: StrategicGoal;
  name: string;
  description: string;
  target_value: number;
  current_value: number;
  progress_percent: number;
  status: KPIStatus;
  trend: TrendDirection;
  deadline: string;
  responsible_party: string;
  national_priority: NationalPriority;
  created_at: string;
  updated_at: string;
}

export interface StrategicGoalEntity {
  id: string;
  school_id: string;
  goal: StrategicGoal;
  title: string;
  description: string;
  target_date: string;
  progress_percent: number;
  status: DecisionStatus;
  kpis: StrategicKPI[];
  responsible_ministry: string;
  budget_allocated: number;
  budget_spent: number;
  created_at: string;
  updated_at: string;
}

export interface StrategicPlan {
  id: string;
  school_id: string;
  title: string;
  description: string;
  vision: string;
  mission: string;
  start_date: string;
  end_date: string;
  goals: StrategicGoalEntity[];
  national_priorities: NationalPriority[];
  total_budget: number;
  status: DecisionStatus;
  approved_by: string;
  approved_at: string;
  created_at: string;
  updated_at: string;
}

export interface StrategicReport {
  id: string;
  school_id: string;
  plan_id: string;
  report_type: ReportType;
  period: TimeRange;
  overall_progress: number;
  goals_progress: { goal: StrategicGoal; progress: number; status: KPIStatus }[];
  achievements: string[];
  challenges: string[];
  recommendations: AIRecommendation[];
  created_at: string;
  updated_at: string;
}

// ─── Heatmap Interfaces ──────────────────────────────────────────────────────

export interface NationalHeatmap {
  id: string;
  school_id: string;
  heatmap_type: HeatmapType;
  period: TimeRange;
  regions: { region: string; value: number; rank: number; trend: TrendDirection }[];
  national_average: number;
  min_value: number;
  max_value: number;
  data_source: DataSource;
  created_at: string;
  updated_at: string;
}

export interface RegionalHeatmap {
  id: string;
  school_id: string;
  heatmap_type: HeatmapType;
  region: string;
  period: TimeRange;
  districts: { district: string; value: number; rank: number; trend: TrendDirection }[];
  regional_average: number;
  min_value: number;
  max_value: number;
  data_source: DataSource;
  created_at: string;
  updated_at: string;
}

export interface ComparativeHeatmap {
  id: string;
  school_id: string;
  heatmap_type: HeatmapType;
  compare_type: BenchmarkType;
  period: TimeRange;
  entities: { name: string; value: number; benchmark: number; difference: number }[];
  average_benchmark: number;
  data_source: DataSource;
  created_at: string;
  updated_at: string;
}

// ─── Scenario Interfaces ─────────────────────────────────────────────────────

export interface ScenarioBuilder {
  id: string;
  school_id: string;
  name: string;
  description: string;
  scenario_type: ScenarioType;
  status: ScenarioStatus;
  parameters: Record<string, number>;
  assumptions: string[];
  created_by: string;
  results?: ScenarioResult;
  comparisons: ScenarioComparison[];
  created_at: string;
  updated_at: string;
}

export interface ScenarioResult {
  id: string;
  school_id: string;
  scenario_builder_id: string;
  scenario_type: ScenarioType;
  metrics: { name: string; predicted_value: number; confidence_interval: [number, number] }[];
  overall_score: number;
  risk_score: number;
  opportunity_score: number;
  key_findings: string[];
  execution_time_ms: number;
  model_version: string;
  created_at: string;
  updated_at: string;
}

export interface ScenarioComparison {
  id: string;
  school_id: string;
  scenario_a_id: string;
  scenario_b_id: string;
  scenario_a_name: string;
  scenario_b_name: string;
  metrics_compared: { metric: string; value_a: number; value_b: number; difference: number }[];
  overall_winner: string;
  confidence_score: number;
  created_at: string;
  updated_at: string;
}

// ─── What-If Analysis Interfaces ─────────────────────────────────────────────

export interface WhatIfAnalysis {
  id: string;
  school_id: string;
  name: string;
  what_if_type: WhatIfType;
  description: string;
  parameters: Record<string, number>;
  baseline_values: Record<string, number>;
  status: ScenarioStatus;
  results?: WhatIfResult;
  recommendations: WhatIfRecommendation[];
  created_at: string;
  updated_at: string;
}

export interface WhatIfResult {
  id: string;
  school_id: string;
  what_if_analysis_id: string;
  what_if_type: WhatIfType;
  impact_metrics: { metric: string; baseline: number; projected: number; change_percent: number }[];
  overall_impact_score: number;
  risk_assessment: RiskAssessment;
  confidence_score: number;
  execution_time_ms: number;
  created_at: string;
  updated_at: string;
}

export interface WhatIfRecommendation {
  id: string;
  school_id: string;
  what_if_analysis_id: string;
  title: string;
  description: string;
  expected_impact: number;
  implementation_cost: number;
  timeline_months: number;
  priority: RecommendationPriority;
  status: RecommendationStatus;
  created_at: string;
  updated_at: string;
}

// ─── Decision Interfaces ─────────────────────────────────────────────────────

export interface DecisionRecommendation {
  id: string;
  school_id: string;
  title: string;
  description: string;
  decision_type: DecisionType;
  status: DecisionStatus;
  priority: ActionPriority;
  confidence_score: number;
  impact_areas: ImpactArea[];
  stakeholders: StakeholderType[];
  estimated_cost: number;
  expected_benefits: string[];
  risks: RiskAssessment[];
  supporting_insights: AIInsight[];
  recommended_by: string;
  decided_by?: string;
  decided_at?: string;
  implementation_deadline: string;
  created_at: string;
  updated_at: string;
}

export interface DecisionImpact {
  id: string;
  school_id: string;
  decision_id: string;
  impact_area: ImpactArea;
  expected_impact: number;
  actual_impact?: number;
  impact_description: string;
  measurement_method: string;
  measurement_date: string;
  before_value: number;
  after_value?: number;
  created_at: string;
  updated_at: string;
}

export interface DecisionHistory {
  id: string;
  school_id: string;
  decision_type: DecisionType;
  title: string;
  description: string;
  status: DecisionStatus;
  decided_by: string;
  decided_at: string;
  outcome: string;
  impact_score: number;
  lessons_learned: string[];
  created_at: string;
  updated_at: string;
}

// ─── Report Interfaces ───────────────────────────────────────────────────────

export interface ExecutiveReport {
  id: string;
  school_id: string;
  title: string;
  report_type: ReportType;
  format: ReportFormat;
  period: TimeRange;
  executive_summary: string;
  key_findings: string[];
  recommendations: AIRecommendation[];
  data_sources: DataSource[];
  generated_by: string;
  approved_by?: string;
  file_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ExecutiveSummary {
  id: string;
  school_id: string;
  report_id: string;
  period: TimeRange;
  headline_metrics: { name: string; value: number; trend: TrendDirection }[];
  highlights: string[];
  concerns: string[];
  action_items: { action: string; priority: ActionPriority; owner: string; deadline: string }[];
  overall_health_score: number;
  created_at: string;
  updated_at: string;
}

export interface ExecutiveBrief {
  id: string;
  school_id: string;
  title: string;
  briefing_type: string;
  date: string;
  presenter: string;
  audience: StakeholderType[];
  sections: { title: string; content: string; charts: string[] }[];
  key_decisions_needed: DecisionRecommendation[];
  follow_up_actions: string[];
  created_at: string;
  updated_at: string;
}

// ─── AI Decision Support Interfaces ──────────────────────────────────────────

export interface AIDecisionSupport {
  id: string;
  school_id: string;
  decision_context: string;
  data_inputs: DataSource[];
  model_used: string;
  model_version: string;
  confidence_score: number;
  recommendations: AIRecommendation[];
  insights: AIInsight[];
  predictions: AIPrediction[];
  alternative_options: { option: string; pros: string[]; cons: string[]; score: number }[];
  execution_time_ms: number;
  created_at: string;
  updated_at: string;
}

// ─── Policy Interfaces ───────────────────────────────────────────────────────

export interface PolicyAnalysis {
  id: string;
  school_id: string;
  policy_id: string;
  policy_name: string;
  impact_assessment: PolicyImpact;
  affected_areas: ImpactArea[];
  cost_benefit_analysis: { costs: number; benefits: number; net_benefit: number; roi: number };
  stakeholder_impact: { stakeholder: StakeholderType; impact: string; sentiment: PolicyImpact }[];
  implementation_feasibility: number;
  risk_assessment: RiskAssessment;
  recommendations: string[];
  created_at: string;
  updated_at: string;
}

export interface PolicyImpactEntity {
  id: string;
  school_id: string;
  policy_id: string;
  impact_type: PolicyImpact;
  affected_region: string;
  affected_district?: string;
  affected_schools: number;
  affected_students: number;
  affected_teachers: number;
  impact_score: number;
  measurement_date: string;
  description: string;
  evidence: string[];
  created_at: string;
  updated_at: string;
}

export interface PolicyRecommendation {
  id: string;
  school_id: string;
  title: string;
  description: string;
  policy_area: ComplianceArea;
  current_status: ComplianceStatus;
  recommended_action: string;
  expected_impact: PolicyImpact;
  implementation_cost: number;
  timeline_months: number;
  priority: RecommendationPriority;
  status: RecommendationStatus;
  supporting_data: DataSource[];
  created_at: string;
  updated_at: string;
}

export interface NationalPolicy {
  id: string;
  school_id: string;
  title: string;
  description: string;
  ministry: string;
  effective_date: string;
  expiry_date?: string;
  compliance_area: ComplianceArea;
  status: DecisionStatus;
  impact_assessment?: PolicyAnalysis;
  affected_regions: string[];
  compliance_status: ComplianceStatus;
  created_at: string;
  updated_at: string;
}

export interface RegionalPolicy {
  id: string;
  school_id: string;
  region: string;
  title: string;
  description: string;
  implementing_body: string;
  effective_date: string;
  expiry_date?: string;
  compliance_area: ComplianceArea;
  status: DecisionStatus;
  compliance_status: ComplianceStatus;
  national_policy_id?: string;
  created_at: string;
  updated_at: string;
}

export interface DistrictPolicy {
  id: string;
  school_id: string;
  district: string;
  region: string;
  title: string;
  description: string;
  implementing_body: string;
  effective_date: string;
  expiry_date?: string;
  compliance_area: ComplianceArea;
  status: DecisionStatus;
  compliance_status: ComplianceStatus;
  regional_policy_id?: string;
  created_at: string;
  updated_at: string;
}

// ─── Government Alert Interfaces ─────────────────────────────────────────────

export interface GovernmentAlert {
  id: string;
  school_id: string;
  alert_level: AlertLevel;
  title: string;
  description: string;
  category: KPICategory;
  region?: string;
  district?: string;
  school_name?: string;
  affected_count: number;
  recommended_actions: string[];
  acknowledged_by?: string;
  acknowledged_at?: string;
  resolved: boolean;
  resolved_at?: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface GovernmentNotification {
  id: string;
  school_id: string;
  notification_type: NotificationType;
  title: string;
  message: string;
  sender: string;
  recipients: string[];
  channel: CommunicationChannel;
  priority: ActionPriority;
  read: boolean;
  read_at?: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface GovernmentBroadcast {
  id: string;
  school_id: string;
  title: string;
  message: string;
  broadcast_type: NotificationType;
  channel: CommunicationChannel;
  sender: string;
  sender_role: string;
  target_regions: string[];
  target_districts: string[];
  target_school_types: string[];
  priority: ActionPriority;
  scheduled_at?: string;
  sent_at?: string;
  recipient_count: number;
  read_count: number;
  created_at: string;
  updated_at: string;
}

// ─── Audit & Compliance Interfaces ───────────────────────────────────────────

export interface AuditTrail {
  id: string;
  school_id: string;
  audit_type: AuditType;
  entity_type: string;
  entity_id: string;
  action: string;
  actor_id: string;
  actor_name: string;
  old_values: Record<string, unknown>;
  new_values: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  timestamp: string;
  created_at: string;
  updated_at: string;
}

export interface AuditReport {
  id: string;
  school_id: string;
  audit_type: AuditType;
  audit_status: AuditStatus;
  title: string;
  scope: string;
  period: TimeRange;
  auditor: string;
  findings: { finding: string; severity: RiskLevel; recommendation: string; area: ComplianceArea }[];
  overall_score: number;
  compliance_score: number;
  risk_score: number;
  recommendations: string[];
  next_audit_date: string;
  created_at: string;
  updated_at: string;
}

export interface ComplianceReport {
  id: string;
  school_id: string;
  compliance_area: ComplianceArea;
  compliance_status: ComplianceStatus;
  score: number;
  total_requirements: number;
  met_requirements: number;
  partial_requirements: number;
  unmet_requirements: number;
  last_assessment: string;
  next_assessment: string;
  details: { requirement: string; status: ComplianceStatus; notes: string }[];
  created_at: string;
  updated_at: string;
}

export interface ComplianceAudit {
  id: string;
  school_id: string;
  compliance_area: ComplianceArea;
  audit_status: AuditStatus;
  auditor: string;
  scheduled_date: string;
  completed_date?: string;
  score?: number;
  findings: string[];
  corrective_actions: { action: string; deadline: string; status: ActionStatus; responsible: string }[];
  created_at: string;
  updated_at: string;
}

// ─── Risk Interfaces ─────────────────────────────────────────────────────────

export interface RiskAssessment {
  id: string;
  school_id: string;
  title: string;
  description: string;
  risk_category: RiskCategory;
  risk_level: RiskLevel;
  probability: number;
  impact: number;
  risk_score: number;
  affected_areas: ImpactArea[];
  mitigation_strategies: RiskMitigation[];
  owner: string;
  review_date: string;
  status: DecisionStatus;
  created_at: string;
  updated_at: string;
}

export interface RiskMitigation {
  id: string;
  school_id: string;
  risk_assessment_id: string;
  strategy: string;
  description: string;
  implementation_cost: number;
  effectiveness_score: number;
  responsible_party: string;
  deadline: string;
  status: ActionStatus;
  progress_percent: number;
  created_at: string;
  updated_at: string;
}

export interface RiskMonitor {
  id: string;
  school_id: string;
  risk_category: RiskCategory;
  monitored_risks: { risk: string; current_level: RiskLevel; trend: TrendDirection; last_checked: string }[];
  overall_risk_score: number;
  alerts: GovernmentAlert[];
  refresh_frequency: DataRefreshFrequency;
  last_updated: string;
  created_at: string;
  updated_at: string;
}

// ─── Stakeholder Interfaces ──────────────────────────────────────────────────

export interface StakeholderMap {
  id: string;
  school_id: string;
  stakeholders: StakeholderAnalysis[];
  engagement_strategies: StakeholderEngagement[];
  power_interest_matrix: { stakeholder: StakeholderType; power: number; interest: number; position: string }[];
  created_at: string;
  updated_at: string;
}

export interface StakeholderAnalysis {
  id: string;
  school_id: string;
  stakeholder_type: StakeholderType;
  name: string;
  role: string;
  influence_level: number;
  interest_level: number;
  sentiment: PolicyImpact;
  engagement_frequency: CommunicationChannel[];
  key_concerns: string[];
  expectations: string[];
  communication_preferences: CommunicationChannel[];
  created_at: string;
  updated_at: string;
}

export interface StakeholderEngagement {
  id: string;
  school_id: string;
  stakeholder_type: StakeholderType;
  engagement_type: string;
  description: string;
  date: string;
  participants: string[];
  outcomes: string[];
  follow_up_actions: string[];
  satisfaction_score: number;
  channel: CommunicationChannel;
  created_at: string;
  updated_at: string;
}

// ─── Performance Interfaces ──────────────────────────────────────────────────

export interface PerformanceBenchmark {
  id: string;
  school_id: string;
  benchmark_type: BenchmarkType;
  metric_name: string;
  category: KPICategory;
  entity_name: string;
  entity_type: string;
  value: number;
  benchmark_value: number;
  difference: number;
  percentile: number;
  ranking: number;
  period: TimeRange;
  data_source: DataSource;
  created_at: string;
  updated_at: string;
}

export interface PerformanceComparison {
  id: string;
  school_id: string;
  compare_type: BenchmarkType;
  metric_name: string;
  category: KPICategory;
  entities: { name: string; value: number; rank: number; trend: TrendDirection }[];
  average: number;
  median: number;
  standard_deviation: number;
  period: TimeRange;
  created_at: string;
  updated_at: string;
}

export interface PerformanceTrend {
  id: string;
  school_id: string;
  metric_name: string;
  category: KPICategory;
  entity_name: string;
  entity_type: string;
  data_points: { period: string; value: number }[];
  trend_direction: TrendDirection;
  trend_strength: number;
  seasonality_detected: boolean;
  forecast_next_period: number;
  created_at: string;
  updated_at: string;
}

// ─── Analytics Interfaces ────────────────────────────────────────────────────

export interface PredictiveAnalytics {
  id: string;
  school_id: string;
  model_name: string;
  forecast_model: ForecastModel;
  category: KPICategory;
  input_features: string[];
  predictions: PredictiveResult[];
  model_accuracy: number;
  model_version: string;
  last_trained: string;
  next_training: string;
  created_at: string;
  updated_at: string;
}

export interface PredictiveModel {
  id: string;
  school_id: string;
  model_name: string;
  forecast_model: ForecastModel;
  category: KPICategory;
  training_data_size: number;
  features_used: string[];
  accuracy_score: number;
  precision_score: number;
  recall_score: number;
  f1_score: number;
  last_trained: string;
  training_status: DecisionStatus;
  version: string;
  created_at: string;
  updated_at: string;
}

export interface PredictiveResult {
  id: string;
  school_id: string;
  model_id: string;
  metric_name: string;
  predicted_value: number;
  confidence_interval: [number, number];
  confidence_score: number;
  prediction_date: string;
  actual_value?: number;
  error_percent?: number;
  created_at: string;
  updated_at: string;
}

export interface PrescriptiveAnalytics {
  id: string;
  school_id: string;
  category: KPICategory;
  current_state: Record<string, number>;
  recommendations: PrescriptiveRecommendation[];
  optimization_score: number;
  constraints: string[];
  objective_function: string;
  model_version: string;
  created_at: string;
  updated_at: string;
}

export interface PrescriptiveRecommendation {
  id: string;
  school_id: string;
  prescriptive_analytics_id: string;
  action: string;
  description: string;
  expected_outcome: number;
  confidence_score: number;
  implementation_cost: number;
  timeline_weeks: number;
  priority: RecommendationPriority;
  dependencies: string[];
  created_at: string;
  updated_at: string;
}

export interface CognitiveAnalytics {
  id: string;
  school_id: string;
  analysis_type: string;
  data_inputs: DataSource[];
  patterns: CognitivePattern[];
  insights: CognitiveInsight[];
  confidence_score: number;
  model_version: string;
  created_at: string;
  updated_at: string;
}

export interface CognitiveInsight {
  id: string;
  school_id: string;
  cognitive_analytics_id: string;
  insight: string;
  description: string;
  category: KPICategory;
  confidence_score: number;
  supporting_evidence: string[];
  recommended_actions: string[];
  severity: AlertLevel;
  created_at: string;
  updated_at: string;
}

export interface CognitivePattern {
  id: string;
  school_id: string;
  cognitive_analytics_id: string;
  pattern_name: string;
  description: string;
  frequency: number;
  strength: number;
  category: KPICategory;
  entities: string[];
  first_detected: string;
  last_detected: string;
  created_at: string;
  updated_at: string;
}

// ─── Real-Time Metric Interfaces ─────────────────────────────────────────────

export interface RealTimeMetric {
  id: string;
  school_id: string;
  metric_type: LiveMetricType;
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  trend: TrendDirection;
  change_percent: number;
  threshold_warning?: number;
  threshold_critical?: number;
  is_alert: boolean;
  region?: string;
  district?: string;
  created_at: string;
  updated_at: string;
}

export interface MetricAlert {
  id: string;
  school_id: string;
  metric_type: LiveMetricType;
  metric_name: string;
  current_value: number;
  threshold_value: number;
  alert_level: AlertLevel;
  alert_message: string;
  region?: string;
  district?: string;
  acknowledged: boolean;
  acknowledged_by?: string;
  acknowledged_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MetricTrend {
  id: string;
  school_id: string;
  metric_type: LiveMetricType;
  metric_name: string;
  data_points: { timestamp: string; value: number }[];
  trend_direction: TrendDirection;
  trend_strength: number;
  period: TimeRange;
  created_at: string;
  updated_at: string;
}

export interface MetricForecast {
  id: string;
  school_id: string;
  metric_type: LiveMetricType;
  metric_name: string;
  forecast_model: ForecastModel;
  historical_data: { timestamp: string; value: number }[];
  forecasted_data: { timestamp: string; value: number; lower_bound: number; upper_bound: number }[];
  accuracy_score: number;
  created_at: string;
  updated_at: string;
}

// ─── Executive Widget Interfaces ─────────────────────────────────────────────

export interface ExecutiveWidget {
  id: string;
  school_id: string;
  dashboard_id: string;
  widget_type: VisualizationType;
  title: string;
  data_source: DataSource;
  metric_name: string;
  category: KPICategory;
  position: { x: number; y: number; width: number; height: number };
  refresh_frequency: DataRefreshFrequency;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ExecutiveFilter {
  id: string;
  school_id: string;
  dashboard_id: string;
  filter_type: FilterType;
  label: string;
  options: { value: string; label: string }[];
  default_value: string;
  is_required: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Government Report Interfaces ────────────────────────────────────────────

export interface GovernmentReport {
  id: string;
  school_id: string;
  title: string;
  report_type: ReportType;
  format: ReportFormat;
  period: TimeRange;
  scope: GovernanceLevel;
  region?: string;
  district?: string;
  summary: string;
  key_metrics: { name: string; value: number; trend: TrendDirection }[];
  sections: { title: string; content: string; data: Record<string, unknown> }[];
  generated_by: string;
  approved_by?: string;
  distribution_list: string[];
  file_url?: string;
  created_at: string;
  updated_at: string;
}

export interface GovernmentAnalytics {
  id: string;
  school_id: string;
  analytics_type: string;
  period: TimeRange;
  scope: GovernanceLevel;
  metrics: { name: string; value: number; benchmark: number; trend: TrendDirection }[];
  insights: AIInsight[];
  recommendations: AIRecommendation[];
  data_sources: DataSource[];
  model_version: string;
  created_at: string;
  updated_at: string;
}

export interface GovernmentInsight {
  id: string;
  school_id: string;
  title: string;
  description: string;
  category: KPICategory;
  scope: GovernanceLevel;
  confidence_score: number;
  impact_areas: ImpactArea[];
  supporting_data: Record<string, unknown>;
  recommended_actions: string[];
  source: IntelligenceSource;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

// ─── Education Strategy Interfaces ───────────────────────────────────────────

export interface EducationStrategy {
  id: string;
  school_id: string;
  title: string;
  description: string;
  vision: string;
  mission: string;
  strategic_goals: StrategicGoal[];
  national_priorities: NationalPriority[];
  target_date: string;
  budget_allocated: number;
  responsible_ministry: string;
  status: DecisionStatus;
  progress_percent: number;
  created_at: string;
  updated_at: string;
}

export interface EducationPlan {
  id: string;
  school_id: string;
  strategy_id: string;
  title: string;
  description: string;
  phase: string;
  start_date: string;
  end_date: string;
  objectives: string[];
  milestones: { milestone: string; target_date: string; status: ActionStatus }[];
  budget: number;
  responsible_party: string;
  status: DecisionStatus;
  created_at: string;
  updated_at: string;
}

export interface EducationProgram {
  id: string;
  school_id: string;
  plan_id: string;
  title: string;
  description: string;
  target_beneficiaries: string;
  start_date: string;
  end_date: string;
  budget: number;
  funding_source: string;
  objectives: string[];
  kpis: { metric: string; target: number; current: number; unit: string }[];
  status: DecisionStatus;
  created_at: string;
  updated_at: string;
}

// ─── Partnership Interfaces ──────────────────────────────────────────────────

export interface PartnershipMap {
  id: string;
  school_id: string;
  partners: StakeholderAnalysis[];
  partnership_types: Record<string, number>;
  total_partnerships: number;
  active_partnerships: number;
  total_investment: number;
  roi_overall: number;
  created_at: string;
  updated_at: string;
}

export interface PartnershipAnalysis {
  id: string;
  school_id: string;
  partner_name: string;
  partner_type: StakeholderType;
  partnership_type: string;
  start_date: string;
  end_date?: string;
  investment: number;
  return_on_investment: number;
  impact_areas: ImpactArea[];
  satisfaction_score: number;
  status: DecisionStatus;
  key_outcomes: string[];
  challenges: string[];
  created_at: string;
  updated_at: string;
}

export interface PartnershipMetric {
  id: string;
  school_id: string;
  partnership_id: string;
  metric_name: string;
  value: number;
  unit: string;
  target: number;
  period: TimeRange;
  trend: TrendDirection;
  created_at: string;
  updated_at: string;
}

// ─── Investment Interfaces ───────────────────────────────────────────────────

export interface InvestmentAnalysis {
  id: string;
  school_id: string;
  title: string;
  description: string;
  investment_type: ROIType;
  amount: number;
  expected_return: number;
  actual_return?: number;
  roi_percent: number;
  payback_period_months: number;
  risk_level: RiskLevel;
  risk_factors: string[];
  affected_areas: ImpactArea[];
  timeline: TimeRange;
  status: DecisionStatus;
  created_at: string;
  updated_at: string;
}

export interface InvestmentReturn {
  id: string;
  school_id: string;
  investment_id: string;
  period: TimeRange;
  expected_return: number;
  actual_return: number;
  variance: number;
  roi_percent: number;
  metrics: { name: string; expected: number; actual: number }[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface InvestmentRisk {
  id: string;
  school_id: string;
  investment_id: string;
  risk_category: RiskCategory;
  risk_description: string;
  probability: number;
  impact: number;
  risk_score: number;
  mitigation_strategy: string;
  current_status: ActionStatus;
  monitoring_frequency: DataRefreshFrequency;
  created_at: string;
  updated_at: string;
}
