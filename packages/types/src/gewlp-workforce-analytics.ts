export enum AnalyticsType {
  LABOR_MARKET = 'LABOR_MARKET',
  EMPLOYMENT = 'EMPLOYMENT',
  UNEMPLOYMENT = 'UNEMPLOYMENT',
  SKILL_DEMAND = 'SKILL_DEMAND',
  SALARY = 'SALARY',
  INDUSTRY = 'INDUSTRY',
  SECTOR = 'SECTOR',
  GEOGRAPHIC = 'GEOGRAPHIC',
  EDUCATION_TO_EMPLOYMENT = 'EDUCATION_TO_EMPLOYMENT',
  WORKFORCE_FORECAST = 'WORKFORCE_FORECAST',
  TALENT_SUPPLY = 'TALENT_SUPPLY',
  COMPREHENSIVE = 'COMPREHENSIVE',
}

export enum ForecastModel {
  LINEAR_REGRESSION = 'LINEAR_REGRESSION',
  POLYNOMIAL = 'POLYNOMIAL',
  ARIMA = 'ARIMA',
  EXPONENTIAL_SMOOTHING = 'EXPONENTIAL_SMOOTHING',
  NEURAL_NETWORK = 'NEURAL_NETWORK',
  RANDOM_FOREST = 'RANDOM_FOREST',
  GRADIENT_BOOSTING = 'GRADIENT_BOOSTING',
  ENSEMBLE = 'ENSEMBLE',
  BAYESIAN = 'BAYESIAN',
  MONTE_CARLO = 'MONTE_CARLO',
}

export enum IndicatorType {
  EMPLOYABILITY_RATE = 'EMPLOYABILITY_RATE',
  EMPLOYMENT_RATE = 'EMPLOYMENT_RATE',
  UNEMPLOYMENT_RATE = 'UNEMPLOYMENT_RATE',
  SKILL_GAP_RATE = 'SKILL_GAP_RATE',
  GRADUATE_EMPLOYMENT_RATE = 'GRADUATE_EMPLOYMENT_RATE',
  TRAINING_ROI = 'TRAINING_ROI',
  CERTIFICATION_TO_EMPLOYMENT = 'CERTIFICATION_TO_EMPLOYMENT',
  TIME_TO_EMPLOYMENT = 'TIME_TO_EMPLOYMENT',
  TALENT_DEMAND_INDEX = 'TALENT_DEMAND_INDEX',
  SKILL_DEMAND_INDEX = 'SKILL_DEMAND_INDEX',
  LABOR_FORCE_PARTICIPATION = 'LABOR_FORCE_PARTICIPATION',
  PRODUCTIVITY_INDEX = 'PRODUCTIVITY_INDEX',
}

export enum DataSourceType {
  SURVEY = 'SURVEY',
  CENSUS = 'CENSUS',
  GOVERNMENT = 'GOVERNMENT',
  INDUSTRY = 'INDUSTRY',
  ACADEMIC = 'ACADEMIC',
  PLATFORM = 'PLATFORM',
  AGGREGATOR = 'AGGREGATOR',
  REAL_TIME = 'REAL_TIME',
  HISTORICAL = 'HISTORICAL',
  HYBRID = 'HYBRID',
}

export enum GranularityType {
  GLOBAL = 'GLOBAL',
  CONTINENTAL = 'CONTINENTAL',
  NATIONAL = 'NATIONAL',
  REGIONAL = 'REGIONAL',
  LOCAL = 'LOCAL',
  INDUSTRY = 'INDUSTRY',
  SECTOR = 'SECTOR',
  COMPANY = 'COMPANY',
  DEPARTMENT = 'DEPARTMENT',
  INDIVIDUAL = 'INDIVIDUAL',
}

export enum ReportType {
  EXECUTIVE_SUMMARY = 'EXECUTIVE_SUMMARY',
  DETAILED_ANALYSIS = 'DETAILED_ANALYSIS',
  TREND_REPORT = 'TREND_REPORT',
  FORECAST_REPORT = 'FORECAST_REPORT',
  COMPARISON_REPORT = 'COMPARISON_REPORT',
  BENCHMARK_REPORT = 'BENCHMARK_REPORT',
  REAL_TIME_DASHBOARD = 'REAL_TIME_DASHBOARD',
  PERIODIC_REPORT = 'PERIODIC_REPORT',
  CUSTOM_REPORT = 'CUSTOM_REPORT',
  REGULATORY_REPORT = 'REGULATORY_REPORT',
}

export enum TrendDirection {
  INCREASING = 'INCREASING',
  DECREASING = 'DECREASING',
  STABLE = 'STABLE',
  VOLATILE = 'VOLATILE',
  SEASONAL = 'SEASONAL',
  CYCLICAL = 'CYCLICAL',
  LINEAR = 'LINEAR',
  EXPONENTIAL = 'EXPONENTIAL',
  PLATEAU = 'PLATEAU',
  UNKNOWN = 'UNKNOWN',
}

export enum IndustrySector {
  TECHNOLOGY = 'TECHNOLOGY',
  HEALTHCARE = 'HEALTHCARE',
  FINANCE = 'FINANCE',
  EDUCATION = 'EDUCATION',
  MANUFACTURING = 'MANUFACTURING',
  RETAIL = 'RETAIL',
  CONSTRUCTION = 'CONSTRUCTION',
  ENERGY = 'ENERGY',
  TRANSPORTATION = 'TRANSPORTATION',
  HOSPITALITY = 'HOSPITALITY',
}

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  TEMPORARY = 'TEMPORARY',
  FREELANCE = 'FREELANCE',
  INTERNSHIP = 'INTERNSHIP',
  APPRENTICESHIP = 'APPRENTICESHIP',
  SEASONAL = 'SEASONAL',
  CASUAL = 'CASUAL',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
}

export enum SkillCategory {
  TECHNICAL = 'TECHNICAL',
  DIGITAL = 'DIGITAL',
  SOFT_SKILLS = 'SOFT_SKILLS',
  LEADERSHIP = 'LEADERSHIP',
  ANALYTICAL = 'ANALYTICAL',
  COMMUNICATION = 'COMMUNICATION',
  CREATIVE = 'CREATIVE',
  MANAGEMENT = 'MANAGEMENT',
  DOMAIN_SPECIFIC = 'DOMAIN_SPECIFIC',
  TRANSFERABLE = 'TRANSFERABLE',
}

export enum EducationLevel {
  NO_FORMAL = 'NO_FORMAL',
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  VOCATIONAL = 'VOCATIONAL',
  BACHELORS = 'BACHELORS',
  MASTERS = 'MASTERS',
  DOCTORATE = 'DOCTORATE',
  POST_DOCTORATE = 'POST_DOCTORATE',
  PROFESSIONAL = 'PROFESSIONAL',
  CERTIFICATION = 'CERTIFICATION',
}

export enum AgeGroup {
  YOUTH_15_24 = 'YOUTH_15_24',
  YOUNG_ADULT_25_34 = 'YOUNG_ADULT_25_34',
  MID_CAREER_35_44 = 'MID_CAREER_35_44',
  SENIOR_45_54 = 'SENIOR_45_54',
  EXPERIENCED_55_64 = 'EXPERIENCED_55_64',
  RETIREMENT_AGE_65_PLUS = 'RETIREMENT_AGE_65_PLUS',
}

