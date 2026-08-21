import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface ConnectorConfig {
  id: string;
  school_id: string;
  connector_id: string;
  key: string;
  value: Record<string, unknown>;
  encrypted: boolean;
  description?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateConnectorConfigRequest {
  school_id: string;
  connector_id: string;
  key: string;
  value: Record<string, unknown>;
  encrypted?: boolean;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateConnectorConfigRequest {
  key?: string;
  value?: Record<string, unknown>;
  encrypted?: boolean;
  description?: string | null;
  metadata?: Record<string, unknown>;
}

export class ConnectorConfigService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<ConnectorConfig | null> {
    const { data, error } = await this.supabase
      .from('gei2p_connector_configs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching connector config', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as ConnectorConfig;
  }

  async listEntities(schoolId: string, filters?: { connector_id?: string; key?: string; limit?: number; offset?: number }): Promise<ConnectorConfig[]> {
    let query = this.supabase
      .from('gei2p_connector_configs')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.connector_id) query = query.eq('connector_id', filters.connector_id);
    if (filters?.key) query = query.eq('key', filters.key);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing connector configs', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as ConnectorConfig[];
  }

  async createEntity(data: CreateConnectorConfigRequest): Promise<ConnectorConfig | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_connector_configs')
      .insert({
        school_id: data.school_id,
        connector_id: data.connector_id,
        key: data.key,
        value: data.value,
        encrypted: data.encrypted || false,
        description: data.description,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating connector config', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Connector config created', { id: created.id }, 'gei2p');
    return created as ConnectorConfig;
  }

  async updateEntity(id: string, data: UpdateConnectorConfigRequest): Promise<ConnectorConfig | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_connector_configs')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating connector config', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Connector config updated', { id }, 'gei2p');
    return updated as ConnectorConfig;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_connector_configs')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting connector config', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Connector config deleted', { id }, 'gei2p');
    return true;
  }
}
