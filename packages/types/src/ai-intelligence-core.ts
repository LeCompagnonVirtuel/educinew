export enum IntelligenceSourceType {
  ACADEMIC = 'academic',
  ATTENDANCE = 'attendance',
  FINANCE = 'finance',
  HR = 'hr',
  LXP = 'lxp',
  SMART_CAMPUS = 'smart_campus',
  COMMUNICATION = 'communication',
  DOCUMENTS = 'documents',
  ANALYTICS = 'analytics',
  NATIONAL_GOVERNANCE = 'national_governance',
  ENTERPRISE = 'enterprise'
}

export enum DashboardRole {
  MINISTRY = 'ministry',
  REGIONAL = 'regional',
  INSPECTION = 'inspection',
  SCHOOL_NETWORK = 'school_network',
  SCHOOL_GROUP = 'school_group',
  SCHOOL_PRINCIPAL = 'school_principal'
}

export enum IntelligenceScoreType {
  EDUCATION_INTELLIGENCE = 'education_intelligence',
  SCHOOL_HEALTH = 'school_health',
  ACADEMIC_HEALTH = 'academic_health',
  FINANCIAL_HEALTH = 'financial_health',
  TEACHER_PERFORMANCE = 'teacher_performance',
  STUDENT_SUCCESS = 'student_success',
  CAMPUS_EFFICIENCY = 'campus_efficiency',
  RISK = 'risk',
  COMPLIANCE = 'compliance',
  AI_CONFIDENCE = 'ai_confidence'
}

export enum AIAlertSeverity {
  INFO = 'info',
  WARNING = 'warning',
  CRITICAL = 'critical',
  EMERGENCY = 'emergency'
}

export enum AIAlertStatus {
  ACTIVE = 'active',
  ACKNOWLEDGED = 'acknowledged',
  RESOLVED = 'resolved',
  ESCALATED = 'escalated'
}

export enum RecommendationType {
  IMPROVEMENT = 'improvement',
  REMEDIATION = 'remediation',
  PEDAGOGICAL = 'pedagogical',
  FINANCIAL = 'financial',
  HR = 'hr',
  INVESTMENT = 'investment',
  INFRASTRUCTURE = 'infrastructure',
  PROGRAM = 'program'
}

export enum RecommendationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum RecommendationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REJECTED = 'rejected'
}

export enum AISummaryPeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUAL = 'annual'
}

export enum AIInsightCategory {
  TREND = 'trend',
  ANOMALY = 'anomaly',
  CORRELATION = 'correlation',
  PREDICTION = 'prediction',
  RECOMMENDATION = 'recommendation',
  RISK = 'risk'
}

export enum AIWidgetType {
  SCORE_CARD = 'score_card',
  ALERT_LIST = 'alert_list',
  TREND_CHART = 'trend_chart',
  COMPARISON_TABLE = 'comparison_table',
  RECOMMENDATION_LIST = 'recommendation_list',
  INSIGHT_FEED = 'insight_feed',
  KPI_GRID = 'kpi_grid',
  MAP_VIEW = 'map_view',
  TIMELINE = 'timeline',
  RISK_MATRIX = 'risk_matrix'
}

export enum DataSourceStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  SYNCING = 'syncing',
  ERROR = 'error'
}

export enum ModelType {
  PREDICTIVE = 'predictive',
  PRESCRIPTIVE = 'prescriptive',
  DESCRIPTIVE = 'descriptive',
  ANOMALY_DETECTION = 'anomaly_detection',
  CLASSIFICATION = 'classification',
  REGRESSION = 'regression',
  CLUSTERING = 'clustering',
  NLP = 'nlp'
}

export enum TrainingStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export enum ImpactLevel {
  NEGLIGIBLE = 'negligible',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum CostType {
  ONE_TIME = 'one_time',
  RECURRING = 'recurring',
  PER_UNIT = 'per_unit'
}

export enum RiskLevel {
  MINIMAL = 'minimal',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  SEVERE = 'severe'
}

export enum EntityType {
  SCHOOL = 'school',
  TEACHER = 'teacher',
  STUDENT = 'student',
  DEPARTMENT = 'department',
  DISTRICT = 'district',
  REGION = 'region',
  NETWORK = 'network'
}

export enum DataAggregationType {
  SUM = 'sum',
  AVERAGE = 'average',
  MIN = 'min',
  MAX = 'max',
  COUNT = 'count',
  PERCENTILE = 'percentile'
}

export enum TrendDirection {
  UP = 'up',
  DOWN = 'down',
  STABLE = 'stable',
  VOLATILE = 'volatile'
}

export enum TimeGranularity {
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUAL = 'annual'
}

export enum ValidationStatus {
  VALID = 'valid',
  INVALID = 'invalid',
  WARNING = 'warning',
  PENDING = 'pending'
}

export enum CorrelationStrength {
  WEAK = 'weak',
  MODERATE = 'moderate',
  STRONG = 'strong',
  VERY_STRONG = 'very_strong'
}

export enum ScenarioOutcome {
  OPTIMISTIC = 'optimistic',
  BASELINE = 'baseline',
  PESSIMISTIC = 'pessimistic',
  STRESS = 'stress'
}

export enum AuditAction {
  CREATED = 'created',
  UPDATED = 'updated',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  IMPLEMENTED = 'implemented',
  ESCALATED = 'escalated',
  RESOLVED = 'resolved'
}

export enum WidgetSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  FULL_WIDTH = 'full_width'
}

