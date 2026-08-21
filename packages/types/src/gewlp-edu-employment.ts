export enum TrackingType {
  GRADUATE = "GRADUATE",
  ALUMNI = "ALUMNI",
  EMPLOYER = "EMPLOYER",
  PROGRAM = "PROGRAM",
  INSTITUTION = "INSTITUTION",
  REGIONAL = "REGIONAL",
  NATIONAL = "NATIONAL",
  INTERNATIONAL = "INTERNATIONAL",
  REAL_TIME = "REAL_TIME",
  PERIODIC = "PERIODIC",
  LONGITUDINAL = "LONGITUDINAL",
  CROSS_SECTIONAL = "CROSS_SECTIONAL",
}

export enum OutcomeType {
  EMPLOYED = "EMPLOYED",
  SELF_EMPLOYED = "SELF_EMPLOYED",
  UNEMPLOYED = "UNEMPLOYED",
  FURTHER_STUDY = "FURTHER_STUDY",
  INTERNSHIP = "INTERNSHIP",
  APPRENTICESHIP = "APPRENTICESHIP",
  VOLUNTEER = "VOLUNTEER",
  RETIRED = "RETIRED",
  CAREER_CHANGE = "CAREER_CHANGE",
  UNDEREMPLOYED = "UNDEREMPLOYED",
  FREELANCE = "FREELANCE",
  CONTRACT = "CONTRACT",
}

export enum ScoreType {
  EMPLOYABILITY = "EMPLOYABILITY",
  RELEVANCE = "RELEVANCE",
  ALIGNMENT = "ALIGNMENT",
  ROI = "ROI",
  SATISFACTION = "SATISFACTION",
  PERFORMANCE = "PERFORMANCE",
  READINESS = "READINESS",
  COMPETITIVENESS = "COMPETITIVENESS",
  IMPACT = "IMPACT",
  OUTCOME = "OUTCOME",
  EFFICIENCY = "EFFICIENCY",
  EFFECTIVENESS = "EFFECTIVENESS",
}

export enum AlignmentType {
  CURRICULUM_INDUSTRY = "CURRICULUM_INDUSTRY",
  SKILL_MARKET = "SKILL_MARKET",
  PROGRAM_EMPLOYER = "PROGRAM_EMPLOYER",
  CERTIFICATION_ROLE = "CERTIFICATION_ROLE",
  COMPETENCY_JOB = "COMPETENCY_JOB",
  TRAINING_DEMAND = "TRAINING_DEMAND",
  EDUCATION_WORKFORCE = "EDUCATION_WORKFORCE",
  GRADUATE_VACANCY = "GRADUATE_VACANCY",
  DIPLOMA_POSITION = "DIPLOMA_POSITION",
  COURSE_INDUSTRY = "COURSE_INDUSTRY",
}

export enum CorrelationType {
  STRONG_POSITIVE = "STRONG_POSITIVE",
  MODERATE_POSITIVE = "MODERATE_POSITIVE",
  WEAK_POSITIVE = "WEAK_POSITIVE",
  NEUTRAL = "NEUTRAL",
  WEAK_NEGATIVE = "WEAK_NEGATIVE",
  MODERATE_NEGATIVE = "MODERATE_NEGATIVE",
  STRONG_NEGATIVE = "STRONG_NEGATIVE",
  NON_LINEAR = "NON_LINEAR",
  BIVARIATE = "BIVARIATE",
  MULTIVARIATE = "MULTIVARIATE",
}

export enum EmploymentStatus {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  TEMPORARY = "TEMPORARY",
  PERMANENT = "PERMANENT",
  PROBATION = "PROBATION",
  FREELANCE = "FREELANCE",
  CONSULTANT = "CONSULTANT",
  INTERN = "INTERN",
  VOLUNTEER = "VOLUNTEER",
  UNEMPLOYED = "UNEMPLOYED",
  SELF_EMPLOYED = "SELF_EMPLOYED",
  CAREER_BREAK = "CAREER_BREAK",
}

export enum GraduateField {
  STEM = "STEM",
  BUSINESS = "BUSINESS",
  HEALTHCARE = "HEALTHCARE",
  EDUCATION = "EDUCATION",
  ARTS = "ARTS",
  LAW = "LAW",
  ENGINEERING = "ENGINEERING",
  SOCIAL_SCIENCES = "SOCIAL_SCIENCES",
  HUMANITIES = "HUMANITIES",
  AGRICULTURE = "AGRICULTURE",
  TECHNOLOGY = "TECHNOLOGY",
  TRADES = "TRADES",
}

