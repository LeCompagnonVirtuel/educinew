import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface Currency {
  id: string;
  school_id: string;
  code: string;
  name: string;
  symbol: string;
  decimal_places: number;
  is_default: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateCurrency {
  code: string;
  name: string;
  symbol: string;
  decimal_places?: number;
  is_default?: boolean;
  is_active?: boolean;
}

export interface UpdateCurrency {
  name?: string;
  symbol?: string;
  decimal_places?: number;
  is_default?: boolean;
  is_active?: boolean;
}

export class CurrencyService {
  private readonly TABLE = 'currencies';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<Currency[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('is_default', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<Currency | null> {
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

  async getDefault(schoolId: string): Promise<Currency | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_default', true)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async create(schoolId: string, currency: CreateCurrency): Promise<Currency> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({ ...currency, decimal_places: currency.decimal_places ?? 0, school_id: schoolId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, currency: UpdateCurrency): Promise<Currency> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...currency, updated_at: new Date().toISOString() })
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

  async setDefault(schoolId: string, id: string): Promise<void> {
    await this.supabase
      .from(this.TABLE)
      .update({ is_default: false })
      .eq('school_id', schoolId)
      .eq('is_default', true);

    await this.update(schoolId, id, { is_default: true });
  }
}
