export enum ModelType {
  CLASSIFICATION = "CLASSIFICATION",
  REGRESSION = "REGRESSION",
  CLUSTERING = "CLUSTERING",
  RECOMMENDATION = "RECOMMENDATION",
  NLP = "NLP",
  COMPUTER_VISION = "COMPUTER_VISION",
  GENERATIVE = "GENERATIVE",
  REINFORCEMENT = "REINFORCEMENT",
  ANOMALY_DETECTION = "ANOMALY_DETECTION",
  TIME_SERIES = "TIME_SERIES",
  DEEP_LEARNING = "DEEP_LEARNING",
  TRANSFORMER = "TRANSFORMER",
}

export enum ModelStatus {
  DRAFT = "DRAFT",
  TRAINING = "TRAINING",
  VALIDATING = "VALIDATING",
  TESTING = "TESTING",
  APPROVED = "APPROVED",
  DEPLOYED = "DEPLOYED",
  MONITORING = "MONITORING",
  DEPRECATED = "DEPRECATED",
  RETIRED = "RETIRED",
  FAILED = "FAILED",
  ARCHIVED = "ARCHIVED",
}

export enum ModelVersionType {
  MAJOR = "MAJOR",
  MINOR = "MINOR",
  PATCH = "PATCH",
  RELEASE_CANDIDATE = "RELEASE_CANDIDATE",
  BETA = "BETA",
  ALPHA = "ALPHA",
  NIGHTLY = "NIGHTLY",
}

export enum PolicyType {
  DATA_GOVERNANCE = "DATA_GOVERNANCE",
  MODEL_GOVERNANCE = "MODEL_GOVERNANCE",
  USAGE_POLICY = "USAGE_POLICY",
  ETHICS_POLICY = "ETHICS_POLICY",
  PRIVACY_POLICY = "PRIVACY_POLICY",
  SECURITY_POLICY = "SECURITY_POLICY",
  COMPLIANCE_POLICY = "COMPLIANCE_POLICY",
  RETENTION_POLICY = "RETENTION_POLICY",
  ACCESS_CONTROL = "ACCESS_CONTROL",
  AUDIT_POLICY = "AUDIT_POLICY",
}

export enum ComplianceStandard {
  GDPR = "GDPR",
  CCPA = "CCPA",
  HIPAA = "HIPAA",
  SOX = "SOX",
  ISO_27001 = "ISO_27001",
  SOC2 = "SOC2",
  NIST = "NIST",
  FERPA = "FERPA",
  COPPA = "COPPA",
  PCI_DSS = "PCI_DSS",
  AI_ACT = "AI_ACT",
  UNESCO_AI_ETHICS = "UNESCO_AI_ETHICS",
}

export enum AuditType {
  MODEL_AUDIT = "MODEL_AUDIT",
  DATA_AUDIT = "DATA_AUDIT",
  SECURITY_AUDIT = "SECURITY_AUDIT",
  COMPLIANCE_AUDIT = "COMPLIANCE_AUDIT",
  PERFORMANCE_AUDIT = "PERFORMANCE_AUDIT",
  BIAS_AUDIT = "BIAS_AUDIT",
  ETHICS_AUDIT = "ETHICS_AUDIT",
  ACCESS_AUDIT = "ACCESS_AUDIT",
  CHANGE_AUDIT = "CHANGE_AUDIT",
  INCIDENT_AUDIT = "INCIDENT_AUDIT",
}

export enum ExplainabilityMethod {
  SHAP = "SHAP",
  LIME = "LIME",
  ATTENTION = "ATTENTION",
  GRADIENT = "GRADIENT",
  COUNTERFACTUAL = "COUNTERFACTUAL",
  FEATURE_IMPORTANCE = "FEATURE_IMPORTANCE",
  PARTIAL_DEPENDENCE = "PARTIAL_DEPENDENCE",
  ANCHOR = "ANCHOR",
  RULE_EXTRACTION = "RULE_EXTRACTION",
  ACTIVATION_MAXIMIZATION = "ACTIVATION_MAXIMIZATION",
}

export enum BiasType {
  SELECTION_BIAS = "SELECTION_BIAS",
  MEASUREMENT_BIAS = "MEASUREMENT_BIAS",
  HISTORICAL_BIAS = "HISTORICAL_BIAS",
  REPRESENTATION_BIAS = "REPRESENTATION_BIAS",
  AGGREGATION_BIAS = "AGGREGATION_BIAS",
  EVALUATION_BIAS = "EVALUATION_BIAS",
  DEPLOYMENT_BIAS = "DEPLOYMENT_BIAS",
  ALGORITHMIC_BIAS = "ALGORITHMIC_BIAS",
  GENDER_BIAS = "GENDER_BIAS",
  RACIAL_BIAS = "RACIAL_BIAS",
  AGE_BIAS = "AGE_BIAS",
  SOCIOECONOMIC_BIAS = "SOCIOECONOMIC_BIAS",
}

