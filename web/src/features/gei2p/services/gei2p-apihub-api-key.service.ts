import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface ApiKey {
  id: string;
  school_id: string;
  name: string;
  key_hash: string;
  key_prefix: string;
  permissions: string[];
  rate_limit: number;
  expires_at?: string;
  status: 'active' | 'revoked' | 'expired';
  last_used_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateApiKeyRequest {
  school_id: string;
  name: string;
  key_hash: string;
  key_prefix: string;
  permissions: string[];
  rate_limit: number;
  expires_at?: string;
  status?: ApiKey['status'];
  metadata?: Record<string, unknown>;
}

export interface UpdateApiKeyRequest {
  name?: string;
  permissions?: string[];
  rate_limit?: number;
  expires_at?: string | null;
  status?: ApiKey['status'];
  last_used_at?: string;
  metadata?: Record<string, unknown>;
}

export class ApiKeyService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<ApiKey | null> {
    const { data, error } = await this.supabase
      .from('gei2p_api_keys')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching api key', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as ApiKey;
  }

  async listEntities(schoolId: string, filters?: { status?: string; limit?: number; offset?: number }): Promise<ApiKey[]> {
    let query = this.supabase
      .from('gei2p_api_keys')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing api keys', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as ApiKey[];
  }

  async createEntity(data: CreateApiKeyRequest): Promise<ApiKey | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_api_keys')
      .insert({
        school_id: data.school_id,
        name: data.name,
        key_hash: data.key_hash,
        key_prefix: data.key_prefix,
        permissions: data.permissions,
        rate_limit: data.rate_limit,
        expires_at: data.expires_at,
        status: data.status || 'active',
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating api key', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Api key created', { id: created.id }, 'gei2p');
    return created as ApiKey;
  }

  async updateEntity(id: string, data: UpdateApiKeyRequest): Promise<ApiKey | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_api_keys')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating api key', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Api key updated', { id }, 'gei2p');
    return updated as ApiKey;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_api_keys')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting api key', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Api key deleted', { id }, 'gei2p');
    return true;
  }
}
