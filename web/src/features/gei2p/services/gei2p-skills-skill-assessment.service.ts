import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface SkillAssessment {
  id: string;
  school_id: string;
  skill_id: string;
  assessor_id: string;
  subject_id: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  score: number;
  max_score: number;
  assessment_date: string;
  evidence?: Record<string, unknown>;
  comments?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateSkillAssessmentRequest {
  school_id: string;
  skill_id: string;
  assessor_id: string;
  subject_id: string;
  level: SkillAssessment['level'];
  score: number;
  max_score: number;
  assessment_date: string;
  evidence?: Record<string, unknown>;
  comments?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateSkillAssessmentRequest {
  assessor_id?: string;
  level?: SkillAssessment['level'];
  score?: number;
  max_score?: number;
  assessment_date?: string;
  evidence?: Record<string, unknown> | null;
  comments?: string | null;
  metadata?: Record<string, unknown>;
}

export class SkillAssessmentService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<SkillAssessment | null> {
    const { data, error } = await this.supabase
      .from('gei2p_skill_assessments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching skill assessment', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as SkillAssessment;
  }

  async listEntities(schoolId: string, filters?: { skill_id?: string; subject_id?: string; level?: string; limit?: number; offset?: number }): Promise<SkillAssessment[]> {
    let query = this.supabase
      .from('gei2p_skill_assessments')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.skill_id) query = query.eq('skill_id', filters.skill_id);
    if (filters?.subject_id) query = query.eq('subject_id', filters.subject_id);
    if (filters?.level) query = query.eq('level', filters.level);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('assessment_date', { ascending: false });

    if (error) {
      logger.error('Error listing skill assessments', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as SkillAssessment[];
  }

  async createEntity(data: CreateSkillAssessmentRequest): Promise<SkillAssessment | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_skill_assessments')
      .insert({
        school_id: data.school_id,
        skill_id: data.skill_id,
        assessor_id: data.assessor_id,
        subject_id: data.subject_id,
        level: data.level,
        score: data.score,
        max_score: data.max_score,
        assessment_date: data.assessment_date,
        evidence: data.evidence,
        comments: data.comments,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating skill assessment', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Skill assessment created', { id: created.id }, 'gei2p');
    return created as SkillAssessment;
  }

  async updateEntity(id: string, data: UpdateSkillAssessmentRequest): Promise<SkillAssessment | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_skill_assessments')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating skill assessment', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Skill assessment updated', { id }, 'gei2p');
    return updated as SkillAssessment;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_skill_assessments')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting skill assessment', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Skill assessment deleted', { id }, 'gei2p');
    return true;
  }
}
