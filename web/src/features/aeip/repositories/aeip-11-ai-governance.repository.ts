import { SupabaseClient } from '@supabase/supabase-js';
import { AppError, NotFoundError, ValidationError } from '@educi/errors';
import { CrudRepository, CrudRepositoryImpl, createCrudRepository } from './aeip-base.repository';

// ═══════════════════════════════════════════════════════════════════════
// AEIP-11 AI GOVERNANCE — Repository
// Éthique, conformité, transparence, risques, audits, régulation
// Table prefix: agv
// ═══════════════════════════════════════════════════════════════════════

// ── AI Governance Framework ──
export interface AgvGovernancePolicy {
  id: string;
  school_id: string;
  policy_name: string;
  policy_type: 'ai_ethics' | 'data_privacy' | 'algorithmic_fairness' | 'transparency' | 'accountability' | 'safety' | 'security' | 'compliance';
  version: string;
  status: 'draft' | 'review' | 'active' | 'archived' | 'superseded';
  effective_date: string;
  review_date: string;
  approved_by: string | null;
  approved_at: string | null;
  content_markdown: string;
  principles: Record<string, unknown>[];
  requirements: Record<string, unknown>[];
  applies_to: string[];
  enforcement_level: 'advisory' | 'mandatory' | 'strict';
  violation_consequences: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvGovernancePolicyVersion {
  id: string;
  school_id: string;
  policy_id: string;
  version_number: number;
  changelog: string;
  content_markdown: string;
  author_id: string;
  status: 'draft' | 'approved' | 'active';
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── AI Model Registry ──
export interface AgvAIModelRegistry {
  id: string;
  school_id: string;
  model_name: string;
  model_type: 'llm' | 'vision' | 'nlp' | 'recommendation' | 'prediction' | 'generative' | 'classification' | 'clustering' | 'custom';
  provider: string;
  version: string;
  description: string;
  use_case: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  status: 'registered' | 'approved' | 'in_use' | 'deprecated' | 'blocked';
  registered_by: string;
  approved_by: string | null;
  approved_at: string | null;
  training_data_description: string;
  training_data_sources: string[];
  training_data_size: string;
  input_modalities: string[];
  output_modalities: string[];
  context_window: number | null;
  parameters_count: string | null;
  license: string;
  cost_per_1k_tokens: number | null;
  api_endpoint: string | null;
  api_key_vault_id: string | null;
  rate_limit_rpm: number | null;
  rate_limit_tpm: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvModelEvaluation {
  id: string;
  school_id: string;
  model_id: string;
  evaluation_name: string;
  evaluation_type: 'accuracy' | 'bias' | 'fairness' | 'safety' | 'robustness' | 'latency' | 'cost' | 'comprehensive';
  evaluator: 'internal' | 'external' | 'automated' | 'third_party';
  test_dataset: string;
  test_size: number;
  results: Record<string, unknown>;
  overall_score: number;
  bias_scores: Record<string, number>;
  fairness_metrics: Record<string, number>;
  safety_score: number;
  recommendations: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  completed_at: string | null;
  next_evaluation_date: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvModelUsage {
  id: string;
  school_id: string;
  model_id: string;
  feature_id: string | null;
  service_id: string | null;
  usage_type: 'inference' | 'training' | 'fine_tuning' | 'evaluation';
  request_count: number;
  token_input_total: number;
  token_output_total: number;
  avg_latency_ms: number;
  error_rate: number;
  total_cost: number;
  period_start: string;
  period_end: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Bias Detection ──
export interface AgvBiasScan {
  id: string;
  school_id: string;
  model_id: string;
  scan_name: string;
  scan_type: 'demographic_parity' | 'equal_opportunity' | 'predictive_parity' | 'disparate_impact' | 'calibration' | 'counterfactual';
  protected_attributes: string[];
  dataset_used: string;
  sample_size: number;
  status: 'queued' | 'running' | 'completed' | 'failed';
  overall_bias_score: number;
  bias_detected: boolean;
  bias_details: Record<string, unknown>[];
  protected_group_results: Record<string, unknown>[];
  recommendations: string[];
  started_at: string;
  completed_at: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvBiasIncident {
  id: string;
  school_id: string;
  scan_id: string | null;
  model_id: string;
  incident_type: 'demographic_bias' | 'proxy_discrimination' | 'historical_bias' | 'measurement_bias' | 'aggregation_bias' | 'evaluation_bias';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'detected' | 'investigating' | 'mitigating' | 'resolved' | 'accepted_risk';
  description: string;
  affected_groups: string[];
  affected_users_count: number;
  impact_assessment: string;
  mitigation_actions: Record<string, unknown>[];
  root_cause: string | null;
  resolved_by: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvFairnessMetric {
  id: string;
  school_id: string;
  model_id: string;
  metric_name: string;
  metric_type: string;
  threshold: number;
  current_value: number;
  status: 'pass' | 'warn' | 'fail';
  trend: 'improving' | 'stable' | 'degrading';
  history: Record<string, unknown>[];
  last_evaluated_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Transparency ──
export interface AgvTransparencyReport {
  id: string;
  school_id: string;
  report_name: string;
  report_type: 'model_card' | 'impact_assessment' | 'public_disclosure' | 'regulatory_filing' | 'internal_audit';
  model_id: string | null;
  feature_id: string | null;
  reporting_period_start: string;
  reporting_period_end: string;
  status: 'draft' | 'review' | 'published' | 'archived';
  content: Record<string, unknown>;
  public_url: string | null;
  audience: 'internal' | 'public' | 'regulator' | 'board';
  published_at: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvModelCard {
  id: string;
  school_id: string;
  model_id: string;
  card_version: string;
  intended_use: string;
  out_of_scope_uses: string[];
  model_description: string;
  training_data_description: string;
  evaluation_results: Record<string, unknown>;
  ethical_considerations: string[];
  limitations: string[];
  recommendations: string[];
  maintenance_plan: string;
  last_updated: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvExplainabilityRecord {
  id: string;
  school_id: string;
  model_id: string;
  request_id: string;
  input_data: Record<string, unknown>;
  prediction: Record<string, unknown>;
  explanation_method: 'shap' | 'lime' | 'attention' | 'counterfactual' | 'feature_importance' | 'rule_extraction';
  explanation: Record<string, unknown>;
  key_factors: Record<string, unknown>[];
  confidence_score: number;
  human_readable_summary: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Risk Management ──
export interface AgvRiskAssessment {
  id: string;
  school_id: string;
  model_id: string | null;
  feature_id: string | null;
  risk_category: 'bias' | 'privacy' | 'safety' | 'security' | 'reliability' | 'compliance' | 'reputational' | 'financial';
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  risk_title: string;
  risk_description: string;
  likelihood: 'rare' | 'unlikely' | 'possible' | 'likely' | 'certain';
  impact: 'negligible' | 'minor' | 'moderate' | 'major' | 'severe';
  risk_score: number;
  existing_controls: string[];
  residual_risk: string;
  mitigation_plan: Record<string, unknown>[];
  risk_owner: string;
  review_frequency: string;
  next_review_date: string;
  status: 'open' | 'mitigated' | 'accepted' | 'closed';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvRiskEvent {
  id: string;
  school_id: string;
  risk_assessment_id: string;
  event_type: 'realized' | 'near_miss' | 'new_risk' | 'change' | 'escalation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact_description: string;
  detection_method: string;
  reported_by: string;
  reported_at: string;
  resolution_actions: Record<string, unknown>[];
  resolved: boolean;
  resolved_at: string | null;
  lessons_learned: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvRiskMatrix {
  id: string;
  school_id: string;
  matrix_name: string;
  likelihood_levels: string[];
  impact_levels: string[];
  score_thresholds: Record<string, number>;
  color_mapping: Record<string, string>;
  is_default: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Accountability ──
export interface AgvAccountabilityMatrix {
  id: string;
  school_id: string;
  matrix_name: string;
  ai_system_id: string;
  roles: Record<string, unknown>[];
  decision_rights: Record<string, unknown>[];
  escalation_paths: Record<string, unknown>[];
  approval_workflows: Record<string, unknown>[];
  is_active: boolean;
  version: number;
  effective_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvApprovalWorkflow {
  id: string;
  school_id: string;
  workflow_name: string;
  trigger_type: 'model_deployment' | 'data_access' | 'policy_change' | 'feature_release' | 'procurement';
  steps: Record<string, unknown>[];
  required_approvers: number;
  timeout_hours: number;
  auto_escalate: boolean;
  is_active: boolean;
  completed_count: number;
  avg_completion_hours: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvApprovalRequest {
  id: string;
  school_id: string;
  workflow_id: string;
  requester_id: string;
  request_type: string;
  title: string;
  description: string;
  data_payload: Record<string, unknown>;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'expired';
  current_step: number;
  approvals: Record<string, unknown>[];
  decision: string | null;
  decision_by: string | null;
  decision_at: string | null;
  expires_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Audit ──
export interface AgvAIAudit {
  id: string;
  school_id: string;
  audit_name: string;
  audit_type: 'comprehensive' | 'targeted' | 'periodic' | 'triggered' | 'regulatory';
  scope: string[];
  model_ids: string[];
  feature_ids: string[];
  auditor_id: string;
  auditor_type: 'internal' | 'external' | 'regulator' | 'automated';
  status: 'planned' | 'in_progress' | 'findings' | 'report' | 'closed';
  start_date: string;
  end_date: string | null;
  findings_count: number;
  critical_findings: number;
  high_findings: number;
  medium_findings: number;
  low_findings: number;
  report_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvAuditFinding {
  id: string;
  school_id: string;
  audit_id: string;
  finding_number: string;
  category: 'compliance' | 'bias' | 'privacy' | 'security' | 'reliability' | 'governance' | 'documentation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  evidence: Record<string, unknown>[];
  affected_systems: string[];
  affected_users_count: number;
  root_cause: string;
  recommendation: string;
  remediation_plan: Record<string, unknown>;
  due_date: string;
  assigned_to: string;
  status: 'open' | 'in_progress' | 'remediated' | 'verified' | 'accepted' | 'risk_accepted';
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvAuditTrail {
  id: string;
  school_id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  actor_id: string;
  actor_type: 'user' | 'system' | 'ai_agent';
  changes: Record<string, unknown>;
  context: Record<string, unknown>;
  ip_address: string;
  timestamp: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Regulatory Compliance ──
export interface AgvRegulation {
  id: string;
  school_id: string;
  regulation_name: string;
  regulation_type: 'gdpr' | 'ai_act' | 'local_ai' | 'education_data' | 'children_privacy' | 'accessibility' | 'sector_specific';
  jurisdiction: string;
  status: 'monitoring' | 'compliant' | 'partially_compliant' | 'non_compliant' | 'not_applicable';
  requirements: Record<string, unknown>[];
  compliance_evidence: Record<string, unknown>[];
  last_assessed_date: string;
  next_assessment_date: string;
  assessor_id: string;
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvComplianceRequirement {
  id: string;
  school_id: string;
  regulation_id: string;
  requirement_code: string;
  requirement_text: string;
  requirement_type: 'mandatory' | 'recommended' | 'optional';
  ai_relevance: string;
  implementation_status: 'implemented' | 'in_progress' | 'planned' | 'not_started' | 'not_applicable';
  evidence_items: Record<string, unknown>[];
  responsible_person: string;
  due_date: string | null;
  last_reviewed: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvDataProcessingRecord {
  id: string;
  school_id: string;
  processing_activity: string;
  purpose: string;
  legal_basis: string;
  data_categories: string[];
  data_subjects: string[];
  recipients: string[];
  retention_period: string;
  security_measures: string[];
  cross_border_transfer: boolean;
  transfer_countries: string[];
  dpia_required: boolean;
  dpia_completed: boolean;
  status: 'active' | 'inactive' | 'under_review';
  controller_id: string;
  processor_ids: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Incident Management ──
export interface AgvAIIncident {
  id: string;
  school_id: string;
  incident_number: string;
  incident_type: 'model_failure' | 'bias_detected' | 'data_breach' | 'safety_violation' | 'hallucination' | 'misuse' | 'unauthorized_access';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'triaging' | 'investigating' | 'remediating' | 'resolved' | 'post_mortem';
  title: string;
  description: string;
  affected_model_ids: string[];
  affected_feature_ids: string[];
  affected_users_count: number;
  reported_by: string;
  reported_at: string;
  detected_at: string | null;
  detection_source: string;
  timeline: Record<string, unknown>[];
  impact_assessment: Record<string, unknown>;
  root_cause: string | null;
  remediation_actions: Record<string, unknown>[];
  prevention_measures: string[];
  post_mortem_url: string | null;
  regulatory_notification_required: boolean;
  regulatory_notification_sent: boolean;
  resolved_at: string | null;
  resolved_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvIncidentTimeline {
  id: string;
  school_id: string;
  incident_id: string;
  event_type: 'created' | 'escalated' | 'assigned' | 'update' | 'status_change' | 'resolved' | 'closed';
  actor_id: string;
  actor_name: string;
  description: string;
  metadata: Record<string, unknown>;
  timestamp: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Ethics Review ──
export interface AgvEthicsReview {
  id: string;
  school_id: string;
  review_name: string;
  review_type: 'model_deployment' | 'feature_launch' | 'data_collection' | 'research_project' | 'procurement';
  target_id: string;
  target_type: string;
  status: 'submitted' | 'in_review' | 'approved' | 'conditional' | 'rejected' | 'deferred';
  reviewer_id: string;
  committee_id: string | null;
  submission_date: string;
  review_date: string | null;
  decision_date: string | null;
  ethical_considerations: Record<string, unknown>[];
  risk_assessment: Record<string, unknown>;
  conditions: string[];
  decision_notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvEthicsCommittee {
  id: string;
  school_id: string;
  committee_name: string;
  committee_type: 'ai_ethics' | 'research_ethics' | 'data_governance' | 'technology_oversight';
  member_ids: string[];
  chair_id: string;
  meeting_frequency: string;
  quorum_requirement: number;
  decisions_count: number;
  last_meeting_date: string | null;
  next_meeting_date: string | null;
  is_active: boolean;
  charter_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvEthicsTraining {
  id: string;
  school_id: string;
  training_name: string;
  training_type: 'ai_ethics' | 'data_privacy' | 'bias_awareness' | 'responsible_ai' | 'security_awareness';
  content_url: string | null;
  duration_minutes: number;
  required_roles: string[];
  completion_deadline: string | null;
  total_enrolled: number;
  total_completed: number;
  completion_rate: number;
  avg_score: number;
  is_mandatory: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvEthicsTrainingCompletion {
  id: string;
  school_id: string;
  training_id: string;
  user_id: string;
  status: 'enrolled' | 'in_progress' | 'completed' | 'overdue' | 'exempt';
  started_at: string | null;
  completed_at: string | null;
  score: number | null;
  certificate_url: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Data Governance ──
export interface AgvDataClassification {
  id: string;
  school_id: string;
  classification_name: string;
  classification_level: 'public' | 'internal' | 'confidential' | 'restricted' | 'prohibited';
  description: string;
  color_code: string;
  handling_rules: Record<string, unknown>;
  retention_period: string;
  encryption_required: boolean;
  access_controls: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvDataAsset {
  id: string;
  school_id: string;
  asset_name: string;
  asset_type: 'database' | 'table' | 'column' | 'file' | 'api' | 'stream' | 'model';
  classification_id: string;
  owner_id: string;
  custodian_id: string;
  description: string;
  location: string;
  format: string;
  size_bytes: number;
  record_count: number | null;
  contains_pii: boolean;
  pii_fields: string[];
  ai_usage_allowed: boolean;
  ai_usage_restrictions: Record<string, unknown>;
  lineage_id: string | null;
  quality_score: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvDataLineage {
  id: string;
  school_id: string;
  asset_id: string;
  source_assets: string[];
  target_assets: string[];
  transformation_type: string;
  transformation_description: string;
  pipeline_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AgvConsentRecord {
  id: string;
  school_id: string;
  user_id: string;
  consent_type: 'data_collection' | 'ai_processing' | 'profiling' | 'third_party_sharing' | 'marketing' | 'research';
  purpose: string;
  status: 'granted' | 'withdrawn' | 'expired' | 'pending';
  granted_at: string | null;
  withdrawn_at: string | null;
  expiry_date: string | null;
  consent_evidence: string;
  ip_address: string;
  user_agent: string;
  version: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Table Name Map ──
export const AGV_TABLE_NAMES = {
  GOVERNANCE_POLICY: 'agv_governance_policies',
  GOVERNANCE_POLICY_VERSION: 'agv_governance_policy_versions',
  AI_MODEL_REGISTRY: 'agv_ai_model_registries',
  MODEL_EVALUATION: 'agv_model_evaluations',
  MODEL_USAGE: 'agv_model_usages',
  BIAS_SCAN: 'agv_bias_scans',
  BIAS_INCIDENT: 'agv_bias_incidents',
  FAIRNESS_METRIC: 'agv_fairness_metrics',
  TRANSPARENCY_REPORT: 'agv_transparency_reports',
  MODEL_CARD: 'agv_model_cards',
  EXPLAINABILITY_RECORD: 'agv_explainability_records',
  RISK_ASSESSMENT: 'agv_risk_assessments',
  RISK_EVENT: 'agv_risk_events',
  RISK_MATRIX: 'agv_risk_matrices',
  ACCOUNTABILITY_MATRIX: 'agv_accountability_matrices',
  APPROVAL_WORKFLOW: 'agv_approval_workflows',
  APPROVAL_REQUEST: 'agv_approval_requests',
  AI_AUDIT: 'agv_ai_audits',
  AUDIT_FINDING: 'agv_audit_findings',
  AUDIT_TRAIL: 'agv_audit_trails',
  REGULATION: 'agv_regulations',
  COMPLIANCE_REQUIREMENT: 'agv_compliance_requirements',
  DATA_PROCESSING_RECORD: 'agv_data_processing_records',
  AI_INCIDENT: 'agv_ai_incidents',
  INCIDENT_TIMELINE: 'agv_incident_timelines',
  ETHICS_REVIEW: 'agv_ethics_reviews',
  ETHICS_COMMITTEE: 'agv_ethics_committees',
  ETHICS_TRAINING: 'agv_ethics_trainings',
  ETHICS_TRAINING_COMPLETION: 'agv_ethics_training_completions',
  DATA_CLASSIFICATION: 'agv_data_classifications',
  DATA_ASSET: 'agv_data_assets',
  DATA_LINEAGE: 'agv_data_lineages',
  CONSENT_RECORD: 'agv_consent_records',
} as const;

// ── Repository Interface ──
export interface AEIP11Repository {
  governancePolicies: CrudRepository<AgvGovernancePolicy>;
  governancePolicyVersions: CrudRepository<AgvGovernancePolicyVersion>;
  aiModelRegistries: CrudRepository<AgvAIModelRegistry>;
  modelEvaluations: CrudRepository<AgvModelEvaluation>;
  modelUsages: CrudRepository<AgvModelUsage>;
  biasScans: CrudRepository<AgvBiasScan>;
  biasIncidents: CrudRepository<AgvBiasIncident>;
  fairnessMetrics: CrudRepository<AgvFairnessMetric>;
  transparencyReports: CrudRepository<AgvTransparencyReport>;
  modelCards: CrudRepository<AgvModelCard>;
  explainabilityRecords: CrudRepository<AgvExplainabilityRecord>;
  riskAssessments: CrudRepository<AgvRiskAssessment>;
  riskEvents: CrudRepository<AgvRiskEvent>;
  riskMatrices: CrudRepository<AgvRiskMatrix>;
  accountabilityMatrices: CrudRepository<AgvAccountabilityMatrix>;
  approvalWorkflows: CrudRepository<AgvApprovalWorkflow>;
  approvalRequests: CrudRepository<AgvApprovalRequest>;
  aiAudits: CrudRepository<AgvAIAudit>;
  auditFindings: CrudRepository<AgvAuditFinding>;
  auditTrails: CrudRepository<AgvAuditTrail>;
  regulations: CrudRepository<AgvRegulation>;
  complianceRequirements: CrudRepository<AgvComplianceRequirement>;
  dataProcessingRecords: CrudRepository<AgvDataProcessingRecord>;
  aiIncidents: CrudRepository<AgvAIIncident>;
  incidentTimelines: CrudRepository<AgvIncidentTimeline>;
  ethicsReviews: CrudRepository<AgvEthicsReview>;
  ethicsCommittees: CrudRepository<AgvEthicsCommittee>;
  ethicsTrainings: CrudRepository<AgvEthicsTraining>;
  ethicsTrainingCompletions: CrudRepository<AgvEthicsTrainingCompletion>;
  dataClassifications: CrudRepository<AgvDataClassification>;
  dataAssets: CrudRepository<AgvDataAsset>;
  dataLineages: CrudRepository<AgvDataLineage>;
  consentRecords: CrudRepository<AgvConsentRecord>;
}

// ── Factory Function ──
export function createAEIP11Repository(supabase: SupabaseClient): AEIP11Repository {
  return {
    governancePolicies: createCrudRepository<AgvGovernancePolicy>(supabase, AGV_TABLE_NAMES.GOVERNANCE_POLICY),
    governancePolicyVersions: createCrudRepository<AgvGovernancePolicyVersion>(supabase, AGV_TABLE_NAMES.GOVERNANCE_POLICY_VERSION),
    aiModelRegistries: createCrudRepository<AgvAIModelRegistry>(supabase, AGV_TABLE_NAMES.AI_MODEL_REGISTRY),
    modelEvaluations: createCrudRepository<AgvModelEvaluation>(supabase, AGV_TABLE_NAMES.MODEL_EVALUATION),
    modelUsages: createCrudRepository<AgvModelUsage>(supabase, AGV_TABLE_NAMES.MODEL_USAGE),
    biasScans: createCrudRepository<AgvBiasScan>(supabase, AGV_TABLE_NAMES.BIAS_SCAN),
    biasIncidents: createCrudRepository<AgvBiasIncident>(supabase, AGV_TABLE_NAMES.BIAS_INCIDENT),
    fairnessMetrics: createCrudRepository<AgvFairnessMetric>(supabase, AGV_TABLE_NAMES.FAIRNESS_METRIC),
    transparencyReports: createCrudRepository<AgvTransparencyReport>(supabase, AGV_TABLE_NAMES.TRANSPARENCY_REPORT),
    modelCards: createCrudRepository<AgvModelCard>(supabase, AGV_TABLE_NAMES.MODEL_CARD),
    explainabilityRecords: createCrudRepository<AgvExplainabilityRecord>(supabase, AGV_TABLE_NAMES.EXPLAINABILITY_RECORD),
    riskAssessments: createCrudRepository<AgvRiskAssessment>(supabase, AGV_TABLE_NAMES.RISK_ASSESSMENT),
    riskEvents: createCrudRepository<AgvRiskEvent>(supabase, AGV_TABLE_NAMES.RISK_EVENT),
    riskMatrices: createCrudRepository<AgvRiskMatrix>(supabase, AGV_TABLE_NAMES.RISK_MATRIX),
    accountabilityMatrices: createCrudRepository<AgvAccountabilityMatrix>(supabase, AGV_TABLE_NAMES.ACCOUNTABILITY_MATRIX),
    approvalWorkflows: createCrudRepository<AgvApprovalWorkflow>(supabase, AGV_TABLE_NAMES.APPROVAL_WORKFLOW),
    approvalRequests: createCrudRepository<AgvApprovalRequest>(supabase, AGV_TABLE_NAMES.APPROVAL_REQUEST),
    aiAudits: createCrudRepository<AgvAIAudit>(supabase, AGV_TABLE_NAMES.AI_AUDIT),
    auditFindings: createCrudRepository<AgvAuditFinding>(supabase, AGV_TABLE_NAMES.AUDIT_FINDING),
    auditTrails: createCrudRepository<AgvAuditTrail>(supabase, AGV_TABLE_NAMES.AUDIT_TRAIL),
    regulations: createCrudRepository<AgvRegulation>(supabase, AGV_TABLE_NAMES.REGULATION),
    complianceRequirements: createCrudRepository<AgvComplianceRequirement>(supabase, AGV_TABLE_NAMES.COMPLIANCE_REQUIREMENT),
    dataProcessingRecords: createCrudRepository<AgvDataProcessingRecord>(supabase, AGV_TABLE_NAMES.DATA_PROCESSING_RECORD),
    aiIncidents: createCrudRepository<AgvAIIncident>(supabase, AGV_TABLE_NAMES.AI_INCIDENT),
    incidentTimelines: createCrudRepository<AgvIncidentTimeline>(supabase, AGV_TABLE_NAMES.INCIDENT_TIMELINE),
    ethicsReviews: createCrudRepository<AgvEthicsReview>(supabase, AGV_TABLE_NAMES.ETHICS_REVIEW),
    ethicsCommittees: createCrudRepository<AgvEthicsCommittee>(supabase, AGV_TABLE_NAMES.ETHICS_COMMITTEE),
    ethicsTrainings: createCrudRepository<AgvEthicsTraining>(supabase, AGV_TABLE_NAMES.ETHICS_TRAINING),
    ethicsTrainingCompletions: createCrudRepository<AgvEthicsTrainingCompletion>(supabase, AGV_TABLE_NAMES.ETHICS_TRAINING_COMPLETION),
    dataClassifications: createCrudRepository<AgvDataClassification>(supabase, AGV_TABLE_NAMES.DATA_CLASSIFICATION),
    dataAssets: createCrudRepository<AgvDataAsset>(supabase, AGV_TABLE_NAMES.DATA_ASSET),
    dataLineages: createCrudRepository<AgvDataLineage>(supabase, AGV_TABLE_NAMES.DATA_LINEAGE),
    consentRecords: createCrudRepository<AgvConsentRecord>(supabase, AGV_TABLE_NAMES.CONSENT_RECORD),
  };
}
