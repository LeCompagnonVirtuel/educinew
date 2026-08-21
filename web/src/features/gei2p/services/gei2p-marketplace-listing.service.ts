import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export interface Listing {
  id: string;
  school_id: string;
  marketplace_id: string;
  title: string;
  description?: string;
  listing_type: 'offer' | 'request';
  category: string;
  status: 'active' | 'inactive' | 'sold' | 'expired';
  price?: number;
  currency?: string;
  quantity: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateListingRequest {
  school_id: string;
  marketplace_id: string;
  title: string;
  description?: string;
  listing_type: Listing['listing_type'];
  category: string;
  status?: Listing['status'];
  price?: number;
  currency?: string;
  quantity?: number;
  metadata?: Record<string, unknown>;
}

export interface UpdateListingRequest {
  title?: string;
  description?: string | null;
  listing_type?: Listing['listing_type'];
  category?: string;
  status?: Listing['status'];
  price?: number;
  currency?: string;
  quantity?: number;
  metadata?: Record<string, unknown>;
}

export class ListingService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getEntity(id: string): Promise<Listing | null> {
    const { data, error } = await this.supabase
      .from('gei2p_listings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      logger.error('Error fetching listing', { id, error: error.message }, 'gei2p');
      return null;
    }

    return data as Listing;
  }

  async listEntities(schoolId: string, filters?: { status?: string; listing_type?: string; category?: string; limit?: number; offset?: number }): Promise<Listing[]> {
    let query = this.supabase
      .from('gei2p_listings')
      .select('*')
      .eq('school_id', schoolId);

    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.listing_type) query = query.eq('listing_type', filters.listing_type);
    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.limit) query = query.limit(filters.limit);
    if (filters?.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      logger.error('Error listing listings', { schoolId, error: error.message }, 'gei2p');
      return [];
    }

    return (data || []) as Listing[];
  }

  async createEntity(data: CreateListingRequest): Promise<Listing | null> {
    const { data: created, error } = await this.supabase
      .from('gei2p_listings')
      .insert({
        school_id: data.school_id,
        marketplace_id: data.marketplace_id,
        title: data.title,
        description: data.description,
        listing_type: data.listing_type,
        category: data.category,
        status: data.status || 'active',
        price: data.price,
        currency: data.currency,
        quantity: data.quantity || 1,
        metadata: data.metadata,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating listing', { error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Listing created', { id: created.id }, 'gei2p');
    return created as Listing;
  }

  async updateEntity(id: string, data: UpdateListingRequest): Promise<Listing | null> {
    const { data: updated, error } = await this.supabase
      .from('gei2p_listings')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating listing', { id, error: error.message }, 'gei2p');
      return null;
    }

    logger.info('Listing updated', { id }, 'gei2p');
    return updated as Listing;
  }

  async deleteEntity(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('gei2p_listings')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting listing', { id, error: error.message }, 'gei2p');
      return false;
    }

    logger.info('Listing deleted', { id }, 'gei2p');
    return true;
  }
}
