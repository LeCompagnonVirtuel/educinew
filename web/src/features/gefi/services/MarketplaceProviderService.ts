import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface MarketplaceProvider {
  id: string;
  school_id: string;
  provider_code: string;
  name: string;
  description: string;
  type: 'financial' | 'educational' | 'technology' | 'logistics' | 'other';
  logo_url?: string;
  website?: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  country: string;
  rating: number;
  review_count: number;
  total_sales: number;
  is_verified: boolean;
  is_active: boolean;
  commission_rate: number;
  payout_schedule: 'weekly' | 'biweekly' | 'monthly';
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateMarketplaceProvider {
  name: string;
  description: string;
  type: 'financial' | 'educational' | 'technology' | 'logistics' | 'other';
  logo_url?: string;
  website?: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  country: string;
  commission_rate: number;
  payout_schedule: 'weekly' | 'biweekly' | 'monthly';
  metadata?: Record<string, unknown>;
}

export interface UpdateMarketplaceProvider {
  name?: string;
  description?: string;
  logo_url?: string;
  website?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  is_active?: boolean;
  commission_rate?: number;
  payout_schedule?: string;
  metadata?: Record<string, unknown>;
}

export class MarketplaceProviderService {
  private readonly TABLE = 'marketplace_providers';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<MarketplaceProvider[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('rating', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<MarketplaceProvider | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async create(schoolId: string, provider: CreateMarketplaceProvider): Promise<MarketplaceProvider> {
    const providerCode = `MP-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        provider_code: providerCode,
        ...provider,
        rating: 0,
        review_count: 0,
        total_sales: 0,
        is_verified: false,
        is_active: true,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, provider: UpdateMarketplaceProvider): Promise<MarketplaceProvider> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...provider, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async verify(schoolId: string, id: string): Promise<MarketplaceProvider> {
    return this.update(schoolId, id, { is_verified: true });
  }

  async deactivate(schoolId: string, id: string): Promise<MarketplaceProvider> {
    return this.update(schoolId, id, { is_active: false });
  }

  async activate(schoolId: string, id: string): Promise<MarketplaceProvider> {
    return this.update(schoolId, id, { is_active: true });
  }

  async updateRating(schoolId: string, id: string, rating: number): Promise<MarketplaceProvider> {
    const provider = await this.getById(schoolId, id);
    if (!provider) throw new Error('Provider not found');

    const newRating = ((provider.rating * provider.review_count) + rating) / (provider.review_count + 1);

    return this.update(schoolId, id, {
      rating: Math.round(newRating * 10) / 10,
      review_count: provider.review_count + 1,
    });
  }

  async getByType(schoolId: string, type: string): Promise<MarketplaceProvider[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<MarketplaceProvider[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_active', true)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getVerified(schoolId: string): Promise<MarketplaceProvider[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_verified', true)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async search(schoolId: string, query: string): Promise<MarketplaceProvider[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getTopProviders(schoolId: string, limit: number): Promise<MarketplaceProvider[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('total_sales', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{ total: number; active: number; verified: number; averageRating: number }> {
    const providers = await this.getAll(schoolId);
    return {
      total: providers.length,
      active: providers.filter((p) => p.is_active).length,
      verified: providers.filter((p) => p.is_verified).length,
      averageRating: providers.length > 0
        ? providers.reduce((sum, p) => sum + p.rating, 0) / providers.length
        : 0,
    };
  }
}
