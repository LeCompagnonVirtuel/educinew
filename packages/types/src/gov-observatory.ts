export enum IndicatorType {
  ENROLLMENT = 'enrollment',
  RETENTION = 'retention',
  GRADUATION = 'graduation',
  LITERACY = 'literacy',
  NUMERACY = 'numeracy',
  ATTENDANCE = 'attendance',
  INFRASTRUCTURE = 'infrastructure',
  TEACHER_RATIO = 'teacher_ratio',
  BUDGET_EXECUTION = 'budget_execution',
  GENDER_PARITY = 'gender_parity',
  DROPOUT = 'dropout',
  REPETITION = 'repetition',
  ASSESSMENT = 'assessment',
  QUALITY = 'quality',
  ACCESS = 'access',
  EQUITY = 'equity',
}

export enum IndicatorCategory {
  ACADEMIC = 'academic',
  FINANCIAL = 'financial',
  DEMOGRAPHIC = 'demographic',
  INFRASTRUCTURE = 'infrastructure',
  HUMAN_RESOURCES = 'human_resources',
  GOVERNANCE = 'governance',
  SOCIAL = 'social',
  ENVIRONMENTAL = 'environmental',
}

export enum MonitoringLevel {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  DEPARTMENTAL = 'departmental',
  DISTRICT = 'district',
  SCHOOL = 'school',
}

export enum MappingType {
  SCHOOL_DENSITY = 'school_density',
  ENROLLMENT_MAP = 'enrollment_map',
  INFRASTRUCTURE_MAP = 'infrastructure_map',
  TEACHER_DISTRIBUTION = 'teacher_distribution',
  PERFORMANCE_MAP = 'performance_map',
  ACCESS_MAP = 'access_map',
  POVERTY_MAP = 'poverty_map',
  GENDER_PARITY_MAP = 'gender_parity_map',
}

export enum PerformanceMetric {
  PASS_RATE = 'pass_rate',
  AVERAGE_SCORE = 'average_score',
  TOP_SCHOOL = 'top_school',
  BOTTOM_SCHOOL = 'bottom_school',
  IMPROVEMENT_RATE = 'improvement_rate',
  STANDARD_DEVIATION = 'standard_deviation',
  PERCENTILE = 'percentile',
  RANKING = 'ranking',
}

export enum DemographicType {
  POPULATION_GROWTH = 'population_growth',
  AGE_DISTRIBUTION = 'age_distribution',
  URBAN_RURAL = 'urban_rural',
  MIGRATION = 'migration',
  BIRTH_RATE = 'birth_rate',
  MORTALITY_RATE = 'mortality_rate',
  FERTILITY_RATE = 'fertility_rate',
  YOUTH_BULGE = 'youth_bulge',
}

export enum EmploymentType {
  TEACHER_EMPLOYMENT = 'teacher_employment',
  STAFF_EMPLOYMENT = 'staff_employment',
  GRADUATE_EMPLOYMENT = 'graduate_employment',
  VACANCY = 'vacancy',
  TURNOVER = 'turnover',
  QUALIFICATION = 'qualification',
  TRAINING = 'training',
  CERTIFICATION = 'certification',
}

export enum DropoutFactor {
  ECONOMIC = 'economic',
  SOCIAL = 'social',
  ACADEMIC = 'academic',
  GEOGRAPHIC = 'geographic',
  GENDER = 'gender',
  HEALTH = 'health',
  FAMILY = 'family',
  SCHOOL_QUALITY = 'school_quality',
  DISTANCE = 'distance',
  VIOLENCE = 'violence',
}

export enum ForecastModel {
  LINEAR_REGRESSION = 'linear_regression',
  ARIMA = 'arima',
  EXPONENTIAL_SMOOTHING = 'exponential_smoothing',
  NEURAL_NETWORK = 'neural_network',
  RANDOM_FOREST = 'random_forest',
  XGBOOST = 'xgboost',
  LSTM = 'lstm',
  TRANSFORMER = 'transformer',
  ENSEMBLE = 'ensemble',
}

export enum ForecastStatus {
  DRAFT = 'draft',
  TRAINING = 'training',
  VALIDATED = 'validated',
  ACTIVE = 'active',
  EXPIRED = 'expired',
  FAILED = 'failed',
}

export enum DataSourceType {
  CENSUS = 'census',
  SURVEY = 'survey',
  ADMINISTRATIVE = 'administrative',
  SCHOOL_REPORT = 'school_report',
  ASSESSMENT = 'assessment',
  REAL_TIME = 'real_time',
  EXTERNAL_API = 'external_api',
}

export enum AlertSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum AlertStatus {
  ACTIVE = 'active',
  ACKNOWLEDGED = 'acknowledged',
  RESOLVED = 'resolved',
  ESCALATED = 'escalated',
}

export enum VisualizationType {
  CHART = 'chart',
  TABLE = 'table',
  MAP = 'map',
  GAUGE = 'gauge',
  HEATMAP = 'heatmap',
  TIMELINE = 'timeline',
  BAR = 'bar',
  PIE = 'pie',
  LINE = 'line',
}

export enum ReportFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMI_ANNUAL = 'semi_annual',
  ANNUAL = 'annual',
}

export enum BenchmarkType {
  NATIONAL_AVERAGE = 'national_average',
  REGIONAL_AVERAGE = 'regional_average',
  PEER_GROUP = 'peer_group',
  BEST_PRACTICE = 'best_practice',
  INTERNATIONAL = 'international',
  HISTORICAL = 'historical',
}

export enum TrendDirection {
  UP = 'up',
  DOWN = 'down',
  STABLE = 'stable',
  FLUCTUATING = 'fluctuating',
}

export enum RegionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  RESTRUCTURED = 'restructured',
}

export enum SchoolCluster {
  URBAN_HIGH_PERFORMANCE = 'urban_high_performance',
  URBAN_LOW_PERFORMANCE = 'urban_low_performance',
  RURAL_HIGH_PERFORMANCE = 'rural_high_performance',
  RURAL_LOW_PERFORMANCE = 'rural_low_performance',
  PERI_URBAN = 'peri_urban',
  ISOLATED = 'isolated',
  BORDER = 'border',
  COASTAL = 'coastal',
}

export enum DataQuality {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  ACCEPTABLE = 'acceptable',
  POOR = 'poor',
  UNRELIABLE = 'unreliable',
}