export enum FairnessMetric {
  DEMOGRAPHIC_PARITY = "DEMOGRAPHIC_PARITY",
  EQUAL_OPPORTUNITY = "EQUAL_OPPORTUNITY",
  EQUALIZED_ODDS = "EQUALIZED_ODDS",
  PREDICTIVE_PARITY = "PREDICTIVE_PARITY",
  CALIBRATION = "CALIBRATION",
  INDIVIDUAL_FAIRNESS = "INDIVIDUAL_FAIRNESS",
  COUNTERFACTUAL_FAIRNESS = "COUNTERFACTUAL_FAIRNESS",
  GROUP_FAIRNESS = "GROUP_FAIRNESS",
  APPROXIMATE_UNAWARENESS = "APPROXIMATE_UNAWARENESS",
}

export enum RiskLevel {
  NEGLIGIBLE = "NEGLIGIBLE",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
  CRITICAL = "CRITICAL",
  UNACCEPTABLE = "UNACCEPTABLE",
}

export enum ApprovalStatus {
  PENDING = "PENDING",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CONDITIONALLY_APPROVED = "CONDITIONALLY_APPROVED",
  ESCALATED = "ESCALATED",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
}

export enum WorkflowStep {
  SUBMISSION = "SUBMISSION",
  INITIAL_REVIEW = "INITIAL_REVIEW",
  TECHNICAL_REVIEW = "TECHNICAL_REVIEW",
  ETHICS_REVIEW = "ETHICS_REVIEW",
  COMPLIANCE_REVIEW = "COMPLIANCE_REVIEW",
  SECURITY_REVIEW = "SECURITY_REVIEW",
  STAKEHOLDER_REVIEW = "STAKEHOLDER_REVIEW",
  FINAL_APPROVAL = "FINAL_APPROVAL",
  DEPLOYMENT = "DEPLOYMENT",
  MONITORING = "MONITORING",
}

export enum ReviewOutcome {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  NEEDS_REVISION = "NEEDS_REVISION",
  ESCALATED = "ESCALATED",
  DEFERRED = "DEFERRED",
}

export enum DocumentationLevel {
  MINIMAL = "MINIMAL",
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  COMPREHENSIVE = "COMPREHENSIVE",
  EXHAUSTIVE = "EXHAUSTIVE",
}

export enum MonitoringFrequency {
  REAL_TIME = "REAL_TIME",
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  ON_DEMAND = "ON_DEMAND",
}

export enum DriftType {
  DATA_DRIFT = "DATA_DRIFT",
  CONCEPT_DRIFT = "CONCEPT_DRIFT",
  PREDICTION_DRIFT = "PREDICTION_DRIFT",
  FEATURE_DRIFT = "FEATURE_DRIFT",
  LABEL_DRIFT = "LABEL_DRIFT",
}

export enum IncidentSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum ModelCardSection {
  OVERVIEW = "OVERVIEW",
  INTENDED_USE = "INTENDED_USE",
  TRAINING_DATA = "TRAINING_DATA",
  EVALUATION_DATA = "EVALUATION_DATA",
  PERFORMANCE_METRICS = "PERFORMANCE_METRICS",
  LIMITATIONS = "LIMITATIONS",
  ETHICAL_CONSIDERATIONS = "ETHICAL_CONSIDERATIONS",
  MAINTENANCE = "MAINTENANCE",
}

export enum ComplianceStatus {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  PARTIALLY_COMPLIANT = "PARTIALLY_COMPLIANT",
  NOT_ASSESSED = "NOT_ASSESSED",
  IN_PROGRESS = "IN_PROGRESS",
}

export enum ModelLifecyclePhase {
  IDEATION = "IDEATION",
  DEVELOPMENT = "DEVELOPMENT",
  TESTING = "TESTING",
  VALIDATION = "VALIDATION",
  DEPLOYMENT = "DEPLOYMENT",
  OPERATION = "OPERATION",
  MONITORING = "MONITORING",
  RETIREMENT = "RETIREMENT",
}

export enum EthicsPrinciple {
  FAIRNESS = "FAIRNESS",
  TRANSPARENCY = "TRANSPARENCY",
  ACCOUNTABILITY = "ACCOUNTABILITY",
  PRIVACY = "PRIVACY",
  SAFETY = "SAFETY",
  INCLUSIVENESS = "INCLUSIVENESS",
  RESPONSIBILITY = "RESPONSIBILITY",
  HUMAN_OVERSIGHT = "HUMAN_OVERSIGHT",
}

export enum ConsentType {
  EXPLICIT = "EXPLICIT",
  IMPLIED = "IMPLIED",
  OPT_IN = "OPT_IN",
  OPT_OUT = "OPT_OUT",
  BUNDLED = "BUNDLED",
}

