import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './edu-health-base.repository';

// ============================================================================
// EDU-HEALTH-1: Student Health — Records, Checkups, Vaccinations & Conditions
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface EHStudentHealthRecord extends BaseEntity { student_id: string; blood_type?: string; height_cm?: number; weight_kg?: number; vision_left?: string; vision_right?: string; hearing_left?: string; hearing_right?: string; chronic_conditions: string[]; disability_status: 'none'|'physical'|'cognitive'|'sensory'|'multiple'; emergency_contact_name: string; emergency_contact_phone: string; insurance_provider?: string; insurance_number?: string; primary_physician?: string; last_checkup_date?: string; status: 'active'|'archived'; metadata: Record<string,unknown>; }
export interface EHHealthCheckup extends BaseEntity { student_id: string; checkup_date: string; checkup_type: 'annual'|'admission'|'sports'|'follow_up'|'special'; examiner_name: string; examiner_license?: string; height_cm?: number; weight_kg?: number; bmi?: number; blood_pressure?: string; heart_rate?: number; general_findings: string; recommendations: string[]; follow_up_required: boolean; follow_up_date?: string; status: 'completed'|'pending'|'cancelled'; }
export interface EHVaccinationRecord extends BaseEntity { student_id: string; vaccine_name: string; vaccine_code: string; dose_number: number; total_doses: number; administration_date: string; batch_number: string; manufacturer: string; site: string; administered_by: string; next_dose_date?: string; status: 'completed'|'pending'|'overdue'|'exempt'; exemption_reason?: string; certificate_url?: string; }
export interface EHMedicalCondition extends BaseEntity { student_id: string; condition_name: string; condition_code?: string; diagnosis_date: string; severity: 'mild'|'moderate'|'severe'|'critical'; status: 'active'|'resolved'|'managed'|'chronic'; treating_physician?: string; treatment_plan: string; medications: string[]; accommodations: string[]; last_reviewed_date: string; next_review_date?: string; notes?: string; }
export interface EHAllergy extends BaseEntity { student_id: string; allergen: string; allergen_type: 'food'|'drug'|'environmental'|'insect'|'latex'|'other'; severity: 'mild'|'moderate'|'severe'|'life_threatening'; reaction_symptoms: string[]; onset_date?: string; management_plan: string; epipen_required: boolean; last_incident_date?: string; status: 'active'|'outgrown'|'resolved'; }
export interface EHMedication extends BaseEntity { student_id: string; medication_name: string; generic_name?: string; dosage: string; frequency: string; route: 'oral'|'topical'|'inhalation'|'injection'|'other'; start_date: string; end_date?: string; prescribed_by: string; purpose: string; side_effects: string[]; school_administration: boolean; administration_time?: string; administered_by?: string; status: 'active'|'completed'|'discontinued'|'paused'; }
export interface EHHealthScreening extends BaseEntity { student_id: string; screening_type: 'scoliosis'|'vision'|'hearing'|'dental'|'bmi'|'mental_health'|'other'; screening_date: string; result: 'normal'|'abnormal'|'borderline'|'requires_followup'; score?: number; details: Record<string,unknown>; screener_name: string; follow_up_required: boolean; follow_up_action?: string; status: 'completed'|'pending'|'scheduled'; }
export interface EHHealthGoal extends BaseEntity { student_id: string; goal_type: 'nutrition'|'exercise'|'sleep'| 'mental_wellness'|'medication_adherence'|'other'; description: string; target_value?: number; current_value?: number; unit?: string; start_date: string; target_date: string; status: 'active'|'achieved'|'abandoned'|'revised'; progress_notes: string[]; }
export interface EHNutritionLog extends BaseEntity { student_id: string; log_date: string; meal_type: 'breakfast'|'lunch'|'dinner'|'snack'; items: Record<string,unknown>[]; calories?: number; water_intake_ml?: number; notes?: string; }
export interface EHHealthAlert extends BaseEntity { student_id: string; alert_type: 'medication_due'|'checkup_due'|'vaccination_due'|'condition_flare'|'allergy_exposure'|'other'; severity: 'info'|'warning'|'urgent'|'critical'; title: string; message: string; triggered_by: string; acknowledged: boolean; acknowledged_at?: string; acknowledged_by?: string; action_taken?: string; }
export interface EHStudentHealthSummary extends BaseEntity { student_id: string; summary_date: string; overall_status: 'healthy'|'needs_attention'|'under_care'|'emergency'; active_conditions: number; active_allergies: number; active_medications: number; upcoming_checkups: number; overdue_vaccinations: number; health_score: number; risk_flags: string[]; generated_by: string; }
export interface EHHealthDocument extends BaseEntity { student_id: string; document_type: 'medical_report'|'prescription'|'certificate'|'insurance'|'consent'|'other'; document_name: string; file_url: string; file_size: number; mime_type: string; uploaded_by: string; verified: boolean; verified_by?: string; verified_at?: string; expiry_date?: string; }
export interface EHHealthConsent extends BaseEntity { student_id: string; consent_type: 'treatment'|'medication'|'screening'|'data_sharing'|'emergency'; guardian_name: string; guardian_signature_url?: string; consent_date: string; expiry_date?: string; scope: string[]; revoked: boolean; revoked_at?: string; witness_name?: string; }
export interface EHHealthMilestone extends BaseEntity { student_id: string; milestone_type: 'first_vaccination'|'dental_checkup'|'vision_screening'|'physical_exam'|'mental_health_screen'; milestone_date: string; description: string; recorded_by: string; evidence_url?: string; }
export interface EHHealthMetric extends BaseEntity { student_id: string; metric_type: string; value: number; unit: string; measured_date: string; measured_by?: string; context?: Record<string,unknown>; trend?: 'improving'|'stable'|'declining'; }

