// ========================================
// MODULE 10: SUSTAINABILITY PLATFORM
// ========================================

// ----------------------------------------
// ENUMS
// ----------------------------------------

export enum ESGCategory {
  ENVIRONMENTAL = 'ENVIRONMENTAL',
  SOCIAL = 'SOCIAL',
  GOVERNANCE = 'GOVERNANCE',
}

export enum CarbonSource {
  ELECTRICITY = 'ELECTRICITY',
  HEATING = 'HEATING',
  COOLING = 'COOLING',
  TRANSPORT = 'TRANSPORT',
  WASTE = 'WASTE',
  SUPPLY_CHAIN = 'SUPPLY_CHAIN',
  EMPLOYEE_COMMUTE = 'EMPLOYEE_COMMUTE',
  BUSINESS_TRAVEL = 'BUSINESS_TRAVEL',
  IT_INFRASTRUCTURE = 'IT_INFRASTRUCTURE',
  CAMPUS_FACILITIES = 'CAMPUS_FACILITIES',
}

export enum EnergyType {
  ELECTRICITY = 'ELECTRICITY',
  GAS = 'GAS',
  SOLAR = 'SOLAR',
  WIND = 'WIND',
  BIOMASS = 'BIOMASS',
  GEOTHERMAL = 'GEOTHERMAL',
  DIESEL = 'DIESEL',
  FUEL_OIL = 'FUEL_OIL',
}

export enum WaterType {
  POTABLE = 'POTABLE',
  RECYCLED = 'RECYCLED',
  RAINWATER = 'RAINWATER',
  GROUNDWATER = 'GROUNDWATER',
  INDUSTRIAL = 'INDUSTRIAL',
  IRRIGATION = 'IRRIGATION',
}

export enum WasteType {
  ORGANIC = 'ORGANIC',
  RECYCLABLE = 'RECYCLABLE',
  HAZARDOUS = 'HAZARDOUS',
  ELECTRONIC = 'ELECTRONIC',
  CONSTRUCTION = 'CONSTRUCTION',
  MEDICAL = 'MEDICAL',
  GENERAL = 'GENERAL',
  E_WASTE = 'E_WASTE',
}

export enum GreenMetric {
  ENERGY_INTENSITY = 'ENERGY_INTENSITY',
  WATER_INTENSITY = 'WATER_INTENSITY',
  WASTE_DIVERSION = 'WASTE_DIVERSION',
  CARBON_INTENSITY = 'CARBON_INTENSITY',
  RENEWABLE_SHARE = 'RENEWABLE_SHARE',
  GREEN_BUILDING_SCORE = 'GREEN_BUILDING_SCORE',
  TRANSPORT_EMISSIONS = 'TRANSPORT_EMISSIONS',
  SUPPLY_CHAIN_SCORE = 'SUPPLY_CHAIN_SCORE',
}

export enum SustainabilityGoal {
  CARBON_NEUTRAL = 'CARBON_NEUTRAL',
  NET_ZERO = 'NET_ZERO',
  ZERO_WASTE = 'ZERO_WASTE',
  WATER_POSITIVE = 'WATER_POSITIVE',
  RENEWABLE_ENERGY_100 = 'RENEWABLE_ENERGY_100',
  BIODIVERSITY_NET_GAIN = 'BIODIVERSITY_NET_GAIN',
  GREEN_CAMPUS = 'GREEN_CAMPUS',
  CIRCULAR_ECONOMY = 'CIRCULAR_ECONOMY',
  SOCIAL_EQUITY = 'SOCIAL_EQUITY',
  CLIMATE_ADAPTATION = 'CLIMATE_ADAPTATION',
}

export enum SustainabilityStatus {
  ON_TRACK = 'ON_TRACK',
  AHEAD = 'AHEAD',
  BEHIND = 'BEHIND',
  AT_RISK = 'AT_RISK',
  COMPLETED = 'COMPLETED',
  NOT_STARTED = 'NOT_STARTED',
}

export enum EnvironmentalImpact {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
  NEGLIGIBLE = 'NEGLIGIBLE',
}

