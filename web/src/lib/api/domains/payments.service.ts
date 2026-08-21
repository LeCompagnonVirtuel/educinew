import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbPayments = {
  async list(filters?: { studentId?: string; status?: string }) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let query = supabase
      .from('payments')
      .select('*, student:students(*, user:users!students_user_id_fkey(*))');
    if (schoolId) query = query.eq('school_id', schoolId);
    if (filters?.studentId) query = query.eq('student_id', filters.studentId);
    if (filters?.status) query = query.eq('status', filters.status);
    const { data, error } = await query;
    if (error) throw error;
    return camel(data);
  },

  async create(data: any) {
    const supabase = getSupabase();
    const schoolId = data.schoolId || data.school_id || await getAuthenticatedSchoolId();
    if (!schoolId) throw new Error('Établissement non identifié');

    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) throw new Error('Le montant doit être supérieur à 0');
    if (!data.student_id && !data.studentId) throw new Error('Élève requis');

    const reference = data.reference || `PAY-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 6)}`;

    const { data: payment, error } = await supabase
      .from('payments')
      .insert({
        student_id: data.student_id || data.studentId,
        school_id: schoolId,
        amount,
        payment_method: data.payment_method || data.paymentMethod || 'CASH',
        status: data.status || 'PENDING',
        reference,
        invoice_id: data.invoice_id || data.invoiceId || null,
        payment_date: data.payment_date || new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw new Error(`Erreur enregistrement paiement: ${error.message}`);
    return payment;
  },

  async updateStatus(id: string, status: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    if (schoolId) {
      const { data: existing } = await supabase.from('payments').select('school_id').eq('id', id).single();
      if (existing && existing.school_id !== schoolId) throw new Error('Accès non autorisé à ce paiement');
    }
    const { data, error } = await supabase
      .from('payments')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getStats(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase
      .from('payments')
      .select('amount, status, created_at');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query;
    if (error) throw error;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const totalRevenue = data.reduce((sum: number, p: any) => sum + (p.status === 'COMPLETED' ? (p.amount || 0) : 0), 0);
    const pendingAmount = data.filter((p: any) => p.status === 'PENDING').reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
    const monthlyRevenue = data
      .filter((p: any) => p.status === 'COMPLETED' && p.created_at >= startOfMonth)
      .reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
    const completedCount = data.filter((p: any) => p.status === 'COMPLETED').length;
    const paymentRate = data.length > 0 ? Math.round((completedCount / data.length) * 100) : 0;

    return { total: totalRevenue, completed: totalRevenue, pending: pendingAmount, totalRevenue, pendingAmount, monthlyRevenue, paymentRate };
  },

  async listBySchool(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase
      .from('payments')
      .select('*, student:students(*, user:users!students_user_id_fkey(*))');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data);
  },

  async getInvoices(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase
      .from('invoices')
      .select('*, student:students(*, user:users!students_user_id_fkey(*))');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data || []);
  },
};

export const sbInvoices = {
  async list(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase
      .from('invoices')
      .select('*, student:students(*, user:users!students_user_id_fkey(*))');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data || []);
  },

  async create(data: any) {
    const supabase = getSupabase();
    const schoolId = data.schoolId || data.school_id || await getAuthenticatedSchoolId();
    if (!schoolId) throw new Error('Établissement non identifié');
    if (!data.student_id && !data.studentId) throw new Error('Élève requis');

    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) throw new Error('Le montant doit être supérieur à 0');

    const { data: invoice, error } = await supabase
      .from('invoices')
      .insert({
        school_id: schoolId,
        student_id: data.student_id || data.studentId,
        amount,
        final_amount: data.final_amount || data.finalAmount || amount,
        discount_amount: data.discount_amount || data.discountAmount || 0,
        type: data.type || 'SCOLARITE',
        status: data.status || 'UNPAID',
        due_date: data.due_date || data.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        description: data.description || null,
        fee_category_id: data.fee_category_id || data.feeCategoryId || null,
        tuition_plan_id: data.tuition_plan_id || data.tuitionPlanId || null,
      })
      .select()
      .single();
    if (error) throw new Error(`Erreur création facture: ${error.message}`);
    return invoice;
  },

  async update(id: string, data: any) {
    const supabase = getSupabase();
    const updateData: any = {};
    if (data.status) updateData.status = data.status;
    if (data.paid_amount !== undefined) updateData.paid_amount = data.paid_amount;
    if (data.due_date) updateData.due_date = data.due_date;
    if (data.description) updateData.description = data.description;

    const { data: invoice, error } = await supabase
      .from('invoices')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return invoice;
  },
};

export const sbFinance = {
  async getStats(periodId?: string) {
    const supabase = getSupabase();
    const sid = await getAuthenticatedSchoolId();
    let query = supabase
      .from('payments')
      .select('amount, status, created_at');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query;
    if (error) throw error;
    const totalRevenue = data.reduce((s: number, p: any) => s + (p.status === 'COMPLETED' ? p.amount : 0), 0);
    const totalPending = data.reduce((s: number, p: any) => s + (p.status === 'PENDING' ? p.amount : 0), 0);
    return { totalRevenue, totalExpenses: 0, netIncome: totalRevenue, collectionRate: data.length > 0 ? Math.round((data.filter((p: any) => p.status === 'COMPLETED').length / data.length) * 100) : 0 };
  },

  async getInvoices(status?: string, studentId?: string) {
    const supabase = getSupabase();
    const sid = await getAuthenticatedSchoolId();
    let query = supabase
      .from('invoices')
      .select('*, student:students(*, user:users!students_user_id_fkey(*))');
    if (sid) query = query.eq('school_id', sid);
    if (status) query = query.eq('status', status);
    if (studentId) query = query.eq('student_id', studentId);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data || []);
  },
};
