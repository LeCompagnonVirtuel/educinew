export enum MapLayer {
  COUNTRY_BOUNDARIES = "COUNTRY_BOUNDARIES",
  SCHOOL_LOCATIONS = "SCHOOL_LOCATIONS",
  POPULATION_DENSITY = "POPULATION_DENSITY",
  EDUCATION_ACCESS = "EDUCATION_ACCESS",
  LITERACY_RATES = "LITERACY_RATES",
  ENROLLMENT_RATES = "ENROLLMENT_RATES",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  ECONOMIC_INDICATORS = "ECONOMIC_INDICATORS",
  GENDER_PARITY = "GENDER_PARITY",
  TEACHER_DENSITY = "TEACHER_DENSITY",
  BUDGET_ALLOCATION = "BUDGET_ALLOCATION",
  CLIMATE_ZONES = "CLIMATE_ZONES",
  POLITICAL_STABILITY = "POLITICAL_STABILITY",
  DIGITAL_CONNECTIVITY = "DIGITAL_CONNECTIVITY",
  HEALTH_INDICATORS = "HEALTH_INDICATORS",
}

export enum SimulationType {
  POPULATION_GROWTH = "POPULATION_GROWTH",
  ENROLLMENT_PROJECTION = "ENROLLMENT_PROJECTION",
  TEACHER_DEMAND = "TEACHER_DEMAND",
  BUDGET_SCENARIO = "BUDGET_SCENARIO",
  INFRASTRUCTURE_PLANNING = "INFRASTRUCTURE_PLANNING",
  CLIMATE_IMPACT = "CLIMATE_IMPACT",
  POLICY_IMPACT = "POLICY_IMPACT",
  CRISIS_RESPONSE = "CRISIS_RESPONSE",
  RESOURCE_ALLOCATION = "RESOURCE_ALLOCATION",
  QUALITY_IMPROVEMENT = "QUALITY_IMPROVEMENT",
}

export enum SimulationStatus {
  DRAFT = "DRAFT",
  CONFIGURED = "CONFIGURED",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  PAUSED = "PAUSED",
  CANCELLED = "CANCELLED",
}

export enum ForecastModel {
  LINEAR_REGRESSION = "LINEAR_REGRESSION",
  ARIMA = "ARIMA",
  EXPONENTIAL_SMOOTHING = "EXPONENTIAL_SMOOTHING",
  NEURAL_NETWORK = "NEURAL_NETWORK",
  LSTM = "LSTM",
  PROPHET = "PROPHET",
  MONTE_CARLO = "MONTE_CARLO",
  SYSTEM_DYNAMICS = "SYSTEM_DYNAMICS",
  AGENT_BASED = "AGENT_BASED",
}

export enum ProjectionType {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  OPTIMISTIC = "OPTIMISTIC",
  PESSIMISTIC = "PESSIMISTIC",
  BASELINE = "BASELINE",
}

export enum CapacityType {
  CLASSROOM = "CLASSROOM",
  SCHOOL = "SCHOOL",
  DISTRICT = "DISTRICT",
  REGION = "REGION",
  NATIONAL = "NATIONAL",
}

export enum SupplyModel {
  COHORT = "COHORT",
  STOCK_FLOW = "STOCK_FLOW",
  REPLACEMENT = "REPLACEMENT",
  DEMAND_DRIVEN = "DEMAND_DRIVEN",
  CAPACITY_BASED = "CAPACITY_BASED",
}

export enum ClimateScenario {
  RCP_26 = "RCP_26",
  RCP_45 = "RCP_45",
  RCP_60 = "RCP_60",
  RCP_85 = "RCP_85",
  SSP1 = "SSP1",
  SSP2 = "SSP2",
  SSP3 = "SSP3",
  SSP4 = "SSP4",
  SSP5 = "SSP5",
}

export enum ScenarioType {
  BEST_CASE = "BEST_CASE",
  BASE_CASE = "BASE_CASE",
  WORST_CASE = "WORST_CASE",
  CUSTOM = "CUSTOM",
  HISTORICAL = "HISTORICAL",
}

export enum ScenarioStatus {
  DRAFT = "DRAFT",
  SIMULATING = "SIMULATING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  ARCHIVED = "ARCHIVED",
}

