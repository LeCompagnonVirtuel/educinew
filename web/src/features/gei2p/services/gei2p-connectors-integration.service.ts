import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface Integration {
  id: string;
  school_id: string;
  connector_id: string;
  name: string;
  integration_type: 'push' | 'pull' | 'bidirectional' | 'webhook' | 'scheduled';
  source_table: string;
  target_table: string;
  field_mapping: Record<string, string>;
  status: 'active' | 'inactive' | 'error';
  schedule?: string;
  last_run_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateIntegrationRequest {
  school_id: string;
  connector_id: string;
  name: string;
  integration_type: Integration['integration_type'];
  source_table: string;
  target_table: string;
  field_mapping: Record<string, string>;
  status?: Integration['status'];
  schedule?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateIntegrationRequest {
  connector_id?: string;
  name?: string;
  integration_type?: Integration['integration_type'];
  source_table?: string;
  target_table?: string;
  field_mapping?: Record<string, string>;
  status?: Integration['status'];
  schedule?: string | null;
  last_run_at?: string;
  error_message?: string | null;
  metadata?: Record<string, unknown>;
}

export class IntegrationService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<Integration | null> {
    const { data, error } = await this.supabase
      .from('gei2p_integrations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching integration', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as Integration;
  }

  async listEntities(schoolId: string, filters?: { status?: string; connector_id?: string; limit?: number; offset?: number }): Promise<Integration[]> {
    let query = this.supabase
      .from('gei2p_integrations')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.connector_id) query = query.eq('connector_id', filters.connector_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing integrations', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as Integration[];
  }

  async createEntity(data: CreateIntegrationRequest): Promise<Integration | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_integrations')
      .insert({
        school_id: data.school_id,
        connector_id: data.connector_id,
        name: data.name,
        integration_type: data.integration_type,
        source_table: data.source_table,
        target_table: data.target_table,
        field_mapping: data.field_mapping,
        status: data.status || 'active',
        schedule: data.schedule,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating integration', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Integration created', { id: created.id }, 'gei2p');
    return created as Integration;
  }

  async updateEntity(id: string, data: UpdateIntegrationRequest): Promise<Integration | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_integrations')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating integration', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Integration updated', { id }, 'gei2p');
    return updated as Integration;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_integrations')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting integration', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Integration deleted', { id }, 'gei2p');
    return true;
  }
}
