import { createClient } from '@supabase/supabase-js';

export class MobileFinanceRepository {
  private readonly supabase: ReturnType<typeof createClient>;
  constructor(supabase: ReturnType<typeof createClient>) { this.supabase = supabase; }

  async findInvoice(id: string) {
    const { data, error } = await this.supabase.from('invoices').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllInvoices(schoolId: string, filters?: Record<string, unknown>) {
    let query = this.supabase.from('invoices').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.studentId) query = query.eq('student_id', filters.studentId);
    const { data, error, count } = await query.order('created_at', { ascending: false }).limit((filters?.limit as number) || 20);
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createInvoice(data: Record<string, unknown>, schoolId: string) {
    const { data: result, error } = await this.supabase.from('invoices').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateInvoice(id: string, data: Record<string, unknown>) {
    const { data: result, error } = await this.supabase.from('invoices').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async deleteInvoice(id: string) {
    const { error } = await this.supabase.from('invoices').delete().eq('id', id);
    if (error) throw error;
  }

  async findPayment(id: string) {
    const { data, error } = await this.supabase.from('payments').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllPayments(schoolId: string, filters?: Record<string, unknown>) {
    let query = this.supabase.from('payments').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (filters?.status) query = query.eq('status', filters.status);
    const { data, error, count } = await query.order('created_at', { ascending: false }).limit((filters?.limit as number) || 20);
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createPayment(data: Record<string, unknown>, schoolId: string) {
    const { data: result, error } = await this.supabase.from('payments').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async confirmPayment(id: string, confirmedBy: string) {
    const { data: result, error } = await this.supabase.from('payments').update({ status: 'COMPLETED', confirmed_by: confirmedBy, confirmed_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async findReceipt(id: string) {
    const { data, error } = await this.supabase.from('receipts').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllReceipts(schoolId: string, filters?: Record<string, unknown>) {
    let query = this.supabase.from('receipts').select('*', { count: 'exact' }).eq('school_id', schoolId);
    const { data, error, count } = await query.order('created_at', { ascending: false }).limit((filters?.limit as number) || 20);
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createReceipt(data: Record<string, unknown>, schoolId: string) {
    const { data: result, error } = await this.supabase.from('receipts').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async generateReceipt(paymentId: string) {
    const { data: result, error } = await this.supabase.from('receipts').insert({ payment_id: paymentId, status: 'GENERATED', issued_at: new Date().toISOString() }).select().single();
    if (error) throw error;
    return result;
  }

  async findExpense(id: string) {
    const { data, error } = await this.supabase.from('expenses').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllExpenses(schoolId: string, filters?: Record<string, unknown>) {
    let query = this.supabase.from('expenses').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (filters?.category) query = query.eq('category', filters.category);
    const { data, error, count } = await query.order('created_at', { ascending: false }).limit((filters?.limit as number) || 20);
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createExpense(data: Record<string, unknown>, schoolId: string) {
    const { data: result, error } = await this.supabase.from('expenses').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async approveExpense(id: string, approvedBy: string) {
    const { data: result, error } = await this.supabase.from('expenses').update({ status: 'APPROVED', approved_by: approvedBy, approved_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async findRevenue(id: string) {
    const { data, error } = await this.supabase.from('revenues').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllRevenues(schoolId: string, filters?: Record<string, unknown>) {
    let query = this.supabase.from('revenues').select('*', { count: 'exact' }).eq('school_id', schoolId);
    const { data, error, count } = await query.order('created_at', { ascending: false }).limit((filters?.limit as number) || 20);
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createRevenue(data: Record<string, unknown>, schoolId: string) {
    const { data: result, error } = await this.supabase.from('revenues').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async findCashRegister(id: string) {
    const { data, error } = await this.supabase.from('cash_registers').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async openCashRegister(id: string, openedBy: string) {
    const { data: result, error } = await this.supabase.from('cash_registers').update({ status: 'OPEN', opened_by: openedBy, opened_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async closeCashRegister(id: string, closingBalance: number, closedBy: string) {
    const { data: result, error } = await this.supabase.from('cash_registers').update({ status: 'CLOSED', closing_balance: closingBalance, closed_by: closedBy, closed_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async findCashRegisterMovements(cashRegisterId: string) {
    const { data, error } = await this.supabase.from('cash_register_movements').select('*').eq('cash_register_id', cashRegisterId).order('performed_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async findAccountingEntry(id: string) {
    const { data, error } = await this.supabase.from('accounting_entries').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllAccountingEntries(schoolId: string, filters?: Record<string, unknown>) {
    let query = this.supabase.from('accounting_entries').select('*', { count: 'exact' }).eq('school_id', schoolId);
    const { data, error, count } = await query.order('created_at', { ascending: false }).limit((filters?.limit as number) || 20);
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createAccountingEntry(data: Record<string, unknown>, schoolId: string) {
    const { data: result, error } = await this.supabase.from('accounting_entries').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async findBudget(id: string) {
    const { data, error } = await this.supabase.from('budgets').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllBudgets(schoolId: string) {
    const { data, error } = await this.supabase.from('budgets').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async createBudget(data: Record<string, unknown>, schoolId: string) {
    const { data: result, error } = await this.supabase.from('budgets').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async getDashboard(schoolId: string) {
    const { data: invoices } = await this.supabase.from('invoices').select('total_amount, status').eq('school_id', schoolId);
    const { data: payments } = await this.supabase.from('payments').select('amount, status').eq('school_id', schoolId);
    const { data: expenses } = await this.supabase.from('expenses').select('amount, category').eq('school_id', schoolId);
    const totalRevenue = invoices?.reduce((sum: number, i: Record<string, unknown>) => sum + (Number(i.total_amount) || 0), 0) || 0;
    const totalPaid = payments?.filter((p: Record<string, unknown>) => p.status === 'COMPLETED').reduce((sum: number, p: Record<string, unknown>) => sum + (Number(p.amount) || 0), 0) || 0;
    const totalExpenses = expenses?.reduce((sum: number, e: Record<string, unknown>) => sum + (Number(e.amount) || 0), 0) || 0;
    return { totalRevenue, totalPaid, totalExpenses, netIncome: totalRevenue - totalExpenses };
  }

  async getFinanceStatistics(schoolId: string) {
    const dashboard = await this.getDashboard(schoolId);
    return { ...dashboard, collectionRate: dashboard.totalRevenue > 0 ? (dashboard.totalPaid / dashboard.totalRevenue) * 100 : 0 };
  }

  async getFinanceAnalytics(schoolId: string) {
    const stats = await this.getFinanceStatistics(schoolId);
    return { ...stats, profitMargin: stats.totalRevenue > 0 ? (stats.netIncome / stats.totalRevenue) * 100 : 0 };
  }

  async searchInvoices(schoolId: string, query: string) {
    const { data, error } = await this.supabase.from('invoices').select('*').eq('school_id', schoolId).ilike('invoice_number', `%${query}%`).limit(20);
    if (error) throw error;
    return { data: data || [], total: data?.length || 0 };
  }

  async logAudit(schoolId: string, userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>) {
    await this.supabase.from('finance_audit').insert({ school_id: schoolId, user_id: userId, action, entity_type: entityType, entity_id: entityId, previous_value: previousValue, new_value: newValue });
  }

  async getAuditLog(schoolId: string, filters?: Record<string, unknown>) {
    let query = this.supabase.from('finance_audit').select('*').eq('school_id', schoolId);
    const { data, error } = await query.order('created_at', { ascending: false }).limit((filters?.limit as number) || 50);
    if (error) throw error;
    return data || [];
  }
}
