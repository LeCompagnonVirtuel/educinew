import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface EventSubscription {
  id: string;
  school_id: string;
  subscriber_id: string;
  event_type: string;
  callback_url: string;
  status: 'active' | 'inactive' | 'error';
  filter_config?: Record<string, unknown>;
  last_triggered_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateEventSubscriptionRequest {
  school_id: string;
  subscriber_id: string;
  event_type: string;
  callback_url: string;
  status?: EventSubscription['status'];
  filter_config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateEventSubscriptionRequest {
  event_type?: string;
  callback_url?: string;
  status?: EventSubscription['status'];
  filter_config?: Record<string, unknown>;
  last_triggered_at?: string;
  error_message?: string | null;
  metadata?: Record<string, unknown>;
}

export class EventSubscriptionService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<EventSubscription | null> {
    const { data, error } = await this.supabase
      .from('gei2p_event_subscriptions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching event subscription', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as EventSubscription;
  }

  async listEntities(schoolId: string, filters?: { status?: string; event_type?: string; subscriber_id?: string; limit?: number; offset?: number }): Promise<EventSubscription[]> {
    let query = this.supabase
      .from('gei2p_event_subscriptions')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.event_type) query = query.eq('event_type', filters.event_type);
    if (filters?.subscriber_id) query = query.eq('subscriber_id', filters.subscriber_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing event subscriptions', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as EventSubscription[];
  }

  async createEntity(data: CreateEventSubscriptionRequest): Promise<EventSubscription | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_event_subscriptions')
      .insert({
        school_id: data.school_id,
        subscriber_id: data.subscriber_id,
        event_type: data.event_type,
        callback_url: data.callback_url,
        status: data.status || 'active',
        filter_config: data.filter_config,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating event subscription', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Event subscription created', { id: created.id }, 'gei2p');
    return created as EventSubscription;
  }

  async updateEntity(id: string, data: UpdateEventSubscriptionRequest): Promise<EventSubscription | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_event_subscriptions')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating event subscription', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Event subscription updated', { id }, 'gei2p');
    return updated as EventSubscription;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_event_subscriptions')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting event subscription', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Event subscription deleted', { id }, 'gei2p');
    return true;
  }
}
