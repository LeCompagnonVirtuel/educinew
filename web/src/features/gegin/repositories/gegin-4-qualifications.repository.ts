import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gegin-base.repository';

// ============================================================================
// GEGIN-4: Qualifications — Academic Qualifications Framework
// ============================================================================

export interface GEGINQualification extends BaseEntity {
  user_id: string;
  title: string;
  institution: string;
  degree: 'diploma' | 'bachelor' | 'master' | 'doctorate' | 'certificate' | 'professional' | 'other';
  field_of_study?: string;
  start_date?: string;
  end_date?: string;
  is_completed: boolean;
  grade?: string;
  honors?: string;
  document_url?: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  verified_by?: string;
  verified_at?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINQualificationFramework extends BaseEntity {
  name: string;
  country_code: string;
  type: 'national' | 'regional' | 'institutional' | 'international';
  levels: Record<string, unknown>[];
  status: 'active' | 'inactive' | 'draft';
  established_date: string;
  metadata: Record<string, unknown>;
}

export interface GEGINSkill extends BaseEntity {
  name: string;
  category: 'technical' | 'soft' | 'language' | 'domain' | 'other';
  description?: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  framework_id?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINCompetency extends BaseEntity {
  skill_id: string;
  user_id: string;
  level: 'novice' | 'competent' | 'proficient' | 'expert';
  assessed_date: string;
  assessed_by?: string;
  evidence?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINEquivalence extends BaseEntity {
  source_qualification_id: string;
  target_framework_id: string;
  target_level: string;
  status: 'pending' | 'approved' | 'rejected';
  evaluated_by?: string;
  evaluated_at?: string;
  notes?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINCreditTransfer extends BaseEntity {
  source_institution: string;
  target_institution: string;
  student_id: string;
  course_name: string;
  credits: number;
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: string;
  approved_at?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINRecognition extends BaseEntity {
  qualification_id: string;
  recognizing_body: string;
  country_code: string;
  status: 'pending' | 'recognized' | 'conditional' | 'rejected';
  conditions?: string;
  recognized_at?: string;
  expires_at?: string;
  metadata: Record<string, unknown>;
}

// ============================================================================
// Table Name Map
// ============================================================================
export const GEGIN4_TABLE_NAMES: Record<string, string> = {
  GEGINQualification: 'gegin_qualifications',
  GEGINQualificationFramework: 'gegin_qualification_frameworks',
  GEGINSkill: 'gegin_skills',
  GEGINCompetency: 'gegin_competencies',
  GEGINEquivalence: 'gegin_equivalences',
  GEGINCreditTransfer: 'gegin_credit_transfers',
  GEGINRecognition: 'gegin_recognitions',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEGIN4Repository {
  qualifications: CrudRepository<GEGINQualification>;
  frameworks: CrudRepository<GEGINQualificationFramework>;
  skills: CrudRepository<GEGINSkill>;
  competencies: CrudRepository<GEGINCompetency>;
  equivalences: CrudRepository<GEGINEquivalence>;
  creditTransfers: CrudRepository<GEGINCreditTransfer>;
  recognitions: CrudRepository<GEGINRecognition>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEGIN4Repository(supabase: SupabaseClient): GEGIN4Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    qualifications: crud<GEGINQualification>(GEGIN4_TABLE_NAMES.GEGINQualification),
    frameworks: crud<GEGINQualificationFramework>(GEGIN4_TABLE_NAMES.GEGINQualificationFramework),
    skills: crud<GEGINSkill>(GEGIN4_TABLE_NAMES.GEGINSkill),
    competencies: crud<GEGINCompetency>(GEGIN4_TABLE_NAMES.GEGINCompetency),
    equivalences: crud<GEGINEquivalence>(GEGIN4_TABLE_NAMES.GEGINEquivalence),
    creditTransfers: crud<GEGINCreditTransfer>(GEGIN4_TABLE_NAMES.GEGINCreditTransfer),
    recognitions: crud<GEGINRecognition>(GEGIN4_TABLE_NAMES.GEGINRecognition),
  };
}
