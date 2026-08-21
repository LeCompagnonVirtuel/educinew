export enum CareerStage {
  EXPLORATION = "EXPLORATION",
  ESTABLISHMENT = "ESTABLISHMENT",
  MAINTENANCE = "MAINTENANCE",
  DECLINE = "DECLINE",
  TRANSITION = "TRANSITION",
  GROWTH = "GROWTH",
  LEADERSHIP = "LEADERSHIP",
  EXECUTIVE = "EXECUTIVE",
  RETIREMENT = "RETIREMENT",
}

export enum GoalStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  ACHIEVED = "ACHIEVED",
  PARTIALLY_ACHIEVED = "PARTIALLY_ACHIEVED",
  ABANDONED = "ABANDONED",
  ON_HOLD = "ON_HOLD",
  EXPIRED = "EXPIRED",
}

export enum RecommendationType {
  JOB = "JOB",
  COURSE = "COURSE",
  CERTIFICATION = "CERTIFICATION",
  SKILL = "SKILL",
  MENTOR = "MENTOR",
  NETWORK = "NETWORK",
  CAREER_PATH = "CAREER_PATH",
  RESKILLING = "RESKILLING",
  UPSKILLING = "UPSKILLING",
  TRANSITION = "TRANSITION",
}

export enum ForecastModel {
  LINEAR = "LINEAR",
  POLYNOMIAL = "POLYNOMIAL",
  NEURAL_NETWORK = "NEURAL_NETWORK",
  ENSEMBLE = "ENSEMBLE",
  TIME_SERIES = "TIME_SERIES",
  REGRESSION = "REGRESSION",
}

export enum TransitionType {
  INDUSTRY = "INDUSTRY",
  ROLE = "ROLE",
  LEVEL = "LEVEL",
  FUNCTION = "FUNCTION",
  GEOGRAPHIC = "GEOGRAPHIC",
  ENTREPRENEURIAL = "ENTREPRENEURIAL",
}

export enum SimulationType {
  MONTE_CARLO = "MONTE_CARLO",
  SCENARIO = "SCENARIO",
  WHAT_IF = "WHAT_IF",
  SENSITIVITY = "SENSITIVITY",
  AGENT_BASED = "AGENT_BASED",
}

export enum ReadinessLevel {
  NOT_READY = "NOT_READY",
  PARTIALLY_READY = "PARTIALLY_READY",
  READY = "READY",
  HIGHLY_READY = "HIGHLY_READY",
  EXCEPTIONALLY_READY = "EXCEPTIONALLY_READY",
}

export enum RiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
  CRITICAL = "CRITICAL",
}

export enum OpportunityType {
  JOB = "JOB",
  PROMOTION = "PROMOTION",
  TRAINING = "TRAINING",
  MENTORSHIP = "MENTORSHIP",
  PROJECT = "PROJECT",
  TRANSFER = "TRANSFER",
  ENTREPRENEURIAL = "ENTREPRENEURIAL",
}

export enum PredictionModel {
  DECISION_TREE = "DECISION_TREE",
  RANDOM_FOREST = "RANDOM_FOREST",
  GRADIENT_BOOSTING = "GRADIENT_BOOSTING",
  NEURAL_NETWORK = "NEURAL_NETWORK",
  SVM = "SVM",
  ENSEMBLE = "ENSEMBLE",
}

export enum SkillGapPriority {
  IMMEDIATE = "IMMEDIATE",
  SHORT_TERM = "SHORT_TERM",
  MEDIUM_TERM = "MEDIUM_TERM",
  LONG_TERM = "LONG_TERM",
}

export enum LearningRecommendationType {
  COURSE = "COURSE",
  CERTIFICATION = "CERTIFICATION",
  WORKSHOP = "WORKSHOP",
  MENTORSHIP = "MENTORSHIP",
  SELF_STUDY = "SELF_STUDY",
  ON_JOB = "ON_JOB",
}

export enum CareerGoalType {
  SHORT_TERM = "SHORT_TERM",
  MEDIUM_TERM = "MEDIUM_TERM",
  LONG_TERM = "LONG_TERM",
  ASPIRATIONAL = "ASPIRATIONAL",
}

export enum CareerPathType {
  LINEAR = "LINEAR",
  NON_LINEAR = "NON_LINEAR",
  LATERAL = "LATERAL",
  PORTFOLIO = "PORTFOLIO",
  ENTREPRENEURIAL = "ENTREPRENEURIAL",
}

export enum EmployabilityScoreComponent {
  SKILLS = "SKILLS",
  EXPERIENCE = "EXPERIENCE",
  EDUCATION = "EDUCATION",
  CERTIFICATIONS = "CERTIFICATIONS",
  NETWORK = "NETWORK",
  MARKET_DEMAND = "MARKET_DEMAND",
}

export enum CareerRiskType {
  SKILL_OBSCOLESCENCE = "SKILL_OBSCOLESCENCE",
  MARKET_DECLINE = "MARKET_DECLINE",
  AUTOMATION = "AUTOMATION",
  OUTSOURCING = "OUTSOURCING",
  ECONOMIC = "ECONOMIC",
  HEALTH = "HEALTH",
}

