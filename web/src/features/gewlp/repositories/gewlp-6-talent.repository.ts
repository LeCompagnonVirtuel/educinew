import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gewlp-base.repository';

// ============================================================================
// GEWLP-6: Talent — Talent Management & Succession Planning
// ============================================================================

export interface GewlpTalentProfile extends BaseEntity { user_id: string; company_id: string; employee_id: string; performance_rating: number; potential_rating: number; nine_box_position: string; strengths: string[]; development_areas: string[]; career_aspirations: string; last_review_date: string; status: 'active'|'inactive'|'terminated'; }
export interface GewlpTalentPool extends BaseEntity { company_id: string; name: string; description: string; criteria: Record<string,unknown>; member_ids: string[]; status: 'active'|'archived'; created_by: string; }
export interface GewlpPerformanceReview extends BaseEntity { employee_id: string; reviewer_id: string; review_period: string; review_type: 'annual'|'semi_annual'|'quarterly'|'probation'|'project'; overall_rating: number; goal_ratings: Record<string,number>; competency_ratings: Record<string,number>; strengths: string; improvements: string; comments: string; status: 'draft'|'submitted'|'approved'|'finalized'; submitted_at?: string; finalized_at?: string; }
export interface GewlpPerformanceGoal extends BaseEntity { employee_id: string; review_id?: string; title: string; description: string; category: 'business'|'personal'|'development'|'team'; weight: number; target_value?: number; current_value: number; unit?: string; due_date?: string; status: 'active'|'achieved'|'missed'|'cancelled'; }
export interface GewlpSuccessionPlan extends BaseEntity { company_id: string; position_id: string; position_title: string; criticality: 'low'|'medium'|'high'|'critical'; readiness_levels: Record<string,unknown>[]; status: 'active'|'reviewed'|'archived'; last_reviewed_at: string; }
export interface GewlpSuccessionCandidate extends BaseEntity { succession_plan_id: string; employee_id: string; readiness: 'ready_now'|'ready_1_year'|'ready_2_plus_years'|'not_ready'; potential_gap: string; development_plan?: string; status: 'candidate'|'selected'|'promoted'|'withdrawn'; }
export interface GewlpTalentReview extends BaseEntity { company_id: string; review_date: string; participants: string[]; decisions: Record<string,unknown>[]; notes: string; status: 'scheduled'|'completed'|'cancelled'; }
export interface GewlpPromotion extends BaseEntity { employee_id: string; from_position: string; to_position: string; from_level: string; to_level: string; effective_date: string; salary_change?: number; currency?: string; approved_by: string; reason: string; status: 'proposed'|'approved'|'effective'|'cancelled'; }
export interface GewlpCompensation extends BaseEntity { employee_id: string; base_salary: number; currency: string; pay_frequency: 'monthly'|'bi_weekly'|'weekly'; bonus_eligible: boolean; bonus_target_pct?: number; equity_shares?: number; effective_date: string; status: 'active'|'superseded'; }
export interface GewlpCompensationReview extends BaseEntity { company_id: string; review_period: string; employee_id: string; current_compensation_id: string; proposed_salary: number; adjustment_pct: number; market_data: Record<string,unknown>; approved_by?: string; status: 'proposed'|'approved'|'rejected'|'applied'; }
export interface GewlpEngagementSurvey extends BaseEntity { company_id: string; title: string; description: string; questions: Record<string,unknown>[]; launch_date: string; close_date: string; anonymous: boolean; status: 'draft'|'active'|'closed'|'analyzed'; }
export interface GewlpEngagementResponse extends BaseEntity { survey_id: string; employee_id: string; responses: Record<string,unknown>; submitted_at: string; }

export const Gewlp6TableNames: Record<string, string> = {
  GewlpTalentProfile: 'gewlp_talent_profiles',
  GewlpTalentPool: 'gewlp_talent_pools',
  GewlpPerformanceReview: 'gewlp_performance_reviews',
  GewlpPerformanceGoal: 'gewlp_performance_goals',
  GewlpSuccessionPlan: 'gewlp_succession_plans',
  GewlpSuccessionCandidate: 'gewlp_succession_candidates',
  GewlpTalentReview: 'gewlp_talent_reviews',
  GewlpPromotion: 'gewlp_promotions',
  GewlpCompensation: 'gewlp_compensations',
  GewlpCompensationReview: 'gewlp_compensation_reviews',
  GewlpEngagementSurvey: 'gewlp_engagement_surveys',
  GewlpEngagementResponse: 'gewlp_engagement_responses',
};

export interface Gewlp6Repository {
  talentProfiles: CrudRepository<GewlpTalentProfile>;
  talentPools: CrudRepository<GewlpTalentPool>;
  performanceReviews: CrudRepository<GewlpPerformanceReview>;
  performanceGoals: CrudRepository<GewlpPerformanceGoal>;
  successionPlans: CrudRepository<GewlpSuccessionPlan>;
  successionCandidates: CrudRepository<GewlpSuccessionCandidate>;
  talentReviews: CrudRepository<GewlpTalentReview>;
  promotions: CrudRepository<GewlpPromotion>;
  compensations: CrudRepository<GewlpCompensation>;
  compensationReviews: CrudRepository<GewlpCompensationReview>;
  engagementSurveys: CrudRepository<GewlpEngagementSurvey>;
  engagementResponses: CrudRepository<GewlpEngagementResponse>;
}

export function createGewlp6Repository(supabase: SupabaseClient): Gewlp6Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    talentProfiles: crud<GewlpTalentProfile>(Gewlp6TableNames.GewlpTalentProfile),
    talentPools: crud<GewlpTalentPool>(Gewlp6TableNames.GewlpTalentPool),
    performanceReviews: crud<GewlpPerformanceReview>(Gewlp6TableNames.GewlpPerformanceReview),
    performanceGoals: crud<GewlpPerformanceGoal>(Gewlp6TableNames.GewlpPerformanceGoal),
    successionPlans: crud<GewlpSuccessionPlan>(Gewlp6TableNames.GewlpSuccessionPlan),
    successionCandidates: crud<GewlpSuccessionCandidate>(Gewlp6TableNames.GewlpSuccessionCandidate),
    talentReviews: crud<GewlpTalentReview>(Gewlp6TableNames.GewlpTalentReview),
    promotions: crud<GewlpPromotion>(Gewlp6TableNames.GewlpPromotion),
    compensations: crud<GewlpCompensation>(Gewlp6TableNames.GewlpCompensation),
    compensationReviews: crud<GewlpCompensationReview>(Gewlp6TableNames.GewlpCompensationReview),
    engagementSurveys: crud<GewlpEngagementSurvey>(Gewlp6TableNames.GewlpEngagementSurvey),
    engagementResponses: crud<GewlpEngagementResponse>(Gewlp6TableNames.GewlpEngagementResponse),
  };
}
