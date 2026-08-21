export enum TwinType {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  DEPARTMENTAL = 'departmental',
  DISTRICT = 'district',
  SCHOOL = 'school',
  INFRASTRUCTURE = 'infrastructure',
  POPULATION = 'population',
  BUDGET = 'budget',
  TRANSPORT = 'transport',
  ENERGY = 'energy',
}

export enum TwinStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SYNCING = 'syncing',
  SIMULATING = 'simulating',
  MAINTENANCE = 'maintenance',
  OFFLINE = 'offline',
  ERROR = 'error',
  ARCHIVED = 'archived',
}

export enum SimulationType {
  WHAT_IF = 'what_if',
  PREDICTIVE = 'predictive',
  PRESCRIPTIVE = 'prescriptive',
  STOCHASTIC = 'stochastic',
  MONTE_CARLO = 'monte_carlo',
  OPTIMIZATION = 'optimization',
  SENSITIVITY = 'sensitivity',
  SCENARIO = 'scenario',
}

export enum SimulationStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  QUEUED = 'queued',
}

export enum ScenarioType {
  BASELINE = 'baseline',
  OPTIMISTIC = 'optimistic',
  PESSIMISTIC = 'pessimistic',
  STRESS_TEST = 'stress_test',
  GROWTH = 'growth',
  DECLINE = 'decline',
  DISRUPTION = 'disruption',
  RECOVERY = 'recovery',
}

export enum ScenarioStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum PopulationType {
  SCHOOL_AGE = 'school_age',
  OUT_OF_SCHOOL = 'out_of_school',
  TEACHERS = 'teachers',
  STAFF = 'staff',
  PARENTS = 'parents',
  TOTAL = 'total',
}

export enum CapacityType {
  CLASSROOM = 'classroom',
  LABORATORY = 'laboratory',
  LIBRARY = 'library',
  SPORTS = 'sports',
  DORMITORY = 'dormitory',
  CAFETERIA = 'cafeteria',
  TRANSPORT = 'transport',
}

export enum ModelType {
  LINEAR = 'linear',
  POLYNOMIAL = 'polynomial',
  NEURAL_NETWORK = 'neural_network',
  RANDOM_FOREST = 'random_forest',
  XGBOOST = 'xgboost',
  LSTM = 'lstm',
  TRANSFORMER = 'transformer',
  ENSEMBLE = 'ensemble',
}

export enum ModelStatus {
  DRAFT = 'draft',
  TRAINING = 'training',
  VALIDATED = 'validated',
  DEPLOYED = 'deployed',
  RETIRED = 'retired',
  FAILED = 'failed',
}

export enum DataType {
  ENROLLMENT = 'enrollment',
  ATTENDANCE = 'attendance',
  PERFORMANCE = 'performance',
  INFRASTRUCTURE = 'infrastructure',
  FINANCE = 'finance',
  DEMOGRAPHIC = 'demographic',
  TRANSPORT = 'transport',
  ENERGY = 'energy',
  WATER = 'water',
  WASTE = 'waste',
}

export enum SyncMode {
  REAL_TIME = 'real_time',
  PERIODIC = 'periodic',
  ON_DEMAND = 'on_demand',
  EVENT_DRIVEN = 'event_driven',
  BATCH = 'batch',
}

export enum VisualizationType {
  _2D = '2d',
  _3D = '3d',
  HEATMAP = 'heatmap',
  TIMELINE = 'timeline',
  GRAPH = 'graph',
  TABLE = 'table',
  CHART = 'chart',
  MAP = 'map',
  NETWORK = 'network',
}

export enum MetricUnit {
  PERCENTAGE = 'percentage',
  COUNT = 'count',
  RATIO = 'ratio',
  INDEX = 'index',
  RATE = 'rate',
  CURRENCY = 'currency',
  AREA = 'area',
  VOLUME = 'volume',
  ENERGY = 'energy',
}

export enum TrendDirection {
  INCREASING = 'increasing',
  DECREASING = 'decreasing',
  STABLE = 'stable',
  FLUCTUATING = 'fluctuating',
  SPIKE = 'spike',
  DROP = 'drop',
}

export enum CorrelationType {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NONE = 'none',
  STRONG = 'strong',
  MODERATE = 'moderate',
  WEAK = 'weak',
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum EventSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

export enum EventType {
  SYSTEM = 'system',
  DATA = 'data',
  SIMULATION = 'simulation',
  ALERT = 'alert',
  USER = 'user',
  SYNC = 'sync',
}

export enum ForecastHorizon {
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year',
}

export enum ForecastAccuracy {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high',
}

export enum TwinRelationship {
  PARENT = 'parent',
  CHILD = 'child',
  SIBLING = 'sibling',
  DEPENDS_ON = 'depends_on',
  FEEDS = 'feeds',
  MONITORS = 'monitors',
  CONTROLS = 'controls',
  SIMULATES = 'simulates',
}

export enum DataRetention {
  DAYS_7 = 'days_7',
  DAYS_30 = 'days_30',
  DAYS_90 = 'days_90',
  DAYS_365 = 'days_365',
  INFINITE = 'infinite',
}

export enum CompressionType {
  NONE = 'none',
  GZIP = 'gzip',
  LZ4 = 'lz4',
  ZSTD = 'zstd',
}

export enum RegionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  RESTRUCTURED = 'restructured',
}

export enum RegionLevel {
  COUNTRY = 'country',
  PROVINCE = 'province',
  DEPARTMENT = 'department',
  COMMUNE = 'commune',
  VILLAGE = 'village',
}

export enum SchoolType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  COMMUNITY = 'community',
  FAITH_BASED = 'faith_based',
  INTERNATIONAL = 'international',
}

export enum SchoolStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CONSTRUCTION = 'construction',
  CLOSED = 'closed',
  MERGED = 'merged',
}

export enum InfrastructureCondition {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor',
  CRITICAL = 'critical',
}

export enum EnergySource {
  GRID = 'grid',
  SOLAR = 'solar',
  GENERATOR = 'generator',
  HYBRID = 'hybrid',
  NONE = 'none',
}

export enum WaterSource {
  MUNICIPAL = 'municipal',
  WELL = 'well',
  RIVER = 'river',
  RAINWATER = 'rainwater',
  NONE = 'none',
}

