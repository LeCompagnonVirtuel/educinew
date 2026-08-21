import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface SyncQueue {
  id: string;
  school_id: string;
  entity_type: string;
  entity_id: string;
  operation: 'create' | 'update' | 'delete';
  payload: Record<string, unknown>;
  priority: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  attempts: number;
  max_attempts: number;
  scheduled_at: string;
  processed_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateSyncQueueRequest {
  school_id: string;
  entity_type: string;
  entity_id: string;
  operation: SyncQueue['operation'];
  payload: Record<string, unknown>;
  priority?: number;
  status?: SyncQueue['status'];
  max_attempts?: number;
  scheduled_at?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateSyncQueueRequest {
  priority?: number;
  status?: SyncQueue['status'];
  attempts?: number;
  scheduled_at?: string;
  processed_at?: string;
  error_message?: string | null;
  metadata?: Record<string, unknown>;
}

export class SyncQueueService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<SyncQueue | null> {
    const { data, error } = await this.supabase
      .from('gei2p_sync_queues')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching sync queue', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as SyncQueue;
  }

  async listEntities(schoolId: string, filters?: { status?: string; entity_type?: string; operation?: string; limit?: number; offset?: number }): Promise<SyncQueue[]> {
    let query = this.supabase
      .from('gei2p_sync_queues')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.entity_type) query = query.eq('entity_type', filters.entity_type);
    if (filters?.operation) query = query.eq('operation', filters.operation);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('priority', { ascending: false });

    if (error) {
      logger.error('Error listing sync queues', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as SyncQueue[];
  }

  async createEntity(data: CreateSyncQueueRequest): Promise<SyncQueue | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_sync_queues')
      .insert({
        school_id: data.school_id,
        entity_type: data.entity_type,
        entity_id: data.entity_id,
        operation: data.operation,
        payload: data.payload,
        priority: data.priority || 0,
        status: data.status || 'pending',
        attempts: 0,
        max_attempts: data.max_attempts || 3,
        scheduled_at: data.scheduled_at || new Date().toISOString(),
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating sync queue', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Sync queue created', { id: created.id }, 'gei2p');
    return created as SyncQueue;
  }

  async updateEntity(id: string, data: UpdateSyncQueueRequest): Promise<SyncQueue | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_sync_queues')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating sync queue', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Sync queue updated', { id }, 'gei2p');
    return updated as SyncQueue;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_sync_queues')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting sync queue', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Sync queue deleted', { id }, 'gei2p');
    return true;
  }
}