export enum CorrelationType {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NONE = 'none',
  STRONG = 'strong',
  MODERATE = 'moderate',
  WEAK = 'weak',
}

export enum EducationLevel {
  PRESCHOOL = 'preschool',
  PRIMARY = 'primary',
  LOWER_SECONDARY = 'lower_secondary',
  UPPER_SECONDARY = 'upper_secondary',
  TERTIARY = 'tertiary',
  VOCATIONAL = 'vocational',
}

export enum IndicatorFrequency {
  REAL_TIME = 'real_time',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUAL = 'annual',
}

export enum ComparativeRegion {
  ECOWAS = 'ecowas',
  SUB_SAHARAN_AFRICA = 'sub_saharan_africa',
  GLOBAL = 'global',
  INCOME_GROUP = 'income_group',
  SIZE_GROUP = 'size_group',
}

export enum SeasonType {
  DRY = 'dry',
  RAINY = 'rainy',
  HARMATTAN = 'harmattan',
  ALL_YEAR = 'all_year',
}

export enum GenderType {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum SchoolType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  COMMUNITY = 'community',
  FAITH_BASED = 'faith_based',
  INTERNATIONAL = 'international',
}

export enum FacilityType {
  CLASSROOM = 'classroom',
  LABORATORY = 'laboratory',
  LIBRARY = 'library',
  COMPUTER_ROOM = 'computer_room',
  SPORTS_FACILITY = 'sports_facility',
  CAFETERIA = 'cafeteria',
  DORMITORY = 'dormitory',
  ADMINISTRATION = 'administration',
}

export enum ResourceCategory {
  HUMAN = 'human',
  MATERIAL = 'material',
  FINANCIAL = 'financial',
  TECHNOLOGICAL = 'technological',
  INFRASTRUCTURE = 'infrastructure',
}

export enum ComplianceStatus {
  COMPLIANT = 'compliant',
  PARTIALLY_COMPLIANT = 'partially_compliant',
  NON_COMPLIANT = 'non_compliant',
  UNDER_REVIEW = 'under_review',
}

export enum StakeholderType {
  MINISTRY = 'ministry',
  REGION = 'region',
  DISTRICT = 'district',
  SCHOOL = 'school',
  COMMUNITY = 'community',
  NGO = 'ngo',
  INTERNATIONAL = 'international',
  PRIVATE = 'private',
}

export enum ReportType {
  OPERATIONAL = 'operational',
  STRATEGIC = 'strategic',
  FINANCIAL = 'financial',
  COMPLIANCE = 'compliance',
  AUDIT = 'audit',
  AD_HOC = 'ad_hoc',
}

export enum FilterOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  CONTAINS = 'contains',
  BETWEEN = 'between',
  IN = 'in',
  NOT_IN = 'not_in',
}

export enum AggregationType {
  SUM = 'sum',
  AVERAGE = 'average',
  COUNT = 'count',
  MIN = 'min',
  MAX = 'max',
  MEDIAN = 'median',
  PERCENTILE = 'percentile',
}

export enum ExportFormat {
  CSV = 'csv',
  EXCEL = 'excel',
  PDF = 'pdf',
  JSON = 'json',
  XML = 'xml',
}

export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  WEBHOOK = 'webhook',
  DASHBOARD = 'dashboard',
}

export enum PermissionLevel {
  READ = 'read',
  WRITE = 'write',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export enum IndicatorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DEPRECATED = 'deprecated',
  UNDER_REVIEW = 'under_review',
  DRAFT = 'draft',
}

export enum RegionLevel {
  COUNTRY = 'country',
  PROVINCE = 'province',
  DEPARTMENT = 'department',
  COMMUNE = 'commune',
  VILLAGE = 'village',
}

export enum SchoolStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CONSTRUCTION = 'construction',
  CLOSED = 'closed',
  MERGED = 'merged',
}

export enum DataCollectionMethod {
  AUTOMATED = 'automated',
  MANUAL = 'manual',
  HYBRID = 'hybrid',
  MOBILE = 'mobile',
  API = 'api',
}

export enum ValidationStatus {
  PENDING = 'pending',
  VALIDATED = 'validated',
  REJECTED = 'rejected',
  REQUIRES_REVIEW = 'requires_review',
}

export enum TrendPeriod {
  SHORT_TERM = 'short_term',
  MEDIUM_TERM = 'medium_term',
  LONG_TERM = 'long_term',
}

export enum ForecastConfidence {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high',
}

export enum MapLayerType {
  DENSITY = 'density',
  CHOROPLETH = 'choropleth',
  BUBBLE = 'bubble',
  HEAT = 'heat',
  CLUSTER = 'cluster',
  PIN = 'pin',
  OVERLAY = 'overlay',
}

export enum PopulationGroup {
  SCHOOL_AGE = 'school_age',
  OUT_OF_SCHOOL = 'out_of_school',
  TEACHERS = 'teachers',
  PARENTS = 'parents',
  ADMINISTRATORS = 'administrators',
}

export enum UnemploymentReason {
  NO_VACANCY = 'no_vacancy',
  SKILL_MISMATCH = 'skill_mismatch',
  QUALIFICATION = 'qualification',
  GEOGRAPHIC = 'geographic',
  DISCRIMINATION = 'discrimination',
  HEALTH = 'health',
  OTHER = 'other',
}

export enum InternationalBenchmark {
  PISA = 'pisa',
  TIMSS = 'timss',
  PIRLS = 'pirls',
  SACMEQ = 'sacmeq',
  PASEC = 'pasec',
  BECE = 'bece',
  WAEC = 'waec',
  NECO = 'neco',
}

export enum MetricUnit {
  PERCENTAGE = 'percentage',
  COUNT = 'count',
  RATIO = 'ratio',
  INDEX = 'index',
  RATE = 'rate',
  SCORE = 'score',
  CURRENCY = 'currency',
}

export enum ComparisonType {
  YEAR_OVER_YEAR = 'year_over_year',
  QUARTER_OVER_QUARTER = 'quarter_over_quarter',
  MONTH_OVER_MONTH = 'month_over_month',
  REGIONAL = 'regional',
  NATIONAL = 'national',
}

