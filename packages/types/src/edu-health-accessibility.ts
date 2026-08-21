export enum AccessibilityType {
  VISUAL = "visual",
  HEARING = "hearing",
  MOBILITY = "mobility",
  COGNITIVE = "cognitive",
  SPEECH = "speech",
  NEUROLOGICAL = "neurological",
  PSYCHOLOGICAL = "psychological",
  CHRONIC_ILLNESS = "chronic_illness",
  MULTIPLE = "multiple",
}

export enum AccommodationType {
  EXTENDED_TIME = "extended_time",
  SEPARATE_SETTING = "separate_setting",
  ASSISTIVE_TECHNOLOGY = "assistive_technology",
  MODIFIED_MATERIALS = "modified_materials",
  PHYSICAL_ACCESS = "physical_access",
  COMMUNICATION_SUPPORT = "communication_support",
  BEHAVIORAL_SUPPORT = "behavioral_support",
  SCHEDULE_MODIFICATION = "schedule_modification",
  PEER_SUPPORT = "peer_support",
  STAFF_SUPPORT = "staff_support",
}

export enum AssistiveTechnologyType {
  SCREEN_READER = "screen_reader",
  MAGNIFICATION = "magnification",
  SPEECH_TO_TEXT = "speech_to_text",
  TEXT_TO_SPEECH = "text_to_speech",
  BRAILLE_DISPLAY = "braille_display",
  SWITCH_ACCESS = "switch_access",
  EYE_TRACKING = "eye_tracking",
  ALTERNATIVE_KEYBOARD = "alternative_keyboard",
  AAC_DEVICE = "aac_device",
  HEARING_AID = "hearing_aid",
  COCHLEAR_IMPLANT = "cochlear_implant",
  MOBILITY_AID = "mobility_aid",
  ORGANIZATION_APP = "organization_app",
  FOCUS_TOOL = "focus_tool",
}

export enum SupportLevel {
  TIER_1 = "tier_1",
  TIER_2 = "tier_2",
  TIER_3 = "tier_3",
  TIER_4 = "tier_4",
  INTENSIVE = "intensive",
}

export enum InclusionPlanStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  UNDER_REVIEW = "under_review",
  COMPLETED = "completed",
  EXPIRED = "expired",
  REVISION_NEEDED = "revision_needed",
}

export enum SpecialEducationType {
  LEARNING_DISABILITY = "learning_disability",
  INTELLECTUAL_DISABILITY = "intellectual_disability",
  AUTISM_SPECTRUM = "autism_spectrum",
  ADHD = "adhd",
  EMOTIONAL_DISTURBANCE = "emotional_disturbance",
  SPEECH_IMPAIRMENT = "speech_impairment",
  VISUAL_IMPAIRMENT = "visual_impairment",
  HEARING_IMPAIRMENT = "hearing_impairment",
  ORTHOPEDIC_IMPAIRMENT = "orthopedic_impairment",
  TRAUMATIC_BRAIN_INJURY = "traumatic_brain_injury",
  MULTIPLE_DISABILITIES = "multiple_disabilities",
  DEAF_BLINDNESS = "deaf_blindness",
}

export enum AssessmentMethod {
  FORMAL_TESTING = "formal_testing",
  INFORMAL_OBSERVATION = "informal_observation",
  CURRICULUM_BASED = "curriculum_based",
  FUNCTIONAL_ASSESSMENT = "functional_assessment",
  BEHAVIORAL_ASSESSMENT = "behavioral_assessment",
  PORTFOLIO = "portfolio",
  PARENT_INPUT = "parent_input",
  TEACHER_INPUT = "teacher_input",
}

export enum AccommodationFrequency {
  DAILY = "daily",
  WEEKLY = "weekly",
  PER_ASSIGNMENT = "per_assignment",
  PER_EXAM = "per_exam",
  AS_NEEDED = "as_needed",
  ALWAYS = "always",
}

export enum AccessibilityRating {
  FULLY_ACCESSIBLE = "fully_accessible",
  MOSTLY_ACCESSIBLE = "mostly_accessible",
  PARTIALLY_ACCESSIBLE = "partially_accessible",
  BARRIERS_PRESENT = "barriers_present",
  INACCESSIBLE = "inaccessible",
}

export enum InclusionGrade {
  A_PLUS = "a_plus",
  A = "a",
  B = "b",
  C = "c",
  D = "d",
  F = "f",
}

