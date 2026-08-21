import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface ApiGateway {
  id: string;
  school_id: string;
  name: string;
  base_url: string;
  rate_limit: number;
  timeout: number;
  status: 'active' | 'inactive' | 'maintenance';
  routes?: Record<string, unknown>[];
  cors_config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateApiGatewayRequest {
  school_id: string;
  name: string;
  base_url: string;
  rate_limit: number;
  timeout: number;
  status?: ApiGateway['status'];
  routes?: Record<string, unknown>[];
  cors_config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateApiGatewayRequest {
  name?: string;
  base_url?: string;
  rate_limit?: number;
  timeout?: number;
  status?: ApiGateway['status'];
  routes?: Record<string, unknown>[];
  cors_config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export class ApiGatewayService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<ApiGateway | null> {
    const { data, error } = await this.supabase
      .from('gei2p_api_gateways')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching api gateway', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as ApiGateway;
  }

  async listEntities(schoolId: string, filters?: { status?: string; limit?: number; offset?: number }): Promise<ApiGateway[]> {
    let query = this.supabase
      .from('gei2p_api_gateways')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing api gateways', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as ApiGateway[];
  }

  async createEntity(data: CreateApiGatewayRequest): Promise<ApiGateway | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_api_gateways')
      .insert({
        school_id: data.school_id,
        name: data.name,
        base_url: data.base_url,
        rate_limit: data.rate_limit,
        timeout: data.timeout,
        status: data.status || 'active',
        routes: data.routes,
        cors_config: data.cors_config,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating api gateway', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Api gateway created', { id: created.id }, 'gei2p');
    return created as ApiGateway;
  }

  async updateEntity(id: string, data: UpdateApiGatewayRequest): Promise<ApiGateway | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_api_gateways')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating api gateway', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Api gateway updated', { id }, 'gei2p');
    return updated as ApiGateway;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_api_gateways')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting api gateway', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Api gateway deleted', { id }, 'gei2p');
    return true;
  }
}