export enum CarbonOffset {
  TREE_PLANTING = 'TREE_PLANTING',
  RENEWABLE_PROJECTS = 'RENEWABLE_PROJECTS',
  METHANE_CAPTURE = 'METHANE_CAPTURE',
  CARBON_CREDITS = 'CARBON_CREDITS',
  SOIL_CARBON = 'SOIL_CARBON',
  BLUE_CARBON = 'BLUE_CARBON',
}

export enum RenewableEnergy {
  SOLAR = 'SOLAR',
  WIND = 'WIND',
  HYDRO = 'HYDRO',
  GEOTHERMAL = 'GEOTHERMAL',
  BIOMASS = 'BIOMASS',
  HYDROGEN = 'HYDROGEN',
}

export enum WasteRecycling {
  PAPER = 'PAPER',
  PLASTIC = 'PLASTIC',
  GLASS = 'GLASS',
  METAL = 'METAL',
  ELECTRONIC = 'ELECTRONIC',
  ORGANIC = 'ORGANIC',
  TEXTILE = 'TEXTILE',
  CONSTRUCTION = 'CONSTRUCTION',
}

export enum WaterConservation {
  RAINWATER_HARVESTING = 'RAINWATER_HARVESTING',
  GREYWATER_REUSE = 'GREYWATER_REUSE',
  LOW_FLOW_FIXTURES = 'LOW_FLOW_FIXTURES',
  IRRIGATION_OPTIMIZATION = 'IRRIGATION_OPTIMIZATION',
  LEAK_DETECTION = 'LEAK_DETECTION',
  WATER_AUDIT = 'WATER_AUDIT',
}

export enum GreenBuilding {
  LEED = 'LEED',
  BREEAM = 'BREEAM',
  GRIHA = 'GRIHA',
  EDGE = 'EDGE',
  WELL = 'WELL',
  PASSIVE_HOUSE = 'PASSIVE_HOUSE',
  LIVING_BUILDING = 'LIVING_BUILDING',
}

export enum ESGRating {
  AAA = 'AAA',
  AA = 'AA',
  A = 'A',
  BBB = 'BBB',
  BB = 'BB',
  B = 'B',
  CCC = 'CCC',
}

export enum ComplianceStandard {
  GRI = 'GRI',
  SASB = 'SASB',
  TCFD = 'TCFD',
  CDP = 'CDP',
  UN_SDGS = 'UN_SDGS',
  ISO_14001 = 'ISO_14001',
  ISO_50001 = 'ISO_50001',
  EU_TAXONOMY = 'EU_TAXONOMY',
}

export enum ReportingPeriod {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMI_ANNUAL = 'SEMI_ANNUAL',
  ANNUAL = 'ANNUAL',
}

export enum DataCollectionMethod {
  AUTOMATED = 'AUTOMATED',
  MANUAL = 'MANUAL',
  IoT_SENSOR = 'IoT_SENSOR',
  UTILITY_BILL = 'UTILITY_BILL',
  ESTIMATE = 'ESTIMATE',
  CALCULATION = 'CALCULATION',
}

export enum KPIUnit {
  TONNES_CO2 = 'TONNES_CO2',
  KWH = 'KWH',
  M3 = 'M3',
  KG = 'KG',
  PERCENTAGE = 'PERCENTAGE',
  LITERS = 'LITERS',
  MJ = 'MJ',
  USD = 'USD',
}

export enum TrendDirection {
  INCREASING = 'INCREASING',
  DECREASING = 'DECREASING',
  STABLE = 'STABLE',
  FLUCTUATING = 'FLUCTUATING',
}

export enum AlertSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
  EMERGENCY = 'EMERGENCY',
}

export enum ForecastModel {
  LINEAR = 'LINEAR',
  ARIMA = 'ARIMA',
  PROPHET = 'PROPHET',
  LSTM = 'LSTM',
  ENSEMBLE = 'ENSEMBLE',
}

export enum BenchmarkType {
  INDUSTRY_AVERAGE = 'INDUSTRY_AVERAGE',
  BEST_PRACTICE = 'BEST_PRACTICE',
  PREVIOUS_YEAR = 'PREVIOUS_YEAR',
  INTERNAL_TARGET = 'INTERNAL_TARGET',
  REGULATORY = 'REGULATORY',
}

export enum CarbonScope {
  SCOPE_1 = 'SCOPE_1',
  SCOPE_2 = 'SCOPE_2',
  SCOPE_3 = 'SCOPE_3',
}

