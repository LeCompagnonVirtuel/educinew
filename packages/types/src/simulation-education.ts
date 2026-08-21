// =============================================================================
// SMART CAMPUS SIMULATION — Types
// =============================================================================

// =============================================================================
// ENUMS
// =============================================================================

export enum SimulationDomain {
  CAPACITY = 'CAPACITY',
  ENROLLMENT = 'ENROLLMENT',
  TEACHER = 'TEACHER',
  BUDGET = 'BUDGET',
  DISASTER = 'DISASTER',
  EVACUATION = 'EVACUATION',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  ENERGY = 'ENERGY',
  WATER = 'WATER',
  SECURITY = 'SECURITY',
  TRANSPORTATION = 'TRANSPORTATION',
  GROWTH = 'GROWTH',
  ACADEMIC = 'ACADEMIC',
  FINANCIAL = 'FINANCIAL',
  OPERATIONAL = 'OPERATIONAL',
}

export enum SimulationScenario {
  BASELINE = 'BASELINE',
  BEST_CASE = 'BEST_CASE',
  WORST_CASE = 'WORST_CASE',
  OPTIMISTIC = 'OPTIMISTIC',
  PESSIMISTIC = 'PESSIMISTIC',
  STRESS = 'STRESS',
  DISASTER = 'DISASTER',
  RECOVERY = 'RECOVERY',
}

export enum SimulationEngine {
  SYSTEM_DYNAMICS = 'SYSTEM_DYNAMICS',
  AGENT_BASED = 'AGENT_BASED',
  DISCRETE_EVENT = 'DISCRETE_EVENT',
  MONTE_CARLO = 'MONTE_CARLO',
  FINITE_ELEMENT = 'FINITE_ELEMENT',
  HYBRID = 'HYBRID',
}

export enum SimulationStatus {
  CONFIGURING = 'CONFIGURING',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  SCHEDULED = 'SCHEDULED',
}

export enum CapacityMetric {
  OCCUPANCY = 'OCCUPANCY',
  UTILIZATION = 'UTILIZATION',
  AVAILABILITY = 'AVAILABILITY',
  EFFICIENCY = 'EFFICIENCY',
  BOTTLENECK = 'BOTTLENECK',
}

export enum EnrollmentTrend {
  GROWTH = 'GROWTH',
  DECLINE = 'DECLINE',
  STABLE = 'STABLE',
  SEASONAL = 'SEASONAL',
  VOLATILE = 'VOLATILE',
}

export enum TeacherMetric {
  WORKLOAD = 'WORKLOAD',
  SATISFACTION = 'SATISFACTION',
  RETENTION = 'RETENTION',
  PERFORMANCE = 'PERFORMANCE',
  AVAILABILITY = 'AVAILABILITY',
}

export enum BudgetCategory {
  CAPITAL = 'CAPITAL',
  OPERATIONAL = 'OPERATIONAL',
  MAINTENANCE = 'MAINTENANCE',
  EMERGENCY = 'EMERGENCY',
  DEVELOPMENT = 'DEVELOPMENT',
  RESEARCH = 'RESEARCH',
}

export enum DisasterType {
  FIRE = 'FIRE',
  FLOOD = 'FLOOD',
  EARTHQUAKE = 'EARTHQUAKE',
  HURRICANE = 'HURRICANE',
  TORNADO = 'TORNADO',
  PANDEMIC = 'PANDEMIC',
  CYBER_ATTACK = 'CYBER_ATTACK',
  POWER_OUTAGE = 'POWER_OUTAGE',
  CHEMICAL = 'CHEMICAL',
  STRUCTURAL = 'STRUCTURAL',
}

export enum EvacuationRouteType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  EMERGENCY = 'EMERGENCY',
  ACCESSIBLE = 'ACCESSIBLE',
  SERVICE = 'SERVICE',
}

export enum InfrastructureType {
  BUILDING = 'BUILDING',
  ROAD = 'ROAD',
  UTILITY = 'UTILITY',
  NETWORK = 'NETWORK',
  SAFETY = 'SAFETY',
  AMENITY = 'AMENITY',
}

export enum EnergySource {
  GRID = 'GRID',
  SOLAR = 'SOLAR',
  WIND = 'WIND',
  BATTERY = 'BATTERY',
  DIESEL = 'DIESEL',
  HYBRID = 'HYBRID',
  GEOTHERMAL = 'GEOTHERMAL',
}

export enum WaterSource {
  MUNICIPAL = 'MUNICIPAL',
  WELL = 'WELL',
  RAINWATER = 'RAINWATER',
  RECYCLED = 'RECYCLED',
  RIVER = 'RIVER',
}

export enum SecurityThreat {
  INTRUSION = 'INTRUSION',
  THEFT = 'THEFT',
  VANDALISM = 'VANDALISM',
  ASSAULT = 'ASSAULT',
  FIRE = 'FIRE',
  HAZMAT = 'HAZMAT',
  CYBER = 'CYBER',
  TERRORISM = 'TERRORISM',
}

