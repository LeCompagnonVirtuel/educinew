export enum HealthAIModelType {
  RISK_PREDICTION = "risk_prediction",
  ANOMALY_DETECTION = "anomaly_detection",
  CLASSIFICATION = "classification",
  CLUSTERING = "clustering",
  REGRESSION = "regression",
  NATURAL_LANGUAGE = "natural_language",
  COMPUTER_VISION = "computer_vision",
  RECOMMENDATION = "recommendation",
}

export enum PredictionType {
  DROPOUT_RISK = "dropout_risk",
  WELLBEING_RISK = "wellbeing_risk",
  SAFEGUARDING_RISK = "safeguarding_risk",
  BULLYING_RISK = "bullying_risk",
  INCIDENT_RISK = "incident_risk",
  ATTENDANCE_RISK = "attendance_risk",
  HEALTH_RISK = "health_risk",
  SAFETY_RISK = "safety_risk",
  ACADEMIC_RISK = "academic_risk",
  BEHAVIORAL_RISK = "behavioral_risk",
}

export enum ConfidenceLevel {
  VERY_LOW = "very_low",
  LOW = "low",
  MODERATE = "moderate",
  HIGH = "high",
  VERY_HIGH = "very_high",
}

export enum BiasType {
  GENDER = "gender",
  ETHNICITY = "ethnicity",
  SOCIOECONOMIC = "socioeconomic",
  DISABILITY = "disability",
  AGE = "age",
  GEOGRAPHIC = "geographic",
  LANGUAGE = "language",
  RELIGION = "religion",
}

export enum ReviewStatus {
  PENDING = "pending",
  UNDER_REVIEW = "under_review",
  APPROVED = "approved",
  REJECTED = "rejected",
  NEEDS_REVISION = "needs_revision",
  ESCALATED = "escalated",
}

export enum OverrideAction {
  ACCEPT = "accept",
  MODIFY = "modify",
  REJECT = "reject",
  ESCALATE = "escalate",
  FLAG = "flag",
  DISMISS = "dismiss",
}

export enum ModelVersion {
  V1 = "v1",
  V2 = "v2",
  V3 = "v3",
  BETA = "beta",
  ARCHIVED = "archived",
}

export enum ExplainabilityLevel {
  NONE = "none",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  FULL = "full",
}

export enum AIServiceType {
  RISK_SCORING = "risk_scoring",
  EARLY_WARNING = "early_warning",
  RESOURCE_OPTIMIZATION = "resource_optimization",
  PATTERN_DETECTION = "pattern_detection",
  ANOMALY_ALERT = "anomaly_alert",
}

export enum ModelRetrainingTrigger {
  SCHEDULED = "scheduled",
  PERFORMANCE_DEGRADATION = "performance_degradation",
  DATA_DRIFT = "data_drift",
  BIAS_DETECTED = "bias_detected",
  REGULATORY_CHANGE = "regulatory_change",
}

