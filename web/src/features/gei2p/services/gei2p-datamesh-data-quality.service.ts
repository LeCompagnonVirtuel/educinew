import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface DataQuality {
  id: string;
  school_id: string;
  catalog_id: string;
  quality_type: 'completeness' | 'accuracy' | 'consistency' | 'timeliness' | 'validity';
  score: number;
  max_score: number;
  checked_at: string;
  details?: Record<string, unknown>;
  status: 'pass' | 'fail' | 'warning';
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateDataQualityRequest {
  school_id: string;
  catalog_id: string;
  quality_type: DataQuality['quality_type'];
  score: number;
  max_score: number;
  checked_at?: string;
  details?: Record<string, unknown>;
  status?: DataQuality['status'];
  metadata?: Record<string, unknown>;
}

export interface UpdateDataQualityRequest {
  quality_type?: DataQuality['quality_type'];
  score?: number;
  max_score?: number;
  details?: Record<string, unknown> | null;
  status?: DataQuality['status'];
  metadata?: Record<string, unknown>;
}

export class DataQualityService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<DataQuality | null> {
    const { data, error } = await this.supabase
      .from('gei2p_data_qualities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching data quality', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as DataQuality;
  }

  async listEntities(schoolId: string, filters?: { catalog_id?: string; quality_type?: string; status?: string; limit?: number; offset?: number }): Promise<DataQuality[]> {
    let query = this.supabase
      .from('gei2p_data_qualities')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.catalog_id) query = query.eq('catalog_id', filters.catalog_id);
    if (filters?.quality_type) query = query.eq('quality_type', filters.quality_type);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('checked_at', { ascending: false });

    if (error) {
      logger.error('Error listing data qualities', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as DataQuality[];
  }

  async createEntity(data: CreateDataQualityRequest): Promise<DataQuality | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_data_qualities')
      .insert({
        school_id: data.school_id,
        catalog_id: data.catalog_id,
        quality_type: data.quality_type,
        score: data.score,
        max_score: data.max_score,
        checked_at: data.checked_at || new Date().toISOString(),
        details: data.details,
        status: data.status || 'pass',
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating data quality', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Data quality created', { id: created.id }, 'gei2p');
    return created as DataQuality;
  }

  async updateEntity(id: string, data: UpdateDataQualityRequest): Promise<DataQuality | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_data_qualities')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating data quality', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Data quality updated', { id }, 'gei2p');
    return updated as DataQuality;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_data_qualities')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting data quality', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Data quality deleted', { id }, 'gei2p');
    return true;
  }
}