export enum MapProjectionType {
  MERCATOR = "MERCATOR",
  ROBINSON = "ROBINSON",
  WINKEL_TRIPEL = "WINKEL_TRIPEL",
  ALBERS_EQUAL_AREA = "ALBERS_EQUAL_AREA",
  LAMBERT_CONFORMAL = "LAMBERT_CONFORMAL",
}

export enum DataAggregationType {
  SUM = "SUM",
  AVERAGE = "AVERAGE",
  MEDIAN = "MEDIAN",
  MIN = "MIN",
  MAX = "MAX",
  COUNT = "COUNT",
}

export enum TimeGranularity {
  YEARLY = "YEARLY",
  QUARTERLY = "QUARTERLY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  DAILY = "DAILY",
}

export enum EducationLevel {
  PRE_PRIMARY = "PRE_PRIMARY",
  PRIMARY = "PRIMARY",
  LOWER_SECONDARY = "LOWER_SECONDARY",
  UPPER_SECONDARY = "UPPER_SECONDARY",
  TERTIARY = "TERTIARY",
  VOCATIONAL = "VOCATIONAL",
  ADULT_EDUCATION = "ADULT_EDUCATION",
}

export enum InfrastructureType {
  SCHOOL_BUILDING = "SCHOOL_BUILDING",
  CLASSROOM = "CLASSROOM",
  LABORATORY = "LABORATORY",
  LIBRARY = "LIBRARY",
  SPORTS_FACILITY = "SPORTS_FACILITY",
  DORMITORY = "DORMITORY",
  TRANSPORT = "TRANSPORT",
  DIGITAL_INFRASTRUCTURE = "DIGITAL_INFRASTRUCTURE",
}

export enum BudgetCategory {
  PERSONNEL = "PERSONNEL",
  INFRASTRUCTURE = "INFRASTRUCTURE",
  EQUIPMENT = "EQUIPMENT",
  MATERIALS = "MATERIALS",
  TECHNOLOGY = "TECHNOLOGY",
  TRAINING = "TRAINING",
  MAINTENANCE = "MAINTENANCE",
  OPERATIONS = "OPERATIONS",
}

export enum QualityIndicator {
  STUDENT_TEACHER_RATIO = "STUDENT_TEACHER_RATIO",
  CLASS_SIZE = "CLASS_SIZE",
  ATTENDANCE_RATE = "ATTENDANCE_RATE",
  PASS_RATE = "PASS_RATE",
  GRADUATION_RATE = "GRADUATION_RATE",
  LEARNING_OUTCOMES = "LEARNING_OUTCOMES",
  TEACHER_QUALIFICATION = "TEACHER_QUALIFICATION",
  INFRASTRUCTURE_QUALITY = "INFRASTRUCTURE_QUALITY",
}

export enum ComparisonType {
  YEAR_OVER_YEAR = "YEAR_OVER_YEAR",
  COUNTRY_COMPARE = "COUNTRY_COMPARE",
  REGION_COMPARE = "REGION_COMPARE",
  PROJECTED = "PROJECTED",
  BENCHMARK = "BENCHMARK",
}

export enum DataSourceType {
  UNESCO = "UNESCO",
  WORLD_BANK = "WORLD_BANK",
  UNICEF = "UNICEF",
  OECD = "OECD",
  NATIONAL_STATS = "NATIONAL_STATS",
  CUSTOM = "CUSTOM",
  SIMULATED = "SIMULATED",
}

export enum VisualizationType {
  CHOROPLETH = "CHOROPLETH",
  BUBBLE = "BUBBLE",
  HEATMAP = "HEATMAP",
  CLUSTER = "CLUSTER",
  FLOW = "FLOW",
  TIMELINE = "TIMELINE",
  SCATTER = "SCATTER",
  BAR = "BAR",
}

export enum RiskCategory {
  NATURAL_DISASTER = "NATURAL_DISASTER",
  CONFLICT = "CONFLICT",
  PANDEMIC = "PANDEMIC",
  ECONOMIC = "ECONOMIC",
  POLITICAL = "POLITICAL",
  ENVIRONMENTAL = "ENVIRONMENTAL",
  SOCIAL = "SOCIAL",
}