// ============================================================================
// Entity table name map
// ============================================================================
export const EDU_HEALTH_1_TABLE_NAMES: Record<string, string> = {
  EHStudentHealthRecord: 'eh_student_health_records',
  EHHealthCheckup: 'eh_health_checkups',
  EHVaccinationRecord: 'eh_vaccination_records',
  EHMedicalCondition: 'eh_medical_conditions',
  EHAllergy: 'eh_allergies',
  EHMedication: 'eh_medications',
  EHHealthScreening: 'eh_health_screenings',
  EHHealthGoal: 'eh_health_goals',
  EHNutritionLog: 'eh_nutrition_logs',
  EHHealthAlert: 'eh_health_alerts',
  EHStudentHealthSummary: 'eh_student_health_summaries',
  EHHealthDocument: 'eh_health_documents',
  EHHealthConsent: 'eh_health_consents',
  EHHealthMilestone: 'eh_health_milestones',
  EHHealthMetric: 'eh_health_metrics',
};

// ============================================================================
// Repository Interface — typed CRUD for each entity
// ============================================================================
export interface EDU_HEALTH_1_Repository {
  studentHealthRecords: CrudRepository<EHStudentHealthRecord>;
  healthCheckups: CrudRepository<EHHealthCheckup>;
  vaccinationRecords: CrudRepository<EHVaccinationRecord>;
  medicalConditions: CrudRepository<EHMedicalCondition>;
  allergies: CrudRepository<EHAllergy>;
  medications: CrudRepository<EHMedication>;
  healthScreenings: CrudRepository<EHHealthScreening>;
  healthGoals: CrudRepository<EHHealthGoal>;
  nutritionLogs: CrudRepository<EHNutritionLog>;
  healthAlerts: CrudRepository<EHHealthAlert>;
  studentHealthSummaries: CrudRepository<EHStudentHealthSummary>;
  healthDocuments: CrudRepository<EHHealthDocument>;
  healthConsents: CrudRepository<EHHealthConsent>;
  healthMilestones: CrudRepository<EHHealthMilestone>;
  healthMetrics: CrudRepository<EHHealthMetric>;
}

// ============================================================================
// Factory
// ============================================================================
export function createEDU_HEALTH_1_Repository(supabase: SupabaseClient): EDU_HEALTH_1_Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    studentHealthRecords: crud<EHStudentHealthRecord>(EDU_HEALTH_1_TABLE_NAMES.EHStudentHealthRecord),
    healthCheckups: crud<EHHealthCheckup>(EDU_HEALTH_1_TABLE_NAMES.EHHealthCheckup),
    vaccinationRecords: crud<EHVaccinationRecord>(EDU_HEALTH_1_TABLE_NAMES.EHVaccinationRecord),
    medicalConditions: crud<EHMedicalCondition>(EDU_HEALTH_1_TABLE_NAMES.EHMedicalCondition),
    allergies: crud<EHAllergy>(EDU_HEALTH_1_TABLE_NAMES.EHAllergy),
    medications: crud<EHMedication>(EDU_HEALTH_1_TABLE_NAMES.EHMedication),
    healthScreenings: crud<EHHealthScreening>(EDU_HEALTH_1_TABLE_NAMES.EHHealthScreening),
    healthGoals: crud<EHHealthGoal>(EDU_HEALTH_1_TABLE_NAMES.EHHealthGoal),
    nutritionLogs: crud<EHNutritionLog>(EDU_HEALTH_1_TABLE_NAMES.EHNutritionLog),
    healthAlerts: crud<EHHealthAlert>(EDU_HEALTH_1_TABLE_NAMES.EHHealthAlert),
    studentHealthSummaries: crud<EHStudentHealthSummary>(EDU_HEALTH_1_TABLE_NAMES.EHStudentHealthSummary),
    healthDocuments: crud<EHHealthDocument>(EDU_HEALTH_1_TABLE_NAMES.EHHealthDocument),
    healthConsents: crud<EHHealthConsent>(EDU_HEALTH_1_TABLE_NAMES.EHHealthConsent),
    healthMilestones: crud<EHHealthMilestone>(EDU_HEALTH_1_TABLE_NAMES.EHHealthMilestone),
    healthMetrics: crud<EHHealthMetric>(EDU_HEALTH_1_TABLE_NAMES.EHHealthMetric),
  };
}
