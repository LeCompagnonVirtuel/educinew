import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface InteroperabilityAI {
  id: string;
  school_id: string;
  name: string;
  ai_type: 'classification' | 'mapping' | 'validation' | 'recommendation' | 'prediction';
  model_id: string;
  input_schema: Record<string, unknown>;
  output_schema: Record<string, unknown>;
  status: 'active' | 'inactive' | 'training' | 'error';
  config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateInteroperabilityAIRequest {
  school_id: string;
  name: string;
  ai_type: InteroperabilityAI['ai_type'];
  model_id: string;
  input_schema: Record<string, unknown>;
  output_schema: Record<string, unknown>;
  status?: InteroperabilityAI['status'];
  config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateInteroperabilityAIRequest {
  name?: string;
  ai_type?: InteroperabilityAI['ai_type'];
  model_id?: string;
  input_schema?: Record<string, unknown>;
  output_schema?: Record<string, unknown>;
  status?: InteroperabilityAI['status'];
  config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export class InteroperabilityAIService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<InteroperabilityAI | null> {
    const { data, error } = await this.supabase
      .from('gei2p_interoperability_ais')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching interoperability AI', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as InteroperabilityAI;
  }

  async listEntities(schoolId: string, filters?: { status?: string; ai_type?: string; model_id?: string; limit?: number; offset?: number }): Promise<InteroperabilityAI[]> {
    let query = this.supabase
      .from('gei2p_interoperability_ais')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.ai_type) query = query.eq('ai_type', filters.ai_type);
    if (filters?.model_id) query = query.eq('model_id', filters.model_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing interoperability AIs', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as InteroperabilityAI[];
  }

  async createEntity(data: CreateInteroperabilityAIRequest): Promise<InteroperabilityAI | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_interoperability_ais')
      .insert({
        school_id: data.school_id,
        name: data.name,
        ai_type: data.ai_type,
        model_id: data.model_id,
        input_schema: data.input_schema,
        output_schema: data.output_schema,
        status: data.status || 'active',
        config: data.config,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating interoperability AI', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Interoperability AI created', { id: created.id }, 'gei2p');
    return created as InteroperabilityAI;
  }

  async updateEntity(id: string, data: UpdateInteroperabilityAIRequest): Promise<InteroperabilityAI | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_interoperability_ais')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating interoperability AI', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Interoperability AI updated', { id }, 'gei2p');
    return updated as InteroperabilityAI;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_interoperability_ais')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting interoperability AI', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Interoperability AI deleted', { id }, 'gei2p');
    return true;
  }
}