export enum AlertSeverity {
  INFO = "INFO",
  WARNING = "WARNING",
  CRITICAL = "CRITICAL",
  EMERGENCY = "EMERGENCY",
}

export enum SimulationGranularity {
  INDIVIDUAL = "INDIVIDUAL",
  CLASS = "CLASS",
  SCHOOL = "SCHOOL",
  DISTRICT = "DISTRICT",
  REGION = "REGION",
  COUNTRY = "COUNTRY",
  GLOBAL = "GLOBAL",
}

export enum PolicyLeverType {
  BUDGET_INCREASE = "BUDGET_INCREASE",
  TEACHER_TRAINING = "TEACHER_TRAINING",
  INFRASTRUCTURE_INVESTMENT = "INFRASTRUCTURE_INVESTMENT",
  CURRICULUM_REFORM = "CURRICULUM_REFORM",
  TECHNOLOGY_INTEGRATION = "TECHNOLOGY_INTEGRATION",
  ACCESS_IMPROVEMENT = "ACCESS_IMPROVEMENT",
  QUALITY_ASSURANCE = "QUALITY_ASSURANCE",
}

export enum ModelValidationType {
  HINDCAST = "HINDCAST",
  CROSS_VALIDATION = "CROSS_VALIDATION",
  SENSITIVITY = "SENSITIVITY",
  MONTE_CARLO = "MONTE_CARLO",
  EXPERT_REVIEW = "EXPERT_REVIEW",
}

export enum DigitalTwinMode {
  EXPLORATION = "EXPLORATION",
  PLANNING = "PLANNING",
  MONITORING = "MONITORING",
  OPTIMIZATION = "OPTIMIZATION",
  PREDICTION = "PREDICTION",
  SCENARIO = "SCENARIO",
}

export enum WorldRegion {
  SUB_SAHARAN_AFRICA = "SUB_SAHARAN_AFRICA",
  SOUTH_ASIA = "SOUTH_ASIA",
  EAST_ASIA = "EAST_ASIA",
  SOUTHEAST_ASIA = "SOUTHEAST_ASIA",
  LATIN_AMERICA = "LATIN_AMERICA",
  MIDDLE_EAST = "MIDDLE_EAST",
  EUROPE = "EUROPE",
  NORTH_AMERICA = "NORTH_AMERICA",
  CENTRAL_ASIA = "CENTRAL_ASIA",
  OCEANIA = "OCEANIA",
}

export enum PopulationAgeGroup {
  EARLY_CHILDHOOD = "EARLY_CHILDHOOD",
  PRIMARY_AGE = "PRIMARY_AGE",
  LOWER_SECONDARY_AGE = "LOWER_SECONDARY_AGE",
  UPPER_SECONDARY_AGE = "UPPER_SECONDARY_AGE",
  YOUTH = "YOUTH",
  WORKING_AGE = "WORKING_AGE",
  ELDERLY = "ELDERLY",
}

export enum UrbanRuralClassification {
  URBAN = "URBAN",
  PERI_URBAN = "PERI_URBAN",
  RURAL = "RURAL",
  REMOTE = "REMOTE",
}

export enum EconomicIndicator {
  GDP_PER_CAPITA = "GDP_PER_CAPITA",
  EDUCATION_SPEND_GDP = "EDUCATION_SPEND_GDP",
  POVERTY_RATE = "POVERTY_RATE",
  INCOME_INEQUALITY = "INCOME_INEQUALITY",
  UNEMPLOYMENT = "UNEMPLOYMENT",
}

export enum HealthIndicator {
  CHILD_MORTALITY = "CHILD_MORTALITY",
  NUTRITION = "NUTRITION",
  DISEASE_BURDEN = "DISEASE_BURDEN",
  HEALTHCARE_ACCESS = "HEALTHCARE_ACCESS",
}

export interface WorldEducationMap {
  id: string;
  name: string;
  description: string;
  projection: MapProjectionType;
  centerLat: number;
  centerLng: number;
  zoom: number;
  layers: MapLayerConfig[];
  countries: MapCountry[];
  regions: MapRegion[];
  filters: MapFilter[];
  createdAt: string;
  updatedAt: string;
}

export interface MapLayerConfig {
  layer: MapLayer;
  isVisible: boolean;
  opacity: number;
  aggregationType: DataAggregationType;
  timeGranularity: TimeGranularity;
  dataSource: DataSourceType;
  colorScale: string[];
  min?: number;
  max?: number;
  unit: string;
}

