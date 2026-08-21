import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface DataMesh {
  id: string;
  school_id: string;
  name: string;
  description?: string;
  domain: string;
  schema_definition: Record<string, unknown>;
  version: string;
  status: 'active' | 'inactive' | 'draft';
  owner_id: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateDataMeshRequest {
  school_id: string;
  name: string;
  description?: string;
  domain: string;
  schema_definition: Record<string, unknown>;
  version: string;
  status?: DataMesh['status'];
  owner_id: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateDataMeshRequest {
  name?: string;
  description?: string | null;
  domain?: string;
  schema_definition?: Record<string, unknown>;
  version?: string;
  status?: DataMesh['status'];
  metadata?: Record<string, unknown>;
}

export class DataMeshService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<DataMesh | null> {
    const { data, error } = await this.supabase
      .from('gei2p_data_meshes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching data mesh', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as DataMesh;
  }

  async listEntities(schoolId: string, filters?: { status?: string; domain?: string; owner_id?: string; limit?: number; offset?: number }): Promise<DataMesh[]> {
    let query = this.supabase
      .from('gei2p_data_meshes')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.domain) query = query.eq('domain', filters.domain);
    if (filters?.owner_id) query = query.eq('owner_id', filters.owner_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing data meshes', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as DataMesh[];
  }

  async createEntity(data: CreateDataMeshRequest): Promise<DataMesh | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_data_meshes')
      .insert({
        school_id: data.school_id,
        name: data.name,
        description: data.description,
        domain: data.domain,
        schema_definition: data.schema_definition,
        version: data.version,
        status: data.status || 'active',
        owner_id: data.owner_id,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating data mesh', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Data mesh created', { id: created.id }, 'gei2p');
    return created as DataMesh;
  }

  async updateEntity(id: string, data: UpdateDataMeshRequest): Promise<DataMesh | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_data_meshes')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating data mesh', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Data mesh updated', { id }, 'gei2p');
    return updated as DataMesh;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_data_meshes')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting data mesh', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Data mesh deleted', { id }, 'gei2p');
    return true;
  }
}
