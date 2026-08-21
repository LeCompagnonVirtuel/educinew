import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface SkillMatching {
  id: string;
  school_id: string;
  source_skill_id: string;
  target_skill_id: string;
  match_score: number;
  match_type: 'exact' | 'semantic' | 'partial' | 'hierarchical';
  source_system: string;
  target_system: string;
  status: 'active' | 'inactive' | 'pending_review';
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateSkillMatchingRequest {
  school_id: string;
  source_skill_id: string;
  target_skill_id: string;
  match_score: number;
  match_type: SkillMatching['match_type'];
  source_system: string;
  target_system: string;
  status?: SkillMatching['status'];
  metadata?: Record<string, unknown>;
}

export interface UpdateSkillMatchingRequest {
  match_score?: number;
  match_type?: SkillMatching['match_type'];
  status?: SkillMatching['status'];
  metadata?: Record<string, unknown>;
}

export class SkillMatchingService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<SkillMatching | null> {
    const { data, error } = await this.supabase
      .from('gei2p_skill_matchings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching skill matching', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as SkillMatching;
  }

  async listEntities(schoolId: string, filters?: { source_skill_id?: string; target_skill_id?: string; match_type?: string; limit?: number; offset?: number }): Promise<SkillMatching[]> {
    let query = this.supabase
      .from('gei2p_skill_matchings')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.source_skill_id) query = query.eq('source_skill_id', filters.source_skill_id);
    if (filters?.target_skill_id) query = query.eq('target_skill_id', filters.target_skill_id);
    if (filters?.match_type) query = query.eq('match_type', filters.match_type);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('match_score', { ascending: false });

    if (error) {
      logger.error('Error listing skill matchings', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as SkillMatching[];
  }

  async createEntity(data: CreateSkillMatchingRequest): Promise<SkillMatching | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_skill_matchings')
      .insert({
        school_id: data.school_id,
        source_skill_id: data.source_skill_id,
        target_skill_id: data.target_skill_id,
        match_score: data.match_score,
        match_type: data.match_type,
        source_system: data.source_system,
        target_system: data.target_system,
        status: data.status || 'active',
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating skill matching', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Skill matching created', { id: created.id }, 'gei2p');
    return created as SkillMatching;
  }

  async updateEntity(id: string, data: UpdateSkillMatchingRequest): Promise<SkillMatching | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_skill_matchings')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating skill matching', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Skill matching updated', { id }, 'gei2p');
    return updated as SkillMatching;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_skill_matchings')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting skill matching', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Skill matching deleted', { id }, 'gei2p');
    return true;
  }
}
