import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gewlp-base.repository';

// ============================================================================
// GEWLP-9: Edu-Employment — Education-to-Employment Bridge
// ============================================================================

export interface GewlpGraduateProfile extends BaseEntity { user_id: string; institution_id: string; graduation_year: number; degree: string; major: string; gpa?: number; honors: string[]; thesis_title?: string; extracurriculars: string[]; status: 'active'|'archived'; }
export interface GewlpInternshipPlacement extends BaseEntity { student_id: string; employer_id: string; institution_id: string; position: string; department: string; start_date: string; end_date?: string; supervisor_id?: string; stipend?: number; currency?: string; hours_per_week: number; status: 'matched'|'active'|'completed'|'cancelled'; }
export interface GewlpInternshipReview extends BaseEntity { placement_id: string; reviewer_type: 'student'|'employer'|'institution'; reviewer_id: string; rating: number; feedback: string; skills_gained: string[]; submitted_at: string; }
export interface GewlpAlumniNetwork extends BaseEntity { institution_id: string; name: string; description: string; member_ids: string[]; industry_focus: string[]; region?: string; status: 'active'|'archived'; }
export interface GewlpAlumniProfile extends BaseEntity { user_id: string; institution_id: string; graduation_year: number; current_company?: string; current_position?: string; industry: string; location: string; available_for_mentoring: boolean; skills: string[]; }
export interface GewlpIndustryPartnership extends BaseEntity { institution_id: string; employer_id: string; partnership_type: 'internship'|'curriculum'|'research'|'placement'|'sponsorship'; description: string; start_date: string; end_date?: string; value_estimate?: number; currency?: string; status: 'active'|'expired'|'cancelled'; }
export interface GewlpCareerFair extends BaseEntity { institution_id: string; name: string; description: string; event_date: string; location: string; virtual: boolean; employer_ids: string[]; attendee_count: number; status: 'planned'|'active'|'completed'|'cancelled'; }
export interface GewlpCareerFairRegistration extends BaseEntity { fair_id: string; entity_type: 'employer'|'student'; entity_id: string; booth_number?: string; registration_date: string; status: 'registered'|'confirmed'|'attended'|'cancelled'; }
export interface GewlpJobPlacement extends BaseEntity { graduate_id: string; employer_id: string; institution_id: string; position: string; department: string; start_date: string; salary?: number; currency?: string; salary_period: 'monthly'|'yearly'; placement_type: 'full_time'|'part_time'|'contract'; source: 'career_fair'|'alumni_referral'|'direct_apply'|'institution_match'|'other'; }
export interface GewlpSkillDemandForecast extends BaseEntity { industry: string; region: string; skill_name: string; current_demand: number; projected_demand_1y: number; projected_demand_3y: number; growth_rate_pct: number; supply_gap: number; data_date: string; }
export interface GewlpCurriculumAlignment extends BaseEntity { institution_id: string; program_id: string; industry_sector: string; alignment_score: number; matched_skills: string[]; missing_skills: string[]; recommended_updates: string[]; assessed_at: string; }
export interface GewlpGraduateOutcome extends BaseEntity { graduate_id: string; institution_id: string; graduation_year: number; employment_status: 'employed'|'unemployed'|'further_study'|'entrepreneurial'|'other'; employer?: string; job_title?: string; industry?: string; salary?: number; currency?: string; time_to_employment_days?: number; satisfaction_rating?: number; survey_date: string; }

export const Gewlp9TableNames: Record<string, string> = {
  GewlpGraduateProfile: 'gewlp_graduate_profiles',
  GewlpInternshipPlacement: 'gewlp_internship_placements',
  GewlpInternshipReview: 'gewlp_internship_reviews',
  GewlpAlumniNetwork: 'gewlp_alumni_networks',
  GewlpAlumniProfile: 'gewlp_alumni_profiles',
  GewlpIndustryPartnership: 'gewlp_industry_partnerships',
  GewlpCareerFair: 'gewlp_career_fairs',
  GewlpCareerFairRegistration: 'gewlp_career_fair_registrations',
  GewlpJobPlacement: 'gewlp_job_placements',
  GewlpSkillDemandForecast: 'gewlp_skill_demand_forecasts',
  GewlpCurriculumAlignment: 'gewlp_curriculum_alignments',
  GewlpGraduateOutcome: 'gewlp_graduate_outcomes',
};

export interface Gewlp9Repository {
  graduateProfiles: CrudRepository<GewlpGraduateProfile>;
  internshipPlacements: CrudRepository<GewlpInternshipPlacement>;
  internshipReviews: CrudRepository<GewlpInternshipReview>;
  alumniNetworks: CrudRepository<GewlpAlumniNetwork>;
  alumniProfiles: CrudRepository<GewlpAlumniProfile>;
  industryPartnerships: CrudRepository<GewlpIndustryPartnership>;
  careerFairs: CrudRepository<GewlpCareerFair>;
  careerFairRegistrations: CrudRepository<GewlpCareerFairRegistration>;
  jobPlacements: CrudRepository<GewlpJobPlacement>;
  skillDemandForecasts: CrudRepository<GewlpSkillDemandForecast>;
  curriculumAlignments: CrudRepository<GewlpCurriculumAlignment>;
  graduateOutcomes: CrudRepository<GewlpGraduateOutcome>;
}

export function createGewlp9Repository(supabase: SupabaseClient): Gewlp9Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    graduateProfiles: crud<GewlpGraduateProfile>(Gewlp9TableNames.GewlpGraduateProfile),
    internshipPlacements: crud<GewlpInternshipPlacement>(Gewlp9TableNames.GewlpInternshipPlacement),
    internshipReviews: crud<GewlpInternshipReview>(Gewlp9TableNames.GewlpInternshipReview),
    alumniNetworks: crud<GewlpAlumniNetwork>(Gewlp9TableNames.GewlpAlumniNetwork),
    alumniProfiles: crud<GewlpAlumniProfile>(Gewlp9TableNames.GewlpAlumniProfile),
    industryPartnerships: crud<GewlpIndustryPartnership>(Gewlp9TableNames.GewlpIndustryPartnership),
    careerFairs: crud<GewlpCareerFair>(Gewlp9TableNames.GewlpCareerFair),
    careerFairRegistrations: crud<GewlpCareerFairRegistration>(Gewlp9TableNames.GewlpCareerFairRegistration),
    jobPlacements: crud<GewlpJobPlacement>(Gewlp9TableNames.GewlpJobPlacement),
    skillDemandForecasts: crud<GewlpSkillDemandForecast>(Gewlp9TableNames.GewlpSkillDemandForecast),
    curriculumAlignments: crud<GewlpCurriculumAlignment>(Gewlp9TableNames.GewlpCurriculumAlignment),
    graduateOutcomes: crud<GewlpGraduateOutcome>(Gewlp9TableNames.GewlpGraduateOutcome),
  };
}