export enum EmissionFactor {
  GRID_ELECTRICITY = 'GRID_ELECTRICITY',
  NATURAL_GAS = 'NATURAL_GAS',
  DIESEL = 'DIESEL',
  PETROL = 'PETROL',
  AIR_TRAVEL = 'AIR_TRAVEL',
  WASTE_LANDFILL = 'WASTE_LANDFILL',
}

export enum EnergySource {
  NATIONAL_GRID = 'NATIONAL_GRID',
  SOLAR_PANELS = 'SOLAR_PANELS',
  WIND_TURBINES = 'WIND_TURBINES',
  GENERATORS = 'GENERATORS',
  BATTERY = 'BATTERY',
}

export enum WaterSource {
  MUNICIPAL = 'MUNICIPAL',
  WELL = 'WELL',
  RIVER = 'RIVER',
  RAINWATER = 'RAINWATER',
  RECycled = 'RECYCLED',
}

export enum WasteStream {
  COLLECTION = 'COLLECTION',
  SORTING = 'SORTING',
  PROCESSING = 'PROCESSING',
  DISPOSAL = 'DISPOSAL',
  RECOVERY = 'RECOVERY',
}

export enum EnvironmentalAudit {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
  REGULATORY = 'REGULATORY',
  CERTIFICATION = 'CERTIFICATION',
}

export enum SustainabilityReport {
  ANNUAL_ESG = 'ANNUAL_ESG',
  CARBON_DISCLOSURE = 'CARBON_DISCLOSURE',
  WATER_DISCLOSURE = 'WATER_DISCLOSURE',
  WASTE_REPORT = 'WASTE_REPORT',
  PROGRESS_REPORT = 'PROGRESS_REPORT',
}

export enum GreenInitiative {
  TREE_PLANTING = 'TREE_PLANTING',
  CLEAN_UP = 'CLEAN_UP',
  EDUCATION = 'EDUCATION',
  COMMUNITY_GARDEN = 'COMMUNITY_GARDEN',
  RENEWABLE_INSTALL = 'RENEWABLE_INSTALL',
  ENERGY_AUDIT = 'ENERGY_AUDIT',
}

export enum CarbonCredit {
  VERIFIED_CREDITS = 'VERIFIED_CREDITS',
  GOLD_STANDARD = 'GOLD_STANDARD',
  VCS = 'VCS',
  CDM = 'CDM',
  VOLUNTARY = 'VOLUNTARY',
}

export enum EnvironmentalPolicy {
  ENVIRONMENTAL_MANAGEMENT = 'ENVIRONMENTAL_MANAGEMENT',
  CLIMATE_COMMITMENT = 'CLIMATE_COMMITMENT',
  WATER_STEWARDSHIP = 'WATER_STEWARDSHIP',
  WASTE_REDUCTION = 'WASTE_REDUCTION',
  BIODIVERSITY = 'BIODIVERSITY',
  POLLUTION_PREVENTION = 'POLLUTION_PREVENTION',
}

export enum ClimateAction {
  MITIGATION = 'MITIGATION',
  ADAPTATION = 'RESILIENCE',
  CARBON_NEUTRALITY = 'CARBON_NEUTRALITY',
  RANSITION = 'TRANSITION',
  FINANCE = 'FINANCE',
}

export enum BiodiversityImpact {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
  NET_GAIN = 'NET_GAIN',
  NET_LOSS = 'NET_LOSS',
}

export enum AirQuality {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  MODERATE = 'MODERATE',
  POOR = 'POOR',
  HAZARDOUS = 'HAZARDOUS',
}

export enum NoiseLevel {
  SILENT = 'SILENT',
  QUIET = 'QUIET',
  MODERATE = 'MODERATE',
  LOUD = 'LOUD',
  EXCESSIVE = 'EXCESSIVE',
}

export enum SoilQuality {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  MODERATE = 'MODERATE',
  DEGRADED = 'DEGRADED',
  CONTAMINATED = 'CONTAMINATED',
}

export enum LandUse {
  CONSERVATION = 'CONSERVATION',
  RECREATIONAL = 'RECREATIONAL',
  AGRICULTURAL = 'AGRICULTURAL',
  BUILT_UP = 'BUILT_UP',
  MIXED = 'MIXED',
}

