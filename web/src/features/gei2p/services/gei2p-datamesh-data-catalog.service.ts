import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface DataCatalog {
  id: string;
  school_id: string;
  name: string;
  description?: string;
  mesh_id: string;
  schema_type: Record<string, unknown>;
  quality_score?: number;
  tags?: string[];
  owner_id: string;
  status: 'active' | 'inactive' | 'deprecated';
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateDataCatalogRequest {
  school_id: string;
  name: string;
  description?: string;
  mesh_id: string;
  schema_type: Record<string, unknown>;
  quality_score?: number;
  tags?: string[];
  owner_id: string;
  status?: DataCatalog['status'];
  metadata?: Record<string, unknown>;
}

export interface UpdateDataCatalogRequest {
  name?: string;
  description?: string | null;
  mesh_id?: string;
  schema_type?: Record<string, unknown>;
  quality_score?: number;
  tags?: string[];
  status?: DataCatalog['status'];
  metadata?: Record<string, unknown>;
}

export class DataCatalogService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<DataCatalog | null> {
    const { data, error } = await this.supabase
      .from('gei2p_data_catalogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching data catalog', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as DataCatalog;
  }

  async listEntities(schoolId: string, filters?: { mesh_id?: string; status?: string; owner_id?: string; limit?: number; offset?: number }): Promise<DataCatalog[]> {
    let query = this.supabase
      .from('gei2p_data_catalogs')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.mesh_id) query = query.eq('mesh_id', filters.mesh_id);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.owner_id) query = query.eq('owner_id', filters.owner_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing data catalogs', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as DataCatalog[];
  }

  async createEntity(data: CreateDataCatalogRequest): Promise<DataCatalog | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_data_catalogs')
      .insert({
        school_id: data.school_id,
        name: data.name,
        description: data.description,
        mesh_id: data.mesh_id,
        schema_type: data.schema_type,
        quality_score: data.quality_score,
        tags: data.tags,
        owner_id: data.owner_id,
        status: data.status || 'active',
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating data catalog', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Data catalog created', { id: created.id }, 'gei2p');
    return created as DataCatalog;
  }

  async updateEntity(id: string, data: UpdateDataCatalogRequest): Promise<DataCatalog | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_data_catalogs')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating data catalog', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Data catalog updated', { id }, 'gei2p');
    return updated as DataCatalog;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_data_catalogs')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting data catalog', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Data catalog deleted', { id }, 'gei2p');
    return true;
  }
}
