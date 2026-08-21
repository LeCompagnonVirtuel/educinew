import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbParent = {
  async getChildren(parentUserId: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();

    // Try new parent_students relation first
    const { data: parentRecord } = await supabase
      .from('parents')
      .select('id')
      .eq('user_id', parentUserId)
      .single();

    if (parentRecord) {
      const { data, error } = await supabase
        .from('parent_students')
        .select('*, student:students(*, user:users!students_user_id_fkey(*), class:classes(*))')
        .eq('parent_id', parentRecord.id);
      if (error) throw error;
      const students = (data || []).map((ps: any) => ps.student).filter(Boolean);
      if (schoolId) {
        return camel(students.filter((s: any) => s.school_id === schoolId));
      }
      return camel(students);
    }

    // Fallback: legacy parent_id on students
    let query = supabase
      .from('students')
      .select('*, user:users(*), class:classes(*)')
      .eq('parent_id', parentUserId);
    if (schoolId) query = query.eq('school_id', schoolId);
    const { data, error } = await query;
    if (error) throw error;
    return camel(data);
  },

  async getPaymentHistory(parentUserId?: string) {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    const pid = parentUserId || user?.id;
    if (!pid) return [];

    // Get children IDs
    const children = await sbParent.getChildren(pid);
    const childIds = (children || []).map((c: any) => c.id);
    if (childIds.length === 0) return [];

    const { data, error } = await supabase
      .from('payments')
      .select('*, student:students(*, user:users!students_user_id_fkey(*))')
      .in('student_id', childIds)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data);
  },

  async getChildAttendance(studentId: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let query = supabase
      .from('attendance_events')
      .select('*')
      .eq('user_id', studentId);
    if (schoolId) query = query.eq('school_id', schoolId);
    const { data, error } = await query.order('scan_time', { ascending: false }).limit(30);
    if (error) throw error;
    return camel(data);
  },

  async getNotifications(parentUserId?: string) {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    const pid = parentUserId || user?.id;
    if (!pid) return [];
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', pid)
      .order('created_at', { ascending: false })
      .limit(20);
    if (error) throw error;
    return camel(data);
  },

  async getWallet(parentUserId?: string) {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    const pid = parentUserId || user?.id;
    if (!pid) return { balance: 0, currency: 'FCFA', transactions: [] };

    const { data: wallet, error } = await supabase
      .from('wallets')
      .select('*, transactions:wallet_transactions(*)')
      .eq('user_id', pid)
      .single();

    if (error || !wallet) {
      return { balance: 0, currency: 'FCFA', transactions: [] };
    }

    return camel({
      balance: wallet.balance || 0,
      bonusBalance: wallet.bonus_balance || 0,
      currency: 'FCFA',
      transactions: (wallet.transactions || []).map((t: any) => ({
        id: t.id,
        type: t.type,
        amount: t.amount,
        description: t.description,
        createdAt: t.created_at,
      })),
    });
  },

  async initiatePayment(invoiceId: string, method: string, amount?: number) {
    const supabase = getSupabase();
    const { data: { session } } = await supabase.auth.getSession();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const res = await fetch(`${url}/functions/v1/payment-initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ invoiceId, method, amount }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Erreur de paiement');
    }
    return res.json();
  },

  async getReceipt(paymentId: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('payments')
      .select('*, student:students(*, user:users!students_user_id_fkey(*), class:classes(*)), invoice:invoices(*)')
      .eq('id', paymentId)
      .single();
    if (error) throw error;

    let school = null;
    if (data.school_id) {
      const { data: schoolData } = await supabase
        .from('schools')
        .select('id, name, logo_url, address, phone, email')
        .eq('id', data.school_id)
        .single();
      school = schoolData;
    }

    return camel({ ...data, school });
  },

  async getInvoices(parentUserId?: string) {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    const pid = parentUserId || user?.id;
    if (!pid) return [];

    const children = await sbParent.getChildren(pid);
    const childIds = (children || []).map((c: any) => c.id);
    if (childIds.length === 0) return [];

    const { data, error } = await supabase
      .from('invoices')
      .select('*, feeCategory:fee_categories(*), student:students(*, user:users!students_user_id_fkey(*), class:classes(*))')
      .in('student_id', childIds)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data);
  },
};