export enum MarketDemandIndicator {
  HIGH = "HIGH",
  MODERATE = "MODERATE",
  LOW = "LOW",
  DECLINING = "DECLINING",
  GROWING = "GROWING",
}

export enum SalaryRange {
  BELOW_MARKET = "BELOW_MARKET",
  AT_MARKET = "AT_MARKET",
  ABOVE_MARKET = "ABOVE_MARKET",
  COMPETITIVE = "COMPETITIVE",
  PREMIUM = "PREMIUM",
}

export enum CareerPredictionType {
  JOB_PROSPECTS = "JOB_PROSPECTS",
  SALARY_GROWTH = "SALARY_GROWTH",
  SKILL_DEMAND = "SKILL_DEMAND",
  CAREER_PROGRESSION = "CAREER_PROGRESSION",
  MARKET_TREND = "MARKET_TREND",
}

export enum SkillGapSeverity {
  MINOR = "MINOR",
  MODERATE = "MODERATE",
  SIGNIFICANT = "SIGNIFICANT",
  CRITICAL = "CRITICAL",
}

export enum CareerReadinessFactor {
  SKILLS = "SKILLS",
  EXPERIENCE = "EXPERIENCE",
  EDUCATION = "EDUCATION",
  NETWORKING = "NETWORKING",
  PERSONAL_BRAND = "PERSONAL_BRAND",
  FINANCIAL = "FINANCIAL",
}

export enum OpportunityMatchLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
  EXCELLENT = "EXCELLENT",
}

export enum CareerTransitionReadiness {
  NOT_READY = "NOT_READY",
  PREPARING = "PREPARING",
  READY = "READY",
  IN_TRANSITION = "IN_TRANSITION",
  COMPLETED = "COMPLETED",
}

export enum ForecastTimeframe {
  SHORT_TERM = "SHORT_TERM",
  MEDIUM_TERM = "MEDIUM_TERM",
  LONG_TERM = "LONG_TERM",
  CUSTOM = "CUSTOM",
}

export enum PredictionConfidence {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum CareerRecommendationPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum LearningFormat {
  ONLINE = "ONLINE",
  IN_PERSON = "IN_PERSON",
  HYBRID = "HYBRID",
  SELF_PACED = "SELF_PACED",
  INSTRUCTOR_LED = "INSTRUCTOR_LED",
}

export enum CareerMilestoneType {
  PROMOTION = "PROMOTION",
  CERTIFICATION = "CERTIFICATION",
  SKILL_ACQUISITION = "SKILL_ACQUISITION",
  PROJECT_COMPLETION = "PROJECT_COMPLETION",
  NETWORK_EXPANSION = "NETWORK_EXPANSION",
  SALARY_INCREASE = "SALARY_INCREASE",
}

export enum CareerPlanStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  ON_HOLD = "ON_HOLD",
  REVISED = "REVISED",
}

