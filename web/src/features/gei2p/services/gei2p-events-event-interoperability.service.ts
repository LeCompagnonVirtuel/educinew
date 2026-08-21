import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface EventInteroperability {
  id: string;
  school_id: string;
  event_type: string;
  source_system: string;
  target_system: string;
  payload: Record<string, unknown>;
  status: 'pending' | 'delivered' | 'failed' | 'retrying';
  retry_count: number;
  max_retries: number;
  delivered_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateEventInteroperabilityRequest {
  school_id: string;
  event_type: string;
  source_system: string;
  target_system: string;
  payload: Record<string, unknown>;
  status?: EventInteroperability['status'];
  retry_count?: number;
  max_retries?: number;
  delivered_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateEventInteroperabilityRequest {
  event_type?: string;
  payload?: Record<string, unknown>;
  status?: EventInteroperability['status'];
  retry_count?: number;
  delivered_at?: string;
  error_message?: string | null;
  metadata?: Record<string, unknown>;
}

export class EventInteroperabilityService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<EventInteroperability | null> {
    const { data, error } = await this.supabase
      .from('gei2p_event_interoperability')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching event interoperability', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as EventInteroperability;
  }

  async listEntities(schoolId: string, filters?: { status?: string; event_type?: string; source_system?: string; limit?: number; offset?: number }): Promise<EventInteroperability[]> {
    let query = this.supabase
      .from('gei2p_event_interoperability')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.event_type) query = query.eq('event_type', filters.event_type);
    if (filters?.source_system) query = query.eq('source_system', filters.source_system);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing event interoperability', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as EventInteroperability[];
  }

  async createEntity(data: CreateEventInteroperabilityRequest): Promise<EventInteroperability | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_event_interoperability')
      .insert({
        school_id: data.school_id,
        event_type: data.event_type,
        source_system: data.source_system,
        target_system: data.target_system,
        payload: data.payload,
        status: data.status || 'pending',
        retry_count: data.retry_count || 0,
        max_retries: data.max_retries || 3,
        delivered_at: data.delivered_at,
        error_message: data.error_message,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating event interoperability', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Event interoperability created', { id: created.id }, 'gei2p');
    return created as EventInteroperability;
  }

  async updateEntity(id: string, data: UpdateEventInteroperabilityRequest): Promise<EventInteroperability | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_event_interoperability')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating event interoperability', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Event interoperability updated', { id }, 'gei2p');
    return updated as EventInteroperability;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_event_interoperability')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting event interoperability', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Event interoperability deleted', { id }, 'gei2p');
    return true;
  }
}