export enum TransportMode {
  BUS = 'bus',
  MINIBUS = 'minibus',
  WALKING = 'walking',
  BICYCLE = 'bicycle',
  BOAT = 'boat',
  PRIVATE = 'private',
}

export enum BudgetCategory {
  PERSONNEL = 'personnel',
  OPERATIONS = 'operations',
  INFRASTRUCTURE = 'infrastructure',
  EQUIPMENT = 'equipment',
  TRAINING = 'training',
  TECHNOLOGY = 'technology',
  MAINTENANCE = 'maintenance',
  EMERGENCY = 'emergency',
}

export enum SimulationResultStatus {
  SUCCESS = 'success',
  PARTIAL = 'partial',
  FAILED = 'failed',
  TIMEOUT = 'timeout',
}

export enum ScenarioOutcomeType {
  BENEFIT = 'benefit',
  COST = 'cost',
  RISK = 'risk',
  OPPORTUNITY = 'opportunity',
  THREAT = 'threat',
}

export enum TwinAuditAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  SYNC = 'sync',
  SIMULATE = 'simulate',
  EXPORT = 'export',
  IMPORT = 'import',
}

export enum PermissionLevel {
  READ = 'read',
  WRITE = 'write',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export enum ExportFormat {
  CSV = 'csv',
  EXCEL = 'excel',
  PDF = 'pdf',
  JSON = 'json',
  GEOJSON = 'geojson',
}

export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  WEBHOOK = 'webhook',
  DASHBOARD = 'dashboard',
}

export enum TwinSyncStatus {
  SYNCED = 'synced',
  SYNCING = 'syncing',
  OUT_OF_SYNC = 'out_of_sync',
  ERROR = 'error',
  PENDING = 'pending',
}

export enum PopulationTrend {
  GROWING = 'growing',
  DECLINING = 'declining',
  STABLE = 'stable',
  SHIFTING = 'shifting',
}

export enum CapacityUtilization {
  UNDER_UTILIZED = 'under_utilized',
  OPTIMAL = 'optimal',
  OVER_UTILIZED = 'over_utilized',
  CRITICAL = 'critical',
}

export enum TwinLifecycle {
  DESIGN = 'design',
  BUILD = 'build',
  TEST = 'test',
  DEPLOY = 'deploy',
  OPERATE = 'operate',
  OPTIMIZE = 'optimize',
  RETIRE = 'retire',
}

export enum SimulationPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum RegionClimate {
  TROPICAL = 'tropical',
  SAHEL = 'sahel',
  EQUATORIAL = 'equatorial',
  COASTAL = 'coastal',
  MOUNTAINOUS = 'mountainous',
}

export enum SchoolInfrastructure {
  BUILDING = 'building',
  CLASSROOM = 'classroom',
  LABORATORY = 'laboratory',
  LIBRARY = 'library',
  COMPUTER_ROOM = 'computer_room',
  SPORTS_FACILITY = 'sports_facility',
  CAFETERIA = 'cafeteria',
  DORMITORY = 'dormitory',
  ADMINISTRATION = 'administration',
}

