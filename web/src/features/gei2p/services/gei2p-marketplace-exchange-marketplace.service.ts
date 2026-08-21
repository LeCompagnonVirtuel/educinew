import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface ExchangeMarketplace {
  id: string;
  school_id: string;
  name: string;
  description?: string;
  category: 'data' | 'credentials' | 'transcripts' | 'skills' | 'services' | 'integrations';
  price?: number;
  currency?: string;
  provider_school_id: string;
  status: 'active' | 'inactive' | 'pending_review';
  terms?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateExchangeMarketplaceRequest {
  school_id: string;
  name: string;
  description?: string;
  category: ExchangeMarketplace['category'];
  price?: number;
  currency?: string;
  provider_school_id: string;
  status?: ExchangeMarketplace['status'];
  terms?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateExchangeMarketplaceRequest {
  name?: string;
  description?: string | null;
  category?: ExchangeMarketplace['category'];
  price?: number;
  currency?: string;
  status?: ExchangeMarketplace['status'];
  terms?: Record<string, unknown> | null;
  metadata?: Record<string, unknown>;
}

export class ExchangeMarketplaceService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<ExchangeMarketplace | null> {
    const { data, error } = await this.supabase
      .from('gei2p_exchange_marketplaces')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching exchange marketplace', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as ExchangeMarketplace;
  }

  async listEntities(schoolId: string, filters?: { status?: string; category?: string; provider_school_id?: string; limit?: number; offset?: number }): Promise<ExchangeMarketplace[]> {
    let query = this.supabase
      .from('gei2p_exchange_marketplaces')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.provider_school_id) query = query.eq('provider_school_id', filters.provider_school_id);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing exchange marketplaces', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as ExchangeMarketplace[];
  }

  async createEntity(data: CreateExchangeMarketplaceRequest): Promise<ExchangeMarketplace | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_exchange_marketplaces')
      .insert({
        school_id: data.school_id,
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        currency: data.currency,
        provider_school_id: data.provider_school_id,
        status: data.status || 'active',
        terms: data.terms,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating exchange marketplace', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Exchange marketplace created', { id: created.id }, 'gei2p');
    return created as ExchangeMarketplace;
  }

  async updateEntity(id: string, data: UpdateExchangeMarketplaceRequest): Promise<ExchangeMarketplace | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_exchange_marketplaces')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating exchange marketplace', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Exchange marketplace updated', { id }, 'gei2p');
    return updated as ExchangeMarketplace;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_exchange_marketplaces')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting exchange marketplace', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Exchange marketplace deleted', { id }, 'gei2p');
    return true;
  }
}
