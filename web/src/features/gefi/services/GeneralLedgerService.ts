import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface GeneralLedgerEntry {
  id: string;
  school_id: string;
  account_code: string;
  account_name: string;
  account_type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  parent_account_id?: string;
  balance: number;
  currency: string;
  is_active: boolean;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateGeneralLedgerEntry {
  account_code: string;
  account_name: string;
  account_type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  parent_account_id?: string;
  balance?: number;
  currency?: string;
  is_active?: boolean;
  metadata?: Record<string, unknown>;
}

export interface UpdateGeneralLedgerEntry {
  account_name?: string;
  parent_account_id?: string;
  is_active?: boolean;
  metadata?: Record<string, unknown>;
}

export class GeneralLedgerService {
  private readonly TABLE = 'general_ledger';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<GeneralLedgerEntry[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('account_code', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<GeneralLedgerEntry | null> {
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

  async create(schoolId: string, entry: CreateGeneralLedgerEntry): Promise<GeneralLedgerEntry> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({ ...entry, school_id: schoolId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, entry: UpdateGeneralLedgerEntry): Promise<GeneralLedgerEntry> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...entry, updated_at: new Date().toISOString() })
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

  async getByType(schoolId: string, accountType: string): Promise<GeneralLedgerEntry[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('account_type', accountType)
      .is('deleted_at', null)
      .order('account_code');

    if (error) throw error;
    return data || [];
  }

  async getBalanceSheet(schoolId: string): Promise<{
    assets: GeneralLedgerEntry[];
    liabilities: GeneralLedgerEntry[];
    equity: GeneralLedgerEntry[];
  }> {
    const [assets, liabilities, equity] = await Promise.all([
      this.getByType(schoolId, 'asset'),
      this.getByType(schoolId, 'liability'),
      this.getByType(schoolId, 'equity'),
    ]);
    return { assets, liabilities, equity };
  }

  async getTrialBalance(schoolId: string): Promise<{ account_code: string; account_name: string; debit: number; credit: number }[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('account_code, account_name, balance, account_type')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('account_code');

    if (error) throw error;
    return (data || []).map((item) => ({
      account_code: item.account_code,
      account_name: item.account_name,
      debit: item.account_type === 'asset' || item.account_type === 'expense' ? item.balance : 0,
      credit: item.account_type === 'liability' || item.account_type === 'equity' || item.account_type === 'revenue' ? item.balance : 0,
    }));
  }
}