export enum TransportMode {
  BUS = 'BUS',
  CAR = 'CAR',
  BICYCLE = 'BICYCLE',
  WALK = 'WALK',
  TRAIN = 'TRAIN',
  FERRY = 'FERRY',
  AIR = 'AIR',
  EMERGENCY = 'EMERGENCY',
}

export enum GrowthProjection {
  LINEAR = 'LINEAR',
  EXPONENTIAL = 'EXPONENTIAL',
  LOGARISTIC = 'LOGARISTIC',
  SIGMOID = 'SIGMOID',
  CUSTOM = 'CUSTOM',
}

export enum AcademicPerformance {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  AVERAGE = 'AVERAGE',
  BELOW_AVERAGE = 'BELOW_AVERAGE',
  POOR = 'POOR',
}

export enum FinancialHealth {
  STRONG = 'STRONG',
  STABLE = 'STABLE',
  WEAK = 'WEAK',
  CRITICAL = 'CRITICAL',
  RECOVERY = 'RECOVERY',
}

export enum OperationalEfficiency {
  OPTIMAL = 'OPTIMAL',
  GOOD = 'GOOD',
  ACCEPTABLE = 'ACCEPTABLE',
  POOR = 'POOR',
  CRITICAL = 'CRITICAL',
}

export enum ResourceUtilization {
  UNDER_UTILIZED = 'UNDER_UTILIZED',
  OPTIMAL = 'OPTIMAL',
  OVER_UTILIZED = 'OVER_UTILIZED',
  CRITICAL = 'CRITICAL',
}

export enum EnvironmentalImpact {
  MINIMAL = 'MINIMAL',
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum SafetyRating {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
  DANGEROUS = 'DANGEROUS',
}

export enum MaintenanceLevel {
  OPTIMAL = 'OPTIMAL',
  ADEQUATE = 'ADEQUATE',
  DEFICIENT = 'DEFICIENT',
  CRITICAL = 'CRITICAL',
  EMERGENCY = 'EMERGENCY',
}

export enum PlanningHorizon {
  SHORT_TERM = 'SHORT_TERM',
  MEDIUM_TERM = 'MEDIUM_TERM',
  LONG_TERM = 'LONG_TERM',
  STRATEGIC = 'STRATEGIC',
}

export enum OptimizationGoal {
  MINIMIZE_COST = 'MINIMIZE_COST',
  MAXIMIZE_EFFICIENCY = 'MAXIMIZE_EFFICIENCY',
  MINIMIZE_RISK = 'MINIMIZE_RISK',
  MAXIMIZE_SAFETY = 'MAXIMIZE_SAFETY',
  BALANCED = 'BALANCED',
}

export enum ConstraintType {
  HARD = 'HARD',
  SOFT = 'SOFT',
  PREFERENCE = 'PREFERENCE',
  BUDGET = 'BUDGET',
  TIME = 'TIME',
  RESOURCE = 'RESOURCE',
  REGULATORY = 'REGULATORY',
}

export enum ObjectiveFunction {
  MINIMIZE = 'MINIMIZE',
  MAXIMIZE = 'MAXIMIZE',
  TARGET = 'TARGET',
  THRESHOLD = 'THRESHOLD',
  BALANCED = 'BALANCED',
}

export enum SensitivityType {
  ONE_WAY = 'ONE_WAY',
  TWO_WAY = 'TWO_WAY',
  MULTI_VARIABLE = 'MULTI_VARIABLE',
  MONTE_CARLO = 'MONTE_CARLO',
}

export enum ReportFormat {
  PDF = 'PDF',
  EXCEL = 'EXCEL',
  JSON = 'JSON',
  HTML = 'HTML',
  DASHBOARD = 'DASHBOARD',
  API = 'API',
}

export enum AlertThreshold {
  INFO = 'INFO',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
  EMERGENCY = 'EMERGENCY',
}

export enum TimeGranularity {
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
}

export enum DataResolution {
  RAW = 'RAW',
  AGGREGATED = 'AGGREGATED',
  SUMMARIZED = 'SUMMARIZED',
  COMPRESSED = 'COMPRESSED',
}

export enum VisualizationType {
  CHART = 'CHART',
  MAP = 'MAP',
  HEATMAP = 'HEATMAP',
  TIMELINE = 'TIMELINE',
  NETWORK = 'NETWORK',
  THREE_D = 'THREE_D',
  ANIMATION = 'ANIMATION',
}

export enum ComparisonType {
  YEAR_OVER_YEAR = 'YEAR_OVER_YEAR',
  MONTH_OVER_MONTH = 'MONTH_OVER_MONTH',
  TARGET_ACTUAL = 'TARGET_ACTUAL',
  PEER = 'PEER',
  BENCHMARK = 'BENCHMARK',
}

export enum RecommendationType {
  ACTION = 'ACTION',
  ALERT = 'ALERT',
  OPTIMIZATION = 'OPTIMIZATION',
  PREDICTION = 'PREDICTION',
  INSIGHT = 'INSIGHT',
}

export enum ConfidenceLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export enum SimulationMode {
  REAL_TIME = 'REAL_TIME',
  HISTORICAL = 'HISTORICAL',
  PREDICTIVE = 'PREDICTIVE',
  PRESCRIPTIVE = 'PRESCRIPTIVE',
}

export enum ScenarioStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
}