export enum GeographicRegion {
  AFRICA = 'AFRICA',
  ASIA = 'ASIA',
  EUROPE = 'EUROPE',
  NORTH_AMERICA = 'NORTH_AMERICA',
  SOUTH_AMERICA = 'SOUTH_AMERICA',
  OCEANIA = 'OCEANIA',
  MIDDLE_EAST = 'MIDDLE_EAST',
  GLOBAL = 'GLOBAL',
  SUB_SAHARAN = 'SUB_SAHARAN',
  WEST_AFRICA = 'WEST_AFRICA',
}

export enum EconomicIndicator {
  GDP = 'GDP',
  GDP_GROWTH = 'GDP_GROWTH',
  INFLATION = 'INFLATION',
  INTEREST_RATE = 'INTEREST_RATE',
  EXCHANGE_RATE = 'EXCHANGE_RATE',
  FOREIGN_INVESTMENT = 'FOREIGN_INVESTMENT',
  INDUSTRIAL_PRODUCTION = 'INDUSTRIAL_PRODUCTION',
  CONSUMER_CONFIDENCE = 'CONSUMER_CONFIDENCE',
  BUSINESS_CONFIDENCE = 'BUSINESS_CONFIDENCE',
  TRADE_BALANCE = 'TRADE_BALANCE',
}

export enum DataQualityLevel {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  ESTIMATED = 'ESTIMATED',
  PROJECTED = 'PROJECTED',
  PRELIMINARY = 'PRELIMINARY',
  REVISED = 'REVISED',
  PROVISIONAL = 'PROVISIONAL',
  FINAL = 'FINAL',
  UNVERIFIED = 'UNVERIFIED',
}

export enum AnalyticsFrequency {
  REAL_TIME = 'REAL_TIME',
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMI_ANNUAL = 'SEMI_ANNUAL',
  ANNUAL = 'ANNUAL',
  ON_DEMAND = 'ON_DEMAND',
}

export enum ForecastHorizon {
  SHORT_TERM = 'SHORT_TERM',
  MEDIUM_TERM = 'MEDIUM_TERM',
  LONG_TERM = 'LONG_TERM',
  IMMEDIATE = 'IMMEDIATE',
  TACTICAL = 'TACTICAL',
  STRATEGIC = 'STRATEGIC',
  SCENARIO_BASED = 'SCENARIO_BASED',
  ADAPTIVE = 'ADAPTIVE',
  DYNAMIC = 'DYNAMIC',
  REAL_TIME = 'REAL_TIME',
}

export enum MetricUnit {
  PERCENTAGE = 'PERCENTAGE',
  INDEX = 'INDEX',
  RATIO = 'RATIO',
  CURRENCY = 'CURRENCY',
  COUNT = 'COUNT',
  RATE = 'RATE',
  SCORE = 'SCORE',
  HOURS = 'HOURS',
  DAYS = 'DAYS',
  YEARS = 'YEARS',
}

export enum VisualizationType {
  LINE_CHART = 'LINE_CHART',
  BAR_CHART = 'BAR_CHART',
  PIE_CHART = 'PIE_CHART',
  HEATMAP = 'HEATMAP',
  GEOGRAPHIC_MAP = 'GEOGRAPHIC_MAP',
  SCATTER_PLOT = 'SCATTER_PLOT',
  AREA_CHART = 'AREA_CHART',
  TREEMAP = 'TREEMAP',
  DASHBOARD = 'DASHBOARD',
  TABLE = 'TABLE',
}

export enum AlertType {
  THRESHOLD = 'THRESHOLD',
  TREND = 'TREND',
  ANOMALY = 'ANOMALY',
  FORECAST = 'FORECAST',
  BENCHMARK = 'BENCHMARK',
  COMPLIANCE = 'COMPLIANCE',
  REAL_TIME = 'REAL_TIME',
  SCHEDULED = 'SCHEDULED',
  CUSTOM = 'CUSTOM',
  CRITICAL = 'CRITICAL',
}

export enum InsightType {
  TREND = 'TREND',
  ANOMALY = 'ANOMALY',
  CORRELATION = 'CORRELATION',
  CAUSATION = 'CAUSATION',
  PREDICTION = 'PREDICTION',
  RECOMMENDATION = 'RECOMMENDATION',
  COMPARISON = 'COMPARISON',
  BENCHMARK = 'BENCHMARK',
  RISK = 'RISK',
  OPPORTUNITY = 'OPPORTUNITY',
}

export enum BenchmarkType {
  INDUSTRY = 'INDUSTRY',
  REGIONAL = 'REGIONAL',
  NATIONAL = 'NATIONAL',
  GLOBAL = 'GLOBAL',
  HISTORICAL = 'HISTORICAL',
  BEST_PRACTICE = 'BEST_PRACTICE',
  PEER = 'PEER',
  COMPETITOR = 'COMPETITOR',
  SELF = 'SELF',
  TARGET = 'TARGET',
}

export enum DataAggregation {
  SUM = 'SUM',
  AVERAGE = 'AVERAGE',
  MEDIAN = 'MEDIAN',
  MIN = 'MIN',
  MAX = 'MAX',
  COUNT = 'COUNT',
  PERCENTILE = 'PERCENTILE',
  STANDARD_DEVIATION = 'STANDARD_DEVIATION',
  VARIANCE = 'VARIANCE',
  WEIGHTED_AVERAGE = 'WEIGHTED_AVERAGE',
}

export enum AnalyticsAccessLevel {
  PUBLIC = 'PUBLIC',
  INTERNAL = 'INTERNAL',
  CONFIDENTIAL = 'CONFIDENTIAL',
  RESTRICTED = 'RESTRICTED',
  EXECUTIVE = 'EXECUTIVE',
  DEPARTMENTAL = 'DEPARTMENTAL',
  INDIVIDUAL = 'INDIVIDUAL',
  ROLE_BASED = 'ROLE_BASED',
  CUSTOM = 'CUSTOM',
  AUDIT = 'AUDIT',
}

export enum ForecastConfidence {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
  UNCERTAIN = 'UNCERTAIN',
  SPECULATIVE = 'SPECULATIVE',
  ESTIMATED = 'ESTIMATED',
  MODELED = 'MODELED',
  VALIDATED = 'VALIDATED',
}

export enum LaborMarketCondition {
  TIGHT = 'TIGHT',
  BALANCED = 'BALANCED',
  LOOSE = 'LOOSE',
  CRISIS = 'CRISIS',
  RECOVERY = 'RECOVERY',
  GROWTH = 'GROWTH',
  DECLINE = 'DECLINE',
  TRANSITION = 'TRANSITION',
  DISRUPTION = 'DISRUPTION',
  STABILIZATION = 'STABILIZATION',
}

export enum SkillDemandTrend {
  RAPID_GROWTH = 'RAPID_GROWTH',
  GROWTH = 'GROWTH',
  STABLE = 'STABLE',
  DECLINE = 'DECLINE',
  RAPID_DECLINE = 'RAPID_DECLINE',
  EMERGING = 'EMERGING',
  MATURING = 'MATURING',
  OBsolescent = 'OBSOLESCENT',
  RECURRING = 'RECURRING',
  SEASONAL = 'SEASONAL',
}

