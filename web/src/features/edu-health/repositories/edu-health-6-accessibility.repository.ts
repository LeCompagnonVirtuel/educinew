import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './edu-health-base.repository';

// ============================================================================
// EDU-HEALTH-6: Accessibility — Needs, Accommodations & Assistive Technology
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface EHAccessibilityNeed extends BaseEntity { student_id: string; need_type: 'physical'|'sensory'|'cognitive'|'learning'|'communication'|'motor'|'multiple'; description: string; diagnosis?: string; diagnosed_date?: string; severity: 'mild'|'moderate'|'severe'|'profound'; assessed_by: string; assessment_date: string; status: 'active'|'under_review'|'resolved'; }
export interface EHAccommodationPlan extends BaseEntity { student_id: string; need_id: string; plan_name: string; plan_type: 'educational'|'environmental'|'behavioral'|'assessment'|'technology'; accommodations: Record<string,unknown>[]; responsible_staff: string[]; start_date: string; review_date: string; parent_consent: boolean; student_agreement: boolean; status: 'active'|'reviewed'|'expired'|'amended'; version: number; }
export interface EHAssistiveTechnology extends BaseEntity { student_id: string; need_id: string; device_type: 'screen_reader'|'speech_to_text'|'text_to_speech'|'braille'|'alternative_keyboard'|'eye_tracking'|'switch_access'|'other'; device_name: string; device_model?: string; provider?: string; assigned_date: string; return_date?: string; training_completed: boolean; condition: 'excellent'|'good'|'fair'|'needs_replacement'; status: 'assigned'|'in_use'|'returned'|'replacement_needed'; }
export interface EHDisabilityRecord extends BaseEntity { student_id: string; disability_type: string; icd_code?: string; diagnosis_date: string; diagnosed_by: string; severity: string; permanent: boolean; documentation_url?: string; accommodations_required: string[]; status: 'active'|'under_review'|'resolved'; }
export interface EHAccessibilityAssessment extends BaseEntity { student_id: string; assessment_type: 'initial'| 'comprehensive'|'review'|'transition'; assessment_date: string; assessor_id: string; areas_assessed: string[]; findings: Record<string,unknown>; recommendations: Record<string,unknown>[]; score?: number; status: 'completed'|'pending'|'scheduled'; }
export interface EHAccessibilityAudit extends BaseEntity { audit_date: string; auditor_id: string; area_type: 'building'|'classroom'|'playground'|'library'|'restroom'|'transport'|'digital'; area_name: string; compliance_score: number; max_score: number; issues_found: Record<string,unknown>[]; recommendations: string[]; status: 'completed'|'in_progress'|'remediation'; }
export interface EHAccessibilityResource extends BaseEntity { resource_name: string; resource_type: 'software'|'hardware'|'service'|'training'|'material'; description: string; target_disability: string[]; provider?: string; cost?: number; available: boolean; stock_quantity?: number; contact_info?: string; }
export interface EHStaffTraining extends BaseEntity { training_name: string; training_type: 'disability_awareness'|'assistive_tech'| 'inclusive_practice'|'communication'|'behavior_support'; target_staff: string; description: string; duration_hours: number; provider: string; status: 'planned'|'in_progress'|'completed'; }
export interface EHStudentTraining extends BaseEntity { student_id: string; training_name: string; device_type?: string; training_date: string; trainer_id: string; duration_minutes: number; skills_covered: string[]; proficiency_level: 'beginner'|'intermediate'|'advanced'|'mastered'; follow_up_date?: string; }
export interface EHAccessibilityReview extends BaseEntity { student_id: string; plan_id: string; review_date: string; reviewer_id: string; previous_accommodations: Record<string,unknown>; new_accommodations: Record<string,unknown>; effectiveness_rating: number; student_feedback?: string; parent_feedback?: string; status: 'completed'|'pending'; }
export interface EHTransitionPlan extends BaseEntity { student_id: string; plan_type: 'entry'|'between_classes'|'between_levels'|'exit'; from_stage: string; to_stage: string; transition_date: string; accommodations_carried_forward: string[]; new_accommodations: string[]; responsible_staff: string; status: 'planned'|'in_progress'|'completed'; }
export interface EHAccessibilityMetric extends BaseEntity { metric_type: string; value: number; unit: string; dimension: Record<string,string>; period: string; calculated_at: string; }
export interface EHAccessibilityAlert extends BaseEntity { student_id: string; alert_type: 'plan_expiring'|'device_maintenance'| 'audit_due'|'review_needed'|'compliance_issue'; severity: 'info'|'warning'|'urgent'|'critical'; title: string; message: string; acknowledged: boolean; acknowledged_at?: string; action_taken?: string; }
export interface EHAccessibilityDocument extends BaseEntity { student_id: string; document_type: 'medical_report'|'assessment'|'plan'|'consent'|'compliance'; document_name: string; file_url: string; file_size: number; uploaded_by: string; verified: boolean; verified_by?: string; expiry_date?: string; }
export interface EHAccessibilityCompliance extends BaseEntity { regulation_name: string; regulation_body: string; requirement: string; status: 'compliant'|'non_compliant'|'partial'|'exempt'; evidence: string; last_checked: string; next_check: string; responsible_person: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const EDU_HEALTH_6_TABLE_NAMES: Record<string, string> = {
  EHAccessibilityNeed: 'eh_accessibility_needs',
  EHAccommodationPlan: 'eh_accommodation_plans',
  EHAssistiveTechnology: 'eh_assistive_technologies',
  EHDisabilityRecord: 'eh_disability_records',
  EHAccessibilityAssessment: 'eh_accessibility_assessments',
  EHAccessibilityAudit: 'eh_accessibility_audits',
  EHAccessibilityResource: 'eh_accessibility_resources',
  EHStaffTraining: 'eh_staff_trainings',
  EHStudentTraining: 'eh_student_trainings',
  EHAccessibilityReview: 'eh_accessibility_reviews',
  EHTransitionPlan: 'eh_transition_plans',
  EHAccessibilityMetric: 'eh_accessibility_metrics',
  EHAccessibilityAlert: 'eh_accessibility_alerts',
  EHAccessibilityDocument: 'eh_accessibility_documents',
  EHAccessibilityCompliance: 'eh_accessibility_compliances',
};

// ============================================================================
// Repository Interface — typed CRUD for each entity
// ============================================================================
export interface EDU_HEALTH_6_Repository {
  accessibilityNeeds: CrudRepository<EHAccessibilityNeed>;
  accommodationPlans: CrudRepository<EHAccommodationPlan>;
  assistiveTechnologies: CrudRepository<EHAssistiveTechnology>;
  disabilityRecords: CrudRepository<EHDisabilityRecord>;
  accessibilityAssessments: CrudRepository<EHAccessibilityAssessment>;
  accessibilityAudits: CrudRepository<EHAccessibilityAudit>;
  accessibilityResources: CrudRepository<EHAccessibilityResource>;
  staffTrainings: CrudRepository<EHStaffTraining>;
  studentTrainings: CrudRepository<EHStudentTraining>;
  accessibilityReviews: CrudRepository<EHAccessibilityReview>;
  transitionPlans: CrudRepository<EHTransitionPlan>;
  accessibilityMetrics: CrudRepository<EHAccessibilityMetric>;
  accessibilityAlerts: CrudRepository<EHAccessibilityAlert>;
  accessibilityDocuments: CrudRepository<EHAccessibilityDocument>;
  accessibilityCompliances: CrudRepository<EHAccessibilityCompliance>;
}

// ============================================================================
// Factory
// ============================================================================
export function createEDU_HEALTH_6_Repository(supabase: SupabaseClient): EDU_HEALTH_6_Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    accessibilityNeeds: crud<EHAccessibilityNeed>(EDU_HEALTH_6_TABLE_NAMES.EHAccessibilityNeed),
    accommodationPlans: crud<EHAccommodationPlan>(EDU_HEALTH_6_TABLE_NAMES.EHAccommodationPlan),
    assistiveTechnologies: crud<EHAssistiveTechnology>(EDU_HEALTH_6_TABLE_NAMES.EHAssistiveTechnology),
    disabilityRecords: crud<EHDisabilityRecord>(EDU_HEALTH_6_TABLE_NAMES.EHDisabilityRecord),
    accessibilityAssessments: crud<EHAccessibilityAssessment>(EDU_HEALTH_6_TABLE_NAMES.EHAccessibilityAssessment),
    accessibilityAudits: crud<EHAccessibilityAudit>(EDU_HEALTH_6_TABLE_NAMES.EHAccessibilityAudit),
    accessibilityResources: crud<EHAccessibilityResource>(EDU_HEALTH_6_TABLE_NAMES.EHAccessibilityResource),
    staffTrainings: crud<EHStaffTraining>(EDU_HEALTH_6_TABLE_NAMES.EHStaffTraining),
    studentTrainings: crud<EHStudentTraining>(EDU_HEALTH_6_TABLE_NAMES.EHStudentTraining),
    accessibilityReviews: crud<EHAccessibilityReview>(EDU_HEALTH_6_TABLE_NAMES.EHAccessibilityReview),
    transitionPlans: crud<EHTransitionPlan>(EDU_HEALTH_6_TABLE_NAMES.EHTransitionPlan),
    accessibilityMetrics: crud<EHAccessibilityMetric>(EDU_HEALTH_6_TABLE_NAMES.EHAccessibilityMetric),
    accessibilityAlerts: crud<EHAccessibilityAlert>(EDU_HEALTH_6_TABLE_NAMES.EHAccessibilityAlert),
    accessibilityDocuments: crud<EHAccessibilityDocument>(EDU_HEALTH_6_TABLE_NAMES.EHAccessibilityDocument),
    accessibilityCompliances: crud<EHAccessibilityCompliance>(EDU_HEALTH_6_TABLE_NAMES.EHAccessibilityCompliance),
  };
}
