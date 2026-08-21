import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface ConnectorMonitoring {
  id: string;
  school_id: string;
  connector_id: string;
  metric_type: 'uptime' | 'latency' | 'throughput' | 'error_rate' | 'response_time';
  value: number;
  unit: string;
  recorded_at: string;
  status: 'normal' | 'warning' | 'critical';
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateConnectorMonitoringRequest {
  school_id: string;
  connector_id: string;
  metric_type: ConnectorMonitoring['metric_type'];
  value: number;
  unit: string;
  recorded_at?: string;
  status?: ConnectorMonitoring['status'];
  metadata?: Record<string, unknown>;
}

export interface UpdateConnectorMonitoringRequest {
  metric_type?: ConnectorMonitoring['metric_type'];
  value?: number;
  unit?: string;
  status?: ConnectorMonitoring['status'];
  metadata?: Record<string, unknown>;
}

export class ConnectorMonitoringService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<ConnectorMonitoring | null> {
    const { data, error } = await this.supabase
      .from('gei2p_connector_monitorings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching connector monitoring', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as ConnectorMonitoring;
  }

  async listEntities(schoolId: string, filters?: { connector_id?: string; metric_type?: string; status?: string; limit?: number; offset?: number }): Promise<ConnectorMonitoring[]> {
    let query = this.supabase
      .from('gei2p_connector_monitorings')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.connector_id) query = query.eq('connector_id', filters.connector_id);
    if (filters?.metric_type) query = query.eq('metric_type', filters.metric_type);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('recorded_at', { ascending: false });

    if (error) {
      logger.error('Error listing connector monitorings', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as ConnectorMonitoring[];
  }

  async createEntity(data: CreateConnectorMonitoringRequest): Promise<ConnectorMonitoring | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_connector_monitorings')
      .insert({
        school_id: data.school_id,
        connector_id: data.connector_id,
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
      logger.error('Error creating connector monitoring', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Connector monitoring created', { id: created.id }, 'gei2p');
    return created as ConnectorMonitoring;
  }

  async updateEntity(id: string, data: UpdateConnectorMonitoringRequest): Promise<ConnectorMonitoring | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_connector_monitorings')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating connector monitoring', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Connector monitoring updated', { id }, 'gei2p');
    return updated as ConnectorMonitoring;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_connector_monitorings')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting connector monitoring', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Connector monitoring deleted', { id }, 'gei2p');
    return true;
  }
}
