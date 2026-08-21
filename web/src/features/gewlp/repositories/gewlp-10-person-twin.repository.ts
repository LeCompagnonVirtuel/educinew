import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gewlp-base.repository';

// ============================================================================
// GEWLP-10: Person Twin — Digital Twin for Professional Identity
// ============================================================================

export interface GewlpPersonTwin extends BaseEntity { user_id: string; name: string; description: string; avatar_url?: string; personality_traits: Record<string,number>; communication_style: 'formal'|'casual'|'technical'|'creative'; work_preferences: Record<string,unknown>; values: string[]; status: 'active'|'draft'|'archived'; version: number; }
export interface GewlpTwinSkill extends BaseEntity { twin_id: string; skill_id: string; proficiency_level: 'novice'|'beginner'|'intermediate'|'advanced'|'expert'; confidence: number; last_used_at?: string; endorsements_count: number; verified: boolean; }
export interface GewlpTwinExperience extends BaseEntity { twin_id: string; company: string; role: string; department: string; start_date: string; end_date?: string; achievements: string[]; skills_used: string[]; impact_metrics: Record<string,unknown>; is_current: boolean; }
export interface GewlpTwinEducation extends BaseEntity { twin_id: string; institution: string; degree: string; major: string; start_date: string; end_date?: string; gpa?: number; honors: string[]; activities: string[]; }
export interface GewlpTwinProject extends BaseEntity { twin_id: string; title: string; description: string; role: string; technologies: string[]; url?: string; outcome: string; date: string; impact_score: number; }
export interface GewlpTwinGoal extends BaseEntity { twin_id: string; title: string; description: string; goal_type: 'career'|'skill'|'income'|'impact'; target_date?: string; progress_pct: number; status: 'active'|'achieved'|'paused'; }
export interface GewlpTwinRecommendation extends BaseEntity { twin_id: string; recommendation_type: 'role'|'skill'|'company'|'education'|'network'; title: string; description: string; match_score: number; reasoning: string; status: 'new'|'viewed'|'accepted'|'dismissed'; }
export interface GewlpTwinSimulation extends BaseEntity { twin_id: string; scenario: string; parameters: Record<string,unknown>; results: Record<string,unknown>; confidence: number; simulated_at: string; }
export interface GewlpTwinCollaboration extends BaseEntity { twin_id_a: string; twin_id_b: string; collaboration_type: 'mentorship'|'project'|'peer_learning'|'networking'; compatibility_score: number; suggested_topics: string[]; status: 'suggested'|'active'|'completed'; }
export interface GewlpTwinInsight extends BaseEntity { twin_id: string; insight_type: 'strength'|'gap'|'trend'|'opportunity'|'risk'; title: string; description: string; supporting_data: Record<string,unknown>; generated_at: string; }
export interface GewlpTwinVersion extends BaseEntity { twin_id: string; version: number; snapshot: Record<string,unknown>; change_summary: string; created_at_version: string; }
export interface GewlpTwinExport extends BaseEntity { twin_id: string; format: 'json'|'pdf'|'linkedin'|'portfolio'; file_url?: string; status: 'pending'|'processing'|'completed'|'failed'; requested_at: string; completed_at?: string; }

export const Gewlp10TableNames: Record<string, string> = {
  GewlpPersonTwin: 'gewlp_person_twins',
  GewlpTwinSkill: 'gewlp_twin_skills',
  GewlpTwinExperience: 'gewlp_twin_experiences',
  GewlpTwinEducation: 'gewlp_twin_educations',
  GewlpTwinProject: 'gewlp_twin_projects',
  GewlpTwinGoal: 'gewlp_twin_goals',
  GewlpTwinRecommendation: 'gewlp_twin_recommendations',
  GewlpTwinSimulation: 'gewlp_twin_simulations',
  GewlpTwinCollaboration: 'gewlp_twin_collaborations',
  GewlpTwinInsight: 'gewlp_twin_insights',
  GewlpTwinVersion: 'gewlp_twin_versions',
  GewlpTwinExport: 'gewlp_twin_exports',
};

export interface Gewlp10Repository {
  personTwins: CrudRepository<GewlpPersonTwin>;
  twinSkills: CrudRepository<GewlpTwinSkill>;
  twinExperiences: CrudRepository<GewlpTwinExperience>;
  twinEducations: CrudRepository<GewlpTwinEducation>;
  twinProjects: CrudRepository<GewlpTwinProject>;
  twinGoals: CrudRepository<GewlpTwinGoal>;
  twinRecommendations: CrudRepository<GewlpTwinRecommendation>;
  twinSimulations: CrudRepository<GewlpTwinSimulation>;
  twinCollaborations: CrudRepository<GewlpTwinCollaboration>;
  twinInsights: CrudRepository<GewlpTwinInsight>;
  twinVersions: CrudRepository<GewlpTwinVersion>;
  twinExports: CrudRepository<GewlpTwinExport>;
}

export function createGewlp10Repository(supabase: SupabaseClient): Gewlp10Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    personTwins: crud<GewlpPersonTwin>(Gewlp10TableNames.GewlpPersonTwin),
    twinSkills: crud<GewlpTwinSkill>(Gewlp10TableNames.GewlpTwinSkill),
    twinExperiences: crud<GewlpTwinExperience>(Gewlp10TableNames.GewlpTwinExperience),
    twinEducations: crud<GewlpTwinEducation>(Gewlp10TableNames.GewlpTwinEducation),
    twinProjects: crud<GewlpTwinProject>(Gewlp10TableNames.GewlpTwinProject),
    twinGoals: crud<GewlpTwinGoal>(Gewlp10TableNames.GewlpTwinGoal),
    twinRecommendations: crud<GewlpTwinRecommendation>(Gewlp10TableNames.GewlpTwinRecommendation),
    twinSimulations: crud<GewlpTwinSimulation>(Gewlp10TableNames.GewlpTwinSimulation),
    twinCollaborations: crud<GewlpTwinCollaboration>(Gewlp10TableNames.GewlpTwinCollaboration),
    twinInsights: crud<GewlpTwinInsight>(Gewlp10TableNames.GewlpTwinInsight),
    twinVersions: crud<GewlpTwinVersion>(Gewlp10TableNames.GewlpTwinVersion),
    twinExports: crud<GewlpTwinExport>(Gewlp10TableNames.GewlpTwinExport),
  };
}
