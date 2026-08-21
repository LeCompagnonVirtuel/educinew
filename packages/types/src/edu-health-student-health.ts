export enum HealthProfileStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
  COMPLETE = "complete",
  EXPIRED = "expired",
  NEEDS_UPDATE = "needs_update",
}

export enum ScreeningType {
  VISION = "vision",
  DENTAL = "dental",
  HEARING = "hearing",
  SCOLIOSIS = "scoliosis",
  BMI = "bmi",
  BLOOD_PRESSURE = "blood_pressure",
  SCREEN_TIME = "screen_time",
  MENTAL_HEALTH = "mental_health",
  NUTRITION = "nutrition",
  GENERAL = "general",
}

export enum ConsentStatus {
  PENDING = "pending",
  GRANTED = "granted",
  DENIED = "denied",
  WITHDRAWN = "withdrawn",
  EXPIRED = "expired",
  PARTIAL = "partial",
}

export enum HealthAlertLevel {
  INFO = "info",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
  EMERGENCY = "emergency",
}

export enum HealthDocumentType {
  MEDICAL_REPORT = "medical_report",
  PRESCRIPTION = "prescription",
  VACCINATION_RECORD = "vaccination_record",
  ALLERGY_CARD = "allergy_card",
  INSURANCE_CARD = "insurance_card",
  CONSENT_FORM = "consent_form",
  FITNESS_CERTIFICATE = "fitness_certificate",
  SPECIAL_NEEDS_REPORT = "special_needs_report",
  HOSPITAL_DISCHARGE = "hospital_discharge",
  LAB_RESULT = "lab_result",
}

export enum ReferralStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
  FOLLOW_UP_REQUIRED = "follow_up_required",
}

export enum HealthPlanStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  ON_HOLD = "on_hold",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  UNDER_REVIEW = "under_review",
}

export enum NutritionStatus {
  WELL_FED = "well_fed",
  MILDLY_UNDERNOURISHED = "mildly_undernourished",
  MODERATELY_UNDERNOURISHED = "moderately_undernourished",
  SEVERELY_UNDERNOURISHED = "severely_undernourished",
  OVERWEIGHT = "overweight",
  OBESE = "obese",
  BALANCED = "balanced",
  IMBALANCED = "imbalanced",
}

export enum PhysicalFitnessLevel {
  EXCELLENT = "excellent",
  GOOD = "good",
  AVERAGE = "average",
  BELOW_AVERAGE = "below_average",
  POOR = "poor",
  RESTRICTED = "restricted",
}

export enum DentalStatus {
  HEALTHY = "healthy",
  NEEDS_CLEANING = "needs_cleaning",
  CARIES = "caries",
  GINGIVITIS = "gingivitis",
  ORTHODONTIC = "orthodontic",
  PENDING_TREATMENT = "pending_treatment",
  COMPLETED_TREATMENT = "completed_treatment",
}

export enum VisionStatus {
  NORMAL = "normal",
  MYOPIA = "myopia",
  HYPEROPIA = "hyperopia",
  ASTIGMATISM = "astigmatism",
  COLOR_BLINDNESS = "color_blindness",
  AMBLYOPIA = "amblyopia",
  GLASSES_REQUIRED = "glasses_required",
  CONTACT_LENSES = "contact_lenses",
}

