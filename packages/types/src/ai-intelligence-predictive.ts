export enum PredictionType {
  ACADEMIC_SUCCESS = 'academic_success',
  ACADEMIC_FAILURE = 'academic_failure',
  DROPOUT = 'dropout',
  ABANDON = 'abandon',
  VIOLENCE = 'violence',
  ABSENTEEISM = 'absenteeism',
  FRAUD = 'fraud',
  FINANCIAL_RISK = 'financial_risk',
  BUDGET_FORECAST = 'budget_forecast',
  ENROLLMENT_FORECAST = 'enrollment_forecast',
  RECRUITMENT_FORECAST = 'recruitment_forecast',
  TEACHER_NEED = 'teacher_need',
  CLASSROOM_NEED = 'classroom_need',
  MATERIAL_NEED = 'material_need'
}

export enum RiskCategory {
  ACADEMIC = 'academic',
  HR = 'hr',
  FINANCIAL = 'financial',
  LEGAL = 'legal',
  SECURITY = 'security',
  INFRASTRUCTURE = 'infrastructure',
  HEALTH = 'health',
  COMPLIANCE = 'compliance'
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum RiskStatus {
  IDENTIFIED = 'identified',
  ASSESSED = 'assessed',
  MITIGATED = 'mitigated',
  ACCEPTED = 'accepted',
  ESCALATED = 'escalated',
  RESOLVED = 'resolved'
}

export enum WarningType {
  STUDENT_AT_RISK = 'student_at_risk',
  TEACHER_IN_DIFFICULTY = 'teacher_in_difficulty',
  LOW_PERFORMANCE_CLASS = 'low_performance_class',
  FINANCIAL_DECLINE = 'financial_decline',
  ABSENTEEISM_EPIDEMIC = 'absenteeism_epidemic',
  POTENTIAL_FRAUD = 'potential_fraud',
  CYBER_ATTACK = 'cyber_attack',
  SECURITY_INCIDENT = 'security_incident'
}

export enum WarningSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum WarningStatus {
  ACTIVE = 'active',
  ACKNOWLEDGED = 'acknowledged',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  ESCALATED = 'escalated',
  DISMISSED = 'dismissed'
}

export enum MitigationStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  EFFECTIVE = 'effective',
  INEFFECTIVE = 'ineffective'
}