export enum InstitutionTier {
  TIER_1 = "TIER_1",
  TIER_2 = "TIER_2",
  TIER_3 = "TIER_3",
  TIER_4 = "TIER_4",
  TIER_5 = "TIER_5",
  RESEARCH_UNIVERSITY = "RESEARCH_UNIVERSITY",
  TEACHING_UNIVERSITY = "TEACHING_UNIVERSITY",
  COMMUNITY_COLLEGE = "COMMUNITY_COLLEGE",
  TECHNICAL_COLLEGE = "TECHNICAL_COLLEGE",
  VOCATIONAL = "VOCATIONAL",
}

export enum ProgramLevel {
  CERTIFICATE = "CERTIFICATE",
  DIPLOMA = "DIPLOMA",
  ASSOCIATE = "ASSOCIATE",
  BACHELOR = "BACHELOR",
  MASTER = "MASTER",
  DOCTORATE = "DOCTORATE",
  PROFESSIONAL = "PROFESSIONAL",
  POST_DOCTORATE = "POST_DOCTORATE",
  CONTINUING_EDUCATION = "CONTINUING_EDUCATION",
  MICRO_CREDENTIAL = "MICRO_CREDENTIAL",
}

export enum TimeToEmployment {
  IMMEDIATE = "IMMEDIATE",
  ONE_MONTH = "ONE_MONTH",
  THREE_MONTHS = "THREE_MONTHS",
  SIX_MONTHS = "SIX_MONTHS",
  ONE_YEAR = "ONE_YEAR",
  TWO_YEARS = "TWO_YEARS",
  FIVE_YEARS = "FIVE_YEARS",
  MORE_THAN_FIVE_YEARS = "MORE_THAN_FIVE_YEARS",
}

export enum SalaryRange {
  ENTRY_LEVEL = "ENTRY_LEVEL",
  MID_LEVEL = "MID_LEVEL",
  SENIOR_LEVEL = "SENIOR_LEVEL",
  EXECUTIVE = "EXECUTIVE",
  MINIMUM_WAGE = "MINIMUM_WAGE",
  BELOW_AVERAGE = "BELOW_AVERAGE",
  AVERAGE = "AVERAGE",
  ABOVE_AVERAGE = "ABOVE_AVERAGE",
  TOP_PERCENTILE = "TOP_PERCENTILE",
}

export enum DataCollectionMethod {
  SURVEY = "SURVEY",
  INTERVIEW = "INTERVIEW",
  FOCUS_GROUP = "FOCUS_GROUP",
  ADMINISTRATIVE = "ADMINISTRATIVE",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  JOB_BOARDS = "JOB_BOARDS",
  EMPLOYER_REPORTS = "EMPLOYER_REPORTS",
  GOVERNMENT_DATA = "GOVERNMENT_DATA",
  ALUMNI_NETWORK = "ALUMNI_NETWORK",
  THIRD_PARTY = "THIRD_PARTY",
}

export enum IndustrySector {
  TECHNOLOGY = "TECHNOLOGY",
  HEALTHCARE = "HEALTHCARE",
  FINANCE = "FINANCE",
  EDUCATION = "EDUCATION",
  MANUFACTURING = "MANUFACTURING",
  RETAIL = "RETAIL",
  CONSTRUCTION = "CONSTRUCTION",
  ENERGY = "ENERGY",
  TRANSPORTATION = "TRANSPORTATION",
  HOSPITALITY = "HOSPITALITY",
  AGRICULTURE = "AGRICULTURE",
  TELECOMMUNICATIONS = "TELECOMMUNICATIONS",
  GOVERNMENT = "GOVERNMENT",
  NON_PROFIT = "NON_PROFIT",
  CONSULTING = "CONSULTING",
  MEDIA = "MEDIA",
}

export enum ReportFrequency {
  REAL_TIME = "REAL_TIME",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  SEMI_ANNUAL = "SEMI_ANNUAL",
  ANNUAL = "ANNUAL",
  ON_DEMAND = "ON_DEMAND",
}

export enum BenchmarkType {
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL",
  INSTITUTIONAL = "INSTITUTIONAL",
  PROGRAM = "PROGRAM",
  INDUSTRY = "INDUSTRY",
  GLOBAL = "GLOBAL",
  PEER = "PEER",
  HISTORICAL = "HISTORICAL",
}

export enum AlertSeverity {
  INFO = "INFO",
  WARNING = "WARNING",
  CRITICAL = "CRITICAL",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export enum ValidationStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  SUSPENDED = "SUSPENDED",
  REVOKED = "REVOKED",
}

export enum DataSourceType {
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL",
  API = "API",
  WEBHOOK = "WEBHOOK",
  FILE_IMPORT = "FILE_IMPORT",
  DATABASE = "DATABASE",
  STREAMING = "STREAMING",
}