export enum EducationEmploymentAlignment {
  HIGHLY_ALIGNED = 'HIGHLY_ALIGNED',
  ALIGNED = 'ALIGNED',
  PARTIALLY_ALIGNED = 'PARTIALLY_ALIGNED',
  MISALIGNED = 'MISALIGNED',
  HIGHLY_MISALIGNED = 'HIGHLY_MISALIGNED',
  IMPROVING = 'IMPROVING',
  DECLINING = 'DECLINING',
  STABLE = 'STABLE',
  TRANSITIONING = 'TRANSITIONING',
  UNKNOWN = 'UNKNOWN',
}

export enum WorkforceRiskType {
  SKILL_SHORTAGE = 'SKILL_SHORTAGE',
  TALENT_FLIGHT = 'TALENT_FLIGHT',
  DEMOGRAPHIC = 'DEMOGRAPHIC',
  TECHNOLOGY_DISRUPTION = 'TECHNOLOGY_DISRUPTION',
  ECONOMIC = 'ECONOMIC',
  REGULATORY = 'REGULATORY',
  HEALTH = 'HEALTH',
  CLIMATE = 'CLIMATE',
  GEOPOLITICAL = 'GEOPOLITICAL',
  SOCIAL = 'SOCIAL',
}

export enum AnalyticsVisualization {
  DASHBOARD = 'DASHBOARD',
  CHART = 'CHART',
  MAP = 'MAP',
  TABLE = 'TABLE',
  REPORT = 'REPORT',
  INFOGRAPHIC = 'INFOGRAPHIC',
  STORY = 'STORY',
  INTERACTIVE = 'INTERACTIVE',
  REAL_TIME = 'REAL_TIME',
  EXPORT = 'EXPORT',
}

export enum AnalyticsRefreshRate {
  REAL_TIME = 'REAL_TIME',
  MINUTELY = 'MINUTELY',
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ON_DEMAND = 'ON_DEMAND',
  EVENT_DRIVEN = 'EVENT_DRIVEN',
  SCHEDULED = 'SCHEDULED',
}

export enum TalentDemandSource {
  JOB_POSTINGS = 'JOB_POSTINGS',
  RECRUITMENT = 'RECRUITMENT',
  INTERNAL = 'INTERNAL',
  MARKET_RESEARCH = 'MARKET_RESEARCH',
  SURVEY = 'SURVEY',
  AI_PREDICTION = 'AI_PREDICTION',
  INDUSTRY_REPORT = 'INDUSTRY_REPORT',
  GOVERNMENT_DATA = 'GOVERNMENT_DATA',
  ACADEMIC_STUDY = 'ACADEMIC_STUDY',
  CONSULTING = 'CONSULTING',
}

export enum EducationOutcomeType {
  EMPLOYMENT = 'EMPLOYMENT',
  EARNINGS = 'EARNINGS',
  CAREER_PROGRESSION = 'CAREER_PROGRESSION',
  SKILL_MATCH = 'SKILL_MATCH',
  JOB_SATISFACTION = 'JOB_SATISFACTION',
  ENTREPRENEURSHIP = 'ENTREPRENEURSHIP',
  FURTHER_EDUCATION = 'FURTHER_EDUCATION',
  SOCIAL_MOBILITY = 'SOCIAL_MOBILITY',
  PRODUCTIVITY = 'PRODUCTIVITY',
  INNOVATION = 'INNOVATION',
}

export enum AnalyticsDataFormat {
  JSON = 'JSON',
  CSV = 'CSV',
  XML = 'XML',
  PARQUET = 'PARQUET',
  AVRO = 'AVRO',
  PROTOBUF = 'PROTOBUF',
  ORC = 'ORC',
  DELTA = 'DELTA',
  ICEBERG = 'ICEBERG',
  CUSTOM = 'CUSTOM',
}

export enum AnalyticsPermission {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  EXPORT = 'EXPORT',
  SHARE = 'SHARE',
  DELETE = 'DELETE',
  CREATE = 'CREATE',
  ADMIN = 'ADMIN',
  AUDIT = 'AUDIT',
  MANAGE = 'MANAGE',
  CUSTOM = 'CUSTOM',
}

