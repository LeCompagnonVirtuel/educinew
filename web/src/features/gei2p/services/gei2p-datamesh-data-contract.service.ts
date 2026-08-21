import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface DataContract {
  id: string;
  school_id: string;
  mesh_id: string;
  name: string;
  version: string;
  schema: Record<string, unknown>;
  validity: 'active' | 'expired' | 'draft';
  effective_date: string;
  expiry_date?: string;
  provider_id: string;
  consumer_id?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateDataContractRequest {
  school_id: string;
  mesh_id: string;
  name: string;
  version: string;
  schema: Record<string, unknown>;
  validity?: DataContract['validity'];
  effective_date: string;
  expiry_date?: string;
  provider_id: string;
  consumer_id?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateDataContractRequest {
  name?: string;
  version?: string;
  schema?: Record<string, unknown>;
  validity?: DataContract['validity'];
  effective_date?: string;
  expiry_date?: string | null;
  consumer_id?: string | null;
  metadata?: Record<string, unknown>;
}

export class DataContractService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<DataContract | null> {
    const { data, error } = await this.supabase
      .from('gei2p_data_contracts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching data contract', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as DataContract;
  }

  async listEntities(schoolId: string, filters?: { mesh_id?: string; validity?: string; provider_id?: string; limit?: number; offset?: number }): Promise<DataContract[]> {
    let query = this.supabase
      .from('gei2p_data_contracts')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.mesh_id) query = query.eq('mesh_id', filters.mesh_id);
    if (filters?.validity) query = query.eq('validity', filters.validity);
    if (filters?.provider_id) query = query.eq('provider_id', filters.provider_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing data contracts', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as DataContract[];
  }

  async createEntity(data: CreateDataContractRequest): Promise<DataContract | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_data_contracts')
      .insert({
        school_id: data.school_id,
        mesh_id: data.mesh_id,
        name: data.name,
        version: data.version,
        schema: data.schema,
        validity: data.validity || 'active',
        effective_date: data.effective_date,
        expiry_date: data.expiry_date,
        provider_id: data.provider_id,
        consumer_id: data.consumer_id,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating data contract', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Data contract created', { id: created.id }, 'gei2p');
    return created as DataContract;
  }

  async updateEntity(id: string, data: UpdateDataContractRequest): Promise<DataContract | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_data_contracts')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating data contract', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Data contract updated', { id }, 'gei2p');
    return updated as DataContract;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_data_contracts')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting data contract', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Data contract deleted', { id }, 'gei2p');
    return true;
  }
}
