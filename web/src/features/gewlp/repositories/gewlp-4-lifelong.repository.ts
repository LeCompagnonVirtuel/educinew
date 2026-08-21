import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gewlp-base.repository';

// ============================================================================
// GEWLP-4: Lifelong — Lifelong Learning & Continuous Education
// ============================================================================

export interface GewlpLearningActivity extends BaseEntity { user_id: string; title: string; description: string; activity_type: 'course'|'workshop'|'seminar'|'self_study'|'conference'|'reading'|'project'; skill_ids: string[]; duration_hours: number; provider?: string; completion_date?: string; certificate_url?: string; status: 'planned'|'in_progress'|'completed'|'cancelled'; }
export interface GewlpLearningGoal extends BaseEntity { user_id: string; title: string; description: string; target_skills: string[]; hours_per_week: number; deadline?: string; progress_pct: number; status: 'active'|'achieved'|'paused'|'abandoned'; }
export interface GewlpLearningPath extends BaseEntity { name: string; description: string; difficulty: 'beginner'|'intermediate'|'advanced'; estimated_hours: number; modules: Record<string,unknown>[]; prerequisites: string[]; status: 'active'|'draft'|'archived'; }
export interface GewlpLearningModule extends BaseEntity { path_id: string; title: string; description: string; order: number; content_type: 'video'|'reading'|'quiz'|'exercise'|'project'; duration_minutes: number; resource_url?: string; status: 'active'|'draft'; }
export interface GewlpLearningProgress extends BaseEntity { user_id: string; module_id: string; path_id: string; progress_pct: number; time_spent_minutes: number; started_at: string; last_accessed_at: string; completed_at?: string; score?: number; }
export interface GewlpCertificate extends BaseEntity { user_id: string; title: string; issuer: string; issue_date: string; expiry_date?: string; credential_id?: string; credential_url?: string; skill_ids: string[]; verified: boolean; }
export interface GewlpLearningGroup extends BaseEntity { name: string; description: string; path_id?: string; creator_id: string; member_ids: string[]; max_members?: number; status: 'active'|'archived'; }
export interface GewlpGroupSession extends BaseEntity { group_id: string; organizer_id: string; title: string; scheduled_at: string; duration_minutes: number; meeting_url?: string; agenda: string[]; attendee_ids: string[]; status: 'scheduled'|'in_progress'|'completed'|'cancelled'; }
export interface GewlpLearningReflection extends BaseEntity { user_id: string; activity_id?: string; reflection_date: string; what_learned: string; challenges: string; next_steps: string; rating: number; tags: string[]; }
export interface GewlpSkillPortfolio extends BaseEntity { user_id: string; title: string; description: string; skill_ids: string[]; evidence_urls: string[]; verified: boolean; visibility: 'public'|'connections'|'private'; }
export interface GewlpContinuingEducation extends BaseEntity { user_id: string; requirement_name: string; requirement_type: 'license'|'certification'|'cpd'|'ce'; hours_required: number; hours_completed: number; deadline?: string; status: 'compliant'|'at_risk'|'non_compliant'; }
export interface GewlpLearningAnalytics extends BaseEntity { user_id: string; period: string; total_hours: number; activities_completed: number; skills_improved: number; streak_days: number; rank_percentile: number; }

export const Gewlp4TableNames: Record<string, string> = {
  GewlpLearningActivity: 'gewlp_learning_activities',
  GewlpLearningGoal: 'gewlp_learning_goals',
  GewlpLearningPath: 'gewlp_learning_paths',
  GewlpLearningModule: 'gewlp_learning_modules',
  GewlpLearningProgress: 'gewlp_learning_progress',
  GewlpCertificate: 'gewlp_certificates',
  GewlpLearningGroup: 'gewlp_learning_groups',
  GewlpGroupSession: 'gewlp_group_sessions',
  GewlpLearningReflection: 'gewlp_learning_reflections',
  GewlpSkillPortfolio: 'gewlp_skill_portfolios',
  GewlpContinuingEducation: 'gewlp_continuing_educations',
  GewlpLearningAnalytics: 'gewlp_learning_analytics',
};

export interface Gewlp4Repository {
  learningActivities: CrudRepository<GewlpLearningActivity>;
  learningGoals: CrudRepository<GewlpLearningGoal>;
  learningPaths: CrudRepository<GewlpLearningPath>;
  learningModules: CrudRepository<GewlpLearningModule>;
  learningProgress: CrudRepository<GewlpLearningProgress>;
  certificates: CrudRepository<GewlpCertificate>;
  learningGroups: CrudRepository<GewlpLearningGroup>;
  groupSessions: CrudRepository<GewlpGroupSession>;
  learningReflections: CrudRepository<GewlpLearningReflection>;
  skillPortfolios: CrudRepository<GewlpSkillPortfolio>;
  continuingEducations: CrudRepository<GewlpContinuingEducation>;
  learningAnalytics: CrudRepository<GewlpLearningAnalytics>;
}

export function createGewlp4Repository(supabase: SupabaseClient): Gewlp4Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    learningActivities: crud<GewlpLearningActivity>(Gewlp4TableNames.GewlpLearningActivity),
    learningGoals: crud<GewlpLearningGoal>(Gewlp4TableNames.GewlpLearningGoal),
    learningPaths: crud<GewlpLearningPath>(Gewlp4TableNames.GewlpLearningPath),
    learningModules: crud<GewlpLearningModule>(Gewlp4TableNames.GewlpLearningModule),
    learningProgress: crud<GewlpLearningProgress>(Gewlp4TableNames.GewlpLearningProgress),
    certificates: crud<GewlpCertificate>(Gewlp4TableNames.GewlpCertificate),
    learningGroups: crud<GewlpLearningGroup>(Gewlp4TableNames.GewlpLearningGroup),
    groupSessions: crud<GewlpGroupSession>(Gewlp4TableNames.GewlpGroupSession),
    learningReflections: crud<GewlpLearningReflection>(Gewlp4TableNames.GewlpLearningReflection),
    skillPortfolios: crud<GewlpSkillPortfolio>(Gewlp4TableNames.GewlpSkillPortfolio),
    continuingEducations: crud<GewlpContinuingEducation>(Gewlp4TableNames.GewlpContinuingEducation),
    learningAnalytics: crud<GewlpLearningAnalytics>(Gewlp4TableNames.GewlpLearningAnalytics),
  };
}
