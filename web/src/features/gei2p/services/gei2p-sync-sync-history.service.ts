import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface SyncHistory {
  id: string;
  school_id: string;
  synchronization_id: string;
  operation: 'create' | 'update' | 'delete' | 'full_sync';
  status: 'success' | 'failed' | 'partial';
  records_synced: number;
  duration_ms: number;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface CreateSyncHistoryRequest {
  school_id: string;
  synchronization_id: string;
  operation: SyncHistory['operation'];
  status: SyncHistory['status'];
  records_synced: number;
  duration_ms: number;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateSyncHistoryRequest {
  status?: SyncHistory['status'];
  records_synced?: number;
  duration_ms?: number;
  error_message?: string | null;
  metadata?: Record<string, unknown>;
}

export class SyncHistoryService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<SyncHistory | null> {
    const { data, error } = await this.supabase
      .from('gei2p_sync_histories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching sync history', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as SyncHistory;
  }

  async listEntities(schoolId: string, filters?: { synchronization_id?: string; status?: string; operation?: string; limit?: number; offset?: number }): Promise<SyncHistory[]> {
    let query = this.supabase
      .from('gei2p_sync_histories')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.synchronization_id) query = query.eq('synchronization_id', filters.synchronization_id);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.operation) query = query.eq('operation', filters.operation);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing sync histories', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as SyncHistory[];
  }

  async createEntity(data: CreateSyncHistoryRequest): Promise<SyncHistory | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_sync_histories')
      .insert({
        school_id: data.school_id,
        synchronization_id: data.synchronization_id,
        operation: data.operation,
        status: data.status,
        records_synced: data.records_synced,
        duration_ms: data.duration_ms,
        error_message: data.error_message,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating sync history', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Sync history created', { id: created.id }, 'gei2p');
    return created as SyncHistory;
  }

  async updateEntity(id: string, data: UpdateSyncHistoryRequest): Promise<SyncHistory | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_sync_histories')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating sync history', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Sync history updated', { id }, 'gei2p');
    return updated as SyncHistory;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_sync_histories')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting sync history', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Sync history deleted', { id }, 'gei2p');
    return true;
  }
}
