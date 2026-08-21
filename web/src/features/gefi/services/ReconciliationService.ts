import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface ReconciliationRecord {
  id: string;
  school_id: string;
  reconciliation_number: string;
  account_id: string;
  period_start: string;
  period_end: string;
  book_balance: number;
  bank_balance: number;
  difference: number;
  status: 'pending' | 'in_progress' | 'completed' | 'discrepancy';
  reconciled_by?: string;
  reconciled_at?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ReconciliationItem {
  id: string;
  reconciliation_id: string;
  transaction_id: string;
  description: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'adjustment';
  is_matched: boolean;
  matched_item_id?: string;
  school_id: string;
  created_at: string;
}

export interface CreateReconciliationRecord {
  account_id: string;
  period_start: string;
  period_end: string;
  book_balance: number;
  bank_balance: number;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class ReconciliationService {
  private readonly TABLE = 'reconciliation_records';
  private readonly ITEMS_TABLE = 'reconciliation_items';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<ReconciliationRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<ReconciliationRecord | null> {
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

  async create(schoolId: string, record: CreateReconciliationRecord): Promise<ReconciliationRecord> {
    const reconNumber = `REC-${Date.now()}`;
    const difference = record.book_balance - record.bank_balance;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        reconciliation_number: reconNumber,
        ...record,
        difference,
        status: 'pending',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, updates: Partial<ReconciliationRecord>): Promise<ReconciliationRecord> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
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

  async complete(schoolId: string, id: string, reconciledBy: string): Promise<ReconciliationRecord> {
    return this.update(schoolId, id, {
      status: 'completed',
      reconciled_by: reconciledBy,
      reconciled_at: new Date().toISOString(),
    });
  }

  async getByStatus(schoolId: string, status: string): Promise<ReconciliationRecord[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getItems(schoolId: string, reconciliationId: string): Promise<ReconciliationItem[]> {
    const { data, error } = await this.supabase
      .from(this.ITEMS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('reconciliation_id', reconciliationId)
      .order('created_at');

    if (error) throw error;
    return data || [];
  }

  async matchItem(schoolId: string, itemId: string, matchedItemId: string): Promise<ReconciliationItem> {
    const { data, error } = await this.supabase
      .from(this.ITEMS_TABLE)
      .update({ is_matched: true, matched_item_id: matchedItemId })
      .eq('school_id', schoolId)
      .eq('id', itemId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getDiscrepancies(schoolId: string): Promise<ReconciliationRecord[]> {
    return this.getByStatus(schoolId, 'discrepancy');
  }
}
