import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface AIInference {
  id: string;
  school_id: string;
  model_id: string;
  input_data: Record<string, unknown>;
  output_data?: Record<string, unknown>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  latency_ms?: number;
  tokens_used?: number;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateAIInferenceRequest {
  school_id: string;
  model_id: string;
  input_data: Record<string, unknown>;
  output_data?: Record<string, unknown>;
  status?: AIInference['status'];
  latency_ms?: number;
  tokens_used?: number;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateAIInferenceRequest {
  output_data?: Record<string, unknown>;
  status?: AIInference['status'];
  latency_ms?: number;
  tokens_used?: number;
  error_message?: string | null;
  metadata?: Record<string, unknown>;
}

export class AIInferenceService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<AIInference | null> {
    const { data, error } = await this.supabase
      .from('gei2p_ai_inferences')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching AI inference', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as AIInference;
  }

  async listEntities(schoolId: string, filters?: { model_id?: string; status?: string; limit?: number; offset?: number }): Promise<AIInference[]> {
    let query = this.supabase
      .from('gei2p_ai_inferences')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.model_id) query = query.eq('model_id', filters.model_id);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing AI inferences', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as AIInference[];
  }

  async createEntity(data: CreateAIInferenceRequest): Promise<AIInference | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_ai_inferences')
      .insert({
        school_id: data.school_id,
        model_id: data.model_id,
        input_data: data.input_data,
        output_data: data.output_data,
        status: data.status || 'pending',
        latency_ms: data.latency_ms,
        tokens_used: data.tokens_used,
        error_message: data.error_message,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating AI inference', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('AI inference created', { id: created.id }, 'gei2p');
    return created as AIInference;
  }

  async updateEntity(id: string, data: UpdateAIInferenceRequest): Promise<AIInference | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_ai_inferences')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating AI inference', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('AI inference updated', { id }, 'gei2p');
    return updated as AIInference;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_ai_inferences')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting AI inference', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('AI inference deleted', { id }, 'gei2p');
    return true;
  }
}
