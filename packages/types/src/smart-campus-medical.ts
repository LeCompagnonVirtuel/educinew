// Smart Campus Enterprise Types - Infirmerie
// Phase 2.8 - EduCI Platform

// =============================================================================
// ENUMS
// =============================================================================

export enum VisitType {
  EMERGENCY = "emergency",
  SCHEDULED = "scheduled",
  WALK_IN = "walk_in",
  FOLLOW_UP = "follow_up",
  VACCINATION = "vaccination",
  CHECKUP = "checkup",
  ILLNESS = "illness",
  INJURY = "injury",
}

export enum VisitStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  REFERRED = "referred",
  HOSPITALIZED = "hospitalized",
}

export enum TreatmentType {
  MEDICATION = "medication",
  FIRST_AID = "first_aid",
  WOUND_CARE = "wound_care",
  THERAPY = "therapy",
  MONITORING = "monitoring",
  REST = "rest",
  REFERRAL = "referral",
  SURGERY = "surgery",
}

export enum VaccinationStatus {
  PENDING = "pending",
  SCHEDULED = "scheduled",
  COMPLETED = "completed",
  DELAYED = "delayed",
  CANCELLED = "cancelled",
  OVERDUE = "overdue",
  EXEMPTED = "exempted",
}

export enum AllergySeverity {
  MILD = "mild",
  MODERATE = "moderate",
  SEVERE = "severe",
  LIFE_THREATENING = "life_threatening",
}

export enum MedicationFrequency {
  ONCE = "once",
  TWICE_DAILY = "twice_daily",
  THREE_TIMES_DAILY = "three_times_daily",
  FOUR_TIMES_DAILY = "four_times_daily",
  EVERY_4_HOURS = "every_4_hours",
  EVERY_6_HOURS = "every_6_hours",
  EVERY_8_HOURS = "every_8_hours",
  AS_NEEDED = "as_needed",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

export enum EmergencyContactRelation {
  PARENT = "parent",
  GUARDIAN = "guardian",
  GRANDPARENT = "grandparent",
  SIBLING = "sibling",
  AUNT_UNCLE = "aunt_uncle",
  OTHER = "other",
}

export enum AccidentType {
  FALL = "fall",
  COLLISION = "collision",
  BURN = "burn",
  CUT = "cut",
  FRACTURE = "fracture",
  POISONING = "poisoning",
  DROWNING = "drowning",
  SPORTS = "sports",
  OTHER = "other",
}

export enum CertificateType {
  MEDICAL = "medical",
  FITNESS = "fitness",
  VACCINATION = "vaccination",
  ALLERGY = "allergy",
  BLOOD_TYPE = "blood_type",
  DISABILITY = "disability",
}

export enum MedicalRecordStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ARCHIVED = "archived",
  TRANSFERRED = "transferred",
}

export enum HealthReportType {
  ANNUAL = "annual",
  ENROLLMENT = "enrollment",
  SPORTS = "sports",
  TRAVEL = "travel",
  EMPLOYMENT = "employment",
  SPECIAL = "special",
}

export enum MedicationStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  DISCONTINUED = "discontinued",
  ON_HOLD = "on_hold",
  EXPIRED = "expired",
}

export enum ImmunizationStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  OVERDUE = "overdue",
  EXEMPTED = "exempted",
}

export enum MedicalAllergy {
  PEANUTS = "peanuts",
  TREE_NUTS = "tree_nuts",
  MILK = "milk",
  EGGS = "eggs",
  WHEAT = "wheat",
  SOY = "soy",
  FISH = "fish",
  SHELLFISH = "shellfish",
  SESAME = "sesame",
  OTHER = "other",
}

export enum VisitPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
  EMERGENCY = "emergency",
}

// =============================================================================
// INTERFACES
// =============================================================================

export interface MedicalRecord {
  id: string;
  school_id: string;
  student_id: string;
  student_name: string;
  date_of_birth: string;
  gender: string;
  blood_type: string;
  height: number;
  weight: number;
  status: MedicalRecordStatus;
  primary_physician: string;
  primary_physician_phone: string;
  insurance_provider: string;
  insurance_policy_number: string;
  medical_conditions: string[];
  past_surgeries: string[];
  family_medical_history: string[];
  emergency_contacts: EmergencyContact[];
  allergies: MedicalAllergy2[];
  medications: Medication[];
  vaccinations: Vaccination[];
  notes: string;
  documents: string[];
  created_at: string;
  updated_at: string;
}

