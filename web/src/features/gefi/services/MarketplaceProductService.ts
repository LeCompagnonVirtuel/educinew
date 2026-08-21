import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface MarketplaceProduct {
  id: string;
  school_id: string;
  product_code: string;
  provider_id: string;
  name: string;
  description: string;
  category: 'financial_service' | 'educational_tool' | 'software' | 'hardware' | 'training' | 'consulting' | 'other';
  price: number;
  currency: string;
  pricing_model: 'one_time' | 'subscription' | 'usage_based' | 'tiered';
  features: string[];
  specifications: Record<string, unknown>;
  images: string[];
  rating: number;
  review_count: number;
  total_sales: number;
  is_active: boolean;
  is_featured: boolean;
  tags: string[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateMarketplaceProduct {
  provider_id: string;
  name: string;
  description: string;
  category: 'financial_service' | 'educational_tool' | 'software' | 'hardware' | 'training' | 'consulting' | 'other';
  price: number;
  currency?: string;
  pricing_model: 'one_time' | 'subscription' | 'usage_based' | 'tiered';
  features: string[];
  specifications: Record<string, unknown>;
  images?: string[];
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateMarketplaceProduct {
  name?: string;
  description?: string;
  price?: number;
  features?: string[];
  specifications?: Record<string, unknown>;
  images?: string[];
  is_active?: boolean;
  is_featured?: boolean;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export class MarketplaceProductService {
  private readonly TABLE = 'marketplace_products';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<MarketplaceProduct[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<MarketplaceProduct | null> {
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

  async create(schoolId: string, product: CreateMarketplaceProduct): Promise<MarketplaceProduct> {
    const productCode = `MPROD-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        product_code: productCode,
        ...product,
        currency: product.currency || 'XOF',
        rating: 0,
        review_count: 0,
        total_sales: 0,
        is_active: true,
        is_featured: false,
        images: product.images || [],
        tags: product.tags || [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, product: UpdateMarketplaceProduct): Promise<MarketplaceProduct> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...product, updated_at: new Date().toISOString() })
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

  async feature(schoolId: string, id: string): Promise<MarketplaceProduct> {
    return this.update(schoolId, id, { is_featured: true });
  }

  async unfeature(schoolId: string, id: string): Promise<MarketplaceProduct> {
    return this.update(schoolId, id, { is_featured: false });
  }

  async deactivate(schoolId: string, id: string): Promise<MarketplaceProduct> {
    return this.update(schoolId, id, { is_active: false });
  }

  async activate(schoolId: string, id: string): Promise<MarketplaceProduct> {
    return this.update(schoolId, id, { is_active: true });
  }

  async getByProvider(schoolId: string, providerId: string): Promise<MarketplaceProduct[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('provider_id', providerId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByCategory(schoolId: string, category: string): Promise<MarketplaceProduct[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<MarketplaceProduct[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_active', true)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getFeatured(schoolId: string): Promise<MarketplaceProduct[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_featured', true)
      .eq('is_active', true)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async search(schoolId: string, query: string): Promise<MarketplaceProduct[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getTopRated(schoolId: string, limit: number): Promise<MarketplaceProduct[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  async getTopSelling(schoolId: string, limit: number): Promise<MarketplaceProduct[]> {
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

  async getStats(schoolId: string): Promise<{ total: number; active: number; featured: number; averageRating: number; totalSales: number }> {
    const products = await this.getAll(schoolId);
    return {
      total: products.length,
      active: products.filter((p) => p.is_active).length,
      featured: products.filter((p) => p.is_featured).length,
      averageRating: products.length > 0
        ? products.reduce((sum, p) => sum + p.rating, 0) / products.length
        : 0,
      totalSales: products.reduce((sum, p) => sum + p.total_sales, 0),
    };
  }
}
