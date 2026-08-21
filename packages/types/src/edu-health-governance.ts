export enum GovernanceFramework {
  NATIONAL = "national",
  REGIONAL = "regional",
  SCHOOL = "school",
  INTERNATIONAL = "international",
  SDG_ALIGNED = "sdg_aligned",
}

export enum PolicyType {
  HEALTH = "health",
  WELLBEING = "wellbeing",
  SAFEGUARDING = "safeguarding",
  SAFETY = "safety",
  INCLUSION = "inclusion",
  DATA_PRIVACY = "data_privacy",
  AI_GOVERNANCE = "ai_governance",
  INCIDENT_MANAGEMENT = "incident_management",
}

export enum ComplianceStatusGov {
  COMPLIANT = "compliant",
  NON_COMPLIANT = "non_compliant",
  PARTIALLY_COMPLIANT = "partially_compliant",
  UNDER_REVIEW = "under_review",
  EXEMPT = "exempt",
  NOT_APPLICABLE = "not_applicable",
}

export enum AuditTypeGov {
  INTERNAL = "internal",
  EXTERNAL = "external",
  REGULATORY = "regulatory",
  SELF_ASSESSMENT = "self_assessment",
  PEER_REVIEW = "peer_review",
  THIRD_PARTY = "third_party",
}

export enum RetentionPolicy {
  ONE_YEAR = "one_year",
  THREE_YEARS = "three_years",
  FIVE_YEARS = "five_years",
  SEVEN_YEARS = "seven_years",
  TEN_YEARS = "ten_years",
  PERMANENT = "permanent",
  STUDENT_LIFETIME = "student_lifetime",
}

export enum ConsentType {
  DATA_COLLECTION = "data_collection",
  DATA_SHARING = "data_sharing",
  AI_PROCESSING = "ai_processing",
  RESEARCH_USE = "research_use",
  PHOTO_VIDEO = "photo_video",
  HEALTH_SCREENING = "health_screening",
  COUNSELING = "counseling",
  EXTERNAL_REFERRAL = "external_referral",
}

export enum DataClassification {
  PUBLIC = "public",
  INTERNAL = "internal",
  CONFIDENTIAL = "confidential",
  RESTRICTED = "restricted",
  TOP_SECRET = "top_secret",
  PERSONAL = "personal",
  SENSITIVE_PERSONAL = "sensitive_personal",
  HEALTH_DATA = "health_data",
}

export enum ReadinessLevel {
  NOT_STARTED = "not_started",
  PLANNING = "planning",
  IMPLEMENTING = "implementing",
  MATURING = "maturing",
  OPTIMIZED = "optimized",
  LEADING = "leading",
}

export enum GovernanceMaturityLevel {
  INITIAL = "initial",
  DEVELOPING = "developing",
  DEFINED = "defined",
  MANAGED = "managed",
  OPTIMIZING = "optimizing",
}

export enum PolicyReviewCycle {
  ANNUAL = "annual",
  BIENNIAL = "biennial",
  TRIENNIAL = "triennial",
  AD_HOC = "ad_hoc",
  REGULATORY_DRIVEN = "regulatory_driven",
}