export interface StudentRiskPrediction {
  id: string;
  school_id: string;
  student_id: string;
  model_id: string;
  prediction_type: PredictionType;
  risk_score: number;
  confidence_level: ConfidenceLevel;
  risk_factors: AIPredictionFactor[];
  explanations: AIPredictionExplanation[];
  recommended_actions: string[];
  predicted_date: string;
  valid_until: string;
  human_reviewed: boolean;
  reviewed_by: string;
  review_status: ReviewStatus;
  override_action: OverrideAction;
  override_reason: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface DropoutRiskSupport {
  id: string;
  school_id: string;
  student_id: string;
  prediction_id: string;
  risk_score: number;
  attendance_factor: number;
  academic_factor: number;
  behavioral_factor: number;
  socioeconomic_factor: number;
  family_factor: number;
  peer_factor: number;
  early_warning_signs: string[];
  intervention_recommended: string[];
  support_services: string[];
  monitoring_frequency: string;
  assigned_counselor: string;
  parent_engagement: boolean;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface WellbeingRiskDetection {
  id: string;
  school_id: string;
  student_id: string;
  prediction_id: string;
  risk_score: number;
  wellbeing_dimension: string;
  indicators: string[];
  severity: string;
  trend: string;
  historical_data: number[];
  recommended_interventions: string[];
  counselor_referral: boolean;
  parent_notification: boolean;
  confidentiality_level: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SafeguardingRiskDetection {
  id: string;
  school_id: string;
  student_id: string;
  prediction_id: string;
  risk_score: number;
  concern_types: string[];
  vulnerability_indicators: string[];
  severity: string;
  urgency: string;
  referral_required: boolean;
  agency_referral: string;
  confidential_handling: boolean;
  access_level: string;
  assigned_safeguarding_lead: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BullyingRiskDetection {
  id: string;
  school_id: string;
  prediction_id: string;
  risk_score: number;
  bullying_type_risk: string[];
  victim_indicators: string[];
  perpetrator_indicators: string[];
  environmental_factors: string[];
  intervention_urgency: string;
  recommended_prevention: string[];
  monitoring_plan: string;
  anonymous_reporting_encouraged: boolean;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface IncidentRiskPrediction {
  id: string;
  school_id: string;
  prediction_id: string;
  risk_score: number;
  incident_type_risk: string[];
  location_risk_factors: string[];
  time_risk_factors: string[];
  resource_gaps: string[];
  prevention_measures: string[];
  emergency_preparedness_score: number;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AttendanceWellbeingCorrelation {
  id: string;
  school_id: string;
  student_id: string;
  correlation_score: number;
  attendance_pattern: string;
  wellbeing_pattern: string;
  correlation_factors: string[];
  intervention_recommendations: string[];
  monitoring_frequency: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface HealthResourceForecast {
  id: string;
  school_id: string;
  forecast_type: string;
  period_start: string;
  period_end: string;
  predicted_demand: Record<string, number>;
  current_capacity: Record<string, number>;
  gap_analysis: Record<string, number>;
  resource_recommendations: string[];
  budget_implications: number;
  confidence_level: ConfidenceLevel;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SchoolSafetyRisk {
  id: string;
  school_id: string;
  risk_category: string;
  risk_description: string;
  risk_score: number;
  likelihood: number;
  impact: number;
  current_controls: string[];
  control_effectiveness: number;
  recommended_improvements: string[];
  responsible_person: string;
  review_date: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyImpactPrediction {
  id: string;
  school_id: string;
  emergency_type: string;
  predicted_impact_score: number;
  affected_population: number;
  resource_requirements: Record<string, number>;
  response_time_prediction: number;
  recovery_time_prediction: number;
  critical_dependencies: string[];
  mitigation_strategies: string[];
  communication_plan_needed: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AIHealthModel {
  id: string;
  school_id: string;
  model_name: string;
  model_type: HealthAIModelType;
  version: ModelVersion;
  description: string;
  training_data_size: number;
  accuracy_score: number;
  precision_score: number;
  recall_score: number;
  f1_score: number;
  bias_checks: AIBiasCheck[];
  explainability_level: ExplainabilityLevel;
  last_trained: string;
  next_retraining: string;
  deployment_status: string;
  model_path: string;
  feature_importance: Record<string, number>;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AIPrediction {
  id: string;
  school_id: string;
  model_id: string;
  prediction_type: string;
  input_data: Record<string, string>;
  output_data: Record<string, string>;
  confidence_score: number;
  prediction_date: string;
  valid_until: string;
  factors: AIPredictionFactor[];
  explanations: AIPredictionExplanation[];
  human_override: boolean;
  override_by: string;
  override_action: OverrideAction;
  override_reason: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AIPredictionFactor {
  id: string;
  prediction_id: string;
  factor_name: string;
  factor_value: string;
  importance_weight: number;
  direction: string;
  description: string;
}

export interface AIPredictionExplanation {
  id: string;
  prediction_id: string;
  explanation_type: string;
  explanation_text: string;
  confidence: number;
  supporting_evidence: string[];
  limitations: string[];
}

export interface AIBiasCheck {
  id: string;
  model_id: string;
  bias_type: BiasType;
  check_date: string;
  metric_name: string;
  metric_value: number;
  threshold: number;
  is_biased: boolean;
  severity: string;
  mitigation_applied: string[];
  mitigation_effectiveness: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AIModelAudit {
  id: string;
  school_id: string;
  model_id: string;
  audit_type: string;
  audit_date: string;
  auditor: string;
  audit_scope: string[];
  findings: string[];
  compliance_score: number;
  bias_assessment: string;
  performance_assessment: string;
  security_assessment: string;
  privacy_assessment: string;
  recommendations: string[];
  corrective_actions: string[];
  next_audit_date: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface HumanReviewRequest {
  id: string;
  school_id: string;
  prediction_id: string;
  requested_by: string;
  request_date: string;
  reason: string;
  urgency: string;
  assigned_reviewer: string;
  review_status: ReviewStatus;
  review_date: string;
  review_decision: OverrideAction;
  decision_reasoning: string;
  supporting_evidence: string[];
  model_adjustment_required: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}
