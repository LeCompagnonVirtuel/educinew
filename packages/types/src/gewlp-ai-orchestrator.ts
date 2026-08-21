export enum AgentType {
  CAREER_ADVISOR = "CAREER_ADVISOR",
  SKILL_INTELLIGENCE = "SKILL_INTELLIGENCE",
  JOB_MATCHING = "JOB_MATCHING",
  LEARNING_ADVISOR = "LEARNING_ADVISOR",
  WORKFORCE_ANALYST = "WORKFORCE_ANALYST",
  RECRUITMENT = "RECRUITMENT",
  TALENT = "TALENT",
  TRAINING = "TRAINING",
  CREDENTIAL = "CREDENTIAL",
  LABOR_MARKET = "LABOR_MARKET",
  EDUCATION_TO_EMPLOYMENT = "EDUCATION_TO_EMPLOYMENT",
  WORKFORCE_FORECAST = "WORKFORCE_FORECAST",
}

export enum AgentStatus {
  IDLE = "IDLE",
  PROCESSING = "PROCESSING",
  PAUSED = "PAUSED",
  ERROR = "ERROR",
  MAINTENANCE = "MAINTENANCE",
  OFFLINE = "OFFLINE",
  TRAINING = "TRAINING",
  DEGRADED = "DEGRADED",
  RECOVERING = "RECOVERING",
}

export enum CollaborationMode {
  SEQUENTIAL = "SEQUENTIAL",
  PARALLEL = "PARALLEL",
  PIPELINE = "PIPELINE",
  CONSENSUS = "CONSENSUS",
  VOTING = "VOTING",
  HIERARCHICAL = "HIERARCHICAL",
  PEER_TO_PEER = "PEER_TO_PEER",
  FEDERATED = "FEDERATED",
  ORCHESTRATED = "ORCHESTRATED",
}

export enum DecisionType {
  CLASSIFICATION = "CLASSIFICATION",
  REGRESSION = "REGRESSION",
  RECOMMENDATION = "RECOMMENDATION",
  PREDICTION = "PREDICTION",
  OPTIMIZATION = "OPTIMIZATION",
  ANOMALY_DETECTION = "ANOMALY_DETECTION",
  CLUSTERING = "CLUSTERING",
  NLP = "NLP",
  GENERATIVE = "GENERATIVE",
  SEMI_SUPERVISED = "SEMI_SUPERVISED",
}

export enum RecommendationType {
  COURSE = "COURSE",
  CAREER_PATH = "CAREER_PATH",
  SKILL_DEVELOPMENT = "SKILL_DEVELOPMENT",
  JOB_OPPORTUNITY = "JOB_OPPORTUNITY",
  CERTIFICATION = "CERTIFICATION",
  MENTORSHIP = "MENTORSHIP",
  TRAINING_PROGRAM = "TRAINING_PROGRAM",
  NETWORKING = "NETWORKING",
  CERTIFICATION_RENEWAL = "CERTIFICATION_RENEWAL",
  SALARY_NEGOTIATION = "SALARY_NEGOTIATION",
}

export enum ForecastType {
  DEMAND = "DEMAND",
  SUPPLY = "SUPPLY",
  SALARY = "SALARY",
  SKILL_GAP = "SKILL_GAP",
  EMPLOYMENT = "EMPLOYMENT",
  TURNOVER = "TURNOVER",
  GROWTH = "GROWTH",
  DISRUPTION = "DISRUPTION",
  TECHNOLOGY = "TECHNOLOGY",
  MARKET = "MARKET",
}

export enum OrchestrationMode {
  CENTRALIZED = "CENTRALIZED",
  DECENTRALIZED = "DECENTRALIZED",
  HYBRID = "HYBRID",
  EVENT_DRIVEN = "EVENT_DRIVEN",
  GOAL_ORIENTED = "GOAL_ORIENTED",
  REACTIVE = "REACTIVE",
  PROACTIVE = "PROACTIVE",
  ADAPTIVE = "ADAPTIVE",
}

export enum IntegrationType {
  AEIP = "AEIP",
  AI_CORE = "AI_CORE",
  LXP = "LXP",
  ASSESSMENT = "ASSESSMENT",
  CERTIFICATION = "CERTIFICATION",
  EDU_OS = "EDU_OS",
  GOVERNMENT = "GOVERNMENT",
  GEGIN = "GEGIN",
  GEI2P = "GEI2P",
  DATA_MESH = "DATA_MESH",
  DIGITAL_TWIN = "DIGITAL_TWIN",
}

export enum ModelType {
  DECISION_TREE = "DECISION_TREE",
  RANDOM_FOREST = "RANDOM_FOREST",
  GRADIENT_BOOSTING = "GRADIENT_BOOSTING",
  NEURAL_NETWORK = "NEURAL_NETWORK",
  DEEP_LEARNING = "DEEP_LEARNING",
  NLP = "NLP",
  RECOMMENDATION_ENGINE = "RECOMMENDATION_ENGINE",
  TIME_SERIES = "TIME_SERIES",
  COMPUTER_VISION = "COMPUTER_VISION",
  REINFORCEMENT_LEARNING = "REINFORCEMENT_LEARNING",
  ENSEMBLE = "ENSEMBLE",
  TRANSFORMER = "TRANSFORMER",
}

export enum DataInputType {
  STRUCTURED = "STRUCTURED",
  UNSTRUCTURED = "UNSTRUCTURED",
  SEMI_STRUCTURED = "SEMI_STRUCTURED",
  REAL_TIME = "REAL_TIME",
  BATCH = "BATCH",
  STREAMING = "STREAMING",
  HISTORICAL = "HISTORICAL",
  SIMULATED = "SIMULATED",
}

export enum OutputFormat {
  JSON = "JSON",
  XML = "XML",
  CSV = "CSV",
  PDF = "PDF",
  HTML = "HTML",
  DASHBOARD = "DASHBOARD",
  API = "API",
  WEBHOOK = "WEBHOOK",
}

export enum AlertSeverity {
  INFO = "INFO",
  WARNING = "WARNING",
  CRITICAL = "CRITICAL",
  SUCCESS = "SUCCESS",
}

