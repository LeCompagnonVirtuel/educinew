import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface Synchronization {
  id: string;
  school_id: string;
  source_system: string;
  target_system: string;
  entity_type: string;
  entity_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'conflict';
  direction: 'push' | 'pull' | 'bidirectional';
  last_sync_at?: string;
  next_sync_at?: string;
  error_message?: string;
  sync_data?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateSynchronizationRequest {
  school_id: string;
  source_system: string;
  target_system: string;
  entity_type: string;
  entity_id: string;
  status?: Synchronization['status'];
  direction: Synchronization['direction'];
  last_sync_at?: string;
  next_sync_at?: string;
  error_message?: string;
  sync_data?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateSynchronizationRequest {
  status?: Synchronization['status'];
  direction?: Synchronization['direction'];
  last_sync_at?: string;
  next_sync_at?: string | null;
  error_message?: string | null;
  sync_data?: Record<string, unknown> | null;
  metadata?: Record<string, unknown>;
}

export class SynchronizationService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<Synchronization | null> {
    const { data, error } = await this.supabase
      .from('gei2p_synchronizations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching synchronization', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as Synchronization;
  }

  async listEntities(schoolId: string, filters?: { status?: string; entity_type?: string; direction?: string; limit?: number; offset?: number }): Promise<Synchronization[]> {
    let query = this.supabase
      .from('gei2p_synchronizations')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.entity_type) query = query.eq('entity_type', filters.entity_type);
    if (filters?.direction) query = query.eq('direction', filters.direction);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing synchronizations', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as Synchronization[];
  }

  async createEntity(data: CreateSynchronizationRequest): Promise<Synchronization | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_synchronizations')
      .insert({
        school_id: data.school_id,
        source_system: data.source_system,
        target_system: data.target_system,
        entity_type: data.entity_type,
        entity_id: data.entity_id,
        status: data.status || 'pending',
        direction: data.direction,
        last_sync_at: data.last_sync_at,
        next_sync_at: data.next_sync_at,
        error_message: data.error_message,
        sync_data: data.sync_data,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating synchronization', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Synchronization created', { id: created.id }, 'gei2p');
    return created as Synchronization;
  }

  async updateEntity(id: string, data: UpdateSynchronizationRequest): Promise<Synchronization | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_synchronizations')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating synchronization', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Synchronization updated', { id }, 'gei2p');
    return updated as Synchronization;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_synchronizations')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting synchronization', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Synchronization deleted', { id }, 'gei2p');
    return true;
  }
}
