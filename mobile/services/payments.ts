import { supabase, camel, getUserSchoolId } from './supabase';
import { executeRequest } from './base';

export async function initiatePayment(invoiceId: string, paymentMethod: string, amount?: number) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Non authentifié');

  // Fetch invoice amount if not provided
  let paymentAmount = amount;
  if (!paymentAmount) {
    const { data: invoice } = await supabase.from('invoices').select('amount').eq('id', invoiceId).single();
    paymentAmount = invoice?.amount || 0;
  }

  const res = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/payment-initiate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
    body: JSON.stringify({ invoiceId, method: paymentMethod, amount: paymentAmount }),
  });
  if (!res.ok) throw new Error('Erreur de paiement');
  return res.json();
}

export async function getPayments(filters: any = {}) {
  let q = supabase.from('payments').select('*, student:students(*, user:users(*))');
  if (filters.studentId) q = q.eq('student_id', filters.studentId);
  if (filters.schoolId) q = q.eq('school_id', filters.schoolId);
  if (filters.status) q = q.eq('status', filters.status);
  const { data, error } = await q;
  if (error) throw error;
  return camel(data);
}

export async function getPaymentStats(schoolId?: string) {
  const sid = schoolId || await getUserSchoolId();
  let totalQuery = supabase.from('payments').select('amount');
  let completedQuery = supabase.from('payments').select('amount').eq('status', 'COMPLETED');
  if (sid) {
    totalQuery = totalQuery.eq('school_id', sid);
    completedQuery = completedQuery.eq('school_id', sid);
  }
  const [totalData, completedData] = await Promise.all([totalQuery, completedQuery]);
  const total = (totalData.data || []).reduce((s: number, p: any) => s + (p.amount || 0), 0);
  const completed = (completedData.data || []).reduce((s: number, p: any) => s + (p.amount || 0), 0);
  return { total, completed };
}

export async function getRecentPayments(userId: string, limit = 10) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
  const role = profile?.role || user.user_metadata?.role;
  if (role === 'PARENT') {
    const { data: children } = await supabase.from('students').select('id').eq('parent_id', userId);
    const childIds = (children || []).map(c => c.id);
    if (childIds.length === 0) return [];
    const { data } = await supabase.from('payments').select('*, student:students(*, user:users(*))').in('student_id', childIds).order('created_at', { ascending: false }).limit(limit);
    return camel(data || []);
  }
  const { data: student } = await supabase.from('students').select('id').eq('user_id', userId).single();
  if (!student) return [];
  const { data } = await supabase.from('payments').select('*, student:students(*, user:users(*))').eq('student_id', student.id).order('created_at', { ascending: false }).limit(limit);
  return camel(data || []);
}

export async function getInvoices(studentId: string, _status?: string) {
  const { data, error } = await supabase.from('invoices').select('*, student:students(*, user:users(*))').eq('student_id', studentId);
  if (error) throw error;
  return camel(data || []);
}

export async function getPaymentHistory() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { payments: [] };
  const { data: children } = await supabase.from('students').select('id').eq('parent_id', user.id);
  const childIds = (children || []).map(c => c.id);
  if (childIds.length === 0) return { payments: [] };
  const { data } = await supabase.from('payments').select('*').in('student_id', childIds).order('created_at', { ascending: false });
  return { payments: camel(data || []) };
}

export async function getReceipt(paymentId: string) {
  const { data, error } = await supabase.from('payments').select('*, student:students(*, user:users(*))').eq('id', paymentId).single();
  if (error) throw error;
  return camel(data);
}

export async function verifyPayment(reference: string) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Non authentifié');
  const res = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/payment-verify/${encodeURIComponent(reference)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Vérification échouée' }));
    throw new Error(err.error || `Erreur vérification (${res.status})`);
  }
  return res.json();
}

export async function getWallet() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { balance: 0, currency: 'XOF', transactions: [] };
  const { data: wallet } = await supabase.from('wallets').select('*').eq('user_id', user.id).single();
  if (!wallet) return { balance: 0, currency: 'XOF', transactions: [] };
  const { data: txns } = await supabase.from('wallet_transactions').select('*').eq('wallet_id', wallet.id).order('created_at', { ascending: false }).limit(20);
  return { balance: wallet.balance || 0, currency: wallet.currency || 'XOF', transactions: camel(txns || []) };
}

export async function rechargeWallet(amount: number) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Non authentifié');

  const res = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/wallet-recharge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
    body: JSON.stringify({ amount }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erreur de recharge' }));
    throw new Error(err.error || err.message || `Erreur de recharge (${res.status})`);
  }

  return res.json();
}

export async function getPaymentMethods() {
  return [
    { id: 'MONEY_FUSION', name: 'Money Fusion', icon: 'flash-outline', description: 'Mobile Money, Carte bancaire via Money Fusion', category: 'online' },
  ];
}
