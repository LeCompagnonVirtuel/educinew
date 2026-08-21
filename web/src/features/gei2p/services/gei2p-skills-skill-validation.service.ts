import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface SkillValidation {
  id: string;
  school_id: string;
  skill_id: string;
  validator_id: string;
  status: 'pending' | 'in_progress' | 'validated' | 'rejected';
  validation_method: string;
  evidence?: Record<string, unknown>;
  result?: Record<string, unknown>;
  validated_at?: string;
  expiry_date?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateSkillValidationRequest {
  school_id: string;
  skill_id: string;
  validator_id: string;
  status?: SkillValidation['status'];
  validation_method: string;
  evidence?: Record<string, unknown>;
  result?: Record<string, unknown>;
  validated_at?: string;
  expiry_date?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateSkillValidationRequest {
  validator_id?: string;
  status?: SkillValidation['status'];
  validation_method?: string;
  evidence?: Record<string, unknown> | null;
  result?: Record<string, unknown> | null;
  validated_at?: string;
  expiry_date?: string | null;
  metadata?: Record<string, unknown>;
}

export class SkillValidationService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<SkillValidation | null> {
    const { data, error } = await this.supabase
      .from('gei2p_skill_validations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching skill validation', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as SkillValidation;
  }

  async listEntities(schoolId: string, filters?: { status?: string; skill_id?: string; validator_id?: string; limit?: number; offset?: number }): Promise<SkillValidation[]> {
    let query = this.supabase
      .from('gei2p_skill_validations')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.skill_id) query = query.eq('skill_id', filters.skill_id);
    if (filters?.validator_id) query = query.eq('validator_id', filters.validator_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing skill validations', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as SkillValidation[];
  }

  async createEntity(data: CreateSkillValidationRequest): Promise<SkillValidation | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_skill_validations')
      .insert({
        school_id: data.school_id,
        skill_id: data.skill_id,
        validator_id: data.validator_id,
        status: data.status || 'pending',
        validation_method: data.validation_method,
        evidence: data.evidence,
        result: data.result,
        validated_at: data.validated_at,
        expiry_date: data.expiry_date,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating skill validation', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Skill validation created', { id: created.id }, 'gei2p');
    return created as SkillValidation;
  }

  async updateEntity(id: string, data: UpdateSkillValidationRequest): Promise<SkillValidation | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_skill_validations')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating skill validation', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Skill validation updated', { id }, 'gei2p');
    return updated as SkillValidation;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_skill_validations')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting skill validation', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Skill validation deleted', { id }, 'gei2p');
    return true;
  }
}
