export enum TwinComponentType {
  EDUCATION = "EDUCATION",
  SKILLS = "SKILLS",
  COMPETENCIES = "COMPETENCIES",
  CREDENTIALS = "CREDENTIALS",
  EXPERIENCE = "EXPERIENCE",
  EMPLOYMENT = "EMPLOYMENT",
  LEARNING = "LEARNING",
  CAREER = "CAREER",
  GOALS = "GOALS",
  ACHIEVEMENTS = "ACHIEVEMENTS",
  PERSONALITY = "PERSONALITY",
  INTERESTS = "INTERESTS",
  NETWORK = "NETWORK",
  REPUTATION = "REPUTATION",
  HEALTH = "HEALTH",
  FINANCES = "FINANCES",
  LIFESTYLE = "LIFESTYLE",
  VALUES = "VALUES",
}

export enum SimulationType {
  SKILL_LEARNING_IMPACT = "SKILL_LEARNING_IMPACT",
  CAREER_PATH_ANALYSIS = "CAREER_PATH_ANALYSIS",
  SKILL_GAP_REDUCTION = "SKILL_GAP_REDUCTION",
  EMPLOYABILITY_MAXIMIZATION = "EMPLOYABILITY_MAXIMIZATION",
  CERTIFICATION_CAREER_ACCESS = "CERTIFICATION_CAREER_ACCESS",
  SALARY_PROJECTION = "SALARY_PROJECTION",
  JOB_TRANSITION = "JOB_TRANSITION",
  INDUSTRY_SHIFT = "INDUSTRY_SHIFT",
  EDUCATION_INVESTMENT = "EDUCATION_INVESTMENT",
  WORK_LIFE_BALANCE = "WORK_LIFE_BALANCE",
  NETWORK_EXPANSION = "NETWORK_EXPANSION",
  ENTREPRENEURSHIP = "ENTREPRENEURSHIP",
  RETIREMENT_PLANNING = "RETIREMENT_PLANNING",
  SKILL_OBsolescence = "SKILL_OBsolescence",
  MARKET_DISRUPTION = "MARKET_DISRUPTION",
}

export enum SimulationStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  PAUSED = "PAUSED",
  QUEUED = "QUEUED",
  TIMEOUT = "TIMEOUT",
}

export enum ScenarioType {
  BEST_CASE = "BEST_CASE",
  WORST_CASE = "WORST_CASE",
  BASE_CASE = "BASE_CASE",
  OPTIMISTIC = "OPTIMISTIC",
  PESSIMISTIC = "PESSIMISTIC",
  REALISTIC = "REALISTIC",
  STRESS_TEST = "STRESS_TEST",
  MONTE_CARLO = "MONTE_CARLO",
  SENSITIVITY = "SENSITIVITY",
}

export enum ImpactLevel {
  VERY_HIGH = "VERY_HIGH",
  HIGH = "HIGH",
  MODERATE = "MODERATE",
  LOW = "LOW",
  VERY_LOW = "VERY_LOW",
  NEGLIGIBLE = "NEGLIGIBLE",
  TRANSFORMATIVE = "TRANSFORMATIVE",
}

export enum SkillLevel {
  NONE = "NONE",
  BEGINNER = "BEGINNER",
  ELEMENTARY = "ELEMENTARY",
  INTERMEDIATE = "INTERMEDIATE",
  UPPER_INTERMEDIATE = "UPPER_INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
  MASTER = "MASTER",
}

export enum CredentialStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
  RENEWED = "RENEWED",
  IN_PROGRESS = "IN_PROGRESS",
}

export enum CareerStage {
  EXPLORATION = "EXPLORATION",
  ESTABLISHMENT = "ESTABLISHMENT",
  ADVANCEMENT = "ADVANCEMENT",
  MAINTENANCE = "MAINTENANCE",
  TRANSITION = "TRANSITION",
  RETIREMENT = "RETIREMENT",
  REINVENTION = "REINVENTION",
}

export enum LearningStyle {
  VISUAL = "VISUAL",
  AUDITORY = "AUDITORY",
  KINESTHETIC = "KINESTHETIC",
  READING_WRITING = "READING_WRITING",
  MIXED = "MIXED",
}

