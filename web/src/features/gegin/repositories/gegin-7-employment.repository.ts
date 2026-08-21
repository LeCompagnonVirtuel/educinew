import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gegin-base.repository';

// ============================================================================
// GEGIN-7: Employment — Graduate Employment Framework
// ============================================================================

export interface GEGINGraduate extends BaseEntity {
  user_id: string;
  graduation_date: string;
  degree: string;
  field_of_study: string;
  institution: string;
  gpa?: number;
  honors?: string;
  employment_status: 'employed' | 'unemployed' | 'self_employed' | 'further_study' | 'retired';
  current_employer?: string;
  current_position?: string;
  salary_range?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINEmployer extends BaseEntity {
  name: string;
  type: 'company' | 'government' | 'ngo' | 'academic' | 'self_employed';
  industry: string;
  size: 'micro' | 'small' | 'medium' | 'large' | 'enterprise';
  country_code: string;
  city: string;
  website_url?: string;
  contact_email?: string;
  contact_phone?: string;
  status: 'active' | 'inactive' | 'verified';
  metadata: Record<string, unknown>;
}

export interface GEGINJobPosting extends BaseEntity {
  employer_id: string;
  title: string;
  description: string;
  type: 'full_time' | 'part_time' | 'contract' | 'internship' | 'temporary';
  location: string;
  remote_allowed: boolean;
  salary_min?: number;
  salary_max?: number;
  currency?: string;
  requirements: string[];
  skills_required: string[];
  application_deadline: string;
  status: 'open' | 'closed' | 'filled' | 'expired';
  metadata: Record<string, unknown>;
}

export interface GEGINApplication extends BaseEntity {
  job_posting_id: string;
  graduate_id: string;
  status: 'submitted' | 'reviewed' | 'shortlisted' | 'interviewed' | 'offered' | 'accepted' | 'rejected';
  submitted_at: string;
  cover_letter?: string;
  resume_url?: string;
  notes?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINSkillMatch extends BaseEntity {
  job_posting_id: string;
  graduate_id: string;
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  recommendation: 'strong_match' | 'good_match' | 'partial_match' | 'weak_match';
  calculated_at: string;
  metadata: Record<string, unknown>;
}

export interface GEGINInternship extends BaseEntity {
  student_id: string;
  employer_id: string;
  title: string;
  description: string;
  department: string;
  start_date: string;
  end_date: string;
  supervisor?: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  evaluation?: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

// ============================================================================
// Table Name Map
// ============================================================================
export const GEGIN7_TABLE_NAMES: Record<string, string> = {
  GEGINGraduate: 'gegin_graduates',
  GEGINEmployer: 'gegin_employers',
  GEGINJobPosting: 'gegin_job_postings',
  GEGINApplication: 'gegin_applications',
  GEGINSkillMatch: 'gegin_skill_matches',
  GEGINInternship: 'gegin_internships',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEGIN7Repository {
  graduates: CrudRepository<GEGINGraduate>;
  employers: CrudRepository<GEGINEmployer>;
  jobPostings: CrudRepository<GEGINJobPosting>;
  applications: CrudRepository<GEGINApplication>;
  skillMatches: CrudRepository<GEGINSkillMatch>;
  internships: CrudRepository<GEGINInternship>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEGIN7Repository(supabase: SupabaseClient): GEGIN7Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    graduates: crud<GEGINGraduate>(GEGIN7_TABLE_NAMES.GEGINGraduate),
    employers: crud<GEGINEmployer>(GEGIN7_TABLE_NAMES.GEGINEmployer),
    jobPostings: crud<GEGINJobPosting>(GEGIN7_TABLE_NAMES.GEGINJobPosting),
    applications: crud<GEGINApplication>(GEGIN7_TABLE_NAMES.GEGINApplication),
    skillMatches: crud<GEGINSkillMatch>(GEGIN7_TABLE_NAMES.GEGINSkillMatch),
    internships: crud<GEGINInternship>(GEGIN7_TABLE_NAMES.GEGINInternship),
  };
}
