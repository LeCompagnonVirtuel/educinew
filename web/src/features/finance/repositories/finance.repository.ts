import { createClient, SupabaseClient } from '@supabase/supabase-js';

export class SupabaseFinanceRepository {
  private supabase: SupabaseClient;

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async findStudent(studentId: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('students').select('*').eq('id', studentId).single();
    if (error) return null;
    return data;
  }

  async findParent(parentId: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('parents').select('*').eq('id', parentId).single();
    if (error) return null;
    return data;
  }

  async findTeacher(teacherId: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('teachers').select('*').eq('id', teacherId).single();
    if (error) return null;
    return data;
  }

  async findClass(classId: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('classes').select('*').eq('id', classId).single();
    if (error) return null;
    return data;
  }

  async findAcademicYear(yearId: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('academic_years').select('*').eq('id', yearId).single();
    if (error) return null;
    return data;
  }

  async getSchoolSettings(schoolId: string): Promise<any> {
    const { data, error } = await this.supabase.from('finance_settings').select('*').eq('school_id', schoolId).single();
    if (error) return null;
    return data;
  }

  async logAuditEntry(schoolId: string, userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>): Promise<void> {
    await this.supabase.from('finance_audit').insert({
      school_id: schoolId,
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      previous_value: previousValue,
      new_value: newValue,
    });
  }

  async createInvoice(invoice: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('invoices').insert(invoice).select().single();
    if (error) throw error;
    return data;
  }