export enum GreenTransportType {
  ELECTRIC_VEHICLE = 'ELECTRIC_VEHICLE',
  BICYCLE = 'BICYCLE',
  WALKING = 'WALKING',
  PUBLIC_TRANSPORT = 'PUBLIC_TRANSPORT',
  CARPOOL = 'CARPOOL',
  SHUTTLE = 'SHUTTLE',
}

export enum SustainableProcurement {
  ECO_LABEL = 'ECO_LABEL',
  LIFE_CYCLE_ASSESSMENT = 'LIFE_CYCLE_ASSESSMENT',
  LOCAL_SOURCING = 'LOCAL_SOURCING',
  FAIR_TRADE = 'FAIR_TRADE',
  GREEN_CERTIFIED = 'GREEN_CERTIFIED',
}

export enum CircularEconomy {
  REUSE = 'REUSE',
  REPAIR = 'REPAIR',
  REMANUFACTURE = 'REMANUFACTURE',
  RECYCLE = 'RECYCLE',
  RECOVER = 'RECOVER',
}

export enum SocialImpact {
  COMMUNITY_DEVELOPMENT = 'COMMUNITY_DEVELOPMENT',
  EDUCATION_ACCESS = 'EDUCATION_ACCESS',
  HEALTH_WELLNESS = 'HEALTH_WELLNESS',
  EMPLOYMENT = 'EMPLOYMENT',
  DIVERSITY = 'DIVERSITY',
  WELLBEING = 'WELLBEING',
}

// ----------------------------------------
// INTERFACES
// ----------------------------------------

export interface ESGDashboard {
  id: string;
  schoolId: string;
  overallScore: number;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  esgRating: ESGRating;
  carbonFootprint: number;
  energyConsumption: number;
  waterConsumption: number;
  wasteGenerated: number;
  renewableEnergyShare: number;
  activeGoals: number;
  completedGoals: number;
  alerts: SustainabilityAlert[];
  trends: SustainabilityTrend[];
  benchmarks: SustainabilityBenchmark[];
  generatedAt: string;
}

export interface CarbonFootprint {
  id: string;
  schoolId: string;
  reportingPeriod: ReportingPeriod;
  year: number;
  scope1Total: number;
  scope2Total: number;
  scope3Total: number;
  grandTotal: number;
  emissions: CarbonEmission[];
  offsets: CarbonOffsetRecord[];
  netEmissions: number;
  trend: TrendDirection;
  yoyChange: number;
  calculatedAt: string;
}

export interface CarbonEmission {
  id: string;
  schoolId: string;
  scope: CarbonScope;
  source: CarbonSource;
  category: string;
  quantity: number;
  unit: string;
  emissionFactor: number;
  co2Equivalent: number;
  dataCollectionMethod: DataCollectionMethod;
  period: string;
  notes?: string;
  createdAt: string;
}

export interface CarbonOffsetRecord {
  id: string;
  schoolId: string;
  type: CarbonOffset;
  projectName: string;
  provider: string;
  creditsPurchased: number;
  creditsRetired: number;
  pricePerCredit: number;
  totalCost: number;
  verificationStandard: string;
  vintage: number;
  retirementDate: string;
  createdAt: string;
}

export interface EnergyAnalytics {
  id: string;
  schoolId: string;
  totalConsumption: number;
  unit: string;
  breakdown: EnergyConsumption[];
  renewableShare: number;
  intensityPerStudent: number;
  intensityPerSqM: number;
  cost: number;
  costPerUnit: number;
  peakDemand: number;
  loadFactor: number;
  trend: TrendDirection;
  forecast: EnergyForecast;
  renewableAssets: RenewableEnergyAsset[];
  generatedAt: string;
}

export interface WaterAnalytics {
  id: string;
  schoolId: string;
  totalConsumption: number;
  unit: string;
  breakdown: WaterConsumption[];
  recycledWaterShare: number;
  intensityPerStudent: number;
  cost: number;
  costPerUnit: number;
  leakageRate: number;
  rainwaterHarvested: number;
  trend: TrendDirection;
  forecast: WaterForecast;
  conservationMeasures: WaterConservationRecord[];
  generatedAt: string;
}