export enum DataRetentionPolicy {
  RETAIN_INDEFINITELY = "RETAIN_INDEFINITELY",
  RETAIN_FOR_PERIOD = "RETAIN_FOR_PERIOD",
  DELETE_AFTER_USE = "DELETE_AFTER_USE",
  ANONYMIZE = "ANONYMIZE",
  ARCHIVE = "ARCHIVE",
}

export enum PrivacyImpactLevel {
  NONE = "NONE",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum ModelPermission {
  VIEW = "VIEW",
  DOWNLOAD = "DOWNLOAD",
  DEPLOY = "DEPLOY",
  MODIFY = "MODIFY",
  DELETE = "DELETE",
  SHARE = "SHARE",
  ADMINISTER = "ADMINISTER",
}

export enum AuditScope {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  TARGETED = "TARGETED",
  SPOT_CHECK = "SPOT_CHECK",
}

export enum GovernanceRole {
  AI_ETHICS_OFFICER = "AI_ETHICS_OFFICER",
  DATA_STEWARD = "DATA_STEWARD",
  MODEL_OWNER = "MODEL_OWNER",
  COMPLIANCE_OFFICER = "COMPLIANCE_OFFICER",
  SECURITY_OFFICER = "SECURITY_OFFICER",
  REVIEWER = "REVIEWER",
  APPROVER = "APPROVER",
}

export enum ReportFormat {
  PDF = "PDF",
  HTML = "HTML",
  JSON = "JSON",
  CSV = "CSV",
  DASHBOARD = "DASHBOARD",
}

export enum NotificationChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  WEBHOOK = "WEBHOOK",
  DASHBOARD = "DASHBOARD",
  SLACK = "SLACK",
}

export enum RemediationStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  REMEDIATED = "REMEDIATED",
  ACCEPTED = "ACCEPTED",
  WAIVED = "WAIVED",
}

export enum BiasSeverity {
  NONE = "NONE",
  MINOR = "MINOR",
  MODERATE = "MODERATE",
  SIGNIFICANT = "SIGNIFICANT",
  SEVERE = "SEVERE",
}

export enum FairnessStatus {
  FAIR = "FAIR",
  UNFAIR = "UNFAIR",
  CONDITIONALLY_FAIR = "CONDITIONALLY_FAIR",
  UNKNOWN = "UNKNOWN",
}

export interface AIModel {
  id: string;
  school_id: string;
  model_name: string;
  model_type: ModelType;
  status: ModelStatus;
  description: string;
  version: string;
  framework: string;
  algorithm: string;
  hyperparameters: Record<string, unknown>;
  training_data_id: string;
  features: ModelFeature[];
  performance_metrics: ModelPerformanceMetrics;
  fairness_metrics: ModelFairnessMetrics;
  explainability_config: ExplainabilityConfig;
  risk_assessment: ModelRiskAssessment;
  created_by: string;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ModelFeature {
  feature_name: string;
  feature_type: string;
  importance_score: number;
  description: string;
  data_type: string;
  is_sensitive: boolean;
  bias_risk: string;
}

export interface ModelPerformanceMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  auc_roc: number;
  mse: number;
  rmse: number;
  mae: number;
  r_squared: number;
  log_loss: number;
  top_k_accuracy: number;
  inference_time_ms: number;
  training_time_seconds: number;
  model_size_mb: number;
}

export interface ModelFairnessMetrics {
  demographic_parity: number;
  equal_opportunity: number;
  equalized_odds: number;
  predictive_parity: number;
  calibration: number;
  individual_fairness: number;
  overall_fairness_score: number;
  bias_detected: boolean;
  protected_attributes: string[];
}

export interface ExplainabilityConfig {
  enabled: boolean;
  methods: ExplainabilityMethod[];
  feature_importance_enabled: boolean;
  shap_enabled: boolean;
  lime_enabled: boolean;
  attention_visualization: boolean;
  counterfactual_enabled: boolean;
  local_explanations: boolean;
  global_explanations: boolean;
}

export interface ModelRiskAssessment {
  risk_level: RiskLevel;
  risk_score: number;
  risk_factors: string[];
  mitigation_strategies: string[];
  impact_assessment: string;
  likelihood_assessment: string;
  residual_risk: number;
  review_required: boolean;
  last_assessment: string;
}

export interface ModelVersionInfo {
  id: string;
  model_id: string;
  version_number: string;
  version_type: ModelVersionType;
  status: ModelStatus;
  changelog: string;
  training_data_hash: string;
  hyperparameters: Record<string, unknown>;
  performance_metrics: ModelPerformanceMetrics;
  fairness_metrics: ModelFairnessMetrics;
  artifacts: ModelArtifact[];
  is_current: boolean;
  created_by: string;
  approved_by: string | null;
  created_at: string;
}

export interface ModelArtifact {
  artifact_id: string;
  artifact_type: string;
  file_path: string;
  file_size_bytes: number;
  checksum: string;
  description: string;
  created_at: string;
}

export interface ModelRegistry {
  id: string;
  school_id: string;
  models: AIModel[];
  total_models: number;
  active_models: number;
  deprecated_models: number;
  registry_settings: RegistrySettings;
  created_at: string;
  updated_at: string;
}

