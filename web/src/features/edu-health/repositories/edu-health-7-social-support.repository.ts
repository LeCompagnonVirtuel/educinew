import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './edu-health-base.repository';

// ============================================================================
// EDU-HEALTH-7: Social Support — Services, Family & Community Resources
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface EHSocialServiceReferral extends BaseEntity { student_id: string; referral_type: 'housing'|'food'|'clothing'|'financial'|'medical'|'legal'|'family'|'substance'|'mental_health'|'other'; referral_date: string; referred_by: string; referral_reason: string; urgency: 'routine'|'urgent'|'emergency'; provider_name: string; provider_contact: string; status: 'submitted'|'acknowledged'| 'in_progress'|'completed'|'declined'; outcome?: string; }
export interface EHFamilySupport extends BaseEntity { student_id: string; family_member_id: string; support_type: 'parenting'|'financial'| 'emotional'|'housing'|'legal'|'employment'|'education'; need_description: string; family_income_level?: string; household_size?: number; single_parent: boolean; government_assistance: boolean; services_requested: string[]; status: 'assessed'|'in_progress'|'completed'|'closed'; assigned_worker?: string; }
export interface EHCommunityResource extends BaseEntity { resource_name: string; resource_type: 'food_bank'|'shelter'|'health_clinic'| 'legal_aid'|'family_services'|'substance_abuse'|'employment'|'education'|'other'; organization: string; address: string; phone: string; email?: string; website?: string; hours: string; eligibility_criteria: string[]; services_offered: string[]; capacity?: number; current_availability: boolean; languages_supported: string[]; }
export interface EHWelfareCheck extends BaseEntity { student_id: string; check_date: string; check_type: 'routine'| 'follow_up'|'triggered'|'annual'; conducted_by: string; living_situation: string; food_security: 'secure'|'insecure'|'severely_insecure'; housing_stability: 'stable'|'at_risk'|'unstable'; hygiene_assessment: string; emotional_wellbeing: string; concerns_identified: string[]; actions_taken: string[]; next_check_date?: string; }
export interface EHSocialWorkerCase extends BaseEntity { student_id: string; social_worker_id: string; case_open_date: string; case_type: 'family_support'|'protection'| 'reintegration'|'transition'|'crisis'; case_priority: 'low'|'medium'|'high'|'urgent'; goals: Record<string,unknown>[]; interventions: Record<string,unknown>[]; status: 'open'|'active'| 'review'|'closed'; closure_date?: string; closure_outcome?: string; }
export interface EHSocialSkillProgram extends BaseEntity { program_name: string; program_type: 'friendship'|'conflict_resolution'|'empathy'|'communication'|'self_esteem'|'anger_management'; target_age_min: number; target_age_max: number; description: string; start_date: string; end_date?: string; facilitator_id: string; max_participants: number; enrolled_count: number; status: 'planning'|'active'|'completed'|'paused'; }
export interface EHSocialSkillSession extends BaseEntity { program_id: string; session_number: number; session_date: string; topic: string; objectives: string[]; activities: Record<string,unknown>[]; skills_practiced: string[]; homework?: string; attendance_count: number; feedback_score?: number; }
export interface EHFamilyEngagement extends BaseEntity { student_id: string; engagement_type: 'meeting'|'workshop'|'conference'|'event'|'volunteer'; engagement_date: string; family_member_name: string; family_role: string; topic: string; outcome: string; follow_up_needed: boolean; language_used: string; translator_used: boolean; }
export interface EHPeerSupportGroup extends BaseEntity { group_name: string; group_type: 'grief'|'divorce'|'migration'|'trauma'|'identity'|'general'; facilitator_id: string; meeting_day: string; meeting_time: string; meeting_location: string; max_members: number; current_members: number; description: string; status: 'active'|'full'|'paused'|'disbanded'; }
export interface EHStudentNeedsAssessment extends BaseEntity { student_id: string; assessment_date: string; assessor_id: string; academic_needs: string[]; social_needs: string[]; emotional_needs: string[]; physical_needs: string[]; family_needs: string[]; priority_areas: string[]; recommended_services: string[]; score?: number; status: 'completed'|'pending'; }
export interface EHResourceAllocation extends BaseEntity { resource_id: string; student_id: string; allocation_date: string; quantity?: number; purpose: string; cost?: number; status: 'allocated'|'distributed'|'returned'|'expired'; distributed_by?: string; }
export interface EHVolunteerRecord extends BaseEntity { volunteer_name: string; volunteer_email: string; volunteer_phone: string; skills: string[]; availability: string; background_check: boolean; background_check_date?: string; training_completed: boolean; hours_contributed: number; status: 'active'|'inactive'|'pending_verification'; }
export interface EHFamilyCrisis extends BaseEntity { student_id: string; crisis_type: 'eviction'|'domestic_violence'| 'substance_abuse'|'incarceration'|'death'|'separation'|'other'; crisis_date: string; severity: 'low'|'moderate'|'high'|'critical'; immediate_needs: string[]; services_mobilized: string[]; school_impact: string; status: 'active'|'stabilized'|'resolved'|'ongoing'; }
export interface EHSocialSupportAlert extends BaseEntity { student_id: string; alert_type: 'welfare_concern'| 'service_due'|'resource_available'|'crisis_indicator'|'follow_up'; severity: 'info'|'warning'|'urgent'|'critical'; title: string; message: string; acknowledged: boolean; action_taken?: string; }
export interface EHSocialSupportMetric extends BaseEntity { metric_type: string; value: number; unit: string; dimension: Record<string,string>; period: string; calculated_at: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const EDU_HEALTH_7_TABLE_NAMES: Record<string, string> = {
  EHSocialServiceReferral: 'eh_social_service_referrals',
  EHFamilySupport: 'eh_family_supports',
  EHCommunityResource: 'eh_community_resources',
  EHWelfareCheck: 'eh_welfare_checks',
  EHSocialWorkerCase: 'eh_social_worker_cases',
  EHSocialSkillProgram: 'eh_social_skill_programs',
  EHSocialSkillSession: 'eh_social_skill_sessions',
  EHFamilyEngagement: 'eh_family_engagements',
  EHPeerSupportGroup: 'eh_peer_support_groups',
  EHStudentNeedsAssessment: 'eh_student_needs_assessments',
  EHResourceAllocation: 'eh_resource_allocations',
  EHVolunteerRecord: 'eh_volunteer_records',
  EHFamilyCrisis: 'eh_family_crises',
  EHSocialSupportAlert: 'eh_social_support_alerts',
  EHSocialSupportMetric: 'eh_social_support_metrics',
};

// ============================================================================
// Repository Interface — typed CRUD for each entity
// ============================================================================
export interface EDU_HEALTH_7_Repository {
  socialServiceReferrals: CrudRepository<EHSocialServiceReferral>;
  familySupports: CrudRepository<EHFamilySupport>;
  communityResources: CrudRepository<EHCommunityResource>;
  welfareChecks: CrudRepository<EHWelfareCheck>;
  socialWorkerCases: CrudRepository<EHSocialWorkerCase>;
  socialSkillPrograms: CrudRepository<EHSocialSkillProgram>;
  socialSkillSessions: CrudRepository<EHSocialSkillSession>;
  familyEngagements: CrudRepository<EHFamilyEngagement>;
  peerSupportGroups: CrudRepository<EHPeerSupportGroup>;
  studentNeedsAssessments: CrudRepository<EHStudentNeedsAssessment>;
  resourceAllocations: CrudRepository<EHResourceAllocation>;
  volunteerRecords: CrudRepository<EHVolunteerRecord>;
  familyCrises: CrudRepository<EHFamilyCrisis>;
  socialSupportAlerts: CrudRepository<EHSocialSupportAlert>;
  socialSupportMetrics: CrudRepository<EHSocialSupportMetric>;
}

// ============================================================================
// Factory
// ============================================================================
export function createEDU_HEALTH_7_Repository(supabase: SupabaseClient): EDU_HEALTH_7_Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    socialServiceReferrals: crud<EHSocialServiceReferral>(EDU_HEALTH_7_TABLE_NAMES.EHSocialServiceReferral),
    familySupports: crud<EHFamilySupport>(EDU_HEALTH_7_TABLE_NAMES.EHFamilySupport),
    communityResources: crud<EHCommunityResource>(EDU_HEALTH_7_TABLE_NAMES.EHCommunityResource),
    welfareChecks: crud<EHWelfareCheck>(EDU_HEALTH_7_TABLE_NAMES.EHWelfareCheck),
    socialWorkerCases: crud<EHSocialWorkerCase>(EDU_HEALTH_7_TABLE_NAMES.EHSocialWorkerCase),
    socialSkillPrograms: crud<EHSocialSkillProgram>(EDU_HEALTH_7_TABLE_NAMES.EHSocialSkillProgram),
    socialSkillSessions: crud<EHSocialSkillSession>(EDU_HEALTH_7_TABLE_NAMES.EHSocialSkillSession),
    familyEngagements: crud<EHFamilyEngagement>(EDU_HEALTH_7_TABLE_NAMES.EHFamilyEngagement),
    peerSupportGroups: crud<EHPeerSupportGroup>(EDU_HEALTH_7_TABLE_NAMES.EHPeerSupportGroup),
    studentNeedsAssessments: crud<EHStudentNeedsAssessment>(EDU_HEALTH_7_TABLE_NAMES.EHStudentNeedsAssessment),
    resourceAllocations: crud<EHResourceAllocation>(EDU_HEALTH_7_TABLE_NAMES.EHResourceAllocation),
    volunteerRecords: crud<EHVolunteerRecord>(EDU_HEALTH_7_TABLE_NAMES.EHVolunteerRecord),
    familyCrises: crud<EHFamilyCrisis>(EDU_HEALTH_7_TABLE_NAMES.EHFamilyCrisis),
    socialSupportAlerts: crud<EHSocialSupportAlert>(EDU_HEALTH_7_TABLE_NAMES.EHSocialSupportAlert),
    socialSupportMetrics: crud<EHSocialSupportMetric>(EDU_HEALTH_7_TABLE_NAMES.EHSocialSupportMetric),
  };
}
