export enum EduIncidentType {
  ACCIDENT = "accident",
  INJURY = "injury",
  MEDICAL_EMERGENCY = "medical_emergency",
  FIRE = "fire",
  NATURAL_DISASTER = "natural_disaster",
  SECURITY_BREACH = "security_breach",
  CHEMICAL_SPILL = "chemical_spill",
  STRUCTURAL_DAMAGE = "structural_damage",
  POWER_OUTAGE = "power_outage",
  TRANSPORT_INCIDENT = "transport_incident",
  FOOD_SAFETY = "food_safety",
  ALLERGIC_REACTION = "allergic_reaction",
  BEHAVIORAL_CRISIS = "behavioral_crisis",
  SELF_HARM = "self_harm",
  SUBSTANCE_INCIDENT = "substance_incident",
  EQUIPMENT_FAILURE = "equipment_failure",
  WEATHER_EVENT = "weather_event",
  OTHER = "other",
}

export enum EduIncidentSeverity {
  MINOR = "minor",
  MODERATE = "moderate",
  SERIOUS = "serious",
  SEVERE = "severe",
  CRITICAL = "critical",
  FATAL = "fatal",
}

export enum EduIncidentStatus {
  REPORTED = "reported",
  INITIAL_RESPONSE = "initial_response",
  UNDER_INVESTIGATION = "under_investigation",
  RESOLVED = "resolved",
  CLOSED = "closed",
  ESCALATED = "escalated",
  MONITORING = "monitoring",
}

export enum ResponseTeamRole {
  INCIDENT_COMMANDER = "incident_commander",
  FIRST_RESPONDER = "first_responder",
  MEDICAL_TEAM = "medical_team",
  SECURITY_TEAM = "security_team",
  COMMUNICATIONS = "communications",
  EVACUATION_LEAD = "evacuation_lead",
  PARENT_LIAISON = "parent_liaison",
  DOCUMENTATION = "documentation",
  LOGISTICS = "logistics",
  PSYCHOLOGICAL_SUPPORT = "psychological_support",
}

export enum EscalationTrigger {
  SEVERITY_THRESHOLD = "severity_threshold",
  TIME_LIMIT = "time_limit",
  RESOURCE_DEPLETION = "resource_depletion",
  MULTIPLE_VICTIMS = "multiple_victims",
  MEDIA_INVOLVEMENT = "media_involvement",
  LEGAL_ACTION = "legal_action",
  PARENT_DEMAND = "parent_demand",
  AGENCY_INTERVENTION = "agency_intervention",
  RECURRING_INCIDENT = "recurring_incident",
  POLICY_VIOLATION = "policy_violation",
}

export enum CommunicationType {
  INTERNAL_ALERT = "internal_alert",
  PARENT_NOTIFICATION = "parent_notification",
  STAFF_NOTIFICATION = "staff_notification",
  STUDENT_NOTIFICATION = "student_notification",
  AGENCY_REPORT = "agency_report",
  MEDIA_STATEMENT = "media_statement",
  BOARD_NOTIFICATION = "board_notification",
  FOLLOW_UP = "follow_up",
  STATUS_UPDATE = "status_update",
}

export enum EvacuationLevel {
  NONE = "none",
  PARTIAL = "partial",
  FULL = "full",
  SHELTER_IN_PLACE = "shelter_in_place",
  LOCKDOWN = "lockdown",
  LOCKOUT = "lockout",
  EVACUATE_AND_RELOCATE = "evacuate_and_relocate",
}

export enum PostIncidentStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  PENDING_REVIEW = "pending_review",
}

export enum LessonCategory {
  PREVENTION = "prevention",
  PREPAREDNESS = "preparedness",
  RESPONSE = "response",
  RECOVERY = "recovery",
  COMMUNICATION = "communication",
  TRAINING = "training",
  POLICY = "policy",
  EQUIPMENT = "equipment",
}

export enum IncidentNotificationChannel {
  EMAIL = "email",
  SMS = "sms",
  PUSH_NOTIFICATION = "push_notification",
  PHONE_CALL = "phone_call",
  PUBLIC_ADDRESS = "public_address",
}