  async findInvoiceById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('invoices').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async updateInvoice(id: string, updates: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('invoices').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async deleteInvoice(id: string): Promise<void> {
    const { error } = await this.supabase.from('invoices').delete().eq('id', id);
    if (error) throw error;
  }

  async listInvoices(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('invoices').select('*').eq('school_id', schoolId);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.studentId) query = query.eq('student_id', filters.studentId);
    if (filters?.classId) query = query.eq('class_id', filters.classId);
    if (filters?.academicYearId) query = query.eq('academic_year_id', filters.academicYearId);
    if (filters?.startDate) query = query.gte('created_at', filters.startDate);
    if (filters?.endDate) query = query.lte('created_at', filters.endDate);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async findInvoicesByStudent(studentId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('invoices').select('*').eq('student_id', studentId).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async findInvoicesByStatus(schoolId: string, status: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('invoices').select('*').eq('school_id', schoolId).eq('status', status).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async getOverdueInvoices(schoolId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('invoices').select('*').eq('school_id', schoolId).eq('status', 'pending').lt('due_date', new Date().toISOString()).order('due_date', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async createInvoiceItem(item: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('invoice_items').insert(item).select().single();
    if (error) throw error;
    return data;
  }

  async findInvoiceItemById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('invoice_items').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async updateInvoiceItem(id: string, updates: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('invoice_items').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async deleteInvoiceItem(id: string): Promise<void> {
    const { error } = await this.supabase.from('invoice_items').delete().eq('id', id);
    if (error) throw error;
  }

  async createInvoiceTemplate(template: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('invoice_templates').insert(template).select().single();
    if (error) throw error;
    return data;
  }

  async findInvoiceTemplateById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('invoice_templates').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async updateInvoiceTemplate(id: string, updates: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('invoice_templates').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async deleteInvoiceTemplate(id: string): Promise<void> {
    const { error } = await this.supabase.from('invoice_templates').delete().eq('id', id);
    if (error) throw error;
  }

  async listInvoiceTemplates(schoolId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('invoice_templates').select('*').eq('school_id', schoolId).order('name', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async createPayment(payment: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('payments').insert(payment).select().single();
    if (error) throw error;
    return data;
  }

  async findPaymentById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('payments').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async updatePayment(id: string, updates: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('payments').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async deletePayment(id: string): Promise<void> {
    const { error } = await this.supabase.from('payments').delete().eq('id', id);
    if (error) throw error;
  }

  async listPayments(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('payments').select('*').eq('school_id', schoolId);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.method) query = query.eq('method', filters.method);
    if (filters?.studentId) query = query.eq('student_id', filters.studentId);
    if (filters?.invoiceId) query = query.eq('invoice_id', filters.invoiceId);
    if (filters?.startDate) query = query.gte('payment_date', filters.startDate);
    if (filters?.endDate) query = query.lte('payment_date', filters.endDate);
    const { data, error } = await query.order('payment_date', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async findPaymentsByStudent(studentId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('payments').select('*').eq('student_id', studentId).order('payment_date', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async findPaymentsByInvoice(invoiceId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('payments').select('*').eq('invoice_id', invoiceId).order('payment_date', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async findPendingPayments(schoolId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('payments').select('*').eq('school_id', schoolId).eq('status', 'pending').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async getPaymentsByDateRange(schoolId: string, startDate: string, endDate: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('payments').select('*').eq('school_id', schoolId).gte('payment_date', startDate).lte('payment_date', endDate).order('payment_date', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async getTotalPaymentsByStudent(studentId: string): Promise<number> {
    const { data, error } = await this.supabase.from('payments').select('amount').eq('student_id', studentId).eq('status', 'completed');
    if (error) throw error;
    return (data || []).reduce((sum, p) => sum + (p.amount || 0), 0);
  }

  async createPaymentHistory(history: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('payment_history').insert(history).select().single();
    if (error) throw error;
    return data;
  }

  async listPaymentHistory(paymentId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('payment_history').select('*').eq('payment_id', paymentId).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async createPaymentAttempt(attempt: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('payment_attempts').insert(attempt).select().single();
    if (error) throw error;
    return data;
  }

  async listPaymentAttempts(paymentId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('payment_attempts').select('*').eq('payment_id', paymentId).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async createPaymentMethodConfig(config: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('payment_method_configs').insert(config).select().single();
    if (error) throw error;
    return data;
  }

  async findPaymentMethodConfigs(schoolId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('payment_method_configs').select('*').eq('school_id', schoolId).order('name', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async createReceipt(receipt: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('receipts').insert(receipt).select().single();
    if (error) throw error;
    return data;
  }

  async findReceiptById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('receipts').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async updateReceipt(id: string, updates: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('receipts').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async listReceipts(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('receipts').select('*').eq('school_id', schoolId);
    if (filters?.studentId) query = query.eq('student_id', filters.studentId);
    if (filters?.startDate) query = query.gte('issued_date', filters.startDate);
    if (filters?.endDate) query = query.lte('issued_date', filters.endDate);
    const { data, error } = await query.order('issued_date', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async findReceiptByPaymentId(paymentId: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('receipts').select('*').eq('payment_id', paymentId).single();
    if (error) return null;
    return data;
  }

  async findReceiptsByStudent(studentId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('receipts').select('*').eq('student_id', studentId).order('issued_date', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async deleteReceipt(id: string): Promise<void> {
    const { error } = await this.supabase.from('receipts').delete().eq('id', id);
    if (error) throw error;
  }

  async createReceiptTemplate(template: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('receipt_templates').insert(template).select().single();
    if (error) throw error;
    return data;
  }

  async listReceiptTemplates(schoolId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('receipt_templates').select('*').eq('school_id', schoolId).order('name', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async createTransaction(transaction: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('transactions').insert(transaction).select().single();
    if (error) throw error;
    return data;
  }

  async listTransactions(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('transactions').select('*').eq('school_id', schoolId);
    if (filters?.type) query = query.eq('type', filters.type);
    if (filters?.startDate) query = query.gte('created_at', filters.startDate);
    if (filters?.endDate) query = query.lte('created_at', filters.endDate);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async findTransactionById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('transactions').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async createExpense(expense: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('expenses').insert(expense).select().single();
    if (error) throw error;
    return data;
  }

  async findExpenseById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('expenses').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async updateExpense(id: string, updates: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('expenses').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async deleteExpense(id: string): Promise<void> {
    const { error } = await this.supabase.from('expenses').delete().eq('id', id);
    if (error) throw error;
  }

  async listExpenses(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('expenses').select('*').eq('school_id', schoolId);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.startDate) query = query.gte('expense_date', filters.startDate);
    if (filters?.endDate) query = query.lte('expense_date', filters.endDate);
    const { data, error } = await query.order('expense_date', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async approveExpense(id: string, approvedBy: string): Promise<any> {
    const { data, error } = await this.supabase.from('expenses').update({ status: 'approved', approved_by: approvedBy }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async rejectExpense(id: string, reason: string): Promise<any> {
    const { data, error } = await this.supabase.from('expenses').update({ status: 'rejected', rejection_reason: reason }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async findExpensesByCategory(schoolId: string, category: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('expenses').select('*').eq('school_id', schoolId).eq('category', category).order('expense_date', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async getTotalExpenses(schoolId: string, startDate?: string, endDate?: string): Promise<number> {
    let query = this.supabase.from('expenses').select('amount').eq('school_id', schoolId).eq('status', 'approved');
    if (startDate) query = query.gte('expense_date', startDate);
    if (endDate) query = query.lte('expense_date', endDate);
    const { data, error } = await query;
    if (error) throw error;
    return (data || []).reduce((sum, e) => sum + (e.amount || 0), 0);
  }

  async createRevenue(revenue: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('revenue').insert(revenue).select().single();
    if (error) throw error;
    return data;
  }

  async listRevenue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('revenue').select('*').eq('school_id', schoolId);
    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.startDate) query = query.gte('receipt_date', filters.startDate);
    if (filters?.endDate) query = query.lte('receipt_date', filters.endDate);
    const { data, error } = await query.order('receipt_date', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async getTotalRevenue(schoolId: string, startDate?: string, endDate?: string): Promise<number> {
    let query = this.supabase.from('revenue').select('amount').eq('school_id', schoolId);
    if (startDate) query = query.gte('receipt_date', startDate);
    if (endDate) query = query.lte('receipt_date', endDate);
    const { data, error } = await query;
    if (error) throw error;
    return (data || []).reduce((sum, r) => sum + (r.amount || 0), 0);
  }

  async createCashRegister(register: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('cash_registers').insert(register).select().single();
    if (error) throw error;
    return data;
  }

  async findCashRegisterById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('cash_registers').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async updateCashRegister(id: string, updates: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('cash_registers').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async listCashRegisters(schoolId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('cash_registers').select('*').eq('school_id', schoolId).order('name', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async openCashRegisterSession(session: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('cash_register_sessions').insert(session).select().single();
    if (error) throw error;
    return data;
  }

  async closeCashRegisterSession(id: string, closingBalance: number): Promise<any> {
    const { data, error } = await this.supabase.from('cash_register_sessions').update({ closing_balance: closingBalance, status: 'closed', closed_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async findActiveCashRegisterSession(cashRegisterId: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('cash_register_sessions').select('*').eq('cash_register_id', cashRegisterId).eq('status', 'open').single();
    if (error) return null;
    return data;
  }

  async createCashRegisterMovement(movement: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('cash_register_movements').insert(movement).select().single();
    if (error) throw error;
    return data;
  }

  async listCashRegisterMovements(sessionId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('cash_register_movements').select('*').eq('session_id', sessionId).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async getCashRegisterBalance(sessionId: string): Promise<number> {
    const { data: session, error: sessionError } = await this.supabase.from('cash_register_sessions').select('opening_balance').eq('id', sessionId).single();
    if (sessionError) throw sessionError;
    const { data: movements, error: movError } = await this.supabase.from('cash_register_movements').select('amount, type').eq('session_id', sessionId);
    if (movError) throw movError;
    let balance = session.opening_balance || 0;
    for (const m of movements || []) {
      if (['sale', 'deposit', 'opening'].includes(m.type)) {
        balance += m.amount;
      } else {
        balance -= m.amount;
      }
    }
    return balance;
  }

  async createAccountingEntry(entry: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('accounting_entries').insert(entry).select().single();
    if (error) throw error;
    return data;
  }

  async findAccountingEntryById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('accounting_entries').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async listAccountingEntries(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('accounting_entries').select('*').eq('school_id', schoolId);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.startDate) query = query.gte('date', filters.startDate);
    if (filters?.endDate) query = query.lte('date', filters.endDate);
    const { data, error } = await query.order('date', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async postAccountingEntry(id: string, postedBy: string): Promise<any> {
    const { data, error } = await this.supabase.from('accounting_entries').update({ status: 'posted', posted_by: postedBy, posted_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async voidAccountingEntry(id: string, reason: string): Promise<any> {
    const { data, error } = await this.supabase.from('accounting_entries').update({ status: 'voided', void_reason: reason }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async createJournal(journal: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('accounting_journals').insert(journal).select().single();
    if (error) throw error;
    return data;
  }

  async findJournalById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('accounting_journals').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async updateJournal(id: string, updates: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('accounting_journals').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async listJournals(schoolId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('accounting_journals').select('*').eq('school_id', schoolId).order('name', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async createAccount(account: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('accounting_accounts').insert(account).select().single();
    if (error) throw error;
    return data;
  }

  async findAccountById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('accounting_accounts').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async updateAccount(id: string, updates: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('accounting_accounts').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async listAccounts(schoolId: string, type?: string): Promise<any[]> {
    let query = this.supabase.from('accounting_accounts').select('*').eq('school_id', schoolId);
    if (type) query = query.eq('type', type);
    const { data, error } = await query.order('code', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async createBudget(budget: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('budgets').insert(budget).select().single();
    if (error) throw error;
    return data;
  }

  async findBudgetById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('budgets').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async updateBudget(id: string, updates: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('budgets').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async listBudgets(schoolId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('budgets').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async createBudgetItem(item: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('budget_items').insert(item).select().single();
    if (error) throw error;
    return data;
  }

  async listBudgetItems(budgetId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('budget_items').select('*').eq('budget_id', budgetId).order('category', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async executeBudgetItem(id: string, executedAmount: number): Promise<any> {
    const { data: current, error: fetchError } = await this.supabase.from('budget_items').select('executed_amount').eq('id', id).single();
    if (fetchError) throw fetchError;
    const newExecutedAmount = (current.executed_amount || 0) + executedAmount;
    const { data, error } = await this.supabase.from('budget_items').update({ executed_amount: newExecutedAmount, last_executed_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async getBudgetExecutionSummary(budgetId: string): Promise<any> {
    const { data: budget, error: budgetError } = await this.supabase.from('budgets').select('*').eq('id', budgetId).single();
    if (budgetError) throw budgetError;
    const { data: items, error: itemsError } = await this.supabase.from('budget_items').select('*').eq('budget_id', budgetId);
    if (itemsError) throw itemsError;
    const totalPlanned = (items || []).reduce((sum, i) => sum + (i.planned_amount || 0), 0);
    const totalExecuted = (items || []).reduce((sum, i) => sum + (i.executed_amount || 0), 0);
    return { ...budget, items, totalPlanned, totalExecuted, executionRate: totalPlanned > 0 ? (totalExecuted / totalPlanned) * 100 : 0 };
  }

  async createDiscount(discount: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('discounts').insert(discount).select().single();
    if (error) throw error;
    return data;
  }

  async findDiscountById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('discounts').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async updateDiscount(id: string, updates: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('discounts').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async listDiscounts(schoolId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('discounts').select('*').eq('school_id', schoolId).order('name', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async deleteDiscount(id: string): Promise<void> {
    const { error } = await this.supabase.from('discounts').delete().eq('id', id);
    if (error) throw error;
  }

  async createScholarship(scholarship: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('scholarships').insert(scholarship).select().single();
    if (error) throw error;
    return data;
  }

  async findScholarshipById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('scholarships').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async updateScholarship(id: string, updates: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('scholarships').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async listScholarships(schoolId: string, academicYearId?: string): Promise<any[]> {
    let query = this.supabase.from('scholarships').select('*').eq('school_id', schoolId);
    if (academicYearId) query = query.eq('academic_year_id', academicYearId);
    const { data, error } = await query.order('name', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async findScholarshipByStudent(studentId: string, academicYearId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('scholarships').select('*').eq('student_id', studentId).eq('academic_year_id', academicYearId);
    if (error) throw error;
    return data || [];
  }

  async createInstallmentPlan(plan: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('installment_plans').insert(plan).select().single();
    if (error) throw error;
    return data;
  }

  async findInstallmentPlanById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('installment_plans').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async updateInstallmentPlan(id: string, updates: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('installment_plans').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async listInstallmentPlans(schoolId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('installment_plans').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async createRefund(refund: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('refunds').insert(refund).select().single();
    if (error) throw error;
    return data;
  }

  async findRefundById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('refunds').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async updateRefund(id: string, updates: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('refunds').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async listRefunds(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('refunds').select('*').eq('school_id', schoolId);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.studentId) query = query.eq('student_id', filters.studentId);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async approveRefund(id: string, approvedBy: string): Promise<any> {
    const { data, error } = await this.supabase.from('refunds').update({ status: 'approved', approved_by: approvedBy, approved_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async processRefund(id: string): Promise<any> {
    const { data, error } = await this.supabase.from('refunds').update({ status: 'processed', processed_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async createLateFee(lateFee: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('late_fees').insert(lateFee).select().single();
    if (error) throw error;
    return data;
  }

  async findLateFeesByInvoice(invoiceId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('late_fees').select('*').eq('invoice_id', invoiceId).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async waiveLateFee(id: string, waivedBy: string, reason: string): Promise<any> {
    const { data, error } = await this.supabase.from('late_fees').update({ status: 'waived', waived_by: waivedBy, waived_reason: reason, waived_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async createReport(report: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('financial_reports').insert(report).select().single();
    if (error) throw error;
    return data;
  }

  async findReportById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('financial_reports').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async listReports(schoolId: string, type?: string): Promise<any[]> {
    let query = this.supabase.from('financial_reports').select('*').eq('school_id', schoolId);
    if (type) query = query.eq('type', type);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async generateIncomeStatement(schoolId: string, startDate: string, endDate: string): Promise<any> {
    const revenue = await this.getTotalRevenue(schoolId, startDate, endDate);
    const expenses = await this.getTotalExpenses(schoolId, startDate, endDate);
    return { revenue, expenses, netIncome: revenue - expenses, period: { startDate, endDate } };
  }

  async generateBalanceSheet(schoolId: string): Promise<any> {
    const { data: accounts, error } = await this.supabase.from('accounting_accounts').select('*').eq('school_id', schoolId);
    if (error) throw error;
    const assets = (accounts || []).filter((a) => a.type === 'asset');
    const liabilities = (accounts || []).filter((a) => a.type === 'liability');
    const equity = (accounts || []).filter((a) => a.type === 'equity');
    return { assets, liabilities, equity, totalAssets: assets.reduce((s, a) => s + (a.balance || 0), 0), totalLiabilities: liabilities.reduce((s, a) => s + (a.balance || 0), 0), totalEquity: equity.reduce((s, a) => s + (a.balance || 0), 0) };
  }

  async generateCashFlow(schoolId: string, startDate: string, endDate: string): Promise<any> {
    const inflows = await this.supabase.from('transactions').select('amount').eq('school_id', schoolId).eq('type', 'income').gte('created_at', startDate).lte('created_at', endDate);
    const outflows = await this.supabase.from('transactions').select('amount').eq('school_id', schoolId).eq('type', 'expense').gte('created_at', startDate).lte('created_at', endDate);
    const totalInflows = (inflows.data || []).reduce((s, t) => s + (t.amount || 0), 0);
    const totalOutflows = (outflows.data || []).reduce((s, t) => s + (t.amount || 0), 0);
    return { totalInflows, totalOutflows, netCashFlow: totalInflows - totalOutflows, period: { startDate, endDate } };
  }

  async getFinanceStatistics(schoolId: string, academicYearId?: string): Promise<any> {
    const invoices = await this.listInvoices(schoolId, academicYearId ? { academicYearId } : undefined);
    const payments = await this.listPayments(schoolId);
    const expenses = await this.listExpenses(schoolId);
    const totalInvoiced = invoices.reduce((s, i) => s + (i.total_amount || 0), 0);
    const totalPaid = payments.filter((p) => p.status === 'completed').reduce((s, p) => s + (p.amount || 0), 0);
    const totalExpenses = expenses.filter((e) => e.status === 'approved').reduce((s, e) => s + (e.amount || 0), 0);
    return { totalInvoiced, totalPaid, totalExpenses, outstandingBalance: totalInvoiced - totalPaid, netIncome: totalPaid - totalExpenses, invoiceCount: invoices.length, paymentCount: payments.length, expenseCount: expenses.length };
  }

  async getFinanceAnalytics(schoolId: string, startDate: string, endDate: string): Promise<any> {
    const revenue = await this.getTotalRevenue(schoolId, startDate, endDate);
    const expenses = await this.getTotalExpenses(schoolId, startDate, endDate);
    const payments = await this.getPaymentsByDateRange(schoolId, startDate, endDate);
    const paymentMethods = payments.reduce((acc, p) => {
      acc[p.method] = (acc[p.method] || 0) + p.amount;
      return acc;
    }, {} as Record<string, number>);
    return { revenue, expenses, netIncome: revenue - expenses, paymentMethods, paymentCount: payments.length };
  }

  async getFinanceTimeline(schoolId: string, startDate: string, endDate: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('transactions').select('*').eq('school_id', schoolId).gte('created_at', startDate).lte('created_at', endDate).order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async getFinanceDashboard(schoolId: string): Promise<any> {
    const statistics = await this.getFinanceStatistics(schoolId);
    const overdueInvoices = await this.getOverdueInvoices(schoolId);
    const pendingExpenses = await this.listExpenses(schoolId, { status: 'pending' });
    const recentPayments = await this.listPayments(schoolId);
    return { statistics, overdueInvoices: overdueInvoices.length, pendingExpenses: pendingExpenses.length, recentPayments: recentPayments.slice(0, 10) };
  }

  async getStudentBalance(studentId: string): Promise<any> {
    const invoices = await this.findInvoicesByStudent(studentId);
    const payments = await this.findPaymentsByStudent(studentId);
    const totalInvoiced = invoices.reduce((s, i) => s + (i.total_amount || 0), 0);
    const totalPaid = payments.filter((p) => p.status === 'completed').reduce((s, p) => s + (p.amount || 0), 0);
    return { studentId, totalInvoiced, totalPaid, balance: totalInvoiced - totalPaid, invoiceCount: invoices.length, paymentCount: payments.length };
  }

  async getParentStatement(parentId: string): Promise<any> {
    const { data: parent, error: parentError } = await this.supabase.from('parents').select('*').eq('id', parentId).single();
    if (parentError) throw parentError;
    const { data: students } = await this.supabase.from('students').select('*').eq('parent_id', parentId);
    const balances = await Promise.all((students || []).map((s) => this.getStudentBalance(s.id)));
    return { parent, students, balances, totalBalance: balances.reduce((s, b) => s + b.balance, 0) };
  }

  async getDebts(schoolId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('invoices').select('*, students(name, email)').eq('school_id', schoolId).in('status', ['pending', 'overdue']).order('due_date', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async getDebtsByStudent(studentId: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('invoices').select('*').eq('student_id', studentId).in('status', ['pending', 'overdue']).order('due_date', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async searchInvoices(schoolId: string, query: string): Promise<any[]> {
    const { data, error } = await this.supabase.from('invoices').select('*').eq('school_id', schoolId).or(`title.ilike.%${query}%,description.ilike.%${query}%`).order('created_at', { ascending: false }).limit(20);
    if (error) throw error;
    return data || [];
  }

  async createFinanceNotification(notification: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('finance_notifications').insert(notification).select().single();
    if (error) throw error;
    return data;
  }

  async listFinanceNotifications(schoolId: string, userId?: string): Promise<any[]> {
    let query = this.supabase.from('finance_notifications').select('*').eq('school_id', schoolId);
    if (userId) query = query.eq('user_id', userId);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async markNotificationRead(id: string): Promise<any> {
    const { data, error } = await this.supabase.from('finance_notifications').update({ is_read: true, read_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async getFinanceSettings(schoolId: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('finance_settings').select('*').eq('school_id', schoolId).single();
    if (error) return null;
    return data;
  }

  async updateFinanceSettings(schoolId: string, updates: Record<string, unknown>): Promise<any> {
    const { data, error } = await this.supabase.from('finance_settings').update(updates).eq('school_id', schoolId).select().single();
    if (error) throw error;
    return data;
  }

  async getAuditLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('finance_audit').select('*').eq('school_id', schoolId);
    if (filters?.entityType) query = query.eq('entity_type', filters.entityType);
    if (filters?.userId) query = query.eq('user_id', filters.userId);
    if (filters?.startDate) query = query.gte('created_at', filters.startDate);
    if (filters?.endDate) query = query.lte('created_at', filters.endDate);
    const { data, error } = await query.order('created_at', { ascending: false }).limit(100);
    if (error) throw error;
    return data || [];
  }

  async findAuditEntryById(id: string): Promise<any | null> {
    const { data, error } = await this.supabase.from('finance_audit').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }

  async exportInvoices(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    return this.listInvoices(schoolId, filters);
  }

  async exportPayments(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    return this.listPayments(schoolId, filters);
  }

  async exportExpenses(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    return this.listExpenses(schoolId, filters);
  }

  async exportTransactions(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    return this.listTransactions(schoolId, filters);
  }
}
