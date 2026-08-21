import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface EventFilter {
  id: string;
  school_id: string;
  name: string;
  event_type: string;
  conditions: Record<string, unknown>;
  action: 'allow' | 'block' | 'transform' | 'route';
  priority: number;
  status: 'active' | 'inactive';
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateEventFilterRequest {
  school_id: string;
  name: string;
  event_type: string;
  conditions: Record<string, unknown>;
  action: EventFilter['action'];
  priority?: number;
  status?: EventFilter['status'];
  metadata?: Record<string, unknown>;
}

export interface UpdateEventFilterRequest {
  name?: string;
  event_type?: string;
  conditions?: Record<string, unknown>;
  action?: EventFilter['action'];
  priority?: number;
  status?: EventFilter['status'];
  metadata?: Record<string, unknown>;
}

export class EventFilterService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<EventFilter | null> {
    const { data, error } = await this.supabase
      .from('gei2p_event_filters')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching event filter', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as EventFilter;
  }

  async listEntities(schoolId: string, filters?: { status?: string; event_type?: string; action?: string; limit?: number; offset?: number }): Promise<EventFilter[]> {
    let query = this.supabase
      .from('gei2p_event_filters')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.event_type) query = query.eq('event_type', filters.event_type);
    if (filters?.action) query = query.eq('action', filters.action);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('priority', { ascending: true });

    if (error) {
      logger.error('Error listing event filters', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as EventFilter[];
  }

  async createEntity(data: CreateEventFilterRequest): Promise<EventFilter | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_event_filters')
      .insert({
        school_id: data.school_id,
        name: data.name,
        event_type: data.event_type,
        conditions: data.conditions,
        action: data.action,
        priority: data.priority || 0,
        status: data.status || 'active',
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating event filter', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Event filter created', { id: created.id }, 'gei2p');
    return created as EventFilter;
  }

  async updateEntity(id: string, data: UpdateEventFilterRequest): Promise<EventFilter | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_event_filters')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating event filter', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Event filter updated', { id }, 'gei2p');
    return updated as EventFilter;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_event_filters')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting event filter', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Event filter deleted', { id }, 'gei2p');
    return true;
  }
}
