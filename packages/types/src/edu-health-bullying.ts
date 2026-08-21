export enum BullyingType {
  VERBAL = "verbal",
  PHYSICAL = "physical",
  SOCIAL = "social",
  CYBER = "cyber",
  SEXUAL = "sexual",
  RACIAL = "racial",
  RELIGIOUS = "religious",
  DISABILITY = "disability",
  HOMOPHOBIC = "homophobic",
  COMBINED = "combined",
}

export enum BullyingSeverity {
  MINOR = "minor",
  MODERATE = "moderate",
  SERIOUS = "serious",
  SEVERE = "severe",
  CRITICAL = "critical",
}

export enum ReportType {
  BULLYING = "bullying",
  CYBERBULLYING = "cyberbullying",
  HARASSMENT = "harassment",
  DISCRIMINATION = "discrimination",
  INTIMIDATION = "intimidation",
  RETALIATION = "retaliation",
}

export enum ReportSource {
  VICTIM = "victim",
  WITNESS = "witness",
  PARENT = "parent",
  TEACHER = "teacher",
  STAFF = "staff",
  ANONYMOUS = "anonymous",
  SELF_REPORT = "self_report",
  THIRD_PARTY = "third_party",
  SYSTEM_DETECTED = "system_detected",
}

export enum ClassificationType {
  CONFIRMED = "confirmed",
  UNCONFIRMED = "unconfirmed",
  FALSE_REPORT = "false_report",
  MISUNDERSTANDING = "misunderstanding",
  CONFLICT = "conflict",
  OTHER = "other",
}

export enum InvestigationStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  WAITING_FOR_INFORMATION = "waiting_for_information",
  COMPLETED = "completed",
  ON_HOLD = "on_hold",
  CANCELLED = "cancelled",
}

export enum ActionTaken {
  WARNING = "warning",
  COUNSELING = "counseling",
  PARENT_CONTACT = "parent_contact",
  DETENTION = "detention",
  SUSPENSION = "suspension",
  EXPULSION = "expulsion",
  RESTORATIVE_JUSTICE = "restorative_justice",
  MEDIATION = "mediation",
  SAFETY_PLAN = "safety_plan",
  TRANSFER = "transfer",
  COMMUNITY_SERVICE = "community_service",
  BEHAVIORAL_CONTRACT = "behavioral_contract",
}

export enum SanctionType {
  VERBAL_WARNING = "verbal_warning",
  WRITTEN_WARNING = "written_warning",
  BEHAVIORAL_CONTRACT = "behavioral_contract",
  DETENTION = "detention",
  IN_SCHOOL_SUSPENSION = "in_school_suspension",
  OUT_OF_SCHOOL_SUSPENSION = "out_of_school_suspension",
  EXPULSION_RECOMMENDATION = "expulsion_recommendation",
  COMMUNITY_SERVICE = "community_service",
  LOSS_OF_PRIVILEGES = "loss_of_privileges",
  RESTORATIVE_CONFERENCE = "restorative_conference",
}

export enum MediationStatus {
  NOT_REQUIRED = "not_required",
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  UNSUCCESSFUL = "unsuccessful",
  CANCELLED = "cancelled",
}

export enum ResolutionType {
  RESOLVED = "resolved",
  PARTIALLY_RESOLVED = "partially_resolved",
  UNRESOLVED = "unresolved",
  ESCALATED = "escalated",
  REFERRED = "referred",
}

export enum AntiRetaliationStatus {
  MONITORING = "monitoring",
  CONFIRMED_SAFE = "confirmed_safe",
  RETALIATION_REPORTED = "retaliation_reported",
  INVESTIGATION_REQUIRED = "investigation_required",
}

export enum CyberbullyingPlatform {
  SOCIAL_MEDIA = "social_media",
  MESSAGING_APP = "messaging_app",
  GAMING = "gaming",
  EMAIL = "email",
  SMS = "sms",
  FORUM = "forum",
  VIDEO_PLATFORM = "video_platform",
  SCHOOL_PLATFORM = "school_platform",
  OTHER = "other",
}

