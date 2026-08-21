export enum SafeguardingCaseStatus {
  OPEN = "open",
  UNDER_INVESTIGATION = "under_investigation",
  IN_PROGRESS = "in_progress",
  ESCALATED = "escalated",
  CLOSED = "closed",
  MONITORING = "monitoring",
  REOPENED = "reopened",
  REFERRED_EXTERNALLY = "referred_externally",
}

export enum SafeguardingSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
  EMERGENCY = "emergency",
}

export enum VulnerabilityType {
  PHYSICAL_ABUSE = "physical_abuse",
  EMOTIONAL_ABUSE = "emotional_abuse",
  SEXUAL_ABUSE = "sexual_abuse",
  NEGLECT = "neglect",
  DOMESTIC_VIOLENCE = "domestic_violence",
  EXPLOITATION = "exploitation",
  RADICALIZATION = "radicalization",
  ONLINE_ABUSE = "online_abuse",
  BULLYING = "bullying",
  DISCRIMINATION = "discrimination",
  SELF_HARM = "self_harm",
  SUBSTANCE_ABUSE = "substance_abuse",
  MENTAL_HEALTH = "mental_health",
  POVERTY = "poverty",
  HOMELESSNESS = "homelessness",
  MIGRATION = "migration",
  DISABILITY = "disability",
}

export enum ConcernType {
  PHYSICAL_MARKS = "physical_marks",
  BEHAVIORAL_CHANGE = "behavioral_change",
  DISCLOSURE = "disclosure",
  OBSERVATION = "observation",
  THIRD_PARTY_REPORT = "third_party_report",
  ACADEMIC_DECLINE = "academic_decline",
  ATTENDANCE_CONCERN = "attendance_concern",
  HYGIENE_CONCERN = "hygiene_concern",
  EMOTIONAL_DISTRESS = "emotional_distress",
  PARENTAL_CONCERN = "parental_concern",
}

export enum DisclosureType {
  DIRECT = "direct",
  INDIRECT = "indirect",
  PARTIAL = "partial",
  WITHDRAWN = "withdrawn",
  THIRD_PARTY = "third_party",
}

export enum ReferralSource {
  TEACHER = "teacher",
  PARENT = "parent",
  STUDENT = "student",
  STAFF = "staff",
  EXTERNAL_AGENCY = "external_agency",
  POLICE = "police",
  HEALTHCARE = "healthcare",
  ANONYMOUS = "anonymous",
  SOCIAL_WORKER = "social_worker",
  SELF = "self",
}

export enum CasePriority {
  ROUTINE = "routine",
  URGENT = "urgent",
  EMERGENCY = "emergency",
  IMMEDIATE = "immediate",
}

export enum CaseAssignmentStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
  REASSIGNED = "reassigned",
  COMPLETED = "completed",
}

export enum EscalationLevel {
  LEVEL_1 = "level_1",
  LEVEL_2 = "level_2",
  LEVEL_3 = "level_3",
  LEVEL_4 = "level_4",
  LEVEL_5 = "level_5",
}

export enum ProtectiveActionType {
  MONITORING = "monitoring",
  SAFETY_PLAN = "safety_plan",
  SAFEERING_ORDER = "safeering_order",
  REMOVAL = "removal",
  EMERGENCY_PROTECTION = "emergency_protection",
  SUPervision = "supervision",
  FAMILY_SUPPORT = "family_support",
  MEDIATION = "mediation",
}

export enum MandatoryReportStatus {
  NOT_REQUIRED = "not_required",
  REQUIRED = "required",
  SUBMITTED = "submitted",
  ACKNOWLEDGED = "acknowledged",
  UNDER_REVIEW = "under_review",
  COMPLETED = "completed",
}

export enum CaseClosureReason {
  RESOLVED = "resolved",
  TRANSFERRED = "transferred",
  NO_FURTHER_ACTION = "no_further_action",
  INSUFFICIENT_EVIDENCE = "insufficient_evidence",
  STUDENT_LEFT = "student_left",
  COURT_ORDER = "court_order",
  AGENCY_TOOK_OVER = "agency_took_over",
}

export enum TrainingStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  EXPIRED = "expired",
  OVERDUE = "overdue",
  WAIVED = "waived",
}

