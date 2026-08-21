import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface MarketplacePayment {
  id: string;
  school_id: string;
  order_id: string;
  payer_school_id: string;
  payee_school_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  transaction_id?: string;
  paid_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateMarketplacePaymentRequest {
  school_id: string;
  order_id: string;
  payer_school_id: string;
  payee_school_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  status?: MarketplacePayment['status'];
  transaction_id?: string;
  paid_at?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateMarketplacePaymentRequest {
  amount?: number;
  currency?: string;
  payment_method?: string;
  status?: MarketplacePayment['status'];
  transaction_id?: string | null;
  paid_at?: string;
  metadata?: Record<string, unknown>;
}

export class MarketplacePaymentService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<MarketplacePayment | null> {
    const { data, error } = await this.supabase
      .from('gei2p_marketplace_payments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching marketplace payment', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as MarketplacePayment;
  }

  async listEntities(schoolId: string, filters?: { status?: string; order_id?: string; payer_school_id?: string; limit?: number; offset?: number }): Promise<MarketplacePayment[]> {
    let query = this.supabase
      .from('gei2p_marketplace_payments')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.order_id) query = query.eq('order_id', filters.order_id);
    if (filters?.payer_school_id) query = query.eq('payer_school_id', filters.payer_school_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing marketplace payments', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as MarketplacePayment[];
  }

  async createEntity(data: CreateMarketplacePaymentRequest): Promise<MarketplacePayment | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_marketplace_payments')
      .insert({
        school_id: data.school_id,
        order_id: data.order_id,
        payer_school_id: data.payer_school_id,
        payee_school_id: data.payee_school_id,
        amount: data.amount,
        currency: data.currency,
        payment_method: data.payment_method,
        status: data.status || 'pending',
        transaction_id: data.transaction_id,
        paid_at: data.paid_at,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating marketplace payment', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Marketplace payment created', { id: created.id }, 'gei2p');
    return created as MarketplacePayment;
  }

  async updateEntity(id: string, data: UpdateMarketplacePaymentRequest): Promise<MarketplacePayment | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_marketplace_payments')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating marketplace payment', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Marketplace payment updated', { id }, 'gei2p');
    return updated as MarketplacePayment;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_marketplace_payments')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting marketplace payment', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Marketplace payment deleted', { id }, 'gei2p');
    return true;
  }
}
