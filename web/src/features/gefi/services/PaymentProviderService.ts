import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface PaymentProvider {
  id: string;
  school_id: string;
  name: string;
  code: string;
  type: 'mobile_money' | 'bank_transfer' | 'card' | 'cash' | 'other';
  is_active: boolean;
  configuration: Record<string, unknown>;
  supported_currencies: string[];
  fees_percentage?: number;
  fees_fixed?: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreatePaymentProvider {
  name: string;
  code: string;
  type: 'mobile_money' | 'bank_transfer' | 'card' | 'cash' | 'other';
  is_active?: boolean;
  configuration: Record<string, unknown>;
  supported_currencies: string[];
  fees_percentage?: number;
  fees_fixed?: number;
  metadata?: Record<string, unknown>;
}

export interface UpdatePaymentProvider {
  name?: string;
  is_active?: boolean;
  configuration?: Record<string, unknown>;
  supported_currencies?: string[];
  fees_percentage?: number;
  fees_fixed?: number;
  metadata?: Record<string, unknown>;
}

export class PaymentProviderService {
  private readonly TABLE = 'payment_providers';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<PaymentProvider[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<PaymentProvider | null> {
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

  async create(schoolId: string, provider: CreatePaymentProvider): Promise<PaymentProvider> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({ ...provider, is_active: provider.is_active ?? true, school_id: schoolId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, provider: UpdatePaymentProvider): Promise<PaymentProvider> {
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

  async getActive(schoolId: string): Promise<PaymentProvider[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_active', true)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, type: string): Promise<PaymentProvider[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async calculateFees(schoolId: string, providerId: string, amount: number): Promise<number> {
    const provider = await this.getById(schoolId, providerId);
    if (!provider) throw new Error('Provider not found');

    const percentageFee = provider.fees_percentage ? (amount * provider.fees_percentage) / 100 : 0;
    const fixedFee = provider.fees_fixed || 0;
    return percentageFee + fixedFee;
  }
}