export enum GoalPriority {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  ASPIRATIONAL = "ASPIRATIONAL",
}

export enum GoalStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  ON_TRACK = "ON_TRACK",
  BEHIND = "BEHIND",
  ACHIEVED = "ACHIEVED",
  ABANDONED = "ABANDONED",
  REVISED = "REVISED",
}

export enum AchievementCategory {
  EDUCATION = "EDUCATION",
  CERTIFICATION = "CERTIFICATION",
  SKILL = "SKILL",
  PROJECT = "PROJECT",
  PUBLICATION = "PUBLICATION",
  AWARD = "AWARD",
  LEADERSHIP = "LEADERSHIP",
  VOLUNTEER = "VOLUNTEER",
  ENTREPRENEURSHIP = "ENTREPRENEURSHIP",
  RESEARCH = "RESEARCH",
  PATENT = "PATENT",
  SPEAKING = "SPEAKING",
}

export enum CompetencyType {
  TECHNICAL = "TECHNICAL",
  BEHAVIORAL = "BEHAVIORAL",
  LEADERSHIP = "LEADERSHIP",
  FUNCTIONAL = "FUNCTIONAL",
  CORE = "CORE",
  DIGITAL = "DIGITAL",
  COGNITIVE = "COGNITIVE",
  SOCIAL = "SOCIAL",
}

export enum ExperienceType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  INTERNSHIP = "INTERNSHIP",
  FREELANCE = "FREELANCE",
  VOLUNTEER = "VOLUNTEER",
  CONSULTING = "CONSULTING",
  CONTRACT = "CONTRACT",
  APPRENTICESHIP = "APPRENTICESHIP",
  PROJECT = "PROJECT",
  RESEARCH = "RESEARCH",
}

export enum EducationLevel {
  HIGH_SCHOOL = "HIGH_SCHOOL",
  DIPLOMA = "DIPLOMA",
  ASSOCIATE = "ASSOCIATE",
  BACHELOR = "BACHELOR",
  MASTER = "MASTER",
  DOCTORATE = "DOCTORATE",
  PROFESSIONAL = "PROFESSIONAL",
  POST_DOCTORATE = "POST_DOCTORATE",
  CERTIFICATE = "CERTIFICATE",
  MICRO_CREDENTIAL = "MICRO_CREDENTIAL",
}

