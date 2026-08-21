import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface AIModel {
  id: string;
  school_id: string;
  name: string;
  model_type: 'classification' | 'regression' | 'nlp' | 'embedding' | 'generative';
  version: string;
  framework: string;
  status: 'active' | 'inactive' | 'training' | 'deprecated';
  metrics?: Record<string, unknown>;
  config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateAIModelRequest {
  school_id: string;
  name: string;
  model_type: AIModel['model_type'];
  version: string;
  framework: string;
  status?: AIModel['status'];
  metrics?: Record<string, unknown>;
  config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateAIModelRequest {
  name?: string;
  model_type?: AIModel['model_type'];
  version?: string;
  framework?: string;
  status?: AIModel['status'];
  metrics?: Record<string, unknown> | null;
  config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export class AIModelService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<AIModel | null> {
    const { data, error } = await this.supabase
      .from('gei2p_ai_models')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching AI model', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as AIModel;
  }

  async listEntities(schoolId: string, filters?: { status?: string; model_type?: string; framework?: string; limit?: number; offset?: number }): Promise<AIModel[]> {
    let query = this.supabase
      .from('gei2p_ai_models')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.model_type) query = query.eq('model_type', filters.model_type);
    if (filters?.framework) query = query.eq('framework', filters.framework);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing AI models', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as AIModel[];
  }

  async createEntity(data: CreateAIModelRequest): Promise<AIModel | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_ai_models')
      .insert({
        school_id: data.school_id,
        name: data.name,
        model_type: data.model_type,
        version: data.version,
        framework: data.framework,
        status: data.status || 'active',
        metrics: data.metrics,
        config: data.config,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating AI model', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('AI model created', { id: created.id }, 'gei2p');
    return created as AIModel;
  }

  async updateEntity(id: string, data: UpdateAIModelRequest): Promise<AIModel | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_ai_models')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating AI model', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('AI model updated', { id }, 'gei2p');
    return updated as AIModel;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_ai_models')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting AI model', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('AI model deleted', { id }, 'gei2p');
    return true;
  }
}
