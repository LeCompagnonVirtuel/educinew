import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface ApiRateLimit {
  id: string;
  school_id: string;
  api_key_id: string;
  window_seconds: number;
  max_requests: number;
  current_count: number;
  window_start: string;
  status: 'normal' | 'throttled' | 'blocked';
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateApiRateLimitRequest {
  school_id: string;
  api_key_id: string;
  window_seconds: number;
  max_requests: number;
  current_count?: number;
  window_start?: string;
  status?: ApiRateLimit['status'];
  metadata?: Record<string, unknown>;
}

export interface UpdateApiRateLimitRequest {
  window_seconds?: number;
  max_requests?: number;
  current_count?: number;
  status?: ApiRateLimit['status'];
  metadata?: Record<string, unknown>;
}

export class ApiRateLimitService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<ApiRateLimit | null> {
    const { data, error } = await this.supabase
      .from('gei2p_api_rate_limits')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching api rate limit', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as ApiRateLimit;
  }

  async listEntities(schoolId: string, filters?: { api_key_id?: string; status?: string; limit?: number; offset?: number }): Promise<ApiRateLimit[]> {
    let query = this.supabase
      .from('gei2p_api_rate_limits')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.api_key_id) query = query.eq('api_key_id', filters.api_key_id);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing api rate limits', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as ApiRateLimit[];
  }

  async createEntity(data: CreateApiRateLimitRequest): Promise<ApiRateLimit | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_api_rate_limits')
      .insert({
        school_id: data.school_id,
        api_key_id: data.api_key_id,
        window_seconds: data.window_seconds,
        max_requests: data.max_requests,
        current_count: data.current_count || 0,
        window_start: data.window_start || new Date().toISOString(),
        status: data.status || 'normal',
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating api rate limit', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Api rate limit created', { id: created.id }, 'gei2p');
    return created as ApiRateLimit;
  }

  async updateEntity(id: string, data: UpdateApiRateLimitRequest): Promise<ApiRateLimit | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_api_rate_limits')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating api rate limit', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Api rate limit updated', { id }, 'gei2p');
    return updated as ApiRateLimit;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_api_rate_limits')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting api rate limit', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Api rate limit deleted', { id }, 'gei2p');
    return true;
  }
}