export interface MapCountry {
  id: string;
  iso3: string;
  iso2: string;
  name: string;
  region: WorldRegion;
  subRegion: string;
  capital: string;
  lat: number;
  lng: number;
  area: number;
  population: number;
  populationGrowth: number;
  urbanRural: UrbanRuralClassification[];
  educationData: CountryEducationData;
  economicData: CountryEconomicData;
  healthData: CountryHealthData;
  infrastructureData: CountryInfrastructureData;
  riskProfile: CountryRiskProfile;
  lastUpdated: string;
}

export interface CountryEducationData {
  literacyRate: number;
  netEnrollmentRate: Record<EducationLevel, number>;
  grossEnrollmentRate: Record<EducationLevel, number>;
  genderParityIndex: Record<EducationLevel, number>;
  studentTeacherRatio: Record<EducationLevel, number>;
  completionRate: Record<EducationLevel, number>;
  learningOutcomes: LearningOutcome[];
  totalSchools: number;
  totalStudents: number;
  totalTeachers: number;
  publicSpendingEducation: number;
  privateEnrollmentShare: number;
}

export interface LearningOutcome {
  subject: string;
  score: number;
  internationalAverage: number;
  year: number;
}

export interface CountryEconomicData {
  gdpPerCapita: number;
  gdpGrowth: number;
  educationSpendingGDP: number;
  educationSpendingPerStudent: Record<EducationLevel, number>;
  povertyRate: number;
  giniCoefficient: number;
  unemployment: number;
  inflation: number;
  currency: string;
  humanDevelopmentIndex: number;
}

export interface CountryHealthData {
  childMortalityRate: number;
  lifeExpectancy: number;
  malnutritionRate: number;
  immunizationRate: number;
  healthcareSpendingGDP: number;
  physiciansPerThousand: number;
}

export interface CountryInfrastructureData {
  schoolsWithElectricity: number;
  schoolsWithInternet: number;
  schoolsWithCleanWater: number;
  schoolsWithSanitation: number;
  classroomsNeedingRepair: number;
  textbookStudentRatio: number;
  computerStudentRatio: number;
}

export interface CountryRiskProfile {
  overallRisk: AlertSeverity;
  naturalDisasterRisk: number;
  conflictRisk: number;
  economicRisk: number;
  climateRisk: number;
  healthRisk: number;
  politicalRisk: number;
}

export interface MapRegion {
  id: string;
  name: string;
  countries: string[];
  aggregateData: RegionAggregateData;
  comparisonData: RegionComparisonData;
  trends: RegionTrend[];
}

export interface RegionAggregateData {
  totalPopulation: number;
  averageLiteracyRate: number;
  averageEnrollmentRate: number;
  totalSchools: number;
  totalStudents: number;
  totalTeachers: number;
  averageEducationSpending: number;
}

export interface RegionComparisonData {
  vsGlobalAverage: Record<string, number>;
  vsRegionalAverage: Record<string, number>;
  ranking: number;
}

export interface RegionTrend {
  indicator: string;
  direction: string;
  magnitude: number;
  period: string;
}

