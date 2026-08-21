import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface DataLineage {
  id: string;
  school_id: string;
  source_entity_type: string;
  source_entity_id: string;
  target_entity_type: string;
  target_entity_id: string;
  transformation: Record<string, unknown>;
  lineage_type: 'direct' | 'derived' | 'aggregated' | 'computed';
  status: 'active' | 'inactive' | 'pending';
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateDataLineageRequest {
  school_id: string;
  source_entity_type: string;
  source_entity_id: string;
  target_entity_type: string;
  target_entity_id: string;
  transformation: Record<string, unknown>;
  lineage_type: DataLineage['lineage_type'];
  status?: DataLineage['status'];
  metadata?: Record<string, unknown>;
}

export interface UpdateDataLineageRequest {
  source_entity_type?: string;
  source_entity_id?: string;
  target_entity_type?: string;
  target_entity_id?: string;
  transformation?: Record<string, unknown>;
  lineage_type?: DataLineage['lineage_type'];
  status?: DataLineage['status'];
  metadata?: Record<string, unknown>;
}

export class DataLineageService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<DataLineage | null> {
    const { data, error } = await this.supabase
      .from('gei2p_data_lineages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching data lineage', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as DataLineage;
  }

  async listEntities(schoolId: string, filters?: { source_entity_type?: string; target_entity_type?: string; lineage_type?: string; limit?: number; offset?: number }): Promise<DataLineage[]> {
    let query = this.supabase
      .from('gei2p_data_lineages')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.source_entity_type) query = query.eq('source_entity_type', filters.source_entity_type);
    if (filters?.target_entity_type) query = query.eq('target_entity_type', filters.target_entity_type);
    if (filters?.lineage_type) query = query.eq('lineage_type', filters.lineage_type);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing data lineages', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as DataLineage[];
  }

  async createEntity(data: CreateDataLineageRequest): Promise<DataLineage | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_data_lineages')
      .insert({
        school_id: data.school_id,
        source_entity_type: data.source_entity_type,
        source_entity_id: data.source_entity_id,
        target_entity_type: data.target_entity_type,
        target_entity_id: data.target_entity_id,
        transformation: data.transformation,
        lineage_type: data.lineage_type,
        status: data.status || 'active',
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating data lineage', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Data lineage created', { id: created.id }, 'gei2p');
    return created as DataLineage;
  }

  async updateEntity(id: string, data: UpdateDataLineageRequest): Promise<DataLineage | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_data_lineages')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating data lineage', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Data lineage updated', { id }, 'gei2p');
    return updated as DataLineage;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_data_lineages')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting data lineage', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Data lineage deleted', { id }, 'gei2p');
    return true;
  }
}
