import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface ApiLogging {
  id: string;
  school_id: string;
  api_key_id: string;
  method: string;
  endpoint: string;
  status_code: number;
  request_body?: Record<string, unknown>;
  response_body?: Record<string, unknown>;
  duration_ms: number;
  ip_address?: string;
  user_agent?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface CreateApiLoggingRequest {
  school_id: string;
  api_key_id: string;
  method: string;
  endpoint: string;
  status_code: number;
  request_body?: Record<string, unknown>;
  response_body?: Record<string, unknown>;
  duration_ms: number;
  ip_address?: string;
  user_agent?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateApiLoggingRequest {
  status_code?: number;
  response_body?: Record<string, unknown>;
  duration_ms?: number;
  error_message?: string | null;
  metadata?: Record<string, unknown>;
}

export class ApiLoggingService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<ApiLogging | null> {
    const { data, error } = await this.supabase
      .from('gei2p_api_logs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching api log', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as ApiLogging;
  }

  async listEntities(schoolId: string, filters?: { api_key_id?: string; method?: string; status_code?: number; limit?: number; offset?: number }): Promise<ApiLogging[]> {
    let query = this.supabase
      .from('gei2p_api_logs')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.api_key_id) query = query.eq('api_key_id', filters.api_key_id);
    if (filters?.method) query = query.eq('method', filters.method);
    if (filters?.status_code) query = query.eq('status_code', filters.status_code);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing api logs', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as ApiLogging[];
  }

  async createEntity(data: CreateApiLoggingRequest): Promise<ApiLogging | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_api_logs')
      .insert({
        school_id: data.school_id,
        api_key_id: data.api_key_id,
        method: data.method,
        endpoint: data.endpoint,
        status_code: data.status_code,
        request_body: data.request_body,
        response_body: data.response_body,
        duration_ms: data.duration_ms,
        ip_address: data.ip_address,
        user_agent: data.user_agent,
        error_message: data.error_message,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating api log', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Api log created', { id: created.id }, 'gei2p');
    return created as ApiLogging;
  }

  async updateEntity(id: string, data: UpdateApiLoggingRequest): Promise<ApiLogging | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_api_logs')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating api log', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Api log updated', { id }, 'gei2p');
    return updated as ApiLogging;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_api_logs')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting api log', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Api log deleted', { id }, 'gei2p');
    return true;
  }
}
