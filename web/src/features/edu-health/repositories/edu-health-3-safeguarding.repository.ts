import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './edu-health-base.repository';

// ============================================================================
// EDU-HEALTH-3: Safeguarding — Concerns, Case Management & Protection
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface EHSafeguardingConcern extends BaseEntity { reporter_id: string; reporter_role: string; student_id: string; concern_type: 'neglect'|'physical'|'emotional'|'sexual'|'radicalization'|'exploitation'|'online'|'other'; description: string; date_disclosed?: string; date_observed?: string; severity: 'low'|'moderate'|'high'|'critical'; immediate_risk: boolean; evidence_description: string; witnesses: string[]; status: 'reported'|'under_investigation'|'referred'|'closed'|'escalated'; assigned_to?: string; }
export interface EHCaseRecord extends BaseEntity { concern_id: string; student_id: string; case_number: string; case_type: 'safeguarding'| 'child_protection'|'welfare'|'missing'|'trafficking'; assigned_swm: string; start_date: string; status: 'open'|'in_progress'| 'multi_agency'|'closed'|'escalated'; risk_level: 'low'|'moderate'|'high'|'critical'; closure_date?: string; closure_reason?: string; }
export interface EHRiskAssessment extends BaseEntity { case_id: string; student_id: string; assessment_date: string; assessor_id: string; risk_type: 'physical'|'emotional'|'sexual'|'neglect'|'exploitation'|'self_harm'; likelihood: 'low'|'medium'|'high'|'very_high'; impact: 'low'|'medium'|'high'|'very_high'; overall_risk: 'low'|'moderate'|'high'|'critical'; protective_factors: string[]; risk_factors: string[]; actions_required: string[]; next_review_date: string; }
export interface EHProtectionPlan extends BaseEntity { case_id: string; student_id: string; plan_type: 'child_in_need'|'child_protection'|'safety'|'transition'; plan_date: string; objectives: Record<string,unknown>[]; actions: Record<string,unknown>[]; responsible_parties: string[]; review_date: string; parent_consent: boolean; status: 'active'|'reviewed'|'completed'|'amended'; version: number; }
export interface EHMultiAgencyReferral extends BaseEntity { case_id: string; referral_agency: string; referral_type: 'social_services'|'health'|'education'|'police'|'housing'|'other'; referral_date: string; referral_reason: string; urgency: 'routine'|'urgent'|'emergency'; referrer_name: string; referrer_contact: string; outcome?: string; status: 'submitted'|'acknowledged'|'accepted'|'rejected'|'completed'; }
export interface EHSafeguardingTraining extends BaseEntity { training_name: string; training_type: 'level_1'|'level_2'|'level_3'|'designated_lead'|'online_safety'|'contextual'; provider: string; date_taken: string; expiry_date?: string; certificate_url?: string; staff_id: string; status: 'completed'|'in_progress'|'expired'|'scheduled'; }
export interface EHSafeguardingPolicy extends BaseEntity { policy_name: string; version: string; effective_date: string; review_date: string; content_hash: string; sections: Record<string,unknown>[]; approved_by: string; status: 'draft'|'active'|'under_review'|'archived'; training_required: boolean; }
export interface EHMissingStudent extends BaseEntity { student_id: string; reported_by: string; reported_date: string; last_known_location?: string; last_seen_time: string; last_seen_date: string; circumstances: string; previous_incidents: number; status: 'reported'|'searching'|'found'|'referred'|'closed'; found_date?: string; found_location?: string; outcome?: string; police_ref?: string; }
export interface EHOnlineSafetyIncident extends BaseEntity { student_id: string; incident_date: string; platform: string; incident_type: 'cyberbullying'|'grooming'|'exposure'|'extortion'|'misinformation'|'other'; description: string; evidence_urls: string[]; reported_to_platform: boolean; reported_to_police: boolean; status: 'reported'|'investigating'|'resolved'|'escalated'; }
export interface EHDBSCheck extends BaseEntity { staff_id: string; check_type: 'basic'|'enhanced'|'enhanced_with_lists'; application_date: string; issue_date?: string; expiry_date?: string; certificate_number: string; status: 'applied'|'issued'|'renewal_due'|'expired'; barred_list_checked: boolean; result: 'clear'|'disclosed'|'pending'; }
export interface EHDesignatedSafeguardingLead extends BaseEntity { staff_id: string; staff_name: string; role: 'dsl'|'ddsl'|'safeguarding_governor'; appointment_date: string; training_date: string; training_expiry: string; contact_phone: string; contact_email: string; status: 'active'|'inactive'|'acting'; }
export interface EHSafeguardingAlert extends BaseEntity { student_id: string; alert_type: 'concern_raised'|'plan_review_due'|'training_overdue'|'risk_escalation'|'referral_pending'; severity: 'info'|'warning'|'urgent'|'critical'; title: string; message: string; assigned_to: string; acknowledged: boolean; acknowledged_at?: string; action_taken?: string; }
export interface EHStudentVoiceRecord extends BaseEntity { student_id: string; record_date: string; concern_type: 'safety'|'bullying'|'wellbeing'|'environment'|'other'; description: string; is_anonymous: boolean; follow_up_required: boolean; follow_up_action?: string; status: 'received'|'investigating'|'resolved'|'no_action'; }
export interface EHSafeguardingAudit extends BaseEntity { case_id: string; action: string; actor_id: string; actor_role: string; details: Record<string,unknown>; ip_address: string; timestamp: string; }
export interface EHSafeguardingMetric extends BaseEntity { metric_type: string; value: number; unit: string; dimension: Record<string,string>; period: string; calculated_at: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const EDU_HEALTH_3_TABLE_NAMES: Record<string, string> = {
  EHSafeguardingConcern: 'eh_safeguarding_concerns',
  EHCaseRecord: 'eh_case_records',
  EHRiskAssessment: 'eh_risk_assessments',
  EHProtectionPlan: 'eh_protection_plans',
  EHMultiAgencyReferral: 'eh_multi_agency_referrals',
  EHSafeguardingTraining: 'eh_safeguarding_trainings',
  EHSafeguardingPolicy: 'eh_safeguarding_policies',
  EHMissingStudent: 'eh_missing_students',
  EHOnlineSafetyIncident: 'eh_online_safety_incidents',
  EHDBSCheck: 'eh_dbs_checks',
  EHDesignatedSafeguardingLead: 'eh_designated_safeguarding_leads',
  EHSafeguardingAlert: 'eh_safeguarding_alerts',
  EHStudentVoiceRecord: 'eh_student_voice_records',
  EHSafeguardingAudit: 'eh_safeguarding_audits',
  EHSafeguardingMetric: 'eh_safeguarding_metrics',
};

// ============================================================================
// Repository Interface — typed CRUD for each entity
// ============================================================================
export interface EDU_HEALTH_3_Repository {
  safeguardingConcerns: CrudRepository<EHSafeguardingConcern>;
  caseRecords: CrudRepository<EHCaseRecord>;
  riskAssessments: CrudRepository<EHRiskAssessment>;
  protectionPlans: CrudRepository<EHProtectionPlan>;
  multiAgencyReferrals: CrudRepository<EHMultiAgencyReferral>;
  safeguardingTrainings: CrudRepository<EHSafeguardingTraining>;
  safeguardingPolicies: CrudRepository<EHSafeguardingPolicy>;
  missingStudents: CrudRepository<EHMissingStudent>;
  onlineSafetyIncidents: CrudRepository<EHOnlineSafetyIncident>;
  dbsChecks: CrudRepository<EHDBSCheck>;
  designatedSafeguardingLeads: CrudRepository<EHDesignatedSafeguardingLead>;
  safeguardingAlerts: CrudRepository<EHSafeguardingAlert>;
  studentVoiceRecords: CrudRepository<EHStudentVoiceRecord>;
  safeguardingAudits: CrudRepository<EHSafeguardingAudit>;
  safeguardingMetrics: CrudRepository<EHSafeguardingMetric>;
}

// ============================================================================
// Factory
// ============================================================================
export function createEDU_HEALTH_3_Repository(supabase: SupabaseClient): EDU_HEALTH_3_Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    safeguardingConcerns: crud<EHSafeguardingConcern>(EDU_HEALTH_3_TABLE_NAMES.EHSafeguardingConcern),
    caseRecords: crud<EHCaseRecord>(EDU_HEALTH_3_TABLE_NAMES.EHCaseRecord),
    riskAssessments: crud<EHRiskAssessment>(EDU_HEALTH_3_TABLE_NAMES.EHRiskAssessment),
    protectionPlans: crud<EHProtectionPlan>(EDU_HEALTH_3_TABLE_NAMES.EHProtectionPlan),
    multiAgencyReferrals: crud<EHMultiAgencyReferral>(EDU_HEALTH_3_TABLE_NAMES.EHMultiAgencyReferral),
    safeguardingTrainings: crud<EHSafeguardingTraining>(EDU_HEALTH_3_TABLE_NAMES.EHSafeguardingTraining),
    safeguardingPolicies: crud<EHSafeguardingPolicy>(EDU_HEALTH_3_TABLE_NAMES.EHSafeguardingPolicy),
    missingStudents: crud<EHMissingStudent>(EDU_HEALTH_3_TABLE_NAMES.EHMissingStudent),
    onlineSafetyIncidents: crud<EHOnlineSafetyIncident>(EDU_HEALTH_3_TABLE_NAMES.EHOnlineSafetyIncident),
    dbsChecks: crud<EHDBSCheck>(EDU_HEALTH_3_TABLE_NAMES.EHDBSCheck),
    designatedSafeguardingLeads: crud<EHDesignatedSafeguardingLead>(EDU_HEALTH_3_TABLE_NAMES.EHDesignatedSafeguardingLead),
    safeguardingAlerts: crud<EHSafeguardingAlert>(EDU_HEALTH_3_TABLE_NAMES.EHSafeguardingAlert),
    studentVoiceRecords: crud<EHStudentVoiceRecord>(EDU_HEALTH_3_TABLE_NAMES.EHStudentVoiceRecord),
    safeguardingAudits: crud<EHSafeguardingAudit>(EDU_HEALTH_3_TABLE_NAMES.EHSafeguardingAudit),
    safeguardingMetrics: crud<EHSafeguardingMetric>(EDU_HEALTH_3_TABLE_NAMES.EHSafeguardingMetric),
  };
}