export enum WidgetPosition {
  TOP_LEFT = 'top_left',
  TOP_CENTER = 'top_center',
  TOP_RIGHT = 'top_right',
  MIDDLE_LEFT = 'middle_left',
  MIDDLE_CENTER = 'middle_center',
  MIDDLE_RIGHT = 'middle_right',
  BOTTOM_LEFT = 'bottom_left',
  BOTTOM_CENTER = 'bottom_center',
  BOTTOM_RIGHT = 'bottom_right'
}

export enum ReasoningType {
  STATISTICAL = 'statistical',
  RULE_BASED = 'rule_based',
  ML_BASED = 'ml_based',
  HYBRID = 'hybrid',
  HEURISTIC = 'heuristic'
}

export enum ConfidenceLevel {
  VERY_LOW = 'very_low',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export interface EducationIntelligenceScore {
  id: string;
  school_id: string;
  overall_score: number;
  academic_score: number;
  financial_score: number;
  teacher_score: number;
  student_score: number;
  campus_score: number;
  risk_score: number;
  compliance_score: number;
  ai_confidence: number;
  data_source: IntelligenceSourceType;
  calculated_at: string;
  period: AISummaryPeriod;
  metadata: Record<string, unknown>;
}

export interface SchoolHealthScore {
  id: string;
  school_id: string;
  overall_health: number;
  academic_health: number;
  financial_health: number;
  operational_health: number;
  safety_health: number;
  compliance_health: number;
  trend: TrendDirection;
  previous_score: number;
  change_percent: number;
  alerts: AIAlert[];
  recommendations: DecisionRecommendation[];
  calculated_at: string;
}

export interface AcademicHealthIndex {
  id: string;
  school_id: string;
  pass_rate: number;
  average_grade: number;
  graduation_rate: number;
  dropout_rate: number;
  attendance_rate: number;
  teacher_student_ratio: number;
  class_size_avg: number;
  resource_utilization: number;
  trend: TrendDirection;
  calculated_at: string;
}

export interface FinancialHealthIndex {
  id: string;
  school_id: string;
  revenue_stability: number;
  expense_control: number;
  liquidity_ratio: number;
  budget_variance: number;
  collection_rate: number;
  debt_ratio: number;
  growth_rate: number;
  sustainability_score: number;
  calculated_at: string;
}

export interface TeacherPerformanceIndex {
  id: string;
  school_id: string;
  average_performance: number;
  retention_rate: number;
  satisfaction_score: number;
  training_completion: number;
  attendance_rate: number;
  innovation_index: number;
  student_feedback: number;
  peer_review: number;
  calculated_at: string;
}

export interface StudentSuccessIndex {
  id: string;
  school_id: string;
  overall_success: number;
  academic_achievement: number;
  extracurricular_participation: number;
  wellbeing_score: number;
  career_readiness: number;
  digital_literacy: number;
  social_skills: number;
  calculated_at: string;
}

export interface CampusEfficiencyScore {
  id: string;
  school_id: string;
  utilization_rate: number;
  energy_efficiency: number;
  maintenance_score: number;
  security_score: number;
  technology_adoption: number;
  space_optimization: number;
  transport_efficiency: number;
  calculated_at: string;
}

export interface RiskScore {
  id: string;
  school_id: string;
  overall_risk: RiskLevel;
  academic_risk: RiskLevel;
  financial_risk: RiskLevel;
  operational_risk: RiskLevel;
  safety_risk: RiskLevel;
  compliance_risk: RiskLevel;
  reputational_risk: RiskLevel;
  factors: Record<string, unknown>;
  calculated_at: string;
}

export interface ComplianceScore {
  id: string;
  school_id: string;
  overall_compliance: number;
  regulatory_compliance: number;
  data_protection_compliance: number;
  safety_compliance: number;
  academic_compliance: number;
  financial_compliance: number;
  violations: string[];
  calculated_at: string;
}

export interface AIConfidenceScore {
  id: string;
  school_id: string;
  overall_confidence: number;
  data_quality: number;
  model_accuracy: number;
  prediction_reliability: number;
  recommendation_strength: number;
  sample_size: number;
  recency_factor: number;
  calculated_at: string;
}

export interface ExecutiveDashboard {
  id: string;
  school_id: string;
  role: DashboardRole;
  overall_score: EducationIntelligenceScore;
  alerts: AIAlert[];
  kpis: IntelligentKPI[];
  summaries: AISummary[];
  insights: AIInsight[];
  assistant_status: DataSourceStatus;
  last_updated: string;
}

export interface AIAlert {
  id: string;
  school_id: string;
  title: string;
  message: string;
  severity: AIAlertSeverity;
  status: AIAlertStatus;
  category: AIInsightCategory;
  source: IntelligenceSourceType;
  entity_type: EntityType;
  entity_id: string;
  action_required: boolean;
  assigned_to: string;
  acknowledged_at: string;
  resolved_at: string;
  created_at: string;
}

export interface IntelligentKPI {
  id: string;
  school_id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: TrendDirection;
  change_percent: number;
  status: DataSourceStatus;
  category: IntelligenceScoreType;
  period: AISummaryPeriod;
  history: Record<string, unknown>[];
}

export interface AISummary {
  id: string;
  school_id: string;
  period: AISummaryPeriod;
  date_range: Record<string, string>;
  highlights: string[];
  lowlights: string[];
  key_metrics: Record<string, number>;
  alerts: AIAlert[];
  recommendations: DecisionRecommendation[];
  generated_at: string;
}

export interface AIInsight {
  id: string;
  school_id: string;
  category: AIInsightCategory;
  title: string;
  description: string;
  confidence: number;
  impact: ImpactLevel;
  supporting_data: Record<string, unknown>;
  source_entities: string[];
  generated_at: string;
}

export interface AIAssistantQuery {
  id: string;
  school_id: string;
  query: string;
  response: AIAssistantResponse;
  intent: string;
  entities: Record<string, unknown>[];
  confidence: number;
  processing_time: number;
  sources: IntelligenceSourceType[];
  generated_at: string;
}

export interface AIAssistantResponse {
  id: string;
  query_id: string;
  answer: string;
  reasoning: string;
  data_points: Record<string, unknown>[];
  recommendations: DecisionRecommendation[];
  follow_up_questions: string[];
  confidence: number;
  sources: IntelligenceSourceType[];
}

export interface AIExecutiveWidget {
  id: string;
  type: AIWidgetType;
  title: string;
  data: Record<string, unknown>;
  refresh_interval: number;
  last_updated: string;
  position: WidgetPosition;
  size: WidgetSize;
}

export interface AIContextWindow {
  id: string;
  school_id: string;
  start_date: string;
  end_date: string;
  data_points: Record<string, unknown>[];
  aggregated_metrics: Record<string, number>;
  trends: TrendDirection[];
  anomalies: AIInsight[];
}

export interface DecisionRecommendation {
  id: string;
  school_id: string;
  type: RecommendationType;
  title: string;
  description: string;
  impact: RecommendationImpact;
  estimated_cost: RecommendationCost;
  confidence: number;
  priority: RecommendationPriority;
  status: RecommendationStatus;
  category: IntelligenceScoreType;
  target_entity: EntityType;
  timeframe: string;
  metrics: Record<string, number>;
  rationale: string;
  alternatives: string[];
  created_at: string;
}

export interface RecommendationImpact {
  id: string;
  recommendation_id: string;
  dimension: IntelligenceScoreType;
  magnitude: number;
  probability: number;
  timeframe: string;
  affected_entities: string[];
  cost_benefit: number;
  risk_level: RiskLevel;
}

export interface RecommendationCost {
  id: string;
  recommendation_id: string;
  type: CostType;
  amount: number;
  currency: string;
  breakdown: Record<string, number>;
  roi: number;
  payback_period: string;
  confidence: number;
}

export interface DecisionScenario {
  id: string;
  school_id: string;
  name: string;
  description: string;
  variables: Record<string, unknown>;
  assumptions: string[];
  outcomes: Record<string, number>;
  probability: number;
  recommended: boolean;
}

export interface DecisionAudit {
  id: string;
  school_id: string;
  recommendation_id: string;
  action: AuditAction;
  user_id: string;
  reason: string;
  timestamp: string;
  outcome: string;
}

export interface DataSourceConnection {
  id: string;
  name: string;
  source_type: IntelligenceSourceType;
  endpoint: string;
  auth_type: string;
  status: DataSourceStatus;
  last_sync_at: string;
  sync_frequency: TimeGranularity;
  error_message: string;
  created_at: string;
  updated_at: string;
}

export interface DataSourceConnectionCreate {
  name: string;
  source_type: IntelligenceSourceType;
  endpoint: string;
  auth_type: string;
  status: DataSourceStatus;
  last_sync_at: string;
  sync_frequency: TimeGranularity;
  error_message: string;
}

export interface DataSourceConnectionUpdate {
  name: string;
  source_type: IntelligenceSourceType;
  endpoint: string;
  auth_type: string;
  status: DataSourceStatus;
  last_sync_at: string;
  sync_frequency: TimeGranularity;
  error_message: string;
}

export interface DataSourceConnectionQuery {
  search: string;
  source_type: IntelligenceSourceType;
  status: DataSourceStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface DataSourceSyncLog {
  id: string;
  connection_id: string;
  started_at: string;
  completed_at: string;
  records_synced: number;
  records_failed: number;
  duration_ms: number;
  status: DataSourceStatus;
  error_message: string;
  created_at: string;
  updated_at: string;
}

export interface DataSourceSyncLogCreate {
  connection_id: string;
  started_at: string;
  completed_at: string;
  records_synced: number;
  records_failed: number;
  duration_ms: number;
  status: DataSourceStatus;
  error_message: string;
}

export interface DataSourceSyncLogUpdate {
  connection_id: string;
  started_at: string;
  completed_at: string;
  records_synced: number;
  records_failed: number;
  duration_ms: number;
  status: DataSourceStatus;
  error_message: string;
}

export interface DataSourceSyncLogQuery {
  search: string;
  connection_id: string;
  status: DataSourceStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface AIModelRegistry {
  id: string;
  name: string;
  version: string;
  model_type: ModelType;
  description: string;
  accuracy: number;
  training_status: TrainingStatus;
  last_trained_at: string;
  training_data_size: number;
  hyperparameters: Record<string, unknown>;
  metrics: Record<string, number>;
  status: DataSourceStatus;
  created_at: string;
  updated_at: string;
}

export interface AIModelRegistryCreate {
  name: string;
  version: string;
  model_type: ModelType;
  description: string;
  accuracy: number;
  training_status: TrainingStatus;
  last_trained_at: string;
  training_data_size: number;
  hyperparameters: Record<string, unknown>;
  metrics: Record<string, number>;
  status: DataSourceStatus;
}

export interface AIModelRegistryUpdate {
  name: string;
  version: string;
  model_type: ModelType;
  description: string;
  accuracy: number;
  training_status: TrainingStatus;
  last_trained_at: string;
  training_data_size: number;
  hyperparameters: Record<string, unknown>;
  metrics: Record<string, number>;
  status: DataSourceStatus;
}

export interface AIModelRegistryQuery {
  search: string;
  model_type: ModelType;
  training_status: TrainingStatus;
  status: DataSourceStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface AIModelPrediction {
  id: string;
  model_id: string;
  school_id: string;
  input_data: Record<string, unknown>;
  prediction: Record<string, unknown>;
  confidence: number;
  reasoning: string;
  reasoning_type: ReasoningType;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface AIModelPredictionCreate {
  model_id: string;
  school_id: string;
  input_data: Record<string, unknown>;
  prediction: Record<string, unknown>;
  confidence: number;
  reasoning: string;
  reasoning_type: ReasoningType;
  generated_at: string;
}

export interface AIModelPredictionUpdate {
  model_id: string;
  school_id: string;
  input_data: Record<string, unknown>;
  prediction: Record<string, unknown>;
  confidence: number;
  reasoning: string;
  reasoning_type: ReasoningType;
  generated_at: string;
}

export interface AIModelPredictionQuery {
  search: string;
  model_id: string;
  school_id: string;
  reasoning_type: ReasoningType;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface AIModelTrainingRun {
  id: string;
  model_id: string;
  started_at: string;
  completed_at: string;
  duration_ms: number;
  dataset_size: number;
  accuracy_before: number;
  accuracy_after: number;
  hyperparameters: Record<string, unknown>;
  status: TrainingStatus;
  created_at: string;
  updated_at: string;
}

export interface AIModelTrainingRunCreate {
  model_id: string;
  started_at: string;
  completed_at: string;
  duration_ms: number;
  dataset_size: number;
  accuracy_before: number;
  accuracy_after: number;
  hyperparameters: Record<string, unknown>;
  status: TrainingStatus;
}

export interface AIModelTrainingRunUpdate {
  model_id: string;
  started_at: string;
  completed_at: string;
  duration_ms: number;
  dataset_size: number;
  accuracy_before: number;
  accuracy_after: number;
  hyperparameters: Record<string, unknown>;
  status: TrainingStatus;
}

export interface AIModelTrainingRunQuery {
  search: string;
  model_id: string;
  status: TrainingStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface AIAlertRule {
  id: string;
  name: string;
  description: string;
  condition: string;
  threshold: number;
  severity: AIAlertSeverity;
  category: AIInsightCategory;
  entity_type: EntityType;
  enabled: boolean;
  cooldown_minutes: number;
  notification_channels: string[];
  status: DataSourceStatus;
  created_at: string;
  updated_at: string;
}

export interface AIAlertRuleCreate {
  name: string;
  description: string;
  condition: string;
  threshold: number;
  severity: AIAlertSeverity;
  category: AIInsightCategory;
  entity_type: EntityType;
  enabled: boolean;
  cooldown_minutes: number;
  notification_channels: string[];
  status: DataSourceStatus;
}

export interface AIAlertRuleUpdate {
  name: string;
  description: string;
  condition: string;
  threshold: number;
  severity: AIAlertSeverity;
  category: AIInsightCategory;
  entity_type: EntityType;
  enabled: boolean;
  cooldown_minutes: number;
  notification_channels: string[];
  status: DataSourceStatus;
}

export interface AIAlertRuleQuery {
  search: string;
  severity: AIAlertSeverity;
  category: AIInsightCategory;
  entity_type: EntityType;
  enabled: boolean;
  status: DataSourceStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface AIAlertNotification {
  id: string;
  alert_id: string;
  channel: string;
  recipient: string;
  sent_at: string;
  delivered_at: string;
  read_at: string;
  status: DataSourceStatus;
  created_at: string;
  updated_at: string;
}

export interface AIAlertNotificationCreate {
  alert_id: string;
  channel: string;
  recipient: string;
  sent_at: string;
  delivered_at: string;
  read_at: string;
  status: DataSourceStatus;
}

export interface AIAlertNotificationUpdate {
  alert_id: string;
  channel: string;
  recipient: string;
  sent_at: string;
  delivered_at: string;
  read_at: string;
  status: DataSourceStatus;
}

export interface AIAlertNotificationQuery {
  search: string;
  alert_id: string;
  channel: string;
  status: DataSourceStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface RecommendationTemplate {
  id: string;
  name: string;
  type: RecommendationType;
  category: IntelligenceScoreType;
  title_template: string;
  description_template: string;
  conditions: Record<string, unknown>;
  default_priority: RecommendationPriority;
  estimated_impact: Record<string, number>;
  enabled: boolean;
  status: DataSourceStatus;
  created_at: string;
  updated_at: string;
}

export interface RecommendationTemplateCreate {
  name: string;
  type: RecommendationType;
  category: IntelligenceScoreType;
  title_template: string;
  description_template: string;
  conditions: Record<string, unknown>;
  default_priority: RecommendationPriority;
  estimated_impact: Record<string, number>;
  enabled: boolean;
  status: DataSourceStatus;
}

export interface RecommendationTemplateUpdate {
  name: string;
  type: RecommendationType;
  category: IntelligenceScoreType;
  title_template: string;
  description_template: string;
  conditions: Record<string, unknown>;
  default_priority: RecommendationPriority;
  estimated_impact: Record<string, number>;
  enabled: boolean;
  status: DataSourceStatus;
}

export interface RecommendationTemplateQuery {
  search: string;
  type: RecommendationType;
  category: IntelligenceScoreType;
  enabled: boolean;
  status: DataSourceStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface RecommendationHistory {
  id: string;
  recommendation_id: string;
  action: AuditAction;
  performed_by: string;
  performed_at: string;
  details: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface RecommendationHistoryCreate {
  recommendation_id: string;
  action: AuditAction;
  performed_by: string;
  performed_at: string;
  details: Record<string, unknown>;
}

export interface RecommendationHistoryUpdate {
  recommendation_id: string;
  action: AuditAction;
  performed_by: string;
  performed_at: string;
  details: Record<string, unknown>;
}

export interface RecommendationHistoryQuery {
  search: string;
  recommendation_id: string;
  action: AuditAction;
  performed_by: string;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface InsightCorrelation {
  id: string;
  school_id: string;
  source_insight_id: string;
  target_insight_id: string;
  correlation_type: CorrelationStrength;
  correlation_value: number;
  p_value: number;
  sample_size: number;
  explanation: string;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface InsightCorrelationCreate {
  school_id: string;
  source_insight_id: string;
  target_insight_id: string;
  correlation_type: CorrelationStrength;
  correlation_value: number;
  p_value: number;
  sample_size: number;
  explanation: string;
  generated_at: string;
}

export interface InsightCorrelationUpdate {
  school_id: string;
  source_insight_id: string;
  target_insight_id: string;
  correlation_type: CorrelationStrength;
  correlation_value: number;
  p_value: number;
  sample_size: number;
  explanation: string;
  generated_at: string;
}

export interface InsightCorrelationQuery {
  search: string;
  school_id: string;
  correlation_type: CorrelationStrength;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface AnomalyDetection {
  id: string;
  school_id: string;
  metric_name: string;
  expected_value: number;
  actual_value: number;
  deviation: number;
  severity: AIAlertSeverity;
  detection_method: ModelType;
  confidence: number;
  detected_at: string;
  status: AIAlertStatus;
  created_at: string;
  updated_at: string;
}

export interface AnomalyDetectionCreate {
  school_id: string;
  metric_name: string;
  expected_value: number;
  actual_value: number;
  deviation: number;
  severity: AIAlertSeverity;
  detection_method: ModelType;
  confidence: number;
  detected_at: string;
  status: AIAlertStatus;
}

export interface AnomalyDetectionUpdate {
  school_id: string;
  metric_name: string;
  expected_value: number;
  actual_value: number;
  deviation: number;
  severity: AIAlertSeverity;
  detection_method: ModelType;
  confidence: number;
  detected_at: string;
  status: AIAlertStatus;
}

export interface AnomalyDetectionQuery {
  search: string;
  school_id: string;
  metric_name: string;
  severity: AIAlertSeverity;
  status: AIAlertStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface PredictionModel {
  id: string;
  name: string;
  target_metric: string;
  model_type: ModelType;
  features: string[];
  accuracy: number;
  mae: number;
  rmse: number;
  r_squared: number;
  training_period: string;
  last_updated: string;
  status: DataSourceStatus;
  created_at: string;
  updated_at: string;
}

export interface PredictionModelCreate {
  name: string;
  target_metric: string;
  model_type: ModelType;
  features: string[];
  accuracy: number;
  mae: number;
  rmse: number;
  r_squared: number;
  training_period: string;
  last_updated: string;
  status: DataSourceStatus;
}

export interface PredictionModelUpdate {
  name: string;
  target_metric: string;
  model_type: ModelType;
  features: string[];
  accuracy: number;
  mae: number;
  rmse: number;
  r_squared: number;
  training_period: string;
  last_updated: string;
  status: DataSourceStatus;
}

export interface PredictionModelQuery {
  search: string;
  model_type: ModelType;
  status: DataSourceStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface PredictionForecast {
  id: string;
  model_id: string;
  school_id: string;
  target_date: string;
  predicted_value: number;
  confidence_lower: number;
  confidence_upper: number;
  confidence_level: ConfidenceLevel;
  input_features: Record<string, unknown>;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface PredictionForecastCreate {
  model_id: string;
  school_id: string;
  target_date: string;
  predicted_value: number;
  confidence_lower: number;
  confidence_upper: number;
  confidence_level: ConfidenceLevel;
  input_features: Record<string, unknown>;
  generated_at: string;
}

export interface PredictionForecastUpdate {
  model_id: string;
  school_id: string;
  target_date: string;
  predicted_value: number;
  confidence_lower: number;
  confidence_upper: number;
  confidence_level: ConfidenceLevel;
  input_features: Record<string, unknown>;
  generated_at: string;
}

export interface PredictionForecastQuery {
  search: string;
  model_id: string;
  school_id: string;
  confidence_level: ConfidenceLevel;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface ScenarioAnalysis {
  id: string;
  school_id: string;
  name: string;
  description: string;
  input_variables: Record<string, unknown>;
  scenario_type: ScenarioOutcome;
  projected_scores: Record<string, number>;
  projected_impact: Record<string, number>;
  probability: number;
  recommendation: string;
  created_at: string;
  updated_at: string;
}

export interface ScenarioAnalysisCreate {
  school_id: string;
  name: string;
  description: string;
  input_variables: Record<string, unknown>;
  scenario_type: ScenarioOutcome;
  projected_scores: Record<string, number>;
  projected_impact: Record<string, number>;
  probability: number;
  recommendation: string;
}

export interface ScenarioAnalysisUpdate {
  school_id: string;
  name: string;
  description: string;
  input_variables: Record<string, unknown>;
  scenario_type: ScenarioOutcome;
  projected_scores: Record<string, number>;
  projected_impact: Record<string, number>;
  probability: number;
  recommendation: string;
}

export interface ScenarioAnalysisQuery {
  search: string;
  school_id: string;
  scenario_type: ScenarioOutcome;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface DataQualityReport {
  id: string;
  school_id: string;
  source_type: IntelligenceSourceType;
  total_records: number;
  valid_records: number;
  invalid_records: number;
  completeness_score: number;
  accuracy_score: number;
  consistency_score: number;
  timeliness_score: number;
  overall_quality: number;
  validation_status: ValidationStatus;
  issues: Record<string, unknown>[];
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface DataQualityReportCreate {
  school_id: string;
  source_type: IntelligenceSourceType;
  total_records: number;
  valid_records: number;
  invalid_records: number;
  completeness_score: number;
  accuracy_score: number;
  consistency_score: number;
  timeliness_score: number;
  overall_quality: number;
  validation_status: ValidationStatus;
  issues: Record<string, unknown>[];
  generated_at: string;
}

export interface DataQualityReportUpdate {
  school_id: string;
  source_type: IntelligenceSourceType;
  total_records: number;
  valid_records: number;
  invalid_records: number;
  completeness_score: number;
  accuracy_score: number;
  consistency_score: number;
  timeliness_score: number;
  overall_quality: number;
  validation_status: ValidationStatus;
  issues: Record<string, unknown>[];
  generated_at: string;
}

export interface DataQualityReportQuery {
  search: string;
  school_id: string;
  source_type: IntelligenceSourceType;
  validation_status: ValidationStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface TrendAnalysis {
  id: string;
  school_id: string;
  metric_name: string;
  direction: TrendDirection;
  magnitude: number;
  start_value: number;
  end_value: number;
  start_date: string;
  end_date: string;
  data_points: Record<string, number>[];
  statistical_significance: number;
  explanation: string;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface TrendAnalysisCreate {
  school_id: string;
  metric_name: string;
  direction: TrendDirection;
  magnitude: number;
  start_value: number;
  end_value: number;
  start_date: string;
  end_date: string;
  data_points: Record<string, number>[];
  statistical_significance: number;
  explanation: string;
  generated_at: string;
}

export interface TrendAnalysisUpdate {
  school_id: string;
  metric_name: string;
  direction: TrendDirection;
  magnitude: number;
  start_value: number;
  end_value: number;
  start_date: string;
  end_date: string;
  data_points: Record<string, number>[];
  statistical_significance: number;
  explanation: string;
  generated_at: string;
}

export interface TrendAnalysisQuery {
  search: string;
  school_id: string;
  metric_name: string;
  direction: TrendDirection;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface BenchmarkComparison {
  id: string;
  school_id: string;
  metric_name: string;
  school_value: number;
  benchmark_value: number;
  benchmark_type: string;
  deviation_percent: number;
  percentile_rank: number;
  comparison_date: string;
  created_at: string;
  updated_at: string;
}

export interface BenchmarkComparisonCreate {
  school_id: string;
  metric_name: string;
  school_value: number;
  benchmark_value: number;
  benchmark_type: string;
  deviation_percent: number;
  percentile_rank: number;
  comparison_date: string;
}

export interface BenchmarkComparisonUpdate {
  school_id: string;
  metric_name: string;
  school_value: number;
  benchmark_value: number;
  benchmark_type: string;
  deviation_percent: number;
  percentile_rank: number;
  comparison_date: string;
}

export interface BenchmarkComparisonQuery {
  search: string;
  school_id: string;
  metric_name: string;
  benchmark_type: string;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface AIRecommendationFeedback {
  id: string;
  recommendation_id: string;
  user_id: string;
  rating: number;
  feedback_text: string;
  implemented: boolean;
  implementation_outcome: string;
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

export interface AIRecommendationFeedbackCreate {
  recommendation_id: string;
  user_id: string;
  rating: number;
  feedback_text: string;
  implemented: boolean;
  implementation_outcome: string;
  submitted_at: string;
}

export interface AIRecommendationFeedbackUpdate {
  recommendation_id: string;
  user_id: string;
  rating: number;
  feedback_text: string;
  implemented: boolean;
  implementation_outcome: string;
  submitted_at: string;
}

export interface AIRecommendationFeedbackQuery {
  search: string;
  recommendation_id: string;
  user_id: string;
  implemented: boolean;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface IntelligenceAuditLog {
  id: string;
  school_id: string;
  entity_type: EntityType;
  entity_id: string;
  action: AuditAction;
  user_id: string;
  user_role: DashboardRole;
  details: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  created_at: string;
  updated_at: string;
}

export interface IntelligenceAuditLogCreate {
  school_id: string;
  entity_type: EntityType;
  entity_id: string;
  action: AuditAction;
  user_id: string;
  user_role: DashboardRole;
  details: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
}

export interface IntelligenceAuditLogUpdate {
  school_id: string;
  entity_type: EntityType;
  entity_id: string;
  action: AuditAction;
  user_id: string;
  user_role: DashboardRole;
  details: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
}

export interface IntelligenceAuditLogQuery {
  search: string;
  school_id: string;
  entity_type: EntityType;
  action: AuditAction;
  user_id: string;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface IntelligenceConfiguration {
  id: string;
  school_id: string;
  config_key: string;
  config_value: Record<string, unknown>;
  description: string;
  enabled: boolean;
  override_global: boolean;
  status: DataSourceStatus;
  created_at: string;
  updated_at: string;
}

export interface IntelligenceConfigurationCreate {
  school_id: string;
  config_key: string;
  config_value: Record<string, unknown>;
  description: string;
  enabled: boolean;
  override_global: boolean;
  status: DataSourceStatus;
}

export interface IntelligenceConfigurationUpdate {
  school_id: string;
  config_key: string;
  config_value: Record<string, unknown>;
  description: string;
  enabled: boolean;
  override_global: boolean;
  status: DataSourceStatus;
}

export interface IntelligenceConfigurationQuery {
  search: string;
  school_id: string;
  config_key: string;
  enabled: boolean;
  status: DataSourceStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface SchoolIntelligenceProfile {
  id: string;
  school_id: string;
  school_name: string;
  district_id: string;
  region_id: string;
  school_type: string;
  student_count: number;
  teacher_count: number;
  overall_score: EducationIntelligenceScore;
  health_score: SchoolHealthScore;
  risk_score: RiskScore;
  compliance_score: ComplianceScore;
  last_analyzed_at: string;
  created_at: string;
  updated_at: string;
}

export interface SchoolIntelligenceProfileCreate {
  school_id: string;
  school_name: string;
  district_id: string;
  region_id: string;
  school_type: string;
  student_count: number;
  teacher_count: number;
  overall_score: EducationIntelligenceScore;
  health_score: SchoolHealthScore;
  risk_score: RiskScore;
  compliance_score: ComplianceScore;
  last_analyzed_at: string;
}

export interface SchoolIntelligenceProfileUpdate {
  school_id: string;
  school_name: string;
  district_id: string;
  region_id: string;
  school_type: string;
  student_count: number;
  teacher_count: number;
  overall_score: EducationIntelligenceScore;
  health_score: SchoolHealthScore;
  risk_score: RiskScore;
  compliance_score: ComplianceScore;
  last_analyzed_at: string;
}

export interface SchoolIntelligenceProfileQuery {
  search: string;
  district_id: string;
  region_id: string;
  school_type: string;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface IntelligenceReport {
  id: string;
  school_id: string;
  title: string;
  report_type: string;
  period: AISummaryPeriod;
  date_range: Record<string, string>;
  sections: Record<string, unknown>[];
  summary: string;
  generated_by: string;
  generated_at: string;
  status: DataSourceStatus;
  created_at: string;
  updated_at: string;
}

export interface IntelligenceReportCreate {
  school_id: string;
  title: string;
  report_type: string;
  period: AISummaryPeriod;
  date_range: Record<string, string>;
  sections: Record<string, unknown>[];
  summary: string;
  generated_by: string;
  generated_at: string;
  status: DataSourceStatus;
}

export interface IntelligenceReportUpdate {
  school_id: string;
  title: string;
  report_type: string;
  period: AISummaryPeriod;
  date_range: Record<string, string>;
  sections: Record<string, unknown>[];
  summary: string;
  generated_by: string;
  generated_at: string;
  status: DataSourceStatus;
}

export interface IntelligenceReportQuery {
  search: string;
  school_id: string;
  report_type: string;
  period: AISummaryPeriod;
  status: DataSourceStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface IntelligencePermission {
  id: string;
  user_id: string;
  role: DashboardRole;
  school_id: string;
  district_id: string;
  region_id: string;
  can_view: boolean;
  can_edit: boolean;
  can_export: boolean;
  can_manage_alerts: boolean;
  can_manage_recommendations: boolean;
  expires_at: string;
  status: DataSourceStatus;
  created_at: string;
  updated_at: string;
}

export interface IntelligencePermissionCreate {
  user_id: string;
  role: DashboardRole;
  school_id: string;
  district_id: string;
  region_id: string;
  can_view: boolean;
  can_edit: boolean;
  can_export: boolean;
  can_manage_alerts: boolean;
  can_manage_recommendations: boolean;
  expires_at: string;
  status: DataSourceStatus;
}

export interface IntelligencePermissionUpdate {
  user_id: string;
  role: DashboardRole;
  school_id: string;
  district_id: string;
  region_id: string;
  can_view: boolean;
  can_edit: boolean;
  can_export: boolean;
  can_manage_alerts: boolean;
  can_manage_recommendations: boolean;
  expires_at: string;
  status: DataSourceStatus;
}

export interface IntelligencePermissionQuery {
  search: string;
  user_id: string;
  role: DashboardRole;
  school_id: string;
  district_id: string;
  region_id: string;
  status: DataSourceStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface IntelligenceWidgetConfig {
  id: string;
  widget_type: AIWidgetType;
  title: string;
  description: string;
  data_source: IntelligenceSourceType;
  refresh_interval: number;
  default_size: WidgetSize;
  default_position: WidgetPosition;
  config: Record<string, unknown>;
  enabled: boolean;
  status: DataSourceStatus;
  created_at: string;
  updated_at: string;
}

export interface IntelligenceWidgetConfigCreate {
  widget_type: AIWidgetType;
  title: string;
  description: string;
  data_source: IntelligenceSourceType;
  refresh_interval: number;
  default_size: WidgetSize;
  default_position: WidgetPosition;
  config: Record<string, unknown>;
  enabled: boolean;
  status: DataSourceStatus;
}

export interface IntelligenceWidgetConfigUpdate {
  widget_type: AIWidgetType;
  title: string;
  description: string;
  data_source: IntelligenceSourceType;
  refresh_interval: number;
  default_size: WidgetSize;
  default_position: WidgetPosition;
  config: Record<string, unknown>;
  enabled: boolean;
  status: DataSourceStatus;
}

export interface IntelligenceWidgetConfigQuery {
  search: string;
  widget_type: AIWidgetType;
  data_source: IntelligenceSourceType;
  enabled: boolean;
  status: DataSourceStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface IntelligenceDashboardLayout {
  id: string;
  dashboard_id: string;
  name: string;
  role: DashboardRole;
  layout: Record<string, unknown>;
  widgets: AIExecutiveWidget[];
  is_default: boolean;
  status: DataSourceStatus;
  created_at: string;
  updated_at: string;
}

export interface IntelligenceDashboardLayoutCreate {
  dashboard_id: string;
  name: string;
  role: DashboardRole;
  layout: Record<string, unknown>;
  widgets: AIExecutiveWidget[];
  is_default: boolean;
  status: DataSourceStatus;
}

export interface IntelligenceDashboardLayoutUpdate {
  dashboard_id: string;
  name: string;
  role: DashboardRole;
  layout: Record<string, unknown>;
  widgets: AIExecutiveWidget[];
  is_default: boolean;
  status: DataSourceStatus;
}

export interface IntelligenceDashboardLayoutQuery {
  search: string;
  dashboard_id: string;
  role: DashboardRole;
  is_default: boolean;
  status: DataSourceStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface IntelligenceMetricDefinition {
  id: string;
  name: string;
  display_name: string;
  description: string;
  data_type: string;
  unit: string;
  aggregation_type: DataAggregationType;
  source: IntelligenceSourceType;
  calculation_formula: string;
  enabled: boolean;
  status: DataSourceStatus;
  created_at: string;
  updated_at: string;
}

export interface IntelligenceMetricDefinitionCreate {
  name: string;
  display_name: string;
  description: string;
  data_type: string;
  unit: string;
  aggregation_type: DataAggregationType;
  source: IntelligenceSourceType;
  calculation_formula: string;
  enabled: boolean;
  status: DataSourceStatus;
}

export interface IntelligenceMetricDefinitionUpdate {
  name: string;
  display_name: string;
  description: string;
  data_type: string;
  unit: string;
  aggregation_type: DataAggregationType;
  source: IntelligenceSourceType;
  calculation_formula: string;
  enabled: boolean;
  status: DataSourceStatus;
}

export interface IntelligenceMetricDefinitionQuery {
  search: string;
  source: IntelligenceSourceType;
  aggregation_type: DataAggregationType;
  enabled: boolean;
  status: DataSourceStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface IntelligenceMetricValue {
  id: string;
  metric_id: string;
  school_id: string;
  value: number;
  dimensions: Record<string, string>;
  timestamp: string;
  period: TimeGranularity;
  status: DataSourceStatus;
  created_at: string;
  updated_at: string;
}

export interface IntelligenceMetricValueCreate {
  metric_id: string;
  school_id: string;
  value: number;
  dimensions: Record<string, string>;
  timestamp: string;
  period: TimeGranularity;
  status: DataSourceStatus;
}

export interface IntelligenceMetricValueUpdate {
  metric_id: string;
  school_id: string;
  value: number;
  dimensions: Record<string, string>;
  timestamp: string;
  period: TimeGranularity;
  status: DataSourceStatus;
}

export interface IntelligenceMetricValueQuery {
  search: string;
  metric_id: string;
  school_id: string;
  period: TimeGranularity;
  status: DataSourceStatus;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface IntelligenceAlertAggregation {
  id: string;
  school_id: string;
  period: AISummaryPeriod;
  date_range: Record<string, string>;
  total_alerts: number;
  alerts_by_severity: Record<string, number>;
  alerts_by_category: Record<string, number>;
  resolved_count: number;
  escalated_count: number;
  average_resolution_time: number;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface IntelligenceAlertAggregationCreate {
  school_id: string;
  period: AISummaryPeriod;
  date_range: Record<string, string>;
  total_alerts: number;
  alerts_by_severity: Record<string, number>;
  alerts_by_category: Record<string, number>;
  resolved_count: number;
  escalated_count: number;
  average_resolution_time: number;
  generated_at: string;
}

export interface IntelligenceAlertAggregationUpdate {
  school_id: string;
  period: AISummaryPeriod;
  date_range: Record<string, string>;
  total_alerts: number;
  alerts_by_severity: Record<string, number>;
  alerts_by_category: Record<string, number>;
  resolved_count: number;
  escalated_count: number;
  average_resolution_time: number;
  generated_at: string;
}

export interface IntelligenceAlertAggregationQuery {
  search: string;
  school_id: string;
  period: AISummaryPeriod;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface IntelligenceRecommendationAggregation {
  id: string;
  school_id: string;
  period: AISummaryPeriod;
  date_range: Record<string, string>;
  total_recommendations: number;
  recommendations_by_type: Record<string, number>;
  recommendations_by_priority: Record<string, number>;
  accepted_count: number;
  completed_count: number;
  rejected_count: number;
  average_impact_score: number;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface IntelligenceRecommendationAggregationCreate {
  school_id: string;
  period: AISummaryPeriod;
  date_range: Record<string, string>;
  total_recommendations: number;
  recommendations_by_type: Record<string, number>;
  recommendations_by_priority: Record<string, number>;
  accepted_count: number;
  completed_count: number;
  rejected_count: number;
  average_impact_score: number;
  generated_at: string;
}

export interface IntelligenceRecommendationAggregationUpdate {
  school_id: string;
  period: AISummaryPeriod;
  date_range: Record<string, string>;
  total_recommendations: number;
  recommendations_by_type: Record<string, number>;
  recommendations_by_priority: Record<string, number>;
  accepted_count: number;
  completed_count: number;
  rejected_count: number;
  average_impact_score: number;
  generated_at: string;
}

export interface IntelligenceRecommendationAggregationQuery {
  search: string;
  school_id: string;
  period: AISummaryPeriod;
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}