export enum WorkflowStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  PAUSED = "PAUSED",
}

export enum AgentRole {
  ADVISOR = "ADVISOR",
  ANALYST = "ANALYST",
  MATCHER = "MATCHER",
  PREDICTOR = "PREDICTOR",
  OPTIMIZER = "OPTIMIZER",
  MONITOR = "MONITOR",
  FACILITATOR = "FACILITATOR",
  ENFORCER = "ENFORCER",
}

export enum LearningOutcome {
  SKILL_ACQUISITION = "SKILL_ACQUISITION",
  KNOWLEDGE_GAIN = "KNOWLEDGE_GAIN",
  BEHAVIOR_CHANGE = "BEHAVIOR_CHANGE",
  PERFORMANCE_IMPROVEMENT = "PERFORMANCE_IMPROVEMENT",
  CERTIFICATION_ACHIEVED = "CERTIFICATION_ACHIEVED",
  CAREER_ADVANCEMENT = "CAREER_ADVANCEMENT",
}

export enum SkillCategory {
  TECHNICAL = "TECHNICAL",
  SOFT_SKILL = "SOFT_SKILL",
  LEADERSHIP = "LEADERSHIP",
  DIGITAL = "DIGITAL",
  DOMAIN_SPECIFIC = "DOMAIN_SPECIFIC",
  TRANSFERABLE = "TRANSFERABLE",
  EMERGING = "EMERGING",
}

export enum IndustrySector {
  TECHNOLOGY = "TECHNOLOGY",
  HEALTHCARE = "HEALTHCARE",
  FINANCE = "FINANCE",
  EDUCATION = "EDUCATION",
  MANUFACTURING = "MANUFACTURING",
  RETAIL = "RETAIL",
  ENERGY = "ENERGY",
  TELECOMMUNICATIONS = "TELECOMMUNICATIONS",
  GOVERNMENT = "GOVERNMENT",
  CONSULTING = "CONSULTING",
}

export enum MatchQuality {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR",
  NO_MATCH = "NO_MATCH",
}

export enum RiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum ConfidenceLevel {
  VERY_HIGH = "VERY_HIGH",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  VERY_LOW = "VERY_LOW",
}

export enum TimeHorizon {
  SHORT_TERM = "SHORT_TERM",
  MEDIUM_TERM = "MEDIUM_TERM",
  LONG_TERM = "LONG_TERM",
}

export enum ComparisonType {
  PEER = "PEER",
  INDUSTRY = "INDUSTRY",
  REGIONAL = "REGIONAL",
  NATIONAL = "NATIONAL",
  GLOBAL = "GLOBAL",
  HISTORICAL = "HISTORICAL",
}

export enum TrendDirection {
  INCREASING = "INCREASING",
  DECREASING = "DECREASING",
  STABLE = "STABLE",
  VOLATILE = "VOLATILE",
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
}

export enum ModelPerformanceMetric {
  ACCURACY = "ACCURACY",
  PRECISION = "PRECISION",
  RECALL = "RECALL",
  F1_SCORE = "F1_SCORE",
  AUC_ROC = "AUC_ROC",
  MSE = "MSE",
  MAE = "MAE",
  R_SQUARED = "R_SQUARED",
}

export enum TrainingStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum FeatureType {
  NUMERICAL = "NUMERICAL",
  CATEGORICAL = "CATEGORICAL",
  TEXT = "TEXT",
  DATE = "DATE",
  BOOLEAN = "BOOLEAN",
  EMBEDDING = "EMBEDDING",
}

export enum BiasType {
  GENDER = "GENDER",
  AGE = "AGE",
  RACE = "RACE",
  GEOGRAPHIC = "GEOGRAPHIC",
  SOCIOECONOMIC = "SOCIOECONOMIC",
  EDUCATION = "EDUCATION",
}

export enum AuditAction {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  EXECUTE = "EXECUTE",
  APPROVE = "APPROVE",
  REJECT = "REJECT",
  EXPORT = "EXPORT",
}

export enum CollaborationStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  ERROR = "ERROR",
}

export enum DataQualityStatus {
  VALID = "VALID",
  INVALID = "INVALID",
  INCOMPLETE = "INCOMPLETE",
  OUTDATED = "OUTDATED",
  SUSPICIOUS = "SUSPICIOUS",
}

export enum AgentCapability {
  ANALYSIS = "ANALYSIS",
  PREDICTION = "PREDICTION",
  RECOMMENDATION = "RECOMMENDATION",
  MATCHING = "MATCHING",
  OPTIMIZATION = "OPTIMIZATION",
  MONITORING = "MONITORING",
  REPORTING = "REPORTING",
  AUTOMATION = "AUTOMATION",
}

export enum RecruitmentStage {
  SOURCING = "SOURCING",
  SCREENING = "SCREENING",
  INTERVIEWING = "INTERVIEWING",
  ASSESSMENT = "ASSESSMENT",
  SELECTION = "SELECTION",
  OFFER = "OFFER",
  ONBOARDING = "ONBOARDING",
}

export enum TalentPoolType {
  ACTIVE = "ACTIVE",
  PASSIVE = "PASSIVE",
  EMERGING = "EMERGING",
  ALUMNI = "ALUMNI",
  INTERNAL = "INTERNAL",
}

export enum TrainingFormat {
  IN_PERSON = "IN_PERSON",
  ONLINE_LIVE = "ONLINE_LIVE",
  SELF_PACED = "SELF_PACED",
  HYBRID = "HYBRID",
  BLENDED = "BLENDED",
  VIRTUAL_REALITY = "VIRTUAL_REALITY",
  AUGMENTED_REALITY = "AUGMENTED_REALITY",
}

export enum CredentialVerificationStatus {
  VERIFIED = "VERIFIED",
  UNVERIFIED = "UNVERIFIED",
  PENDING = "PENDING",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
}

export enum LaborMarketIndicator {
  JOB_OPENINGS = "JOB_OPENINGS",
  UNEMPLOYMENT_RATE = "UNEMPLOYMENT_RATE",
  WAGE_GROWTH = "WAGE_GROWTH",
  SKILL_DEMAND = "SKILL_DEMAND",
  INDUSTRY_GROWTH = "INDUSTRY_GROWTH",
  HIRING_VELOCITY = "HIRING_VELOCITY",
  TURNOVER_RATE = "TURNOVER_RATE",
}