export enum EducationIndicatorSource {
  MINISTRY = 'ministry',
  UNESCO = 'unesco',
  WORLD_BANK = 'world_bank',
  UNICEF = 'unicef',
  AFRICAN_UNION = 'african_union',
  SCHOOL = 'school',
  COMMUNITY = 'community',
}

export enum DropoutRiskLevel {
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
  VERY_HIGH = 'very_high',
  CRITICAL = 'critical',
}

export enum EmploymentSector {
  PUBLIC = 'public',
  PRIVATE = 'private',
  NGO = 'ngo',
  SELF_EMPLOYED = 'self_employed',
  INFORMAL = 'informal',
}

export enum SchoolPerformanceQuintILE {
  BOTTOM_20 = 'bottom_20',
  SECOND_20 = 'second_20',
  MIDDLE_20 = 'middle_20',
  FOURTH_20 = 'fourth_20',
  TOP_20 = 'top_20',
}

export interface EducationIndicator {
  id: string;
  school_id: string | null;
  region_id: string | null;
  department_id: string | null;
  name: string;
  code: string;
  description: string;
  type: IndicatorType;
  category: IndicatorCategory;
  level: MonitoringLevel;
  frequency: IndicatorFrequency;
  data_source: DataSourceType;
  status: IndicatorStatus;
  unit: MetricUnit;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface IndicatorValue {
  id: string;
  indicator_id: string;
  value: number;
  previous_value: number | null;
  target_value: number | null;
  trend: TrendDirection;
  change_percentage: number;
  period: string;
  region_id: string | null;
  school_id: string | null;
  education_level: EducationLevel;
  gender: GenderType | null;
  data_quality: DataQuality;
  source: string;
  validated: boolean;
  created_at: string;
  updated_at: string;
}

export interface MonitoringDashboard {
  id: string;
  name: string;
  code: string;
  description: string;
  level: MonitoringLevel;
  owner_id: string;
  widgets: DashboardWidget[];
  layout: Record<string, unknown>;
  refresh_interval: number;
  is_public: boolean;
  access_level: PermissionLevel;
  created_at: string;
  updated_at: string;
}

export interface DashboardWidget {
  id: string;
  dashboard_id: string;
  name: string;
  type: VisualizationType;
  indicator_ids: string[];
  config: Record<string, unknown>;
  position: Record<string, unknown>;
  size: Record<string, unknown>;
  refresh_interval: number;
  created_at: string;
  updated_at: string;
}

export interface MonitoringAlert {
  id: string;
  indicator_id: string;
  school_id: string | null;
  region_id: string | null;
  title: string;
  message: string;
  severity: AlertSeverity;
  status: AlertStatus;
  threshold_value: number;
  actual_value: number;
  triggered_at: string;
  acknowledged_at: string | null;
  acknowledged_by: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface EducationMap {
  id: string;
  name: string;
  code: string;
  description: string;
  type: MappingType;
  level: MonitoringLevel;
  region_id: string | null;
  center_lat: number;
  center_lng: number;
  zoom_level: number;
  layers: MapLayer[];
  filters: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface MapLayer {
  id: string;
  map_id: string;
  name: string;
  type: MapLayerType;
  data_source: string;
  visible: boolean;
  opacity: number;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface MapRegion {
  id: string;
  map_id: string;
  name: string;
  code: string;
  level: RegionLevel;
  parent_id: string | null;
  boundary: Record<string, unknown>;
  center_lat: number;
  center_lng: number;
  area_km2: number;
  population: number;
  school_count: number;
  status: RegionStatus;
  created_at: string;
  updated_at: string;
}

export interface MapSchool {
  id: string;
  map_id: string;
  school_id: string;
  name: string;
  lat: number;
  lng: number;
  type: SchoolType;
  status: SchoolStatus;
  enrollment: number;
  performance_score: number;
  cluster: SchoolCluster;
  created_at: string;
  updated_at: string;
}

export interface SchoolPerformance {
  id: string;
  school_id: string;
  name: string;
  region_id: string;
  department_id: string;
  education_level: EducationLevel;
  school_type: SchoolType;
  pass_rate: number;
  average_score: number;
  graduation_rate: number;
  enrollment_rate: number;
  attendance_rate: number;
  teacher_student_ratio: number;
  quintile: SchoolPerformanceQuintILE;
  ranking_national: number | null;
  ranking_regional: number | null;
  trend: TrendDirection;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface DemographicData {
  id: string;
  region_id: string;
  department_id: string | null;
  year: number;
  total_population: number;
  school_age_population: number;
  urban_population: number;
  rural_population: number;
  population_growth_rate: number;
  density_per_km2: number;
  age_distribution: AgeDistribution;
  gender_distribution: GenderDistribution;
  migration_rate: number;
  data_source: DataSourceType;
  data_quality: DataQuality;
  created_at: string;
  updated_at: string;
}

export interface AgeDistribution {
  zero_to_five: number;
  six_to_ten: number;
  eleven_to_fifteen: number;
  sixteen_to_nineteen: number;
  twenty_plus: number;
}

export interface GenderDistribution {
  male: number;
  female: number;
  other: number;
}

export interface DemographicTrend {
  id: string;
  region_id: string;
  demographic_type: DemographicType;
  period_start: string;
  period_end: string;
  start_value: number;
  end_value: number;
  change_absolute: number;
  change_percentage: number;
  trend: TrendDirection;
  annual_rate: number;
  projection: number | null;
  created_at: string;
  updated_at: string;
}

export interface EmploymentStat {
  id: string;
  region_id: string | null;
  department_id: string | null;
  year: number;
  employment_type: EmploymentType;
  total_count: number;
  employed_count: number;
  unemployed_count: number;
  vacancy_count: number;
  employment_rate: number;
  average_salary: number;
  qualification_level: string;
  sector: EmploymentSector;
  gender_breakdown: GenderDistribution;
  created_at: string;
  updated_at: string;
}

export interface DropoutObservatory {
  id: string;
  school_id: string | null;
  region_id: string | null;
  education_level: EducationLevel;
  year: number;
  total_enrolled: number;
  total_dropped_out: number;
  dropout_rate: number;
  factors: DropoutFactorAnalysis[];
  risk_level: DropoutRiskLevel;
  interventions: DropoutIntervention[];
  created_at: string;
  updated_at: string;
}

export interface DropoutFactorAnalysis {
  factor: DropoutFactor;
  impact_score: number;
  affected_students: number;
  percentage: number;
  trend: TrendDirection;
}

export interface DropoutIntervention {
  id: string;
  observatory_id: string;
  name: string;
  description: string;
  factor: DropoutFactor;
  start_date: string;
  end_date: string | null;
  status: ValidationStatus;
  effectiveness_score: number | null;
  students_affected: number;
}

export interface DropoutRate {
  id: string;
  region_id: string;
  education_level: EducationLevel;
  gender: GenderType;
  year: number;
  rate: number;
  previous_rate: number | null;
  change: number;
  trend: TrendDirection;
  created_at: string;
  updated_at: string;
}

export interface AIForecast {
  id: string;
  name: string;
  code: string;
  description: string;
  model: ForecastModel;
  target_indicator: string;
  horizon: string;
  confidence: ForecastConfidence;
  status: ForecastStatus;
  accuracy_score: number | null;
  training_data_start: string;
  training_data_end: string;
  features: string[];
  parameters: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ForecastResult {
  id: string;
  forecast_id: string;
  period: string;
  predicted_value: number;
  lower_bound: number;
  upper_bound: number;
  confidence_interval: number;
  actual_value: number | null;
  error_margin: number | null;
  residual: number | null;
  created_at: string;
  updated_at: string;
}

export interface ObservatoryConfig {
  id: string;
  name: string;
  description: string;
  default_level: MonitoringLevel;
  refresh_interval: number;
  data_retention_days: number;
  alert_thresholds: Record<string, number>;
  forecast_models: ForecastModel[];
  enabled_features: string[];
  created_at: string;
  updated_at: string;
}

export interface ObservatoryMetrics {
  id: string;
  total_indicators: number;
  active_indicators: number;
  total_dashboards: number;
  active_alerts: number;
  total_forecasts: number;
  data_freshness_hours: number;
  coverage_percentage: number;
  average_data_quality: number;
  last_sync_at: string;
  created_at: string;
  updated_at: string;
}

export interface IndicatorFilter {
  indicator_id: string;
  operator: FilterOperator;
  value: number | string;
}

export interface MapFilter {
  layer_id: string;
  field: string;
  operator: FilterOperator;
  value: number | string | string[];
}

export interface PerformanceComparison {
  id: string;
  school_id: string;
  comparison_type: ComparisonType;
  benchmark_type: BenchmarkType;
  current_value: number;
  benchmark_value: number;
  difference: number;
  percentage_diff: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface DemographicProjection {
  id: string;
  region_id: string;
  projection_year: number;
  projected_population: number;
  school_age_population: number;
  confidence_interval_low: number;
  confidence_interval_high: number;
  model_used: ForecastModel;
  created_at: string;
  updated_at: string;
}

export interface EmploymentTrend {
  id: string;
  region_id: string;
  employment_type: EmploymentType;
  period: string;
  value: number;
  previous_value: number;
  change: number;
  trend: TrendDirection;
  created_at: string;
  updated_at: string;
}

export interface InternationalComparison {
  id: string;
  indicator_name: string;
  country_value: number;
  benchmark: InternationalBenchmark;
  benchmark_value: number;
  rank: number | null;
  total_countries: number | null;
  education_level: EducationLevel;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface RegionalPerformance {
  id: string;
  region_id: string;
  region_name: string;
  level: RegionLevel;
  period: string;
  indicators: RegionalIndicatorValue[];
  overall_score: number;
  rank: number;
  trend: TrendDirection;
  created_at: string;
  updated_at: string;
}

export interface RegionalIndicatorValue {
  indicator_id: string;
  indicator_name: string;
  value: number;
  national_average: number;
  rank: number;
  trend: TrendDirection;
}

export interface EducationMappingConfig {
  id: string;
  map_type: MappingType;
  default_zoom: number;
  center_lat: number;
  center_lng: number;
  show_labels: boolean;
  cluster_markers: boolean;
  layer_opacity: number;
  created_at: string;
  updated_at: string;
}

export interface SchoolClusterAnalysis {
  id: string;
  cluster: SchoolCluster;
  school_count: number;
  average_performance: number;
  average_enrollment: number;
  average_teacher_ratio: number;
  average_dropout_rate: number;
  dominant_factors: DropoutFactor[];
  created_at: string;
  updated_at: string;
}

export interface DataCollectionSchedule {
  id: string;
  indicator_id: string;
  frequency: IndicatorFrequency;
  method: DataCollectionMethod;
  responsible_entity: string;
  next_collection: string;
  last_collection: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ObservatoryUser {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  permission_level: PermissionLevel;
  accessible_regions: string[];
  accessible_indicators: string[];
  notification_channels: NotificationChannel[];
  created_at: string;
  updated_at: string;
}

export interface ExportConfig {
  id: string;
  format: ExportFormat;
  indicator_ids: string[];
  region_ids: string[];
  period_start: string;
  period_end: string;
  include_metadata: boolean;
  include_charts: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationRule {
  id: string;
  name: string;
  indicator_id: string;
  condition: string;
  threshold_value: number;
  severity: AlertSeverity;
  channels: NotificationChannel[];
  recipients: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CorrelationAnalysis {
  id: string;
  indicator_a_id: string;
  indicator_b_id: string;
  correlation_type: CorrelationType;
  correlation_coefficient: number;
  p_value: number;
  sample_size: number;
  period: string;
  significance: boolean;
  created_at: string;
  updated_at: string;
}

export interface TimeSeriesData {
  id: string;
  indicator_id: string;
  timestamp: string;
  value: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface AggregatedIndicator {
  id: string;
  indicator_id: string;
  aggregation_type: AggregationType;
  region_id: string | null;
  period: string;
  value: number;
  count: number;
  min_value: number;
  max_value: number;
  created_at: string;
  updated_at: string;
}

export interface DataSource {
  id: string;
  name: string;
  type: DataSourceType;
  url: string | null;
  api_key: string | null;
  refresh_interval: number;
  last_sync: string | null;
  status: IndicatorStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface IndicatorDependency {
  id: string;
  source_indicator_id: string;
  target_indicator_id: string;
  formula: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SchoolGeolocation {
  id: string;
  school_id: string;
  lat: number;
  lng: number;
  altitude: number | null;
  accuracy: number;
  region_id: string;
  department_id: string;
  commune: string;
  village: string;
  created_at: string;
  updated_at: string;
}

export interface EducationAccessIndex {
  id: string;
  region_id: string;
  education_level: EducationLevel;
  access_index: number;
  distance_to_nearest_school: number;
  travel_time_minutes: number;
  transportation_available: boolean;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface GenderParityIndex {
  id: string;
  region_id: string;
  education_level: EducationLevel;
  gpi_value: number;
  male_enrollment: number;
  female_enrollment: number;
  year: number;
  trend: TrendDirection;
  created_at: string;
  updated_at: string;
}

export interface BudgetExecutionRate {
  id: string;
  region_id: string;
  education_level: EducationLevel;
  allocated_budget: number;
  executed_budget: number;
  execution_rate: number;
  variance: number;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface TeacherDistribution {
  id: string;
  region_id: string;
  education_level: EducationLevel;
  total_teachers: number;
  qualified_teachers: number;
  qualification_rate: number;
  teacher_student_ratio: number;
  rural_teachers: number;
  urban_teachers: number;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface FacilityConditionIndex {
  id: string;
  school_id: string;
  facility_type: FacilityType;
  condition_score: number;
  last_inspection: string;
  needs_repair: boolean;
  estimated_repair_cost: number;
  created_at: string;
  updated_at: string;
}

export interface PopulationProjection {
  id: string;
  region_id: string;
  year: number;
  projected_population: number;
  school_age_population: number;
  urban_population: number;
  rural_population: number;
  growth_rate: number;
  model: ForecastModel;
  confidence: ForecastConfidence;
  created_at: string;
  updated_at: string;
}

export interface DropoutRecoveryPlan {
  id: string;
  region_id: string;
  education_level: EducationLevel;
  target_dropout_rate: number;
  current_dropout_rate: number;
  strategies: DropoutStrategy[];
  budget: number;
  timeline_months: number;
  responsible_entity: string;
  status: ValidationStatus;
  created_at: string;
  updated_at: string;
}

export interface DropoutStrategy {
  name: string;
  description: string;
  target_factor: DropoutFactor;
  expected_impact: number;
  cost: number;
  duration_months: number;
}

export interface ObservatoryAudit {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  changes: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  created_at: string;
  updated_at: string;
}

export interface IndicatorTemplate {
  id: string;
  name: string;
  code: string;
  description: string;
  type: IndicatorType;
  category: IndicatorCategory;
  unit: MetricUnit;
  frequency: IndicatorFrequency;
  formula: string | null;
  parameters: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RegionIndicatorSummary {
  id: string;
  region_id: string;
  region_name: string;
  total_indicators: number;
  positive_trend: number;
  negative_trend: number;
  stable_trend: number;
  overall_score: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface SchoolIndicatorSummary {
  id: string;
  school_id: string;
  school_name: string;
  total_indicators: number;
  above_average: number;
  below_average: number;
  on_target: number;
  overall_score: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface IndicatorBenchmark {
  id: string;
  indicator_id: string;
  benchmark_type: BenchmarkType;
  target_value: number;
  current_value: number;
  gap: number;
  achievement_percentage: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface IndicatorHistory {
  id: string;
  indicator_id: string;
  period: string;
  value: number;
  previous_value: number | null;
  change: number;
  change_percentage: number;
  trend: TrendDirection;
  data_quality: DataQuality;
  created_at: string;
  updated_at: string;
}

export interface RegionalEducationProfile {
  id: string;
  region_id: string;
  region_name: string;
  level: RegionLevel;
  population: number;
  school_age_population: number;
  total_schools: number;
  total_students: number;
  total_teachers: number;
  enrollment_rate: number;
  literacy_rate: number;
  gender_parity_index: number;
  average_performance: number;
  infrastructure_score: number;
  funding_per_student: number;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface DistrictPerformanceRanking {
  id: string;
  district_id: string;
  district_name: string;
  region_id: string;
  rank: number;
  score: number;
  previous_rank: number | null;
  rank_change: number;
  pass_rate: number;
  enrollment_rate: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface IndicatorAlertRule {
  id: string;
  indicator_id: string;
  rule_name: string;
  condition: string;
  threshold_value: number;
  comparison_operator: FilterOperator;
  severity: AlertSeverity;
  notification_channels: NotificationChannel[];
  recipients: string[];
  cooldown_minutes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ObservatoryReport {
  id: string;
  title: string;
  description: string;
  report_type: ReportType;
  period_start: string;
  period_end: string;
  level: MonitoringLevel;
  region_ids: string[];
  indicator_ids: string[];
  summary: string;
  key_findings: string[];
  recommendations: string[];
  generated_by: string;
  status: ValidationStatus;
  file_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface IndicatorDataPoint {
  id: string;
  indicator_id: string;
  timestamp: string;
  value: number;
  source: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface EducationQualityIndex {
  id: string;
  region_id: string;
  education_level: EducationLevel;
  quality_index: number;
  input_score: number;
  process_score: number;
  output_score: number;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface SchoolClusterProfile {
  id: string;
  cluster: SchoolCluster;
  region_id: string;
  school_count: number;
  total_enrollment: number;
  average_class_size: number;
  average_teacher_qualification: number;
  average_infrastructure_score: number;
  average_performance_score: number;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface DropoutRecoveryTracker {
  id: string;
  recovery_plan_id: string;
  intervention_id: string;
  students_targeted: number;
  students_reached: number;
  students_recovered: number;
  effectiveness_percentage: number;
  cost_per_student: number;
  period: string;
  status: ValidationStatus;
  created_at: string;
  updated_at: string;
}

export interface EmploymentOutcomeTracker {
  id: string;
  graduate_id: string;
  school_id: string;
  education_level: EducationLevel;
  graduation_year: number;
  employment_type: EmploymentType;
  employment_status: string;
  salary_range: string;
  sector: string;
  time_to_employment_months: number;
  match_with_education: boolean;
  survey_date: string;
  created_at: string;
  updated_at: string;
}

export interface EducationEquityIndex {
  id: string;
  region_id: string;
  equity_index: number;
  gender_equity: number;
  geographic_equity: number;
  socioeconomic_equity: number;
  disability_equity: number;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface IndicatorCorrelationMatrix {
  id: string;
  indicator_ids: string[];
  matrix: number[][];
  significance_level: number;
  sample_size: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface ForecastEnsemble {
  id: string;
  name: string;
  model_ids: string[];
  weights: number[];
  combined_accuracy: number;
  target_indicator: string;
  horizon: string;
  status: ForecastStatus;
  created_at: string;
  updated_at: string;
}

export interface ObservatoryWebhook {
  id: string;
  name: string;
  url: string;
  secret: string;
  events: string[];
  is_active: boolean;
  last_triggered: string | null;
  failure_count: number;
  created_at: string;
  updated_at: string;
}

export interface IndicatorApiEndpoint {
  id: string;
  name: string;
  endpoint: string;
  method: string;
  parameters: Record<string, unknown>;
  rate_limit: number;
  authentication_required: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NationalEducationSummary {
  id: string;
  total_regions: number;
  total_departments: number;
  total_districts: number;
  total_schools: number;
  total_students: number;
  total_teachers: number;
  national_enrollment_rate: number;
  national_literacy_rate: number;
  national_graduation_rate: number;
  national_dropout_rate: number;
  gender_parity_index: number;
  average_performance_score: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface SchoolPerformanceTrend {
  id: string;
  school_id: string;
  metric: PerformanceMetric;
  period: string;
  value: number;
  previous_value: number;
  change: number;
  trend: TrendDirection;
  created_at: string;
  updated_at: string;
}

export interface RegionalDemographicProfile {
  id: string;
  region_id: string;
  total_population: number;
  population_growth_rate: number;
  urbanization_rate: number;
  school_age_percentage: number;
  dependency_ratio: number;
  fertility_rate: number;
  life_expectancy: number;
  literacy_rate: number;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface EducationMappingLayerConfig {
  id: string;
  map_id: string;
  layer_id: string;
  field_name: string;
  color_scale: string[];
  min_value: number;
  max_value: number;
  class_breaks: number[];
  label_format: string;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface ForecastModelPerformance {
  id: string;
  model_id: string;
  model_type: ForecastModel;
  accuracy_metrics: Record<string, number>;
  training_time_seconds: number;
  inference_time_ms: number;
  data_points_used: number;
  training_period: string;
  validation_period: string;
  created_at: string;
  updated_at: string;
}

export interface DropoutEarlyWarning {
  id: string;
  student_id: string;
  school_id: string;
  risk_score: number;
  risk_factors: DropoutFactor[];
  risk_level: DropoutRiskLevel;
  warning_date: string;
  intervention_recommended: string;
  intervention_status: ValidationStatus;
  created_at: string;
  updated_at: string;
}

export interface EducationFinancialFlow {
  id: string;
  source_entity: string;
  destination_entity: string;
  flow_type: string;
  amount: number;
  currency: string;
  fiscal_year: number;
  purpose: string;
  status: ValidationStatus;
  created_at: string;
  updated_at: string;
}

export interface SchoolInfrastructureSurvey {
  id: string;
  school_id: string;
  survey_date: string;
  total_classrooms: number;
  functional_classrooms: number;
  has_electricity: boolean;
  has_water: boolean;
  has_toilets: boolean;
  has_internet: boolean;
  has_library: boolean;
  has_laboratory: boolean;
  building_condition: string;
  furniture_condition: string;
  equipment_condition: string;
  overall_score: number;
  inspector_name: string;
  created_at: string;
  updated_at: string;
}

export interface TeacherPerformanceIndicator {
  id: string;
  teacher_id: string;
  school_id: string;
  indicator_name: string;
  indicator_value: number;
  benchmark_value: number;
  period: string;
  assessment_type: string;
  created_at: string;
  updated_at: string;
}

export interface StudentLearningOutcome {
  id: string;
  school_id: string;
  region_id: string;
  education_level: EducationLevel;
  subject: string;
  average_score: number;
  proficiency_rate: number;
  completion_rate: number;
  period: string;
  assessment_type: string;
  created_at: string;
  updated_at: string;
}

export interface EducationAccessBarrier {
  id: string;
  region_id: string;
  barrier_type: string;
  description: string;
  affected_population: number;
  severity: RiskLevel;
  mitigation_strategy: string;
  status: ValidationStatus;
  created_at: string;
  updated_at: string;
}

export interface ObservatoryDataSync {
  id: string;
  source_system: string;
  target_system: string;
  data_type: string;
  records_synced: number;
  sync_duration_seconds: number;
  sync_status: string;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface EducationPolicyImpact {
  id: string;
  policy_name: string;
  implementation_date: string;
  target_region: string;
  target_indicator: string;
  baseline_value: number;
  current_value: number;
  impact_score: number;
  confidence_level: number;
  methodology: string;
  created_at: string;
  updated_at: string;
}

export interface IndicatorAnomaly {
  id: string;
  indicator_id: string;
  detected_at: string;
  anomaly_type: string;
  expected_value: number;
  actual_value: number;
  deviation: number;
  severity: AlertSeverity;
  potential_causes: string[];
  is_confirmed: boolean;
  confirmed_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface SchoolPerformanceQuintileDistribution {
  id: string;
  region_id: string;
  education_level: EducationLevel;
  quintile: SchoolPerformanceQuintILE;
  school_count: number;
  student_count: number;
  average_score: number;
  average_enrollment: number;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface EducationOutcomeTracker {
  id: string;
  outcome_name: string;
  description: string;
  target_value: number;
  current_value: number;
  unit: string;
  deadline: string;
  responsible_entity: string;
  status: ValidationStatus;
  created_at: string;
  updated_at: string;
}

export interface DropoutRecoveryProgram {
  id: string;
  name: string;
  description: string;
  region_id: string;
  target_schools: string[];
  target_population: number;
  budget: number;
  start_date: string;
  end_date: string;
  recovered_count: number;
  success_rate: number;
  status: ValidationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EducationMappingDataset {
  id: string;
  name: string;
  description: string;
  data_type: DataSourceType;
  record_count: number;
  last_updated: string;
  format: string;
  size_bytes: number;
  checksum: string;
  created_at: string;
  updated_at: string;
}

export interface IndicatorDrillDown {
  id: string;
  parent_indicator_id: string;
  child_indicator_id: string;
  drill_down_level: string;
  aggregation_method: AggregationType;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface EducationBudgetAllocation {
  id: string;
  region_id: string;
  education_level: EducationLevel;
  budget_category: string;
  allocated_amount: number;
  executed_amount: number;
  execution_rate: number;
  fiscal_year: number;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface SchoolMonitoringSchedule {
  id: string;
  school_id: string;
  monitor_type: string;
  frequency: IndicatorFrequency;
  next_monitoring_date: string;
  last_monitoring_date: string | null;
  assigned_to: string;
  checklist: string[];
  status: ValidationStatus;
  created_at: string;
  updated_at: string;
}

export interface EducationTrendAnalysis {
  id: string;
  indicator_id: string;
  region_id: string | null;
  trend_type: string;
  start_period: string;
  end_period: string;
  slope: number;
  r_squared: number;
  significance: number;
  interpretation: string;
  created_at: string;
  updated_at: string;
}

export interface EducationDataQualityReport {
  id: string;
  data_source: string;
  completeness_rate: number;
  accuracy_rate: number;
  timeliness_rate: number;
  consistency_rate: number;
  overall_quality_score: number;
  issues_found: string[];
  recommendations: string[];
  report_date: string;
  created_at: string;
  updated_at: string;
}

export interface NationalEducationGoal {
  id: string;
  goal_name: string;
  description: string;
  target_year: number;
  target_value: number;
  current_value: number;
  progress_percentage: number;
  responsible_entity: string;
  status: ValidationStatus;
  created_at: string;
  updated_at: string;
}

export interface EducationMappingExport {
  id: string;
  map_id: string;
  format: ExportFormat;
  file_url: string;
  file_size: number;
  generated_by: string;
  status: ValidationStatus;
  created_at: string;
  updated_at: string;
}

export interface IndicatorFormula {
  id: string;
  indicator_id: string;
  formula_name: string;
  formula_expression: string;
  input_indicators: string[];
  output_type: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RegionalEducationComparison {
  id: string;
  region_a_id: string;
  region_b_id: string;
  indicator_id: string;
  value_a: number;
  value_b: number;
  difference: number;
  percentage_diff: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface EducationSeasonalPattern {
  id: string;
  indicator_id: string;
  region_id: string;
  season: SeasonType;
  average_value: number;
  min_value: number;
  max_value: number;
  variance: number;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface ObservatoryUserActivity {
  id: string;
  user_id: string;
  activity_type: string;
  entity_type: string;
  entity_id: string;
  duration_seconds: number;
  ip_address: string;
  created_at: string;
  updated_at: string;
}

export interface EducationStakeholderMap {
  id: string;
  stakeholder_name: string;
  stakeholder_type: StakeholderType;
  role: string;
  influence_level: number;
  interest_level: number;
  engagement_strategy: string;
  contact_information: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface DropoutCohortAnalysis {
  id: string;
  cohort_year: number;
  region_id: string;
  education_level: EducationLevel;
  initial_enrollment: number;
  year_1_retention: number;
  year_2_retention: number;
  year_3_retention: number;
  year_4_retention: number;
  year_5_retention: number;
  final_completion: number;
  created_at: string;
  updated_at: string;
}

export interface EducationDataPipeline {
  id: string;
  pipeline_name: string;
  source_systems: string[];
  transformation_steps: string[];
  target_table: string;
  schedule: IndicatorFrequency;
  last_run: string;
  status: ValidationStatus;
  error_log: string | null;
  created_at: string;
  updated_at: string;
}

export interface SchoolPerformanceDriver {
  id: string;
  school_id: string;
  driver_name: string;
  driver_value: number;
  impact_weight: number;
  correlation: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface EducationResourceUtilization {
  id: string;
  resource_type: ResourceCategory;
  region_id: string;
  total_available: number;
  total_used: number;
  utilization_rate: number;
  efficiency_score: number;
  waste_percentage: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface EducationForecastScenario {
  id: string;
  scenario_name: string;
  description: string;
  assumptions: string[];
  target_indicator: string;
  projected_values: ForecastResult[];
  probability: number;
  created_at: string;
  updated_at: string;
}

export interface ObservatoryApiUsage {
  id: string;
  endpoint: string;
  method: string;
  request_count: number;
  average_response_time_ms: number;
  error_rate: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface EducationBenchmarkReport {
  id: string;
  benchmark_name: string;
  benchmark_type: BenchmarkType;
  indicators: string[];
  participating_regions: string[];
  results: BenchmarkResult[];
  report_date: string;
  created_at: string;
  updated_at: string;
}

export interface BenchmarkResult {
  region_id: string;
  region_name: string;
  scores: Record<string, number>;
  overall_rank: number;
  overall_score: number;
}

export interface IndicatorCompositeIndex {
  id: string;
  index_name: string;
  description: string;
  component_indicators: string[];
  weights: number[];
  aggregation_method: AggregationType;
  scale_min: number;
  scale_max: number;
  created_at: string;
  updated_at: string;
}

export interface EducationMonitoringConfig {
  id: string;
  monitoring_type: string;
  parameters: Record<string, unknown>;
  schedule: IndicatorFrequency;
  notification_channels: NotificationChannel[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SchoolMonitoringResult {
  id: string;
  school_id: string;
  monitoring_type: string;
  score: number;
  findings: string[];
  recommendations: string[];
  inspector_id: string;
  monitoring_date: string;
  next_monitoring_date: string;
  status: ValidationStatus;
  created_at: string;
  updated_at: string;
}

export interface EducationDataCatalog {
  id: string;
  dataset_name: string;
  description: string;
  owner: string;
  data_type: string;
  frequency: IndicatorFrequency;
  coverage: string;
  access_level: PermissionLevel;
  tags: string[];
  last_updated: string;
  created_at: string;
  updated_at: string;
}

export enum ComparisonScope {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  DISTRICT = 'district',
  SCHOOL = 'school',
  PEER_GROUP = 'peer_group',
}

export enum DataRefreshRate {
  REAL_TIME = 'real_time',
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export enum IndicatorGroup {
  ENROLLMENT_METRICS = 'enrollment_metrics',
  PERFORMANCE_METRICS = 'performance_metrics',
  INFRASTRUCTURE_METRICS = 'infrastructure_metrics',
  FINANCIAL_METRICS = 'financial_metrics',
  HUMAN_RESOURCES = 'human_resources',
  EQUITY_METRICS = 'equity_metrics',
}

export enum MonitoringPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum RegionGroup {
  COASTAL = 'coastal',
  INLAND = 'inland',
  BORDER = 'border',
  ISLAND = 'island',
  MOUNTAINOUS = 'mountainous',
}

export enum SchoolSizeCategory {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  VERY_LARGE = 'very_large',
}

export interface ObservatoryRegionSummary {
  id: string;
  region_id: string;
  total_schools: number;
  total_students: number;
  total_teachers: number;
  enrollment_rate: number;
  average_performance: number;
  infrastructure_score: number;
  funding_level: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface IndicatorComparison {
  id: string;
  indicator_id: string;
  comparison_scope: ComparisonScope;
  entity_a_id: string;
  entity_b_id: string;
  value_a: number;
  value_b: number;
  difference: number;
  percentage_diff: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface EducationTrendData {
  id: string;
  indicator_id: string;
  region_id: string | null;
  data_points: TrendDataPoint[];
  trend_direction: TrendDirection;
  trend_strength: number;
  created_at: string;
  updated_at: string;
}

export interface TrendDataPoint {
  period: string;
  value: number;
}

export interface ObservatoryAlert {
  id: string;
  alert_type: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  source_indicator: string;
  source_region: string | null;
  acknowledged: boolean;
  acknowledged_by: string | null;
  acknowledged_at: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface EducationMappingOverlay {
  id: string;
  map_id: string;
  overlay_name: string;
  overlay_type: string;
  data: Record<string, unknown>;
  opacity: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface DropoutPredictor {
  id: string;
  model_name: string;
  features: string[];
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  training_data_size: number;
  last_trained: string;
  status: ForecastStatus;
  created_at: string;
  updated_at: string;
}

export interface SchoolPerformanceQuintile {
  id: string;
  quintile_name: string;
  school_count: number;
  student_count: number;
  average_score: number;
  average_enrollment: number;
  average_dropout_rate: number;
  region_id: string;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface EducationOutcome {
  id: string;
  outcome_name: string;
  description: string;
  target_value: number;
  current_value: number;
  unit: string;
  deadline: string;
  responsible_entity: string;
  status: ValidationStatus;
  created_at: string;
  updated_at: string;
}

export interface RegionalEducationRanking {
  id: string;
  ranking_name: string;
  ranking_year: number;
  rankings: RegionalRankingEntry[];
  methodology: string;
  data_source: DataSourceType;
  created_at: string;
  updated_at: string;
}

export interface RegionalRankingEntry {
  rank: number;
  region_id: string;
  region_name: string;
  score: number;
  change_from_previous: number;
}

export interface IndicatorHealthCheck {
  id: string;
  indicator_id: string;
  health_status: string;
  data_freshness_hours: number;
  last_value_date: string;
  missing_periods: number;
  anomaly_detected: boolean;
  checked_at: string;
  created_at: string;
  updated_at: string;
}

export interface EducationMappingCluster {
  id: string;
  map_id: string;
  cluster_name: string;
  center_lat: number;
  center_lng: number;
  school_ids: string[];
  average_performance: number;
  total_enrollment: number;
  dominant_characteristic: string;
  created_at: string;
  updated_at: string;
}

export interface DropoutRecoveryMetric {
  id: string;
  recovery_plan_id: string;
  metric_name: string;
  target_value: number;
  current_value: number;
  unit: string;
  period: string;
  status: ValidationStatus;
  created_at: string;
  updated_at: string;
}

export interface EducationBudgetFlow {
  id: string;
  flow_name: string;
  source_entity: string;
  destination_entity: string;
  amount: number;
  currency: string;
  flow_type: string;
  fiscal_year: number;
  status: ValidationStatus;
  created_at: string;
  updated_at: string;
}

export interface EmploymentOutcomeTracker {
  id: string;
  tracker_name: string;
  graduate_cohort: number;
  total_graduates: number;
  employed_count: number;
  employment_rate: number;
  average_time_to_employment_months: number;
  field_match_rate: number;
  survey_period: string;
  created_at: string;
  updated_at: string;
}

export interface EducationEquityIndex {
  id: string;
  index_name: string;
  region_id: string;
  equity_score: number;
  gender_equity: number;
  geographic_equity: number;
  socioeconomic_equity: number;
  disability_equity: number;
  year: number;
  trend: TrendDirection;
  created_at: string;
  updated_at: string;
}

export interface IndicatorComputationLog {
  id: string;
  indicator_id: string;
  computation_date: string;
  input_data_sources: string[];
  output_value: number;
  computation_time_ms: number;
  status: ValidationStatus;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface ObservatoryAccessLog {
  id: string;
  user_id: string;
  resource_type: string;
  resource_id: string;
  action: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
  updated_at: string;
}

export interface EducationMappingHeatmap {
  id: string;
  map_id: string;
  heatmap_name: string;
  data_field: string;
  color_scale: string[];
  radius: number;
  max_value: number;
  min_value: number;
  created_at: string;
  updated_at: string;
}

export interface SchoolPerformanceRanking {
  id: string;
  ranking_name: string;
  region_id: string | null;
  education_level: EducationLevel;
  metric: PerformanceMetric;
  year: number;
  rankings: SchoolRankingEntry[];
  created_at: string;
  updated_at: string;
}

export interface DemographicCohortAnalysis {
  id: string;
  cohort_name: string;
  region_id: string;
  start_year: number;
  end_year: number;
  initial_population: number;
  final_population: number;
  growth_rate: number;
  migration_impact: number;
  created_at: string;
  updated_at: string;
}

export interface EducationIndicatorDependencyGraph {
  id: string;
  graph_name: string;
  nodes: IndicatorDependencyNode[];
  edges: IndicatorDependencyEdge[];
  created_at: string;
  updated_at: string;
}

export interface IndicatorDependencyNode {
  indicator_id: string;
  indicator_name: string;
  type: IndicatorType;
}

export interface IndicatorDependencyEdge {
  source: string;
  target: string;
  relationship: string;
}

export interface RegionalEducationProfile {
  id: string;
  profile_name: string;
  region_id: string;
  total_schools: number;
  total_students: number;
  total_teachers: number;
  enrollment_rate: number;
  literacy_rate: number;
  gender_parity_index: number;
  average_performance: number;
  infrastructure_score: number;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface DropoutFactorWeight {
  id: string;
  factor: DropoutFactor;
  weight: number;
  confidence: number;
  sample_size: number;
  calculation_method: string;
  created_at: string;
  updated_at: string;
}
