import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface ConnectorAuth {
  id: string;
  school_id: string;
  connector_id: string;
  auth_type: 'api_key' | 'oauth2' | 'basic' | 'bearer' | 'mutual_tls';
  credentials: Record<string, unknown>;
  token_expiry?: string;
  refresh_token?: string;
  status: 'active' | 'expired' | 'revoked';
  last_used_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateConnectorAuthRequest {
  school_id: string;
  connector_id: string;
  auth_type: ConnectorAuth['auth_type'];
  credentials: Record<string, unknown>;
  token_expiry?: string;
  refresh_token?: string;
  status?: ConnectorAuth['status'];
  metadata?: Record<string, unknown>;
}

export interface UpdateConnectorAuthRequest {
  auth_type?: ConnectorAuth['auth_type'];
  credentials?: Record<string, unknown>;
  token_expiry?: string | null;
  refresh_token?: string | null;
  status?: ConnectorAuth['status'];
  last_used_at?: string;
  metadata?: Record<string, unknown>;
}

export class ConnectorAuthService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<ConnectorAuth | null> {
    const { data, error } = await this.supabase
      .from('gei2p_connector_auths')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching connector auth', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as ConnectorAuth;
  }

  async listEntities(schoolId: string, filters?: { connector_id?: string; auth_type?: string; status?: string; limit?: number; offset?: number }): Promise<ConnectorAuth[]> {
    let query = this.supabase
      .from('gei2p_connector_auths')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.connector_id) query = query.eq('connector_id', filters.connector_id);
    if (filters?.auth_type) query = query.eq('auth_type', filters.auth_type);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing connector auths', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as ConnectorAuth[];
  }

  async createEntity(data: CreateConnectorAuthRequest): Promise<ConnectorAuth | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_connector_auths')
      .insert({
        school_id: data.school_id,
        connector_id: data.connector_id,
        auth_type: data.auth_type,
        credentials: data.credentials,
        token_expiry: data.token_expiry,
        refresh_token: data.refresh_token,
        status: data.status || 'active',
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating connector auth', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Connector auth created', { id: created.id }, 'gei2p');
    return created as ConnectorAuth;
  }

  async updateEntity(id: string, data: UpdateConnectorAuthRequest): Promise<ConnectorAuth | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_connector_auths')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating connector auth', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Connector auth updated', { id }, 'gei2p');
    return updated as ConnectorAuth;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_connector_auths')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting connector auth', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Connector auth deleted', { id }, 'gei2p');
    return true;
  }
}
