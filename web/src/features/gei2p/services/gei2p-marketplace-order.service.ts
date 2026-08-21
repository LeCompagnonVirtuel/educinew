import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface Order {
  id: string;
  school_id: string;
  listing_id: string;
  buyer_school_id: string;
  seller_school_id: string;
  quantity: number;
  total_price: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded';
  ordered_at: string;
  completed_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderRequest {
  school_id: string;
  listing_id: string;
  buyer_school_id: string;
  seller_school_id: string;
  quantity: number;
  total_price: number;
  currency: string;
  status?: Order['status'];
  ordered_at?: string;
  completed_at?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateOrderRequest {
  quantity?: number;
  total_price?: number;
  status?: Order['status'];
  completed_at?: string;
  metadata?: Record<string, unknown>;
}

export class OrderService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<Order | null> {
    const { data, error } = await this.supabase
      .from('gei2p_orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching order', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as Order;
  }

  async listEntities(schoolId: string, filters?: { status?: string; buyer_school_id?: string; seller_school_id?: string; limit?: number; offset?: number }): Promise<Order[]> {
    let query = this.supabase
      .from('gei2p_orders')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.buyer_school_id) query = query.eq('buyer_school_id', filters.buyer_school_id);
    if (filters?.seller_school_id) query = query.eq('seller_school_id', filters.seller_school_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing orders', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as Order[];
  }

  async createEntity(data: CreateOrderRequest): Promise<Order | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_orders')
      .insert({
        school_id: data.school_id,
        listing_id: data.listing_id,
        buyer_school_id: data.buyer_school_id,
        seller_school_id: data.seller_school_id,
        quantity: data.quantity,
        total_price: data.total_price,
        currency: data.currency,
        status: data.status || 'pending',
        ordered_at: data.ordered_at || new Date().toISOString(),
        completed_at: data.completed_at,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating order', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Order created', { id: created.id }, 'gei2p');
    return created as Order;
  }

  async updateEntity(id: string, data: UpdateOrderRequest): Promise<Order | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_orders')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating order', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Order updated', { id }, 'gei2p');
    return updated as Order;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_orders')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting order', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Order deleted', { id }, 'gei2p');
    return true;
  }
}
