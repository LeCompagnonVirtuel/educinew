import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gei2p-base.repository';

// ============================================================================
// GEI2P-4: Skills — Skills Framework & Competency Mapping
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface GEI2PSkillsFramework extends BaseEntity { name: string; version: string; description: string; framework_type: 'national'|'international'|'institutional'|'industry'; authority: string; valid_from: string; valid_until?: string; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PSkillCategory extends BaseEntity { framework_id: string; name: string; code: string; description: string; parent_id?: string; level: number; sort_order: number; }
export interface GEI2PSkill extends BaseEntity { category_id: string; framework_id: string; name: string; code: string; description: string; skill_type: 'technical'|'soft'|'domain'|'transversal'|'digital'; level: 'beginner'|'intermediate'|'advanced'|'expert'; assessment_methods: string[]; evidence_types: string[]; status: 'active'|'deprecated'; }
export interface GEI2PSkillAssessment extends BaseEntity { skill_id: string; student_did: string; assessor_did: string; assessment_type: 'self'|'peer'|'instructor'|'automated'|'portfolio'; score: number; max_score: number; level_achieved: string; evidence: Record<string,unknown>[]; assessed_at: string; valid_until?: string; }
export interface GEI2PSkillProficiency extends BaseEntity { student_did: string; skill_id: string; level: 'novice'|'beginner'|'intermediate'|'advanced'|'expert'; score: number; confidence: number; evidence_count: number; last_assessed_at: string; trend: 'improving'|'stable'|'declining'; }
export interface GEI2PSkillGap extends BaseEntity { student_did: string; skill_id: string; required_level: string; current_level: string; gap_size: number; priority: 'low'|'medium'|'high'|'critical'; recommended_actions: Record<string,unknown>[]; identified_at: string; }
export interface GEI2PSkillRecommendation extends BaseEntity { student_did: string; skill_id: string; reason: string; confidence: number; recommended_resources: Record<string,unknown>[]; priority: number; status: 'pending'|'viewed'|'accepted'|'dismissed'; created_at: string; }
export interface GEI2PSkillBadge extends BaseEntity { name: string; description: string; icon_url: string; skill_ids: string[]; criteria: Record<string,unknown>; issued_count: number; status: 'active'|'retired'; }
export interface GEI2PSkillBadgeAward extends BaseEntity { badge_id: string; student_did: string; awarded_by: string; awarded_at: string; evidence: Record<string,unknown>[]; revoked: boolean; revoked_at?: string; revocation_reason?: string; }
export interface GEI2PSkillPortfolio extends BaseEntity { student_did: string; name: string; description: string; visibility: 'private'|'institution'|'public'; skill_count: number; last_updated_at: string; }
export interface GEI2PSkillPortfolioEntry extends BaseEntity { portfolio_id: string; skill_id: string; evidence_type: 'assessment'| 'project'| 'work'| 'certification'; evidence_url?: string; description: string; added_at: string; }
export interface GEI2PSkillMatch extends BaseEntity { student_did: string; job_or_program_id: string; match_type: 'job'|'program'|'course'| 'internship'; overall_score: number; matched_skills: Record<string,unknown>[]; missing_skills: Record<string,unknown>[]; calculated_at: string; }
export interface GEI2PSkillBenchmark extends BaseEntity { skill_id: string; benchmark_type: 'national'|'industry'|'institutional'; level: string; average_score: number; percentile_25: number; percentile_50: number; percentile_75: number; sample_size: number; period: string; }
export interface GEI2PSkillTrend extends BaseEntity { skill_id: string; institution_id: string; period: string; avg_score: number; student_count: number; growth_rate: number; demand_index: number; }
export interface GEI2PSkillVerification extends BaseEntity { skill_assessment_id: string; verifier_did: string; verification_method: 'api'| 'manual'| 'blockchain'; verified: boolean; verification_date: string; verification_data: Record<string,unknown>; }
export interface GEI2PSkillAuditLog extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_did: string; details: Record<string,unknown>; timestamp: string; }
export interface GEI2PSkillNotification extends BaseEntity { student_did: string; type: 'badge_earned'|'gap_identified'|'recommendation'|'assessment_ready'|'portfolio_update'; title: string; message: string; read: boolean; read_at?: string; sent_at: string; }
export interface GEI2PSkillAnalytics extends BaseEntity { institution_id: string; metric: string; value: number; dimension: Record<string,string>; period: string; calculated_at: string; }
export interface GEI2PSkillCompliance extends BaseEntity { skill_id: string; framework_id: string; regulation: string; status: 'compliant'|'non_compliant'|'pending_review'; checked_at: string; details: Record<string,unknown>; }
export interface GEI2PSkillBackup extends BaseEntity { entity_type: string; entity_id: string; backup_type: 'full'|'incremental'; file_url: string; checksum: string; created_at_backup: string; expires_at: string; }
export interface GEI2PSkillVersion extends BaseEntity { entity_type: string; entity_id: string; version: number; snapshot: Record<string,unknown>; change_summary: string; changed_by: string; }
export interface GEI2PSkillMetadata extends BaseEntity { entity_type: string; entity_id: string; key: string; value: unknown; source: string; added_at: string; }
export interface GEI2PSkillMapping extends BaseEntity { source_skill_id: string; target_skill_id: string; mapping_type: 'exact'|'approximate'|'partial'|'prerequisite'; confidence: number; mapped_by: string; status: 'pending'|'approved'|'denied'; }
export interface GEI2PSkillTaxonomy extends BaseEntity { name: string; description: string; root_categories: string[]; total_skills: number; version: string; status: 'active'|'deprecated'; }
export interface GEI2PSkillLearningPath extends BaseEntity { name: string; description: string; target_skill_ids: string[]; steps: Record<string,unknown>[]; estimated_hours: number; difficulty: 'beginner'|'intermediate'|'advanced'; enrollment_count: number; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PSkillLearningPathEnrollment extends BaseEntity { learning_path_id: string; student_did: string; enrolled_at: string; progress_percent: number; current_step: number; completed_at?: string; }
export interface GEI2PSkillCompetencyMap extends BaseEntity { name: string; description: string; institution_id: string; program_id?: string; competencies: Record<string,unknown>[]; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PSkillCompetencyLevel extends BaseEntity { competency_map_id: string; skill_id: string; required_level: string; weight: number; is_mandatory: boolean; }
export interface GEI2PSkillAssessmentTemplate extends BaseEntity { name: string; skill_id: string; assessment_type: string; questions: Record<string,unknown>[]; max_score: number; time_limit_minutes?: number; passing_score: number; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PSkillCompetencyRecord extends BaseEntity { student_did: string; competency_map_id: string; skill_id: string; achieved_level: string; achieved_at: string; assessment_id?: string; evidence: Record<string,unknown>[]; }

// ============================================================================
// Entity table name map
// ============================================================================
export const GEI2P4_TABLE_NAMES: Record<string, string> = {
  GEI2PSkillsFramework: 'gei2p_skills_frameworks',
  GEI2PSkillCategory: 'gei2p_skill_categories',
  GEI2PSkill: 'gei2p_skills',
  GEI2PSkillAssessment: 'gei2p_skill_assessments',
  GEI2PSkillProficiency: 'gei2p_skill_proficiencies',
  GEI2PSkillGap: 'gei2p_skill_gaps',
  GEI2PSkillRecommendation: 'gei2p_skill_recommendations',
  GEI2PSkillBadge: 'gei2p_skill_badges',
  GEI2PSkillBadgeAward: 'gei2p_skill_badge_awards',
  GEI2PSkillPortfolio: 'gei2p_skill_portfolios',
  GEI2PSkillPortfolioEntry: 'gei2p_skill_portfolio_entries',
  GEI2PSkillMatch: 'gei2p_skill_matches',
  GEI2PSkillBenchmark: 'gei2p_skill_benchmarks',
  GEI2PSkillTrend: 'gei2p_skill_trends',
  GEI2PSkillVerification: 'gei2p_skill_verifications',
  GEI2PSkillAuditLog: 'gei2p_skill_audit_logs',
  GEI2PSkillNotification: 'gei2p_skill_notifications',
  GEI2PSkillAnalytics: 'gei2p_skill_analytics',
  GEI2PSkillCompliance: 'gei2p_skill_compliances',
  GEI2PSkillBackup: 'gei2p_skill_backups',
  GEI2PSkillVersion: 'gei2p_skill_versions',
  GEI2PSkillMetadata: 'gei2p_skill_metadata',
  GEI2PSkillMapping: 'gei2p_skill_mappings',
  GEI2PSkillTaxonomy: 'gei2p_skill_taxonomies',
  GEI2PSkillLearningPath: 'gei2p_skill_learning_paths',
  GEI2PSkillLearningPathEnrollment: 'gei2p_skill_learning_path_enrollments',
  GEI2PSkillCompetencyMap: 'gei2p_skill_competency_maps',
  GEI2PSkillCompetencyLevel: 'gei2p_skill_competency_levels',
  GEI2PSkillAssessmentTemplate: 'gei2p_skill_assessment_templates',
  GEI2PSkillCompetencyRecord: 'gei2p_skill_competency_records',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEI2P4Repository {
  frameworks: CrudRepository<GEI2PSkillsFramework>;
  categories: CrudRepository<GEI2PSkillCategory>;
  skills: CrudRepository<GEI2PSkill>;
  assessments: CrudRepository<GEI2PSkillAssessment>;
  proficiencies: CrudRepository<GEI2PSkillProficiency>;
  gaps: CrudRepository<GEI2PSkillGap>;
  recommendations: CrudRepository<GEI2PSkillRecommendation>;
  badges: CrudRepository<GEI2PSkillBadge>;
  badgeAwards: CrudRepository<GEI2PSkillBadgeAward>;
  portfolios: CrudRepository<GEI2PSkillPortfolio>;
  portfolioEntries: CrudRepository<GEI2PSkillPortfolioEntry>;
  matches: CrudRepository<GEI2PSkillMatch>;
  benchmarks: CrudRepository<GEI2PSkillBenchmark>;
  trends: CrudRepository<GEI2PSkillTrend>;
  verifications: CrudRepository<GEI2PSkillVerification>;
  auditLogs: CrudRepository<GEI2PSkillAuditLog>;
  notifications: CrudRepository<GEI2PSkillNotification>;
  analytics: CrudRepository<GEI2PSkillAnalytics>;
  compliances: CrudRepository<GEI2PSkillCompliance>;
  backups: CrudRepository<GEI2PSkillBackup>;
  versions: CrudRepository<GEI2PSkillVersion>;
  metadataEntries: CrudRepository<GEI2PSkillMetadata>;
  mappings: CrudRepository<GEI2PSkillMapping>;
  taxonomies: CrudRepository<GEI2PSkillTaxonomy>;
  learningPaths: CrudRepository<GEI2PSkillLearningPath>;
  learningPathEnrollments: CrudRepository<GEI2PSkillLearningPathEnrollment>;
  competencyMaps: CrudRepository<GEI2PSkillCompetencyMap>;
  competencyLevels: CrudRepository<GEI2PSkillCompetencyLevel>;
  assessmentTemplates: CrudRepository<GEI2PSkillAssessmentTemplate>;
  competencyRecords: CrudRepository<GEI2PSkillCompetencyRecord>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEI2P4Repository(supabase: SupabaseClient): GEI2P4Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    frameworks: crud<GEI2PSkillsFramework>(GEI2P4_TABLE_NAMES.GEI2PSkillsFramework),
    categories: crud<GEI2PSkillCategory>(GEI2P4_TABLE_NAMES.GEI2PSkillCategory),
    skills: crud<GEI2PSkill>(GEI2P4_TABLE_NAMES.GEI2PSkill),
    assessments: crud<GEI2PSkillAssessment>(GEI2P4_TABLE_NAMES.GEI2PSkillAssessment),
    proficiencies: crud<GEI2PSkillProficiency>(GEI2P4_TABLE_NAMES.GEI2PSkillProficiency),
    gaps: crud<GEI2PSkillGap>(GEI2P4_TABLE_NAMES.GEI2PSkillGap),
    recommendations: crud<GEI2PSkillRecommendation>(GEI2P4_TABLE_NAMES.GEI2PSkillRecommendation),
    badges: crud<GEI2PSkillBadge>(GEI2P4_TABLE_NAMES.GEI2PSkillBadge),
    badgeAwards: crud<GEI2PSkillBadgeAward>(GEI2P4_TABLE_NAMES.GEI2PSkillBadgeAward),
    portfolios: crud<GEI2PSkillPortfolio>(GEI2P4_TABLE_NAMES.GEI2PSkillPortfolio),
    portfolioEntries: crud<GEI2PSkillPortfolioEntry>(GEI2P4_TABLE_NAMES.GEI2PSkillPortfolioEntry),
    matches: crud<GEI2PSkillMatch>(GEI2P4_TABLE_NAMES.GEI2PSkillMatch),
    benchmarks: crud<GEI2PSkillBenchmark>(GEI2P4_TABLE_NAMES.GEI2PSkillBenchmark),
    trends: crud<GEI2PSkillTrend>(GEI2P4_TABLE_NAMES.GEI2PSkillTrend),
    verifications: crud<GEI2PSkillVerification>(GEI2P4_TABLE_NAMES.GEI2PSkillVerification),
    auditLogs: crud<GEI2PSkillAuditLog>(GEI2P4_TABLE_NAMES.GEI2PSkillAuditLog),
    notifications: crud<GEI2PSkillNotification>(GEI2P4_TABLE_NAMES.GEI2PSkillNotification),
    analytics: crud<GEI2PSkillAnalytics>(GEI2P4_TABLE_NAMES.GEI2PSkillAnalytics),
    compliances: crud<GEI2PSkillCompliance>(GEI2P4_TABLE_NAMES.GEI2PSkillCompliance),
    backups: crud<GEI2PSkillBackup>(GEI2P4_TABLE_NAMES.GEI2PSkillBackup),
    versions: crud<GEI2PSkillVersion>(GEI2P4_TABLE_NAMES.GEI2PSkillVersion),
    metadataEntries: crud<GEI2PSkillMetadata>(GEI2P4_TABLE_NAMES.GEI2PSkillMetadata),
    mappings: crud<GEI2PSkillMapping>(GEI2P4_TABLE_NAMES.GEI2PSkillMapping),
    taxonomies: crud<GEI2PSkillTaxonomy>(GEI2P4_TABLE_NAMES.GEI2PSkillTaxonomy),
    learningPaths: crud<GEI2PSkillLearningPath>(GEI2P4_TABLE_NAMES.GEI2PSkillLearningPath),
    learningPathEnrollments: crud<GEI2PSkillLearningPathEnrollment>(GEI2P4_TABLE_NAMES.GEI2PSkillLearningPathEnrollment),
    competencyMaps: crud<GEI2PSkillCompetencyMap>(GEI2P4_TABLE_NAMES.GEI2PSkillCompetencyMap),
    competencyLevels: crud<GEI2PSkillCompetencyLevel>(GEI2P4_TABLE_NAMES.GEI2PSkillCompetencyLevel),
    assessmentTemplates: crud<GEI2PSkillAssessmentTemplate>(GEI2P4_TABLE_NAMES.GEI2PSkillAssessmentTemplate),
    competencyRecords: crud<GEI2PSkillCompetencyRecord>(GEI2P4_TABLE_NAMES.GEI2PSkillCompetencyRecord),
  };
}
