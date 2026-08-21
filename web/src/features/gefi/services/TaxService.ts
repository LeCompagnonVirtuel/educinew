import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface TaxRate {
  id: string;
  school_id: string;
  code: string;
  name: string;
  rate: number;
  type: 'percentage' | 'fixed';
  applies_to: string[];
  is_active: boolean;
  effective_from: string;
  effective_to?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface TaxCalculation {
  tax_rate_id: string;
  tax_rate_name: string;
  rate: number;
  taxable_amount: number;
  tax_amount: number;
}

export interface CreateTaxRate {
  code: string;
  name: string;
  rate: number;
  type: 'percentage' | 'fixed';
  applies_to: string[];
  is_active?: boolean;
  effective_from: string;
  effective_to?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateTaxRate {
  name?: string;
  rate?: number;
  applies_to?: string[];
  is_active?: boolean;
  effective_to?: string;
  metadata?: Record<string, unknown>;
}

export class TaxService {
  private readonly TABLE = 'tax_rates';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<TaxRate[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('code');

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<TaxRate | null> {
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

  async create(schoolId: string, taxRate: CreateTaxRate): Promise<TaxRate> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({ ...taxRate, is_active: taxRate.is_active ?? true, school_id: schoolId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, taxRate: UpdateTaxRate): Promise<TaxRate> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...taxRate, updated_at: new Date().toISOString() })
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

  async getActive(schoolId: string): Promise<TaxRate[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_active', true)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async calculateTax(schoolId: string, amount: number, category: string): Promise<TaxCalculation[]> {
    const activeTaxes = await this.getActive(schoolId);
    const applicableTaxes = activeTaxes.filter((t) => t.applies_to.includes(category));

    return applicableTaxes.map((tax) => {
      const taxableAmount = amount;
      const taxAmount = tax.type === 'percentage' ? (taxableAmount * tax.rate) / 100 : tax.rate;
      return {
        tax_rate_id: tax.id,
        tax_rate_name: tax.name,
        rate: tax.rate,
        taxable_amount: taxableAmount,
        tax_amount: taxAmount,
      };
    });
  }

  async getTotalTax(schoolId: string, amount: number, category: string): Promise<number> {
    const calculations = await this.calculateTax(schoolId, amount, category);
    return calculations.reduce((sum, c) => sum + c.tax_amount, 0);
  }
}