export enum LaborMarketAnalytics {
  id: string;
  school_id: string;
  analysis_name: string;
  geographic_region: GeographicRegion;
  country: string;
  region: string;
  analysis_date: string;
  period_start: string;
  period_end: string;
  labor_force_size: number;
  employed_persons: number;
  unemployed_persons: number;
  labor_force_participation_rate: number;
  unemployment_rate: number;
  employment_rate: number;
  underemployment_rate: number;
  informal_employment_rate: number;
  working_poverty_rate: number;
  gender_gap: number;
  youth_unemployment_rate: number;
  skill_shortage_areas: string[];
  emerging_occupations: string[];
  declining_occupations: string[];
  wage_growth: number;
  productivity_growth: number;
  economic_indicators: EconomicIndicatorData[];
  data_sources: AnalyticsDataSource[];
  quality_level: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface EconomicIndicatorData {
  indicator: EconomicIndicator;
  value: number;
  unit: string;
  change_percentage: number;
  trend: TrendDirection;
  period: string;
}

export interface AnalyticsDataSource {
  source_name: string;
  source_type: DataSourceType;
  reliability_score: number;
  data_freshness: string;
  coverage: string;
  url: string;
}

export interface EmploymentAnalytics {
  id: string;
  school_id: string;
  analysis_name: string;
  geographic_region: GeographicRegion;
  country: string;
  industry: IndustrySector;
  analysis_date: string;
  period: string;
  total_employed: number;
  full_time_employed: number;
  part_time_employed: number;
  contract_employed: number;
  self_employed: number;
  employment_growth_rate: number;
  job_creation_rate: number;
  job_destruction_rate: number;
  net_job_growth: number;
  average_tenure: number;
  turnover_rate: number;
  hiring_rate: number;
  separation_rate: number;
  employment_by_education: EducationEmploymentBreakdown[];
  employment_by_age: AgeEmploymentBreakdown[];
  employment_by_gender: GenderEmploymentBreakdown[];
  top_growing_occupations: OccupationGrowth[];
  top_declining_occupations: OccupationGrowth[];
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface EducationEmploymentBreakdown {
  education_level: EducationLevel;
  employed_count: number;
  employment_rate: number;
  avg_earnings: number;
  underemployment_rate: number;
}

export interface AgeEmploymentBreakdown {
  age_group: AgeGroup;
  employed_count: number;
  employment_rate: number;
  unemployment_rate: number;
  labor_participation_rate: number;
}

export interface GenderEmploymentBreakdown {
  gender: string;
  employed_count: number;
  employment_rate: number;
  pay_gap: number;
  leadership_representation: number;
}

export interface OccupationGrowth {
  occupation: string;
  growth_rate: number;
  current_employment: number;
  projected_employment: number;
  avg_salary: number;
  skill_requirements: string[];
}

export interface UnemploymentAnalytics {
  id: string;
  school_id: string;
  analysis_name: string;
  geographic_region: GeographicRegion;
  country: string;
  analysis_date: string;
  period: string;
  total_unemployed: number;
  unemployment_rate: number;
  youth_unemployment_rate: number;
  long_term_unemployment_rate: number;
  structural_unemployment_rate: number;
  frictional_unemployment_rate: number;
  cyclical_unemployment_rate: number;
  unemployment_by_education: EducationUnemploymentBreakdown[];
  unemployment_by_age: AgeUnemploymentBreakdown[];
  unemployment_by_duration: DurationBreakdown[];
  unemployment_by_cause: CauseBreakdown[];
  job_seeker_count: number;
  vacancy_count: number;
  job_match_rate: number;
  avg_job_search_duration: number;
  government_programs: GovernmentProgram[];
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface EducationUnemploymentBreakdown {
  education_level: EducationLevel;
  unemployed_count: number;
  unemployment_rate: number;
  avg_search_duration: number;
}

export interface AgeUnemploymentBreakdown {
  age_group: AgeGroup;
  unemployed_count: number;
  unemployment_rate: number;
  labor_force_participation: number;
}

export interface DurationBreakdown {
  duration_range: string;
  count: number;
  percentage: number;
  avg_age: number;
}

export interface CauseBreakdown {
  cause: string;
  count: number;
  percentage: number;
  avg_duration: number;
}

export interface GovernmentProgram {
  program_name: string;
  description: string;
  participants: number;
  budget: number;
  effectiveness_score: number;
}

export interface SkillDemandAnalytics {
  id: string;
  school_id: string;
  analysis_name: string;
  geographic_region: GeographicRegion;
  country: string;
  industry: IndustrySector;
  analysis_date: string;
  period: string;
  top_demanded_skills: SkillDemandItem[];
  emerging_skills: SkillDemandItem[];
  declining_skills: SkillDemandItem[];
  skill_demand_index: number;
  skill_supply_index: number;
  skill_gap_index: number;
  avg_skill_premium: number;
  skill_replacement_rate: number;
  technology_impact_score: number;
  automation_risk_score: number;
  skill_demand_by_sector: SectorSkillDemand[];
  skill_demand_forecast: SkillDemandForecastItem[];
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface SkillDemandItem {
  skill_name: string;
  skill_category: SkillCategory;
  demand_level: SkillDemandTrend;
  demand_index: number;
  growth_rate: number;
  job_postings_count: number;
  avg_salary_premium: number;
  industries: string[];
  related_skills: string[];
}

export interface SectorSkillDemand {
  sector: string;
  top_skills: SkillDemandItem[];
  total_demand: number;
  growth_rate: number;
}

export interface SkillDemandForecastItem {
  skill_name: string;
  current_demand: number;
  projected_demand_1y: number;
  projected_demand_3y: number;
  projected_demand_5y: number;
  confidence: ForecastConfidence;
  growth_rate: number;
}

export interface SalaryAnalytics {
  id: string;
  school_id: string;
  analysis_name: string;
  geographic_region: GeographicRegion;
  country: string;
  industry: IndustrySector;
  analysis_date: string;
  period: string;
  median_salary: number;
  average_salary: number;
  salary_range_min: number;
  salary_range_max: number;
  salary_percentile_25: number;
  salary_percentile_75: number;
  salary_growth_rate: number;
  inflation_adjusted_growth: number;
  gender_pay_gap: number;
  education_premium: number;
  experience_premium: number;
  salary_by_education: EducationSalaryBreakdown[];
  salary_by_experience: ExperienceSalaryBreakdown[];
  salary_by_industry: IndustrySalaryBreakdown[];
  salary_by_occupation: OccupationSalary[];
  cost_of_living_index: number;
  purchasing_power_index: number;
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface EducationSalaryBreakdown {
  education_level: EducationLevel;
  median_salary: number;
  average_salary: number;
  salary_premium: number;
  employment_rate: number;
}

export interface ExperienceSalaryBreakdown {
  experience_range: string;
  median_salary: number;
  average_salary: number;
  salary_growth: number;
}

export interface IndustrySalaryBreakdown {
  industry: IndustrySector;
  median_salary: number;
  average_salary: number;
  salary_growth: number;
  employment_count: number;
}

export interface OccupationSalary {
  occupation: string;
  median_salary: number;
  average_salary: number;
  salary_range_min: number;
  salary_range_max: number;
  growth_rate: number;
}

export interface IndustryAnalytics {
  id: string;
  school_id: string;
  analysis_name: string;
  industry: IndustrySector;
  geographic_region: GeographicRegion;
  country: string;
  analysis_date: string;
  period: string;
  total_employment: number;
  employment_growth_rate: number;
  revenue_per_employee: number;
  productivity_index: number;
  average_salary: number;
  job_creation_rate: number;
  job_destruction_rate: number;
  investment_level: number;
  innovation_index: number;
  digital_maturity: number;
  sustainability_score: number;
  competitive_intensity: number;
  top_competitors: string[];
  key_trends: string[];
  workforce_demographics: WorkforceDemographics;
  skill_requirements: IndustrySkillRequirements;
  technology_adoption: TechnologyAdoption;
  forecast: IndustryForecast;
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface WorkforceDemographics {
  total_workforce: number;
  avg_age: number;
  avg_tenure: number;
  gender_distribution: Record<string, number>;
  education_distribution: Record<EducationLevel, number>;
  turnover_rate: number;
  engagement_score: number;
}

export interface IndustrySkillRequirements {
  critical_skills: SkillRequirement[];
  emerging_skills: SkillRequirement[];
  declining_skills: SkillRequirement[];
  skill_gap_areas: string[];
}

export interface SkillRequirement {
  skill_name: string;
  importance_score: number;
  scarcity_score: number;
  growth_rate: number;
}

export interface TechnologyAdoption {
  automation_level: number;
  ai_adoption: number;
  digital_transformation_score: number;
  technology_investment: number;
  future_ready_score: number;
}

export interface IndustryForecast {
  growth_rate_forecast: number;
  employment_forecast: number;
  revenue_forecast: number;
  risk_factors: string[];
  opportunities: string[];
  confidence: ForecastConfidence;
}

export interface SectorAnalytics {
  id: string;
  school_id: string;
  analysis_name: string;
  sector: string;
  industry: IndustrySector;
  geographic_region: GeographicRegion;
  country: string;
  analysis_date: string;
  period: string;
  sector_size: number;
  growth_rate: number;
  employment: number;
  avg_salary: number;
  investment_level: number;
  innovation_index: number;
  export_contribution: number;
  gdp_contribution: number;
  employment_by_sub_sector: SubSectorEmployment[];
  key_players: KeyPlayer[];
  trends: SectorTrend[];
  challenges: string[];
  opportunities: string[];
  policy_impact: PolicyImpact[];
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface SubSectorEmployment {
  sub_sector: string;
  employment: number;
  growth_rate: number;
  avg_salary: number;
}

export interface KeyPlayer {
  company_name: string;
  market_share: number;
  employees: number;
  revenue: number;
  headquarters: string;
}

export interface SectorTrend {
  trend_name: string;
  description: string;
  impact_level: string;
  timeline: string;
  affected_areas: string[];
}

export interface PolicyImpact {
  policy_name: string;
  description: string;
  impact: string;
  affected_sectors: string[];
  timeline: string;
}

export interface GeographicAnalytics {
  id: string;
  school_id: string;
  analysis_name: string;
  geographic_region: GeographicRegion;
  country: string;
  region: string;
  city: string;
  analysis_date: string;
  period: string;
  population: number;
  labor_force: number;
  employment_rate: number;
  unemployment_rate: number;
  avg_salary: number;
  cost_of_living: number;
  quality_of_life_index: number;
  economic_diversity_index: number;
  talent_density: number;
  infrastructure_score: number;
  education_institutions: number;
  industry_mix: IndustryMix[];
  talent_flow: TalentFlow[];
  migration_patterns: MigrationPattern[];
  urban_rural_split: UrbanRuralSplit;
  regional_competitiveness: RegionalCompetitiveness;
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface IndustryMix {
  industry: IndustrySector;
  employment_share: number;
  gdp_share: number;
  growth_rate: number;
}

export interface TalentFlow {
  origin: string;
  destination: string;
  flow_count: number;
  flow_type: string;
  avg_salary_differential: number;
  primary_reasons: string[];
}

export interface MigrationPattern {
  origin_region: string;
  destination_region: string;
  migration_count: number;
  avg_age: number;
  education_level: EducationLevel;
  primary_reasons: string[];
}

export interface UrbanRuralSplit {
  urban_population: number;
  rural_population: number;
  urban_employment_rate: number;
  rural_employment_rate: number;
  urban_avg_salary: number;
  rural_avg_salary: number;
  urbanization_rate: number;
}

export interface RegionalCompetitiveness {
  competitiveness_index: number;
  innovation_score: number;
  infrastructure_score: number;
  human_capital_score: number;
  market_size_score: number;
  business_efficiency_score: number;
  global_ranking: number;
}

export interface WorkforceForecast {
  id: string;
  school_id: string;
  forecast_name: string;
  geographic_region: GeographicRegion;
  country: string;
  industry: IndustrySector;
  forecast_date: string;
  forecast_horizon: ForecastHorizon;
  forecast_model: ForecastModel;
  baseline_year: number;
  forecast_years: number[];
  employment_forecast: EmploymentForecastData[];
  skill_demand_forecast: SkillDemandForecastData[];
  salary_forecast: SalaryForecastData[];
  industry_growth_forecast: IndustryGrowthForecastData[];
  scenario_analysis: ScenarioAnalysis[];
  confidence_intervals: ConfidenceInterval[];
  assumptions: string[];
  risk_factors: string[];
  methodology: string;
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface EmploymentForecastData {
  year: number;
  employment_level: number;
  employment_growth_rate: number;
  confidence_low: number;
  confidence_high: number;
  scenario: string;
}

export interface SkillDemandForecastData {
  year: number;
  skill_name: string;
  demand_index: number;
  growth_rate: number;
  confidence: ForecastConfidence;
  scenario: string;
}

export interface SalaryForecastData {
  year: number;
  median_salary: number;
  salary_growth_rate: number;
  inflation_adjusted: number;
  confidence: ForecastConfidence;
  scenario: string;
}

export interface IndustryGrowthForecastData {
  year: number;
  industry: IndustrySector;
  growth_rate: number;
  employment_impact: number;
  investment_required: number;
  scenario: string;
}

export interface ScenarioAnalysis {
  scenario_name: string;
  description: string;
  probability: number;
  employment_impact: number;
  skill_impact: string[];
  salary_impact: number;
  timeline: string;
}

export interface ConfidenceInterval {
  metric: string;
  year: number;
  point_estimate: number;
  lower_bound: number;
  upper_bound: number;
  confidence_level: number;
}

export interface EmploymentForecast {
  id: string;
  school_id: string;
  forecast_name: string;
  geographic_region: GeographicRegion;
  country: string;
  industry: IndustrySector;
  forecast_date: string;
  forecast_horizon: ForecastHorizon;
  current_employment: number;
  projected_employment: number[];
  growth_rate_projected: number;
  job_creation_projected: number;
  job_destruction_projected: number;
  net_job_change: number;
  key_drivers: string[];
  assumptions: string[];
  confidence: ForecastConfidence;
  methodology: string;
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface SkillDemandForecast {
  id: string;
  school_id: string;
  forecast_name: string;
  geographic_region: GeographicRegion;
  country: string;
  industry: IndustrySector;
  forecast_date: string;
  forecast_horizon: ForecastHorizon;
  current_skills_demand: SkillCurrentDemand[];
  projected_skills_demand: SkillProjectedDemand[];
  emerging_skills: string[];
  declining_skills: string[];
  skill_gap_forecast: SkillGapForecast[];
  investment_needed: number;
  training_capacity_required: number;
  confidence: ForecastConfidence;
  methodology: string;
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface SkillCurrentDemand {
  skill_name: string;
  current_index: number;
  growth_trend: TrendDirection;
  industries: string[];
  avg_premium: number;
}

export interface SkillProjectedDemand {
  skill_name: string;
  projected_index: number;
  growth_rate: number;
  scenario: string;
  confidence: ForecastConfidence;
}

export interface SkillGapForecast {
  skill_name: string;
  current_supply: number;
  projected_demand: number;
  gap_size: number;
  gap_trend: TrendDirection;
  closing_strategies: string[];
}

export interface TalentSupplyForecast {
  id: string;
  school_id: string;
  forecast_name: string;
  geographic_region: GeographicRegion;
  country: string;
  forecast_date: string;
  forecast_horizon: ForecastHorizon;
  current_talent_pool: number;
  projected_talent_pool: number[];
  graduation_rate: number;
  brain_drain_factor: number;
  immigration_factor: number;
  retirement_factor: number;
  talent_supply_by_education: EducationTalentSupply[];
  talent_supply_by_skill: SkillTalentSupply[];
  supply_demand_balance: SupplyDemandBalance[];
  training_pipeline_capacity: number;
  retention_rate: number;
  confidence: ForecastConfidence;
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface EducationTalentSupply {
  education_level: EducationLevel;
  current_supply: number;
  projected_supply: number;
  graduation_rate: number;
  employment_rate: number;
}

export interface SkillTalentSupply {
  skill_name: string;
  current_supply: number;
  projected_supply: number;
  growth_rate: number;
  supply_gap: number;
}

export interface SupplyDemandBalance {
  skill_name: string;
  supply: number;
  demand: number;
  balance: number;
  surplus_deficit: string;
  recommended_action: string;
}

export interface EducationToEmploymentAnalytics {
  id: string;
  school_id: string;
  analysis_name: string;
  geographic_region: GeographicRegion;
  country: string;
  education_level: EducationLevel;
  analysis_date: string;
  period: string;
  graduates_total: number;
  graduates_employed: number;
  graduates_employed_relevant: number;
  graduate_employment_rate: number;
  relevant_employment_rate: number;
  avg_time_to_employment: number;
  avg_starting_salary: number;
  salary_premium_over_non_graduates: number;
  skill_match_rate: number;
  employer_satisfaction: number;
  graduate_satisfaction: number;
  further_education_rate: number;
  entrepreneurship_rate: number;
  underemployment_rate: number;
  employment_by_field: FieldEmployment[];
  employment_by_institution: InstitutionEmployment[];
  curriculum_alignment: EducationEmploymentAlignment;
  industry_partnerships: number;
  internship_conversion_rate: number;
  career_services_utilization: number;
  outcomes_by_demographic: DemographicOutcome[];
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface FieldEmployment {
  field_of_study: string;
  graduates: number;
  employed: number;
  employment_rate: number;
  avg_salary: number;
  skill_match: number;
}

export interface InstitutionEmployment {
  institution_name: string;
  graduates: number;
  employment_rate: number;
  avg_salary: number;
  reputation_score: number;
}

export interface DemographicOutcome {
  demographic: string;
  employment_rate: number;
  avg_salary: number;
  skill_match: number;
  satisfaction: number;
}

export interface AnalyticsIndicator {
  id: string;
  school_id: string;
  indicator_name: string;
  indicator_type: IndicatorType;
  description: string;
  unit: MetricUnit;
  formula: string;
  data_sources: string[];
  frequency: AnalyticsFrequency;
  geographic_scope: GranularityType;
  industry_scope: string;
  baseline_value: number;
  baseline_year: number;
  target_value: number;
  target_year: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IndicatorValue {
  id: string;
  school_id: string;
  indicator_id: string;
  value: number;
  previous_value: number;
  change_absolute: number;
  change_percentage: number;
  trend: TrendDirection;
  period: string;
  geographic_region: string;
  industry: string;
  data_quality: DataQualityLevel;
  source: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsReport {
  id: string;
  school_id: string;
  report_name: string;
  report_type: ReportType;
  description: string;
  period: string;
  frequency: AnalyticsFrequency;
  geographic_scope: GranularityType;
  industry_scope: string;
  sections: ReportSection[];
  executive_summary: string;
  key_findings: string[];
  recommendations: string[];
  visualizations: AnalyticsVisualizationConfig[];
  data_sources: AnalyticsDataSource[];
  methodology: string;
  limitations: string[];
  generated_at: string;
  generated_by: string;
  file_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ReportSection {
  section_id: string;
  title: string;
  content: string;
  charts: string[];
  tables: string[];
  key_insights: string[];
  data_points: Record<string, number>;
}

export interface AnalyticsVisualizationConfig {
  visualization_type: VisualizationType;
  title: string;
  data_source: string;
  x_axis: string;
  y_axis: string;
  series: string[];
  filters: Record<string, unknown>;
  settings: Record<string, unknown>;
}

export interface AnalyticsConfig {
  id: string;
  school_id: string;
  config_name: string;
  analytics_types: AnalyticsType[];
  default_geographic_scope: GranularityType;
  default_frequency: AnalyticsFrequency;
  data_retention_days: number;
  refresh_rate: AnalyticsRefreshRate;
  access_level: AnalyticsAccessLevel;
  alert_settings: AnalyticsAlertSettings;
  visualization_defaults: AnalyticsVisualizationDefaults;
  integration_settings: AnalyticsIntegrationSettings;
  notification_settings: Record<string, boolean>;
  export_settings: AnalyticsExportSettings;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsAlertSettings {
  enabled: boolean;
  alert_types: AlertType[];
  threshold_values: Record<string, number>;
  notification_channels: string[];
  recipients: string[];
  frequency: AnalyticsFrequency;
}

export interface AnalyticsVisualizationDefaults {
  default_chart_type: VisualizationType;
  color_scheme: string;
  show_grid: boolean;
  show_legend: boolean;
  animation_enabled: boolean;
  responsive: boolean;
  dark_mode: boolean;
}

export interface AnalyticsIntegrationSettings {
  api_enabled: boolean;
  webhook_url: string;
  data_import_sources: string[];
  data_export_formats: AnalyticsDataFormat[];
  sync_frequency: AnalyticsFrequency;
  real_time_enabled: boolean;
}

export interface AnalyticsExportSettings {
  allowed_formats: AnalyticsDataFormat[];
  max_export_size: number;
  include_charts: boolean;
  include_raw_data: boolean;
  compression: boolean;
  encryption: boolean;
}

export interface AnalyticsMetrics {
  id: string;
  school_id: string;
  total_reports_generated: number;
  total_analyses_performed: number;
  total_data_points: number;
  avg_generation_time: number;
  data_quality_score: number;
  user_adoption_rate: number;
  insight_utilization_rate: number;
  forecast_accuracy: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsDashboard {
  id: string;
  school_id: string;
  dashboard_name: string;
  description: string;
  layout: string;
  widgets: DashboardWidget[];
  filters: DashboardFilter[];
  refresh_rate: AnalyticsRefreshRate;
  auto_refresh: boolean;
  sharing_settings: DashboardSharing;
  access_level: AnalyticsAccessLevel;
  created_at: string;
  updated_at: string;
}

export interface DashboardWidget {
  widget_id: string;
  widget_type: string;
  title: string;
  data_source: string;
  position: WidgetPosition;
  size: WidgetSize;
  settings: Record<string, unknown>;
  refresh_interval: number;
}

export interface WidgetPosition {
  x: number;
  y: number;
  z: number;
}

export interface WidgetSize {
  width: number;
  height: number;
}

export interface DashboardFilter {
  filter_name: string;
  filter_type: string;
  options: string[];
  default_value: string;
  multi_select: boolean;
}

export interface DashboardSharing {
  shared_with: string[];
  public: boolean;
  embed_enabled: boolean;
  export_enabled: boolean;
}

export interface AnalyticsTrendData {
  id: string;
  school_id: string;
  metric_name: string;
  data_points: TrendDataPoint[];
  trend_direction: TrendDirection;
  trend_strength: number;
  seasonality_detected: boolean;
  seasonality_period: number;
  anomalies: TrendAnomaly[];
  forecast: TrendForecast;
  created_at: string;
  updated_at: string;
}

export interface TrendDataPoint {
  date: string;
  value: number;
  volume: number;
  metadata: Record<string, unknown>;
}

export interface TrendAnomaly {
  date: string;
  expected_value: number;
  actual_value: number;
  deviation: number;
  severity: string;
  possible_causes: string[];
}

export interface TrendForecast {
  forecast_points: TrendDataPoint[];
  confidence_intervals: ConfidenceInterval[];
  model_used: ForecastModel;
  accuracy_score: number;
}

export interface AnalyticsBenchmark {
  id: string;
  school_id: string;
  benchmark_name: string;
  benchmark_type: BenchmarkType;
  metric_name: string;
  our_value: number;
  benchmark_value: number;
  industry_average: number;
  top_performer: number;
  bottom_performer: number;
  percentile_rank: number;
  gap_analysis: BenchmarkGap[];
  improvement_recommendations: string[];
  period: string;
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface BenchmarkGap {
  metric: string;
  our_value: number;
  benchmark_value: number;
  gap_size: number;
  gap_direction: string;
  priority: string;
}

export interface AnalyticsInsight {
  id: string;
  school_id: string;
  insight_type: InsightType;
  title: string;
  description: string;
  data_points: Record<string, number>;
  confidence: number;
  impact_score: number;
  actionable: boolean;
  recommended_actions: string[];
  related_metrics: string[];
  visualization: AnalyticsVisualizationConfig;
  generated_at: string;
  expires_at: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsAlert {
  id: string;
  school_id: string;
  alert_type: AlertType;
  title: string;
  description: string;
  metric_name: string;
  threshold_value: number;
  actual_value: number;
  severity: string;
  geographic_scope: string;
  industry_scope: string;
  triggered_at: string;
  acknowledged: boolean;
  acknowledged_by: string;
  acknowledged_at: string;
  resolved: boolean;
  resolved_at: string;
  actions_taken: string[];
  created_at: string;
  updated_at: string;
}

export interface AnalyticsDataPipeline {
  id: string;
  school_id: string;
  pipeline_name: string;
  data_sources: AnalyticsDataSource[];
  transformations: DataTransformation[];
  destinations: DataDestination[];
  schedule: AnalyticsFrequency;
  status: string;
  last_run: string;
  next_run: string;
  error_count: number;
  avg_processing_time: number;
  data_volume_daily: number;
  created_at: string;
  updated_at: string;
}

export interface DataTransformation {
  transformation_type: string;
  description: string;
  input_fields: string[];
  output_fields: string[];
  logic: string;
  order: number;
}

export interface DataDestination {
  destination_type: string;
  connection_string: string;
  table_name: string;
  format: AnalyticsDataFormat;
  refresh_frequency: AnalyticsFrequency;
}

export interface AnalyticsWorkforceRisk {
  id: string;
  school_id: string;
  risk_type: WorkforceRiskType;
  risk_name: string;
  description: string;
  probability: number;
  impact: number;
  risk_score: number;
  risk_level: string;
  affected_areas: string[];
  mitigation_strategies: string[];
  monitoring_metrics: string[];
  early_warning_indicators: string[];
  contingency_plans: string[];
  owner: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsSkillIndex {
  id: string;
  school_id: string;
  index_name: string;
  geographic_region: GeographicRegion;
  country: string;
  industry: IndustrySector;
  calculation_date: string;
  skill_demand_index: number;
  skill_supply_index: number;
  skill_gap_index: number;
  skill_premium_index: number;
  skill_alignment_index: number;
  skill_innovation_index: number;
  component_indices: SkillComponentIndex[];
  methodology: string;
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface SkillComponentIndex {
  component: string;
  value: number;
  weight: number;
  contribution: number;
  trend: TrendDirection;
}

export interface AnalyticsEducationOutcome {
  id: string;
  school_id: string;
  institution_name: string;
  program_name: string;
  education_level: EducationLevel;
  analysis_date: string;
  outcome_type: EducationOutcomeType;
  outcome_value: number;
  national_average: number;
  peer_average: number;
  top_performer_average: number;
  ranking: number;
  trend: TrendDirection;
  improvement_rate: number;
  factors: OutcomeFactor[];
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface OutcomeFactor {
  factor: string;
  impact: number;
  correlation: number;
  direction: string;
}

export interface AnalyticsLaborProductivity {
  id: string;
  school_id: string;
  analysis_name: string;
  geographic_region: GeographicRegion;
  country: string;
  industry: IndustrySector;
  analysis_date: string;
  period: string;
  labor_productivity_index: number;
  output_per_worker: number;
  output_per_hour: number;
  total_factor_productivity: number;
  productivity_growth_rate: number;
  productivity_by_education: EducationProductivity[];
  productivity_by_experience: ExperienceProductivity[];
  productivity_by_technology: TechnologyProductivity[];
  capital_labor_ratio: number;
  technology_contribution: number;
  human_capital_contribution: number;
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface EducationProductivity {
  education_level: EducationLevel;
  productivity_index: number;
  output_per_worker: number;
  premium_over_baseline: number;
}

export interface ExperienceProductivity {
  experience_range: string;
  productivity_index: number;
  output_per_worker: number;
  learning_curve_factor: number;
}

export interface TechnologyProductivity {
  technology_level: string;
  productivity_index: number;
  adoption_rate: number;
  impact_score: number;
}

export interface AnalyticsTalentMobility {
  id: string;
  school_id: string;
  analysis_name: string;
  geographic_region: GeographicRegion;
  country: string;
  analysis_date: string;
  period: string;
  total_mobile_talent: number;
  domestic_mobility: number;
  international_mobility: number;
  brain_gain: number;
  brain_drain: number;
  net_talent_flow: number;
  mobility_by_education: EducationMobility[];
  mobility_by_skill: SkillMobility[];
  mobility_by_industry: IndustryMobility[];
  top_origin_countries: string[];
  top_destination_countries: string[];
  primary_drivers: string[];
  policy_implications: string[];
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface EducationMobility {
  education_level: EducationLevel;
  mobile_count: number;
  mobility_rate: number;
  avg_distance: number;
}

export interface SkillMobility {
  skill_name: string;
  mobile_count: number;
  mobility_rate: number;
  demand_in_destinations: number;
}

export interface IndustryMobility {
  industry: IndustrySector;
  mobile_count: number;
  mobility_rate: number;
  avg_salary_differential: number;
}

export interface AnalyticsWorkforceForecastScenario {
  id: string;
  school_id: string;
  scenario_name: string;
  scenario_type: string;
  description: string;
  assumptions: string[];
  probability: number;
  employment_impact: number;
  gdp_impact: number;
  skill_impact: string[];
  salary_impact: number;
  timeline: string;
  confidence: ForecastConfidence;
  key_risks: string[];
  mitigation_strategies: string[];
  created_at: string;
  updated_at: string;
}

export interface AnalyticsRealTimeMetric {
  id: string;
  school_id: string;
  metric_name: string;
  metric_type: string;
  current_value: number;
  previous_value: number;
  change_percentage: number;
  trend: TrendDirection;
  last_updated: string;
  refresh_rate: AnalyticsRefreshRate;
  source: string;
  geographic_scope: string;
  industry_scope: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsComparativeAnalysis {
  id: string;
  school_id: string;
  analysis_name: string;
  comparison_entities: ComparisonEntity[];
  metrics_compared: string[];
  time_period: string;
  geographic_scope: string;
  results: ComparisonResult[];
  key_differences: string[];
  best_practices: string[];
  recommendations: string[];
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface ComparisonEntity {
  entity_id: string;
  entity_name: string;
  entity_type: string;
  entity_scope: string;
}

export interface ComparisonResult {
  metric: string;
  entity_values: Record<string, number>;
  ranking: string[];
  winner: string;
  significance: number;
}

export interface AnalyticsWorkforceComposition {
  id: string;
  school_id: string;
  analysis_name: string;
  geographic_region: GeographicRegion;
  country: string;
  industry: IndustrySector;
  analysis_date: string;
  period: string;
  total_workforce: number;
  composition_by_age: AgeComposition[];
  composition_by_gender: GenderComposition[];
  composition_by_education: EducationComposition[];
  composition_by_tenure: TenureComposition[];
  composition_by_role: RoleComposition[];
  diversity_index: number;
  inclusion_score: number;
  age_dependency_ratio: number;
  generational_mix: Record<string, number>;
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface AgeComposition {
  age_group: AgeGroup;
  count: number;
  percentage: number;
  avg_salary: number;
  avg_tenure: number;
}

export interface GenderComposition {
  gender: string;
  count: number;
  percentage: number;
  avg_salary: number;
  leadership_percentage: number;
}

export interface EducationComposition {
  education_level: EducationLevel;
  count: number;
  percentage: number;
  avg_salary: number;
  avg_productivity: number;
}

export interface TenureComposition {
  tenure_range: string;
  count: number;
  percentage: number;
  avg_salary: number;
  turnover_risk: string;
}

export interface RoleComposition {
  role_category: string;
  count: number;
  percentage: number;
  avg_salary: number;
  growth_rate: number;
}

export interface AnalyticsEducationEmployment {
  id: string;
  school_id: string;
  analysis_name: string;
  geographic_region: GeographicRegion;
  country: string;
  education_level: EducationLevel;
  analysis_date: string;
  period: string;
  graduates_total: number;
  graduates_employed: number;
  employment_rate: number;
  relevant_employment_rate: number;
  avg_time_to_employment: number;
  avg_starting_salary: number;
  salary_premium: number;
  skill_match_rate: number;
  employer_satisfaction: number;
  graduate_satisfaction: number;
  further_education_rate: number;
  entrepreneurship_rate: number;
  underemployment_rate: number;
  overqualification_rate: number;
  field_relevance: number;
  institution_quality_impact: number;
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsIndustrySkillGap {
  id: string;
  school_id: string;
  industry: IndustrySector;
  geographic_region: GeographicRegion;
  country: string;
  analysis_date: string;
  total_skills_assessed: number;
  skills_with_gap: number;
  overall_gap_severity: number;
  critical_gaps: SkillGapDetail[];
  emerging_gaps: SkillGapDetail[];
  closing_gaps: SkillGapDetail[];
  training_investment_needed: number;
  estimated_economic_impact: number;
  recommended_actions: string[];
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface SkillGapDetail {
  skill_name: string;
  current_supply: number;
  required_demand: number;
  gap_size: number;
  gap_severity: string;
  gap_trend: TrendDirection;
  closing_strategies: string[];
  estimated_closing_time: number;
  investment_required: number;
}

export interface AnalyticsWorkforceResilience {
  id: string;
  school_id: string;
  analysis_name: string;
  geographic_region: GeographicRegion;
  country: string;
  industry: IndustrySector;
  analysis_date: string;
  resilience_index: number;
  adaptive_capacity: number;
  recovery_speed: number;
  shock_absorption: number;
  diversification_score: number;
  innovation_capacity: number;
  digital_readiness: number;
  skills_flexibility: number;
  geographic_distribution: number;
  supply_chain_resilience: number;
  workforce_redundancy: number;
  stress_test_results: StressTestResult[];
  improvement_recommendations: string[];
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface StressTestResult {
  scenario: string;
  impact: number;
  recovery_time: number;
  resilience_score: number;
  vulnerable_areas: string[];
}

export interface AnalyticsTalentPipeline {
  id: string;
  school_id: string;
  pipeline_name: string;
  geographic_region: GeographicRegion;
  country: string;
  industry: IndustrySector;
  analysis_date: string;
  total_pipeline_size: number;
  pipeline_stages: PipelineStage[];
  conversion_rates: ConversionRate[];
  pipeline_velocity: number;
  pipeline_quality: number;
  pipeline_diversity: number;
  bottleneck_areas: string[];
  optimization_opportunities: string[];
  forecast_accuracy: number;
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface PipelineStage {
  stage_name: string;
  count: number;
  conversion_rate: number;
  avg_time_in_stage: number;
  drop_off_rate: number;
}

export interface ConversionRate {
  from_stage: string;
  to_stage: string;
  rate: number;
  benchmark: number;
  improvement_needed: number;
}

export interface AnalyticsEducationROI {
  id: string;
  school_id: string;
  analysis_name: string;
  education_level: EducationLevel;
  program_name: string;
  geographic_region: GeographicRegion;
  country: string;
  analysis_date: string;
  investment_per_student: number;
  lifetime_earnings_premium: number;
  tax_contribution: number;
  social_return: number;
  private_return: number;
  social_return_on_investment: number;
  payback_period: number;
  cost_benefit_ratio: number;
  economic_value_added: number;
  comparison_with_alternatives: string[];
  sensitivity_analysis: SensitivityResult[];
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface SensitivityResult {
  variable: string;
  base_value: number;
  low_value: number;
  high_value: number;
  impact_on_roi: number;
}

export interface AnalyticsWorkforceFuture {
  id: string;
  school_id: string;
  analysis_name: string;
  geographic_region: GeographicRegion;
  country: string;
  analysis_date: string;
  future_of_work_score: number;
  automation_risk: number;
  ai_impact: number;
  remote_work_trend: number;
  gig_economy_growth: number;
  green_jobs_growth: number;
  digital_skills_demand: number;
  lifelong_learning_necessity: number;
  career_pivot_frequency: number;
  portfolio_career_trend: number;
  human_machine_collaboration: number;
  emerging_roles: EmergingRole[];
  disappearing_roles: DisappearingRole[];
  future_skills: FutureSkill[];
  scenario_plans: FutureScenario[];
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface EmergingRole {
  role_name: string;
  description: string;
  growth_rate: number;
  avg_salary: number;
  required_skills: string[];
  timeline: string;
}

export interface DisappearingRole {
  role_name: string;
  current_employment: number;
  decline_rate: number;
  replacement_roles: string[];
  timeline: string;
}

export interface FutureSkill {
  skill_name: string;
  importance_score: number;
  current_supply: number;
  projected_demand: number;
  growth_rate: number;
  learning_pathway: string;
}

export interface FutureScenario {
  scenario_name: string;
  description: string;
  probability: number;
  employment_impact: number;
  skill_impact: string[];
  timeline: string;
  key_drivers: string[];
}

export interface AnalyticsRegionalTalentMap {
  id: string;
  school_id: string;
  map_name: string;
  geographic_region: GeographicRegion;
  country: string;
  analysis_date: string;
  regions: RegionalTalentData[];
  talent_density_heatmap: TalentDensityData[];
  skill_distribution: SkillDistributionData[];
  opportunity_zones: OpportunityZone[];
  talent_flow_corridors: TalentFlowCorridor[];
  infrastructure_correlation: number;
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface RegionalTalentData {
  region_name: string;
  talent_pool_size: number;
  skill_mix: Record<string, number>;
  avg_salary: number;
  cost_of_living: number;
  quality_of_life: number;
  growth_potential: number;
}

export interface TalentDensityData {
  latitude: number;
  longitude: number;
  density: number;
  primary_skills: string[];
  avg_salary: number;
}

export interface SkillDistributionData {
  skill_name: string;
  geographic_distribution: Record<string, number>;
  concentration_index: number;
  growth_by_region: Record<string, number>;
}

export interface OpportunityZone {
  zone_name: string;
  description: string;
  talent_availability: number;
  skill_match: number;
  cost_advantage: number;
  growth_potential: number;
  infrastructure_score: number;
}

export interface TalentFlowCorridor {
  origin: string;
  destination: string;
  flow_volume: number;
  primary_skills: string[];
  avg_salary_differential: number;
  growth_rate: number;
}

export interface AnalyticsWorkforceWellbeing {
  id: string;
  school_id: string;
  analysis_name: string;
  geographic_region: GeographicRegion;
  country: string;
  industry: IndustrySector;
  analysis_date: string;
  period: string;
  wellbeing_index: number;
  stress_level: number;
  work_life_balance_score: number;
  burnout_risk: number;
  mental_health_score: number;
  physical_health_score: number;
  financial_wellness: number;
  social_connection: number;
  job_satisfaction: number;
  engagement_score: number;
  productivity_correlation: number;
  retention_correlation: number;
  intervention_recommendations: string[];
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsTalentMarketplaceHealth {
  id: string;
  school_id: string;
  marketplace_name: string;
  analysis_date: string;
  period: string;
  total_talents: number;
  total_employers: number;
  total_transactions: number;
  match_rate: number;
  avg_time_to_match: number;
  avg_satisfaction_score: number;
  marketplace_liquidity: number;
  price_efficiency: number;
  information_symmetry: number;
  platform_trust_score: number;
  fraud_rate: number;
  dispute_rate: number;
  revenue_growth: number;
  user_growth: number;
  feature_adoption: Record<string, number>;
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsSkillCertification {
  id: string;
  school_id: string;
  certification_name: string;
  issuing_body: string;
  geographic_region: GeographicRegion;
  country: string;
  analysis_date: string;
  total_certified: number;
  certification_growth_rate: number;
  employment_rate_after: number;
  salary_premium: number;
  skill_relevance: number;
  employer_recognition: number;
  renewal_rate: number;
  global_recognition: number;
  industry_demand: number;
  certification_value_trend: TrendDirection;
  comparison_with_alternatives: string[];
  data_quality: DataQualityLevel;
  created_at: string;
  updated_at: string;
}
