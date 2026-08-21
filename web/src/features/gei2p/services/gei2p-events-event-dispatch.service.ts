import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface EventDispatch {
  id: string;
  school_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  source: string;
  target: string;
  status: 'pending' | 'dispatched' | 'delivered' | 'failed';
  dispatched_at?: string;
  delivered_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateEventDispatchRequest {
  school_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  source: string;
  target: string;
  status?: EventDispatch['status'];
  metadata?: Record<string, unknown>;
}

export interface UpdateEventDispatchRequest {
  event_type?: string;
  payload?: Record<string, unknown>;
  status?: EventDispatch['status'];
  dispatched_at?: string;
  delivered_at?: string;
  error_message?: string | null;
  metadata?: Record<string, unknown>;
}

export class EventDispatchService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<EventDispatch | null> {
    const { data, error } = await this.supabase
      .from('gei2p_event_dispatches')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching event dispatch', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as EventDispatch;
  }

  async listEntities(schoolId: string, filters?: { status?: string; event_type?: string; source?: string; limit?: number; offset?: number }): Promise<EventDispatch[]> {
    let query = this.supabase
      .from('gei2p_event_dispatches')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.event_type) query = query.eq('event_type', filters.event_type);
    if (filters?.source) query = query.eq('source', filters.source);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing event dispatches', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as EventDispatch[];
  }

  async createEntity(data: CreateEventDispatchRequest): Promise<EventDispatch | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_event_dispatches')
      .insert({
        school_id: data.school_id,
        event_type: data.event_type,
        payload: data.payload,
        source: data.source,
        target: data.target,
        status: data.status || 'pending',
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating event dispatch', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Event dispatch created', { id: created.id }, 'gei2p');
    return created as EventDispatch;
  }

  async updateEntity(id: string, data: UpdateEventDispatchRequest): Promise<EventDispatch | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_event_dispatches')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating event dispatch', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Event dispatch updated', { id }, 'gei2p');
    return updated as EventDispatch;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_event_dispatches')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting event dispatch', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Event dispatch deleted', { id }, 'gei2p');
    return true;
  }
}