export enum PredictionConfidence {
  VERY_LOW = 'very_low',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export interface PredictiveModel {
  id: string;
  name: string;
  type: PredictionType;
  version: string;
  accuracy: number;
  last_trained_at: string;
  training_data_size: number;
  features: string[];
  hyperparameters: Record<string, unknown>;
  status: string;
  created_at: string;
}

export interface PredictionResult {
  id: string;
  model_id: string;
  school_id: string;
  entity_type: string;
  entity_id: string;
  prediction: Record<string, unknown>;
  confidence: PredictionConfidence;
  probability: number;
  factors: string[];
  explanation: string;
  generated_at: string;
}

export interface AcademicSuccessPrediction {
  id: string;
  school_id: string;
  student_id: string;
  success_probability: number;
  risk_factors: string[];
  recommended_actions: string[];
  confidence: PredictionConfidence;
  period: string;
}

export interface AcademicFailurePrediction {
  id: string;
  school_id: string;
  student_id: string;
  failure_probability: number;
  risk_factors: string[];
  early_warning_signals: string[];
  interventions: string[];
  confidence: PredictionConfidence;
}

export interface DropoutPrediction {
  id: string;
  school_id: string;
  student_id: string;
  dropout_probability: number;
  risk_factors: string[];
  warning_signals: string[];
  intervention_plan: string;
  confidence: PredictionConfidence;
  timeframe: string;
}

export interface AbandonPrediction {
  id: string;
  school_id: string;
  student_id: string;
  abandon_probability: number;
  risk_factors: string[];
  engagement_metrics: Record<string, number>;
  support_needed: string[];
  confidence: PredictionConfidence;
}

export interface ViolencePrediction {
  id: string;
  school_id: string;
  entity_id: string;
  entity_type: string;
  violence_probability: number;
  risk_factors: string[];
  indicators: string[];
  prevention_actions: string[];
  confidence: PredictionConfidence;
}

export interface AbsenteeismPrediction {
  id: string;
  school_id: string;
  student_id: string;
  absenteeism_probability: number;
  historical_pattern: Record<string, unknown>;
  risk_factors: string[];
  interventions: string[];
  confidence: PredictionConfidence;
}

export interface FraudPrediction {
  id: string;
  school_id: string;
  entity_type: string;
  entity_id: string;
  fraud_probability: number;
  suspicious_patterns: string[];
  risk_indicators: string[];
  investigation_actions: string[];
  confidence: PredictionConfidence;
}

export interface FinancialRiskPrediction {
  id: string;
  school_id: string;
  risk_type: string;
  probability: number;
  impact: number;
  factors: string[];
  mitigation_actions: string[];
  confidence: PredictionConfidence;
  timeframe: string;
}

export interface BudgetForecast {
  id: string;
  school_id: string;
  period: string;
  projected_revenue: number;
  projected_expenses: number;
  projected_balance: number;
  assumptions: string[];
  scenarios: Record<string, unknown>[];
  confidence: PredictionConfidence;
}

export interface EnrollmentForecast {
  id: string;
  school_id: string;
  period: string;
  projected_enrollment: number;
  growth_rate: number;
  factors: string[];
  scenarios: Record<string, unknown>[];
  capacity: number;
  confidence: PredictionConfidence;
}

export interface RecruitmentForecast {
  id: string;
  school_id: string;
  period: string;
  projected_hires: number;
  turnover_rate: number;
  skill_gaps: string[];
  budget: number;
  timeline: string;
  confidence: PredictionConfidence;
}

export interface TeacherNeedForecast {
  id: string;
  school_id: string;
  period: string;
  current_count: number;
  projected_need: number;
  shortage: number;
  subjects: string[];
  qualifications: string[];
  confidence: PredictionConfidence;
}

export interface ClassroomNeedForecast {
  id: string;
  school_id: string;
  period: string;
  current_capacity: number;
  projected_need: number;
  shortage: number;
  specifications: Record<string, unknown>;
  cost: number;
  confidence: PredictionConfidence;
}

export interface MaterialNeedForecast {
  id: string;
  school_id: string;
  period: string;
  current_inventory: number;
  projected_need: number;
  shortages: string[];
  budget: number;
  priority: string;
  confidence: PredictionConfidence;
}

export interface AIRisk {
  id: string;
  school_id: string;
  category: RiskCategory;
  title: string;
  description: string;
  probability: number;
  severity: number;
  impact: number;
  level: RiskLevel;
  status: RiskStatus;
  source: string;
  entity_type: string;
  entity_id: string;
  identified_at: string;
  assessed_at: string;
  mitigation_plan: MitigationPlan;
  owner: string;
  created_at: string;
}

export interface RiskFactor {
  id: string;
  risk_id: string;
  name: string;
  weight: number;
  score: number;
  description: string;
  source: string;
}

export interface RiskAssessment {
  id: string;
  risk_id: string;
  assessed_by: string;
  assessment_date: string;
  probability: number;
  severity: number;
  impact: number;
  level: RiskLevel;
  notes: string;
  next_review_date: string;
}

export interface MitigationPlan {
  id: string;
  risk_id: string;
  title: string;
  description: string;
  actions: MitigationAction[];
  status: MitigationStatus;
  owner: string;
  start_date: string;
  target_date: string;
  actual_date: string;
  effectiveness: number;
  cost: number;
}

export interface MitigationAction {
  id: string;
  plan_id: string;
  description: string;
  status: MitigationStatus;
  owner: string;
  due_date: string;
  completed_date: string;
  notes: string;
}

export interface RiskIndicator {
  id: string;
  school_id: string;
  name: string;
  category: RiskCategory;
  value: number;
  threshold: number;
  status: string;
  trend: string;
  last_checked: string;
}

export interface RiskEvent {
  id: string;
  risk_id: string;
  description: string;
  timestamp: string;
  impact: number;
  response: string;
  resolved: boolean;
}

export interface RiskReport {
  id: string;
  school_id: string;
  period: string;
  total_risks: number;
  risks_by_category: Record<string, number>;
  risks_by_level: Record<string, number>;
  new_risks: number;
  resolved_risks: number;
  top_risks: AIRisk[];
  generated_at: string;
}

export interface EarlyWarning {
  id: string;
  school_id: string;
  type: WarningType;
  severity: WarningSeverity;
  status: WarningStatus;
  title: string;
  description: string;
  entity_type: string;
  entity_id: string;
  indicators: WarningIndicator[];
  score: number;
  assigned_to: string;
  acknowledged_at: string;
  resolved_at: string;
  escalation_level: number;
  created_at: string;
}

export interface WarningIndicator {
  id: string;
  warning_id: string;
  name: string;
  value: number;
  threshold: number;
  direction: string;
  weight: number;
  source: string;
}

export interface WarningRule {
  id: string;
  school_id: string;
  name: string;
  type: WarningType;
  conditions: Record<string, unknown>;
  severity: WarningSeverity;
  actions: string[];
  enabled: boolean;
  last_triggered: string;
}

export interface WarningEscalation {
  id: string;
  warning_id: string;
  level: number;
  escalate_to: string;
  reason: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface WarningNotification {
  id: string;
  warning_id: string;
  channel: string;
  recipient: string;
  sent_at: string;
  read_at: string;
  acknowledged: boolean;
}

export interface StudentAtRisk {
  id: string;
  school_id: string;
  student_id: string;
  risk_type: string;
  risk_score: number;
  indicators: string[];
  interventions: string[];
  assigned_to: string;
  status: string;
  identified_at: string;
}

export interface TeacherInDifficulty {
  id: string;
  school_id: string;
  teacher_id: string;
  difficulty_type: string;
  risk_score: number;
  indicators: string[];
  support_plan: string;
  assigned_to: string;
  status: string;
  identified_at: string;
}

export interface LowPerformanceClass {
  id: string;
  school_id: string;
  class_id: string;
  performance_score: number;
  subjects: string[];
  indicators: string[];
  improvement_plan: string;
  assigned_to: string;
  status: string;
  identified_at: string;
}

export interface FinancialDecline {
  id: string;
  school_id: string;
  decline_type: string;
  severity: WarningSeverity;
  indicators: string[];
  trend: string;
  recovery_plan: string;
  assigned_to: string;
  status: string;
  identified_at: string;
}

export interface AbsenteeismEpidemic {
  id: string;
  school_id: string;
  affected_count: number;
  percentage: number;
  grade_level: string;
  subjects: string[];
  pattern: string;
  intervention_plan: string;
  status: string;
  identified_at: string;
}

export interface PotentialFraud {
  id: string;
  school_id: string;
  fraud_type: string;
  severity: WarningSeverity;
  evidence: string[];
  suspects: string[];
  investigation_plan: string;
  status: string;
  identified_at: string;
}

export interface CyberAttack {
  id: string;
  school_id: string;
  attack_type: string;
  severity: WarningSeverity;
  affected_systems: string[];
  data_compromised: boolean;
  response_plan: string;
  status: string;
  identified_at: string;
}

export interface SecurityIncident {
  id: string;
  school_id: string;
  incident_type: string;
  severity: WarningSeverity;
  location: string;
  affected_persons: string[];
  response_actions: string[];
  status: string;
  identified_at: string;
}
