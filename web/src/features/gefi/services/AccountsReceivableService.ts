import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface AccountsReceivable {
  id: string;
  school_id: string;
  invoice_number: string;
  student_id: string;
  fee_structure_id?: string;
  amount: number;
  tax_amount: number;
  total_amount: number;
  currency: string;
  status: 'pending' | 'partial' | 'paid' | 'overdue' | 'written_off';
  invoice_date: string;
  due_date: string;
  paid_date?: string;
  paid_amount: number;
  balance: number;
  payment_method?: string;
  payment_reference?: string;
  description: string;
  category: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateAccountsReceivable {
  student_id: string;
  fee_structure_id?: string;
  amount: number;
  tax_amount?: number;
  currency?: string;
  invoice_date: string;
  due_date: string;
  description: string;
  category: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateAccountsReceivable {
  status?: string;
  paid_date?: string;
  paid_amount?: number;
  balance?: number;
  payment_method?: string;
  payment_reference?: string;
  metadata?: Record<string, unknown>;
}

export class AccountsReceivableService {
  private readonly TABLE = 'accounts_receivable';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<AccountsReceivable[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<AccountsReceivable | null> {
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

  async create(schoolId: string, receivable: CreateAccountsReceivable): Promise<AccountsReceivable> {
    const invoiceNumber = `AR-${Date.now()}`;
    const totalAmount = receivable.amount + (receivable.tax_amount || 0);

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        invoice_number: invoiceNumber,
        ...receivable,
        tax_amount: receivable.tax_amount || 0,
        total_amount: totalAmount,
        currency: receivable.currency || 'XOF',
        status: 'pending',
        paid_amount: 0,
        balance: totalAmount,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, receivable: UpdateAccountsReceivable): Promise<AccountsReceivable> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...receivable, updated_at: new Date().toISOString() })
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

  async recordPayment(schoolId: string, id: string, amount: number, paymentMethod: string, paymentReference: string): Promise<AccountsReceivable> {
    const receivable = await this.getById(schoolId, id);
    if (!receivable) throw new Error('Receivable not found');

    const newPaidAmount = receivable.paid_amount + amount;
    const newBalance = receivable.total_amount - newPaidAmount;
    const newStatus = newBalance <= 0 ? 'paid' : 'partial';

    return this.update(schoolId, id, {
      paid_amount: newPaidAmount,
      balance: Math.max(0, newBalance),
      status: newStatus,
      paid_date: new Date().toISOString(),
      payment_method: paymentMethod,
      payment_reference: paymentReference,
    });
  }

  async getByStatus(schoolId: string, status: string): Promise<AccountsReceivable[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPending(schoolId: string): Promise<AccountsReceivable[]> {
    return this.getByStatus(schoolId, 'pending');
  }

  async getOverdue(schoolId: string): Promise<AccountsReceivable[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('status', ['pending', 'partial'])
      .lt('due_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByStudent(schoolId: string, studentId: string): Promise<AccountsReceivable[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null)
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getTotalReceivable(schoolId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('balance')
      .eq('school_id', schoolId)
      .in('status', ['pending', 'partial', 'overdue'])
      .is('deleted_at', null);

    if (error) throw error;
    return (data || []).reduce((sum, r) => sum + r.balance, 0);
  }

  async writeOff(schoolId: string, id: string, reason: string): Promise<AccountsReceivable> {
    return this.update(schoolId, id, {
      status: 'written_off',
      metadata: { write_off_reason: reason, write_off_date: new Date().toISOString() },
    });
  }
}