export enum TrendDirection {
  INCREASING = "INCREASING",
  DECREASING = "DECREASING",
  STABLE = "STABLE",
  FLUCTUATING = "FLUCTUATING",
  VOLATILE = "VOLATILE",
  SEASONAL = "SEASONAL",
}

export enum PredictionModel {
  LINEAR_REGRESSION = "LINEAR_REGRESSION",
  LOGISTIC_REGRESSION = "LOGISTIC_REGRESSION",
  DECISION_TREE = "DECISION_TREE",
  RANDOM_FOREST = "RANDOM_FOREST",
  NEURAL_NETWORK = "NEURAL_NETWORK",
  GRADIENT_BOOSTING = "GRADIENT_BOOSTING",
  SVM = "SVM",
  KNN = "KNN",
  ENSEMBLE = "ENSEMBLE",
}

export enum SkillCategory {
  TECHNICAL = "TECHNICAL",
  SOFT_SKILL = "SOFT_SKILL",
  LEADERSHIP = "LEADERSHIP",
  COMMUNICATION = "COMMUNICATION",
  ANALYTICAL = "ANALYTICAL",
  CREATIVE = "CREATIVE",
  DIGITAL = "DIGITAL",
  LANGUAGE = "LANGUAGE",
  PROFESSIONAL = "PROFESSIONAL",
  DOMAIN_SPECIFIC = "DOMAIN_SPECIFIC",
}

export enum CareerLevel {
  ENTRY = "ENTRY",
  JUNIOR = "JUNIOR",
  MID = "MID",
  SENIOR = "SENIOR",
  LEAD = "LEAD",
  MANAGER = "MANAGER",
  DIRECTOR = "DIRECTOR",
  VP = "VP",
  C_LEVEL = "C_LEVEL",
  EXECUTIVE = "EXECUTIVE",
}

export enum RegionType {
  URBAN = "URBAN",
  SUBURBAN = "SUBURBAN",
  RURAL = "RURAL",
  METROPOLITAN = "METROPOLITAN",
  NATIONAL = "NATIONAL",
  INTERNATIONAL = "INTERNATIONAL",
}

export enum GenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NON_BINARY = "NON_BINARY",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
  OTHER = "OTHER",
}

export enum AgeGroup {
  UNDER_18 = "UNDER_18",
  AGE_18_24 = "AGE_18_24",
  AGE_25_34 = "AGE_25_34",
  AGE_35_44 = "AGE_35_44",
  AGE_45_54 = "AGE_45_54",
  AGE_55_64 = "AGE_55_64",
  AGE_65_PLUS = "AGE_65_PLUS",
}

export enum ContractType {
  INDEFINITE = "INDEFINITE",
  FIXED_TERM = "FIXED_TERM",
  ZERO_HOURS = "ZERO_HOURS",
  SEASONAL = "SEASONAL",
  FREELANCE = "FREELANCE",
  CONSULTING = "CONSULTING",
  INTERNSHIP = "INTERNSHIP",
  APPRENTICESHIP = "APPRENTICESHIP",
}

export enum WorkArrangement {
  ONSITE = "ONSITE",
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  FLEXIBLE = "FLEXIBLE",
  TRAVEL_REQUIRED = "TRAVEL_REQUIRED",
}

export enum MatchQuality {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR",
  NO_MATCH = "NO_MATCH",
}

export enum FeedbackType {
  EMPLOYER = "EMPLOYER",
  GRADUATE = "GRADUATE",
  INSTITUTION = "INSTITUTION",
  INDUSTRY_EXPERT = "INDUSTRY_EXPERT",
  PEER = "PEER",
  MENTOR = "MENTOR",
  SELF = "SELF",
}

export enum MetricCategory {
  EMPLOYMENT_RATE = "EMPLOYMENT_RATE",
  SALARY = "SALARY",
  TIME_TO_HIRE = "TIME_TO_HIRE",
  JOB_SATISFACTION = "JOB_SATISFACTION",
  CAREER_PROGRESSION = "CAREER_PROGRESSION",
  SKILL_UTILIZATION = "SKILL_UTILIZATION",
  INDUSTRY_ALIGNMENT = "INDUSTRY_ALIGNMENT",
  PROGRAM_EFFECTIVENESS = "PROGRAM_EFFECTIVENESS",
}

export enum CompetitivenessLevel {
  VERY_COMPETITIVE = "VERY_COMPETITIVE",
  COMPETITIVE = "COMPETITIVE",
  MODERATE = "MODERATE",
  LOW = "LOW",
  VERY_LOW = "VERY_LOW",
}

