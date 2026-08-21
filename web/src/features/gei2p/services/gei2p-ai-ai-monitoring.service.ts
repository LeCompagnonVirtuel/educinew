import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface AIMonitoring {
  id: string;
  school_id: string;
  model_id: string;
  metric_type: 'accuracy' | 'latency' | 'throughput' | 'error_rate' | 'drift';
  value: number;
  unit: string;
  recorded_at: string;
  status: 'normal' | 'warning' | 'critical';
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface CreateAIMonitoringRequest {
  school_id: string;
  model_id: string;
  metric_type: AIMonitoring['metric_type'];
  value: number;
  unit: string;
  recorded_at?: string;
  status?: AIMonitoring['status'];
  metadata?: Record<string, unknown>;
}

export interface UpdateAIMonitoringRequest {
  value?: number;
  unit?: string;
  status?: AIMonitoring['status'];
  metadata?: Record<string, unknown>;
}

export class AIMonitoringService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<AIMonitoring | null> {
    const { data, error } = await this.supabase
      .from('gei2p_ai_monitorings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching AI monitoring', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as AIMonitoring;
  }

  async listEntities(schoolId: string, filters?: { model_id?: string; metric_type?: string; status?: string; limit?: number; offset?: number }): Promise<AIMonitoring[]> {
    let query = this.supabase
      .from('gei2p_ai_monitorings')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.model_id) query = query.eq('model_id', filters.model_id);
    if (filters?.metric_type) query = query.eq('metric_type', filters.metric_type);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('recorded_at', { ascending: false });

    if (error) {
      logger.error('Error listing AI monitorings', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as AIMonitoring[];
  }

  async createEntity(data: CreateAIMonitoringRequest): Promise<AIMonitoring | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_ai_monitorings')
      .insert({
        school_id: data.school_id,
        model_id: data.model_id,
        metric_type: data.metric_type,
        value: data.value,
        unit: data.unit,
        recorded_at: data.recorded_at || new Date().toISOString(),
        status: data.status || 'normal',
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating AI monitoring', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('AI monitoring created', { id: created.id }, 'gei2p');
    return created as AIMonitoring;
  }

  async updateEntity(id: string, data: UpdateAIMonitoringRequest): Promise<AIMonitoring | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_ai_monitorings')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating AI monitoring', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('AI monitoring updated', { id }, 'gei2p');
    return updated as AIMonitoring;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_ai_monitorings')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting AI monitoring', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('AI monitoring deleted', { id }, 'gei2p');
    return true;
  }
}
