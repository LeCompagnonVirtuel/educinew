import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface FinancialDataProduct {
  id: string;
  school_id: string;
  product_code: string;
  name: string;
  description: string;
  domain: 'payments' | 'budgets' | 'loans' | 'scholarships' | 'investments' | 'compliance' | 'analytics';
  data_sources: string[];
  schema: Record<string, unknown>;
  refresh_frequency: 'real_time' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  last_refreshed_at?: string;
  status: 'active' | 'inactive' | 'refreshing' | 'error';
  quality_score: number;
  access_level: 'public' | 'internal' | 'restricted' | 'confidential';
  consumers: string[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface DataQualityRule {
  id: string;
  product_id: string;
  rule_name: string;
  rule_type: 'completeness' | 'accuracy' | 'consistency' | 'timeliness' | 'validity';
  condition: string;
  threshold: number;
  is_active: boolean;
  school_id: string;
  created_at: string;
}

export interface DataProductStats {
  total_products: number;
  active_products: number;
  average_quality_score: number;
  last_refreshed: string | null;
  total_consumers: number;
}

export interface CreateFinancialDataProduct {
  name: string;
  description: string;
  domain: 'payments' | 'budgets' | 'loans' | 'scholarships' | 'investments' | 'compliance' | 'analytics';
  data_sources: string[];
  schema: Record<string, unknown>;
  refresh_frequency: 'real_time' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  access_level: 'public' | 'internal' | 'restricted' | 'confidential';
  metadata?: Record<string, unknown>;
}

export interface UpdateFinancialDataProduct {
  name?: string;
  description?: string;
  data_sources?: string[];
  schema?: Record<string, unknown>;
  refresh_frequency?: string;
  status?: string;
  quality_score?: number;
  access_level?: string;
  consumers?: string[];
  metadata?: Record<string, unknown>;
}

export class FinancialDataProductService {
  private readonly TABLE = 'financial_data_products';
  private readonly QUALITY_TABLE = 'data_quality_rules';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<FinancialDataProduct[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<FinancialDataProduct | null> {
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

  async create(schoolId: string, product: CreateFinancialDataProduct): Promise<FinancialDataProduct> {
    const productCode = `DP-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        product_code: productCode,
        ...product,
        status: 'active',
        quality_score: 0,
        consumers: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, product: UpdateFinancialDataProduct): Promise<FinancialDataProduct> {
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

  async refresh(schoolId: string, id: string): Promise<FinancialDataProduct> {
    return this.update(schoolId, id, {
      status: 'refreshing',
      last_refreshed_at: new Date().toISOString(),
    });
  }

  async completeRefresh(schoolId: string, id: string, qualityScore: number): Promise<FinancialDataProduct> {
    return this.update(schoolId, id, {
      status: 'active',
      quality_score: qualityScore,
      last_refreshed_at: new Date().toISOString(),
    });
  }

  async addConsumer(schoolId: string, id: string, consumer: string): Promise<FinancialDataProduct> {
    const product = await this.getById(schoolId, id);
    if (!product) throw new Error('Product not found');

    return this.update(schoolId, id, {
      consumers: [...product.consumers, consumer],
    });
  }

  async removeConsumer(schoolId: string, id: string, consumer: string): Promise<FinancialDataProduct> {
    const product = await this.getById(schoolId, id);
    if (!product) throw new Error('Product not found');

    return this.update(schoolId, id, {
      consumers: product.consumers.filter((c) => c !== consumer),
    });
  }

  async getByDomain(schoolId: string, domain: string): Promise<FinancialDataProduct[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('domain', domain)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<FinancialDataProduct[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async createQualityRule(schoolId: string, productId: string, rule: Omit<DataQualityRule, 'id' | 'product_id' | 'school_id' | 'created_at'>): Promise<DataQualityRule> {
    const { data, error } = await this.supabase
      .from(this.QUALITY_TABLE)
      .insert({ ...rule, product_id: productId, school_id: schoolId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getQualityRules(schoolId: string, productId: string): Promise<DataQualityRule[]> {
    const { data, error } = await this.supabase
      .from(this.QUALITY_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('product_id', productId);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<DataProductStats> {
    const products = await this.getAll(schoolId);
    const activeProducts = products.filter((p) => p.status === 'active');
    const lastRefreshed = products.reduce((latest, p) => {
      if (!p.last_refreshed_at) return latest;
      if (!latest) return p.last_refreshed_at;
      return new Date(p.last_refreshed_at) > new Date(latest) ? p.last_refreshed_at : latest;
    }, null as string | null);

    return {
      total_products: products.length,
      active_products: activeProducts.length,
      average_quality_score: activeProducts.length > 0
        ? activeProducts.reduce((sum, p) => sum + p.quality_score, 0) / activeProducts.length
        : 0,
      last_refreshed: lastRefreshed,
      total_consumers: products.reduce((sum, p) => sum + p.consumers.length, 0),
    };
  }
}
