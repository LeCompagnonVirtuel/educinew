import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface InsuranceProduct {
  id: string;
  school_id: string;
  product_code: string;
  name: string;
  description: string;
  type: 'health' | 'life' | 'property' | 'liability' | 'vehicle' | 'other';
  provider: string;
  premium_amount: number;
  premium_frequency: 'monthly' | 'quarterly' | 'annual';
  coverage_amount: number;
  currency: string;
  deductible: number;
  coverage_details: Record<string, unknown>;
  exclusions: string[];
  is_active: boolean;
  min_age?: number;
  max_age?: number;
  waiting_period_days?: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateInsuranceProduct {
  name: string;
  description: string;
  type: 'health' | 'life' | 'property' | 'liability' | 'vehicle' | 'other';
  provider: string;
  premium_amount: number;
  premium_frequency: 'monthly' | 'quarterly' | 'annual';
  coverage_amount: number;
  currency?: string;
  deductible: number;
  coverage_details: Record<string, unknown>;
  exclusions: string[];
  min_age?: number;
  max_age?: number;
  waiting_period_days?: number;
  metadata?: Record<string, unknown>;
}

export interface UpdateInsuranceProduct {
  name?: string;
  description?: string;
  premium_amount?: number;
  coverage_amount?: number;
  deductible?: number;
  coverage_details?: Record<string, unknown>;
  exclusions?: string[];
  is_active?: boolean;
  metadata?: Record<string, unknown>;
}

export class InsuranceProductService {
  private readonly TABLE = 'insurance_products';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<InsuranceProduct[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<InsuranceProduct | null> {
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

  async create(schoolId: string, product: CreateInsuranceProduct): Promise<InsuranceProduct> {
    const productCode = `INS-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        product_code: productCode,
        ...product,
        currency: product.currency || 'XOF',
        is_active: true,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, product: UpdateInsuranceProduct): Promise<InsuranceProduct> {
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

  async getActive(schoolId: string): Promise<InsuranceProduct[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_active', true)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, type: string): Promise<InsuranceProduct[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByProvider(schoolId: string, provider: string): Promise<InsuranceProduct[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('provider', provider)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async calculateAnnualPremium(schoolId: string, id: string): Promise<number> {
    const product = await this.getById(schoolId, id);
    if (!product) throw new Error('Product not found');

    switch (product.premium_frequency) {
      case 'monthly':
        return product.premium_amount * 12;
      case 'quarterly':
        return product.premium_amount * 4;
      case 'annual':
        return product.premium_amount;
      default:
        return product.premium_amount;
    }
  }

  async compareProducts(schoolId: string, productIds: string[]): Promise<InsuranceProduct[]> {
    const products: InsuranceProduct[] = [];
    for (const id of productIds) {
      const product = await this.getById(schoolId, id);
      if (product) products.push(product);
    }
    return products;
  }
}
