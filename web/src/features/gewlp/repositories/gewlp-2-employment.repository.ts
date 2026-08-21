import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gewlp-base.repository';

// ============================================================================
// GEWLP-2: Employment — Job Matching & Employment Services
// ============================================================================

export interface GewlpJobPosting extends BaseEntity { employer_id: string; title: string; description: string; department?: string; location: string; location_type: 'onsite'|'remote'|'hybrid'; employment_type: 'full_time'|'part_time'|'contract'|'internship'|'temporary'; salary_min?: number; salary_max?: number; currency: string; required_skills: string[]; preferred_skills: string[]; experience_level: 'entry'|'mid'|'senior'|'executive'; education_level?: string; application_deadline?: string; status: 'draft'|'published'|'closed'|'archived'; metadata: Record<string,unknown>; }
export interface GewlpJobApplication extends BaseEntity { job_id: string; applicant_id: string; cover_letter?: string; resume_url?: string; portfolio_urls: string[]; status: 'submitted'|'reviewing'|'shortlisted'|'interview'|'offered'|'rejected'|'withdrawn'; submitted_at: string; reviewed_at?: string; reviewer_id?: string; notes?: string; }
export interface GewlpEmployerProfile extends BaseEntity { user_id: string; company_name: string; industry: string; size: 'startup'|'small'|'medium'|'large'|'enterprise'; website?: string; logo_url?: string; description: string; headquarters: string; benefits: string[]; verified: boolean; rating_avg: number; status: 'active'|'suspended'|'pending'; }
export interface GewlpCandidateProfile extends BaseEntity { user_id: string; headline: string; summary: string; experience_years: number; education: Record<string,unknown>[]; skills: string[]; certifications: string[]; languages: string[]; availability: 'immediate'|'two_weeks'|'one_month'|'negotiable'; preferred_salary_min?: number; preferred_salary_max?: number; preferred_locations: string[]; work_type_preference: 'onsite'|'remote'|'hybrid'|'any'; }
export interface GewlpInterviewSchedule extends BaseEntity { application_id: string; interviewer_id: string; interview_type: 'phone'|'video'|'onsite'|'technical'|'panel'; scheduled_at: string; duration_minutes: number; location?: string; meeting_url?: string; status: 'scheduled'|'completed'|'cancelled'|'no_show'; notes?: string; rating?: number; }
export interface GewlpOfferLetter extends BaseEntity { application_id: string; employer_id: string; candidate_id: string; position: string; salary: number; currency: string; start_date: string; terms: Record<string,unknown>; status: 'draft'|'sent'|'accepted'|'rejected'|'expired'; sent_at?: string; responded_at?: string; }
export interface GewlpEmploymentContract extends BaseEntity { employer_id: string; employee_id: string; offer_id: string; contract_type: 'permanent'|'fixed_term'|'internship'|'freelance'; start_date: string; end_date?: string; terms: Record<string,unknown>; signed_at?: string; status: 'pending'|'active'|'terminated'|'expired'; }
export interface GewlpSkillMatch extends BaseEntity { job_id: string; candidate_id: string; match_score: number; matched_skills: string[]; missing_skills: string[]; match_algorithm: string; calculated_at: string; }
export interface GewlpJobAlert extends BaseEntity { user_id: string; name: string; filters: Record<string,unknown>; frequency: 'daily'|'weekly'|'instant'; last_sent_at?: string; status: 'active'|'paused'|'expired'; }
export interface GewlpSavedJob extends BaseEntity { user_id: string; job_id: string; notes?: string; }
export interface GewlpEmployerReview extends BaseEntity { employer_id: string; reviewer_id: string; rating: number; pros: string; cons: string; advice_to_management?: string; employment_status: 'current'|'former'; job_title?: string; verified: boolean; }
export interface GewlpRecruitmentPipeline extends BaseEntity { employer_id: string; job_id: string; stages: Record<string,unknown>[]; current_stage: string; status: 'active'|'completed'|'cancelled'; }

export const Gewlp2TableNames: Record<string, string> = {
  GewlpJobPosting: 'gewlp_job_postings',
  GewlpJobApplication: 'gewlp_job_applications',
  GewlpEmployerProfile: 'gewlp_employer_profiles',
  GewlpCandidateProfile: 'gewlp_candidate_profiles',
  GewlpInterviewSchedule: 'gewlp_interview_schedules',
  GewlpOfferLetter: 'gewlp_offer_letters',
  GewlpEmploymentContract: 'gewlp_employment_contracts',
  GewlpSkillMatch: 'gewlp_skill_matches',
  GewlpJobAlert: 'gewlp_job_alerts',
  GewlpSavedJob: 'gewlp_saved_jobs',
  GewlpEmployerReview: 'gewlp_employer_reviews',
  GewlpRecruitmentPipeline: 'gewlp_recruitment_pipelines',
};

export interface Gewlp2Repository {
  jobPostings: CrudRepository<GewlpJobPosting>;
  jobApplications: CrudRepository<GewlpJobApplication>;
  employerProfiles: CrudRepository<GewlpEmployerProfile>;
  candidateProfiles: CrudRepository<GewlpCandidateProfile>;
  interviewSchedules: CrudRepository<GewlpInterviewSchedule>;
  offerLetters: CrudRepository<GewlpOfferLetter>;
  employmentContracts: CrudRepository<GewlpEmploymentContract>;
  skillMatches: CrudRepository<GewlpSkillMatch>;
  jobAlerts: CrudRepository<GewlpJobAlert>;
  savedJobs: CrudRepository<GewlpSavedJob>;
  employerReviews: CrudRepository<GewlpEmployerReview>;
  recruitmentPipelines: CrudRepository<GewlpRecruitmentPipeline>;
}

export function createGewlp2Repository(supabase: SupabaseClient): Gewlp2Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    jobPostings: crud<GewlpJobPosting>(Gewlp2TableNames.GewlpJobPosting),
    jobApplications: crud<GewlpJobApplication>(Gewlp2TableNames.GewlpJobApplication),
    employerProfiles: crud<GewlpEmployerProfile>(Gewlp2TableNames.GewlpEmployerProfile),
    candidateProfiles: crud<GewlpCandidateProfile>(Gewlp2TableNames.GewlpCandidateProfile),
    interviewSchedules: crud<GewlpInterviewSchedule>(Gewlp2TableNames.GewlpInterviewSchedule),
    offerLetters: crud<GewlpOfferLetter>(Gewlp2TableNames.GewlpOfferLetter),
    employmentContracts: crud<GewlpEmploymentContract>(Gewlp2TableNames.GewlpEmploymentContract),
    skillMatches: crud<GewlpSkillMatch>(Gewlp2TableNames.GewlpSkillMatch),
    jobAlerts: crud<GewlpJobAlert>(Gewlp2TableNames.GewlpJobAlert),
    savedJobs: crud<GewlpSavedJob>(Gewlp2TableNames.GewlpSavedJob),
    employerReviews: crud<GewlpEmployerReview>(Gewlp2TableNames.GewlpEmployerReview),
    recruitmentPipelines: crud<GewlpRecruitmentPipeline>(Gewlp2TableNames.GewlpRecruitmentPipeline),
  };
}