export interface NationalDigitalTwin {
  id: string;
  name: string;
  code: string;
  description: string;
  country: string;
  version: string;
  status: TwinStatus;
  lifecycle: TwinLifecycle;
  total_regions: number;
  total_departments: number;
  total_districts: number;
  total_schools: number;
  total_students: number;
  total_teachers: number;
  sync_mode: SyncMode;
  last_sync_at: string | null;
  data_retention: DataRetention;
  config: TwinConfig;
  metrics: TwinMetrics;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TwinRegion {
  id: string;
  national_twin_id: string;
  name: string;
  code: string;
  level: RegionLevel;
  parent_id: string | null;
  latitude: number;
  longitude: number;
  area_km2: number;
  population: number;
  school_age_population: number;
  total_schools: number;
  total_students: number;
  total_teachers: number;
  department_count: number;
  climate: RegionClimate;
  urban_percentage: number;
  literacy_rate: number;
  enrollment_rate: number;
  status: RegionStatus;
  sync_status: TwinSyncStatus;
  last_sync_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TwinSchool {
  id: string;
  region_id: string;
  department_id: string | null;
  name: string;
  code: string;
  type: SchoolType;
  status: SchoolStatus;
  latitude: number;
  longitude: number;
  address: string;
  enrollment: number;
  capacity: number;
  utilization_rate: number;
  teacher_count: number;
  student_teacher_ratio: number;
  infrastructure: TwinInfrastructure[];
  population: TwinPopulation[];
  performance_score: number;
  attendance_rate: number;
  graduation_rate: number;
  dropout_rate: number;
  energy_source: EnergySource;
  water_source: WaterSource;
  internet_access: boolean;
  has_library: boolean;
  has_laboratory: boolean;
  has_computer_room: boolean;
  has_sports_facility: boolean;
  sync_status: TwinSyncStatus;
  last_sync_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TwinInfrastructure {
  id: string;
  school_id: string;
  name: string;
  type: SchoolInfrastructure;
  condition: InfrastructureCondition;
  area_m2: number;
  capacity: number;
  current_usage: number;
  utilization_rate: number;
  year_built: number;
  last_renovation: string | null;
  estimated_repair_cost: number;
  condition_score: number;
  energy_usage_kwh: number;
  water_usage_liters: number;
  maintenance_cost_annual: number;
  photos: string[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TwinPopulation {
  id: string;
  entity_id: string;
  entity_type: string;
  population_type: PopulationType;
  count: number;
  gender_male: number;
  gender_female: number;
  age_distribution: Record<string, number>;
  trend: PopulationTrend;
  growth_rate: number;
  year: number;
  semester: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Simulation {
  id: string;
  name: string;
  description: string;
  type: SimulationType;
  scenario_type: ScenarioType;
  status: SimulationStatus;
  priority: SimulationPriority;
  twin_id: string;
  model_type: ModelType;
  parameters: SimulationParameter[];
  input_data: Record<string, unknown>;
  output_data: Record<string, unknown> | null;
  result: SimulationResult | null;
  started_at: string | null;
  completed_at: string | null;
  duration_seconds: number | null;
  progress_percentage: number;
  error_message: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SimulationParameter {
  name: string;
  type: string;
  value: number | string | boolean;
  min_value: number | null;
  max_value: number | null;
  default_value: number | string | boolean;
  description: string;
}

export interface SimulationResult {
  id: string;
  simulation_id: string;
  status: SimulationResultStatus;
  output_metrics: SimulationMetric[];
  predictions: SimulationPrediction[];
  comparisons: SimulationComparison[];
  confidence_score: number;
  execution_time_ms: number;
  model_accuracy: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface SimulationMetric {
  name: string;
  value: number;
  unit: MetricUnit;
  baseline_value: number;
  change: number;
  change_percentage: number;
  trend: TrendDirection;
}

export interface SimulationPrediction {
  period: string;
  value: number;
  lower_bound: number;
  upper_bound: number;
  confidence: number;
}

export interface SimulationComparison {
  scenario_a: string;
  scenario_b: string;
  metric: string;
  value_a: number;
  value_b: number;
  difference: number;
  percentage_diff: number;
  significance: boolean;
}

export interface AIScenario {
  id: string;
  name: string;
  description: string;
  type: ScenarioType;
  status: ScenarioStatus;
  twin_id: string;
  ai_model: ModelType;
  training_data_start: string;
  training_data_end: string;
  features: string[];
  hyperparameters: Record<string, unknown>;
  accuracy_score: number | null;
  outcomes: ScenarioOutcome[];
  assumptions: string[];
  constraints: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ScenarioOutcome {
  id: string;
  scenario_id: string;
  name: string;
  type: ScenarioOutcomeType;
  description: string;
  probability: number;
  impact_score: number;
  affected_entities: string[];
  time_horizon: string;
  metric_changes: Record<string, number>;
  recommendations: string[];
  created_at: string;
  updated_at: string;
}

export interface BudgetSimulation {
  id: string;
  name: string;
  description: string;
  twin_id: string;
  fiscal_year: number;
  total_budget: number;
  allocations: BudgetAllocation[];
  scenarios: BudgetScenario[];
  optimization_target: string;
  constraints: string[];
  status: SimulationStatus;
  result: BudgetSimulationResult | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface BudgetAllocation {
  id: string;
  simulation_id: string;
  category: BudgetCategory;
  allocated_amount: number;
  executed_amount: number;
  execution_rate: number;
  priority: number;
  justification: string;
  region_id: string | null;
  school_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface BudgetScenario {
  id: string;
  simulation_id: string;
  name: string;
  description: string;
  budget_multiplier: number;
  allocations: BudgetAllocation[];
  expected_outcomes: Record<string, number>;
  risk_assessment: RiskLevel;
  created_at: string;
  updated_at: string;
}

export interface BudgetSimulationResult {
  id: string;
  simulation_id: string;
  optimal_scenario: string;
  total_savings: number;
  efficiency_gain: number;
  impact_scores: Record<string, number>;
  recommendations: string[];
  created_at: string;
  updated_at: string;
}

export interface DemographicSimulation {
  id: string;
  name: string;
  description: string;
  twin_id: string;
  projection_years: number;
  start_year: number;
  population_projections: DemographicProjection[];
  migration_patterns: MigrationPattern[];
  urbanization_rate: number;
  birth_rate_projection: number;
  mortality_rate_projection: number;
  school_age_projection: number;
  model_type: ModelType;
  confidence_level: number;
  status: SimulationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface DemographicProjection {
  year: number;
  total_population: number;
  school_age_population: number;
  urban_population: number;
  rural_population: number;
  growth_rate: number;
  confidence_low: number;
  confidence_high: number;
}

export interface MigrationPattern {
  origin_region_id: string;
  destination_region_id: string;
  migration_rate: number;
  primary_cause: string;
  impact_on_enrollment: number;
}

export interface CapacityPlan {
  id: string;
  name: string;
  description: string;
  twin_id: string;
  planning_horizon_years: number;
  start_year: number;
  capacity_needs: CapacityNeed[];
  infrastructure_gaps: InfrastructureGap[];
  investment_requirements: InvestmentRequirement[];
  phasing_plan: PhasingPhase[];
  status: SimulationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CapacityNeed {
  id: string;
  plan_id: string;
  capacity_type: CapacityType;
  current_capacity: number;
  projected_need: number;
  gap: number;
  region_id: string | null;
  priority: number;
  estimated_cost: number;
  timeline_months: number;
  created_at: string;
  updated_at: string;
}

export interface InfrastructureGap {
  id: string;
  plan_id: string;
  infrastructure_type: SchoolInfrastructure;
  current_count: number;
  required_count: number;
  gap: number;
  region_id: string | null;
  condition_distribution: Record<string, number>;
  estimated_cost: number;
  created_at: string;
  updated_at: string;
}

export interface InvestmentRequirement {
  id: string;
  plan_id: string;
  category: string;
  description: string;
  amount: number;
  currency: string;
  funding_source: string;
  year: number;
  priority: number;
  roi_estimate: number;
  created_at: string;
  updated_at: string;
}

export interface PhasingPhase {
  id: string;
  plan_id: string;
  phase_number: number;
  name: string;
  start_year: number;
  end_year: number;
  activities: string[];
  budget: number;
  milestones: string[];
  status: SimulationStatus;
  created_at: string;
  updated_at: string;
}

export interface CapacityForecast {
  id: string;
  capacity_type: CapacityType;
  region_id: string | null;
  current_capacity: number;
  projected_capacity: number;
  utilization_rate: number;
  growth_rate: number;
  confidence: ForecastAccuracy;
  horizon: ForecastHorizon;
  created_at: string;
  updated_at: string;
}

export interface TwinConfig {
  id: string;
  twin_id: string;
  sync_interval_minutes: number;
  data_retention_days: number;
  max_simultaneous_simulations: number;
  auto_sync_enabled: boolean;
  alert_thresholds: Record<string, number>;
  visualization_preferences: Record<string, unknown>;
  export_formats: ExportFormat[];
  notification_channels: NotificationChannel[];
  created_at: string;
  updated_at: string;
}

export interface TwinMetrics {
  id: string;
  twin_id: string;
  total_entities: number;
  synced_entities: number;
  sync_percentage: number;
  total_simulations: number;
  active_simulations: number;
  completed_simulations: number;
  average_simulation_time_seconds: number;
  data_freshness_hours: number;
  storage_used_gb: number;
  api_calls_today: number;
  accuracy_score: number;
  last_optimization: string | null;
  created_at: string;
  updated_at: string;
}

export interface TwinAudit {
  id: string;
  action: TwinAuditAction;
  entity_type: string;
  entity_id: string;
  user_id: string;
  changes: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  created_at: string;
  updated_at: string;
}

export interface TwinSnapshot {
  id: string;
  twin_id: string;
  timestamp: string;
  state: TwinStatus;
  metrics: TwinMetric[];
  metadata: Record<string, unknown>;
  version: number;
  checksum: string;
  created_at: string;
  updated_at: string;
}

export interface TwinMetric {
  id: string;
  twin_id: string;
  name: string;
  value: number;
  unit: MetricUnit;
  trend: TrendDirection;
  threshold_min: number | null;
  threshold_max: number | null;
  timestamp: string;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface TwinEvent {
  id: string;
  twin_id: string;
  type: EventType;
  severity: EventSeverity;
  title: string;
  message: string;
  source: string;
  data: Record<string, unknown>;
  acknowledged: boolean;
  acknowledged_by: string | null;
  acknowledged_at: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TwinHistory {
  id: string;
  twin_id: string;
  snapshots: TwinSnapshot[];
  start_time: string;
  end_time: string;
  total_snapshots: number;
  interval: string;
  created_at: string;
  updated_at: string;
}

export interface TwinRelationshipEdge {
  id: string;
  source_twin_id: string;
  target_twin_id: string;
  relationship: TwinRelationship;
  strength: number;
  description: string;
  bidirectional: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface TwinVisualization {
  id: string;
  twin_id: string;
  name: string;
  type: VisualizationType;
  config: Record<string, unknown>;
  data_source: string;
  refresh_interval: number;
  is_public: boolean;
  access_level: PermissionLevel;
  created_at: string;
  updated_at: string;
}

export interface TwinDataLayer {
  id: string;
  twin_id: string;
  name: string;
  data_type: DataType;
  source: string;
  format: string;
  refresh_interval: number;
  last_updated: string | null;
  is_active: boolean;
  compression: CompressionType;
  retention: DataRetention;
  created_at: string;
  updated_at: string;
}

export interface TwinAlert {
  id: string;
  twin_id: string;
  title: string;
  message: string;
  severity: EventSeverity;
  source: string;
  metric_name: string;
  threshold_value: number;
  actual_value: number;
  acknowledged: boolean;
  acknowledged_by: string | null;
  acknowledged_at: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TwinOptimization {
  id: string;
  twin_id: string;
  name: string;
  description: string;
  optimization_type: string;
  target_metric: string;
  target_value: number;
  current_value: number;
  improvement_percentage: number;
  recommendations: string[];
  status: SimulationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TwinExport {
  id: string;
  twin_id: string;
  format: ExportFormat;
  data_scope: string[];
  filters: Record<string, unknown>;
  file_url: string;
  file_size: number;
  status: SimulationStatus;
  requested_by: string;
  created_at: string;
  updated_at: string;
}

export interface TwinUser {
  id: string;
  user_id: string;
  twin_id: string;
  permission_level: PermissionLevel;
  accessible_regions: string[];
  accessible_schools: string[];
  notification_channels: NotificationChannel[];
  last_access_at: string;
  created_at: string;
  updated_at: string;
}

export interface TwinPermission {
  id: string;
  user_id: string;
  twin_id: string;
  resource: string;
  action: string;
  granted: boolean;
  conditions: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface TwinIntegration {
  id: string;
  twin_id: string;
  name: string;
  source_system: string;
  data_types: DataType[];
  sync_mode: SyncMode;
  frequency_minutes: number;
  status: TwinSyncStatus;
  last_sync_at: string | null;
  error_count: number;
  created_at: string;
  updated_at: string;
}

export interface TwinPerformanceLog {
  id: string;
  twin_id: string;
  operation: string;
  duration_ms: number;
  memory_used_mb: number;
  cpu_usage_percentage: number;
  success: boolean;
  error_message: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface TwinBackup {
  id: string;
  twin_id: string;
  name: string;
  description: string;
  file_url: string;
  file_size: number;
  checksum: string;
  status: SimulationStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TwinRestore {
  id: string;
  twin_id: string;
  backup_id: string;
  status: SimulationStatus;
  started_at: string;
  completed_at: string | null;
  restored_by: string;
  created_at: string;
  updated_at: string;
}

export interface RegionComparison {
  id: string;
  region_a_id: string;
  region_b_id: string;
  metrics: ComparisonMetric[];
  overall_score_a: number;
  overall_score_b: number;
  winner: string;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface ComparisonMetric {
  name: string;
  value_a: number;
  value_b: number;
  difference: number;
  percentage_diff: number;
  unit: MetricUnit;
  winner: string;
}

export interface TwinEnergyConsumption {
  id: string;
  school_id: string;
  building_type: string;
  energy_source: EnergySource;
  monthly_kwh: number;
  cost_per_kwh: number;
  monthly_cost: number;
  efficiency_score: number;
  renewable_percentage: number;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface TwinWaterConsumption {
  id: string;
  school_id: string;
  water_source: WaterSource;
  monthly_liters: number;
  cost_per_liter: number;
  monthly_cost: number;
  efficiency_score: number;
  leakage_detected: boolean;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface TwinTransportRoute {
  id: string;
  route_name: string;
  transport_mode: TransportMode;
  distance_km: number;
  estimated_time_minutes: number;
  student_count: number;
  vehicle_count: number;
  cost_per_student: number;
  stops: TransportStop[];
  status: TwinStatus;
  created_at: string;
  updated_at: string;
}

export interface TransportStop {
  name: string;
  latitude: number;
  longitude: number;
  students_served: number;
  average_wait_minutes: number;
}

export interface TwinAcademicPerformance {
  id: string;
  school_id: string;
  subject: string;
  grade_level: number;
  average_score: number;
  pass_rate: number;
  top_score: number;
  bottom_score: number;
  standard_deviation: number;
  trend: TrendDirection;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface TwinAttendancePattern {
  id: string;
  school_id: string;
  month: number;
  year: number;
  average_attendance_rate: number;
  absence_rate: number;
  lateness_rate: number;
  excused_absence_rate: number;
  unexcused_absence_rate: number;
  trend: TrendDirection;
  created_at: string;
  updated_at: string;
}

export interface TwinBudgetBreakdown {
  id: string;
  school_id: string;
  fiscal_year: number;
  total_budget: number;
  personnel_budget: number;
  operations_budget: number;
  infrastructure_budget: number;
  equipment_budget: number;
  execution_rate: number;
  per_student_cost: number;
  funding_sources: BudgetFundingSource[];
  created_at: string;
  updated_at: string;
}

export interface BudgetFundingSource {
  source: string;
  amount: number;
  percentage: number;
}

export interface TwinDisasterRisk {
  id: string;
  region_id: string;
  school_id: string | null;
  risk_type: string;
  probability: number;
  potential_impact: number;
  vulnerability_score: number;
  exposure_score: number;
  adaptive_capacity: number;
  overall_risk: RiskLevel;
  mitigation_measures: string[];
  last_assessment: string;
  created_at: string;
  updated_at: string;
}

export interface TwinEnvironmentalMetric {
  id: string;
  school_id: string;
  metric_type: string;
  value: number;
  unit: string;
  benchmark_value: number;
  status: string;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface TwinConstructionProject {
  id: string;
  school_id: string;
  project_name: string;
  description: string;
  project_type: string;
  estimated_cost: number;
  actual_cost: number;
  start_date: string;
  expected_end_date: string;
  actual_end_date: string | null;
  progress_percentage: number;
  contractor: string;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface TwinMaintenanceSchedule {
  id: string;
  school_id: string;
  infrastructure_type: SchoolInfrastructure;
  maintenance_type: string;
  frequency: string;
  last_maintenance: string;
  next_maintenance: string;
  estimated_cost: number;
  priority: SimulationPriority;
  status: TwinStatus;
  created_at: string;
  updated_at: string;
}

export interface TwinStudentProgress {
  id: string;
  school_id: string;
  grade_level: number;
  cohort_size: number;
  promotion_rate: number;
  repetition_rate: number;
  dropout_rate: number;
  average_score: number;
  gender_gap: number;
  socioeconomic_gap: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface TwinTeacherProfile {
  id: string;
  school_id: string;
  qualification_level: string;
  years_experience: number;
  subject_specialization: string;
  training_hours: number;
  performance_score: number;
  retention_rate: number;
  workload_hours: number;
  satisfaction_score: number;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface TwinCommunityIndicator {
  id: string;
  region_id: string;
  indicator_name: string;
  value: number;
  unit: string;
  national_average: number;
  trend: TrendDirection;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface TwinPolicySimulation {
  id: string;
  name: string;
  description: string;
  policy_type: string;
  affected_regions: string[];
  parameters: SimulationParameter[];
  expected_outcomes: Record<string, number>;
  budget_impact: number;
  timeline_months: number;
  status: SimulationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TwinCapacityModel {
  id: string;
  name: string;
  model_type: ModelType;
  training_data: string[];
  features: string[];
  accuracy: number;
  last_trained: string;
  status: ModelStatus;
  predictions: CapacityPrediction[];
  created_at: string;
  updated_at: string;
}

export interface CapacityPrediction {
  entity_id: string;
  entity_type: string;
  current_capacity: number;
  predicted_capacity: number;
  confidence: number;
  horizon: string;
}

export interface TwinDemographicModel {
  id: string;
  name: string;
  region_id: string;
  model_type: ModelType;
  parameters: Record<string, unknown>;
  training_period: string;
  accuracy: number;
  projections: DemographicProjection[];
  status: ModelStatus;
  created_at: string;
  updated_at: string;
}

export interface TwinInfrastructureModel {
  id: string;
  name: string;
  infrastructure_type: SchoolInfrastructure;
  model_type: ModelType;
  features: string[];
  accuracy: number;
  predictions: InfrastructurePrediction[];
  status: ModelStatus;
  created_at: string;
  updated_at: string;
}

export interface InfrastructurePrediction {
  region_id: string;
  current_count: number;
  predicted_count: number;
  gap: number;
  investment_needed: number;
  year: number;
}

export interface TwinOptimizationResult {
  id: string;
  optimization_id: string;
  resource_type: string;
  current_allocation: number;
  optimized_allocation: number;
  improvement_percentage: number;
  savings: number;
  impact_assessment: string;
  created_at: string;
  updated_at: string;
}

export interface TwinScenarioComparison {
  id: string;
  scenario_a_id: string;
  scenario_b_id: string;
  metrics: ComparisonMetric[];
  overall_winner: string;
  recommendation: string;
  created_at: string;
  updated_at: string;
}

export interface TwinDataQuality {
  id: string;
  twin_id: string;
  data_type: DataType;
  completeness: number;
  accuracy: number;
  timeliness: number;
  consistency: number;
  overall_score: number;
  issues: DataQualityIssue[];
  last_assessment: string;
  created_at: string;
  updated_at: string;
}

export interface DataQualityIssue {
  issue_type: string;
  description: string;
  affected_records: number;
  severity: RiskLevel;
  resolution_status: string;
}

export interface TwinSimulationTemplate {
  id: string;
  name: string;
  description: string;
  simulation_type: SimulationType;
  default_parameters: SimulationParameter[];
  use_cases: string[];
  expected_duration_minutes: number;
  required_data: string[];
  created_at: string;
  updated_at: string;
}

export interface TwinModelPerformance {
  id: string;
  model_id: string;
  model_type: ModelType;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  training_time_ms: number;
  inference_time_ms: number;
  data_points_used: number;
  last_evaluated: string;
  created_at: string;
  updated_at: string;
}

export interface TwinGeospatialLayer {
  id: string;
  twin_id: string;
  layer_name: string;
  layer_type: string;
  data_source: string;
  refresh_interval: number;
  style: Record<string, unknown>;
  is_visible: boolean;
  is_base_layer: boolean;
  created_at: string;
  updated_at: string;
}

export interface TwinSyncLog {
  id: string;
  twin_id: string;
  sync_type: string;
  records_synced: number;
  sync_duration_ms: number;
  errors_count: number;
  status: TwinSyncStatus;
  started_at: string;
  completed_at: string | null;
  error_details: string | null;
  created_at: string;
  updated_at: string;
}

export interface TwinCapacityUtilization {
  id: string;
  school_id: string;
  capacity_type: CapacityType;
  total_capacity: number;
  current_usage: number;
  utilization_rate: number;
  status: CapacityUtilization;
  peak_usage: number;
  average_usage: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface TwinPredictiveMaintenance {
  id: string;
  school_id: string;
  infrastructure_type: SchoolInfrastructure;
  predicted_failure_date: string;
  confidence: number;
  maintenance_type: string;
  estimated_cost: number;
  urgency: SimulationPriority;
  recommended_date: string;
  status: TwinStatus;
  created_at: string;
  updated_at: string;
}

export interface TwinInvestmentAnalysis {
  id: string;
  investment_type: string;
  region_id: string;
  amount: number;
  expected_return: number;
  payback_period_years: number;
  roi_percentage: number;
  risk_level: RiskLevel;
  impact_score: number;
  priority: SimulationPriority;
  created_at: string;
  updated_at: string;
}

export interface TwinBenchmark {
  id: string;
  benchmark_name: string;
  description: string;
  metric_name: string;
  national_average: number;
  regional_average: number;
  best_performer: number;
  worst_performer: number;
  year: number;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface TwinAlertRule {
  id: string;
  twin_id: string;
  rule_name: string;
  metric_name: string;
  condition: string;
  threshold_value: number;
  severity: EventSeverity;
  notification_channels: NotificationChannel[];
  recipients: string[];
  cooldown_minutes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TwinDataLake {
  id: string;
  name: string;
  description: string;
  total_records: number;
  total_size_gb: number;
  data_sources: string[];
  retention_policy: DataRetention;
  compression: CompressionType;
  last_updated: string;
  created_at: string;
  updated_at: string;
}

export interface TwinMLPipeline {
  id: string;
  name: string;
  description: string;
  steps: MLPipelineStep[];
  model_type: ModelType;
  training_status: ModelStatus;
  last_run: string;
  next_scheduled: string;
  created_at: string;
  updated_at: string;
}

export interface MLPipelineStep {
  step_number: number;
  name: string;
  type: string;
  parameters: Record<string, unknown>;
  status: string;
}

export interface TwinFeatureStore {
  id: string;
  feature_name: string;
  feature_type: string;
  description: string;
  data_type: DataType;
  source: string;
  update_frequency: string;
  last_updated: string;
  statistics: Record<string, number>;
  created_at: string;
  updated_at: string;
}

export interface TwinDashboard {
  id: string;
  name: string;
  description: string;
  twin_id: string;
  layout: Record<string, unknown>;
  widgets: DashboardWidgetConfig[];
  refresh_interval: number;
  is_public: boolean;
  access_level: PermissionLevel;
  created_at: string;
  updated_at: string;
}

export interface DashboardWidgetConfig {
  id: string;
  widget_type: string;
  title: string;
  data_source: string;
  config: Record<string, unknown>;
  position: Record<string, unknown>;
  size: Record<string, unknown>;
}

export interface TwinReport {
  id: string;
  name: string;
  description: string;
  twin_id: string;
  report_type: string;
  period_start: string;
  period_end: string;
  sections: TwinReportSection[];
  generated_by: string;
  generated_at: string;
  file_url: string | null;
  status: TwinStatus;
  created_at: string;
  updated_at: string;
}

export interface TwinReportSection {
  title: string;
  content: string;
  charts: string[];
  tables: string[];
}

export interface TwinSimulationQueue {
  id: string;
  simulation_id: string;
  priority: SimulationPriority;
  queued_at: string;
  started_at: string | null;
  estimated_duration_seconds: number;
  position_in_queue: number;
  status: SimulationStatus;
  created_at: string;
  updated_at: string;
}

export interface TwinModelRegistry {
  id: string;
  model_name: string;
  model_type: ModelType;
  version: string;
  description: string;
  framework: string;
  file_path: string;
  file_size_bytes: number;
  checksum: string;
  status: ModelStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TwinDataPipeline {
  id: string;
  name: string;
  description: string;
  source_system: string;
  target_twin_id: string;
  data_types: DataType[];
  schedule: string;
  transformation_rules: Record<string, unknown>;
  last_run: string;
  status: TwinSyncStatus;
  error_count: number;
  created_at: string;
  updated_at: string;
}

export interface TwinVisualizationTemplate {
  id: string;
  name: string;
  description: string;
  visualization_type: VisualizationType;
  config_template: Record<string, unknown>;
  data_requirements: string[];
  use_cases: string[];
  created_at: string;
  updated_at: string;
}

export interface TwinSimulationHistory {
  id: string;
  simulation_id: string;
  version: number;
  parameters: SimulationParameter[];
  result: SimulationResult | null;
  triggered_by: string;
  executed_at: string;
  duration_seconds: number;
  status: SimulationStatus;
  created_at: string;
  updated_at: string;
}

export interface TwinCapacityPlanVersion {
  id: string;
  plan_id: string;
  version: number;
  changes: string[];
  approved_by: string;
  approved_at: string;
  status: SimulationStatus;
  created_at: string;
  updated_at: string;
}

export interface TwinRegionComparison {
  id: string;
  region_a_id: string;
  region_b_id: string;
  metrics: ComparisonMetric[];
  overall_winner: string;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface TwinSchoolRanking {
  id: string;
  ranking_name: string;
  region_id: string | null;
  education_level: string;
  metric: string;
  year: number;
  rankings: SchoolRankingEntry[];
  created_at: string;
  updated_at: string;
}

export interface SchoolRankingEntry {
  rank: number;
  school_id: string;
  school_name: string;
  value: number;
  change_from_previous: number;
}

export interface TwinInvestmentScenario {
  id: string;
  name: string;
  description: string;
  total_investment: number;
  allocation: Record<string, number>;
  expected_returns: Record<string, number>;
  payback_period_years: number;
  risk_assessment: RiskLevel;
  sensitivity_analysis: SensitivityParameter[];
  status: SimulationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SensitivityParameter {
  parameter: string;
  base_value: number;
  low_value: number;
  high_value: number;
  impact: number;
}

export interface TwinAuditTrail {
  id: string;
  twin_id: string;
  entity_type: string;
  entity_id: string;
  action: TwinAuditAction;
  user_id: string;
  before_state: Record<string, unknown>;
  after_state: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  created_at: string;
  updated_at: string;
}

export enum TwinDataFormat {
  JSON = 'json',
  CSV = 'csv',
  XML = 'xml',
  PARQUET = 'parquet',
  AVRO = 'avro',
}

export enum TwinVisualizationMode {
  DASHBOARD = 'dashboard',
  EXPLORER = 'explorer',
  COMPARE = 'compare',
  TIMELINE = 'timeline',
  GEO = 'geo',
}

export enum TwinClusterType {
  PERFORMANCE = 'performance',
  GEOGRAPHIC = 'geographic',
  DEMOGRAPHIC = 'demographic',
  INFRASTRUCTURE = 'infrastructure',
}

export enum TwinForecastMethod {
  MOVING_AVERAGE = 'moving_average',
  EXPONENTIAL_SMOOTHING = 'exponential_smoothing',
  PROPHET = 'prophet',
  ARIMA = 'arima',
  LINEAR = 'linear',
}

export enum TwinInfrastructureStatus {
  PLANNED = 'planned',
  UNDER_CONSTRUCTION = 'under_construction',
  OPERATIONAL = 'operational',
  MAINTENANCE = 'maintenance',
  DECOMMISSIONED = 'decommissioned',
}

export enum TwinComparisonType {
  YEAR_OVER_YEAR = 'year_over_year',
  REGION_VS_REGION = 'region_vs_region',
  SCHOOL_VS_BENCHMARK = 'school_vs_benchmark',
  ACTUAL_VS_TARGET = 'actual_vs_target',
}

export enum TwinDataValidationStatus {
  VALID = 'valid',
  INVALID = 'invalid',
  PARTIAL = 'partial',
  PENDING = 'pending',
}

export enum TwinExportStatus {
  QUEUED = 'queued',
  GENERATING = 'generating',
  READY = 'ready',
  FAILED = 'failed',
}

export interface TwinDataExport {
  id: string;
  twin_id: string;
  export_name: string;
  format: TwinDataFormat;
  data_scope: string[];
  filters: Record<string, unknown>;
  record_count: number;
  file_size_bytes: number;
  file_url: string | null;
  status: TwinExportStatus;
  requested_by: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface TwinVisualizationPanel {
  id: string;
  dashboard_id: string;
  panel_name: string;
  panel_type: string;
  query: string;
  config: Record<string, unknown>;
  position: Record<string, unknown>;
  refresh_interval: number;
  created_at: string;
  updated_at: string;
}

export interface TwinClusterAssignment {
  id: string;
  entity_id: string;
  entity_type: string;
  cluster_type: TwinClusterType;
  cluster_id: string;
  distance_to_center: number;
  assigned_at: string;
  created_at: string;
  updated_at: string;
}

export interface TwinForecastResult {
  id: string;
  forecast_id: string;
  method: TwinForecastMethod;
  target_metric: string;
  predictions: ForecastDataPoint[];
  accuracy_score: number;
  confidence_interval: number;
  created_at: string;
  updated_at: string;
}

export interface ForecastDataPoint {
  period: string;
  predicted_value: number;
  lower_bound: number;
  upper_bound: number;
}

export interface TwinInfrastructureAsset {
  id: string;
  school_id: string;
  asset_name: string;
  asset_type: SchoolInfrastructure;
  status: TwinInfrastructureStatus;
  purchase_date: string;
  purchase_cost: number;
  current_value: number;
  expected_lifespan_years: number;
  remaining_lifespan_years: number;
  last_inspection: string;
  next_inspection: string;
  created_at: string;
  updated_at: string;
}

export interface TwinComparisonResult {
  id: string;
  comparison_type: TwinComparisonType;
  entity_a_id: string;
  entity_b_id: string;
  metrics: ComparisonMetric[];
  overall_difference: number;
  statistical_significance: number;
  created_at: string;
  updated_at: string;
}

export interface TwinDataValidation {
  id: string;
  twin_id: string;
  data_type: DataType;
  validation_date: string;
  total_records: number;
  valid_records: number;
  invalid_records: number;
  validation_rate: number;
  issues: DataValidationIssue[];
  status: TwinDataValidationStatus;
  created_at: string;
  updated_at: string;
}

export interface DataValidationIssue {
  record_id: string;
  field: string;
  issue_type: string;
  expected_value: string;
  actual_value: string;
  severity: RiskLevel;
}

export interface TwinSimulationOutput {
  id: string;
  simulation_id: string;
  output_type: string;
  metric_name: string;
  baseline_value: number;
  simulated_value: number;
  change: number;
  change_percentage: number;
  confidence: number;
  created_at: string;
  updated_at: string;
}

export interface TwinDataLineage {
  id: string;
  source_system: string;
  target_system: string;
  data_entity: string;
  transformation: string;
  last_synced: string;
  record_count: number;
  status: TwinSyncStatus;
  created_at: string;
  updated_at: string;
}

export interface TwinRegionMetrics {
  id: string;
  region_id: string;
  metric_name: string;
  metric_value: number;
  national_rank: number;
  percentile: number;
  trend: TrendDirection;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface TwinSchoolBenchmark {
  id: string;
  school_id: string;
  benchmark_name: string;
  benchmark_value: number;
  school_value: number;
  difference: number;
  percentile_rank: number;
  category: string;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface TwinDemographicShift {
  id: string;
  region_id: string;
  shift_type: PopulationTrend;
  description: string;
  magnitude: number;
  start_year: number;
  end_year: number;
  impact_on_enrollment: number;
  created_at: string;
  updated_at: string;
}

export interface TwinCapacityConstraint {
  id: string;
  entity_id: string;
  entity_type: string;
  constraint_type: CapacityType;
  current_value: number;
  max_value: number;
  utilization_percentage: number;
  constraint_binding: boolean;
  relaxation_cost: number;
  created_at: string;
  updated_at: string;
}

export interface TwinOptimizationObjective {
  id: string;
  optimization_id: string;
  objective_name: string;
  objective_type: string;
  target_value: number;
  weight: number;
  achieved: boolean;
  created_at: string;
  updated_at: string;
}

export interface TwinSensitivityResult {
  id: string;
  simulation_id: string;
  parameter_name: string;
  base_value: number;
  low_value: number;
  high_value: number;
  impact_low: number;
  impact_high: number;
  elasticity: number;
  created_at: string;
  updated_at: string;
}

export interface TwinDataPipelineLog {
  id: string;
  pipeline_id: string;
  run_date: string;
  records_processed: number;
  records_inserted: number;
  records_updated: number;
  records_deleted: number;
  duration_seconds: number;
  status: TwinSyncStatus;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface TwinPerformanceIndicator {
  id: string;
  indicator_name: string;
  indicator_value: number;
  target_value: number;
  unit: string;
  status: string;
  trend: TrendDirection;
  last_updated: string;
  created_at: string;
  updated_at: string;
}

export interface TwinUserSession {
  id: string;
  user_id: string;
  twin_id: string;
  session_start: string;
  session_end: string | null;
  actions_performed: number;
  views_generated: number;
  exports_created: number;
  created_at: string;
  updated_at: string;
}

export interface TwinDataCatalogEntry {
  id: string;
  catalog_name: string;
  description: string;
  data_type: DataType;
  owner: string;
  schema: Record<string, unknown>;
  tags: string[];
  access_level: PermissionLevel;
  quality_score: number;
  last_updated: string;
  created_at: string;
  updated_at: string;
}

export interface TwinModelVersion {
  id: string;
  model_id: string;
  version: string;
  changelog: string;
  accuracy_change: number;
  is_current: boolean;
  deployed_at: string;
  created_at: string;
  updated_at: string;
}

export interface TwinGeospatialTile {
  id: string;
  tile_id: string;
  zoom_level: number;
  x_coord: number;
  y_coord: number;
  data_type: string;
  tile_size_bytes: number;
  last_generated: string;
  created_at: string;
  updated_at: string;
}

export interface TwinSimulationReport {
  id: string;
  simulation_id: string;
  report_name: string;
  summary: string;
  key_findings: string[];
  recommendations: string[];
  charts: string[];
  generated_at: string;
  generated_by: string;
  status: TwinStatus;
  created_at: string;
  updated_at: string;
}

export interface TwinDataAnomaly {
  id: string;
  twin_id: string;
  data_type: DataType;
  anomaly_type: string;
  detected_at: string;
  affected_records: number;
  severity: RiskLevel;
  description: string;
  resolved: boolean;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TwinCapacityScenario {
  id: string;
  scenario_name: string;
  description: string;
  capacity_type: CapacityType;
  demand_projection: number;
  supply_projection: number;
  gap: number;
  investment_needed: number;
  timeline_years: number;
  status: SimulationStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TwinEnergyModel {
  id: string;
  school_id: string;
  model_type: ModelType;
  current_consumption_kwh: number;
  predicted_consumption_kwh: number;
  efficiency_score: number;
  renewable_potential: number;
  savings_opportunity: number;
  status: ModelStatus;
  created_at: string;
  updated_at: string;
}

export interface TwinTransportOptimization {
  id: string;
  route_id: string;
  optimization_type: string;
  current_cost: number;
  optimized_cost: number;
  savings: number;
  time_reduction_minutes: number;
  students_benefited: number;
  status: SimulationStatus;
  created_at: string;
  updated_at: string;
}

export interface TwinBudgetOptimization {
  id: string;
  school_id: string;
  fiscal_year: number;
  current_budget: number;
  optimized_budget: number;
  savings: number;
  reallocation_areas: BudgetReallocation[];
  efficiency_gain: number;
  status: SimulationStatus;
  created_at: string;
  updated_at: string;
}

export interface BudgetReallocation {
  from_category: string;
  to_category: string;
  amount: number;
  rationale: string;
}

export interface TwinDataRefreshSchedule {
  id: string;
  twin_id: string;
  data_type: DataType;
  refresh_frequency: string;
  last_refresh: string;
  next_refresh: string;
  priority: SimulationPriority;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TwinSimulationParameterSet {
  id: string;
  parameter_set_name: string;
  description: string;
  parameters: SimulationParameter[];
  use_case: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TwinRegionBoundary {
  id: string;
  region_id: string;
  boundary_type: string;
  coordinates: Record<string, unknown>;
  area_km2: number;
  perimeter_km: number;
  last_updated: string;
  created_at: string;
  updated_at: string;
}

export interface TwinSchoolNetwork {
  id: string;
  network_name: string;
  school_ids: string[];
  network_type: string;
  avg_distance_km: number;
  shared_resources: string[];
  collaboration_score: number;
  created_at: string;
  updated_at: string;
}

export interface TwinForecastEnsemble {
  id: string;
  ensemble_name: string;
  model_ids: string[];
  weights: number[];
  target_metric: string;
  ensemble_accuracy: number;
  status: ModelStatus;
  created_at: string;
  updated_at: string;
}

export interface TwinInvestmentPriority {
  id: string;
  region_id: string;
  investment_area: string;
  priority_score: number;
  estimated_cost: number;
  expected_impact: number;
  timeline_months: number;
  risk_assessment: RiskLevel;
  created_at: string;
  updated_at: string;
}

export interface TwinDataGovernance {
  id: string;
  policy_name: string;
  description: string;
  data_owner: string;
  retention_policy: DataRetention;
  access_rules: Record<string, unknown>;
  compliance_requirements: string[];
  last_reviewed: string;
  status: TwinStatus;
  created_at: string;
  updated_at: string;
}

export interface TwinModelCard {
  id: string;
  model_name: string;
  model_type: ModelType;
  description: string;
  intended_use: string;
  limitations: string[];
  training_data_description: string;
  performance_metrics: Record<string, number>;
  ethical_considerations: string[];
  version: string;
  created_at: string;
  updated_at: string;
}

export interface TwinSimulationCostEstimate {
  id: string;
  simulation_id: string;
  compute_cost: number;
  storage_cost: number;
  total_cost: number;
  estimated_duration_minutes: number;
  resource_requirements: Record<string, number>;
  created_at: string;
  updated_at: string;
}

export interface TwinDataPartition {
  id: string;
  twin_id: string;
  partition_key: string;
  partition_value: string;
  record_count: number;
  size_bytes: number;
  last_updated: string;
  created_at: string;
  updated_at: string;
}