export enum WorkforceForecastHorizon {
  THREE_MONTHS = "THREE_MONTHS",
  SIX_MONTHS = "SIX_MONTHS",
  ONE_YEAR = "ONE_YEAR",
  TWO_YEARS = "TWO_YEARS",
  FIVE_YEARS = "FIVE_YEARS",
}

export interface AIOrchestrator {
  id: string;
  school_id: string;
  orchestrator_name: string;
  orchestration_mode: OrchestrationMode;
  agents: AgentInstance[];
  workflows: WorkflowDefinition[];
  active_workflows: ActiveWorkflow[];
  integrations: SystemIntegration[];
  models: ModelRegistry[];
  data_sources: DataSourceConfig[];
  collaboration_settings: CollaborationSettings;
  performance_metrics: OrchestratorMetrics;
  alert_configuration: AlertConfiguration;
  configuration: OrchestratorConfig;
  status: AgentStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgentInstance {
  agent_id: string;
  agent_type: AgentType;
  agent_name: string;
  agent_role: AgentRole;
  status: AgentStatus;
  capabilities: AgentCapability[];
  model_references: string[];
  input_types: DataInputType[];
  output_types: OutputFormat[];
  last_active: string;
  total_executions: number;
  success_rate: number;
  average_response_time_ms: number;
  error_count: number;
  current_task: string | null;
  queue_length: number;
  configuration: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface WorkflowDefinition {
  workflow_id: string;
  workflow_name: string;
  description: string;
  agent_sequence: string[];
  collaboration_mode: CollaborationMode;
  trigger_conditions: TriggerCondition[];
  steps: WorkflowStep[];
  error_handling: ErrorHandlingConfig;
  timeout_ms: number;
  retry_count: number;
  is_active: boolean;
  priority: number;
  metadata: Record<string, unknown>;
}

export interface TriggerCondition {
  condition_type: string;
  parameters: Record<string, unknown>;
  schedule: string | null;
  event_type: string | null;
}

export interface WorkflowStep {
  step_id: string;
  step_name: string;
  agent_id: string;
  input_mapping: Record<string, string>;
  output_mapping: Record<string, string>;
  timeout_ms: number;
  retry_on_failure: boolean;
  conditional: boolean;
  condition: string | null;
}

export interface ErrorHandlingConfig {
  strategy: string;
  max_retries: number;
  fallback_agent_id: string | null;
  alert_on_failure: boolean;
  rollback_enabled: boolean;
}

export interface ActiveWorkflow {
  workflow_id: string;
  execution_id: string;
  status: WorkflowStatus;
  started_at: string;
  current_step: string;
  progress_percentage: number;
  results: Record<string, unknown>;
  error: string | null;
  metadata: Record<string, unknown>;
}

export interface SystemIntegration {
  integration_id: string;
  integration_type: IntegrationType;
  system_name: string;
  api_endpoint: string;
  authentication_method: string;
  sync_frequency: string;
  last_sync: string;
  status: CollaborationStatus;
  data_mapping: Record<string, string>;
  error_count: number;
  metadata: Record<string, unknown>;
}

export interface ModelRegistry {
  model_id: string;
  model_name: string;
  model_type: ModelType;
  version: string;
  training_status: TrainingStatus;
  performance_metrics: Record<ModelPerformanceMetric, number>;
  feature_importance: Record<string, number>;
  training_data_size: number;
  last_trained: string;
  next_retrain: string;
  bias_detection: BiasDetectionResult[];
  explainability_score: number;
  metadata: Record<string, unknown>;
}

export interface BiasDetectionResult {
  bias_type: BiasType;
  detected: boolean;
  severity: RiskLevel;
  affected_groups: string[];
  mitigation_strategy: string;
}

export interface DataSourceConfig {
  source_id: string;
  source_name: string;
  source_type: DataInputType;
  connection_string: string;
  sync_frequency: string;
  last_sync: string;
  data_quality_status: DataQualityStatus;
  records_count: number;
  schema: Record<string, FeatureType>;
  metadata: Record<string, unknown>;
}

export interface CollaborationSettings {
  mode: CollaborationMode;
  conflict_resolution: string;
  consensus_threshold: number;
  communication_protocol: string;
  data_sharing_level: AccessLevel;
  latency_tolerance_ms: number;
  bandwidth_limit: number;
  metadata: Record<string, unknown>;
}

export interface OrchestratorConfig {
  max_concurrent_agents: number;
  default_timeout_ms: number;
  retry_policy: string;
  logging_level: string;
  monitoring_enabled: boolean;
  alerting_enabled: boolean;
  auto_scaling: boolean;
  load_balancing: string;
  cache_ttl_seconds: number;
  rate_limit_per_minute: number;
  metadata: Record<string, unknown>;
}

export interface OrchestratorMetrics {
  id: string;
  school_id: string;
  measurement_date: string;
  total_executions: number;
  successful_executions: number;
  failed_executions: number;
  average_execution_time_ms: number;
  p50_execution_time_ms: number;
  p95_execution_time_ms: number;
  p99_execution_time_ms: number;
  total_agents: number;
  active_agents: number;
  idle_agents: number;
  error_agents: number;
  total_workflows: number;
  active_workflows: number;
  total_integrations: number;
  active_integrations: number;
  total_data_points_processed: number;
  avg_data_quality_score: number;
  total_recommendations_generated: number;
  recommendation_accuracy: number;
  total_matches_made: number;
  match_quality_average: number;
  total_forecasts_generated: number;
  forecast_accuracy: number;
  total_alerts_generated: number;
  alerts_resolved: number;
  average_resolution_time_ms: number;
  system_uptime_percentage: number;
  resource_utilization: number;
  cost_per_execution: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AlertConfiguration {
  id: string;
  school_id: string;
  alert_name: string;
  condition: string;
  threshold: number;
  severity: AlertSeverity;
  notification_channels: NotificationChannel[];
  recipients: string[];
  cooldown_minutes: number;
  is_active: boolean;
  metadata: Record<string, unknown>;
}

export interface CareerAdvisorAgent {
  id: string;
  school_id: string;
  agent_type: AgentType.CAREER_ADVISOR;
  agent_name: string;
  status: AgentStatus;
  user_id: string;
  career_assessments: CareerAssessment[];
  career_recommendations: CareerRecommendation[];
  career_paths: CareerPathAnalysis[];
  mentorship_matches: MentorshipMatch[];
  goal_tracking: CareerGoalTracking[];
  skill_gap_analysis: CareerSkillGap[];
  market_insights: CareerMarketInsight[];
  action_plans: CareerActionPlan[];
  overall_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CareerAssessment {
  assessment_id: string;
  assessment_name: string;
  assessment_date: string;
  interests: InterestProfile[];
  personality: PersonalityProfile;
  values: ValueProfile[];
  strengths: string[];
  weaknesses: string[];
  recommended_careers: string[];
  confidence_score: number;
}

export interface InterestProfile {
  category: string;
  score: number;
  percentile: number;
}

export interface PersonalityProfile {
  dimensions: Record<string, number>;
  profile_type: string;
  description: string;
}

export interface ValueProfile {
  value: string;
  importance: number;
  alignment: string;
}

export interface CareerRecommendation {
  recommendation_id: string;
  career_path: string;
  match_score: number;
  required_skills: string[];
  gap_skills: string[];
  estimated_timeline: string;
  salary_range: string;
  growth_potential: number;
  market_demand: number;
  confidence: ConfidenceLevel;
}

export interface CareerPathAnalysis {
  path_id: string;
  current_role: string;
  target_role: string;
  steps: CareerPathStep[];
  total_duration_months: number;
  difficulty_score: number;
  success_probability: number;
  required_investments: string[];
}

export interface CareerPathStep {
  step_order: number;
  role: string;
  duration_months: number;
  required_skills: string[];
  required_experience: string;
  salary_range: string;
}

export interface MentorshipMatch {
  match_id: string;
  mentee_id: string;
  mentor_id: string;
  match_score: number;
  shared_interests: string[];
  mentorship_goals: string[];
  session_count: number;
  satisfaction_score: number;
  status: string;
}

export interface CareerGoalTracking {
  goal_id: string;
  goal_name: string;
  target_date: string;
  current_progress: number;
  milestones: string[];
  blockers: string[];
  status: string;
}

export interface CareerSkillGap {
  skill_name: string;
  current_level: number;
  target_level: number;
  gap_size: number;
  learning_resources: string[];
  estimated_time_to_close: string;
  priority: number;
}

export interface CareerMarketInsight {
  insight_id: string;
  industry: IndustrySector;
  trend: TrendDirection;
  description: string;
  impact_score: number;
  relevance_score: number;
  timeframe: TimeHorizon;
}

export interface CareerActionPlan {
  plan_id: string;
  plan_name: string;
  actions: ActionItem[];
  target_date: string;
  status: string;
  progress: number;
}

export interface ActionItem {
  action_id: string;
  description: string;
  deadline: string;
  status: string;
  dependencies: string[];
}

export interface SkillIntelligenceAgent {
  id: string;
  school_id: string;
  agent_type: AgentType.SKILL_INTELLIGENCE;
  agent_name: string;
  status: AgentStatus;
  skill_analyses: SkillAnalysis[];
  skill_trends: SkillTrend[];
  skill_forecasts: SkillForecast[];
  skill_recommendations: SkillRecommendation[];
  competency_mappings: CompetencyMapping[];
  skill_gap_reports: SkillGapReport[];
  market_skill_data: MarketSkillData[];
  overall_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SkillAnalysis {
  analysis_id: string;
  skill_name: string;
  skill_category: SkillCategory;
  current_demand: number;
  supply_level: number;
  gap_score: number;
  growth_rate: number;
  obsolescence_risk: RiskLevel;
  related_skills: string[];
  industries: IndustrySector[];
}

export interface SkillTrend {
  trend_id: string;
  skill_name: string;
  trend_direction: TrendDirection;
  trend_strength: number;
  time_period: string;
  data_points: TrendDataPoint[];
  confidence: ConfidenceLevel;
}

export interface TrendDataPoint {
  period: string;
  value: number;
}

export interface SkillForecast {
  forecast_id: string;
  skill_name: string;
  forecast_type: ForecastType;
  predicted_value: number;
  confidence_interval: [number, number];
  time_horizon: TimeHorizon;
  key_drivers: string[];
  risks: string[];
}

export interface SkillRecommendation {
  recommendation_id: string;
  skill_name: string;
  recommendation_type: RecommendationType;
  priority: number;
  learning_path: string[];
  estimated_duration: string;
  impact_score: number;
  confidence: ConfidenceLevel;
}

export interface CompetencyMapping {
  mapping_id: string;
  competency_name: string;
  skill_requirements: string[];
  proficiency_levels: Record<string, number>;
  assessment_methods: string[];
  industry_standard: string;
}

export interface SkillGapReport {
  report_id: string;
  organization_id: string;
  overall_gap_score: number;
  critical_gaps: string[];
  moderate_gaps: string[];
  minor_gaps: string[];
  closing_strategies: string[];
  investment_required: number;
  timeline_months: number;
}

export interface MarketSkillData {
  skill_name: string;
  job_postings_count: number;
  average_salary: number;
  salary_range: string;
  growth_rate: number;
  competition_level: string;
  top_employers: string[];
  geographic_demand: Record<string, number>;
}

export interface JobMatchingAgent {
  id: string;
  school_id: string;
  agent_type: AgentType.JOB_MATCHING;
  agent_name: string;
  status: AgentStatus;
  user_id: string;
  job_matches: JobMatch[];
  job_recommendations: JobRecommendation[];
  employer_matches: EmployerMatch[];
  match_analytics: MatchAnalytics;
  application_tracking: ApplicationTracking[];
  interview_scheduling: InterviewScheduling[];
  overall_match_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface JobMatch {
  match_id: string;
  job_id: string;
  job_title: string;
  employer: string;
  industry: IndustrySector;
  location: string;
  match_score: number;
  skill_match: number;
  experience_match: number;
  culture_match: number;
  salary_match: number;
  quality: MatchQuality;
  match_reasons: string[];
  gap_areas: string[];
}

export interface JobRecommendation {
  recommendation_id: string;
  job_id: string;
  job_title: string;
  employer: string;
  match_score: number;
  reason: string;
  required_actions: string[];
  application_deadline: string;
  estimated_salary: string;
  growth_potential: number;
}

export interface EmployerMatch {
  employer_id: string;
  employer_name: string;
  industry: IndustrySector;
  culture_fit_score: number;
  growth_opportunities: number;
  employee_satisfaction: number;
  training_investment: number;
  diversity_score: number;
  stability_score: number;
  overall_match: number;
}

export interface MatchAnalytics {
  total_matches: number;
  successful_matches: number;
  match_rate: number;
  average_match_score: number;
  average_time_to_match_days: number;
  employer_satisfaction: number;
  candidate_satisfaction: number;
  retention_rate: number;
}

export interface ApplicationTracking {
  application_id: string;
  job_id: string;
  status: string;
  applied_date: string;
  last_update: string;
  interview_dates: string[];
  feedback: string;
  outcome: string;
}

export interface InterviewScheduling {
  interview_id: string;
  employer_id: string;
  interview_type: string;
  scheduled_date: string;
  duration_minutes: number;
  location: string;
  interviewers: string[];
  preparation_checklist: string[];
  status: string;
}

export interface LearningAdvisorAgent {
  id: string;
  school_id: string;
  agent_type: AgentType.LEARNING_ADVISOR;
  agent_name: string;
  status: AgentStatus;
  user_id: string;
  learning_paths: LearningPath[];
  course_recommendations: CourseRecommendation[];
  learning_analytics: LearningAnalytics;
  skill_development_plans: SkillDevelopmentPlan[];
  certification_guidance: CertificationGuidance[];
  learning_style_assessment: LearningStyleAssessment;
  progress_tracking: LearningProgressTracking[];
  overall_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface LearningPath {
  path_id: string;
  path_name: string;
  description: string;
  target_skill: string;
  courses: CourseModule[];
  estimated_duration_hours: number;
  difficulty_level: string;
  prerequisites: string[];
  outcomes: LearningOutcome[];
  progress_percentage: number;
  status: string;
}

export interface CourseModule {
  module_id: string;
  module_name: string;
  provider: string;
  duration_hours: number;
  difficulty: string;
  rating: number;
  completion_rate: number;
  skills_covered: string[];
}

export interface CourseRecommendation {
  recommendation_id: string;
  course_name: string;
  provider: string;
  platform: string;
  match_score: number;
  reason: string;
  skills_gained: string[];
  duration_hours: number;
  cost: number;
  currency: string;
  rating: number;
  enrollment_url: string;
}

export interface LearningAnalytics {
  total_learning_hours: number;
  courses_completed: number;
  courses_in_progress: number;
  average_completion_rate: number;
  skills_acquired: number;
  certifications_earned: number;
  learning_streak_days: number;
  peak_learning_time: string;
  preferred_content_type: string;
  engagement_score: number;
}

export interface SkillDevelopmentPlan {
  plan_id: string;
  skill_name: string;
  current_level: number;
  target_level: number;
  development_activities: string[];
  timeline_weeks: number;
  milestones: string[];
  resources: string[];
  progress: number;
}

export interface CertificationGuidance {
  certification_id: string;
  certification_name: string;
  issuing_body: string;
  relevance_score: number;
  preparation_time: string;
  cost: number;
  currency: string;
  prerequisites: string[];
  career_impact: string;
  pass_rate: number;
}

export interface LearningStyleAssessment {
  primary_style: string;
  secondary_style: string;
  visual_score: number;
  auditory_score: number;
  kinesthetic_score: number;
  reading_writing_score: number;
  social_preference: string;
  time_preference: string;
}

export interface LearningProgressTracking {
  course_id: string;
  course_name: string;
  progress_percentage: number;
  last_activity: string;
  time_spent_hours: number;
  quiz_scores: number[];
  assignments_completed: number;
  total_assignments: number;
  status: string;
}

export interface WorkforceAnalystAgent {
  id: string;
  school_id: string;
  agent_type: AgentType.WORKFORCE_ANALYST;
  agent_name: string;
  status: AgentStatus;
  workforce_analyses: WorkforceAnalysis[];
  talent_pool_analyses: TalentPoolAnalysis[];
  skills_gap_analyses: WorkforceSkillGap[];
  succession_plans: SuccessionPlan[];
  diversity_analytics: DiversityAnalytics;
  retention_analytics: RetentionAnalytics;
  productivity_analytics: ProductivityAnalytics;
  workforce_forecasts: WorkforceForecast[];
  overall_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface WorkforceAnalysis {
  analysis_id: string;
  analysis_name: string;
  period: string;
  headcount: number;
  turnover_rate: number;
  hiring_rate: number;
  internal_mobility_rate: number;
  cost_per_hire: number;
  time_to_fill_days: number;
  time_to_productivity_days: number;
  engagement_score: number;
  satisfaction_score: number;
  diversity_index: number;
  skills_coverage: number;
}

export interface TalentPoolAnalysis {
  pool_id: string;
  pool_type: TalentPoolType;
  total_candidates: number;
  active_candidates: number;
  qualified_candidates: number;
  skill_distribution: Record<string, number>;
  experience_distribution: Record<string, number>;
  geographic_distribution: Record<string, number>;
  availability_timeline: string;
  avg_quality_score: number;
}

export interface WorkforceSkillGap {
  analysis_id: string;
  organization_id: string;
  overall_gap_score: number;
  critical_skills_gap: string[];
  emerging_skills_gap: string[];
  closing_cost_estimate: number;
  closing_timeline_months: number;
  impact_on_productivity: number;
  risk_level: RiskLevel;
}

export interface SuccessionPlan {
  plan_id: string;
  position: string;
  current_holder: string;
  readiness_level: string;
  potential_successors: SuccessorCandidate[];
  gap_areas: string[];
  development_actions: string[];
  timeline_months: number;
}

export interface SuccessorCandidate {
  candidate_id: string;
  candidate_name: string;
  readiness_score: number;
  strengths: string[];
  development_areas: string[];
  estimated_readiness_months: number;
}

export interface DiversityAnalytics {
  gender_distribution: Record<string, number>;
  age_distribution: Record<string, number>;
  ethnicity_distribution: Record<string, number>;
  disability_distribution: Record<string, number>;
  overall_diversity_index: number;
  inclusion_score: number;
  equity_score: number;
  representation_by_level: Record<string, Record<string, number>>;
}

export interface RetentionAnalytics {
  overall_retention_rate: number;
  voluntary_turnover_rate: number;
  involuntary_turnover_rate: number;
  regrettable_turnover_rate: number;
  avg_tenure_years: number;
  retention_by_department: Record<string, number>;
  retention_by_tenure: Record<string, number>;
  flight_risk_factors: string[];
  retention_cost: number;
}

export interface ProductivityAnalytics {
  overall_productivity_score: number;
  productivity_by_department: Record<string, number>;
  productivity_by_role: Record<string, number>;
  output_per_employee: number;
  efficiency_ratio: number;
  utilization_rate: number;
  idle_time_percentage: number;
  overtime_hours_avg: number;
  quality_score: number;
}

export interface WorkforceForecast {
  forecast_id: string;
  forecast_type: ForecastType;
  horizon: WorkforceForecastHorizon;
  predicted_headcount: number;
  predicted_turnover_rate: number;
  predicted_hiring_needs: number;
  predicted_skills_demand: Record<string, number>;
  predicted_cost_per_hire: number;
  confidence_level: ConfidenceLevel;
  scenario: string;
  key_assumptions: string[];
  risk_factors: string[];
}

export interface RecruitmentAgent {
  id: string;
  school_id: string;
  agent_type: AgentType.RECRUITMENT;
  agent_name: string;
  status: AgentStatus;
  job_postings: JobPosting[];
  candidate_pipelines: CandidatePipeline[];
  screening_results: ScreeningResult[];
  interview_plans: InterviewPlan[];
  offer_management: OfferManagement[];
  recruitment_analytics: RecruitmentAnalytics;
  overall_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface JobPosting {
  posting_id: string;
  title: string;
  department: string;
  location: string;
  industry: IndustrySector;
  required_skills: string[];
  preferred_skills: string[];
  experience_years_min: number;
  experience_years_max: number;
  education_level: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  employment_type: string;
  remote_option: boolean;
  status: string;
  applications_count: number;
  posting_date: string;
  closing_date: string;
}

export interface CandidatePipeline {
  pipeline_id: string;
  job_id: string;
  stage: RecruitmentStage;
  candidates: CandidateRecord[];
  total_candidates: number;
  stage_conversion_rate: number;
  avg_time_in_stage_days: number;
}

export interface CandidateRecord {
  candidate_id: string;
  name: string;
  email: string;
  source: string;
  match_score: number;
  skills: string[];
  experience_years: number;
  education_level: string;
  status: string;
  applied_date: string;
}

export interface ScreeningResult {
  screening_id: string;
  candidate_id: string;
  job_id: string;
  overall_score: number;
  skill_match_score: number;
  experience_match_score: number;
  education_match_score: number;
  cultural_fit_score: number;
  recommendation: string;
  notes: string;
  automated: boolean;
}

export interface InterviewPlan {
  plan_id: string;
  candidate_id: string;
  job_id: string;
  interview_rounds: InterviewRound[];
  total_rounds: number;
  current_round: number;
  overall_status: string;
}

export interface InterviewRound {
  round_number: number;
  round_type: string;
  interviewer: string;
  scheduled_date: string;
  duration_minutes: number;
  score: number | null;
  feedback: string | null;
  status: string;
}

export interface OfferManagement {
  offer_id: string;
  candidate_id: string;
  job_id: string;
  offered_salary: number;
  currency: string;
  benefits: string[];
  start_date: string;
  offer_status: string;
  sent_date: string;
  response_date: string | null;
  expiration_date: string;
}

export interface RecruitmentAnalytics {
  total_postings: number;
  total_applications: number;
  avg_time_to_fill_days: number;
  avg_cost_per_hire: number;
  source_effectiveness: Record<string, number>;
  conversion_rates: Record<RecruitmentStage, number>;
  quality_of_hire_score: number;
  hiring_manager_satisfaction: number;
}

export interface TalentAgent {
  id: string;
  school_id: string;
  agent_type: AgentType.TALENT;
  agent_name: string;
  status: AgentStatus;
  talent_profiles: TalentProfile[];
  talent_pools: TalentPoolData[];
  performance_reviews: PerformanceReview[];
  development_plans: DevelopmentPlan[];
  succession_candidates: SuccessionCandidate[];
  talent_analytics: TalentAnalytics;
  overall_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TalentProfile {
  profile_id: string;
  user_id: string;
  name: string;
  role: string;
  department: string;
  tenure_years: number;
  performance_rating: number;
  potential_rating: number;
  skills: string[];
  aspirations: string[];
  flight_risk: RiskLevel;
  readiness_for_promotion: number;
  compensation_competitiveness: number;
}

export interface TalentPoolData {
  pool_id: string;
  pool_name: string;
  criteria: Record<string, unknown>;
  member_count: number;
  avg_quality_score: number;
  last_updated: string;
}

export interface PerformanceReview {
  review_id: string;
  user_id: string;
  review_period: string;
  overall_rating: number;
  goal_achievement: number;
  competency_scores: Record<string, number>;
  strengths: string[];
  improvement_areas: string[];
  reviewer_comments: string;
  self_assessment: string;
  development_recommendations: string[];
}

export interface DevelopmentPlan {
  plan_id: string;
  user_id: string;
  plan_name: string;
  objectives: DevelopmentObjective[];
  timeline_months: number;
  budget: number;
  currency: string;
  mentor: string;
  status: string;
  progress: number;
}

export interface DevelopmentObjective {
  objective_id: string;
  description: string;
  target_date: string;
  activities: string[];
  success_criteria: string;
  status: string;
  progress: number;
}

export interface SuccessionCandidate {
  candidate_id: string;
  position: string;
  readiness_level: string;
  potential_score: number;
  development_gaps: string[];
  estimated_readiness_months: number;
}

export interface TalentAnalytics {
  total_employees: number;
  high_performers: number;
  high_potentials: number;
  engagement_score: number;
  internal_hire_rate: number;
  promotion_rate: number;
  average_performance_rating: number;
  talent_density_by_department: Record<string, number>;
}

export interface TrainingAgent {
  id: string;
  school_id: string;
  agent_type: AgentType.TRAINING;
  agent_name: string;
  status: AgentStatus;
  training_programs: TrainingProgram[];
  training_assignments: TrainingAssignment[];
  training_analytics: TrainingAnalytics;
  competency_assessments: CompetencyAssessment[];
  certification_tracking: CertificationTracking[];
  learning_outcomes: LearningOutcomeRecord[];
  overall_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TrainingProgram {
  program_id: string;
  program_name: string;
  description: string;
  training_format: TrainingFormat;
  duration_hours: number;
  max_participants: number;
  current_participants: number;
  required_skills: string[];
  learning_objectives: string[];
  assessment_methods: string[];
  cost: number;
  currency: string;
  provider: string;
  status: string;
  avg_completion_rate: number;
  avg_satisfaction_score: number;
}

export interface TrainingAssignment {
  assignment_id: string;
  user_id: string;
  program_id: string;
  assigned_date: string;
  due_date: string;
  status: string;
  progress_percentage: number;
  completion_date: string | null;
  score: number | null;
  feedback: string;
}

export interface TrainingAnalytics {
  total_programs: number;
  total_participants: number;
  total_training_hours: number;
  avg_completion_rate: number;
  avg_satisfaction_score: number;
  training_effectiveness_score: number;
  cost_per_participant: number;
  roi_percentage: number;
  skills_improvement_rate: number;
}

export interface CompetencyAssessment {
  assessment_id: string;
  user_id: string;
  competency_name: string;
  current_level: number;
  target_level: number;
  assessment_date: string;
  assessor: string;
  evidence: string[];
  improvement_areas: string[];
  development_actions: string[];
}

export interface CertificationTracking {
  tracking_id: string;
  user_id: string;
  certification_name: string;
  issuing_body: string;
  obtained_date: string;
  expiration_date: string | null;
  status: CredentialVerificationStatus;
  renewal_required: boolean;
  renewal_date: string | null;
  skills_validated: string[];
}

export interface LearningOutcomeRecord {
  record_id: string;
  user_id: string;
  program_id: string;
  outcome_type: LearningOutcome;
  achieved_date: string;
  evidence: string;
  impact_score: number;
  verified: boolean;
}

export interface CredentialAgent {
  id: string;
  school_id: string;
  agent_type: AgentType.CREDENTIAL;
  agent_name: string;
  status: AgentStatus;
  credential_verifications: CredentialVerification[];
  credential_recommendations: CredentialRecommendation[];
  credential_analytics: CredentialAnalytics;
  blockchain_credentials: BlockchainCredential[];
  digital_badges: DigitalBadge[];
  overall_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CredentialVerification {
  verification_id: string;
  credential_id: string;
  credential_name: string;
  holder_id: string;
  issuing_organization: string;
  verification_status: CredentialVerificationStatus;
  verification_date: string;
  verification_method: string;
  blockchain_hash: string | null;
  expiry_date: string | null;
  skills_validated: string[];
}

export interface CredentialRecommendation {
  recommendation_id: string;
  user_id: string;
  credential_name: string;
  issuing_body: string;
  relevance_score: number;
  career_impact: string;
  prerequisites: string[];
  estimated_preparation_time: string;
  cost: number;
  currency: string;
  market_value: number;
}

export interface CredentialAnalytics {
  total_credentials_verified: number;
  verification_success_rate: number;
  avg_verification_time_ms: number;
  fraud_detection_rate: number;
  credentials_by_type: Record<string, number>;
  expiring_soon_count: number;
  renewal_rate: number;
}

export interface BlockchainCredential {
  credential_id: string;
  blockchain_network: string;
  transaction_hash: string;
  block_number: number;
  issuer_address: string;
  holder_address: string;
  credential_data: Record<string, unknown>;
  issued_at: string;
  revoked: boolean;
}

export interface DigitalBadge {
  badge_id: string;
  badge_name: string;
  description: string;
  issuer: string;
  criteria: string[];
  skill_tags: string[];
  level: string;
  awarded_date: string;
  image_url: string;
  verification_url: string;
}

export interface LaborMarketAgent {
  id: string;
  school_id: string;
  agent_type: AgentType.LABOR_MARKET;
  agent_name: string;
  status: AgentStatus;
  market_analyses: LaborMarketAnalysis[];
  industry_trends: IndustryTrend[];
  salary_benchmarks: SalaryBenchmark[];
  skill_demand_data: SkillDemandData[];
  geographic_insights: GeographicInsight[];
  market_forecasts: LaborMarketForecast[];
  overall_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface LaborMarketAnalysis {
  analysis_id: string;
  analysis_name: string;
  region: string;
  industry: IndustrySector;
  indicators: LaborMarketIndicatorData[];
  overall_health_score: number;
  growth_outlook: TrendDirection;
  key_findings: string[];
  analysis_date: string;
}

export interface LaborMarketIndicatorData {
  indicator: LaborMarketIndicator;
  current_value: number;
  previous_value: number;
  change_percentage: number;
  trend: TrendDirection;
  benchmark: number;
}

export interface IndustryTrend {
  trend_id: string;
  industry: IndustrySector;
  trend_name: string;
  description: string;
  impact_level: string;
  timeframe: TimeHorizon;
  affected_roles: string[];
  required_skills: string[];
  confidence: ConfidenceLevel;
}

export interface SalaryBenchmark {
  benchmark_id: string;
  role: string;
  industry: IndustrySector;
  region: string;
  salary_p10: number;
  salary_p25: number;
  salary_p50: number;
  salary_p75: number;
  salary_p90: number;
  currency: string;
  total_compensation: number;
  data_points: number;
  last_updated: string;
}

export interface SkillDemandData {
  skill_name: string;
  demand_score: number;
  growth_rate: number;
  supply_ratio: number;
  avg_salary_premium: number;
  top_industries: IndustrySector[];
  top_roles: string[];
  geographic_hotspots: string[];
  trend: TrendDirection;
  forecast: ConfidenceLevel;
}

export interface GeographicInsight {
  region: string;
  country: string;
  unemployment_rate: number;
  labor_participation_rate: number;
  avg_salary: number;
  salary_currency: string;
  growth_rate: number;
  top_industries: IndustrySector[];
  in_demand_skills: string[];
  migration_trend: string;
}

export interface LaborMarketForecast {
  forecast_id: string;
  forecast_type: ForecastType;
  horizon: WorkforceForecastHorizon;
  region: string;
  industry: IndustrySector;
  predicted_values: Record<string, number>;
  confidence_level: ConfidenceLevel;
  key_drivers: string[];
  risks: string[];
  recommendations: string[];
}

export interface EducationToEmploymentAgent {
  id: string;
  school_id: string;
  agent_type: AgentType.EDUCATION_TO_EMPLOYMENT;
  agent_name: string;
  status: AgentStatus;
  graduate_analyses: GraduateAnalysis[];
  program_effectiveness: ProgramEffectiveness[];
  curriculum_alignments: CurriculumAlignment[];
  employer_partnerships: EmployerPartnership[];
  placement_analytics: PlacementAnalytics;
  employability_scores: EmployabilityScore[];
  overall_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GraduateAnalysis {
  analysis_id: string;
  cohort_year: number;
  total_graduates: number;
  employment_rate: number;
  avg_time_to_employment_days: number;
  avg_starting_salary: number;
  salary_currency: string;
  field_related_employment: number;
  further_education_rate: number;
  entrepreneurship_rate: number;
  employer_satisfaction: number;
  top_industries: IndustrySector[];
  top_employers: string[];
}

export interface ProgramEffectiveness {
  program_id: string;
  program_name: string;
  employment_rate: number;
  avg_salary: number;
  employer_satisfaction: number;
  curriculum_relevance: number;
  skill_alignment: number;
  roi_score: number;
  benchmark_comparison: number;
  improvement_areas: string[];
}

export interface CurriculumAlignment {
  alignment_id: string;
  program_id: string;
  industry: IndustrySector;
  alignment_score: number;
  skill_coverage: Record<string, number>;
  gap_areas: string[];
  recommended_updates: string[];
  employer_feedback_score: number;
  last_reviewed: string;
}

export interface EmployerPartnership {
  partnership_id: string;
  employer_name: string;
  industry: IndustrySector;
  partnership_type: string;
  hires_count: number;
  internship_count: number;
  satisfaction_score: number;
  collaboration_level: string;
  investment_amount: number;
  currency: string;
}

export interface PlacementAnalytics {
  total_placements: number;
  placement_rate: number;
  avg_salary: number;
  median_salary: number;
  retention_rate_12_months: number;
  employer_rehire_rate: number;
  satisfaction_score: number;
  placements_by_industry: Record<string, number>;
  placements_by_region: Record<string, number>;
}

export interface EmployabilityScore {
  score_id: string;
  user_id: string;
  overall_score: number;
  skills_score: number;
  experience_score: number;
  education_score: number;
  network_score: number;
  market_alignment: number;
  improvement_areas: string[];
  recommendations: string[];
  assessment_date: string;
}

export interface WorkforceForecastAgent {
  id: string;
  school_id: string;
  agent_type: AgentType.WORKFORCE_FORECAST;
  agent_name: string;
  status: AgentStatus;
  workforce_projections: WorkforceProjection[];
  talent_gap_forecasts: TalentGapForecast[];
  scenario_models: ScenarioModel[];
  strategic_recommendations: StrategicRecommendation[];
  forecast_analytics: ForecastAnalytics;
  overall_score: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface WorkforceProjection {
  projection_id: string;
  projection_name: string;
  horizon: WorkforceForecastHorizon;
  projected_headcount: number;
  projected_departments: Record<string, number>;
  projected_roles: Record<string, number>;
  growth_areas: string[];
  reduction_areas: string[];
  hiring_budget: number;
  currency: string;
  confidence_level: ConfidenceLevel;
}

export interface TalentGapForecast {
  forecast_id: string;
  skill_name: string;
  current_supply: number;
  projected_demand: number;
  gap_size: number;
  gap_trend: TrendDirection;
  criticality: RiskLevel;
  mitigation_strategies: string[];
  investment_required: number;
  timeline_months: number;
}

export interface ScenarioModel {
  scenario_id: string;
  scenario_name: string;
  description: string;
  assumptions: string[];
  projected_outcomes: Record<string, number>;
  probability: number;
  impact_level: string;
  risk_factors: string[];
  recommended_actions: string[];
}

export interface StrategicRecommendation {
  recommendation_id: string;
  category: string;
  title: string;
  description: string;
  priority: string;
  expected_impact: string;
  estimated_cost: number;
  currency: string;
  timeline_months: number;
  success_metrics: string[];
}

export interface ForecastAnalytics {
  total_forecasts: number;
  avg_confidence_level: number;
  forecast_accuracy: number;
  models_active: number;
  data_sources_used: number;
  last_refresh: string;
  scenarios_modeled: number;
  recommendations_generated: number;
}

export interface AgentCollaboration {
  id: string;
  school_id: string;
  collaboration_name: string;
  agents: string[];
  mode: CollaborationMode;
  status: CollaborationStatus;
  trigger_event: string;
  shared_context: Record<string, unknown>;
  results: Record<string, unknown>;
  started_at: string;
  completed_at: string | null;
  duration_ms: number | null;
  success: boolean;
  error: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface AgentPerformanceLog {
  id: string;
  school_id: string;
  agent_id: string;
  agent_type: AgentType;
  execution_id: string;
  action: string;
  input_data: Record<string, unknown>;
  output_data: Record<string, unknown>;
  duration_ms: number;
  success: boolean;
  error_message: string | null;
  confidence_score: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface OrchestratorAuditLog {
  id: string;
  school_id: string;
  user_id: string;
  action: AuditAction;
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