export enum MarketDemand {
  HIGH_DEMAND = "HIGH_DEMAND",
  MODERATE_DEMAND = "MODERATE_DEMAND",
  STABLE = "STABLE",
  DECLINING = "DECLINING",
  EMERGING = "EMERGING",
  SATURATED = "SATURATED",
}

export enum CurriculumUpdateStatus {
  CURRENT = "CURRENT",
  NEEDS_UPDATE = "NEEDS_UPDATE",
  OUTDATED = "OUTDATED",
  UNDER_REVIEW = "UNDER_REVIEW",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum PartnershipType {
  HIRING = "HIRING",
  INTERNSHIP = "INTERNSHIP",
  RESEARCH = "RESEARCH",
  CURRICULUM = "CURRICULUM",
  FUNDING = "FUNDING",
  MENTORSHIP = "MENTORSHIP",
  TRAINING = "TRAINING",
  JOINT_PROGRAM = "JOINT_PROGRAM",
}

export enum PlacementStatus {
  PENDING = "PENDING",
  PLACED = "PLACED",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
  COMPLETED = "COMPLETED",
  EXTENDED = "EXTENDED",
}

export enum CredentialVerification {
  VERIFIED = "VERIFIED",
  UNVERIFIED = "UNVERIFIED",
  PENDING = "PENDING",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
}

export enum SkillGapSeverity {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  NONE = "NONE",
}

export enum InterventionType:
  MENTORING = "MENTORING",
  TRAINING = "TRAINING",
  COACHING = "COACHING",
  NETWORKING = "NETWORKING",
  JOB_PLACEMENT = "JOB_PLACEMENT",
  SKILL_DEVELOPMENT = "SKILL_DEVELOPMENT",
  CAREER_COUNSELING = "CAREER_COUNSELING",
}

export enum OutcomeMeasurement {
  QUANTITATIVE = "QUANTITATIVE",
  QUALITATIVE = "QUALITATIVE",
  MIXED = "MIXED",
  BENCHMARK = "BENCHMARK",
  LONGITUDINAL = "LONGITUDINAL",
}

export enum DataRetention {
  INDEFINITE = "INDEFINITE",
  ONE_YEAR = "ONE_YEAR",
  THREE_YEARS = "THREE_YEARS",
  FIVE_YEARS = "FIVE_YEARS",
  TEN_YEARS = "TEN_YEARS",
}

export enum ConsentType {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  MINIMAL = "MINIMAL",
  WITHDRAWN = "WITHDRAWN",
  PENDING = "PENDING",
}

export enum ReportFormat {
  PDF = "PDF",
  EXCEL = "EXCEL",
  CSV = "CSV",
  JSON = "JSON",
  DASHBOARD = "DASHBOARD",
  API = "API",
}

export enum NotificationChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
  IN_APP = "IN_APP",
  WEBHOOK = "WEBHOOK",
}

export enum AccessLevel {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
  RESTRICTED = "RESTRICTED",
  CONFIDENTIAL = "CONFIDENTIAL",
  CLASSIFIED = "CLASSIFIED",
}

export enum EventType {
  GRADUATION = "GRADUATION",
  HIRE = "HIRE",
  PROMOTION = "PROMOTION",
  JOB_CHANGE = "JOB_CHANGE",
  SKILL_ACQUISITION = "SKILL_ACQUISITION",
  CERTIFICATION = "CERTIFICATION",
  TRAINING_COMPLETE = "TRAINING_COMPLETE",
  SURVEY_RESPONSE = "SURVEY_RESPONSE",
}

export enum IntegrationType {
  LMS = "LMS",
  HRIS = "HRIS",
  ATS = "ATS",
  ERP = "ERP",
  CRM = "CRM",
  JOB_BOARD = "JOB_BOARD",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  GOVERNMENT = "GOVERNMENT",
}

export enum OptimizationGoal {
  MAXIMIZE_EMPLOYMENT = "MAXIMIZE_EMPLOYMENT",
  MAXIMIZE_SALARY = "MAXIMIZE_SALARY",
  MINIMIZE_TIME_TO_HIRE = "MINIMIZE_TIME_TO_HIRE",
  MAXIMIZE_SATISFACTION = "MAXIMIZE_SATISFACTION",
  MINIMIZE_SKILL_GAP = "MINIMIZE_SKILL_GAP",
  MAXIMIZE_ALIGNMENT = "MAXIMIZE_ALIGNMENT",
}

export enum VisualizationType {
  BAR_CHART = "BAR_CHART",
  LINE_CHART = "LINE_CHART",
  PIE_CHART = "PIE_CHART",
  SCATTER_PLOT = "SCATTER_PLOT",
  HEATMAP = "HEATMAP",
  FUNNEL = "FUNNEL",
  TREE_MAP = "TREE_MAP",
  GEO_MAP = "GEO_MAP",
}

