import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface Transaction {
  id: string;
  school_id: string;
  transaction_number: string;
  transaction_type: 'payment' | 'receipt' | 'transfer' | 'adjustment' | 'refund';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  reference_type: string;
  reference_id: string;
  payment_method?: string;
  payment_provider?: string;
  external_reference?: string;
  description: string;
  initiated_by: string;
  completed_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateTransaction {
  transaction_type: 'payment' | 'receipt' | 'transfer' | 'adjustment' | 'refund';
  amount: number;
  currency?: string;
  reference_type: string;
  reference_id: string;
  payment_method?: string;
  payment_provider?: string;
  external_reference?: string;
  description: string;
  initiated_by: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateTransaction {
  status?: 'pending' | 'completed' | 'failed' | 'cancelled';
  external_reference?: string;
  completed_at?: string;
  metadata?: Record<string, unknown>;
}

export class TransactionService {
  private readonly TABLE = 'transactions';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<Transaction[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<Transaction | null> {
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

  async create(schoolId: string, transaction: CreateTransaction): Promise<Transaction> {
    const transactionNumber = `TXN-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...transaction,
        transaction_number: transactionNumber,
        currency: transaction.currency || 'XOF',
        status: 'pending',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, transaction: UpdateTransaction): Promise<Transaction> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...transaction, updated_at: new Date().toISOString() })
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

  async complete(schoolId: string, id: string): Promise<Transaction> {
    return this.update(schoolId, id, {
      status: 'completed',
      completed_at: new Date().toISOString(),
    });
  }

  async cancel(schoolId: string, id: string): Promise<Transaction> {
    return this.update(schoolId, id, { status: 'cancelled' });
  }

  async getByStatus(schoolId: string, status: string): Promise<Transaction[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, type: string): Promise<Transaction[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('transaction_type', type)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByDateRange(schoolId: string, startDate: string, endDate: string): Promise<Transaction[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getTotalByType(schoolId: string, type: string, startDate: string, endDate: string): Promise<number> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('amount')
      .eq('school_id', schoolId)
      .eq('transaction_type', type)
      .eq('status', 'completed')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .is('deleted_at', null);

    if (error) throw error;
    return (data || []).reduce((sum, t) => sum + t.amount, 0);
  }
}