export interface MapFilter {
  id: string;
  name: string;
  type: string;
  options: FilterOption[];
  defaultValue: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface CountrySimulation {
  id: string;
  schoolId: string;
  countryId: string;
  name: string;
  description: string;
  simulationType: SimulationType;
  status: SimulationStatus;
  parameters: SimulationParameter[];
  timeHorizon: number;
  timeUnit: string;
  startDate: string;
  endDate: string;
  scenarios: ScenarioDefinition[];
  results: SimulationResult[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface SimulationParameter {
  id: string;
  name: string;
  type: string;
  currentValue: number;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  unit: string;
  description: string;
  isVariable: boolean;
}

export interface ScenarioDefinition {
  id: string;
  name: string;
  type: ScenarioType;
  description: string;
  parameters: Record<string, number>;
  assumptions: string[];
}

export interface SimulationResult {
  id: string;
  simulationId: string;
  scenarioId: string;
  scenarioName: string;
  status: SimulationStatus;
  indicators: SimulatedIndicator[];
  timeSeriesData: TimeSeriesDataPoint[];
  spatialResults: SpatialResult[];
  sensitivityAnalysis: SensitivityAnalysis;
  confidence: ConfidenceInterval;
  executedAt: string;
  completedAt?: string;
  executionTime: number;
}

export interface SimulatedIndicator {
  name: string;
  unit: string;
  currentValue: number;
  projectedValues: ProjectedValue[];
  changeRate: number;
  trend: string;
}

export interface ProjectedValue {
  year: number;
  value: number;
  lowerBound?: number;
  upperBound?: number;
}

export interface TimeSeriesDataPoint {
  timestamp: string;
  values: Record<string, number>;
}

export interface SpatialResult {
  countryId: string;
  regionId?: string;
  values: Record<string, number>;
  alerts: SpatialAlert[];
}

export interface SpatialAlert {
  indicator: string;
  severity: AlertSeverity;
  message: string;
  threshold: number;
  actualValue: number;
}

export interface SensitivityAnalysis {
  parameters: SensitivityParameter[];
  method: ModelValidationType;
}

export interface SensitivityParameter {
  parameterName: string;
  elasticity: number;
  correlation: number;
  impact: string;
}

export interface ConfidenceInterval {
  level: number;
  intervals: Record<string, { lower: number; upper: number }>;
}

export interface EducationDigitalTwin {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  mode: DigitalTwinMode;
  countryId: string;
  regionId?: string;
  level: SimulationGranularity;
  models: TwinModel[];
  dataSources: TwinDataSource[];
  simulations: CountrySimulation[];
  dashboards: TwinDashboard[];
  alerts: TwinAlert[];
  lastSyncedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface TwinModel {
  id: string;
  name: string;
  type: ForecastModel;
  description: string;
  accuracy: number;
  lastTrained: string;
  trainingData: string;
  parameters: Record<string, unknown>;
  validationResults: ModelValidation[];
  isActive: boolean;
}

export interface ModelValidation {
  type: ModelValidationType;
  score: number;
  metrics: Record<string, number>;
  performedAt: string;
}

export interface TwinDataSource {
  id: string;
  name: string;
  type: DataSourceType;
  endpoint: string;
  refreshFrequency: string;
  lastRefreshed: string;
  dataQuality: number;
  coverage: number;
  isActive: boolean;
}

export interface TwinDashboard {
  id: string;
  name: string;
  description: string;
  widgets: TwinDashboardWidget[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TwinDashboardWidget {
  id: string;
  title: string;
  type: VisualizationType;
  dataSource: string;
  indicators: string[];
  position: WidgetPosition;
  size: WidgetSize;
  config: Record<string, unknown>;
}

export interface WidgetPosition {
  x: number;
  y: number;
}

export interface WidgetSize {
  width: number;
  height: number;
}

export interface TwinAlert {
  id: string;
  type: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  indicator: string;
  currentValue: number;
  threshold: number;
  countryId: string;
  regionId?: string;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  createdAt: string;
}

export interface GlobalForecast {
  id: string;
  name: string;
  description: string;
  model: ForecastModel;
  timeHorizon: number;
  projections: ForecastProjection[];
  scenarios: ScenarioDefinition[];
  confidenceLevel: number;
  indicators: ForecastIndicator[];
  methodology: string;
  dataSources: DataSourceType[];
  lastUpdated: string;
  createdAt: string;
}

export interface ForecastProjection {
  id: string;
  projectionType: ProjectionType;
  name: string;
  values: ForecastTimeSeries[];
  probability: number;
}

export interface ForecastTimeSeries {
  year: number;
  value: number;
  lowerBound: number;
  upperBound: number;
}

export interface ForecastIndicator {
  name: string;
  unit: string;
  currentValue: number;
  projections: ForecastProjection[];
  trend: string;
  changeRate: number;
}

export interface ForecastResult {
  id: string;
  forecastId: string;
  region: WorldRegion;
  countryId?: string;
  indicators: ForecastIndicatorResult[];
  generatedAt: string;
  accuracy: number;
}

export interface ForecastIndicatorResult {
  indicator: string;
  projections: ProjectedValue[];
  confidence: ConfidenceInterval;
}

export interface PopulationProjection {
  id: string;
  countryId: string;
  name: string;
  description: string;
  projectionType: ProjectionType;
  timeHorizon: number;
  ageGroups: PopulationAgeGroupProjection[];
  totalPopulation: ProjectedValue[];
  growthRate: ProjectedValue[];
  urbanizationRate: ProjectedValue[];
  educationAgePopulation: EducationAgePopulation[];
  dependencyRatio: ProjectedValue[];
  fertilityRate: ProjectedValue[];
  mortalityRate: ProjectedValue[];
  migrationRate: ProjectedValue[];
  generatedAt: string;
  model: ForecastModel;
}

export interface PopulationAgeGroupProjection {
  ageGroup: PopulationAgeGroup;
  population: ProjectedValue[];
  percentage: ProjectedValue[];
}

export interface EducationAgePopulation {
  level: EducationLevel;
  ageRange: string;
  population: ProjectedValue[];
  enrollmentProjection: ProjectedValue[];
}

export interface SchoolCapacitySimulation {
  id: string;
  schoolId: string;
  countryId: string;
  capacityType: CapacityType;
  currentCapacity: number;
  utilizationRate: number;
  projections: CapacityProjection[];
  scenarios: CapacityScenario[];
  constraints: CapacityConstraint[];
  recommendations: CapacityRecommendation[];
  createdAt: string;
  updatedAt: string;
}

export interface CapacityProjection {
  year: number;
  demand: number;
  supply: number;
  gap: number;
  utilizationRate: number;
}

export interface CapacityScenario {
  name: string;
  type: ScenarioType;
  investmentRequired: number;
  newCapacity: number;
  timeline: number;
  feasibility: number;
}

export interface CapacityConstraint {
  type: string;
  description: string;
  impact: number;
  mitigation: string;
}

export interface CapacityRecommendation {
  priority: string;
  action: string;
  investmentRequired: number;
  expectedImpact: number;
  timeline: string;
}

export interface TeacherSupplySimulation {
  id: string;
  schoolId: string;
  countryId: string;
  supplyModel: SupplyModel;
  currentSupply: TeacherSupplyData;
  projections: TeacherProjection[];
  scenarios: TeacherScenario[];
  gaps: TeacherGap[];
  interventions: TeacherIntervention[];
  createdAt: string;
  updatedAt: string;
}

export interface TeacherSupplyData {
  totalTeachers: number;
  byLevel: Record<EducationLevel, number>;
  bySubject: Record<string, number>;
  qualifiedRate: number;
  attritionRate: number;
  retirementRate: number;
  newGraduatesPerYear: number;
  averageAge: number;
  genderDistribution: Record<string, number>;
}

export interface TeacherProjection {
  year: number;
  supply: number;
  demand: number;
  gap: number;
  attrition: number;
  newHires: number;
}

export interface TeacherScenario {
  name: string;
  type: ScenarioType;
  interventions: TeacherIntervention[];
  projectedOutcome: TeacherProjection[];
  costEstimate: number;
}

export interface TeacherGap {
  level: EducationLevel;
  subject?: string;
  currentGap: number;
  projectedGap: number;
  severity: AlertSeverity;
  region?: string;
}

export interface TeacherIntervention {
  name: string;
  type: PolicyLeverType;
  description: string;
  costPerTeacher: number;
  timeToImpact: number;
  effectiveness: number;
  targetGap: string;
}

export interface BudgetSimulation {
  id: string;
  schoolId: string;
  countryId: string;
  currentBudget: BudgetData;
  projections: BudgetProjection[];
  scenarios: BudgetScenario[];
  allocations: BudgetAllocation[];
  efficiency: BudgetEfficiency;
  outcomes: BudgetOutcome[];
  createdAt: string;
  updatedAt: string;
}

export interface BudgetData {
  totalBudget: number;
  perStudentSpending: number;
  perTeacherSpending: number;
  byCategory: Record<BudgetCategory, number>;
  byLevel: Record<EducationLevel, number>;
  publicShare: number;
  privateShare: number;
  internationalShare: number;
  currency: string;
  year: number;
}

export interface BudgetProjection {
  year: number;
  totalBudget: number;
  inflationAdjusted: number;
  perStudentSpending: number;
  byCategory: Record<BudgetCategory, number>;
}

export interface BudgetScenario {
  name: string;
  type: ScenarioType;
  assumptions: string[];
  fundingChanges: Record<BudgetCategory, number>;
  efficiencyGains: number;
  projectedOutcomes: BudgetOutcome[];
  totalCost: number;
}

export interface BudgetAllocation {
  id: string;
  category: BudgetCategory;
  level: EducationLevel;
  amount: number;
  percentage: number;
  efficiency: number;
  impact: number;
  recommendations: string[];
}

export interface BudgetEfficiency {
  overallScore: number;
  costPerOutcome: Record<string, number>;
  benchmarks: Record<string, number>;
  improvementPotential: number;
}

export interface BudgetOutcome {
  indicator: string;
  currentValue: number;
  projectedValue: number;
  costEffectiveness: number;
  timeToImpact: number;
}

export interface ClimateImpact {
  id: string;
  schoolId: string;
  countryId: string;
  scenario: ClimateScenario;
  impacts: ClimateImpactIndicator[];
  riskAssessment: ClimateRiskAssessment;
  adaptation: ClimateAdaptation[];
  projections: ClimateProjection[];
  costEstimate: ClimateCostEstimate;
  createdAt: string;
  updatedAt: string;
}

export interface ClimateImpactIndicator {
  indicator: string;
  currentValue: number;
  projectedChange: number;
  unit: string;
  confidence: number;
  timeframe: string;
  affectedRegions: string[];
}

export interface ClimateRiskAssessment {
  overallRisk: AlertSeverity;
  floodRisk: number;
  droughtRisk: number;
  heatStressRisk: number;
  stormRisk: number;
  seaLevelRiseRisk: number;
  agriculturalImpact: number;
  migrationPressure: number;
}

export interface ClimateAdaptation {
  measure: string;
  description: string;
  cost: number;
  effectiveness: number;
  timeframe: string;
  priority: string;
  coBenefits: string[];
}

export interface ClimateProjection {
  year: number;
  temperature: number;
  precipitation: number;
  extremeEvents: number;
  schoolDamageRisk: number;
  attendanceImpact: number;
  healthImpact: number;
}

export interface ClimateCostEstimate {
  adaptationCost: number;
  damageCost: number;
  netBenefit: number;
  costBenefitRatio: number;
  fundingNeeded: number;
  availableFunding: number;
}

export interface AIGlobalScenario {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: ScenarioType;
  status: ScenarioStatus;
  region: WorldRegion;
  countryId?: string;
  timeHorizon: number;
  variables: ScenarioVariable[];
  assumptions: ScenarioAssumption[];
  interventions: ScenarioIntervention[];
  outcomes: ScenarioOutcome[];
  sensitivity: SensitivityAnalysis;
  confidence: ConfidenceInterval;
  model: ForecastModel;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface ScenarioVariable {
  id: string;
  name: string;
  currentValue: number;
  projectedValues: ProjectedValue[];
  unit: string;
  category: string;
  isControllable: boolean;
}

export interface ScenarioAssumption {
  id: string;
  description: string;
  type: string;
  value: number;
  source: string;
  confidence: number;
}

export interface ScenarioIntervention {
  id: string;
  name: string;
  type: PolicyLeverType;
  description: string;
  cost: number;
  timeframe: string;
  expectedImpact: number;
  targetVariables: string[];
}

export interface ScenarioOutcome {
  id: string;
  indicator: string;
  unit: string;
  baselineValue: number;
  scenarioValue: number;
  change: number;
  changePercentage: number;
  confidence: number;
  significance: string;
  visualization: VisualizationType;
  narrative: string;
}

export interface DigitalTwinConfig {
  id: string;
  schoolId: string;
  countryId: string;
  name: string;
  description: string;
  mode: DigitalTwinMode;
  level: SimulationGranularity;
  refreshFrequency: string;
  dataRetention: number;
  enabledFeatures: string[];
  modelSettings: ModelSettings;
  alertSettings: AlertSettings;
  sharingSettings: SharingSettings;
  integrations: TwinIntegration[];
  createdAt: string;
  updatedAt: string;
}

export interface ModelSettings {
  autoRetrain: boolean;
  retrainFrequency: string;
  validationThreshold: number;
  confidenceLevel: number;
  fallbackModel: ForecastModel;
}

export interface AlertSettings {
  enabled: boolean;
  channels: string[];
  thresholds: AlertThreshold[];
  frequency: string;
}

export interface AlertThreshold {
  indicator: string;
  warningThreshold: number;
  criticalThreshold: number;
  direction: string;
}

export interface SharingSettings {
  isPublic: boolean;
  sharedWith: string[];
  embedEnabled: boolean;
  apiAccess: boolean;
}

export interface TwinIntegration {
  id: string;
  name: string;
  type: string;
  endpoint: string;
  apiKey?: string;
  syncFrequency: string;
  isActive: boolean;
  lastSyncAt?: string;
}

export interface DigitalTwinMetrics {
  id: string;
  schoolId: string;
  period: string;
  simulationsRun: number;
  averageExecutionTime: number;
  modelAccuracy: number;
  dataFreshness: number;
  alertCount: number;
  resolvedAlerts: number;
  userEngagement: number;
  forecastAccuracy: number;
  modelPerformance: ModelPerformanceMetrics;
  dataQuality: DataQualityMetrics;
  usageStats: UsageStats;
  computedAt: string;
}

export interface ModelPerformanceMetrics {
  averageAccuracy: number;
  averageLatency: number;
  totalPredictions: number;
  correctPredictions: number;
  falsePositiveRate: number;
  falseNegativeRate: number;
}

export interface DataQualityMetrics {
  completeness: number;
  accuracy: number;
  timeliness: number;
  consistency: number;
  overallScore: number;
}

export interface UsageStats {
  totalUsers: number;
  activeUsers: number;
  totalSimulations: number;
  averageSessionDuration: number;
  mostUsedFeatures: FeatureUsage[];
}

export interface FeatureUsage {
  feature: string;
  usageCount: number;
  averageDuration: number;
}

export interface SimulationTemplate {
  id: string;
  name: string;
  description: string;
  simulationType: SimulationType;
  parameters: SimulationParameter[];
  defaultScenarios: ScenarioDefinition[];
  applicableCountries: string[];
  applicableLevels: SimulationGranularity[];
  createdBy: string;
  isPublic: boolean;
  useCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorldEducationIndicator {
  id: string;
  name: string;
  description: string;
  unit: string;
  dataSource: DataSourceType;
  aggregationType: DataAggregationType;
  timeGranularity: TimeGranularity;
  globalValue: number;
  regionalValues: Record<WorldRegion, number>;
  trends: IndicatorTrend[];
  benchmarks: IndicatorBenchmark[];
  lastUpdated: string;
}

export interface IndicatorTrend {
  year: number;
  value: number;
  changeFromPrevious: number;
}

export interface IndicatorBenchmark {
  name: string;
  value: number;
  source: string;
}

export interface EducationSDGMapping {
  id: string;
  sdgGoal: number;
  indicator: string;
  countryId: string;
  currentValue: number;
  targetValue: number;
  progress: number;
  trajectory: string;
  year: number;
}

export interface DigitalTwinExport {
  id: string;
  twinId: string;
  format: string;
  scope: string;
  filters: Record<string, unknown>;
  requestedBy: string;
  fileUrl: string;
  fileSize: number;
  status: string;
  createdAt: string;
}

export interface SimulationComparison {
  id: string;
  name: string;
  simulationIds: string[];
  indicators: string[];
  timeRange: string;
  results: ComparisonResult[];
  createdAt: string;
}

export interface ComparisonResult {
  indicator: string;
  simulationResults: SimulationComparisonEntry[];
  winner: string;
  margin: number;
}

export interface SimulationComparisonEntry {
  simulationId: string;
  simulationName: string;
  value: number;
  change: number;
}

export interface GlobalEducationTrend {
  id: string;
  indicator: string;
  region: WorldRegion;
  trend: string;
  magnitude: number;
  startYear: number;
  endYear: number;
  drivers: string[];
  implications: string[];
  confidence: number;
}

export interface EducationInequalityIndex {
  id: string;
  countryId: string;
  dimension: string;
  score: number;
  components: InequalityComponent[];
  trend: string;
  comparisonGlobal: number;
  comparisonRegional: number;
  year: number;
}

export interface InequalityComponent {
  name: string;
  score: number;
  weight: number;
  contribution: number;
}