export interface SafeguardingCase {
  id: string;
  school_id: string;
  case_number: string;
  student_id: string;
  student_name: string;
  status: SafeguardingCaseStatus;
  severity: SafeguardingSeverity;
  priority: CasePriority;
  concern_types: ConcernType[];
  vulnerability_types: VulnerabilityType[];
  referral_source: ReferralSource;
  referral_date: string;
  assigned_to: string;
  assigned_date: string;
  last_review_date: string;
  next_review_date: string;
  escalation_level: EscalationLevel;
  mandatory_report_status: MandatoryReportStatus;
  external_agencies_notified: string[];
  closure_reason: CaseClosureReason;
  closure_date: string;
  closure_notes: string;
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SafeguardingConcern {
  id: string;
  school_id: string;
  case_id: string;
  concern_type: ConcernType;
  description: string;
  date_observed: string;
  observed_by: string;
  location: string;
  witnesses: string[];
  evidence_available: boolean;
  severity: SafeguardingSeverity;
  immediate_action_taken: string;
  reported_to: string;
  reported_date: string;
  follow_up_required: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VulnerabilityProfile {
  id: string;
  school_id: string;
  student_id: string;
  vulnerability_type: VulnerabilityType;
  risk_level: SafeguardingSeverity;
  date_identified: string;
  identified_by: string;
  description: string;
  contributing_factors: string[];
  protective_factors: string[];
  current_status: string;
  interventions: string[];
  support_services: string[];
  review_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Disclosure {
  id: string;
  school_id: string;
  case_id: string;
  student_id: string;
  disclosure_type: DisclosureType;
  disclosure_date: string;
  disclosed_to: string;
  content_summary: string;
  exact_words_used: string;
  setting: string;
  witnesses: string[];
  student_demeanor: string;
  follow_up_questions: string[];
  immediate_response: string;
  recorded_verbatim: boolean;
  recorded_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SafeguardingReferral {
  id: string;
  school_id: string;
  case_id: string;
  referral_source: ReferralSource;
  referral_type: string;
  referral_date: string;
  referred_by: string;
  referred_to: string;
  reason: string;
  urgency: CasePriority;
  supporting_evidence: string[];
  agency_reference: string;
  agency_response: string;
  response_date: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CaseAssignment {
  id: string;
  school_id: string;
  case_id: string;
  assigned_to: string;
  assigned_by: string;
  assigned_date: string;
  role: string;
  status: CaseAssignmentStatus;
  acceptance_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CaseEscalation {
  id: string;
  school_id: string;
  case_id: string;
  escalation_level: EscalationLevel;
  escalated_by: string;
  escalated_to: string;
  escalation_date: string;
  reason: string;
  supporting_information: string;
  expected_response_date: string;
  actual_response_date: string;
  response: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface InterventionPlan {
  id: string;
  school_id: string;
  case_id: string;
  student_id: string;
  plan_name: string;
  start_date: string;
  end_date: string;
  objectives: string[];
  actions: InterventionPlanAction[];
  responsible_parties: string[];
  resources_needed: string[];
  success_criteria: string[];
  review_date: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface InterventionPlanAction {
  id: string;
  plan_id: string;
  action_name: string;
  description: string;
  responsible_person: string;
  due_date: string;
  status: string;
  completion_date: string;
  outcome: string;
  notes: string;
}

export interface CaseTimeline {
  id: string;
  school_id: string;
  case_id: string;
  entries: CaseTimelineEntry[];
  created_at: string;
  updated_at: string;
}

export interface CaseTimelineEntry {
  id: string;
  timeline_id: string;
  entry_date: string;
  entry_time: string;
  entry_type: string;
  description: string;
  performed_by: string;
  attachments: string[];
  confidential: boolean;
  notes: string;
}

export interface EvidenceManagement {
  id: string;
  school_id: string;
  case_id: string;
  evidence_type: string;
  description: string;
  collected_by: string;
  collected_date: string;
  storage_location: string;
  file_url: string;
  chain_of_custody: string[];
  confidentiality_level: string;
  retention_period: string;
  disposition: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ConfidentialNote {
  id: string;
  school_id: string;
  case_id: string;
  author: string;
  note_date: string;
  note_type: string;
  content: string;
  is_confidential: boolean;
  access_level: string;
  authorized_readers: string[];
  attachments: string[];
  created_at: string;
  updated_at: string;
}

export interface ProtectiveAction {
  id: string;
  school_id: string;
  case_id: string;
  student_id: string;
  action_type: ProtectiveActionType;
  description: string;
  implemented_by: string;
  implementation_date: string;
  review_date: string;
  duration_days: number;
  outcome: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SafeguardingFollowUp {
  id: string;
  school_id: string;
  case_id: string;
  student_id: string;
  follow_up_date: string;
  follow_up_type: string;
  conducted_by: string;
  summary: string;
  risk_level: SafeguardingSeverity;
  progress_noted: string[];
  concerns_remaining: string[];
  next_steps: string[];
  next_follow_up_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CaseClosure {
  id: string;
  school_id: string;
  case_id: string;
  closure_date: string;
  closure_reason: CaseClosureReason;
  closed_by: string;
  summary: string;
  outcomes_achieved: string[];
  outstanding_issues: string[];
  referrals_made: string[];
  follow_up_required: boolean;
  follow_up_date: string;
  archive_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MandatoryReport {
  id: string;
  school_id: string;
  case_id: string;
  report_type: string;
  status: MandatoryReportStatus;
  prepared_by: string;
  prepared_date: string;
  submitted_by: string;
  submitted_date: string;
  submitted_to: string;
  reference_number: string;
  acknowledgment_date: string;
  response_received: boolean;
  response_summary: string;
  documents_included: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SafeguardingPolicy {
  id: string;
  school_id: string;
  policy_name: string;
  policy_type: string;
  version: string;
  effective_date: string;
  review_date: string;
  approved_by: string;
  approved_date: string;
  content: string;
  applicable_to: string[];
  key_principles: string[];
  procedures: string[];
  contact_information: string[];
  training_requirements: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SafeguardingTraining {
  id: string;
  school_id: string;
  training_name: string;
  training_type: string;
  trainer: string;
  training_date: string;
  duration_hours: number;
  target_audience: string[];
  attendees: string[];
  completion_rate: number;
  certification_validity_months: number;
  status: TrainingStatus;
  materials_url: string;
  assessment_required: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}