export interface HealthGovernancePolicy {
  id: string;
  school_id: string;
  policy_name: string;
  policy_type: PolicyType;
  framework: GovernanceFramework;
  version: string;
  effective_date: string;
  review_date: string;
  approved_by: string;
  approved_date: string;
  content: string;
  scope: string[];
  objectives: string[];
  key_principles: string[];
  responsibilities: string[];
  procedures: string[];
  compliance_requirements: string[];
  penalties: string[];
  training_required: boolean;
  training_frequency: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ComplianceTracking {
  id: string;
  school_id: string;
  policy_id: string;
  regulation_name: string;
  regulatory_body: string;
  compliance_status: ComplianceStatusGov;
  last_assessment_date: string;
  next_assessment_date: string;
  compliance_score: number;
  requirements: string[];
  met_requirements: string[];
  unmet_requirements: string[];
  evidence: ComplianceEvidence[];
  corrective_actions: string[];
  responsible_person: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ComplianceEvidence {
  id: string;
  compliance_id: string;
  evidence_type: string;
  description: string;
  document_url: string;
  collected_by: string;
  collection_date: string;
  validity_period: string;
  verification_status: string;
  verified_by: string;
  verified_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ComplianceAuditTrail {
  id: string;
  school_id: string;
  audit_id: string;
  audit_type: AuditTypeGov;
  audit_date: string;
  auditor: string;
  auditor_organization: string;
  scope: string[];
  findings: string[];
  compliance_scores: Record<string, number>;
  overall_compliance: number;
  non_compliance_areas: string[];
  recommendations: string[];
  corrective_actions: string[];
  follow_up_date: string;
  report_url: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ReadinessAssessment {
  id: string;
  school_id: string;
  assessment_type: string;
  framework: GovernanceFramework;
  assessment_date: string;
  assessed_by: string;
  current_level: ReadinessLevel;
  target_level: ReadinessLevel;
  scores: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  action_plan: string[];
  timeline: string;
  budget_required: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface PolicyManagement {
  id: string;
  school_id: string;
  policy_id: string;
  management_action: string;
  action_date: string;
  performed_by: string;
  previous_version: string;
  new_version: string;
  changes_made: string[];
  approval_required: boolean;
  approved_by: string;
  approval_date: string;
  distribution_list: string[];
  training_required: boolean;
  training_completed: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface PolicyVersion {
  id: string;
  school_id: string;
  policy_id: string;
  version_number: string;
  version_date: string;
  author: string;
  changes: string[];
  change_reason: string;
  approved_by: string;
  approval_date: string;
  effective_date: string;
  superseded_by: string;
  document_url: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ConsentManagement {
  id: string;
  school_id: string;
  student_id: string;
  consent_type: ConsentType;
  consent_given: boolean;
  consent_date: string;
  consent_scope: string[];
  expiry_date: string;
  withdrawal_date: string;
  withdrawal_reason: string;
  parent_signature_url: string;
  witness_signature_url: string;
  digital_consent_ip: string;
  version_agreed: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface DataAccessLog {
  id: string;
  school_id: string;
  user_id: string;
  user_role: string;
  access_type: string;
  data_classification: DataClassification;
  resource_accessed: string;
  resource_id: string;
  access_purpose: string;
  access_timestamp: string;
  ip_address: string;
  device_information: string;
  geo_location: string;
  authorized: boolean;
  authorization_reference: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface DataRetentionRule {
  id: string;
  school_id: string;
  data_type: string;
  classification: DataClassification;
  retention_period: RetentionPolicy;
  retention_start: string;
  retention_end: string;
  deletion_method: string;
  archive_location: string;
  legal_hold: boolean;
  legal_hold_reason: string;
  responsible_person: string;
  last_review_date: string;
  next_review_date: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AnonymizationRule {
  id: string;
  school_id: string;
  data_type: string;
  anonymization_method: string;
  fields_to_anonymize: string[];
  anonymization_level: string;
  reversibility: boolean;
  k_anonymity: number;
  l_diversity: number;
  t_closeness: number;
  approved_by: string;
  approval_date: string;
  last_applied: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface PseudonymizationRule {
  id: string;
  school_id: string;
  data_type: string;
  pseudonymization_method: string;
  fields_to_pseudonymize: string[];
  key_management: string;
  key_holder: string;
  re_identification_process: string;
  approved_by: string;
  approval_date: string;
  last_applied: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  school_id: string;
  event_type: string;
  event_category: string;
  actor_id: string;
  actor_role: string;
  actor_name: string;
  resource_type: string;
  resource_id: string;
  action: string;
  outcome: string;
  timestamp: string;
  ip_address: string;
  user_agent: string;
  geo_location: string;
  previous_value: string;
  new_value: string;
  session_id: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface GovernanceReport {
  id: string;
  school_id: string;
  report_type: string;
  report_period: string;
  generated_by: string;
  generated_at: string;
  executive_summary: string;
  compliance_overview: Record<string, ComplianceStatusGov>;
  policy_status: Record<string, string>;
  audit_summary: string;
  risk_assessment: string;
  recommendations: string[];
  action_items: string[];
  next_review_date: string;
  distribution_list: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface PolicyImpactAssessment {
  id: string;
  school_id: string;
  policy_id: string;
  assessment_date: string;
  assessed_by: string;
  impact_areas: string[];
  positive_impacts: string[];
  negative_impacts: string[];
  unintended_consequences: string[];
  stakeholder_feedback: string[];
  cost_implications: number;
  effectiveness_score: number;
  recommendations: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}
