import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gewlp-base.repository';

// ============================================================================
// GEWLP-3: Career — Career Planning & Development
// ============================================================================

export interface GewlpCareerPlan extends BaseEntity { user_id: string; title: string; description: string; target_role?: string; target_industry?: string; target_date?: string; milestones: Record<string,unknown>[]; status: 'active'|'completed'|'archived'|'abandoned'; progress_pct: number; }
export interface GewlpCareerMilestone extends BaseEntity { plan_id: string; title: string; description: string; target_date?: string; completed_at?: string; status: 'pending'|'in_progress'|'completed'|'skipped'|'overdue'; priority: 'low'|'medium'|'high'; dependencies: string[]; }
export interface GewlpCareerGoal extends BaseEntity { user_id: string; plan_id?: string; title: string; description: string; goal_type: 'skill_acquisition'|'certification'|'promotion'|'transition'|'income'|'networking'; target_value?: number; current_value: number; unit?: string; deadline?: string; status: 'active'|'achieved'|'abandoned'|'expired'; }
export interface GewlpCareerPath extends BaseEntity { name: string; description: string; industry: string; steps: Record<string,unknown>[]; avg_transition_time_months: number; difficulty: 'easy'|'moderate'|'challenging'|'difficult'; status: 'active'|'deprecated'; }
export interface GewlpCareerPathEnrollment extends BaseEntity { path_id: string; user_id: string; current_step: number; started_at: string; estimated_completion?: string; status: 'enrolled'|'in_progress'|'completed'|'paused'|'dropped'; }
export interface GewlpMentorshipMatch extends BaseEntity { mentor_id: string; mentee_id: string; focus_areas: string[]; match_score: number; status: 'pending'|'active'|'completed'|'cancelled'; started_at?: string; ended_at?: string; }
export interface GewlpMentorshipSession extends BaseEntity { match_id: string; mentor_id: string; mentee_id: string; session_date: string; duration_minutes: number; topics: string[]; notes?: string; rating_mentor?: number; rating_mentee?: number; }
export interface GewlpCareerEvent extends BaseEntity { user_id: string; event_type: 'promotion'|'role_change'|'certification'|'skill_addition'|'job_change'|'education'; title: string; description: string; event_date: string; impact_score: number; verified: boolean; }
export interface GewlpCareerNetwork extends BaseEntity { user_id: string; connection_id: string; relationship: 'colleague'|'mentor'|'mentee'|'alumni'|'industry_peer'|'recruiter'; strength: number; last_interaction_at?: string; }
export interface GewlpCareerRecommendation extends BaseEntity { user_id: string; recommendation_type: 'role'|'skill'|'course'|'certification'|'network'; title: string; description: string; confidence_score: number; reason: string; status: 'pending'|'accepted'|'dismissed'|'expired'; }
export interface GewlpCareerBenchmark extends BaseEntity { user_id: string; metric_name: string; user_value: number; industry_avg: number; top_pct: number; comparison_date: string; }
export interface GewlpCareerJournal extends BaseEntity { user_id: string; entry_date: string; title: string; content: string; mood: 'positive'|'neutral'|'negative'; tags: string[]; attachments: string[]; }

export const Gewlp3TableNames: Record<string, string> = {
  GewlpCareerPlan: 'gewlp_career_plans',
  GewlpCareerMilestone: 'gewlp_career_milestones',
  GewlpCareerGoal: 'gewlp_career_goals',
  GewlpCareerPath: 'gewlp_career_paths',
  GewlpCareerPathEnrollment: 'gewlp_career_path_enrollments',
  GewlpMentorshipMatch: 'gewlp_mentorship_matches',
  GewlpMentorshipSession: 'gewlp_mentorship_sessions',
  GewlpCareerEvent: 'gewlp_career_events',
  GewlpCareerNetwork: 'gewlp_career_networks',
  GewlpCareerRecommendation: 'gewlp_career_recommendations',
  GewlpCareerBenchmark: 'gewlp_career_benchmarks',
  GewlpCareerJournal: 'gewlp_career_journals',
};

export interface Gewlp3Repository {
  careerPlans: CrudRepository<GewlpCareerPlan>;
  careerMilestones: CrudRepository<GewlpCareerMilestone>;
  careerGoals: CrudRepository<GewlpCareerGoal>;
  careerPaths: CrudRepository<GewlpCareerPath>;
  careerPathEnrollments: CrudRepository<GewlpCareerPathEnrollment>;
  mentorshipMatches: CrudRepository<GewlpMentorshipMatch>;
  mentorshipSessions: CrudRepository<GewlpMentorshipSession>;
  careerEvents: CrudRepository<GewlpCareerEvent>;
  careerNetworks: CrudRepository<GewlpCareerNetwork>;
  careerRecommendations: CrudRepository<GewlpCareerRecommendation>;
  careerBenchmarks: CrudRepository<GewlpCareerBenchmark>;
  careerJournals: CrudRepository<GewlpCareerJournal>;
}

export function createGewlp3Repository(supabase: SupabaseClient): Gewlp3Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    careerPlans: crud<GewlpCareerPlan>(Gewlp3TableNames.GewlpCareerPlan),
    careerMilestones: crud<GewlpCareerMilestone>(Gewlp3TableNames.GewlpCareerMilestone),
    careerGoals: crud<GewlpCareerGoal>(Gewlp3TableNames.GewlpCareerGoal),
    careerPaths: crud<GewlpCareerPath>(Gewlp3TableNames.GewlpCareerPath),
    careerPathEnrollments: crud<GewlpCareerPathEnrollment>(Gewlp3TableNames.GewlpCareerPathEnrollment),
    mentorshipMatches: crud<GewlpMentorshipMatch>(Gewlp3TableNames.GewlpMentorshipMatch),
    mentorshipSessions: crud<GewlpMentorshipSession>(Gewlp3TableNames.GewlpMentorshipSession),
    careerEvents: crud<GewlpCareerEvent>(Gewlp3TableNames.GewlpCareerEvent),
    careerNetworks: crud<GewlpCareerNetwork>(Gewlp3TableNames.GewlpCareerNetwork),
    careerRecommendations: crud<GewlpCareerRecommendation>(Gewlp3TableNames.GewlpCareerRecommendation),
    careerBenchmarks: crud<GewlpCareerBenchmark>(Gewlp3TableNames.GewlpCareerBenchmark),
    careerJournals: crud<GewlpCareerJournal>(Gewlp3TableNames.GewlpCareerJournal),
  };
}