export interface EducationToEmployment {
  id: string;
  school_id: string;
  graduate_id: string;
  institution_id: string;
  program_id: string;
  tracking_type: TrackingType;
  outcome_type: OutcomeType;
  employment_status: EmploymentStatus;
  graduate_field: GraduateField;
  institution_tier: InstitutionTier;
  program_level: ProgramLevel;
  time_to_employment: TimeToEmployment;
  salary_range: SalaryRange;
  industry_sector: IndustrySector;
  career_level: CareerLevel;
  work_arrangement: WorkArrangement;
  contract_type: ContractType;
  employment_date: string;
  program_completion_date: string;
  graduation_date: string;
  current_employer: string;
  job_title: string;
  job_description: string;
  location: string;
  region_type: RegionType;
  salary_offered: number;
  salary_currency: string;
  employability_score: number;
  program_roi: number;
  curriculum_relevance_score: number;
  industry_alignment_score: number;
  skill_utilization_score: number;
  job_satisfaction_score: number;
  career_progression_score: number;
  data_collection_method: DataCollectionMethod;
  verification_status: ValidationStatus;
  consent_type: ConsentType;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GraduateTracking {
  id: string;
  school_id: string;
  graduate_id: string;
  tracking_type: TrackingType;
  outcome_type: OutcomeType;
  employment_status: EmploymentStatus;
  institution_id: string;
  program_id: string;
  graduation_year: number;
  tracking_period_months: number;
  survey_date: string;
  response_rate: number;
  contact_email: string;
  contact_phone: string;
  linkedin_url: string;
  current_employer: string;
  current_position: string;
  industry_sector: IndustrySector;
  career_level: CareerLevel;
  salary_amount: number;
  salary_currency: string;
  salary_range: SalaryRange;
  location: string;
  region_type: RegionType;
  work_arrangement: WorkArrangement;
  contract_type: ContractType;
  time_to_first_job_months: number;
  job_search_duration_days: number;
  applications_sent: number;
  interviews_attended: number;
  offers_received: number;
  jobs_held_count: number;
  promotions_received: number;
  skills_acquired: string[];
  certifications_earned: string[];
  further_education: string;
  satisfaction_score: number;
  career_goals_met: boolean;
  recommend_program: boolean;
  feedback_text: string;
  feedback_type: FeedbackType;
  data_source: DataSourceType;
  verification_status: ValidationStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AlumniIntelligence {
  id: string;
  school_id: string;
  institution_id: string;
  alumni_id: string;
  total_alumni_count: number;
  active_alumni_count: number;
  engaged_alumni_count: number;
  employment_rate: number;
  average_salary: number;
  median_salary: number;
  salary_growth_rate: number;
  career_progression_rate: number;
  industry_distribution: Record<IndustrySector, number>;
  geographic_distribution: Record<string, number>;
  employer_distribution: Record<string, number>;
  job_title_distribution: Record<string, number>;
  skill_distribution: Record<SkillCategory, number>;
  top_employers: string[];
  top_industries: IndustrySector[];
  average_time_to_employment_months: number;
  entrepreneurship_rate: number;
  further_education_rate: number;
  international_employment_rate: number;
  employer_satisfaction_score: number;
  alumni_satisfaction_score: number;
  program_relevance_score: number;
  mentorship_participation_rate: number;
  donation_rate: number;
  event_attendance_rate: number;
  networking_score: number;
  brand_advocacy_score: number;
  retention_score: number;
  engagement_trend: TrendDirection;
  sentiment_score: number;
  nps_score: number;
  data_freshness: string;
  collection_method: DataCollectionMethod;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EmploymentOutcome {
  id: string;
  school_id: string;
  graduate_id: string;
  institution_id: string;
  program_id: string;
  outcome_type: OutcomeType;
  employment_status: EmploymentStatus;
  industry_sector: IndustrySector;
  career_level: CareerLevel;
  job_title: string;
  employer_name: string;
  employer_size: string;
  employer_type: string;
  location: string;
  region_type: RegionType;
  work_arrangement: WorkArrangement;
  contract_type: ContractType;
  salary_amount: number;
  salary_currency: string;
  salary_range: SalaryRange;
  benefits_package: string[];
  start_date: string;
  time_to_employment_days: number;
  job_match_score: number;
  skill_match_score: number;
  employer_satisfaction_score: number;
  graduate_satisfaction_score: number;
  career_growth_potential: number;
  skill_utilization: number;
  relevance_to_program: number;
  is_field_related: boolean;
  is_level_appropriate: boolean;
  isalary_competitive: boolean;
  data_source: DataSourceType;
  verification_status: ValidationStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ProgramROI {
  id: string;
  school_id: string;
  institution_id: string;
  program_id: string;
  program_name: string;
  program_level: ProgramLevel;
  program_duration_months: number;
  program_cost: number;
  program_currency: string;
  total_graduates: number;
  employed_graduates: number;
  employment_rate: number;
  average_salary: number;
  median_salary: number;
  salary_increase_pct: number;
  time_to_employment_avg_months: number;
  employer_satisfaction_avg: number;
  program_satisfaction_avg: number;
  curriculum_relevance_score: number;
  industry_alignment_score: number;
  skill_gap_score: number;
  roi_ratio: number;
  roi_percentage: number;
  payback_period_months: number;
  net_present_value: number;
  internal_rate_return: number;
  cost_per_graduate_employed: number;
  lifetime_earnings_increase: number;
  economic_value_added: number;
  social_return_on_investment: number;
  benchmark_comparison: number;
  industry_benchmark: number;
  national_benchmark: number;
  peer_benchmark: number;
  historical_trend: TrendDirection;
  prediction_score: number;
  confidence_interval: number;
  data_year: number;
  calculation_method: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface InstitutionEmployabilityScore {
  id: string;
  school_id: string;
  institution_id: string;
  institution_name: string;
  institution_tier: InstitutionTier;
  overall_score: number;
  employment_rate_score: number;
  salary_score: number;
  time_to_employment_score: number;
  employer_satisfaction_score: number;
  curriculum_relevance_score: number;
  industry_alignment_score: number;
  skill_development_score: number;
  career_services_score: number;
  alumni_engagement_score: number;
  research_impact_score: number;
  international_outlook_score: number;
  industry_partnership_score: number;
  work_integrated_learning_score: number;
  graduate_startups_score: number;
  further_education_score: number;
  ranking_position: number;
  ranking_change: number;
  national_rank: number;
  regional_rank: number;
  global_rank: number;
  score_trend: TrendDirection;
  score_history: number[];
  peer_comparison: Record<string, number>;
  industry_breakdown: Record<IndustrySector, number>;
  year: number;
  methodology_version: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CurriculumRelevanceScore {
  id: string;
  school_id: string;
  institution_id: string;
  program_id: string;
  curriculum_id: string;
  overall_score: number;
  content_relevance_score: number;
  skill_relevance_score: number;
  tool_relevance_score: number;
  methodology_relevance_score: number;
  assessment_relevance_score: number;
  industry_input_score: number;
  employer_feedback_score: number;
  graduate_feedback_score: number;
  market_demand_alignment: number;
  technology_currency_score: number;
  practical_application_score: number;
  theoretical_foundation_score: number;
  interdisciplinary_score: number;
  innovation_score: number;
  update_frequency_months: number;
  last_review_date: string;
  next_review_date: string;
  review_cycle_count: number;
  industry_partners_involved: number;
  employer_advisory_score: number;
  accreditation_score: number;
  benchmark_score: number;
  trend_direction: TrendDirection;
  improvement_areas: string[];
  strengths: string[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface IndustryAlignmentScore {
  id: string;
  school_id: string;
  institution_id: string;
  program_id: string;
  industry_sector: IndustrySector;
  overall_score: number;
  skill_alignment_score: number;
  knowledge_alignment_score: number;
  tool_alignment_score: number;
  methodology_alignment_score: number;
  certification_alignment_score: number;
  experience_alignment_score: number;
  competency_alignment_score: number;
  market_demand_score: number;
  job_posting_match_score: number;
  employer_satisfaction_score: number;
  graduate_readiness_score: number;
  curriculum_gap_score: number;
  training_gap_score: number;
  technology_gap_score: number;
  salary_alignment_score: number;
  career_path_alignment: number;
  growth_potential_alignment: number;
  regional_alignment: number;
  global_alignment: number;
  emerging_skill_coverage: number;
  future_readiness_score: number;
  industry_trend_alignment: number;
  skill_demand_correlation: number;
  hiring_pattern_alignment: number;
  benchmark_score: number;
  year: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EmploymentPipeline {
  id: string;
  school_id: string;
  institution_id: string;
  program_id: string;
  pipeline_name: string;
  total_candidates: number;
  active_candidates: number;
  placed_candidates: number;
  pipeline_conversion_rate: number;
  average_time_to_place_days: number;
  stages: PipelineStage[];
  industry_distribution: Record<IndustrySector, number>;
  role_distribution: Record<string, number>;
  salary_distribution: Record<SalaryRange, number>;
  geographic_distribution: Record<string, number>;
  employer_distribution: Record<string, number>;
  quality_score: number;
  efficiency_score: number;
  satisfaction_score: number;
  trend: TrendDirection;
  forecast_accuracy: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PipelineStage {
  stage_id: string;
  stage_name: string;
  stage_order: number;
  candidates_count: number;
  conversion_rate: number;
  average_duration_days: number;
  drop_off_rate: number;
  quality_score: number;
}

export interface EducationEmploymentConfig {
  id: string;
  school_id: string;
  institution_id: string;
  tracking_enabled: boolean;
  real_time_tracking: boolean;
  survey_frequency: ReportFrequency;
  data_collection_methods: DataCollectionMethod[];
  target_response_rate: number;
  tracking_period_months: number;
  alumni_engagement_enabled: boolean;
  employer_partnerships_enabled: boolean;
  industry_alignment_enabled: boolean;
  curriculum_review_enabled: boolean;
  benchmark_tracking_enabled: boolean;
  alert_thresholds: Record<string, number>;
  notification_channels: NotificationChannel[];
  report_formats: ReportFormat[];
  data_retention: DataRetention;
  consent_required: boolean;
  anonymization_enabled: boolean;
  integration_settings: IntegrationConfig[];
  prediction_models: PredictionModel[];
  optimization_goals: OptimizationGoal[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface IntegrationConfig {
  integration_type: IntegrationType;
  enabled: boolean;
  api_endpoint: string;
  api_key: string;
  sync_frequency: string;
  last_sync: string;
  status: string;
}

export interface EducationEmploymentMetrics {
  id: string;
  school_id: string;
  institution_id: string;
  measurement_date: string;
  period: string;
  total_graduates_tracked: number;
  overall_employment_rate: number;
  employment_rate_by_field: Record<GraduateField, number>;
  employment_rate_by_level: Record<ProgramLevel, number>;
  employment_rate_by_tier: Record<InstitutionTier, number>;
  average_time_to_employment_months: number;
  median_time_to_employment_months: number;
  average_salary: number;
  median_salary: number;
  salary_by_field: Record<GraduateField, number>;
  salary_by_industry: Record<IndustrySector, number>;
  salary_by_region: Record<string, number>;
  employer_satisfaction_avg: number;
  graduate_satisfaction_avg: number;
  program_relevance_avg: number;
  skill_utilization_avg: number;
  career_progression_avg: number;
  job_match_quality_avg: number;
  industry_alignment_avg: number;
  curriculum_relevance_avg: number;
  top_employers: string[];
  top_industries: IndustrySector[];
  top_job_titles: string[];
  regional_distribution: Record<string, number>;
  gender_distribution: Record<GenderType, number>;
  age_distribution: Record<AgeGroup, number>;
  entrepreneurship_rate: number;
  further_education_rate: number;
  international_employment_rate: number;
  underemployment_rate: number;
  field_related_employment_rate: number;
  level_appropriate_employment_rate: number;
  trend: TrendDirection;
  year_over_year_change: number;
  benchmark_comparison: Record<BenchmarkType, number>;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SkillEmploymentCorrelation {
  id: string;
  school_id: string;
  skill_id: string;
  skill_name: string;
  skill_category: SkillCategory;
  correlation_type: CorrelationType;
  correlation_coefficient: number;
  p_value: number;
  confidence_interval: number;
  sample_size: number;
  employment_rate_with_skill: number;
  employment_rate_without_skill: number;
  salary_premium_with_skill: number;
  time_to_employment_reduction_days: number;
  industry_relevance: Record<IndustrySector, number>;
  trend: TrendDirection;
  year: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface GraduateEmploymentEvent {
  id: string;
  school_id: string;
  graduate_id: string;
  event_type: EventType;
  event_date: string;
  previous_employer: string | null;
  previous_position: string | null;
  new_employer: string;
  new_position: string;
  industry_sector: IndustrySector;
  career_level: CareerLevel;
  salary_before: number | null;
  salary_after: number;
  salary_currency: string;
  location: string;
  region_type: RegionType;
  work_arrangement: WorkArrangement;
  contract_type: ContractType;
  reason_for_change: string;
  skills_gained: string[];
  skills_utilized: string[];
  satisfaction_score: number;
  career_growth_score: number;
  data_source: DataSourceType;
  verification_status: ValidationStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EmployerPartner {
  id: string;
  school_id: string;
  institution_id: string;
  employer_name: string;
  industry_sector: IndustrySector;
  company_size: string;
  company_type: string;
  headquarters_location: string;
  partnership_type: PartnershipType[];
  active_job_postings: number;
  total_hires_from_institution: number;
  average_salary_offered: number;
  satisfaction_score: number;
  response_rate: number;
  average_hiring_time_days: number;
  internship_positions_offered: number;
  mentorship_programs: boolean;
  curriculum_input_provided: boolean;
  equipment_donated: boolean;
  guest_lectures_provided: boolean;
  joint_research_projects: number;
  partnership_start_date: string;
  partnership_status: string;
  contact_person: string;
  contact_email: string;
  contact_phone: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SkillGapAnalysis {
  id: string;
  school_id: string;
  institution_id: string;
  program_id: string;
  industry_sector: IndustrySector;
  analysis_date: string;
  overall_gap_score: number;
  critical_gaps: SkillGap[];
  moderate_gaps: SkillGap[];
  minor_gaps: SkillGap[];
  emerging_skills_needed: string[];
  obsolete_skills: string[];
  skill_demand_forecast: Record<string, number>;
  training_recommendations: TrainingRecommendation[];
  curriculum_update_suggestions: CurriculumUpdateSuggestion[];
  employer_feedback_summary: string;
  market_analysis_summary: string;
  confidence_score: number;
  data_sources: DataSourceType[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SkillGap {
  skill_name: string;
  skill_category: SkillCategory;
  current_coverage: number;
  required_level: number;
  gap_severity: SkillGapSeverity;
  demand_growth_rate: number;
  affected_roles: string[];
  training_hours_needed: number;
  priority_rank: number;
}

export interface TrainingRecommendation {
  skill_name: string;
  training_type: string;
  duration_hours: number;
  delivery_mode: string;
  provider: string;
  cost_estimate: number;
  expected_outcome: string;
  priority: number;
}

export interface CurriculumUpdateSuggestion {
  module_name: string;
  current_content: string;
  suggested_update: string;
  rationale: string;
  industry_input: string;
  priority: SkillGapSeverity;
  estimated_impact: number;
}

export interface EducationEmploymentAlert {
  id: string;
  school_id: string;
  institution_id: string;
  alert_type: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  metric_name: string;
  threshold_value: number;
  current_value: number;
  deviation_percentage: number;
  affected_programs: string[];
  affected_fields: GraduateField[];
  recommended_action: string;
  auto_resolve: boolean;
  resolved: boolean;
  resolved_at: string | null;
  resolved_by: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EducationEmploymentForecast {
  id: string;
  school_id: string;
  institution_id: string;
  forecast_type: string;
  forecast_period: string;
  prediction_model: PredictionModel;
  predicted_employment_rate: number;
  predicted_average_salary: number;
  predicted_time_to_employment_months: number;
  confidence_interval: number;
  confidence_level: number;
  historical_data_points: number;
  feature_importance: Record<string, number>;
  scenario_analysis: ScenarioResult[];
  risk_factors: string[];
  opportunities: string[];
  assumptions: string[];
  accuracy_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ScenarioResult {
  scenario_name: string;
  description: string;
  probability: number;
  predicted_employment_rate: number;
  predicted_salary: number;
  impact_factors: Record<string, number>;
}

export interface EducationEmploymentBenchmark {
  id: string;
  school_id: string;
  institution_id: string;
  benchmark_type: BenchmarkType;
  metric_name: string;
  metric_category: MetricCategory;
  institution_value: number;
  benchmark_value: number;
  difference: number;
  difference_percentage: number;
  percentile_rank: number;
  ranking_position: number;
  total_institutions: number;
  region: string;
  year: number;
  data_year: number;
  sample_size: number;
  confidence_level: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface EducationEmploymentReport {
  id: string;
  school_id: string;
  institution_id: string;
  report_name: string;
  report_type: string;
  report_frequency: ReportFrequency;
  report_format: ReportFormat;
  period_start: string;
  period_end: string;
  generated_at: string;
  generated_by: string;
  sections: ReportSection[];
  executive_summary: string;
  key_findings: string[];
  recommendations: string[];
  charts: ReportChart[];
  data_tables: ReportDataTable[];
  appendices: string[];
  access_level: AccessLevel;
  distribution_list: string[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ReportSection {
  section_id: string;
  section_name: string;
  section_order: number;
  content: string;
  key_metrics: Record<string, number>;
  charts: string[];
  tables: string[];
}

export interface ReportChart {
  chart_id: string;
  chart_type: VisualizationType;
  title: string;
  data_source: string;
  configuration: Record<string, unknown>;
}

export interface ReportDataTable {
  table_id: string;
  title: string;
  headers: string[];
  rows: string[][];
  footnotes: string[];
}

export interface EducationEmploymentAuditLog {
  id: string;
  school_id: string;
  institution_id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  old_value: Record<string, unknown> | null;
  new_value: Record<string, unknown> | null;
  ip_address: string;
  user_agent: string;
  timestamp: string;
  metadata: Record<string, unknown>;
  created_at: string;
}