export interface RegistrySettings {
  auto_versioning: boolean;
  require_approval: boolean;
  max_models_per_type: number;
  retention_period_days: number;
  backup_enabled: boolean;
  audit_logging: boolean;
}

export interface AIPolicy {
  id: string;
  school_id: string;
  policy_name: string;
  policy_type: PolicyType;
  description: string;
  version: string;
  rules: PolicyRule[];
  scope: string;
  applies_to_model_types: ModelType[];
  compliance_standards: ComplianceStandard[];
  enforcement_level: string;
  effective_date: string;
  expiry_date: string | null;
  created_by: string;
  approved_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PolicyRule {
  rule_id: string;
  rule_name: string;
  description: string;
  condition: string;
  action: string;
  severity: string;
  is_mandatory: boolean;
  exceptions: string[];
}

export interface PolicyCompliance {
  id: string;
  policy_id: string;
  model_id: string;
  is_compliant: boolean;
  compliance_score: number;
  violations: PolicyViolation[];
  last_checked: string;
  next_check: string;
  remediation_actions: string[];
}

export interface PolicyViolation {
  violation_id: string;
  rule_id: string;
  rule_name: string;
  description: string;
  severity: string;
  detected_at: string;
  status: string;
  remediation: string;
  deadline: string;
}

export interface AIComplianceCheck {
  id: string;
  school_id: string;
  standard: ComplianceStandard;
  check_name: string;
  description: string;
  category: string;
  is_met: boolean;
  evidence: string[];
  findings: string[];
  recommendations: string[];
  checked_at: string;
  next_check: string;
  status: string;
}

export interface AIAudit {
  id: string;
  school_id: string;
  audit_type: AuditType;
  scope: AuditScope;
  model_ids: string[];
  findings: AuditFinding[];
  overall_score: number;
  risk_level: RiskLevel;
  recommendations: string[];
  auditor: string;
  start_date: string;
  end_date: string;
  status: string;
  report_url: string;
  created_at: string;
}

export interface AuditFinding {
  finding_id: string;
  category: string;
  severity: string;
  description: string;
  evidence: string[];
  impact: string;
  recommendation: string;
  status: string;
  remediation_deadline: string;
  assigned_to: string;
}

export interface AuditLog {
  id: string;
  school_id: string;
  event_type: string;
  actor_id: string;
  actor_type: string;
  resource_type: string;
  resource_id: string;
  action: string;
  details: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  timestamp: string;
  session_id: string;
}

export interface ExplainableModel {
  id: string;
  model_id: string;
  explanation_type: string;
  method: ExplainabilityMethod;
  global_explanations: GlobalExplanation[];
  local_explanations: LocalExplanation[];
  feature_interactions: FeatureInteraction[];
  counterfactual_examples: CounterfactualExample[];
  visualization_data: Record<string, unknown>;
  generated_at: string;
}

export interface GlobalExplanation {
  feature_name: string;
  importance_score: number;
  direction: string;
  description: string;
  confidence: number;
}

export interface LocalExplanation {
  instance_id: string;
  prediction: unknown;
  feature_contributions: FeatureContribution[];
  confidence: number;
  explanation_text: string;
}

export interface FeatureContribution {
  feature_name: string;
  feature_value: unknown;
  contribution: number;
  direction: string;
}

export interface FeatureInteraction {
  feature_1: string;
  feature_2: string;
  interaction_strength: number;
  interaction_type: string;
  description: string;
}

export interface CounterfactualExample {
  instance_id: string;
  original_prediction: unknown;
  counterfactual_prediction: unknown;
  changed_features: ChangedFeature[];
  distance: number;
  validity: number;
}

export interface ChangedFeature {
  feature_name: string;
  original_value: unknown;
  counterfactual_value: unknown;
}

export interface BiasReport {
  id: string;
  school_id: string;
  model_id: string;
  bias_type: BiasType;
  protected_attribute: string;
  affected_group: string;
  bias_score: number;
  statistical_parity_difference: number;
  disparate_impact_ratio: number;
  equal_opportunity_difference: number;
  recommended_mitigations: string[];
  severity: BiasSeverity;
  status: string;
  generated_at: string;
}

export interface FairnessAnalysis {
  id: string;
  school_id: string;
  model_id: string;
  metrics: FairnessMetricResult[];
  overall_fairness_score: number;
  fairness_status: FairnessStatus;
  protected_attributes: ProtectedAttribute[];
  intersectional_analysis: IntersectionalAnalysis[];
  recommendations: string[];
  compliance_status: string;
  generated_at: string;
}

export interface FairnessMetricResult {
  metric: FairnessMetric;
  value: number;
  threshold: number;
  is_acceptable: boolean;
  group_breakdown: GroupFairnessScore[];
}

export interface GroupFairnessScore {
  group: string;
  score: number;
  sample_size: number;
}

export interface ProtectedAttribute {
  attribute_name: string;
  groups: string[];
  categories_count: number;
  balance_ratio: number;
}

export interface IntersectionalAnalysis {
  attributes: string[];
  groups: string[];
  fairness_score: number;
  sample_size: number;
}

export interface AIRisk {
  id: string;
  school_id: string;
  risk_name: string;
  description: string;
  risk_level: RiskLevel;
  probability: number;
  impact: number;
  risk_score: number;
  category: string;
  affected_models: string[];
  mitigation_strategies: string[];
  risk_owner: string;
  review_frequency: string;
  last_review: string;
  next_review: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RiskAssessment {
  id: string;
  school_id: string;
  assessment_name: string;
  scope: string;
  model_ids: string[];
  risks: AIRisk[];
  overall_risk_level: RiskLevel;
  overall_risk_score: number;
  risk_distribution: RiskDistribution;
  mitigation_plan: MitigationPlan;
  reviewer: string;
  assessment_date: string;
  next_assessment: string;
  status: string;
}

export interface RiskDistribution {
  negligible: number;
  low: number;
  medium: number;
  high: number;
  very_high: number;
  critical: number;
}

export interface MitigationPlan {
  plan_id: string;
  strategies: MitigationStrategy[];
  budget: number;
  timeline: string;
  responsible_party: string;
  status: string;
}

export interface MitigationStrategy {
  strategy_id: string;
  risk_id: string;
  strategy_name: string;
  description: string;
  implementation_steps: string[];
  estimated_cost: number;
  expected_risk_reduction: number;
  deadline: string;
  status: string;
}

export interface HumanApproval {
  id: string;
  school_id: string;
  request_type: string;
  model_id: string;
  model_version_id: string;
  requested_by: string;
  request_reason: string;
  current_step: WorkflowStep;
  approval_status: ApprovalStatus;
  review_history: ApprovalReview[];
  deadline: string;
  auto_approve_eligible: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApprovalReview {
  review_id: string;
  step: WorkflowStep;
  reviewer_id: string;
  reviewer_role: string;
  decision: ReviewOutcome;
  comments: string;
  conditions: string[];
  reviewed_at: string;
}

export interface ApprovalWorkflow {
  id: string;
  school_id: string;
  workflow_name: string;
  description: string;
  steps: WorkflowStepConfig[];
  trigger_conditions: string[];
  timeout_hours: number;
  auto_escalation: boolean;
  required_approvals: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkflowStepConfig {
  step: WorkflowStep;
  order: number;
  required_role: string;
  review_criteria: string[];
  timeout_hours: number;
  auto_approve_on_timeout: boolean;
  parallel_with: WorkflowStep[];
}

export interface GovernanceMetrics {
  id: string;
  school_id: string;
  period: string;
  total_models: number;
  active_models: number;
  models_pending_approval: number;
  average_approval_time_hours: number;
  policy_violations: number;
  audit_findings_open: number;
  audit_findings_closed: number;
  bias_incidents: number;
  fairness_score_average: number;
  risk_assessments_completed: number;
  high_risk_models: number;
  compliance_score: number;
  generated_at: string;
}

export interface GovernanceConfig {
  id: string;
  school_id: string;
  require_model_approval: boolean;
  require_data_impact_assessment: boolean;
  max_model_risk_level: RiskLevel;
  mandatory_explainability: boolean;
  bias_check_required: boolean;
  audit_frequency: string;
  policy_review_frequency: string;
  auto_deprecation_days: number;
  notification_settings: GovernanceNotificationSettings;
  created_at: string;
  updated_at: string;
}

export interface GovernanceNotificationSettings {
  approval_requests: boolean;
  policy_violations: boolean;
  bias_alerts: boolean;
  audit_reminders: boolean;
  risk_escalations: boolean;
  email_recipients: string[];
}

export interface ModelMonitoring {
  id: string;
  model_id: string;
  monitoring_frequency: MonitoringFrequency;
  metrics_tracked: string[];
  alerts_enabled: boolean;
  alert_thresholds: AlertThreshold[];
  drift_detection_enabled: boolean;
  drift_types_monitored: DriftType[];
  performance_window_hours: number;
  baseline_metrics: ModelPerformanceMetrics;
  current_metrics: ModelPerformanceMetrics | null;
  drift_status: DriftStatus | null;
  last_check: string;
  next_check: string;
}

export interface AlertThreshold {
  metric_name: string;
  min_threshold: number;
  max_threshold: number;
  severity: string;
  notification_channels: NotificationChannel[];
}

export interface DriftStatus {
  has_drift: boolean;
  drift_type: DriftType;
  drift_score: number;
  affected_features: string[];
  detected_at: string;
  severity: string;
  recommended_action: string;
}

export interface ModelIncident {
  id: string;
  school_id: string;
  model_id: string;
  incident_type: string;
  severity: IncidentSeverity;
  description: string;
  affected_users: number;
  root_cause: string;
  resolution: string;
  detected_at: string;
  resolved_at: string | null;
  reported_by: string;
  assigned_to: string;
  status: string;
  post_mortem_url: string;
}

export interface ModelCard {
  id: string;
  model_id: string;
  sections: ModelCardSection[];
  overview: ModelCardOverview;
  intended_use: ModelCardIntendedUse;
  training_data: ModelCardTrainingData;
  evaluation_data: ModelCardEvaluationData;
  performance_metrics: ModelPerformanceMetrics;
  limitations: ModelCardLimitations;
  ethical_considerations: ModelCardEthics;
  maintenance: ModelCardMaintenance;
  last_updated: string;
  created_by: string;
}

export interface ModelCardOverview {
  model_name: string;
  model_type: ModelType;
  version: string;
  description: string;
  owner: string;
  contact: string;
}

export interface ModelCardIntendedUse {
  use_cases: string[];
  out_of_scope_uses: string[];
  target_users: string[];
  deployment_environment: string;
  limitations: string[];
}

export interface ModelCardTrainingData {
  dataset_name: string;
  data_source: string;
  size: string;
  time_period: string;
  features_description: string;
  label_description: string;
  known_biases: string[];
}

export interface ModelCardEvaluationData {
  dataset_name: string;
  size: string;
  evaluation_metrics: ModelPerformanceMetrics;
  fairness_evaluation: ModelFairnessMetrics;
}

export interface ModelCardLimitations {
  known_limitations: string[];
  failure_modes: string[];
  edge_cases: string[];
  performance_degradation_factors: string[];
}

export interface ModelCardEthics {
  ethical_considerations: string[];
  bias_mitigation_steps: string[];
  fairness_assessments: string[];
  transparency_measures: string[];
}

export interface ModelCardMaintenance {
  monitoring_frequency: string;
  retraining_schedule: string;
  version_history: string[];
  responsible_team: string;
}

export interface ExplainabilityDashboard {
  id: string;
  school_id: string;
  model_id: string;
  explanations: ExplainableModel[];
  feature_importance_chart: FeatureImportanceChart;
  prediction_explanations: PredictionExplanationSummary;
  bias_indicators: BiasIndicator[];
  last_generated: string;
}

export interface FeatureImportanceChart {
  top_features: FeatureImportanceEntry[];
  total_features: number;
  importance_threshold: number;
}

export interface FeatureImportanceEntry {
  feature_name: string;
  importance_score: number;
  rank: number;
  category: string;
}

export interface PredictionExplanationSummary {
  total_predictions: number;
  average_confidence: number;
  explanation_coverage: number;
  top_confused_classes: string[];
}

export interface BiasIndicator {
  attribute: string;
  bias_score: number;
  threshold: number;
  status: string;
  trend: number[];
}

export interface ComplianceDashboard {
  id: string;
  school_id: string;
  total_standards: number;
  compliant_standards: number;
  partially_compliant: number;
  non_compliant: number;
  overall_compliance_score: number;
  standard_details: ComplianceStandardDetail[];
  recent_audits: AIAudit[];
  open_violations: PolicyViolation[];
  last_updated: string;
}

export interface ComplianceStandardDetail {
  standard: ComplianceStandard;
  compliance_score: number;
  requirements_met: number;
  requirements_total: number;
  last_assessed: string;
  next_assessment: string;
}

export interface RiskDashboard {
  id: string;
  school_id: string;
  total_risks: number;
  risks_by_level: RiskDistribution;
  high_risk_items: AIRisk[];
  mitigation_progress: number;
  upcoming_reviews: RiskReview[];
  trend_data: RiskTrendData;
  last_updated: string;
}

export interface RiskReview {
  risk_id: string;
  risk_name: string;
  review_date: string;
  reviewer: string;
  risk_level: RiskLevel;
}

export interface RiskTrendData {
  period_labels: string[];
  risk_counts: number[];
  risk_scores: number[];
  mitigations_completed: number[];
}

export interface ApprovalDashboard {
  id: string;
  school_id: string;
  pending_approvals: number;
  approved_this_month: number;
  rejected_this_month: number;
  average_processing_time_hours: number;
  overdue_approvals: number;
  approvals_by_type: Record<string, number>;
  recent_decisions: HumanApproval[];
  last_updated: string;
}

export interface PrivacyImpactAssessment {
  id: string;
  school_id: string;
  assessment_name: string;
  data_types_processed: string[];
  impact_level: PrivacyImpactLevel;
  consent_type: ConsentType;
  data_retention_policy: DataRetentionPolicy;
  risks_identified: PrivacyRisk[];
  mitigations: PrivacyMitigation[];
  status: string;
  assessed_by: string;
  assessed_at: string;
  next_review: string;
}

export interface PrivacyRisk {
  risk_id: string;
  description: string;
  likelihood: string;
  impact: string;
  risk_score: number;
  data_subjects_affected: number;
}

export interface PrivacyMitigation {
  mitigation_id: string;
  risk_id: string;
  description: string;
  implementation_cost: string;
  effectiveness: number;
  status: string;
}

export interface EthicsReview {
  id: string;
  school_id: string;
  model_id: string;
  principles_assessed: EthicsPrinciple[];
  compliance_scores: Record<EthicsPrinciple, number>;
  findings: EthicsFinding[];
  overall_ethics_score: number;
  reviewer: string;
  review_date: string;
  next_review: string;
  status: string;
}

export interface EthicsFinding {
  finding_id: string;
  principle: EthicsPrinciple;
  description: string;
  severity: string;
  recommendation: string;
  status: string;
}

export interface ModelPermissions {
  id: string;
  school_id: string;
  model_id: string;
  permissions: ModelPermissionEntry[];
  default_permission: ModelPermission;
  created_at: string;
  updated_at: string;
}

export interface ModelPermissionEntry {
  role: string;
  permissions: ModelPermission[];
  granted_by: string;
  granted_at: string;
}

export interface GovernanceAuditReport {
  id: string;
  school_id: string;
  report_type: AuditType;
  period: string;
  executive_summary: string;
  key_findings: AuditFinding[];
  compliance_status: ComplianceStatus;
  risk_summary: RiskDistribution;
  recommendations: string[];
  generated_by: string;
  generated_at: string;
  report_format: ReportFormat;
}

export interface BiasMitigationPlan {
  id: string;
  school_id: string;
  model_id: string;
  bias_report_id: string;
  mitigation_strategies: BiasMitigationStrategy[];
  target_metrics: Record<FairnessMetric, number>;
  timeline_weeks: number;
  budget: number;
  responsible_team: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface BiasMitigationStrategy {
  strategy_id: string;
  strategy_name: string;
  description: string;
  technique: string;
  expected_impact: number;
  implementation_effort: string;
  status: string;
}

export interface ModelGovernanceWorkflow {
  id: string;
  school_id: string;
  workflow_name: string;
  model_id: string;
  current_phase: ModelLifecyclePhase;
  phases: LifecyclePhaseStatus[];
  started_at: string;
  completed_at: string | null;
  status: string;
}

export interface LifecyclePhaseStatus {
  phase: ModelLifecyclePhase;
  status: string;
  started_at: string;
  completed_at: string | null;
  reviewer: string;
  notes: string;
}

export interface GovernanceRoleAssignment {
  id: string;
  school_id: string;
  user_id: string;
  role: GovernanceRole;
  assigned_by: string;
  assigned_at: string;
  expires_at: string | null;
  permissions: ModelPermission[];
  is_active: boolean;
}

export interface ModelPerformanceTrend {
  id: string;
  model_id: string;
  metric_name: string;
  data_points: PerformanceDataPoint[];
  trend_direction: string;
  change_rate: number;
  alert_triggered: boolean;
  period: string;
}

export interface PerformanceDataPoint {
  timestamp: string;
  value: number;
  benchmark: number;
  is_anomaly: boolean;
}

export interface ComplianceRequirement {
  id: string;
  standard: ComplianceStandard;
  requirement_code: string;
  requirement_name: string;
  description: string;
  category: string;
  is_mandatory: boolean;
  evidence_required: string[];
  assessment_criteria: string[];
}

export interface ComplianceRequirementMapping {
  id: string;
  requirement_id: string;
  control_id: string;
  control_description: string;
  implementation_status: string;
  evidence: string[];
  assessed_by: string;
  assessed_at: string;
}

export interface ModelRetirementPlan {
  id: string;
  school_id: string;
  model_id: string;
  retirement_reason: string;
  alternative_model_id: string | null;
  migration_plan: string;
  data_retention_plan: string;
  notification_recipients: string[];
  scheduled_date: string;
  completed_date: string | null;
  status: string;
  created_at: string;
}

export interface IncidentResponsePlan {
  id: string;
  school_id: string;
  incident_type: string;
  severity_levels: IncidentSeverity[];
  response_steps: IncidentResponseStep[];
  escalation_matrix: EscalationMatrixEntry[];
  communication_plan: CommunicationPlan;
  post_incident_review_required: boolean;
  last_tested: string;
  status: string;
}

export interface IncidentResponseStep {
  step_order: number;
  step_name: string;
  description: string;
  responsible_role: string;
  time_limit_minutes: number;
  required_actions: string[];
}

export interface EscalationMatrixEntry {
  severity: IncidentSeverity;
  notify_roles: string[];
  time_limit_minutes: number;
  auto_escalate: boolean;
}

export interface CommunicationPlan {
  internal_communication: string[];
  external_communication: string[];
  media_response: string;
  regulatory_notification: string;
  template_messages: Record<string, string>;
}

export interface AIModelBenchmark {
  id: string;
  model_id: string;
  benchmark_name: string;
  dataset_name: string;
  metrics: ModelPerformanceMetrics;
  fairness_metrics: ModelFairnessMetrics;
  comparison_to_state_of_art: number;
  rank: number;
  evaluated_at: string;
  evaluator: string;
}

export interface ModelTrainingAudit {
  id: string;
  model_id: string;
  training_job_id: string;
  dataset_hash: string;
  dataset_size: number;
  feature_count: number;
  training_duration_seconds: number;
  hyperparameters: Record<string, unknown>;
  final_metrics: ModelPerformanceMetrics;
  data_lineage: DataLineageEntry[];
  audited_at: string;
}

export interface DataLineageEntry {
  source: string;
  transformation: string;
  timestamp: string;
  record_count: number;
}

export interface GovernancePolicyTemplate {
  id: string;
  template_name: string;
  template_type: PolicyType;
  description: string;
  content: string;
  version: string;
  applicable_standards: ComplianceStandard[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ModelExplainabilityReport {
  id: string;
  model_id: string;
  report_type: string;
  global_feature_importance: GlobalExplanation[];
  local_explanations: LocalExplanation[];
  counterfactual_analysis: CounterfactualExample[];
  model_behavior_summary: string;
  transparency_score: number;
  generated_at: string;
}

export interface GovernanceDashboard {
  id: string;
  school_id: string;
  total_models_governed: number;
  active_policies: number;
  compliance_score: number;
  risk_score: number;
  pending_actions: number;
  recent_approvals: HumanApproval[];
  recent_incidents: ModelIncident[];
  governance_health: GovernanceHealthMetrics;
  last_updated: string;
}

export interface GovernanceHealthMetrics {
  model_registry_health: number;
  policy_compliance_health: number;
  audit_coverage_health: number;
  bias_monitoring_health: number;
  risk_management_health: number;
  overall_health: number;
}

export interface ConsentManagement {
  id: string;
  school_id: string;
  data_subject_id: string;
  consent_type: ConsentType;
  purposes: string[];
  data_categories: string[];
  granted_at: string;
  expires_at: string | null;
  revoked_at: string | null;
  is_active: boolean;
  consent_version: string;
}

export interface DataProcessingRecord {
  id: string;
  school_id: string;
  processing_activity: string;
  purpose: string;
  data_categories: string[];
  data_subjects: string[];
  legal_basis: string;
  retention_period: string;
  recipients: string[];
  transfers: DataTransfer[];
  security_measures: string[];
  created_at: string;
  updated_at: string;
}

export interface DataTransfer {
  destination: string;
  country: string;
  safeguard: string;
  legal_mechanism: string;
}

export interface ModelCardTemplate {
  id: string;
  template_name: string;
  model_type: ModelType;
  required_sections: ModelCardSection[];
  optional_sections: ModelCardSection[];
  custom_fields: CustomField[];
  created_at: string;
}

export interface CustomField {
  field_name: string;
  field_type: string;
  required: boolean;
  description: string;
  default_value: string | null;
}

export interface GovernanceEventLog {
  id: string;
  school_id: string;
  event_type: string;
  entity_type: string;
  entity_id: string;
  actor_id: string;
  actor_role: string;
  event_details: Record<string, unknown>;
  timestamp: string;
}

export interface ModelServingConfig {
  id: string;
  model_id: string;
  endpoint_url: string;
  max_concurrent_requests: number;
  timeout_ms: number;
  auto_scaling: boolean;
  min_replicas: number;
  max_replicas: number;
  gpu_required: boolean;
  monitoring_enabled: boolean;
  status: string;
  created_at: string;
}

export interface ABTestConfig {
  id: string;
  school_id: string;
  test_name: string;
  model_a_id: string;
  model_b_id: string;
  traffic_split: number;
  metrics_tracked: string[];
  duration_days: number;
  statistical_significance_threshold: number;
  start_date: string;
  end_date: string | null;
  winner_model_id: string | null;
  status: string;
}

export interface ABTestResult {
  id: string;
  test_id: string;
  model_a_metrics: ModelPerformanceMetrics;
  model_b_metrics: ModelPerformanceMetrics;
  winner: string;
  confidence_level: number;
  p_value: number;
  statistical_significance: boolean;
  generated_at: string;
}

export interface GovernanceChecklist {
  id: string;
  school_id: string;
  checklist_name: string;
  items: GovernanceChecklistItem[];
  completion_rate: number;
  last_completed: string;
  next_due: string;
}

export interface GovernanceChecklistItem {
  item_id: string;
  description: string;
  is_mandatory: boolean;
  is_completed: boolean;
  completed_by: string | null;
  completed_at: string | null;
  evidence: string;
}

export interface ModelRiskMatrix {
  id: string;
  school_id: string;
  model_id: string;
  likelihood: number;
  impact: number;
  risk_score: number;
  risk_level: RiskLevel;
  controls: RiskControl[];
  residual_risk: number;
  assessed_at: string;
}

export interface RiskControl {
  control_id: string;
  control_name: string;
  control_type: string;
  effectiveness: number;
  status: string;
}
