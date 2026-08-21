import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './edu-health-base.repository';

// ============================================================================
// EDU-HEALTH-4: Bullying — Reports, Investigations & Prevention
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface EHBullyingReport extends BaseEntity { reporter_id: string; reporter_role: 'student'|'parent'|'staff'|'anonymous'; victim_id?: string; bully_id?: string; incident_date: string; incident_location: string; incident_type: 'physical'|'verbal'|'social'|'cyber'|'sexual'|'racial'|'other'; description: string; witnesses: string[]; evidence_description?: string; severity: 'low'|'moderate'|'high'|'critical'; frequency: 'once'|'occasional'|'frequent'|'persistent'; status: 'submitted'|'under_review'|'investigating'|'resolved'|'escalated'; assigned_to?: string; }
export interface EHBullyingInvestigation extends BaseEntity { report_id: string; investigator_id: string; investigation_start: string; investigation_end?: string; investigation_type: 'formal'|'informal'|'expedited'; findings: string; evidence_collected: Record<string,unknown>[]; interviews_conducted: Record<string,unknown>[]; conclusion: string; recommendations: string[]; status: 'in_progress'|'completed'|'suspended'|'escalated'; }
export interface EHBullyingIntervention extends BaseEntity { report_id: string; student_id: string; intervention_type: 'mediation'|'restorative'|'behavioral'| 'counseling'|'discipline'|'support_plan'; provider: string; intervention_date: string; description: string; objectives: string[]; duration_weeks?: number; follow_up_date?: string; outcome?: string; status: 'planned'|'in_progress'|'completed'|'cancelled'; }
export interface EHBullyingIncidentTracking extends BaseEntity { report_id: string; tracking_date: string; status_change: string; changed_by: string; notes: string; action_taken: string; next_steps: string[]; }
export interface EHPreventionProgram extends BaseEntity { program_name: string; program_type: 'awareness'|'empathy'| 'conflict_resolution'|'digital_citizenship'|'anti_bias'; target_group: string; description: string; start_date: string; end_date?: string; facilitator_id: string; sessions_completed: number; total_sessions: number; participants_count: number; outcomes: Record<string,unknown>; status: 'planning'|'active'|'completed'|'paused'; }
export interface EHPreventionSession extends BaseEntity { program_id: string; session_number: number; session_date: string; topic: string; objectives: string[]; activities: Record<string,unknown>[]; materials_url?: string; attendance_count: number; feedback_score?: number; notes?: string; status: 'completed'|'scheduled'|'cancelled'; }
export interface EHStudentBullyingProfile extends BaseEntity { student_id: string; role: 'victim'|'bully'|'witness'|'bystander'; incident_count: number; first_incident_date: string; last_incident_date: string; severity_trend: 'improving'|'stable'|'worsening'; support_plan_active: boolean; parent_notified: boolean; status: 'active'|'monitoring'|'resolved'; }
export interface EHBystanderReport extends BaseEntity { report_id: string; bystander_id: string; bystander_action: 'intervened'|'reported'|'ignored'|'supported_victim'|'joined'; description: string; follow_up_needed: boolean; recognition_given: boolean; }
export interface EHMediationSession extends BaseEntity { report_id: string; mediator_id: string; session_date: string; participants: string[]; mediation_type: 'peer'|'adult_led'|'restorative_circle'; agreements_reached: string[]; follow_up_date?: string; outcome: 'successful'|'partial'|'unsuccessful'|'pending'; status: 'scheduled'|'completed'|'cancelled'; }
export interface EHBullyingPolicy extends BaseEntity { policy_name: string; version: string; effective_date: string; review_date: string; sections: Record<string,unknown>[]; approved_by: string; training_completed: boolean; status: 'draft'|'active'|'under_review'|'archived'; }
export interface EHBullyingTraining extends BaseEntity { training_name: string; target_group: 'staff'|'students'|'parents'|'all'; date_taken: string; expiry_date?: string; certificate_url?: string; staff_id: string; status: 'completed'|'in_progress'|'expired'|'scheduled'; }
export interface EHRestorativePractice extends BaseEntity { report_id: string; practice_type: 'conference'|'circle'|'mediation'|'community_meeting'; facilitator_id: string; practice_date: string; participants: string[]; agreements: string[]; follow_up_actions: string[]; outcome: 'successful'|'partial'|'unsuccessful'; }
export interface EHBullyingTrend extends BaseEntity { trend_period: string; category: string; incident_count: number; trend: 'increasing'|'stable'|'decreasing'; percentage_change: number; affected_groups: string[]; }
export interface EHBullyingAlert extends BaseEntity { student_id: string; alert_type: 'repeated_incident'| 'severity_escalation'|'new_report'|'intervention_due'|'follow_up'; severity: 'info'|'warning'|'urgent'|'critical'; title: string; message: string; acknowledged: boolean; acknowledged_at?: string; action_taken?: string; }
export interface EHBullyingMetric extends BaseEntity { metric_type: string; value: number; unit: string; dimension: Record<string,string>; period: string; calculated_at: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const EDU_HEALTH_4_TABLE_NAMES: Record<string, string> = {
  EHBullyingReport: 'eh_bullying_reports',
  EHBullyingInvestigation: 'eh_bullying_investigations',
  EHBullyingIntervention: 'eh_bullying_interventions',
  EHBullyingIncidentTracking: 'eh_bullying_incident_trackings',
  EHPreventionProgram: 'eh_prevention_programs',
  EHPreventionSession: 'eh_prevention_sessions',
  EHStudentBullyingProfile: 'eh_student_bullying_profiles',
  EHBystanderReport: 'eh_bystander_reports',
  EHMediationSession: 'eh_mediation_sessions',
  EHBullyingPolicy: 'eh_bullying_policies',
  EHBullyingTraining: 'eh_bullying_trainings',
  EHRestorativePractice: 'eh_restorative_practices',
  EHBullyingTrend: 'eh_bullying_trends',
  EHBullyingAlert: 'eh_bullying_alerts',
  EHBullyingMetric: 'eh_bullying_metrics',
};

// ============================================================================
// Repository Interface — typed CRUD for each entity
// ============================================================================
export interface EDU_HEALTH_4_Repository {
  bullyingReports: CrudRepository<EHBullyingReport>;
  bullyingInvestigations: CrudRepository<EHBullyingInvestigation>;
  bullyingInterventions: CrudRepository<EHBullyingIntervention>;
  bullyingIncidentTrackings: CrudRepository<EHBullyingIncidentTracking>;
  preventionPrograms: CrudRepository<EHPreventionProgram>;
  preventionSessions: CrudRepository<EHPreventionSession>;
  studentBullyingProfiles: CrudRepository<EHStudentBullyingProfile>;
  bystanderReports: CrudRepository<EHBystanderReport>;
  mediationSessions: CrudRepository<EHMediationSession>;
  bullyingPolicies: CrudRepository<EHBullyingPolicy>;
  bullyingTrainings: CrudRepository<EHBullyingTraining>;
  restorativePractices: CrudRepository<EHRestorativePractice>;
  bullyingTrends: CrudRepository<EHBullyingTrend>;
  bullyingAlerts: CrudRepository<EHBullyingAlert>;
  bullyingMetrics: CrudRepository<EHBullyingMetric>;
}

// ============================================================================
// Factory
// ============================================================================
export function createEDU_HEALTH_4_Repository(supabase: SupabaseClient): EDU_HEALTH_4_Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    bullyingReports: crud<EHBullyingReport>(EDU_HEALTH_4_TABLE_NAMES.EHBullyingReport),
    bullyingInvestigations: crud<EHBullyingInvestigation>(EDU_HEALTH_4_TABLE_NAMES.EHBullyingInvestigation),
    bullyingInterventions: crud<EHBullyingIntervention>(EDU_HEALTH_4_TABLE_NAMES.EHBullyingIntervention),
    bullyingIncidentTrackings: crud<EHBullyingIncidentTracking>(EDU_HEALTH_4_TABLE_NAMES.EHBullyingIncidentTracking),
    preventionPrograms: crud<EHPreventionProgram>(EDU_HEALTH_4_TABLE_NAMES.EHPreventionProgram),
    preventionSessions: crud<EHPreventionSession>(EDU_HEALTH_4_TABLE_NAMES.EHPreventionSession),
    studentBullyingProfiles: crud<EHStudentBullyingProfile>(EDU_HEALTH_4_TABLE_NAMES.EHStudentBullyingProfile),
    bystanderReports: crud<EHBystanderReport>(EDU_HEALTH_4_TABLE_NAMES.EHBystanderReport),
    mediationSessions: crud<EHMediationSession>(EDU_HEALTH_4_TABLE_NAMES.EHMediationSession),
    bullyingPolicies: crud<EHBullyingPolicy>(EDU_HEALTH_4_TABLE_NAMES.EHBullyingPolicy),
    bullyingTrainings: crud<EHBullyingTraining>(EDU_HEALTH_4_TABLE_NAMES.EHBullyingTraining),
    restorativePractices: crud<EHRestorativePractice>(EDU_HEALTH_4_TABLE_NAMES.EHRestorativePractice),
    bullyingTrends: crud<EHBullyingTrend>(EDU_HEALTH_4_TABLE_NAMES.EHBullyingTrend),
    bullyingAlerts: crud<EHBullyingAlert>(EDU_HEALTH_4_TABLE_NAMES.EHBullyingAlert),
    bullyingMetrics: crud<EHBullyingMetric>(EDU_HEALTH_4_TABLE_NAMES.EHBullyingMetric),
  };
}
