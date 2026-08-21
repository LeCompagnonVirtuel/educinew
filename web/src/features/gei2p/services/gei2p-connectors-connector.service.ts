import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface Connector {
  id: string;
  school_id: string;
  name: string;
  connector_type: 'rest' | 'soap' | 'graphql' | 'websocket' | 'file' | 'custom';
  endpoint: string;
  auth_type: 'api_key' | 'oauth2' | 'basic' | 'bearer' | 'none';
  status: 'active' | 'inactive' | 'error' | 'maintenance';
  config?: Record<string, unknown>;
  credentials?: Record<string, unknown>;
  last_sync_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateConnectorRequest {
  school_id: string;
  name: string;
  connector_type: Connector['connector_type'];
  endpoint: string;
  auth_type: Connector['auth_type'];
  status?: Connector['status'];
  config?: Record<string, unknown>;
  credentials?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateConnectorRequest {
  name?: string;
  connector_type?: Connector['connector_type'];
  endpoint?: string;
  auth_type?: Connector['auth_type'];
  status?: Connector['status'];
  config?: Record<string, unknown>;
  credentials?: Record<string, unknown> | null;
  last_sync_at?: string;
  error_message?: string | null;
  metadata?: Record<string, unknown>;
}

export class ConnectorService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<Connector | null> {
    const { data, error } = await this.supabase
      .from('gei2p_connectors')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching connector', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as Connector;
  }

  async listEntities(schoolId: string, filters?: { status?: string; connector_type?: string; limit?: number; offset?: number }): Promise<Connector[]> {
    let query = this.supabase
      .from('gei2p_connectors')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.connector_type) query = query.eq('connector_type', filters.connector_type);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing connectors', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as Connector[];
  }

  async createEntity(data: CreateConnectorRequest): Promise<Connector | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_connectors')
      .insert({
        school_id: data.school_id,
        name: data.name,
        connector_type: data.connector_type,
        endpoint: data.endpoint,
        auth_type: data.auth_type,
        status: data.status || 'active',
        config: data.config,
        credentials: data.credentials,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating connector', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Connector created', { id: created.id }, 'gei2p');
    return created as Connector;
  }

  async updateEntity(id: string, data: UpdateConnectorRequest): Promise<Connector | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_connectors')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating connector', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Connector updated', { id }, 'gei2p');
    return updated as Connector;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_connectors')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting connector', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Connector deleted', { id }, 'gei2p');
    return true;
  }
}
