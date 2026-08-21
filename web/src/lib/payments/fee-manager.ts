import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

export interface FeeStructure {
  id?: string;
  schoolId: string;
  name: string;
  category: string;
  amount: number;
  currency: string;
  frequency: 'ONCE' | 'MONTHLY' | 'QUARTERLY' | 'SEMESTER' | 'YEARLY';
  mandatory: boolean;
  applicableCycles?: string[];
  applicableLevels?: string[];
  applicableClasses?: string[];
  description?: string;
  dueDate?: string;
}

export interface InvoiceData {
  id: string;
  reference: string;
  studentId: string;
  studentName: string;
  className: string;
  parentName: string;
  parentEmail: string;
  schoolName: string;
  schoolLogo?: string;
  items: { description: string; amount: number; quantity: number }[];
  totalAmount: number;
  paidAmount: number;
  status: string;
  dueDate: string;
  currency: string;
  createdAt: string;
}

export async function createFeeStructure(fee: FeeStructure) {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('fee_categories').insert({
    school_id: fee.schoolId,
    name: fee.name,
    category: fee.category,
    amount: fee.amount,
    currency: fee.currency || 'XOF',
    frequency: fee.frequency,
    mandatory: fee.mandatory,
    applicable_cycles: fee.applicableCycles || null,
    applicable_levels: fee.applicableLevels || null,
    applicable_classes: fee.applicableClasses || null,
    description: fee.description || null,
    due_date: fee.dueDate || null,
  }).select().single();

  if (error) throw error;
  return data;
}

export async function generateInvoice(schoolId: string, studentId: string, feeIds: string[], customAmounts?: Record<string, number>) {
  const supabase = getSupabase();

  const { data: student } = await supabase.from('students').select('id, user:users(name, email), class:classes(name)').eq('id', studentId).single();
  if (!student) throw new Error('Student not found');

  const { data: fees } = await supabase.from('fee_categories').select('*').in('id', feeIds).eq('school_id', schoolId);
  if (!fees || fees.length === 0) throw new Error('No fees found');

  const { data: school } = await supabase.from('schools').select('name, logo_url').eq('id', schoolId).single();

  const items = fees.map(fee => ({
    description: fee.name,
    amount: customAmounts?.[fee.id] || fee.amount,
    quantity: 1,
    feeId: fee.id,
  }));

  const totalAmount = items.reduce((sum, item) => sum + item.amount * item.quantity, 0);
  const reference = `INV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const { data: invoice, error } = await supabase.from('invoices').insert({
    school_id: schoolId,
    student_id: studentId,
    reference,
    amount: totalAmount,
    paid_amount: 0,
    currency: fees[0]?.currency || 'XOF',
    status: 'PENDING',
    due_date: dueDate,
    items: JSON.stringify(items),
    description: items.map(i => i.description).join(', '),
  }).select().single();

  if (error) throw error;

  return {
    id: invoice.id,
    reference,
    studentId,
    studentName: (student.user as any)?.name || '',
    className: (student.class as any)?.name || '',
    parentName: '',
    parentEmail: (student.user as any)?.email || '',
    schoolName: school?.name || '',
    schoolLogo: school?.logo_url || '',
    items,
    totalAmount,
    paidAmount: 0,
    status: 'PENDING',
    dueDate,
    currency: fees[0]?.currency || 'XOF',
    createdAt: new Date().toISOString(),
  } as InvoiceData;
}

export async function getStudentInvoices(schoolId: string, studentId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('school_id', schoolId)
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getFinancialSummary(schoolId: string, startDate?: string, endDate?: string) {
  const supabase = getSupabase();

  let txQuery = supabase.from('payment_transactions').select('amount, status, payment_method, created_at, currency').eq('school_id', schoolId);
  if (startDate) txQuery = txQuery.gte('created_at', startDate);
  if (endDate) txQuery = txQuery.lte('created_at', endDate);
  const { data: transactions } = await txQuery;

  let invQuery = supabase.from('invoices').select('amount, paid_amount, status, due_date, created_at').eq('school_id', schoolId);
  if (startDate) invQuery = invQuery.gte('created_at', startDate);
  if (endDate) invQuery = invQuery.lte('created_at', endDate);
  const { data: invoices } = await invQuery;

  const totalRevenue = (transactions || []).filter((t: any) => t.status === 'COMPLETED').reduce((sum: number, t: any) => sum + (t.amount || 0), 0);
  const pendingAmount = (transactions || []).filter((t: any) => t.status === 'PENDING').reduce((sum: number, t: any) => sum + (t.amount || 0), 0);
  const failedAmount = (transactions || []).filter((t: any) => t.status === 'FAILED').reduce((sum: number, t: any) => sum + (t.amount || 0), 0);
  const totalInvoiced = (invoices || []).reduce((sum: number, i: any) => sum + (i.amount || 0), 0);
  const totalPaid = (invoices || []).reduce((sum: number, i: any) => sum + (i.paid_amount || 0), 0);
  const recoveryRate = totalInvoiced > 0 ? Math.round((totalPaid / totalInvoiced) * 100) : 0;

  const byMethod: Record<string, number> = {};
  (transactions || []).filter((t: any) => t.status === 'COMPLETED').forEach((t: any) => {
    byMethod[t.payment_method] = (byMethod[t.payment_method] || 0) + (t.amount || 0);
  });

  const dailyRevenue: Record<string, number> = {};
  (transactions || []).filter((t: any) => t.status === 'COMPLETED').forEach((t: any) => {
    const day = new Date(t.created_at).toISOString().split('T')[0];
    dailyRevenue[day] = (dailyRevenue[day] || 0) + (t.amount || 0);
  });

  return { totalRevenue, pendingAmount, failedAmount, totalInvoiced, totalPaid, recoveryRate, byMethod, dailyRevenue, transactionCount: (transactions || []).length, invoiceCount: (invoices || []).length };
}
