import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gewlp-base.repository';

// ============================================================================
// GEWLP-1: Skills — Skills Framework & Taxonomy
// ============================================================================

export interface GewlpSkill extends BaseEntity { name: string; description: string; category: 'technical'|'soft'|'domain'|'meta'; subcategory?: string; level: 'beginner'|'intermediate'|'advanced'|'expert'; taxonomy_ref?: string; tags: string[]; status: 'active'|'deprecated'|'draft'; metadata: Record<string,unknown>; }
export interface GewlpSkillCategory extends BaseEntity { name: string; description: string; parent_id?: string; icon?: string; color?: string; sort_order: number; status: 'active'|'inactive'; }
export interface GewlpSkillVersion extends BaseEntity { skill_id: string; version: number; changelog: string; data: Record<string,unknown>; status: 'draft'|'published'|'archived'; published_at?: string; }
export interface GewlpSkillRelation extends BaseEntity { source_skill_id: string; target_skill_id: string; relation_type: 'prerequisite'|'related'|'conflict'|'builds_on'; strength: number; }
export interface GewlpSkillAssessment extends BaseEntity { skill_id: string; name: string; description: string; assessment_type: 'quiz'|'practical'|'portfolio'|'peer_review'; max_score: number; passing_score: number; time_limit_minutes?: number; status: 'active'|'draft'|'archived'; }
export interface GewlpSkillAssessmentResult extends BaseEntity { assessment_id: string; learner_id: string; score: number; passed: boolean; submitted_at: string; graded_at?: string; grader_id?: string; feedback?: string; evidence_urls: string[]; }
export interface GewlpSkillGap extends BaseEntity { learner_id: string; skill_id: string; current_level: 'none'|'beginner'|'intermediate'|'advanced'|'expert'; target_level: 'beginner'|'intermediate'|'advanced'|'expert'; gap_size: number; priority: 'low'|'medium'|'high'|'critical'; identified_at: string; }
export interface GewlpSkillPath extends BaseEntity { name: string; description: string; skill_ids: string[]; difficulty: 'beginner'|'intermediate'|'advanced'; estimated_hours: number; status: 'active'|'draft'|'archived'; }
export interface GewlpSkillPathEnrollment extends BaseEntity { path_id: string; learner_id: string; progress_pct: number; started_at: string; completed_at?: string; status: 'enrolled'|'in_progress'|'completed'|'dropped'; }
export interface GewlpSkillEndorsement extends BaseEntity { skill_id: string; endorser_id: string; learner_id: string; comment?: string; rating: number; verified: boolean; }
export interface GewlpSkillMarketplace extends BaseEntity { skill_id: string; provider_id: string; price: number; currency: string; license_type: 'single'|'multi'|'unlimited'; downloads: number; rating_avg: number; status: 'listed'|'delisted'|'pending'; }
export interface GewlpSkillSearchIndex extends BaseEntity { skill_id: string; search_vector: string; synonyms: string[]; aliases: string[]; last_indexed_at: string; }

export const Gewlp1TableNames: Record<string, string> = {
  GewlpSkill: 'gewlp_skills',
  GewlpSkillCategory: 'gewlp_skill_categories',
  GewlpSkillVersion: 'gewlp_skill_versions',
  GewlpSkillRelation: 'gewlp_skill_relations',
  GewlpSkillAssessment: 'gewlp_skill_assessments',
  GewlpSkillAssessmentResult: 'gewlp_skill_assessment_results',
  GewlpSkillGap: 'gewlp_skill_gaps',
  GewlpSkillPath: 'gewlp_skill_paths',
  GewlpSkillPathEnrollment: 'gewlp_skill_path_enrollments',
  GewlpSkillEndorsement: 'gewlp_skill_endorsements',
  GewlpSkillMarketplace: 'gewlp_skill_marketplace_listings',
  GewlpSkillSearchIndex: 'gewlp_skill_search_indices',
};

export interface Gewlp1Repository {
  skills: CrudRepository<GewlpSkill>;
  categories: CrudRepository<GewlpSkillCategory>;
  versions: CrudRepository<GewlpSkillVersion>;
  relations: CrudRepository<GewlpSkillRelation>;
  assessments: CrudRepository<GewlpSkillAssessment>;
  assessmentResults: CrudRepository<GewlpSkillAssessmentResult>;
  gaps: CrudRepository<GewlpSkillGap>;
  paths: CrudRepository<GewlpSkillPath>;
  pathEnrollments: CrudRepository<GewlpSkillPathEnrollment>;
  endorsements: CrudRepository<GewlpSkillEndorsement>;
  marketplaceListings: CrudRepository<GewlpSkillMarketplace>;
  searchIndices: CrudRepository<GewlpSkillSearchIndex>;
}

export function createGewlp1Repository(supabase: SupabaseClient): Gewlp1Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    skills: crud<GewlpSkill>(Gewlp1TableNames.GewlpSkill),
    categories: crud<GewlpSkillCategory>(Gewlp1TableNames.GewlpSkillCategory),
    versions: crud<GewlpSkillVersion>(Gewlp1TableNames.GewlpSkillVersion),
    relations: crud<GewlpSkillRelation>(Gewlp1TableNames.GewlpSkillRelation),
    assessments: crud<GewlpSkillAssessment>(Gewlp1TableNames.GewlpSkillAssessment),
    assessmentResults: crud<GewlpSkillAssessmentResult>(Gewlp1TableNames.GewlpSkillAssessmentResult),
    gaps: crud<GewlpSkillGap>(Gewlp1TableNames.GewlpSkillGap),
    paths: crud<GewlpSkillPath>(Gewlp1TableNames.GewlpSkillPath),
    pathEnrollments: crud<GewlpSkillPathEnrollment>(Gewlp1TableNames.GewlpSkillPathEnrollment),
    endorsements: crud<GewlpSkillEndorsement>(Gewlp1TableNames.GewlpSkillEndorsement),
    marketplaceListings: crud<GewlpSkillMarketplace>(Gewlp1TableNames.GewlpSkillMarketplace),
    searchIndices: crud<GewlpSkillSearchIndex>(Gewlp1TableNames.GewlpSkillSearchIndex),
  };
}