export enum InstitutionType {
  UNIVERSITY = "UNIVERSITY",
  COLLEGE = "COLLEGE",
  INSTITUTE = "INSTITUTE",
  SCHOOL = "SCHOOL",
  ACADEMY = "ACADEMY",
  TRAINING_CENTER = "TRAINING_CENTER",
  ONLINE_PLATFORM = "ONLINE_PLATFORM",
  CORPORATE = "CORPORATE",
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

export enum MatchType {
  EXACT = "EXACT",
  PARTIAL = "PARTIAL",
  ASPIRATIONAL = "ASPIRATIONAL",
  ADJACENT = "ADJACENT",
  TRANSFERABLE = "TRANSFERABLE",
}

export enum SimulationAlgorithm {
  MONTE_CARLO = "MONTE_CARLO",
  DECISION_TREE = "DECISION_TREE",
  NEURAL_NETWORK = "NEURAL_NETWORK",
  REGRESSION = "REGRESSION",
  CLUSTERING = "CLUSTERING",
  OPTIMIZATION = "OPTIMIZATION",
  AGENT_BASED = "AGENT_BASED",
  SYSTEM_DYNAMICS = "SYSTEM_DYNAMICS",
}

export enum DataSource {
  SELF_REPORTED = "SELF_REPORTED",
  VERIFIED = "VERIFIED",
  INFERRED = "INFERRED",
  EXTERNAL_API = "EXTERNAL_API",
  INSTITUTION = "INSTITUTION",
  EMPLOYER = "EMPLOYER",
  GOVERNMENT = "GOVERNMENT",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
}

export enum TwinSyncFrequency {
  REAL_TIME = "REAL_TIME",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  ON_DEMAND = "ON_DEMAND",
}

export enum ConfidenceLevel {
  VERY_HIGH = "VERY_HIGH",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  VERY_LOW = "VERY_LOW",
}

export enum RiskLevel {
  VERY_LOW = "VERY_LOW",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum TimeHorizon {
  SHORT_TERM = "SHORT_TERM",
  MEDIUM_TERM = "MEDIUM_TERM",
  LONG_TERM = "LONG_TERM",
  LIFETIME = "LIFETIME",
}

export enum ComparisonMode {
  PEER = "PEER",
  INDUSTRY = "INDUSTRY",
  REGIONAL = "REGIONAL",
  NATIONAL = "NATIONAL",
  GLOBAL = "GLOBAL",
  HISTORICAL = "HISTORICAL",
}

export enum VisualizationType {
  TIMELINE = "TIMELINE",
  SKILL_TREE = "SKILL_TREE",
  CAREER_MAP = "CAREER_MAP",
  PROGRESS_CHART = "PROGRESS_CHART",
  COMPARISON_MATRIX = "COMPARISON_MATRIX",
  RADAR = "RADAR",
  FLOW = "FLOW",
  NETWORK = "NETWORK",
}

export enum AlertType {
  OPPORTUNITY = "OPPORTUNITY",
  RISK = "RISK",
  DEADLINE = "DEADLINE",
  ACHIEVEMENT = "ACHIEVEMENT",
  GAP = "GAP",
  TREND = "TREND",
  RECOMMENDATION = "RECOMMENDATION",
}

export enum NotificationFrequency {
  IMMEDIATE = "IMMEDIATE",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export enum ExportFormat {
  PDF = "PDF",
  JSON = "JSON",
  CSV = "CSV",
  XML = "XML",
  DOCX = "DOCX",
  HTML = "HTML",
}

export enum PrivacyLevel {
  PUBLIC = "PUBLIC",
  PROFESSIONAL = "PROFESSIONAL",
  PRIVATE = "PRIVATE",
  CONFIDENTIAL = "CONFIDENTIAL",
}

export enum CollaborationMode {
  MENTOR = "MENTOR",
  PEER = "PEER",
  MANAGER = "MANAGER",
  INSTITUTION = "INSTITUTION",
  EMPLOYER = "EMPLOYER",
  ADVISOR = "ADVISOR",
}

export enum LanguageProficiency {
  ELEMENTARY = "ELEMENTARY",
  LIMITED_WORKING = "LIMITED_WORKING",
  PROFESSIONAL = "PROFESSIONAL",
  FULL_PROFESSIONAL = "FULL_PROFESSIONAL",
  NATIVE = "NATIVE",
}

export enum CertificationType:
  PROFESSIONAL = "PROFESSIONAL",
  INDUSTRY = "INDUSTRY",
  ACADEMIC = "ACADEMIC",
  GOVERNMENT = "GOVERNMENT",
  VENDOR = "VENDOR",
  MICRO_CREDENTIAL = "MICRO_CREDENTIAL",
  DIGITAL_BADGE = "DIGITAL_BADGE",
}

export enum NetworkNodeType {
  MENTOR = "MENTOR",
  PEER = "PEER",
  COLLEAGUE = "COLLEAGUE",
  INDUSTRY_EXPERT = "INDUSTRY_EXPERT",
  RECRUITER = "RECRUITER",
  ALUMNI = "ALUMNI",
  PROFESSIONAL_ASSOCIATION = "PROFESSIONAL_ASSOCIATION",
}

export enum ValueAlignment {
  STRONG = "STRONG",
  MODERATE = "MODERATE",
  WEAK = "WEAK",
  CONFLICTING = "CONFLICTING",
}

export enum PersonalityDimension {
  OPENNESS = "OPENNESS",
  CONSCIENTIOUSNESS = "CONSCIENTIOUSNESS",
  EXTRAVERSION = "EXTRAVERSION",
  AGREEABLENESS = "AGREEABLENESS",
  NEUROTICISM = "NEUROTICISM",
}

export enum InterestCategory {
  INVESTIGATIVE = "INVESTIGATIVE",
  ARTISTIC = "ARTISTIC",
  SOCIAL = "SOCIAL",
  ENTERPRISING = "ENTERPRISING",
  CONVENTIONAL = "CONVENTIONAL",
  REALISTIC = "REALISTIC",
}

export enum WorkPreference {
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  ONSITE = "ONSITE",
  FLEXIBLE = "FLEXIBLE",
  TRAVEL = "TRAVEL",
}

export enum LeadershipStyle {
  TRANSFORMATIONAL = "TRANSFORMATIONAL",
  SERVANT = "SERVANT",
  AUTHENTIC = "AUTHENTIC",
  SITUATIONAL = "SITUATIONAL",
  COACHING = "COACHING",
  DEMOCRATIC = "DEMOCRATIC",
  AUTOCRATIC = "AUTOCRATIC",
}

export interface PersonDigitalTwin {
  id: string;
  school_id: string;
  user_id: string;
  person_name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  overall_completeness_score: number;
  last_synced: string;
  sync_frequency: TwinSyncFrequency;
  components: TwinComponent[];
  simulations: TwinSimulation[];
  alerts: TwinAlert[];
  goals: TwinGoals;
  network: TwinNetwork;
  preferences: TwinPreferences;
  privacy_level: PrivacyLevel;
  sharing_enabled: boolean;
  collaboration_mode: CollaborationMode[];
  metadata: Record<string, unknown>;
}

export interface TwinComponent {
  component_type: TwinComponentType;
  data: Record<string, unknown>;
  completeness_score: number;
  last_updated: string;
  data_source: DataSource;
  verified: boolean;
}

export interface TwinEducation {
  id: string;
  school_id: string;
  user_id: string;
  education_entries: EducationEntry[];
  total_education_years: number;
  highest_education_level: EducationLevel;
  gpa: number;
  gpa_scale: string;
  graduation_year: number;
  honors: string[];
  relevant_coursework: string[];
  academic_projects: AcademicProject[];
  research_papers: string[];
  thesis_title: string | null;
  advisor: string | null;
  overall_academic_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EducationEntry {
  entry_id: string;
  institution_name: string;
  institution_type: InstitutionType;
  degree: string;
  field_of_study: string;
  education_level: EducationLevel;
  start_date: string;
  end_date: string;
  gpa: number;
  gpa_scale: string;
  status: CredentialStatus;
  is_current: boolean;
  relevant_courses: string[];
  honors: string[];
  activities: string[];
  thesis_title: string | null;
  metadata: Record<string, unknown>;
}

export interface AcademicProject {
  project_id: string;
  project_name: string;
  description: string;
  skills_used: string[];
  outcome: string;
  date: string;
}

export interface TwinSkills {
  id: string;
  school_id: string;
  user_id: string;
  skills: SkillEntry[];
  total_skills: number;
  average_skill_level: number;
  skill_distribution: Record<SkillCategory, number>;
  top_skills: string[];
  emerging_skills: string[];
  obsolescence_risk_skills: string[];
  overall_skill_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SkillEntry {
  skill_id: string;
  skill_name: string;
  skill_category: SkillCategory;
  proficiency_level: SkillLevel;
  years_of_experience: number;
  last_used: string;
  verified: boolean;
  verification_source: string | null;
  endorsements_count: number;
  confidence_score: number;
  learning_progress: number;
  obsolescence_risk: RiskLevel;
  market_demand: number;
  salary_impact: number;
  metadata: Record<string, unknown>;
}

export interface TwinCompetencies {
  id: string;
  school_id: string;
  user_id: string;
  competencies: CompetencyEntry[];
  total_competencies: number;
  average_competency_level: number;
  competency_distribution: Record<CompetencyType, number>;
  leadership_style: LeadershipStyle;
  overall_competency_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CompetencyEntry {
  competency_id: string;
  competency_name: string;
  competency_type: CompetencyType;
  proficiency_level: SkillLevel;
  assessment_date: string;
  assessor: string;
  evidence: string[];
  improvement_areas: string[];
  strengths: string[];
  confidence_score: number;
  metadata: Record<string, unknown>;
}

export interface TwinCredentials {
  id: string;
  school_id: string;
  user_id: string;
  credentials: CredentialEntry[];
  total_credentials: number;
  active_credentials: number;
  expiring_soon: number;
  credential_distribution: Record<CertificationType, number>;
  overall_credential_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CredentialEntry {
  credential_id: string;
  credential_name: string;
  credential_type: CertificationType;
  issuing_organization: string;
  issue_date: string;
  expiration_date: string | null;
  credential_status: CredentialStatus;
  credential_id_number: string;
  credential_url: string | null;
  skills_validated: string[];
  industry_recognition: number;
  renewal_required: boolean;
  renewal_frequency_months: number | null;
  verification_url: string | null;
  metadata: Record<string, unknown>;
}

export interface TwinExperience {
  id: string;
  school_id: string;
  user_id: string;
  experiences: ExperienceEntry[];
  total_experience_years: number;
  industries_covered: IndustrySector[];
  roles_held: number;
  average_tenure_years: number;
  career_progression_score: number;
  overall_experience_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ExperienceEntry {
  experience_id: string;
  company_name: string;
  industry_sector: IndustrySector;
  position: string;
  experience_type: ExperienceType;
  career_level: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  location: string;
  responsibilities: string[];
  achievements: string[];
  skills_developed: string[];
  team_size: number | null;
  budget_managed: number | null;
  performance_rating: number | null;
  reason_for_leaving: string | null;
  references: string[];
  metadata: Record<string, unknown>;
}

export interface TwinEmployment {
  id: string;
  school_id: string;
  user_id: string;
  current_employer: string | null;
  current_position: string | null;
  current_industry: IndustrySector | null;
  employment_status: string;
  start_date: string | null;
  salary: number | null;
  salary_currency: string | null;
  employment_history: ExperienceEntry[];
  total_employment_years: number;
  employment_gaps: EmploymentGap[];
  overall_employment_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EmploymentGap {
  start_date: string;
  end_date: string;
  duration_months: number;
  reason: string;
}

export interface TwinLearning {
  id: string;
  school_id: string;
  user_id: string;
  learning_style: LearningStyle;
  active_courses: LearningCourse[];
  completed_courses: LearningCourse[];
  in_progress_courses: LearningCourse[];
  total_learning_hours: number;
  average_course_rating: number;
  learning_streak_days: number;
  skills_acquired_count: number;
  certifications_pending: number;
  learning_preferences: LearningPreferences;
  overall_learning_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface LearningCourse {
  course_id: string;
  course_name: string;
  provider: string;
  platform: string;
  category: string;
  duration_hours: number;
  progress_percentage: number;
  status: CredentialStatus;
  start_date: string;
  completion_date: string | null;
  rating: number | null;
  skills_gained: string[];
  certificate_url: string | null;
  cost: number | null;
  currency: string | null;
  metadata: Record<string, unknown>;
}

export interface LearningPreferences {
  preferred_platforms: string[];
  preferred_content_types: string[];
  preferred_schedule: string;
  budget_monthly: number;
  time_available_hours_weekly: number;
  interests: string[];
}

export interface TwinCareer {
  id: string;
  school_id: string;
  user_id: string;
  current_career_stage: CareerStage;
  target_career_path: CareerPath[];
  ideal_roles: string[];
  preferred_industries: IndustrySector[];
  work_preferences: WorkPreference[];
  location_preferences: string[];
  salary_expectations: SalaryExpectation;
  career_timeline: CareerMilestone[];
  career_readiness_score: number;
  overall_career_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CareerPath {
  path_id: string;
  path_name: string;
  target_role: string;
  target_industry: IndustrySector;
  estimated_duration_years: number;
  required_skills: string[];
  required_credentials: string[];
  required_experience: string[];
  probability_score: number;
  salary_range_min: number;
  salary_range_max: number;
  growth_potential: number;
  market_demand: number;
  competitiveness: number;
  steps: CareerStep[];
}

export interface CareerStep {
  step_order: number;
  step_name: string;
  description: string;
  duration_years: number;
  required_actions: string[];
  skills_to_acquire: string[];
  credentials_to_obtain: string[];
}

export interface SalaryExpectation {
  current_salary: number;
  target_salary: number;
  currency: string;
  minimum_acceptable: number;
  market_average: number;
  percentile_target: number;
}

export interface CareerMilestone {
  milestone_id: string;
  milestone_name: string;
  target_date: string;
  achieved_date: string | null;
  status: GoalStatus;
  description: string;
  impact: ImpactLevel;
}

export interface TwinGoals {
  id: string;
  school_id: string;
  user_id: string;
  short_term_goals: GoalEntry[];
  medium_term_goals: GoalEntry[];
  long_term_goals: GoalEntry[];
  total_goals: number;
  achieved_goals: number;
  in_progress_goals: number;
  overall_progress_score: number;
  overall_goals_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GoalEntry {
  goal_id: string;
  goal_name: string;
  goal_category: string;
  description: string;
  priority: GoalPriority;
  status: GoalStatus;
  target_date: string;
  achieved_date: string | null;
  progress_percentage: number;
  milestones: GoalMilestone[];
  required_resources: string[];
  dependencies: string[];
  success_criteria: string[];
  notes: string;
  metadata: Record<string, unknown>;
}

export interface GoalMilestone {
  milestone_id: string;
  milestone_name: string;
  status: GoalStatus;
  target_date: string;
  achieved_date: string | null;
  progress_percentage: number;
}

export interface TwinAchievements {
  id: string;
  school_id: string;
  user_id: string;
  achievements: AchievementEntry[];
  total_achievements: number;
  achievements_this_year: number;
  category_distribution: Record<AchievementCategory, number>;
  overall_achievement_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AchievementEntry {
  achievement_id: string;
  achievement_name: string;
  category: AchievementCategory;
  date_earned: string;
  description: string;
  issuing_organization: string | null;
  impact_level: ImpactLevel;
  skills_demonstrated: string[];
  evidence_url: string | null;
  verification_status: CredentialStatus;
  metadata: Record<string, unknown>;
}

export interface TwinSimulation {
  id: string;
  school_id: string;
  user_id: string;
  simulation_type: SimulationType;
  simulation_name: string;
  status: SimulationStatus;
  algorithm: SimulationAlgorithm;
  parameters: SimulationParameters;
  input_data: Record<string, unknown>;
  result: SimulationResult | null;
  started_at: string | null;
  completed_at: string | null;
  duration_ms: number | null;
  confidence_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SimulationParameters {
  scenarios: ScenarioType[];
  iterations: number;
  time_horizon: TimeHorizon;
  confidence_level: ConfidenceLevel;
  comparison_mode: ComparisonMode;
  variables: string[];
  assumptions: Record<string, unknown>;
  constraints: Record<string, unknown>;
  optimization_goal: string | null;
}

export interface SimulationResult {
  primary_outcome: number;
  outcome_description: string;
  scenarios: ScenarioAnalysis[];
  impact_assessment: ImpactAssessment;
  recommendations: SimulationRecommendation[];
  risk_analysis: RiskAnalysis;
  sensitivity_analysis: SensitivityResult[];
  confidence_interval: [number, number];
  accuracy_score: number;
  visualization_data: SimulationVisualization;
}

export interface ScenarioAnalysis {
  scenario_type: ScenarioType;
  scenario_name: string;
  probability: number;
  outcome_value: number;
  outcome_description: string;
  key_factors: Record<string, number>;
  timeline: ScenarioTimeline[];
}

export interface ScenarioTimeline {
  period: string;
  value: number;
  description: string;
}

export interface ImpactAssessment {
  overall_impact: ImpactLevel;
  skill_impact: number;
  career_impact: number;
  salary_impact: number;
  employability_impact: number;
  time_impact: number;
  cost_impact: number;
  risk_impact: number;
  breakdown: Record<string, number>;
}

export interface SimulationRecommendation {
  recommendation_id: string;
  title: string;
  description: string;
  priority: GoalPriority;
  expected_impact: ImpactLevel;
  estimated_duration: string;
  required_resources: string[];
  success_probability: number;
  action_items: string[];
}

export interface RiskAnalysis {
  overall_risk: RiskLevel;
  risk_factors: RiskFactor[];
  mitigation_strategies: MitigationStrategy[];
  risk_score: number;
}

export interface RiskFactor {
  factor_name: string;
  probability: number;
  impact: ImpactLevel;
  risk_score: number;
  description: string;
}

export interface MitigationStrategy {
  strategy_name: string;
  description: string;
  effectiveness: number;
  cost: number;
  implementation_time: string;
}

export interface SensitivityResult {
  variable_name: string;
  base_value: number;
  range_min: number;
  range_max: number;
  impact_on_outcome: number;
  elasticity: number;
}

export interface SimulationVisualization {
  visualization_type: VisualizationType;
  title: string;
  data_points: Record<string, unknown>[];
  axes: string[];
  legend: string[];
}

export interface TwinAlert {
  id: string;
  school_id: string;
  user_id: string;
  alert_type: AlertType;
  title: string;
  description: string;
  severity: string;
  component_type: TwinComponentType;
  action_required: boolean;
  recommended_action: string;
  deadline: string | null;
  acknowledged: boolean;
  acknowledged_at: string | null;
  dismissed: boolean;
  dismissed_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TwinNetwork {
  id: string;
  school_id: string;
  user_id: string;
  connections: NetworkConnection[];
  total_connections: number;
  strong_connections: number;
  weak_connections: number;
  industry_coverage: IndustrySector[];
  network_diversity_score: number;
  network_influence_score: number;
  overall_network_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NetworkConnection {
  connection_id: string;
  connected_user_id: string;
  connection_type: NetworkNodeType;
  relationship_strength: number;
  shared_interests: string[];
  interaction_frequency: string;
  last_interaction: string;
  mutual_connections: number;
  collaboration_history: string[];
  potential_value: number;
  metadata: Record<string, unknown>;
}

export interface TwinPreferences {
  id: string;
  school_id: string;
  user_id: string;
  notification_frequency: NotificationFrequency;
  alert_types: AlertType[];
  privacy_level: PrivacyLevel;
  sharing_enabled: boolean;
  collaboration_modes: CollaborationMode[];
  export_formats: ExportFormat[];
  visualization_preferences: VisualizationType[];
  comparison_modes: ComparisonMode[];
  time_horizon: TimeHorizon;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TwinConfig {
  id: string;
  school_id: string;
  user_id: string;
  simulation_enabled: boolean;
  auto_sync: boolean;
  sync_frequency: TwinSyncFrequency;
  components_enabled: TwinComponentType[];
  simulation_types_enabled: SimulationType[];
  alert_enabled: boolean;
  notification_enabled: boolean;
  sharing_enabled: boolean;
  collaboration_enabled: boolean;
  ai_recommendations_enabled: boolean;
  data_retention_days: number;
  privacy_settings: Record<string, unknown>;
  integration_settings: Record<string, unknown>;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface TwinMetrics {
  id: string;
  school_id: string;
  user_id: string;
  measurement_date: string;
  overall_twin_score: number;
  component_scores: Record<TwinComponentType, number>;
  simulation_count: number;
  successful_simulations: number;
  avg_simulation_confidence: number;
  goal_completion_rate: number;
  skill_growth_rate: number;
  career_progression_rate: number;
  network_growth_rate: number;
  credential_acquisition_rate: number;
  learning_hours_this_month: number;
  alerts_resolved: number;
  recommendations_followed: number;
  engagement_score: number;
  trend: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TwinAuditLog {
  id: string;
  school_id: string;
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

export interface TwinLanguage {
  id: string;
  school_id: string;
  user_id: string;
  language: string;
  proficiency: LanguageProficiency;
  certification: string | null;
  years_of_experience: number;
  is_primary: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TwinPersonality {
  id: string;
  school_id: string;
  user_id: string;
  dimensions: PersonalityDimensionScore[];
  interest_categories: InterestCategoryScore[];
  work_preferences: WorkPreference[];
  values: ValueEntry[];
  overall_personality_profile: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PersonalityDimensionScore {
  dimension: PersonalityDimension;
  score: number;
  percentile: number;
  description: string;
}

export interface InterestCategoryScore {
  category: InterestCategory;
  score: number;
  percentile: number;
  related_careers: string[];
}

export interface ValueEntry {
  value_name: string;
  importance: number;
  alignment: ValueAlignment;
  description: string;
}

export interface TwinComparison {
  id: string;
  school_id: string;
  user_id: string;
  comparison_type: ComparisonMode;
  target_id: string;
  target_name: string;
  component_comparisons: ComponentComparison[];
  overall_similarity: number;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ComponentComparison {
  component_type: TwinComponentType;
  user_score: number;
  target_score: number;
  difference: number;
  percentile_user: number;
  percentile_target: number;
}