export interface StudentHealthProfile {
  id: string;
  school_id: string;
  student_id: string;
  student_name: string;
  status: HealthProfileStatus;
  profile_version: number;
  last_screening_date: string;
  next_screening_date: string;
  health_score: number;
  bmi: number;
  blood_type: string;
  chronic_conditions: string[];
  current_medications: string[];
  allergies: string[];
  special_dietary_needs: string[];
  immunization_status: string;
  vision_status: VisionStatus;
  dental_status: DentalStatus;
  fitness_level: PhysicalFitnessLevel;
  nutrition_status: NutritionStatus;
  mental_health_status: string;
  emergency_protocol: string;
  assigned_nurse: string;
  health_notes: string;
  documents: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface HealthScreening {
  id: string;
  school_id: string;
  student_id: string;
  screening_type: ScreeningType;
  screening_date: string;
  conducted_by: string;
  location: string;
  status: string;
  results_summary: string;
  consent_obtained: ConsentStatus;
  notes: string;
  follow_up_required: boolean;
  follow_up_date: string;
  created_at: string;
  updated_at: string;
}

export interface HealthScreeningResult {
  id: string;
  school_id: string;
  screening_id: string;
  student_id: string;
  screening_type: ScreeningType;
  result_date: string;
  measured_value: string;
  normal_range: string;
  is_normal: boolean;
  severity: string;
  recommendation: string;
  follow_up_required: boolean;
  conducted_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface HealthReferral {
  id: string;
  school_id: string;
  student_id: string;
  referral_type: string;
  status: ReferralStatus;
  referred_by: string;
  referred_to: string;
  reason: string;
  urgency: string;
  referral_date: string;
  appointment_date: string;
  completion_date: string;
  outcome: string;
  follow_up_required: boolean;
  follow_up_date: string;
  notes: string;
  documents: string[];
  created_at: string;
  updated_at: string;
}

export interface HealthPlan {
  id: string;
  school_id: string;
  student_id: string;
  plan_name: string;
  plan_type: string;
  status: HealthPlanStatus;
  start_date: string;
  end_date: string;
  created_by: string;
  approved_by: string;
  goals: string[];
  actions: HealthPlanAction[];
  progress_percentage: number;
  review_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface HealthPlanAction {
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

export interface HealthAlert {
  id: string;
  school_id: string;
  student_id: string;
  alert_level: HealthAlertLevel;
  alert_type: string;
  message: string;
  triggered_by: string;
  triggered_at: string;
  acknowledged_by: string;
  acknowledged_at: string;
  resolved_by: string;
  resolved_at: string;
  resolution_notes: string;
  is_active: boolean;
  expires_at: string;
  notifications_sent: string[];
  created_at: string;
  updated_at: string;
}

export interface HealthDocument {
  id: string;
  school_id: string;
  student_id: string;
  document_type: HealthDocumentType;
  document_name: string;
  file_url: string;
  uploaded_by: string;
  upload_date: string;
  expiry_date: string;
  is_verified: boolean;
  verified_by: string;
  verified_at: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ConsentRecord {
  id: string;
  school_id: string;
  student_id: string;
  consent_type: string;
  status: ConsentStatus;
  granted_by: string;
  granted_date: string;
  expiry_date: string;
  withdrawal_date: string;
  scope: string[];
  restrictions: string[];
  parent_signature_url: string;
  witness_signature_url: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface NutritionAssessment {
  id: string;
  school_id: string;
  student_id: string;
  assessment_date: string;
  status: NutritionStatus;
  bmi_percentile: number;
  daily_calories: number;
  meal_frequency: number;
  breakfast_habits: string;
  fruit_vegetable_intake: string;
  water_intake: number;
  junk_food_frequency: string;
  dietary_restrictions: string[];
  nutritional_deficiencies: string[];
  recommendations: string[];
  assessed_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface PhysicalFitnessAssessment {
  id: string;
  school_id: string;
  student_id: string;
  assessment_date: string;
  fitness_level: PhysicalFitnessLevel;
  bmi: number;
  endurance_score: number;
  strength_score: number;
  flexibility_score: number;
  agility_score: number;
  body_fat_percentage: number;
  resting_heart_rate: number;
  medical_clearance: boolean;
  restrictions: string[];
  recommendations: string[];
  assessed_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface DentalAssessment {
  id: string;
  school_id: string;
  student_id: string;
  assessment_date: string;
  status: DentalStatus;
  teeth_count: number;
  decayed_teeth: number;
  filled_teeth: number;
  missing_teeth: number;
  gum_health: string;
  orthodontic_needs: boolean;
  treatment_needed: string[];
  last_dental_visit: string;
  next_recommended_visit: string;
  fluoridation_status: string;
  oral_hygiene_score: number;
  assessed_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VisionAssessment {
  id: string;
  school_id: string;
  student_id: string;
  assessment_date: string;
  status: VisionStatus;
  left_eye_acuity: string;
  right_eye_acuity: string;
  left_eye_pressure: number;
  right_eye_pressure: number;
  color_vision_normal: boolean;
  depth_perception: string;
  eye_alignment: string;
  glasses_prescribed: boolean;
  prescription_details: string;
  last_eye_exam: string;
  next_recommended_exam: string;
  assessed_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface HealthObservation {
  id: string;
  school_id: string;
  student_id: string;
  observation_date: string;
  observed_by: string;
  observation_type: string;
  description: string;
  severity: string;
  action_taken: string;
  parent_notified: boolean;
  parent_notified_at: string;
  follow_up_required: boolean;
  follow_up_date: string;
  attachments: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface HealthAppointment {
  id: string;
  school_id: string;
  student_id: string;
  appointment_type: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  provider_name: string;
  provider_specialty: string;
  location: string;
  status: string;
  reason: string;
  notes: string;
  reminder_sent: boolean;
  reminder_sent_at: string;
  completed: boolean;
  completion_notes: string;
  created_at: string;
  updated_at: string;
}