export interface AccessibilityProfile {
  id: string;
  school_id: string;
  student_id: string;
  student_name: string;
  primary_disability: AccessibilityType;
  secondary_disabilities: AccessibilityType[];
  special_education_type: SpecialEducationType[];
  support_level: SupportLevel;
  has_iep: boolean;
  iep_date: string;
  has_504_plan: boolean;
  plan_504_date: string;
  accommodations: LearningAccommodation[];
  assistive_technologies: AssistiveTechnology[];
  physical_needs: PhysicalAccommodation[];
  communication_needs: string[];
  behavioral_needs: string[];
  medical_needs: string[];
  dietary_needs: string[];
  transportation_needs: string;
  emergency_accommodations: string[];
  assigned_support_staff: string[];
  review_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface LearningAccommodation {
  id: string;
  school_id: string;
  student_id: string;
  accommodation_type: AccommodationType;
  description: string;
  frequency: AccommodationFrequency;
  applies_to: string[];
  implementation_notes: string;
  responsible_staff: string;
  start_date: string;
  end_date: string;
  status: string;
  effectiveness_rating: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface PhysicalAccommodation {
  id: string;
  school_id: string;
  student_id: string;
  accommodation_type: string;
  location: string;
  description: string;
  equipment_needed: string[];
  installation_date: string;
  maintenance_schedule: string;
  status: string;
  accessibility_rating: AccessibilityRating;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AssistiveTechnology {
  id: string;
  school_id: string;
  student_id: string;
  technology_type: AssistiveTechnologyType;
  device_name: string;
  device_model: string;
  serial_number: string;
  assigned_date: string;
  return_date: string;
  training_completed: boolean;
  training_date: string;
  training_provider: string;
  maintenance_schedule: string;
  last_maintenance_date: string;
  condition: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AccessibilityNeed {
  id: string;
  school_id: string;
  student_id: string;
  need_type: string;
  description: string;
  priority: string;
  accommodations: string[];
  responsible_person: string;
  review_date: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SupportPlan {
  id: string;
  school_id: string;
  student_id: string;
  plan_type: string;
  plan_name: string;
  status: InclusionPlanStatus;
  start_date: string;
  end_date: string;
  goals: string[];
  objectives: string[];
  strategies: string[];
  accommodations: string[];
  responsible_staff: string[];
  review_dates: string[];
  progress_monitoring: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface InclusionPlan {
  id: string;
  school_id: string;
  student_id: string;
  plan_name: string;
  status: InclusionPlanStatus;
  plan_type: string;
  start_date: string;
  end_date: string;
  goals: string[];
  services: SupportService[];
  accommodations: string[];
  modifications: string[];
  assessment_accommodations: string[];
  behavioral_supports: string[];
  transition_plan: string;
  team_members: string[];
  parent_input: string;
  student_input: string;
  progress_reports: string[];
  review_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SpecialEducationSupport {
  id: string;
  school_id: string;
  student_id: string;
  special_education_type: SpecialEducationType;
  eligibility_date: string;
  classification_date: string;
  service_hours_per_week: number;
  service_location: string;
  service_provider: string;
  service_type: string;
  goals: string[];
  progress_monitoring: string;
  data_collection_method: string;
  review_frequency: string;
  last_review_date: string;
  next_review_date: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface IndividualizedSupportPlan {
  id: string;
  school_id: string;
  student_id: string;
  plan_name: string;
  plan_version: number;
  status: InclusionPlanStatus;
  effective_date: string;
  review_date: string;
  annual_review_date: string;
  present_levels: string;
  measurable_annual_goals: string[];
  short_term_objectives: string[];
  accommodations: string[];
  modifications: string[];
  assessment_accommodations: string[];
  service_minutes: Record<string, number>;
  participation_with_peers: string;
  transition_needs: string;
  agency_referrals: string[];
  team_signatures: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AccessibilityAssessment {
  id: string;
  school_id: string;
  student_id: string;
  assessment_date: string;
  assessment_method: AssessmentMethod;
  assessed_by: string;
  assessment_type: string;
  results: string;
  recommendations: string[];
  accommodations_recommended: string[];
  technology_recommended: string[];
  priority_level: string;
  follow_up_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AccommodationTracking {
  id: string;
  school_id: string;
  student_id: string;
  accommodation_id: string;
  tracking_date: string;
  usage_frequency: number;
  effectiveness_rating: number;
  student_feedback: string;
  staff_feedback: string;
  implementation_fidelity: number;
  barriers_encountered: string[];
  adjustments_needed: string[];
  next_review_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SupportService {
  id: string;
  school_id: string;
  service_name: string;
  service_type: string;
  provider: string;
  description: string;
  frequency: string;
  duration_minutes: number;
  location: string;
  eligibility_criteria: string[];
  capacity: number;
  current_enrollment: number;
  status: string;
  contact_information: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface InclusionAnalytics {
  id: string;
  school_id: string;
  period_start: string;
  period_end: string;
  total_students_with_plans: number;
  students_by_disability_type: Record<string, number>;
  accommodation_usage: Record<string, number>;
  support_service_enrollment: Record<string, number>;
  academic_progress: Record<string, number>;
  graduation_rate: number;
  attendance_rate: number;
  behavioral_incidents: number;
  parent_satisfaction: number;
  staff_satisfaction: number;
  cost_per_student: number;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface InclusionReport {
  id: string;
  school_id: string;
  report_name: string;
  report_period: string;
  generated_by: string;
  inclusion_grade: InclusionGrade;
  overall_score: number;
  dimension_scores: Record<string, number>;
  strengths: string[];
  areas_for_improvement: string[];
  recommendations: string[];
  compliance_status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AccessibilityAuditLog {
  id: string;
  school_id: string;
  audit_type: string;
  audit_date: string;
  auditor: string;
  areas_assessed: string[];
  findings: string[];
  compliance_score: number;
  barriers_identified: string[];
  recommendations: string[];
  corrective_actions: string[];
  follow_up_date: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}
