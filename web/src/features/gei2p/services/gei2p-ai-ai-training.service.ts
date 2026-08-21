import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface AITraining {
  id: string;
  school_id: string;
  model_id: string;
  dataset_id: string;
  status: 'pending' | 'training' | 'completed' | 'failed';
  config: Record<string, unknown>;
  metrics?: Record<string, unknown>;
  duration_ms?: number;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateAITrainingRequest {
  school_id: string;
  model_id: string;
  dataset_id: string;
  status?: AITraining['status'];
  config: Record<string, unknown>;
  metrics?: Record<string, unknown>;
  duration_ms?: number;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateAITrainingRequest {
  status?: AITraining['status'];
  config?: Record<string, unknown>;
  metrics?: Record<string, unknown>;
  duration_ms?: number;
  error_message?: string | null;
  metadata?: Record<string, unknown>;
}

export class AITrainingService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<AITraining | null> {
    const { data, error } = await this.supabase
      .from('gei2p_ai_trainings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching AI training', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as AITraining;
  }

  async listEntities(schoolId: string, filters?: { model_id?: string; status?: string; dataset_id?: string; limit?: number; offset?: number }): Promise<AITraining[]> {
    let query = this.supabase
      .from('gei2p_ai_trainings')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.model_id) query = query.eq('model_id', filters.model_id);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.dataset_id) query = query.eq('dataset_id', filters.dataset_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing AI trainings', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as AITraining[];
  }

  async createEntity(data: CreateAITrainingRequest): Promise<AITraining | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_ai_trainings')
      .insert({
        school_id: data.school_id,
        model_id: data.model_id,
        dataset_id: data.dataset_id,
        status: data.status || 'pending',
        config: data.config,
        metrics: data.metrics,
        duration_ms: data.duration_ms,
        error_message: data.error_message,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating AI training', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('AI training created', { id: created.id }, 'gei2p');
    return created as AITraining;
  }

  async updateEntity(id: string, data: UpdateAITrainingRequest): Promise<AITraining | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_ai_trainings')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating AI training', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('AI training updated', { id }, 'gei2p');
    return updated as AITraining;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_ai_trainings')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting AI training', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('AI training deleted', { id }, 'gei2p');
    return true;
  }
}
