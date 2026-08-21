import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface EventHistory {
  id: string;
  school_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  source: string;
  status: 'success' | 'failed' | 'partial';
  duration_ms: number;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface CreateEventHistoryRequest {
  school_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  source: string;
  status: EventHistory['status'];
  duration_ms: number;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateEventHistoryRequest {
  status?: EventHistory['status'];
  duration_ms?: number;
  error_message?: string | null;
  metadata?: Record<string, unknown>;
}

export class EventHistoryService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<EventHistory | null> {
    const { data, error } = await this.supabase
      .from('gei2p_event_histories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching event history', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as EventHistory;
  }

  async listEntities(schoolId: string, filters?: { event_type?: string; status?: string; source?: string; limit?: number; offset?: number }): Promise<EventHistory[]> {
    let query = this.supabase
      .from('gei2p_event_histories')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.event_type) query = query.eq('event_type', filters.event_type);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.source) query = query.eq('source', filters.source);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing event histories', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as EventHistory[];
  }

  async createEntity(data: CreateEventHistoryRequest): Promise<EventHistory | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_event_histories')
      .insert({
        school_id: data.school_id,
        event_type: data.event_type,
        payload: data.payload,
        source: data.source,
        status: data.status,
        duration_ms: data.duration_ms,
        error_message: data.error_message,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating event history', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Event history created', { id: created.id }, 'gei2p');
    return created as EventHistory;
  }

  async updateEntity(id: string, data: UpdateEventHistoryRequest): Promise<EventHistory | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_event_histories')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating event history', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Event history updated', { id }, 'gei2p');
    return updated as EventHistory;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_event_histories')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting event history', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Event history deleted', { id }, 'gei2p');
    return true;
  }
}