export interface WasteAnalytics {
  id: string;
  schoolId: string;
  totalGenerated: number;
  unit: string;
  breakdown: WasteManagement[];
  recyclingRate: number;
  diversionRate: number;
  landfillRate: number;
  compostRate: number;
  hazardousWaste: number;
  cost: number;
  costPerUnit: number;
  trend: TrendDirection;
  recyclingMetrics: RecyclingMetrics;
  generatedAt: string;
}

export interface EnvironmentalKPI {
  id: string;
  schoolId: string;
  name: string;
  category: ESGCategory;
  metric: GreenMetric;
  value: number;
  unit: KPIUnit;
  target: number;
  benchmark: number;
  benchmarkType: BenchmarkType;
  achievement: number;
  trend: TrendDirection;
  period: string;
  dataCollectionMethod: DataCollectionMethod;
  lastUpdated: string;
}

export interface SustainabilityReportRecord {
  id: string;
  schoolId: string;
  type: SustainabilityReport;
  period: ReportingPeriod;
  year: number;
  status: SustainabilityStatus;
  content: string;
  publishedAt?: string;
  complianceStandards: ComplianceStandard[];
  generatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface SustainabilityGoalRecord {
  id: string;
  schoolId: string;
  goal: SustainabilityGoal;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  startDate: string;
  targetDate: string;
  status: SustainabilityStatus;
  progress: number;
  milestones: SustainabilityMilestone[];
  assignedTo: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SustainabilityMilestone {
  id: string;
  goalId: string;
  title: string;
  targetDate: string;
  completedAt?: string;
  isCompleted: boolean;
}

export interface SustainabilityInitiative {
  id: string;
  schoolId: string;
  name: string;
  type: GreenInitiative;
  description: string;
  status: SustainabilityStatus;
  budget: number;
  spent: number;
  expectedImpact: string;
  measuredImpact?: string;
  startDate: string;
  endDate?: string;
  participants: number;
  carbonReduction: number;
  costSavings: number;
  roi: number;
  lead: string;
  createdAt: string;
  updatedAt: string;
}

export interface GreenCampus {
  id: string;
  schoolId: string;
  overallScore: number;
  greenBuilding: GreenBuildingCertification;
  renewableEnergy: RenewableEnergyAsset[];
  waterConservation: WaterConservationAsset[];
  wasteManagement: WasteManagementAsset[];
  greenSpaces: GreenSpace[];
  transportInitiatives: GreenTransportInitiative[];
  biodiversityScore: number;
  lastAuditDate: string;
  nextAuditDate: string;
}

export interface GreenBuildingCertification {
  id: string;
  schoolId: string;
  type: GreenBuilding;
  level: string;
  score: number;
  certifiedDate: string;
  expiryDate: string;
  assessor: string;
  credits: GreenBuildingCredit[];
}

export interface GreenBuildingCredit {
  category: string;
  credit: string;
  points: number;
  maxPoints: number;
  achieved: boolean;
}

export interface RenewableEnergyAsset {
  id: string;
  schoolId: string;
  type: RenewableEnergy;
  capacity: number;
  unit: string;
  annualGeneration: number;
  installDate: string;
  status: string;
  cost: number;
  paybackPeriod: number;
}

export interface EnergyConsumption {
  id: string;
  schoolId: string;
  type: EnergyType;
  source: EnergySource;
  consumption: number;
  unit: string;
  cost: number;
  period: string;
  buildingId?: string;
  intensity: number;
}

export interface WaterConsumption {
  id: string;
  schoolId: string;
  type: WaterType;
  source: WaterSource;
  consumption: number;
  unit: string;
  cost: number;
  period: string;
  buildingId?: string;
  intensity: number;
}

export interface WasteManagement {
  id: string;
  schoolId: string;
  type: WasteType;
  stream: WasteStream;
  quantity: number;
  unit: string;
  destination: string;
  cost: number;
  period: string;
  buildingId?: string;
}

export interface RecyclingMetrics {
  id: string;
  schoolId: string;
  totalRecycled: number;
  recyclingRate: number;
  materialBreakdown: RecyclingMaterial[];
  contaminationRate: number;
  revenue: number;
  period: string;
}

export interface RecyclingMaterial {
  material: WasteRecycling;
  quantity: number;
  unit: string;
  percentage: number;
  revenue: number;
}

export interface CarbonForecast {
  id: string;
  schoolId: string;
  model: ForecastModel;
  scope: CarbonScope;
  historicalData: number[];
  predictions: number[];
  confidenceInterval: [number, number][];
  periods: string[];
  accuracy: number;
  generatedAt: string;
}

export interface EnergyForecast {
  id: string;
  schoolId: string;
  model: ForecastModel;
  historicalData: number[];
  predictions: number[];
  confidenceInterval: [number, number][];
  periods: string[];
  accuracy: number;
  generatedAt: string;
}

export interface WaterForecast {
  id: string;
  schoolId: string;
  model: ForecastModel;
  historicalData: number[];
  predictions: number[];
  confidenceInterval: [number, number][];
  periods: string[];
  accuracy: number;
  generatedAt: string;
}

export interface EnvironmentalAuditRecord {
  id: string;
  schoolId: string;
  type: EnvironmentalAudit;
  auditor: string;
  scope: string;
  findings: AuditFinding[];
  overallRating: string;
  startDate: string;
  endDate: string;
  nextAuditDate: string;
  reportUrl?: string;
  status: SustainabilityStatus;
}

export interface AuditFinding {
  id: string;
  area: string;
  severity: AlertSeverity;
  description: string;
  recommendation: string;
  status: SustainabilityStatus;
}

export interface ComplianceReport {
  id: string;
  schoolId: string;
  standard: ComplianceStandard;
  period: ReportingPeriod;
  year: number;
  complianceScore: number;
  requirements: ComplianceRequirement[];
  gaps: ComplianceGap[];
  status: SustainabilityStatus;
  submittedAt?: string;
  verifiedAt?: string;
}

export interface ComplianceRequirement {
  id: string;
  requirement: string;
  description: string;
  isMet: boolean;
  evidence?: string;
  notes?: string;
}

export interface ComplianceGap {
  id: string;
  requirement: string;
  description: string;
  riskLevel: EnvironmentalImpact;
  remediation: string;
  targetDate: string;
}

export interface SustainabilityScore {
  id: string;
  schoolId: string;
  overall: number;
  environmental: number;
  social: number;
  governance: number;
  rating: ESGRating;
  percentile: number;
  industryAverage: number;
  year: number;
  calculatedAt: string;
}

export interface BiodiversityTracker {
  id: string;
  schoolId: string;
  speciesCount: number;
  speciesList: BiodiversitySpecies[];
  habitatArea: number;
  greenSpaceArea: number;
  treesPlanted: number;
  treesLost: number;
  impact: BiodiversityImpact;
  score: number;
  lastSurveyDate: string;
  nextSurveyDate: string;
}

export interface BiodiversitySpecies {
  name: string;
  type: string;
  status: string;
  population: number;
  trend: TrendDirection;
}

export interface AirQualityMonitor {
  id: string;
  schoolId: string;
  location: string;
  aqi: number;
  status: AirQuality;
  pm25: number;
  pm10: number;
  co2: number;
  no2: number;
  so2: number;
  o3: number;
  temperature: number;
  humidity: number;
  lastReading: string;
  readings: AirQualityReading[];
}

export interface AirQualityReading {
  timestamp: string;
  aqi: number;
  pm25: number;
  pm10: number;
}

export interface NoiseMonitor {
  id: string;
  schoolId: string;
  location: string;
  currentLevel: number;
  status: NoiseLevel;
  averageLevel: number;
  peakLevel: number;
  readings: NoiseReading[];
  lastReading: string;
}

export interface NoiseReading {
  timestamp: string;
  level: number;
}

export interface GreenTransport {
  id: string;
  schoolId: string;
  type: GreenTransportMode;
  description: string;
  participants: number;
  tripsPerDay: number;
  distanceSaved: number;
  emissionsAvoided: number;
  cost: number;
  status: SustainabilityStatus;
  startDate: string;
}

export type GreenTransportMode = 'ELECTRIC_VEHICLE' | 'BICYCLE' | 'WALKING' | 'PUBLIC_TRANSPORT' | 'CARPOOL' | 'SHUTTLE';

export interface SustainableProcurementRecord {
  id: string;
  schoolId: string;
  category: string;
  criteria: SustainableProcurement;
  vendor: string;
  product: string;
  greenScore: number;
  cost: number;
  savings: number;
  certification?: string;
  date: string;
}

export interface CircularEconomyRecord {
  id: string;
  schoolId: string;
  type: CircularEconomy;
  item: string;
  quantity: number;
  costSaved: number;
  wasteDiverted: number;
  date: string;
}

export interface SocialImpactRecord {
  id: string;
  schoolId: string;
  type: SocialImpact;
  initiative: string;
  description: string;
  beneficiaries: number;
  investment: number;
  outcome: string;
  impactScore: number;
  date: string;
}

export interface ClimateActionRecord {
  id: string;
  schoolId: string;
  type: ClimateAction;
  action: string;
  description: string;
  status: SustainabilityStatus;
  carbonImpact: number;
  costImpact: number;
  startDate: string;
  endDate?: string;
}

export interface EnvironmentalPolicyRecord {
  id: string;
  schoolId: string;
  type: EnvironmentalPolicy;
  title: string;
  version: string;
  effectiveDate: string;
  status: SustainabilityStatus;
  approvedBy: string;
  reviewDate: string;
  complianceRate: number;
}

export interface CarbonCreditRecord {
  id: string;
  schoolId: string;
  type: CarbonCredit;
  projectName: string;
  provider: string;
  vintage: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  retirementDate?: string;
  verificationBody: string;
  serialNumber: string;
}

export interface SustainabilityDashboard {
  id: string;
  schoolId: string;
  carbonFootprint: CarbonFootprint;
  energy: EnergyAnalytics;
  water: WaterAnalytics;
  waste: WasteAnalytics;
  kpis: EnvironmentalKPI[];
  goals: SustainabilityGoalRecord[];
  initiatives: SustainabilityInitiative[];
  greenCampus: GreenCampus;
  score: SustainabilityScore;
  alerts: SustainabilityAlert[];
  generatedAt: string;
}

export interface SustainabilityAlert {
  id: string;
  schoolId: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  category: ESGCategory;
  metric: string;
  currentValue: number;
  threshold: number;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  createdAt: string;
}

export interface SustainabilityTrend {
  id: string;
  schoolId: string;
  metric: string;
  category: ESGCategory;
  direction: TrendDirection;
  changePercent: number;
  currentValue: number;
  previousValue: number;
  period: string;
}

export interface SustainabilityBenchmark {
  id: string;
  schoolId: string;
  metric: string;
  value: number;
  benchmarkValue: number;
  benchmarkType: BenchmarkType;
  unit: string;
  performance: 'ABOVE' | 'AT' | 'BELOW';
  gap: number;
}

export interface WaterConservationAsset {
  id: string;
  schoolId: string;
  type: WaterConservation;
  description: string;
  capacity: number;
  annualSavings: number;
  installDate: string;
  status: string;
  cost: number;
  paybackPeriod: number;
}

export interface WasteManagementAsset {
  id: string;
  schoolId: string;
  type: string;
  description: string;
  capacity: number;
  annualProcessing: number;
  installDate: string;
  status: string;
  cost: number;
}

export interface GreenSpace {
  id: string;
  schoolId: string;
  name: string;
  area: number;
  type: string;
  biodiversityScore: number;
  treesCount: number;
  lastMaintenance: string;
}

export interface GreenTransportInitiative {
  id: string;
  schoolId: string;
  type: GreenTransportType;
  description: string;
  participants: number;
  annualEmissionsSaved: number;
  status: SustainabilityStatus;
}

export interface SoilQualityRecord {
  id: string;
  schoolId: string;
  location: string;
  quality: SoilQuality;
  ph: number;
  organicMatter: number;
  contaminants: string[];
  lastTested: string;
}

export interface NoiseLevelRecord {
  id: string;
  schoolId: string;
  location: string;
  level: NoiseLevel;
  decibels: number;
  source: string;
  measuredAt: string;
}

export interface LandUseRecord {
  id: string;
  schoolId: string;
  area: number;
  type: LandUse;
  description: string;
  environmentalValue: number;
  lastAssessed: string;
}
