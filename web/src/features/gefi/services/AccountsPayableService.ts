import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface AccountsPayable {
  id: string;
  school_id: string;
  invoice_number: string;
  vendor_id: string;
  purchase_order_id?: string;
  amount: number;
  tax_amount: number;
  total_amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'scheduled' | 'paid' | 'overdue' | 'cancelled';
  invoice_date: string;
  due_date: string;
  paid_date?: string;
  paid_amount: number;
  payment_method?: string;
  payment_reference?: string;
  approved_by?: string;
  approved_at?: string;
  description: string;
  category: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateAccountsPayable {
  vendor_id: string;
  purchase_order_id?: string;
  amount: number;
  tax_amount?: number;
  currency?: string;
  invoice_date: string;
  due_date: string;
  description: string;
  category: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateAccountsPayable {
  status?: string;
  paid_date?: string;
  paid_amount?: number;
  payment_method?: string;
  payment_reference?: string;
  approved_by?: string;
  metadata?: Record<string, unknown>;
}

export class AccountsPayableService {
  private readonly TABLE = 'accounts_payable';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<AccountsPayable[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<AccountsPayable | null> {
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

  async create(schoolId: string, payable: CreateAccountsPayable): Promise<AccountsPayable> {
    const invoiceNumber = `AP-${Date.now()}`;
    const totalAmount = payable.amount + (payable.tax_amount || 0);

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        invoice_number: invoiceNumber,
        ...payable,
        tax_amount: payable.tax_amount || 0,
        total_amount: totalAmount,
        currency: payable.currency || 'XOF',
        status: 'pending',
        paid_amount: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, payable: UpdateAccountsPayable): Promise<AccountsPayable> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...payable, updated_at: new Date().toISOString() })
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

  async approve(schoolId: string, id: string, approvedBy: string): Promise<AccountsPayable> {
    return this.update(schoolId, id, {
      status: 'approved',
      approved_by: approvedBy,
      approved_at: new Date().toISOString(),
    });
  }

  async recordPayment(schoolId: string, id: string, amount: number, paymentMethod: string, paymentReference: string): Promise<AccountsPayable> {
    const payable = await this.getById(schoolId, id);
    if (!payable) throw new Error('Payable not found');

    const newPaidAmount = payable.paid_amount + amount;
    const newStatus = newPaidAmount >= payable.total_amount ? 'paid' : 'partial';

    return this.update(schoolId, id, {
      paid_amount: newPaidAmount,
      status: newStatus,
      paid_date: new Date().toISOString(),
      payment_method: paymentMethod,
      payment_reference: paymentReference,
    });
  }

  async getByStatus(schoolId: string, status: string): Promise<AccountsPayable[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPending(schoolId: string): Promise<AccountsPayable[]> {
    return this.getByStatus(schoolId, 'pending');
  }

  async getOverdue(schoolId: string): Promise<AccountsPayable[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('status', ['pending', 'approved'])
      .lt('due_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByVendor(schoolId: string, vendorId: string): Promise<AccountsPayable[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('vendor_id', vendorId)
      .is('deleted_at', null)
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getTotalPayable(schoolId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('total_amount')
      .eq('school_id', schoolId)
      .in('status', ['pending', 'approved', 'scheduled'])
      .is('deleted_at', null);

    if (error) throw error;
    return (data || []).reduce((sum, p) => sum + p.total_amount, 0);
  }
}