export interface MedicalRecordCreate {
  school_id: string;
  student_id: string;
  student_name: string;
  date_of_birth: string;
  gender: string;
  blood_type: string;
  height: number;
  weight: number;
  primary_physician: string;
  primary_physician_phone: string;
  insurance_provider: string;
  insurance_policy_number: string;
  medical_conditions: string[];
  past_surgeries: string[];
  family_medical_history: string[];
  emergency_contacts: EmergencyContactCreate[];
  allergies: MedicalAllergyCreate[];
  medications: MedicationCreate[];
  vaccinations: VaccinationCreate[];
  notes: string;
  documents: string[];
}

export interface MedicalRecordUpdate {
  student_name?: string;
  date_of_birth?: string;
  gender?: string;
  blood_type?: string;
  height?: number;
  weight?: number;
  status?: MedicalRecordStatus;
  primary_physician?: string;
  primary_physician_phone?: string;
  insurance_provider?: string;
  insurance_policy_number?: string;
  medical_conditions?: string[];
  past_surgeries?: string[];
  family_medical_history?: string[];
  notes?: string;
  documents?: string[];
}

export interface MedicalVisit {
  id: string;
  school_id: string;
  student_id: string;
  student_name: string;
  medical_record_id: string;
  type: VisitType;
  status: VisitStatus;
  priority: VisitPriority;
  visit_date: string;
  arrival_time: string;
  departure_time: string;
  chief_complaint: string;
  symptoms: string[];
  vital_signs: {
    temperature: number;
    blood_pressure_systolic: number;
    blood_pressure_diastolic: number;
    heart_rate: number;
    respiratory_rate: number;
    oxygen_saturation: number;
  };
  diagnosis: string;
  treatments: string[];
  medications_prescribed: string[];
  follow_up_date: string;
  follow_up_notes: string;
  referred_to: string;
  referred_reason: string;
  parent_notified: boolean;
  parent_notified_at: string;
  notes: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface MedicalVisitCreate {
  school_id: string;
  student_id: string;
  student_name: string;
  medical_record_id: string;
  type: VisitType;
  priority: VisitPriority;
  visit_date: string;
  arrival_time: string;
  chief_complaint: string;
  symptoms: string[];
  vital_signs: {
    temperature: number;
    blood_pressure_systolic: number;
    blood_pressure_diastolic: number;
    heart_rate: number;
    respiratory_rate: number;
    oxygen_saturation: number;
  };
  diagnosis: string;
  treatments: string[];
  medications_prescribed: string[];
  follow_up_date: string;
  follow_up_notes: string;
  referred_to: string;
  referred_reason: string;
  notes: string;
  created_by: string;
}

export interface Treatment {
  id: string;
  school_id: string;
  visit_id: string;
  student_id: string;
  treatment_type: TreatmentType;
  description: string;
  medication_name: string;
  dosage: string;
  frequency: MedicationFrequency;
  duration_days: number;
  start_date: string;
  end_date: string;
  administered_by: string;
  administered_at: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface TreatmentCreate {
  school_id: string;
  visit_id: string;
  student_id: string;
  treatment_type: TreatmentType;
  description: string;
  medication_name: string;
  dosage: string;
  frequency: MedicationFrequency;
  duration_days: number;
  start_date: string;
  end_date: string;
  administered_by: string;
  notes: string;
}

export interface Vaccination {
  id: string;
  school_id: string;
  student_id: string;
  medical_record_id: string;
  vaccine_name: string;
  vaccine_code: string;
  dose_number: number;
  total_doses: number;
  status: VaccinationStatus;
  scheduled_date: string;
  administered_date: string;
  administered_by: string;
  lot_number: string;
  manufacturer: string;
  injection_site: string;
  next_dose_date: string;
  side_effects: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VaccinationCreate {
  school_id: string;
  student_id: string;
  medical_record_id: string;
  vaccine_name: string;
  vaccine_code: string;
  dose_number: number;
  total_doses: number;
  status: VaccinationStatus;
  scheduled_date: string;
  administered_date: string;
  administered_by: string;
  lot_number: string;
  manufacturer: string;
  injection_site: string;
  next_dose_date: string;
  side_effects: string[];
  notes: string;
}

export interface MedicalAllergy2 {
  id: string;
  school_id: string;
  student_id: string;
  medical_record_id: string;
  allergen: MedicalAllergy;
  custom_allergen: string;
  severity: AllergySeverity;
  reaction_description: string;
  diagnosed_date: string;
  diagnosed_by: string;
  is_active: boolean;
  emergency_action: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MedicalAllergyCreate {
  school_id: string;
  student_id: string;
  medical_record_id: string;
  allergen: MedicalAllergy;
  custom_allergen: string;
  severity: AllergySeverity;
  reaction_description: string;
  diagnosed_date: string;
  diagnosed_by: string;
  is_active: boolean;
  emergency_action: string;
  notes: string;
}

export interface MedicalHistory {
  id: string;
  school_id: string;
  student_id: string;
  medical_record_id: string;
  condition_name: string;
  diagnosis_date: string;
  diagnosed_by: string;
  treatment: string;
  status: string;
  resolved_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MedicalHistoryCreate {
  school_id: string;
  student_id: string;
  medical_record_id: string;
  condition_name: string;
  diagnosis_date: string;
  diagnosed_by: string;
  treatment: string;
  status: string;
  resolved_date: string;
  notes: string;
}

export interface Medication {
  id: string;
  school_id: string;
  student_id: string;
  medical_record_id: string;
  name: string;
  dosage: string;
  frequency: MedicationFrequency;
  route: string;
  start_date: string;
  end_date: string;
  prescribed_by: string;
  reason: string;
  status: MedicationStatus;
  side_effects: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MedicationCreate {
  school_id: string;
  student_id: string;
  medical_record_id: string;
  name: string;
  dosage: string;
  frequency: MedicationFrequency;
  route: string;
  start_date: string;
  end_date: string;
  prescribed_by: string;
  reason: string;
  status: MedicationStatus;
  side_effects: string[];
  notes: string;
}

export interface EmergencyContact {
  id: string;
  school_id: string;
  student_id: string;
  name: string;
  relation: EmergencyContactRelation;
  phone_primary: string;
  phone_secondary: string;
  email: string;
  address: string;
  is_primary: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyContactCreate {
  school_id: string;
  student_id: string;
  name: string;
  relation: EmergencyContactRelation;
  phone_primary: string;
  phone_secondary: string;
  email: string;
  address: string;
  is_primary: boolean;
  notes: string;
}

export interface Accident {
  id: string;
  school_id: string;
  student_id: string;
  student_name: string;
  type: AccidentType;
  description: string;
  location: string;
  date_time: string;
  reported_by: string;
  reported_to: string;
  witnesses: string[];
  injuries_sustained: string[];
  treatment_provided: string;
  follow_up_required: boolean;
  follow_up_date: string;
  parent_notified: boolean;
  parent_notified_at: string;
  photos: string[];
  incident_report_url: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AccidentCreate {
  school_id: string;
  student_id: string;
  student_name: string;
  type: AccidentType;
  description: string;
  location: string;
  date_time: string;
  reported_by: string;
  reported_to: string;
  witnesses: string[];
  injuries_sustained: string[];
  treatment_provided: string;
  follow_up_required: boolean;
  follow_up_date: string;
  parent_notified: boolean;
  parent_notified_at: string;
  photos: string[];
  incident_report_url: string;
  notes: string;
}

export interface HealthReport {
  id: string;
  school_id: string;
  student_id: string;
  student_name: string;
  report_type: HealthReportType;
  report_date: string;
  generated_by: string;
  medical_record_id: string;
  height: number;
  weight: number;
  bmi: number;
  vision_test: string;
  hearing_test: string;
  dental_check: string;
  overall_health_status: string;
  recommendations: string[];
  conditions_noted: string[];
  medications_current: string[];
  immunizations_current: boolean;
  fitness_level: string;
  notes: string;
  documents: string[];
  created_at: string;
  updated_at: string;
}

export interface HealthReportCreate {
  school_id: string;
  student_id: string;
  student_name: string;
  report_type: HealthReportType;
  report_date: string;
  generated_by: string;
  medical_record_id: string;
  height: number;
  weight: number;
  bmi: number;
  vision_test: string;
  hearing_test: string;
  dental_check: string;
  overall_health_status: string;
  recommendations: string[];
  conditions_noted: string[];
  medications_current: string[];
  immunizations_current: boolean;
  fitness_level: string;
  notes: string;
  documents: string[];
}

export interface MedicalCertificate {
  id: string;
  school_id: string;
  student_id: string;
  student_name: string;
  certificate_type: CertificateType;
  issue_date: string;
  expiry_date: string;
  issued_by: string;
  issued_by_title: string;
  reason: string;
  validity_period: string;
  restrictions: string[];
  notes: string;
  document_url: string;
  created_at: string;
  updated_at: string;
}

export interface MedicalCertificateCreate {
  school_id: string;
  student_id: string;
  student_name: string;
  certificate_type: CertificateType;
  issue_date: string;
  expiry_date: string;
  issued_by: string;
  issued_by_title: string;
  reason: string;
  validity_period: string;
  restrictions: string[];
  notes: string;
  document_url: string;
}

export interface MedicalQuery {
  school_id: string;
  student_id?: string;
  student_name?: string;
  visit_type?: VisitType[];
  visit_status?: VisitStatus[];
  priority?: VisitPriority[];
  date_from?: string;
  date_to?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface MedicalFilter {
  school_id: string;
  student_id?: string;
  visit_type?: VisitType[];
  visit_status?: VisitStatus[];
  priority?: VisitPriority[];
  treatment_type?: TreatmentType[];
  has_allergies?: boolean;
  has_chronic_conditions?: boolean;
  vaccination_status?: VaccinationStatus[];
  date_from?: string;
  date_to?: string;
  age_from?: number;
  age_to?: number;
  gender?: string;
  blood_type?: string;
}

export interface MedicalAnalytics {
  total_students: number;
  students_with_records: number;
  total_visits: number;
  visits_this_month: number;
  visits_by_type: Array<{
    type: VisitType;
    count: number;
    percentage: number;
  }>;
  visits_by_priority: Array<{
    priority: VisitPriority;
    count: number;
    percentage: number;
  }>;
  common_conditions: Array<{
    condition: string;
    count: number;
    percentage: number;
  }>;
  vaccination_coverage: {
    total_vaccinations: number;
    completed: number;
    pending: number;
    overdue: number;
    coverage_percentage: number;
  };
  allergy_statistics: {
    total_allergies: number;
    by_type: Array<{
      allergen: MedicalAllergy;
      count: number;
    }>;
    by_severity: Array<{
      severity: AllergySeverity;
      count: number;
    }>;
  };
  medication_usage: {
    total_active_medications: number;
    most_common: Array<{
      medication: string;
      count: number;
    }>;
  };
  accident_statistics: {
    total_accidents: number;
    by_type: Array<{
      type: AccidentType;
      count: number;
    }>;
  };
  period_start: string;
  period_end: string;
  generated_at: string;
}

export interface MedicalReport {
  id: string;
  school_id: string;
  report_type: string;
  period_start: string;
  period_end: string;
  generated_at: string;
  generated_by: string;
  data: Record<string, unknown>;
  summary: string;
  recommendations: string[];
  created_at: string;
  updated_at: string;
}

export interface MedicationDosage {
  id: string;
  school_id: string;
  student_id: string;
  medication_id: string;
  dosage: string;
  frequency: MedicationFrequency;
  time_of_day: string[];
  start_date: string;
  end_date: string;
  prescribed_by: string;
  is_active: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VaccinationSchedule {
  id: string;
  school_id: string;
  vaccine_name: string;
  vaccine_code: string;
  target_age_group: string;
  dose_number: number;
  recommended_age_months: number;
  interval_months: number;
  is_mandatory: boolean;
  status: ImmunizationStatus;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AllergyAlert {
  id: string;
  school_id: string;
  student_id: string;
  student_name: string;
  allergen: MedicalAllergy;
  custom_allergen: string;
  severity: AllergySeverity;
  emergency_action: string;
  emergency_contact: string;
  emergency_phone: string;
  is_active: boolean;
  alert_sent: boolean;
  alert_sent_at: string;
  notes: string;
  created_at: string;
  updated_at: string;
}