export enum ImpactLevel {
  NEGLIGIBLE = 'NEGLIGIBLE',
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum RiskLevel {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export enum ResourcePriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum EmergencyLevel {
  NORMAL = 'NORMAL',
  ELEVATED = 'ELEVATED',
  HIGH = 'HIGH',
  SEVERE = 'SEVERE',
  EXTREME = 'EXTREME',
}

// =============================================================================
// INTERFACES — Capacity
// =============================================================================

export interface CapacityPlan {
  id: string;
  school_id: string;
  name: string;
  description: string;
  domain: SimulationDomain;
  horizon: PlanningHorizon;
  targets: CapacityTarget[];
  constraints: ResourceConstraint[];
  created_at: string;
  updated_at: string;
}

export interface CapacityTarget {
  metric: CapacityMetric;
  target_value: number;
  unit: string;
  deadline: string;
}

export interface CapacitySimulation {
  id: string;
  school_id: string;
  plan_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  parameters: SimulationParameter[];
  start_date: string;
  end_date: string;
  progress: number;
  created_at: string;
}

export interface CapacityResult {
  id: string;
  simulation_id: string;
  metric: CapacityMetric;
  baseline_value: number;
  projected_value: number;
  optimal_value: number;
  confidence: ConfidenceLevel;
  timeline: SimulationTimeline;
  recommendations: SimulationRecommendation[];
}

export interface CapacityOptimization {
  id: string;
  simulation_id: string;
  goal: OptimizationGoal;
  constraints: ResourceConstraint[];
  results: OptimizationResult[];
  savings: number;
  efficiency_gain: number;
  created_at: string;
}

// =============================================================================
// INTERFACES — Enrollment
// =============================================================================

export interface EnrollmentSimulation {
  id: string;
  school_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  parameters: EnrollmentParameter[];
  baseline_enrollment: number;
  projection_horizon: number;
  created_at: string;
  updated_at: string;
}

export interface EnrollmentParameter {
  name: string;
  value: number;
  type: ConstraintType;
  description: string;
}

export interface EnrollmentProjection {
  id: string;
  simulation_id: string;
  year: number;
  projected_enrollment: number;
  growth_rate: number;
  trend: EnrollmentTrend;
  confidence: ConfidenceLevel;
  factors: ProjectionFactor[];
}

export interface ProjectionFactor {
  name: string;
  impact: number;
  weight: number;
  description: string;
}

export interface EnrollmentScenario {
  id: string;
  school_id: string;
  name: string;
  scenario: SimulationScenario;
  enrollment_data: EnrollmentDataPoint[];
  assumptions: string[];
  risk_level: RiskLevel;
  created_at: string;
}

export interface EnrollmentDataPoint {
  date: string;
  value: number;
  delta: number;
  source: string;
}

// =============================================================================
// INTERFACES — Teacher
// =============================================================================

export interface TeacherPlan {
  id: string;
  school_id: string;
  name: string;
  description: string;
  teacher_count: number;
  allocation_rules: AllocationRule[];
  constraints: ResourceConstraint[];
  created_at: string;
  updated_at: string;
}

export interface AllocationRule {
  metric: TeacherMetric;
  operator: string;
  value: number;
  weight: number;
}

export interface TeacherSimulation {
  id: string;
  school_id: string;
  plan_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  parameters: SimulationParameter[];
  current_workload: number;
  projected_workload: number;
  created_at: string;
}

export interface TeacherAllocation {
  id: string;
  simulation_id: string;
  teacher_id: string;
  class_assignments: ClassAssignment[];
  workload_score: number;
  satisfaction_score: number;
  availability_hours: number;
}

export interface ClassAssignment {
  class_id: string;
  subject: string;
  hours_per_week: number;
  student_count: number;
}

// =============================================================================
// INTERFACES — Budget
// =============================================================================

export interface BudgetSimulation {
  id: string;
  school_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  total_budget: number;
  categories: BudgetAllocation[];
  parameters: SimulationParameter[];
  fiscal_year: number;
  created_at: string;
  updated_at: string;
}

export interface BudgetAllocation {
  category: BudgetCategory;
  amount: number;
  percentage: number;
  variance: number;
}

export interface BudgetProjection {
  id: string;
  simulation_id: string;
  period: string;
  projected_income: number;
  projected_expenses: number;
  net_balance: number;
  cash_flow: number;
  confidence: ConfidenceLevel;
}

export interface BudgetOptimization {
  id: string;
  simulation_id: string;
  goal: OptimizationGoal;
  current_allocation: BudgetAllocation[];
  optimized_allocation: BudgetAllocation[];
  cost_reduction: number;
  efficiency_improvement: number;
  recommendations: SimulationRecommendation[];
}

// =============================================================================
// INTERFACES — Disaster
// =============================================================================

export interface DisasterSimulation {
  id: string;
  school_id: string;
  disaster_type: DisasterType;
  severity: ImpactLevel;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  parameters: DisasterParameter[];
  affected_area: string;
  estimated_duration: number;
  created_at: string;
}

export interface DisasterParameter {
  name: string;
  value: number;
  unit: string;
  description: string;
}

export interface DisasterScenario {
  id: string;
  school_id: string;
  name: string;
  disaster_type: DisasterType;
  severity: ImpactLevel;
  probability: number;
  impact: DisasterImpact;
  recovery_plan: DisasterRecovery;
  created_at: string;
}

export interface DisasterImpact {
  infrastructure_damage: number;
  casualties: number;
  displacement: number;
  financial_loss: number;
  academic_disruption: number;
  duration_days: number;
  affected_population: number;
  environmental_damage: number;
}

export interface DisasterRecovery {
  id: string;
  disaster_scenario_id: string;
  phases: RecoveryPhase[];
  total_cost: number;
  estimated_completion: string;
  status: SimulationStatus;
}

export interface RecoveryPhase {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  cost: number;
  dependencies: string[];
  status: SimulationStatus;
}

// =============================================================================
// INTERFACES — Evacuation
// =============================================================================

export interface EvacuationPlan {
  id: string;
  school_id: string;
  name: string;
  description: string;
  routes: EvacuationRouteConfig[];
  assembly_points: AssemblyPoint[];
  emergency_level: EmergencyLevel;
  last_drill: string;
  next_drill: string;
  created_at: string;
  updated_at: string;
}

export interface EvacuationRouteConfig {
  route_type: EvacuationRouteType;
  name: string;
  start_point: string;
  end_point: string;
  capacity: number;
  estimated_time: number;
  accessibility: boolean;
  status: SimulationStatus;
}

export interface AssemblyPoint {
  id: string;
  name: string;
  capacity: number;
  location: GeoLocation;
  facilities: string[];
}

export interface EvacuationSimulation {
  id: string;
  school_id: string;
  plan_id: string;
  engine: SimulationEngine;
  disaster_type: DisasterType;
  severity: ImpactLevel;
  status: SimulationStatus;
  population_count: number;
  evacuation_time: number;
  casualties: number;
  bottlenecks: Bottleneck[];
  created_at: string;
}

export interface EvacuationMetric {
  id: string;
  simulation_id: string;
  total_time: number;
  average_speed: number;
  route_utilization: RouteUtilization[];
  bottleneck_count: number;
  success_rate: number;
}

export interface RouteUtilization {
  route_id: string;
  route_name: string;
  usage_percentage: number;
  avg_travel_time: number;
  congestion_level: number;
}

export interface Bottleneck {
  location: string;
  severity: ImpactLevel;
  delay_seconds: number;
  affected_count: number;
  mitigation: string;
}

export interface EvacuationRoute {
  id: string;
  school_id: string;
  route_type: EvacuationRouteType;
  name: string;
  path: GeoPoint[];
  width: number;
  surface: string;
  lighting: boolean;
  signage: boolean;
  accessible: boolean;
}

// =============================================================================
// INTERFACES — Infrastructure
// =============================================================================

export interface InfrastructureSimulation {
  id: string;
  school_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  assets: InfrastructureAsset[];
  parameters: SimulationParameter[];
  assessment_date: string;
  created_at: string;
}

export interface InfrastructureAsset {
  id: string;
  name: string;
  type: InfrastructureType;
  location: GeoLocation;
  age: number;
  condition: MaintenanceLevel;
  capacity: number;
  utilization: number;
  replacement_cost: number;
  remaining_life: number;
}

export interface InfrastructureAssessment {
  id: string;
  simulation_id: string;
  asset_id: string;
  condition_score: number;
  risk_score: number;
  maintenance_priority: ResourcePriority;
  recommended_action: string;
  estimated_cost: number;
  deadline: string;
}

export interface InfrastructurePlan {
  id: string;
  school_id: string;
  name: string;
  projects: InfrastructureProject[];
  total_budget: number;
  timeline_months: number;
  priority: ResourcePriority;
  created_at: string;
  updated_at: string;
}

export interface InfrastructureProject {
  id: string;
  name: string;
  type: InfrastructureType;
  description: string;
  budget: number;
  start_date: string;
  end_date: string;
  status: SimulationStatus;
  dependencies: string[];
}

// =============================================================================
// INTERFACES — Energy
// =============================================================================

export interface EnergySimulation {
  id: string;
  school_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  current_consumption: number;
  projected_consumption: number;
  sources: EnergySourceConfig[];
  parameters: SimulationParameter[];
  created_at: string;
}

export interface EnergySourceConfig {
  source: EnergySource;
  capacity_kw: number;
  current_output_kw: number;
  efficiency: number;
  cost_per_kwh: number;
  carbon_factor: number;
}

export interface EnergyForecast {
  id: string;
  simulation_id: string;
  period: string;
  demand_kw: number;
  supply_kw: number;
  surplus_deficit: number;
  cost: number;
  carbon_emissions: number;
  confidence: ConfidenceLevel;
}

export interface EnergyOptimization {
  id: string;
  simulation_id: string;
  goal: OptimizationGoal;
  current_mix: EnergySourceConfig[];
  optimized_mix: EnergySourceConfig[];
  cost_savings: number;
  carbon_reduction: number;
  recommendations: SimulationRecommendation[];
}

// =============================================================================
// INTERFACES — Water
// =============================================================================

export interface WaterSimulation {
  id: string;
  school_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  current_consumption: number;
  projected_consumption: number;
  sources: WaterSourceConfig[];
  parameters: SimulationParameter[];
  created_at: string;
}

export interface WaterSourceConfig {
  source: WaterSource;
  capacity_liters: number;
  current_output_liters: number;
  cost_per_liter: number;
  quality_score: number;
}

export interface WaterForecast {
  id: string;
  simulation_id: string;
  period: string;
  demand_liters: number;
  supply_liters: number;
  surplus_deficit: number;
  cost: number;
  quality_index: number;
  confidence: ConfidenceLevel;
}

export interface WaterOptimization {
  id: string;
  simulation_id: string;
  goal: OptimizationGoal;
  current_sources: WaterSourceConfig[];
  optimized_sources: WaterSourceConfig[];
  cost_savings: number;
  conservation_gain: number;
  recommendations: SimulationRecommendation[];
}

// =============================================================================
// INTERFACES — Waste
// =============================================================================

export interface WasteSimulation {
  id: string;
  school_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  current_generation: number;
  projected_generation: number;
  categories: WasteCategory[];
  parameters: SimulationParameter[];
  created_at: string;
}

export interface WasteCategory {
  name: string;
  percentage: number;
  recyclable: boolean;
  disposal_cost: number;
}

export interface WasteForecast {
  id: string;
  simulation_id: string;
  period: string;
  total_waste_kg: number;
  recycled_kg: number;
  landfill_kg: number;
  disposal_cost: number;
  environmental_impact: EnvironmentalImpact;
  confidence: ConfidenceLevel;
}

export interface WasteOptimization {
  id: string;
  simulation_id: string;
  goal: OptimizationGoal;
  current_diversion_rate: number;
  target_diversion_rate: number;
  cost_savings: number;
  environmental_benefit: number;
  recommendations: SimulationRecommendation[];
}

// =============================================================================
// INTERFACES — Security
// =============================================================================

export interface SecuritySimulation {
  id: string;
  school_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  threat_assessments: ThreatAssessment[];
  parameters: SimulationParameter[];
  created_at: string;
}

export interface ThreatAssessment {
  id: string;
  threat_type: SecurityThreat;
  probability: number;
  impact: ImpactLevel;
  risk_score: number;
  vulnerability: string;
  mitigation: string;
  cost: number;
}

export interface SecurityPlan {
  id: string;
  school_id: string;
  name: string;
  description: string;
  threats: ThreatAssessment[];
  measures: SecurityMeasure[];
  total_budget: number;
  effectiveness_score: number;
  created_at: string;
  updated_at: string;
}

export interface SecurityMeasure {
  id: string;
  name: string;
  type: string;
  cost: number;
  effectiveness: number;
  threats_addressed: SecurityThreat[];
  implementation_time: number;
}

// =============================================================================
// INTERFACES — Transportation
// =============================================================================

export interface TransportSimulation {
  id: string;
  school_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  routes: TransportRouteConfig[];
  parameters: SimulationParameter[];
  created_at: string;
}

export interface TransportRouteConfig {
  id: string;
  name: string;
  mode: TransportMode;
  start_point: string;
  end_point: string;
  distance_km: number;
  capacity: number;
  frequency_minutes: number;
  cost_per_trip: number;
}

export interface TransportOptimization {
  id: string;
  simulation_id: string;
  goal: OptimizationGoal;
  current_routes: TransportRouteConfig[];
  optimized_routes: TransportRouteConfig[];
  cost_reduction: number;
  time_savings: number;
  environmental_benefit: number;
  recommendations: SimulationRecommendation[];
}

export interface TransportRoute {
  id: string;
  school_id: string;
  name: string;
  mode: TransportMode;
  path: GeoPoint[];
  stops: TransportStop[];
  total_distance: number;
  estimated_time: number;
  capacity: number;
  active: boolean;
}

export interface TransportStop {
  id: string;
  name: string;
  location: GeoLocation;
  boarding_count: number;
  schedule: string[];
}

// =============================================================================
// INTERFACES — Growth
// =============================================================================

export interface GrowthSimulation {
  id: string;
  school_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  projection_type: GrowthProjection;
  parameters: SimulationParameter[];
  base_year: number;
  horizon_years: number;
  created_at: string;
}

export interface GrowthProjectionResult {
  id: string;
  simulation_id: string;
  year: number;
  projected_value: number;
  growth_rate: number;
  confidence: ConfidenceLevel;
  factors: GrowthFactor[];
}

export interface GrowthFactor {
  name: string;
  impact: number;
  weight: number;
  trend: EnrollmentTrend;
}

export interface GrowthScenario {
  id: string;
  school_id: string;
  name: string;
  scenario: SimulationScenario;
  projections: GrowthProjectionResult[];
  assumptions: string[];
  risk_level: RiskLevel;
  created_at: string;
}

// =============================================================================
// INTERFACES — Academic
// =============================================================================

export interface AcademicSimulation {
  id: string;
  school_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  current_performance: AcademicPerformance;
  parameters: SimulationParameter[];
  created_at: string;
}

export interface AcademicProjection {
  id: string;
  simulation_id: string;
  period: string;
  performance: AcademicPerformance;
  pass_rate: number;
  average_score: number;
  graduation_rate: number;
  confidence: ConfidenceLevel;
}

export interface AcademicOptimization {
  id: string;
  simulation_id: string;
  goal: OptimizationGoal;
  current_metrics: AcademicMetrics;
  optimized_metrics: AcademicMetrics;
  improvement_areas: ImprovementArea[];
  recommendations: SimulationRecommendation[];
}

export interface AcademicMetrics {
  pass_rate: number;
  average_score: number;
  graduation_rate: number;
  attendance_rate: number;
  student_satisfaction: number;
}

export interface ImprovementArea {
  area: string;
  current_value: number;
  target_value: number;
  priority: ResourcePriority;
  strategies: string[];
}

// =============================================================================
// INTERFACES — Financial
// =============================================================================

export interface FinancialSimulation {
  id: string;
  school_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  current_health: FinancialHealth;
  parameters: SimulationParameter[];
  created_at: string;
}

export interface FinancialProjection {
  id: string;
  simulation_id: string;
  period: string;
  revenue: number;
  expenses: number;
  net_income: number;
  cash_flow: number;
  health: FinancialHealth;
  confidence: ConfidenceLevel;
}

export interface FinancialOptimization {
  id: string;
  simulation_id: string;
  goal: OptimizationGoal;
  current_state: FinancialState;
  optimized_state: FinancialState;
  cost_savings: number;
  revenue_increase: number;
  recommendations: SimulationRecommendation[];
}

export interface FinancialState {
  revenue: number;
  expenses: number;
  reserves: number;
  debt: number;
  liquidity: number;
  solvency: number;
}

// =============================================================================
// INTERFACES — Operational
// =============================================================================

export interface OperationalSimulation {
  id: string;
  school_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  current_efficiency: OperationalEfficiency;
  parameters: SimulationParameter[];
  created_at: string;
}

export interface OperationalProjection {
  id: string;
  simulation_id: string;
  period: string;
  efficiency: OperationalEfficiency;
  throughput: number;
  wait_time: number;
  utilization: number;
  confidence: ConfidenceLevel;
}

export interface OperationalOptimization {
  id: string;
  simulation_id: string;
  goal: OptimizationGoal;
  current_metrics: OperationalMetrics;
  optimized_metrics: OperationalMetrics;
  process_improvements: ProcessImprovement[];
  recommendations: SimulationRecommendation[];
}

export interface OperationalMetrics {
  efficiency: number;
  throughput: number;
  wait_time: number;
  utilization: number;
  error_rate: number;
  satisfaction: number;
}

export interface ProcessImprovement {
  process: string;
  current_time: number;
  optimized_time: number;
  savings: number;
  priority: ResourcePriority;
}

// =============================================================================
// INTERFACES — Environmental
// =============================================================================

export interface EnvironmentalSimulation {
  id: string;
  school_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  current_impact: EnvironmentalImpact;
  parameters: SimulationParameter[];
  created_at: string;
}

export interface EnvironmentalImpactResult {
  id: string;
  simulation_id: string;
  carbon_emissions: number;
  energy_consumption: number;
  water_consumption: number;
  waste_generation: number;
  green_score: number;
  impact_level: EnvironmentalImpact;
}

export interface EnvironmentalForecast {
  id: string;
  simulation_id: string;
  period: string;
  projected_emissions: number;
  projected_consumption: number;
  sustainability_score: number;
  confidence: ConfidenceLevel;
}

export interface EnvironmentalOptimization {
  id: string;
  simulation_id: string;
  goal: OptimizationGoal;
  current_impact: EnvironmentalImpactResult;
  optimized_impact: EnvironmentalImpactResult;
  carbon_reduction: number;
  cost_savings: number;
  recommendations: SimulationRecommendation[];
}

// =============================================================================
// INTERFACES — Safety
// =============================================================================

export interface SafetySimulation {
  id: string;
  school_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  current_rating: SafetyRating;
  parameters: SimulationParameter[];
  created_at: string;
}

export interface SafetyAssessment {
  id: string;
  simulation_id: string;
  area: string;
  rating: SafetyRating;
  risk_score: number;
  hazards: Hazard[];
  compliance_score: number;
  recommendations: SimulationRecommendation[];
}

export interface Hazard {
  id: string;
  name: string;
  type: string;
  probability: number;
  severity: ImpactLevel;
  mitigation: string;
  cost: number;
}

export interface SafetyPlan {
  id: string;
  school_id: string;
  name: string;
  description: string;
  assessments: SafetyAssessment[];
  measures: SafetyMeasure[];
  total_budget: number;
  compliance_status: SimulationStatus;
  created_at: string;
  updated_at: string;
}

export interface SafetyMeasure {
  id: string;
  name: string;
  type: string;
  cost: number;
  effectiveness: number;
  hazards_addressed: string[];
}

// =============================================================================
// INTERFACES — Maintenance
// =============================================================================

export interface MaintenanceSimulation {
  id: string;
  school_id: string;
  engine: SimulationEngine;
  scenario: SimulationScenario;
  status: SimulationStatus;
  assets: MaintenanceAsset[];
  parameters: SimulationParameter[];
  created_at: string;
}

export interface MaintenanceAsset {
  id: string;
  name: string;
  type: string;
  condition: MaintenanceLevel;
  last_maintenance: string;
  next_maintenance: string;
  maintenance_cost: number;
  failure_probability: number;
}

export interface MaintenanceSchedule {
  id: string;
  simulation_id: string;
  tasks: MaintenanceTask[];
  total_cost: number;
  downtime_hours: number;
  efficiency_gain: number;
}

export interface MaintenanceTask {
  id: string;
  asset_id: string;
  task_type: string;
  priority: ResourcePriority;
  scheduled_date: string;
  estimated_duration: number;
  estimated_cost: number;
  status: SimulationStatus;
}

export interface MaintenanceOptimization {
  id: string;
  simulation_id: string;
  goal: OptimizationGoal;
  current_schedule: MaintenanceSchedule;
  optimized_schedule: MaintenanceSchedule;
  cost_savings: number;
  downtime_reduction: number;
  recommendations: SimulationRecommendation[];
}

// =============================================================================
// INTERFACES — Resource
// =============================================================================

export interface ResourceAllocation {
  id: string;
  school_id: string;
  resource_type: string;
  allocated_amount: number;
  used_amount: number;
  available_amount: number;
  utilization: ResourceUtilization;
  priority: ResourcePriority;
}

export interface ResourceConstraint {
  id: string;
  resource_type: string;
  constraint_type: ConstraintType;
  min_value: number;
  max_value: number;
  unit: string;
  description: string;
}

export interface ResourceOptimization {
  id: string;
  school_id: string;
  goal: OptimizationGoal;
  allocations: ResourceAllocation[];
  constraints: ResourceConstraint[];
  optimized_allocations: ResourceAllocation[];
  total_savings: number;
  efficiency_improvement: number;
  recommendations: SimulationRecommendation[];
}

// =============================================================================
// INTERFACES — Sensitivity
// =============================================================================

export interface SensitivityAnalysis {
  id: string;
  simulation_id: string;
  analysis_type: SensitivityType;
  variables: SensitivityVariable[];
  results: SensitivityResult[];
  created_at: string;
}

export interface SensitivityVariable {
  name: string;
  base_value: number;
  min_value: number;
  max_value: number;
  unit: string;
  description: string;
}

export interface SensitivityResult {
  variable_name: string;
  impact_on_output: number;
  elasticity: number;
  correlation: number;
  significance: ConfidenceLevel;
  chart_data: DataPoint[];
}

export interface DataPoint {
  x: number;
  y: number;
  label: string;
}

export interface SensitivityReport {
  id: string;
  analysis_id: string;
  summary: string;
  key_findings: string[];
  recommendations: SimulationRecommendation[];
  visualizations: VisualizationConfig[];
}

// =============================================================================
// INTERFACES — Scenario
// =============================================================================

export interface ScenarioComparison {
  id: string;
  school_id: string;
  scenarios: ScenarioData[];
  comparison_type: ComparisonType;
  metrics: ComparisonMetric[];
  created_at: string;
}

export interface ScenarioData {
  scenario_id: string;
  name: string;
  scenario: SimulationScenario;
  results: ScenarioResult[];
}

export interface ScenarioResult {
  metric_name: string;
  value: number;
  unit: string;
  rank: number;
}

export interface ComparisonMetric {
  name: string;
  weights: Record<string, number>;
  best_scenario: string;
  worst_scenario: string;
}

export interface ScenarioReport {
  id: string;
  comparison_id: string;
  summary: string;
  rankings: ScenarioRanking[];
  insights: string[];
  recommendations: SimulationRecommendation[];
}

export interface ScenarioRanking {
  scenario_id: string;
  rank: number;
  score: number;
  strengths: string[];
  weaknesses: string[];
}

export interface ScenarioRecommendation {
  id: string;
  type: RecommendationType;
  priority: ResourcePriority;
  title: string;
  description: string;
  impact: ImpactLevel;
  cost: number;
  timeframe: PlanningHorizon;
}

// =============================================================================
// INTERFACES — Dashboard
// =============================================================================

export interface SimulationDashboard {
  id: string;
  school_id: string;
  name: string;
  widgets: DashboardWidget[];
  layout: DashboardLayout;
  refresh_interval: number;
  auto_refresh: boolean;
  created_at: string;
  updated_at: string;
}

export interface DashboardWidget {
  id: string;
  type: VisualizationType;
  title: string;
  data_source: string;
  config: WidgetConfig;
  position: WidgetPosition;
  size: WidgetSize;
}

export interface WidgetConfig {
  chart_type: string;
  color_scheme: string;
  show_legend: boolean;
  show_labels: boolean;
  animation: boolean;
}

export interface WidgetPosition {
  x: number;
  y: number;
}

export interface WidgetSize {
  width: number;
  height: number;
}

export interface DashboardLayout {
  columns: number;
  rows: number;
  gap: number;
}

// =============================================================================
// INTERFACES — Report
// =============================================================================

export interface SimulationReport {
  id: string;
  school_id: string;
  simulation_id: string;
  title: string;
  format: ReportFormat;
  sections: ReportSection[];
  summary: string;
  generated_at: string;
  generated_by: string;
  file_url: string;
}

export interface ReportSection {
  id: string;
  title: string;
  content: string;
  visualizations: VisualizationConfig[];
  tables: ReportTable[];
  order: number;
}

export interface ReportTable {
  id: string;
  title: string;
  headers: string[];
  rows: string[][];
  footnotes: string[];
}

export interface VisualizationConfig {
  id: string;
  type: VisualizationType;
  title: string;
  data: Record<string, unknown>;
  config: Record<string, unknown>;
}

// =============================================================================
// INTERFACES — Alert
// =============================================================================

export interface SimulationAlert {
  id: string;
  school_id: string;
  simulation_id: string;
  threshold: AlertThreshold;
  title: string;
  message: string;
  metric_name: string;
  current_value: number;
  threshold_value: number;
  acknowledged: boolean;
  acknowledged_by: string | null;
  acknowledged_at: string | null;
  created_at: string;
}

// =============================================================================
// INTERFACES — AI
// =============================================================================

export interface SimulationAI {
  id: string;
  school_id: string;
  model: SimulationAIModel;
  status: SimulationStatus;
  training_data: string[];
  accuracy: number;
  last_trained: string;
  created_at: string;
}

export interface SimulationAIModel {
  provider: 'DEEPSEEK' | 'GEMINI';
  model_name: string;
  version: string;
  parameters: Record<string, unknown>;
  capabilities: string[];
}

export interface SimulationAIResult {
  id: string;
  ai_id: string;
  prediction: string;
  confidence: ConfidenceLevel;
  factors: AIPredictionFactor[];
  recommendations: SimulationRecommendation[];
  generated_at: string;
}

export interface AIPredictionFactor {
  name: string;
  importance: number;
  direction: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  description: string;
}

// =============================================================================
// INTERFACES — Event / Timeline / Snapshot
// =============================================================================

export interface SimulationEvent {
  id: string;
  simulation_id: string;
  event_type: string;
  name: string;
  description: string;
  timestamp: string;
  impact: ImpactLevel;
  data: Record<string, unknown>;
}

export interface SimulationTimeline {
  id: string;
  simulation_id: string;
  events: SimulationEvent[];
  start_date: string;
  end_date: string;
  current_position: number;
  total_duration: number;
}

export interface SimulationSnapshot {
  id: string;
  simulation_id: string;
  timestamp: string;
  state: Record<string, unknown>;
  metrics: SimulationMetrics;
  checksum: string;
}

export interface SimulationMetrics {
  total_runs: number;
  success_rate: number;
  average_duration: number;
  error_count: number;
  performance_score: number;
}

// =============================================================================
// INTERFACES — Template / Preset / History
// =============================================================================

export interface SimulationTemplate {
  id: string;
  school_id: string;
  name: string;
  description: string;
  domain: SimulationDomain;
  engine: SimulationEngine;
  parameters: SimulationParameter[];
  constraints: ResourceConstraint[];
  is_public: boolean;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

export interface SimulationPreset {
  id: string;
  name: string;
  description: string;
  domain: SimulationDomain;
  scenario: SimulationScenario;
  parameters: SimulationParameter[];
  tags: string[];
  is_default: boolean;
  created_at: string;
}

export interface SimulationHistory {
  id: string;
  school_id: string;
  simulation_id: string;
  action: string;
  user_id: string;
  changes: Record<string, unknown>;
  timestamp: string;
}

// =============================================================================
// INTERFACES — Shared / Common
// =============================================================================

export interface SimulationParameter {
  name: string;
  value: number;
  type: string;
  unit: string;
  min_value: number;
  max_value: number;
  description: string;
}

export interface SimulationRecommendation {
  id: string;
  type: RecommendationType;
  priority: ResourcePriority;
  title: string;
  description: string;
  impact: ImpactLevel;
  confidence: ConfidenceLevel;
  estimated_cost: number;
  estimated_benefit: number;
  timeframe: PlanningHorizon;
}

export interface OptimizationResult {
  variable: string;
  current_value: number;
  optimized_value: number;
  improvement: number;
  unit: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  altitude: number;
  address: string;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}
