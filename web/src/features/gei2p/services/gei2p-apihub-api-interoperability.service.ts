import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface ApiInteroperability {
  id: string;
  school_id: string;
  source_api: string;
  target_api: string;
  protocol: 'rest' | 'soap' | 'graphql' | 'grpc' | 'websocket';
  mapping: Record<string, unknown>;
  status: 'active' | 'inactive' | 'error';
  last_sync_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateApiInteroperabilityRequest {
  school_id: string;
  source_api: string;
  target_api: string;
  protocol: ApiInteroperability['protocol'];
  mapping: Record<string, unknown>;
  status?: ApiInteroperability['status'];
  metadata?: Record<string, unknown>;
}

export interface UpdateApiInteroperabilityRequest {
  source_api?: string;
  target_api?: string;
  protocol?: ApiInteroperability['protocol'];
  mapping?: Record<string, unknown>;
  status?: ApiInteroperability['status'];
  last_sync_at?: string;
  error_message?: string | null;
  metadata?: Record<string, unknown>;
}

export class ApiInteroperabilityService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<ApiInteroperability | null> {
    const { data, error } = await this.supabase
      .from('gei2p_api_interoperability')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching api interoperability', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as ApiInteroperability;
  }

  async listEntities(schoolId: string, filters?: { status?: string; protocol?: string; source_api?: string; limit?: number; offset?: number }): Promise<ApiInteroperability[]> {
    let query = this.supabase
      .from('gei2p_api_interoperability')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.protocol) query = query.eq('protocol', filters.protocol);
    if (filters?.source_api) query = query.eq('source_api', filters.source_api);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing api interoperability', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as ApiInteroperability[];
  }

  async createEntity(data: CreateApiInteroperabilityRequest): Promise<ApiInteroperability | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_api_interoperability')
      .insert({
        school_id: data.school_id,
        source_api: data.source_api,
        target_api: data.target_api,
        protocol: data.protocol,
        mapping: data.mapping,
        status: data.status || 'active',
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating api interoperability', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Api interoperability created', { id: created.id }, 'gei2p');
    return created as ApiInteroperability;
  }

  async updateEntity(id: string, data: UpdateApiInteroperabilityRequest): Promise<ApiInteroperability | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_api_interoperability')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating api interoperability', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Api interoperability updated', { id }, 'gei2p');
    return updated as ApiInteroperability;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_api_interoperability')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting api interoperability', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Api interoperability deleted', { id }, 'gei2p');
    return true;
  }
}