export interface BullyingReport {
  id: string;
  school_id: string;
  report_number: string;
  report_type: ReportType;
  report_source: ReportSource;
  bullying_type: BullyingType;
  severity: BullyingSeverity;
  victim_id: string;
  victim_name: string;
  victim_class: string;
  reporter_id: string;
  reporter_name: string;
  incident_date: string;
  incident_time: string;
  incident_location: string;
  description: string;
  witnesses: Witness[];
  evidence: BullyingEvidence[];
  frequency: string;
  duration: string;
  impact_description: string;
  prior_incidents: boolean;
  prior_incident_ids: string[];
  status: string;
  investigation_status: InvestigationStatus;
  assigned_investigator: string;
  investigation_date: string;
  classification: ClassificationType;
  resolution_type: ResolutionType;
  actions_taken: ActionTaken[];
  sanctions: BullyingSanction[];
  follow_up_actions: FollowUpAction[];
  anti_retaliation_status: AntiRetaliationStatus;
  parent_notified: boolean;
  parent_notified_at: string;
  notes: string;
  confidential: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CyberbullyingReport {
  id: string;
  school_id: string;
  bullying_report_id: string;
  platform: CyberbullyingPlatform;
  platform_username: string;
  message_content: string;
  screenshot_urls: string[];
  timestamp_online: string;
  sender_ip_address: string;
  anonymous_sender: boolean;
  content_type: string;
  harassment_level: string;
  content_removed: boolean;
  removal_date: string;
  platform_reported: boolean;
  platform_response: string;
  law_enforcement_involved: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface HarassmentReport {
  id: string;
  school_id: string;
  bullying_report_id: string;
  harassment_type: string;
  target_id: string;
  target_name: string;
  perpetrator_id: string;
  perpetrator_name: string;
  nature_of_harassment: string;
  frequency: string;
  duration: string;
  location: string;
  witnesses: string[];
  impact_on_target: string;
  target_response: string;
  power_dynamic: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface DiscriminationReport {
  id: string;
  school_id: string;
  bullying_report_id: string;
  discrimination_type: string;
  protected_characteristic: string;
  target_id: string;
  target_name: string;
  perpetrator_id: string;
  perpetrator_name: string;
  description: string;
  context: string;
  witnesses: string[];
  impact: string;
  prior_complaints: boolean;
  policy_violated: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface IntimidationReport {
  id: string;
  school_id: string;
  bullying_report_id: string;
  intimidation_type: string;
  target_id: string;
  target_name: string;
  perpetrator_id: string;
  perpetrator_name: string;
  threats_made: string[];
  coercive_behavior: string[];
  fear_induced: boolean;
  location: string;
  witnesses: string[];
  weapon_involved: boolean;
  gang_related: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AnonymousReport {
  id: string;
  school_id: string;
  bullying_report_id: string;
  anonymous_code: string;
  submission_method: string;
  reporter_relationship: string;
  trust_level: string;
  follow_up_possible: boolean;
  follow_up_code: string;
  verification_status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface IncidentClassification {
  id: string;
  school_id: string;
  bullying_report_id: string;
  classification_type: ClassificationType;
  classified_by: string;
  classification_date: string;
  reasoning: string;
  evidence_reviewed: string[];
  witness_interviews: string[];
  policy_references: string[];
  severity_justification: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SeverityAssessment {
  id: string;
  school_id: string;
  bullying_report_id: string;
  severity: BullyingSeverity;
  assessed_by: string;
  assessment_date: string;
  physical_harm: boolean;
  emotional_harm: boolean;
  psychological_harm: boolean;
  academic_impact: boolean;
  social_impact: boolean;
  frequency_factor: number;
  duration_factor: number;
  power_imbalance: number;
  overall_risk_score: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface InvestigationWorkflow {
  id: string;
  school_id: string;
  bullying_report_id: string;
  lead_investigator: string;
  investigation_team: string[];
  start_date: string;
  end_date: string;
  status: InvestigationStatus;
  steps: InvestigationStep[];
  evidence_collected: string[];
  interviews_conducted: string[];
  findings: string;
  conclusion: string;
  recommendations: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface InvestigationStep {
  id: string;
  workflow_id: string;
  step_name: string;
  step_type: string;
  assigned_to: string;
  due_date: string;
  completion_date: string;
  status: string;
  outcome: string;
  notes: string;
  attachments: string[];
}

export interface InvolvedPerson {
  id: string;
  school_id: string;
  bullying_report_id: string;
  person_id: string;
  person_name: string;
  role: string;
  person_type: string;
  class: string;
  grade: string;
  contact_information: string;
  guardian_name: string;
  guardian_contact: string;
  statement_taken: boolean;
  statement_date: string;
  statement_summary: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Witness {
  id: string;
  school_id: string;
  bullying_report_id: string;
  witness_id: string;
  witness_name: string;
  witness_type: string;
  class: string;
  statement: string;
  statement_date: string;
  reliability_assessment: string;
  corroborates_victim: boolean;
  corroborates_perpetrator: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BullyingEvidence {
  id: string;
  school_id: string;
  bullying_report_id: string;
  evidence_type: string;
  description: string;
  file_url: string;
  collected_by: string;
  collected_date: string;
  chain_of_custody: string[];
  authenticity_verified: boolean;
  verified_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BullyingAction {
  id: string;
  school_id: string;
  bullying_report_id: string;
  action_type: ActionTaken;
  description: string;
  taken_by: string;
  taken_date: string;
  target_person: string;
  duration: string;
  conditions: string[];
  outcome: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BullyingSanction {
  id: string;
  school_id: string;
  bullying_report_id: string;
  sanction_type: SanctionType;
  imposed_by: string;
  imposed_date: string;
  target_person: string;
  duration_days: number;
  start_date: string;
  end_date: string;
  conditions: string[];
  appeal_possible: boolean;
  appeal_deadline: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MediationSession {
  id: string;
  school_id: string;
  bullying_report_id: string;
  session_date: string;
  session_time: string;
  duration_minutes: number;
  mediator: string;
  participants: string[];
  session_type: string;
  status: MediationStatus;
  agreement_reached: boolean;
  agreement_details: string[];
  follow_up_date: string;
  follow_up_actions: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BullyingResolution {
  id: string;
  school_id: string;
  bullying_report_id: string;
  resolution_type: ResolutionType;
  resolved_by: string;
  resolution_date: string;
  summary: string;
  outcomes_achieved: string[];
  outstanding_issues: string[];
  preventive_measures: string[];
  support_provided: string[];
  monitoring_period_days: number;
  follow_up_required: boolean;
  follow_up_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface FollowUpAction {
  id: string;
  school_id: string;
  bullying_report_id: string;
  action_description: string;
  responsible_person: string;
  due_date: string;
  status: string;
  completion_date: string;
  outcome: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AntiRetaliationMeasure {
  id: string;
  school_id: string;
  bullying_report_id: string;
  status: AntiRetaliationStatus;
  monitoring_plan: string;
  monitoring_frequency: string;
  assigned_monitor: string;
  protection_measures: string[];
  check_in_dates: string[];
  retaliation_reported: boolean;
  retaliation_details: string;
  retaliation_investigation_id: string;
  notes: string;
  created_at: string;
  updated_at: string;
}
