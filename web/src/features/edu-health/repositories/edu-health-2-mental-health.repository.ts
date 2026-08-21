import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './edu-health-base.repository';

// ============================================================================
// EDU-HEALTH-2: Mental Health — Assessments, Counseling & Wellbeing
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface EHMentalHealthAssessment extends BaseEntity { student_id: string; assessment_type: 'phq9'|'gad7'|'sdq'|'custom'|'screening'|'diagnostic'; assessment_date: string; score: number; max_score: number; severity: 'minimal'|'mild'|'moderate'|'severe'|'extreme'; administered_by: string; responses: Record<string,unknown>; risk_level: 'low'|'moderate'|'high'|'critical'; follow_up_required: boolean; notes?: string; status: 'completed'|'pending'|'cancelled'; }
export interface EHCounselingSession extends BaseEntity { student_id: string; counselor_id: string; session_date: string; session_type: 'individual'|'group'|'family'|'crisis'|'follow_up'; duration_minutes: number; session_number: number; presenting_issues: string[]; interventions_used: string[]; homework_assigned?: string; progress_notes: string; risk_assessment: 'none'|'low'|'moderate'|'high'; next_session_date?: string; status: 'completed'|'scheduled'|'cancelled'|'no_show'; }
export interface EHMoodTracking extends BaseEntity { student_id: string; tracking_date: string; mood_score: number; mood_label: 'very_low'|'low'|'neutral'|'good'|'excellent'; energy_level: number; sleep_hours?: number; sleep_quality?: number; stress_level: number; anxiety_level: number; notes?: string; activities: string[]; triggers: string[]; coping_strategies: string[]; }
export interface EHTherapyPlan extends BaseEntity { student_id: string; plan_name: string; diagnosis: string; goals: Record<string,unknown>[]; interventions: Record<string,unknown>[]; start_date: string; target_end_date: string; therapist_id: string; review_frequency: 'weekly'|'biweekly'|'monthly'; status: 'active'|'completed'|'paused'|'discontinued'; progress_percentage: number; outcome_measures: Record<string,unknown>; }
export interface EHWellbeingIndicator extends BaseEntity { student_id: string; indicator_type: 'academic'|'social'|'emotional'|'physical'|'spiritual'|'overall'; score: number; max_score: number; assessment_date: string; dimensions: Record<string,number>; trends: Record<string,string>; recommendations: string[]; risk_factors: string[]; protective_factors: string[]; }
export interface EHGroupTherapy extends BaseEntity { group_name: string; group_type: 'anxiety'|'depression'|'grief'|'anger'| 'social_skills'|'substance'|'trauma'|'other'; facilitator_id: string; session_date: string; session_number: number; max_participants: number; current_participants: number; topics_covered: string[]; activities: Record<string,unknown>[]; participant_feedback: Record<string,unknown>[]; status: 'scheduled'|'in_progress'|'completed'|'cancelled'; }
export interface EHWellnessPlan extends BaseEntity { student_id: string; plan_type: 'stress_management'|'anxiety_coping'|'depression_support'|'crisis_plan'|'self_care'; strategies: Record<string,unknown>[]; emergency_contacts: Record<string,unknown>[]; grounding_techniques: string[]; support_network: string[]; warning_signs: string[]; created_by: string; last_reviewed: string; status: 'active'|'archived'|'needs_update'; }
export interface EHCrisisIntervention extends BaseEntity { student_id: string; crisis_date: string; crisis_type: 'suicidal'|'self_harm'|'psychotic'|'panic'|'substance'|'abuse'|'other'; severity: 'low'|'moderate'|'high'|'critical'; presenting_behavior: string; risk_assessment: Record<string,unknown>; immediate_actions: string[]; referrals: string[]; follow_up_plan: string; outcome: 'stabilized'| 'referred'|'hospitalized'|'ongoing'; staff_id: string; }
export interface EHStudentWellbeingSnapshot extends BaseEntity { student_id: string; snapshot_date: string; emotional_score: number; social_score: number; academic_score: number; physical_score: number; overall_score: number; strengths: string[]; concerns: string[]; recommended_actions: string[]; generated_by: string; }
export interface EHBehavioralPattern extends BaseEntity { student_id: string; pattern_type: 'attendance'|'academic'|'social'|'disciplinary'|'health'; pattern_name: string; description: string; frequency: string; severity: 'low'|'moderate'|'high'; identified_date: string; identified_by: string; interventions: Record<string,unknown>[]; outcome?: string; status: 'identified'|'intervening'|'resolved'|'monitoring'; }
export interface EHReferral extends BaseEntity { student_id: string; referral_type: 'internal'|'external'|'crisis'|'medical'|'social'; referral_date: string; referring_staff_id: string; referral_reason: string; urgency: 'routine'|'urgent'|'emergency'; provider_name?: string; provider_contact?: string; status: 'pending'|'sent'|'accepted'|'completed'|'declined'; outcome?: string; follow_up_date?: string; }
export interface EHMentalHealthMilestone extends BaseEntity { student_id: string; milestone_type: 'first_session'|'treatment_completion'|'goal_achieved'|'recovery_marker'|'wellness_streak'; milestone_date: string; description: string; significance: string; recorded_by: string; celebrated: boolean; }
export interface EHWellnessProgram extends BaseEntity { program_name: string; program_type: 'mindfulness'|'resilience'| 'peer_support'|'stress_reduction'|'emotional_literacy'|'other'; description: string; target_audience: string; start_date: string; end_date?: string; facilitator_id: string; max_participants: number; enrolled_count: number; sessions_completed: number; total_sessions: number; status: 'planning'|'active'|'completed'|'paused'; outcomes: Record<string,unknown>; }
export interface EHMentalHealthAlert extends BaseEntity { student_id: string; alert_type: 'risk_escalation'|'missed_session'|'crisis_indicator'|'positive_milestone'|'follow_up_due'; severity: 'info'|'warning'|'urgent'|'critical'; title: string; message: string; triggered_by: string; acknowledged: boolean; acknowledged_at?: string; action_taken?: string; }
export interface EHMentalHealthMetric extends BaseEntity { metric_type: string; value: number; unit: string; dimension: Record<string,string>; period: string; calculated_at: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const EDU_HEALTH_2_TABLE_NAMES: Record<string, string> = {
  EHMentalHealthAssessment: 'eh_mental_health_assessments',
  EHCounselingSession: 'eh_counseling_sessions',
  EHMoodTracking: 'eh_mood_tracking',
  EHTherapyPlan: 'eh_therapy_plans',
  EHWellbeingIndicator: 'eh_wellbeing_indicators',
  EHGroupTherapy: 'eh_group_therapy',
  EHWellnessPlan: 'eh_wellness_plans',
  EHCrisisIntervention: 'eh_crisis_interventions',
  EHStudentWellbeingSnapshot: 'eh_student_wellbeing_snapshots',
  EHBehavioralPattern: 'eh_behavioral_patterns',
  EHReferral: 'eh_referrals',
  EHMentalHealthMilestone: 'eh_mental_health_milestones',
  EHWellnessProgram: 'eh_wellness_programs',
  EHMentalHealthAlert: 'eh_mental_health_alerts',
  EHMentalHealthMetric: 'eh_mental_health_metrics',
};

// ============================================================================
// Repository Interface — typed CRUD for each entity
// ============================================================================
export interface EDU_HEALTH_2_Repository {
  mentalHealthAssessments: CrudRepository<EHMentalHealthAssessment>;
  counselingSessions: CrudRepository<EHCounselingSession>;
  moodTracking: CrudRepository<EHMoodTracking>;
  therapyPlans: CrudRepository<EHTherapyPlan>;
  wellbeingIndicators: CrudRepository<EHWellbeingIndicator>;
  groupTherapy: CrudRepository<EHGroupTherapy>;
  wellnessPlans: CrudRepository<EHWellnessPlan>;
  crisisInterventions: CrudRepository<EHCrisisIntervention>;
  studentWellbeingSnapshots: CrudRepository<EHStudentWellbeingSnapshot>;
  behavioralPatterns: CrudRepository<EHBehavioralPattern>;
  referrals: CrudRepository<EHReferral>;
  mentalHealthMilestones: CrudRepository<EHMentalHealthMilestone>;
  wellnessPrograms: CrudRepository<EHWellnessProgram>;
  mentalHealthAlerts: CrudRepository<EHMentalHealthAlert>;
  mentalHealthMetrics: CrudRepository<EHMentalHealthMetric>;
}

// ============================================================================
// Factory
// ============================================================================
export function createEDU_HEALTH_2_Repository(supabase: SupabaseClient): EDU_HEALTH_2_Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    mentalHealthAssessments: crud<EHMentalHealthAssessment>(EDU_HEALTH_2_TABLE_NAMES.EHMentalHealthAssessment),
    counselingSessions: crud<EHCounselingSession>(EDU_HEALTH_2_TABLE_NAMES.EHCounselingSession),
    moodTracking: crud<EHMoodTracking>(EDU_HEALTH_2_TABLE_NAMES.EHMoodTracking),
    therapyPlans: crud<EHTherapyPlan>(EDU_HEALTH_2_TABLE_NAMES.EHTherapyPlan),
    wellbeingIndicators: crud<EHWellbeingIndicator>(EDU_HEALTH_2_TABLE_NAMES.EHWellbeingIndicator),
    groupTherapy: crud<EHGroupTherapy>(EDU_HEALTH_2_TABLE_NAMES.EHGroupTherapy),
    wellnessPlans: crud<EHWellnessPlan>(EDU_HEALTH_2_TABLE_NAMES.EHWellnessPlan),
    crisisInterventions: crud<EHCrisisIntervention>(EDU_HEALTH_2_TABLE_NAMES.EHCrisisIntervention),
    studentWellbeingSnapshots: crud<EHStudentWellbeingSnapshot>(EDU_HEALTH_2_TABLE_NAMES.EHStudentWellbeingSnapshot),
    behavioralPatterns: crud<EHBehavioralPattern>(EDU_HEALTH_2_TABLE_NAMES.EHBehavioralPattern),
    referrals: crud<EHReferral>(EDU_HEALTH_2_TABLE_NAMES.EHReferral),
    mentalHealthMilestones: crud<EHMentalHealthMilestone>(EDU_HEALTH_2_TABLE_NAMES.EHMentalHealthMilestone),
    wellnessPrograms: crud<EHWellnessProgram>(EDU_HEALTH_2_TABLE_NAMES.EHWellnessProgram),
    mentalHealthAlerts: crud<EHMentalHealthAlert>(EDU_HEALTH_2_TABLE_NAMES.EHMentalHealthAlert),
    mentalHealthMetrics: crud<EHMentalHealthMetric>(EDU_HEALTH_2_TABLE_NAMES.EHMentalHealthMetric),
  };
}
