import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface SyncStatus {
  id: string;
  school_id: string;
  source_system: string;
  target_system: string;
  entity_type: string;
  status: 'healthy' | 'degraded' | 'down' | 'maintenance';
  last_check_at: string;
  last_sync_at?: string;
  error_count: number;
  latency_ms: number;
  throughput: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateSyncStatusRequest {
  school_id: string;
  source_system: string;
  target_system: string;
  entity_type: string;
  status?: SyncStatus['status'];
  last_check_at?: string;
  last_sync_at?: string;
  error_count?: number;
  latency_ms?: number;
  throughput?: number;
  metadata?: Record<string, unknown>;
}

export interface UpdateSyncStatusRequest {
  status?: SyncStatus['status'];
  last_check_at?: string;
  last_sync_at?: string;
  error_count?: number;
  latency_ms?: number;
  throughput?: number;
  metadata?: Record<string, unknown>;
}

export class SyncStatusService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<SyncStatus | null> {
    const { data, error } = await this.supabase
      .from('gei2p_sync_statuses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching sync status', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as SyncStatus;
  }

  async listEntities(schoolId: string, filters?: { status?: string; entity_type?: string; source_system?: string; limit?: number; offset?: number }): Promise<SyncStatus[]> {
    let query = this.supabase
      .from('gei2p_sync_statuses')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.entity_type) query = query.eq('entity_type', filters.entity_type);
    if (filters?.source_system) query = query.eq('source_system', filters.source_system);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing sync statuses', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as SyncStatus[];
  }

  async createEntity(data: CreateSyncStatusRequest): Promise<SyncStatus | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_sync_statuses')
      .insert({
        school_id: data.school_id,
        source_system: data.source_system,
        target_system: data.target_system,
        entity_type: data.entity_type,
        status: data.status || 'healthy',
        last_check_at: data.last_check_at || new Date().toISOString(),
        last_sync_at: data.last_sync_at,
        error_count: data.error_count || 0,
        latency_ms: data.latency_ms || 0,
        throughput: data.throughput || 0,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating sync status', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Sync status created', { id: created.id }, 'gei2p');
    return created as SyncStatus;
  }

  async updateEntity(id: string, data: UpdateSyncStatusRequest): Promise<SyncStatus | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_sync_statuses')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating sync status', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Sync status updated', { id }, 'gei2p');
    return updated as SyncStatus;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_sync_statuses')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting sync status', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Sync status deleted', { id }, 'gei2p');
    return true;
  }
}