export interface EduIncident {
  id: string;
  school_id: string;
  incident_number: string;
  incident_type: EduIncidentType;
  severity: EduIncidentSeverity;
  status: EduIncidentStatus;
  incident_date: string;
  incident_time: string;
  discovered_date: string;
  discovered_time: string;
  location: IncidentLocation;
  description: string;
  involved_persons: IncidentInvolvedPerson[];
  witnesses: string[];
  injuries_sustained: string[];
  property_damage: string;
  immediate_actions_taken: string[];
  emergency_services_called: boolean;
  emergency_service_type: string[];
  emergency_service_reference: string;
  response_team: ResponseTeam[];
  evacuation_level: EvacuationLevel;
  evacuation_completed: boolean;
  evacuation_time_minutes: number;
  parent_notification_required: boolean;
  parent_notification_sent: boolean;
  parent_notification_time: string;
  agency_notification_required: boolean;
  agency_notification_sent: boolean;
  agency_notification_time: string;
  media_involved: boolean;
  legal_action_possible: boolean;
  insurance_claim_required: boolean;
  insurance_claim_number: string;
  root_cause: string;
  contributing_factors: string[];
  evidence: IncidentEvidence[];
  timeline: IncidentTimeline;
  post_incident_review: PostIncidentReview;
  lessons_learned: LessonLearned[];
  follow_up_actions: string[];
  notes: string;
  reported_by: string;
  reported_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EduIncidentCreate {
  school_id: string;
  incident_type: EduIncidentType;
  severity: EduIncidentSeverity;
  incident_date: string;
  incident_time: string;
  location: IncidentLocation;
  description: string;
  involved_persons: IncidentInvolvedPerson[];
  witnesses: string[];
  injuries_sustained: string[];
  property_damage: string;
  immediate_actions_taken: string[];
  emergency_services_called: boolean;
  emergency_service_type: string[];
  notes: string;
  reported_by: string;
}

export interface IncidentLocation {
  building: string;
  floor: number;
  room: string;
  area: string;
  specific_location: string;
  gps_coordinates: string;
  map_reference: string;
}

export interface IncidentInvolvedPerson {
  person_id: string;
  person_name: string;
  person_type: string;
  role: string;
  class: string;
  injury_status: string;
  injury_description: string;
  treatment_provided: string;
  treatment_location: string;
  parent_notified: boolean;
  parent_notified_at: string;
  statement_taken: boolean;
  statement_date: string;
  notes: string;
}

export interface EmergencyContactIncident {
  id: string;
  contact_type: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  organization: string;
  reference_number: string;
  response_time: string;
  notes: string;
}

export interface ResponseTeam {
  id: string;
  school_id: string;
  incident_id: string;
  member_id: string;
  member_name: string;
  role: ResponseTeamRole;
  assigned_at: string;
  responded_at: string;
  status: string;
  actions_taken: string[];
  notes: string;
}

export interface IncidentEscalation {
  id: string;
  school_id: string;
  incident_id: string;
  trigger: EscalationTrigger;
  escalation_level: string;
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

export interface IncidentCommunication {
  id: string;
  school_id: string;
  incident_id: string;
  communication_type: CommunicationType;
  sent_by: string;
  sent_to: string[];
  sent_at: string;
  channel: string;
  subject: string;
  message: string;
  attachments: string[];
  acknowledgment_required: boolean;
  acknowledged_by: string[];
  acknowledged_at: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface IncidentEvacuation {
  id: string;
  school_id: string;
  incident_id: string;
  evacuation_level: EvacuationLevel;
  initiated_at: string;
  completed_at: string;
  duration_minutes: number;
  initiated_by: string;
  assembly_point: string;
  headcount_completed: boolean;
  headcount_time: string;
  missing_persons: string[];
  injuries_during_evacuation: string[];
  routes_used: string[];
  alternate_routes_used: string[];
  all_clear_given: boolean;
  all_clear_time: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyProcedure {
  id: string;
  school_id: string;
  procedure_name: string;
  procedure_type: string;
  incident_type: EduIncidentType;
  description: string;
  steps: string[];
  responsible_roles: string[];
  equipment_needed: string[];
  assembly_points: string[];
  communication_scripts: string[];
  review_date: string;
  version: string;
  approved_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IncidentTimeline {
  id: string;
  school_id: string;
  incident_id: string;
  entries: IncidentTimelineEntry[];
  created_at: string;
  updated_at: string;
}

export interface IncidentTimelineEntry {
  id: string;
  timeline_id: string;
  entry_time: string;
  entry_type: string;
  description: string;
  performed_by: string;
  attachments: string[];
  notes: string;
}

export interface IncidentEvidence {
  id: string;
  school_id: string;
  incident_id: string;
  evidence_type: string;
  description: string;
  file_url: string;
  collected_by: string;
  collected_at: string;
  chain_of_custody: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface PostIncidentReview {
  id: string;
  school_id: string;
  incident_id: string;
  review_date: string;
  review_status: PostIncidentStatus;
  review_team: string[];
  root_cause_analysis: string;
  what_went_well: string[];
  what_could_improve: string[];
  policy_gaps: string[];
  training_gaps: string[];
  equipment_gaps: string[];
  recommendations: string[];
  corrective_actions: string[];
  preventive_actions: string[];
  implementation_deadline: string;
  responsible_person: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface LessonLearned {
  id: string;
  school_id: string;
  incident_id: string;
  review_id: string;
  category: LessonCategory;
  lesson_description: string;
  impact: string;
  recommendation: string;
  implemented: boolean;
  implementation_date: string;
  shared_with: string[];
  document_url: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface IncidentReport {
  id: string;
  school_id: string;
  incident_id: string;
  report_type: string;
  report_date: string;
  generated_by: string;
  summary: string;
  timeline_summary: string;
  actions_summary: string;
  outcome_summary: string;
  recommendations: string[];
  attachments: string[];
  distribution_list: string[];
  confidential: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}
