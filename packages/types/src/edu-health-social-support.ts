export enum SocioeconomicLevel {
  EXTREME_POVERTY = "extreme_poverty",
  POVERTY = "poverty",
  LOW_INCOME = "low_income",
  MIDDLE_INCOME = "middle_income",
  UPPER_MIDDLE_INCOME = "upper_middle_income",
  HIGH_INCOME = "high_income",
}

export enum SupportType {
  FINANCIAL = "financial",
  ACADEMIC = "academic",
  EMOTIONAL = "emotional",
  SOCIAL = "social",
  MATERIAL = "material",
  NUTRITION = "nutrition",
  TRANSPORTATION = "transportation",
  HOUSING = "housing",
  HEALTHCARE = "healthcare",
  EMPLOYMENT = "employment",
}

export enum AssistanceType {
  SCHOLARSHIP = "scholarship",
  FEE_WAIVER = "fee_waiver",
  FOOD_PROGRAM = "food_program",
  UNIFORM_ASSISTANCE = "uniform_assistance",
  SUPPLY_ASSISTANCE = "supply_assistance",
  TRANSPORT_VOUCHER = "transport_voucher",
  TUTORING = "tutoring",
  COUNSELING = "counseling",
  MENTORING = "mentoring",
  HEALTHCARE_ACCESS = "healthcare_access",
}

export enum EligibilityStatus {
  PENDING = "pending",
  ELIGIBLE = "eligible",
  INELIGIBLE = "ineligible",
  CONDITIONALLY_ELIGIBLE = "conditionally_eligible",
  UNDER_REVIEW = "under_review",
  EXPIRED = "expired",
}

export enum FamilyEngagementType {
  PARENT_TEACHER_CONFERENCE = "parent_teacher_conference",
  WORKSHOP = "workshop",
  VOLUNTEERING = "volunteering",
  HOME_VISIT = "home_visit",
  COMMUNITY_EVENT = "community_event",
  SUPPORT_GROUP = "support_group",
  ADVISORY_COUNCIL = "advisory_council",
  DIGITAL_ENGAGEMENT = "digital_engagement",
}

export enum CommunityResourceType {
  NGO = "ngo",
  GOVERNMENT = "government",
  FAITH_BASED = "faith_based",
  BUSINESS = "business",
  HEALTHCARE_PROVIDER = "healthcare_provider",
  SOCIAL_SERVICE = "social_service",
  RECREATIONAL = "recreational",
  CULTURAL = "cultural",
}

export enum SocialWorkerCaseStatus {
  OPEN = "open",
  ACTIVE = "active",
  MONITORING = "monitoring",
  CLOSED = "closed",
  REFERRED = "referred",
  ESCALATED = "escalated",
}

export enum ProgramType {
  AFTER_SCHOOL = "after_school",
  SUMMER_PROGRAM = "summer_program",
  TUTORING_PROGRAM = "tutoring_program",
  MENTORING_PROGRAM = "mentoring_program",
  NUTRITION_PROGRAM = "nutrition_program",
  HEALTH_PROGRAM = "health_program",
  FAMILY_SUPPORT = "family_support",
  YOUTH_DEVELOPMENT = "youth_development",
}

export enum ReferralStatusSS {
  PENDING = "pending",
  ACCEPTED = "accepted",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  DECLINED = "declined",
  CANCELLED = "cancelled",
}

export enum FamilyIncomeSource {
  EMPLOYMENT = "employment",
  SELF_EMPLOYMENT = "self_employment",
  GOVERNMENT_ASSISTANCE = "government_assistance",
  INFORMAL_WORK = "informal_work",
  REMITTANCES = "remittances",
  PENSION = "pension",
  NONE = "none",
}