export enum SkillDevelopmentPriority {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export enum MarketTrendDirection {
  UPWARD = "UPWARD",
  DOWNWARD = "DOWNWARD",
  STABLE = "STABLE",
  VOLATILE = "VOLATILE",
}

export enum CareerSimulationScenario {
  BEST_CASE = "BEST_CASE",
  WORST_CASE = "WORST_CASE",
  MOST_LIKELY = "MOST_LIKELY",
  CUSTOM = "CUSTOM",
}

export enum EmployabilityFactor {
  HARD_SKILLS = "HARD_SKILLS",
  SOFT_SKILLS = "SOFT_SKILLS",
  EXPERIENCE = "EXPERIENCE",
  EDUCATION = "EDUCATION",
  NETWORK = "NETWORK",
  REPUTATION = "REPUTATION",
}

export enum CareerRiskProbability {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum CareerRiskImpact {
  MINOR = "MINOR",
  MODERATE = "MODERATE",
  SIGNIFICANT = "SIGNIFICANT",
  SEVERE = "SEVERE",
  CATASTROPHIC = "CATASTROPHIC",
}

export enum OpportunitySource {
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL",
  AI_SOURCED = "AI_SOURCED",
  REFERRAL = "REFERRAL",
  DIRECT = "DIRECT",
}

export enum SalaryCurrency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  XOF = "XOF",
  XAF = "XAF",
  NGN = "NGN",
  GHS = "GHS",
  KES = "KES",
  ZAR = "ZAR",
  EGP = "EGP",
}

export enum CareerProgressMetric {
  SKILL_GROWTH = "SKILL_GROWTH",
  EXPERIENCE_GROWTH = "EXPERIENCE_GROWTH",
  SALARY_GROWTH = "SALARY_GROWTH",
  RESPONSIBILITY_GROWTH = "RESPONSIBILITY_GROWTH",
  NETWORK_GROWTH = "NETWORK_GROWTH",
}

export enum SkillDemandForecast {
  INCREASING = "INCREASING",
  DECREASING = "DECREASING",
  STABLE = "STABLE",
  EMERGING = "EMERGING",
  DECLINING = "DECLINING",
}

export enum CareerAlignmentLevel {
  MISALIGNED = "MISALIGNED",
  PARTIALLY_ALIGNED = "PARTIALLY_ALIGNED",
  ALIGNED = "ALIGNED",
  STRONGLY_ALIGNED = "STRONGLY_ALIGNED",
  PERFECTLY_ALIGNED = "PERFECTLY_ALIGNED",
}

export enum LearningOutcomeType {
  KNOWLEDGE = "KNOWLEDGE",
  SKILL = "SKILL",
  COMPETENCY = "COMPETENCY",
  BEHAVIOR = "BEHAVIOR",
}

export enum CareerAssessmentType {
  SELF = "SELF",
  PEER = "PEER",
  AI = "AI",
  FORMAL = "FORMAL",
  INFORMAL = "INFORMAL",
}

export enum SalaryBenchmarkType {
  INDUSTRY = "INDUSTRY",
  ROLE = "ROLE",
  GEOGRAPHIC = "GEOGRAPHIC",
  EXPERIENCE = "EXPERIENCE",
  COMPANY_SIZE = "COMPANY_SIZE",
}

export enum CareerGoalPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum SkillGapTimeframe {
  IMMEDIATE = "IMMEDIATE",
  SHORT_TERM = "SHORT_TERM",
  MEDIUM_TERM = "MEDIUM_TERM",
  LONG_TERM = "LONG_TERM",
}

export enum CareerPathFlexibility {
  RIGID = "RIGID",
  FLEXIBLE = "FLEXIBLE",
  ADAPTIVE = "ADAPTIVE",
}

export enum JobMatchConfidence {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum CareerOpportunityTiming {
  NOW = "NOW",
  SOON = "SOON",
  FUTURE = "FUTURE",
  LONG_TERM = "LONG_TERM",
}

export enum MarketConditionType {
  FAVORABLE = "FAVORABLE",
  NEUTRAL = "NEUTRAL",
  UNFAVORABLE = "UNFAVORABLE",
  CRISIS = "CRISIS",
}

export enum CareerRiskMitigation {
  AVOIDANCE = "AVOIDANCE",
  REDUCTION = "REDUCTION",
  TRANSFER = "TRANSFER",
  ACCEPTANCE = "ACCEPTANCE",
}

export enum LearningProgressStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ON_HOLD = "ON_HOLD",
}

export enum CareerInsightType {
  TREND = "TREND",
  RECOMMENDATION = "RECOMMENDATION",
  ALERT = "ALERT",
  OPPORTUNITY = "OPPORTUNITY",
  RISK = "RISK",
}

export enum ForecastAccuracy {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum CareerSimulationOutcome {
  POSITIVE = "POSITIVE",
  NEUTRAL = "NEUTRAL",
  NEGATIVE = "NEGATIVE",
  MIXED = "MIXED",
}

export enum EmployabilityTrend {
  IMPROVING = "IMPROVING",
  STABLE = "STABLE",
  DECLINING = "DECLINING",
}

export enum SkillGapStakeholder {
  INDIVIDUAL = "INDIVIDUAL",
  EMPLOYER = "EMPLOYER",
  EDUCATOR = "EDUCATOR",
  GOVERNMENT = "GOVERNMENT",
}

export enum CareerRecommendationSource {
  AI = "AI",
  MENTOR = "MENTOR",
  PEER = "PEER",
  SELF = "SELF",
  PLATFORM = "PLATFORM",
}

export interface CareerProfile {
  id: string;
  personId: string;
  firstName: string;
  lastName: string;
  email: string;
  currentRole: string;
  currentIndustry: string;
  yearsOfExperience: number;
  skills: CareerSkill[];
  certifications: CareerCertification[];
  education: CareerEducation[];
  experience: CareerExperience[];
  goals: CareerGoal[];
  paths: CareerPath[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CareerProfileMetadata;
}

export interface CareerSkill {
  name: string;
  level: string;
  yearsOfExperience: number;
  lastUsed: string;
  demandLevel: string;
}

export interface CareerCertification {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialId: string | null;
}

export interface CareerEducation {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: number | null;
}

export interface CareerExperience {
  company: string;
  title: string;
  industry: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  achievements: string[];
  skills: string[];
}

export interface CareerProfileMetadata {
  totalExperience: number;
  averageTenure: number;
  industries: string[];
  lastUpdated: string;
}

export interface CareerPath {
  id: string;
  name: string;
  description: string;
  type: CareerPathType;
  currentStage: CareerStage;
  stages: CareerPathStage[];
  flexibility: CareerPathFlexibility;
  estimatedDuration: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CareerPathMetadata;
}

export interface CareerPathStage {
  name: string;
  stage: CareerStage;
  duration: string;
  requirements: string[];
  skills: string[];
  salaryRange: CareerSalaryRange;
}

export interface CareerSalaryRange {
  min: number;
  max: number;
  currency: SalaryCurrency;
  period: string;
}

export interface CareerPathMetadata {
  totalPaths: number;
  activePaths: number;
  averageProgression: number;
  lastUpdated: string;
}

export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  type: CareerGoalType;
  status: GoalStatus;
  priority: CareerGoalPriority;
  targetDate: string;
  progress: number;
  milestones: CareerMilestone[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CareerGoalMetadata;
}

export interface CareerMilestone {
  id: string;
  name: string;
  type: CareerMilestoneType;
  targetDate: string;
  completedDate: string | null;
  completed: boolean;
  description: string;
}

export interface CareerGoalMetadata {
  totalGoals: number;
  achievedGoals: number;
  completionRate: number;
  lastUpdated: string;
}

export interface CareerRecommendation {
  id: string;
  personId: string;
  type: RecommendationType;
  title: string;
  description: string;
  priority: CareerRecommendationPriority;
  confidence: number;
  source: CareerRecommendationSource;
  actionItems: string[];
  estimatedImpact: number;
  timeframe: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CareerRecommendationMetadata;
}

export interface CareerRecommendationMetadata {
  totalRecommendations: number;
  acceptanceRate: number;
  averageImpact: number;
  lastUpdated: string;
}

export interface CareerForecast {
  id: string;
  personId: string;
  model: ForecastModel;
  timeframe: ForecastTimeframe;
  predictions: CareerForecastPrediction[];
  accuracy: ForecastAccuracy;
  confidence: PredictionConfidence;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CareerForecastMetadata;
}

export interface CareerForecastPrediction {
  metric: string;
  currentValue: number;
  predictedValue: number;
  changePercent: number;
  timeframe: string;
  confidence: PredictionConfidence;
}

export interface CareerForecastMetadata {
  totalForecasts: number;
  averageAccuracy: number;
  lastUpdated: string;
}

export interface CareerTransition {
  id: string;
  personId: string;
  type: TransitionType;
  currentRole: string;
  targetRole: string;
  currentIndustry: string;
  targetIndustry: string;
  status: CareerTransitionReadiness;
  readiness: ReadinessLevel;
  gaps: CareerTransitionGap[];
  plan: CareerTransitionPlan;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CareerTransitionMetadata;
}

export interface CareerTransitionGap {
  type: string;
  currentLevel: string;
  targetLevel: string;
  gap: number;
  priority: SkillGapPriority;
  mitigation: string[];
}

export interface CareerTransitionPlan {
  steps: CareerTransitionStep[];
  estimatedDuration: string;
  milestones: CareerMilestone[];
}

export interface CareerTransitionStep {
  name: string;
  description: string;
  order: number;
  estimatedDuration: string;
  requirements: string[];
}

export interface CareerTransitionMetadata {
  totalTransitions: number;
  successRate: number;
  averageDuration: string;
  lastUpdated: string;
}

export interface CareerSimulation {
  id: string;
  personId: string;
  type: SimulationType;
  scenario: CareerSimulationScenario;
  inputs: CareerSimulationInput[];
  outputs: CareerSimulationOutput[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CareerSimulationMetadata;
}

export interface CareerSimulationInput {
  parameter: string;
  value: number;
  unit: string;
  description: string;
}

export interface CareerSimulationOutput {
  metric: string;
  value: number;
  unit: string;
  outcome: CareerSimulationOutcome;
  confidence: PredictionConfidence;
}

export interface CareerSimulationMetadata {
  totalSimulations: number;
  lastRunAt: string;
}

export interface CareerReadiness {
  id: string;
  personId: string;
  targetRole: string;
  readinessLevel: ReadinessLevel;
  factors: CareerReadinessFactorEntry[];
  overallScore: number;
  recommendations: string[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CareerReadinessMetadata;
}

export interface CareerReadinessFactorEntry {
  factor: CareerReadinessFactor;
  score: number;
  weight: number;
  details: string;
  improvementActions: string[];
}

export interface CareerReadinessMetadata {
  totalAssessments: number;
  averageReadiness: number;
  lastUpdated: string;
}

export interface EmployabilityScore {
  id: string;
  personId: string;
  overallScore: number;
  components: EmployabilityScoreComponentEntry[];
  trend: EmployabilityTrend;
  rank: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: EmployabilityScoreMetadata;
}

export interface EmployabilityScoreComponentEntry {
  component: EmployabilityFactor;
  score: number;
  weight: number;
  details: string;
}

export interface EmployabilityScoreMetadata {
  totalScores: number;
  averageScore: number;
  lastUpdated: string;
}

export interface SkillsGapAnalysis {
  id: string;
  personId: string;
  targetRole: string;
  currentSkills: CareerSkill[];
  requiredSkills: CareerSkill[];
  gaps: SkillGapEntry[];
  severity: SkillGapSeverity;
  priority: SkillGapPriority;
  timeframe: SkillGapTimeframe;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: SkillsGapAnalysisMetadata;
}

export interface SkillGapEntry {
  skill: string;
  currentLevel: string;
  requiredLevel: string;
  gap: number;
  priority: SkillGapPriority;
  learningResources: string[];
}

export interface SkillsGapAnalysisMetadata {
  totalAnalyses: number;
  averageGapSeverity: number;
  lastUpdated: string;
}

export interface LearningRecommendation {
  id: string;
  personId: string;
  type: LearningRecommendationType;
  title: string;
  description: string;
  format: LearningFormat;
  provider: string;
  duration: string;
  cost: number;
  currency: SalaryCurrency;
  priority: CareerRecommendationPriority;
  skillsAddressed: string[];
  estimatedImpact: number;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: LearningRecommendationMetadata;
}

export interface LearningRecommendationMetadata {
  totalRecommendations: number;
  completionRate: number;
  averageRating: number;
  lastUpdated: string;
}

export interface JobRecommendation {
  id: string;
  personId: string;
  jobId: string;
  jobTitle: string;
  company: string;
  matchScore: number;
  confidence: JobMatchConfidence;
  skillMatch: number;
  experienceMatch: number;
  locationMatch: number;
  salaryMatch: number;
  reasons: string[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: JobRecommendationMetadata;
}

export interface JobRecommendationMetadata {
  totalRecommendations: number;
  applicationRate: number;
  lastUpdated: string;
}

export interface SalaryIntelligence {
  id: string;
  role: string;
  industry: string;
  location: string;
  experienceLevel: string;
  salaryRange: CareerSalaryRange;
  benchmark: SalaryBenchmarkType;
  percentile: number;
  trend: MarketTrendDirection;
  factors: SalaryFactor[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: SalaryIntelligenceMetadata;
}

export interface SalaryFactor {
  factor: string;
  impact: number;
  description: string;
}

export interface SalaryIntelligenceMetadata {
  totalReports: number;
  dataPoints: number;
  lastUpdated: string;
}

export interface MarketDemand {
  id: string;
  skill: string;
  industry: string;
  location: string;
  indicator: MarketDemandIndicator;
  trend: MarketTrendDirection;
  growthRate: number;
  jobPostings: number;
  averageSalary: number;
  currency: SalaryCurrency;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: MarketDemandMetadata;
}

export interface MarketDemandMetadata {
  totalReports: number;
  dataPoints: number;
  lastUpdated: string;
}

export interface CareerRisk {
  id: string;
  personId: string;
  type: CareerRiskType;
  description: string;
  probability: CareerRiskProbability;
  impact: CareerRiskImpact;
  level: RiskLevel;
  mitigationStrategies: CareerRiskMitigation[];
  indicators: string[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CareerRiskMetadata;
}

export interface CareerRiskMetadata {
  totalRisks: number;
  averageProbability: number;
  averageImpact: number;
  lastUpdated: string;
}

export interface CareerOpportunity {
  id: string;
  personId: string;
  type: OpportunityType;
  title: string;
  description: string;
  source: OpportunitySource;
  matchLevel: OpportunityMatchLevel;
  timing: CareerOpportunityTiming;
  requiredSkills: string[];
  estimatedImpact: number;
  expiryDate: string | null;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CareerOpportunityMetadata;
}

export interface CareerOpportunityMetadata {
  totalOpportunities: number;
  applicationRate: number;
  lastUpdated: string;
}

export interface CareerPrediction {
  id: string;
  personId: string;
  type: CareerPredictionType;
  model: PredictionModel;
  prediction: CareerPredictionResult;
  confidence: PredictionConfidence;
  factors: CareerPredictionFactor[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CareerPredictionMetadata;
}

export interface CareerPredictionResult {
  metric: string;
  currentValue: number;
  predictedValue: number;
  timeframe: string;
  confidence: PredictionConfidence;
}

export interface CareerPredictionFactor {
  factor: string;
  weight: number;
  impact: string;
  confidence: PredictionConfidence;
}

export interface CareerPredictionMetadata {
  totalPredictions: number;
  averageConfidence: number;
  lastUpdated: string;
}

export interface CareerConfig {
  id: string;
  name: string;
  description: string;
  settings: CareerConfigSettings;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CareerConfigSettings {
  forecastModel: ForecastModel;
  predictionModel: PredictionModel;
  simulationType: SimulationType;
  aiEnabled: boolean;
  realTimeUpdates: boolean;
}

export interface CareerMetrics {
  id: string;
  name: string;
  description: string;
  value: number;
  unit: string;
  period: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CareerMetricsMetadata;
}

export interface CareerMetricsMetadata {
  totalMetrics: number;
  lastUpdated: string;
  trends: string[];
}

export interface CareerDashboard {
  profile: CareerProfile;
  goals: CareerGoal[];
  recommendations: CareerRecommendation[];
  forecast: CareerForecast;
  risks: CareerRisk[];
  opportunities: CareerOpportunity[];
  metrics: CareerMetrics;
  lastUpdated: string;
}

export interface CareerInsight {
  id: string;
  personId: string;
  type: CareerInsightType;
  title: string;
  description: string;
  data: Record<string, unknown>;
  actionable: boolean;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CareerPlan {
  id: string;
  personId: string;
  name: string;
  description: string;
  status: CareerPlanStatus;
  goals: CareerGoal[];
  paths: CareerPath[];
  milestones: CareerMilestone[];
  timeline: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CareerPlanMetadata;
}

export interface CareerPlanMetadata {
  totalPlans: number;
  activePlans: number;
  completionRate: number;
  lastUpdated: string;
}

export interface SkillDevelopment {
  id: string;
  personId: string;
  skill: string;
  currentLevel: string;
  targetLevel: string;
  priority: SkillDevelopmentPriority;
  deadline: string;
  progress: number;
  learningPath: string[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: SkillDevelopmentMetadata;
}

export interface SkillDevelopmentMetadata {
  totalSkills: number;
  completedSkills: number;
  averageProgress: number;
  lastUpdated: string;
}

export interface MarketIntelligence {
  id: string;
  industry: string;
  location: string;
  trends: MarketTrend[];
  demands: MarketDemand[];
  forecasts: MarketForecast[];
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: MarketIntelligenceMetadata;
}

export interface MarketTrend {
  name: string;
  direction: MarketTrendDirection;
  strength: number;
  description: string;
  impact: string;
}

export interface MarketForecast {
  metric: string;
  currentValue: number;
  predictedValue: number;
  timeframe: string;
  confidence: PredictionConfidence;
}

export interface MarketIntelligenceMetadata {
  totalReports: number;
  dataPoints: number;
  lastUpdated: string;
}

export interface CareerDevelopmentPlan {
  id: string;
  personId: string;
  name: string;
  description: string;
  goals: CareerGoal[];
  actions: CareerDevelopmentAction[];
  timeline: string;
  status: CareerPlanStatus;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  metadata: CareerDevelopmentPlanMetadata;
}

export interface CareerDevelopmentAction {
  id: string;
  name: string;
  description: string;
  type: string;
  priority: CareerGoalPriority;
  deadline: string;
  completed: boolean;
  completedAt: string | null;
}

export interface CareerDevelopmentPlanMetadata {
  totalPlans: number;
  completionRate: number;
  lastUpdated: string;
}

export interface CareerProfileSummary {
  id: string;
  personId: string;
  currentRole: string;
  currentIndustry: string;
  yearsOfExperience: number;
  totalSkills: number;
  totalCertifications: number;
  overallScore: number;
  schoolId: string;
}

export interface CareerPathDetail {
  id: string;
  name: string;
  description: string;
  type: CareerPathType;
  currentStage: CareerStage;
  stages: CareerPathStage[];
  estimatedDuration: string;
  completionPercentage: number;
  schoolId: string;
}

export interface CareerGoalDetail {
  id: string;
  title: string;
  description: string;
  type: CareerGoalType;
  status: GoalStatus;
  priority: CareerGoalPriority;
  targetDate: string;
  progress: number;
  milestones: CareerMilestone[];
  dependencies: string[];
  schoolId: string;
}

export interface CareerRecommendationDetail {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  priority: CareerRecommendationPriority;
  confidence: number;
  source: CareerRecommendationSource;
  actionItems: string[];
  estimatedImpact: number;
  timeframe: string;
  relatedSkills: string[];
  schoolId: string;
}

export interface CareerForecastDetail {
  id: string;
  model: ForecastModel;
  timeframe: ForecastTimeframe;
  predictions: CareerForecastPrediction[];
  accuracy: ForecastAccuracy;
  confidence: PredictionConfidence;
  historicalAccuracy: number[];
  schoolId: string;
}

export interface CareerTransitionDetail {
  id: string;
  type: TransitionType;
  currentRole: string;
  targetRole: string;
  currentIndustry: string;
  targetIndustry: string;
  readiness: ReadinessLevel;
  gaps: CareerTransitionGap[];
  plan: CareerTransitionPlan;
  estimatedTimeline: string;
  successProbability: number;
  schoolId: string;
}

export interface CareerSimulationDetail {
  id: string;
  type: SimulationType;
  scenario: CareerSimulationScenario;
  inputs: CareerSimulationInput[];
  outputs: CareerSimulationOutput[];
  sensitivity: CareerSimulationSensitivity[];
  schoolId: string;
}

export interface CareerSimulationSensitivity {
  parameter: string;
  impact: number;
  direction: string;
}

export interface CareerReadinessDetail {
  id: string;
  targetRole: string;
  readinessLevel: ReadinessLevel;
  factors: CareerReadinessFactorEntry[];
  overallScore: number;
  recommendations: string[];
  benchmarkScore: number;
  schoolId: string;
}

export interface EmployabilityScoreDetail {
  id: string;
  overallScore: number;
  components: EmployabilityScoreComponentEntry[];
  trend: EmployabilityTrend;
  rank: number;
  percentile: number;
  benchmarkScore: number;
  schoolId: string;
}

export interface SkillsGapAnalysisDetail {
  id: string;
  targetRole: string;
  currentSkills: CareerSkill[];
  requiredSkills: CareerSkill[];
  gaps: SkillGapEntry[];
  severity: SkillGapSeverity;
  priority: SkillGapPriority;
  estimatedTimeToClose: string;
  recommendedActions: string[];
  schoolId: string;
}

export interface LearningRecommendationDetail {
  id: string;
  type: LearningRecommendationType;
  title: string;
  description: string;
  format: LearningFormat;
  provider: string;
  duration: string;
  cost: number;
  currency: SalaryCurrency;
  priority: CareerRecommendationPriority;
  skillsAddressed: string[];
  estimatedImpact: number;
  rating: number;
  reviews: number;
  schoolId: string;
}

export interface JobRecommendationDetail {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  matchScore: number;
  confidence: JobMatchConfidence;
  skillMatch: number;
  experienceMatch: number;
  locationMatch: number;
  salaryMatch: number;
  reasons: string[];
  salary: CareerSalaryRange;
  schoolId: string;
}

export interface SalaryIntelligenceDetail {
  id: string;
  role: string;
  industry: string;
  location: string;
  experienceLevel: string;
  salaryRange: CareerSalaryRange;
  benchmark: SalaryBenchmarkType;
  percentile: number;
  trend: MarketTrendDirection;
  factors: SalaryFactor[];
  historicalTrend: SalaryHistoricalEntry[];
  schoolId: string;
}

export interface SalaryHistoricalEntry {
  year: number;
  average: number;
  min: number;
  max: number;
}

export interface MarketDemandDetail {
  id: string;
  skill: string;
  industry: string;
  location: string;
  indicator: MarketDemandIndicator;
  trend: MarketTrendDirection;
  growthRate: number;
  jobPostings: number;
  averageSalary: number;
  currency: SalaryCurrency;
  historicalDemand: MarketDemandHistoricalEntry[];
  schoolId: string;
}

export interface MarketDemandHistoricalEntry {
  period: string;
  demand: number;
  growth: number;
}

export interface CareerRiskDetail {
  id: string;
  type: CareerRiskType;
  description: string;
  probability: CareerRiskProbability;
  impact: CareerRiskImpact;
  level: RiskLevel;
  mitigationStrategies: CareerRiskMitigation[];
  indicators: string[];
  earlyWarningSignals: string[];
  schoolId: string;
}

export interface CareerOpportunityDetail {
  id: string;
  type: OpportunityType;
  title: string;
  description: string;
  source: OpportunitySource;
  matchLevel: OpportunityMatchLevel;
  timing: CareerOpportunityTiming;
  requiredSkills: string[];
  estimatedImpact: number;
  expiryDate: string | null;
  salary: CareerSalaryRange | null;
  schoolId: string;
}

export interface CareerPredictionDetail {
  id: string;
  type: CareerPredictionType;
  model: PredictionModel;
  prediction: CareerPredictionResult;
  confidence: PredictionConfidence;
  factors: CareerPredictionFactor[];
  historicalAccuracy: number;
  schoolId: string;
}

export interface CareerInsightDetail {
  id: string;
  type: CareerInsightType;
  title: string;
  description: string;
  data: Record<string, unknown>;
  actionable: boolean;
  priority: CareerRecommendationPriority;
  schoolId: string;
}

export interface CareerPlanDetail {
  id: string;
  name: string;
  description: string;
  status: CareerPlanStatus;
  goals: CareerGoal[];
  paths: CareerPath[];
  milestones: CareerMilestone[];
  timeline: string;
  completionPercentage: number;
  schoolId: string;
}

export interface SkillDevelopmentDetail {
  id: string;
  skill: string;
  currentLevel: string;
  targetLevel: string;
  priority: SkillDevelopmentPriority;
  deadline: string;
  progress: number;
  learningPath: string[];
  estimatedHours: number;
  resources: SkillDevelopmentResource[];
  schoolId: string;
}

export interface SkillDevelopmentResource {
  type: string;
  title: string;
  url: string;
  duration: string;
}

export interface MarketIntelligenceDetail {
  id: string;
  industry: string;
  location: string;
  trends: MarketTrend[];
  demands: MarketDemand[];
  forecasts: MarketForecast[];
  competitiveLandscape: MarketCompetitiveLandscape;
  schoolId: string;
}

export interface MarketCompetitiveLandscape {
  totalPlayers: number;
  marketConcentration: number;
  growthRate: number;
  keyTrends: string[];
}

export interface CareerDevelopmentPlanDetail {
  id: string;
  name: string;
  description: string;
  goals: CareerGoal[];
  actions: CareerDevelopmentAction[];
  timeline: string;
  status: CareerPlanStatus;
  completionPercentage: number;
  schoolId: string;
}

export interface CareerNetworkEntry {
  id: string;
  personId: string;
  connectionId: string;
  connectionName: string;
  relationship: string;
  strength: number;
  lastInteraction: string;
  schoolId: string;
}

export interface CareerNetworkAnalysis {
  personId: string;
  totalConnections: number;
  strongConnections: number;
  weakConnections: number;
  industryConnections: number;
  roleConnections: number;
  schoolId: string;
}

export interface CareerBrandEntry {
  id: string;
  personId: string;
  platform: string;
  profileUrl: string;
  completeness: number;
  lastUpdated: string;
  schoolId: string;
}

export interface CareerBrandAnalysis {
  personId: string;
  overallScore: number;
  platforms: CareerBrandEntry[];
  recommendations: string[];
  schoolId: string;
}

export interface CareerMentorMatch {
  id: string;
  personId: string;
  mentorId: string;
  mentorName: string;
  matchScore: number;
  expertise: string[];
  availability: string;
  schoolId: string;
}

export interface CareerNetworkingEvent {
  id: string;
  name: string;
  type: string;
  date: string;
  location: string;
  attendees: number;
  relevance: number;
  schoolId: string;
}

export interface CareerSkillAssessment {
  id: string;
  personId: string;
  skill: string;
  selfAssessment: number;
  peerAssessment: number | null;
  aiAssessment: number | null;
  formalAssessment: number | null;
  overallScore: number;
  schoolId: string;
}

export interface CareerProgressReport {
  id: string;
  personId: string;
  period: string;
  goalsAchieved: number;
  skillsGained: number;
  certificationsEarned: number;
  salaryChange: number;
  overallProgress: number;
  schoolId: string;
  generatedAt: string;
}

export interface CareerCompetitiveAnalysis {
  personId: string;
  role: string;
  industry: string;
  peerComparison: CareerPeerComparison;
  marketPosition: string;
  improvementAreas: string[];
  schoolId: string;
}

export interface CareerPeerComparison {
  experienceLevel: string;
  salaryPercentile: number;
  skillScore: number;
  certificationCount: number;
  networkStrength: number;
}

export interface CareerTimelineEntry {
  id: string;
  personId: string;
  date: string;
  type: string;
  title: string;
  description: string;
  impact: number;
  schoolId: string;
}

export interface CareerTimeline {
  personId: string;
  entries: CareerTimelineEntry[];
  milestones: CareerMilestone[];
  totalYears: number;
  schoolId: string;
}

export interface CareerAchievement {
  id: string;
  personId: string;
  title: string;
  description: string;
  date: string;
  impact: number;
  verified: boolean;
  schoolId: string;
}

export interface CareerPortfolioEntry {
  id: string;
  personId: string;
  title: string;
  description: string;
  type: string;
  url: string;
  skills: string[];
  date: string;
  schoolId: string;
}

export interface CareerSkillGapReport {
  id: string;
  personId: string;
  targetRole: string;
  gaps: SkillGapEntry[];
  severity: SkillGapSeverity;
  estimatedTimeToClose: string;
  recommendedActions: string[];
  schoolId: string;
  generatedAt: string;
}

export interface CareerSalaryNegotiation {
  id: string;
  personId: string;
  currentSalary: number;
  targetSalary: number;
  currency: SalaryCurrency;
  justification: string[];
  marketData: SalaryIntelligence;
  strategy: string;
  schoolId: string;
}

export interface CareerJobSearch {
  id: string;
  personId: string;
  query: string;
  location: string;
  industry: string;
  salaryRange: CareerSalaryRange;
  results: JobRecommendationEntry[];
  totalResults: number;
  schoolId: string;
  createdAt: string;
}

export interface CareerInterviewPrep {
  id: string;
  personId: string;
  jobId: string;
  company: string;
  questions: CareerInterviewQuestion[];
  tips: string[];
  schoolId: string;
}

export interface CareerInterviewQuestion {
  question: string;
  type: string;
  sampleAnswer: string;
  tips: string[];
}

export interface CareerEmployerResearch {
  id: string;
  personId: string;
  companyId: string;
  companyName: string;
  industry: string;
  size: string;
  culture: string;
  salaryRange: CareerSalaryRange;
  growthPotential: string;
  schoolId: string;
}

export interface CareerBenchmark {
  id: string;
  role: string;
  industry: string;
  location: string;
  experienceLevel: string;
  metrics: CareerBenchmarkMetrics;
  schoolId: string;
  generatedAt: string;
}

export interface CareerBenchmarkMetrics {
  averageSalary: number;
  averageExperience: number;
  averageSkills: number;
  averageCertifications: number;
  averageNetworkSize: number;
}

export interface CareerAlert {
  id: string;
  personId: string;
  type: string;
  title: string;
  message: string;
  priority: CareerRecommendationPriority;
  read: boolean;
  schoolId: string;
  createdAt: string;
}

export interface CareerReport {
  id: string;
  name: string;
  type: string;
  period: string;
  data: Record<string, unknown>;
  generatedAt: string;
  schoolId: string;
}

export interface CareerNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  personId: string;
  read: boolean;
  schoolId: string;
  createdAt: string;
}

export interface CareerAuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  performedBy: string;
  timestamp: string;
  details: Record<string, unknown>;
  schoolId: string;
}

export interface CareerExport {
  id: string;
  format: string;
  scope: string;
  status: string;
  url: string | null;
  schoolId: string;
  createdAt: string;
  completedAt: string | null;
}

export interface CareerImport {
  id: string;
  format: string;
  source: string;
  status: string;
  totalRows: number;
  processedRows: number;
  errors: number;
  schoolId: string;
  createdAt: string;
  completedAt: string | null;
}
