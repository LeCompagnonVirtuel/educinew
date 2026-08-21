import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface ConflictResolution {
  id: string;
  school_id: string;
  synchronization_id: string;
  conflict_type: 'data_mismatch' | 'version_conflict' | 'constraint_violation' | 'concurrent_edit';
  source_data: Record<string, unknown>;
  target_data: Record<string, unknown>;
  resolution_strategy: 'source_wins' | 'target_wins' | 'merge' | 'manual' | 'newest_wins';
  resolved_data?: Record<string, unknown>;
  status: 'pending' | 'in_progress' | 'resolved' | 'escalated';
  resolved_by?: string;
  resolved_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateConflictResolutionRequest {
  school_id: string;
  synchronization_id: string;
  conflict_type: ConflictResolution['conflict_type'];
  source_data: Record<string, unknown>;
  target_data: Record<string, unknown>;
  resolution_strategy: ConflictResolution['resolution_strategy'];
  resolved_data?: Record<string, unknown>;
  status?: ConflictResolution['status'];
  resolved_by?: string;
  resolved_at?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateConflictResolutionRequest {
  resolution_strategy?: ConflictResolution['resolution_strategy'];
  resolved_data?: Record<string, unknown>;
  status?: ConflictResolution['status'];
  resolved_by?: string;
  resolved_at?: string;
  metadata?: Record<string, unknown>;
}

export class ConflictResolutionService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<ConflictResolution | null> {
    const { data, error } = await this.supabase
      .from('gei2p_conflict_resolutions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching conflict resolution', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as ConflictResolution;
  }

  async listEntities(schoolId: string, filters?: { status?: string; conflict_type?: string; synchronization_id?: string; limit?: number; offset?: number }): Promise<ConflictResolution[]> {
    let query = this.supabase
      .from('gei2p_conflict_resolutions')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.conflict_type) query = query.eq('conflict_type', filters.conflict_type);
    if (filters?.synchronization_id) query = query.eq('synchronization_id', filters.synchronization_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing conflict resolutions', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as ConflictResolution[];
  }

  async createEntity(data: CreateConflictResolutionRequest): Promise<ConflictResolution | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_conflict_resolutions')
      .insert({
        school_id: data.school_id,
        synchronization_id: data.synchronization_id,
        conflict_type: data.conflict_type,
        source_data: data.source_data,
        target_data: data.target_data,
        resolution_strategy: data.resolution_strategy,
        resolved_data: data.resolved_data,
        status: data.status || 'pending',
        resolved_by: data.resolved_by,
        resolved_at: data.resolved_at,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating conflict resolution', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Conflict resolution created', { id: created.id }, 'gei2p');
    return created as ConflictResolution;
  }

  async updateEntity(id: string, data: UpdateConflictResolutionRequest): Promise<ConflictResolution | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_conflict_resolutions')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating conflict resolution', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Conflict resolution updated', { id }, 'gei2p');
    return updated as ConflictResolution;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_conflict_resolutions')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting conflict resolution', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Conflict resolution deleted', { id }, 'gei2p');
    return true;
  }
}