export interface SocioeconomicProfile {
  id: string;
  school_id: string;
  student_id: string;
  family_income_level: SocioeconomicLevel;
  annual_family_income: number;
  family_size: number;
  number_of_dependents: number;
  single_parent_household: boolean;
  guardian_employment_status: string;
  housing_type: string;
  housing_stability: string;
  access_to_internet: boolean;
  access_to_computer: boolean;
  transportation_access: string;
  food_security_status: string;
  healthcare_access: string;
  government_assistance: string[];
  special_circumstances: string[];
  assessment_date: string;
  assessed_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface FamilySupport {
  id: string;
  school_id: string;
  student_id: string;
  family_id: string;
  support_type: SupportType;
  assistance_type: AssistanceType;
  status: string;
  request_date: string;
  approval_date: string;
  start_date: string;
  end_date: string;
  amount: number;
  frequency: string;
  provider: string;
  description: string;
  conditions: string[];
  eligibility_criteria: string[];
  documents_required: string[];
  documents_submitted: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SocialAssistance {
  id: string;
  school_id: string;
  student_id: string;
  assistance_type: AssistanceType;
  description: string;
  amount: number;
  currency: string;
  provider: string;
  grant_date: string;
  expiry_date: string;
  renewal_possible: boolean;
  conditions: string[];
  usage_restrictions: string[];
  reporting_requirements: string[];
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ScholarshipReferral {
  id: string;
  school_id: string;
  student_id: string;
  scholarship_name: string;
  provider: string;
  amount: number;
  duration: string;
  eligibility_met: boolean;
  application_date: string;
  approval_date: string;
  start_date: string;
  end_date: string;
  renewal_date: string;
  gpa_requirement: number;
  current_gpa: number;
  attendance_requirement: number;
  current_attendance: number;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface FoodAssistance {
  id: string;
  school_id: string;
  student_id: string;
  program_name: string;
  meal_type: string;
  frequency: string;
  start_date: string;
  end_date: string;
  provider: string;
  dietary_restrictions: string[];
  pickup_location: string;
  pickup_time: string;
  parent_consent: boolean;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface TransportationAssistance {
  id: string;
  school_id: string;
  student_id: string;
  assistance_type: string;
  route_name: string;
  pickup_location: string;
  dropoff_location: string;
  distance_km: number;
  travel_time_minutes: number;
  monthly_subsidy: number;
  provider: string;
  vehicle_type: string;
  start_date: string;
  end_date: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface HousingAssistance {
  id: string;
  school_id: string;
  student_id: string;
  housing_status: string;
  assistance_type: string;
  provider: string;
  monthly_subsidy: number;
  housing_address: string;
  housing_condition: string;
  stability_assessment: string;
  start_date: string;
  end_date: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyAssistance {
  id: string;
  school_id: string;
  student_id: string;
  emergency_type: string;
  description: string;
  urgency: string;
  amount_needed: number;
  amount_provided: number;
  provider: string;
  request_date: string;
  fulfillment_date: string;
  status: string;
  follow_up_required: boolean;
  follow_up_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityResource {
  id: string;
  school_id: string;
  resource_name: string;
  resource_type: CommunityResourceType;
  organization_name: string;
  description: string;
  services_offered: string[];
  target_population: string[];
  eligibility_criteria: string[];
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  address: string;
  website: string;
  operating_hours: string;
  languages_supported: string[];
  cost: string;
  referral_process: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SocialWorkerCase {
  id: string;
  school_id: string;
  student_id: string;
  case_number: string;
  status: SocialWorkerCaseStatus;
  assigned_worker: string;
  case_start_date: string;
  case_end_date: string;
  concern_types: string[];
  risk_level: string;
  family_involvement: string;
  services_provided: string[];
  referrals_made: string[];
  home_visits_completed: number;
  last_home_visit: string;
  next_review_date: string;
  outcome_summary: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface FamilyEngagement {
  id: string;
  school_id: string;
  student_id: string;
  family_id: string;
  engagement_type: FamilyEngagementType;
  event_name: string;
  event_date: string;
  event_location: string;
  family_members_attended: number;
  staff_present: string[];
  topics_covered: string[];
  materials_provided: string[];
  follow_up_actions: string[];
  feedback_received: string;
  satisfaction_rating: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SupportProgram {
  id: string;
  school_id: string;
  program_name: string;
  program_type: ProgramType;
  description: string;
  target_population: string[];
  eligibility_criteria: string[];
  capacity: number;
  current_enrollment: number;
  start_date: string;
  end_date: string;
  schedule: string;
  location: string;
  provider: string;
  cost: number;
  funding_source: string;
  outcomes: string[];
  success_metrics: string[];
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface EligibilityEngine {
  id: string;
  school_id: string;
  program_id: string;
  criteria: EligibilityCriteria[];
  rules: string[];
  weightings: Record<string, number>;
  auto_approve_threshold: number;
  manual_review_threshold: number;
  status: string;
  version: string;
  last_updated: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface EligibilityCriteria {
  id: string;
  engine_id: string;
  criteria_name: string;
  criteria_type: string;
  operator: string;
  value: string;
  weight: number;
  required: boolean;
  description: string;
}

export interface EligibilityResult {
  id: string;
  school_id: string;
  student_id: string;
  program_id: string;
  engine_id: string;
  status: EligibilityStatus;
  score: number;
  criteria_met: string[];
  criteria_not_met: string[];
  flags: string[];
  recommended_programs: string[];
  manual_review_required: boolean;
  reviewer_notes: string;
  determination_date: string;
  expiration_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}
