import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbSurveillance = {
  async scanStudentQR(qrCode: string, operatorId: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();

    const { data: qrRecord, error: qrError } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('qr_data', qrCode)
      .eq('school_id', schoolId)
      .eq('user_type', 'student')
      .eq('is_active', true)
      .single();
    if (qrError || !qrRecord) throw new Error('QR Code invalide ou inactif');

    const today = new Date().toISOString().split('T')[0];

    const { data: existing } = await supabase
      .from('attendance')
      .select('id')
      .eq('student_id', qrRecord.user_id)
      .eq('date', today)
      .single();
    if (existing) throw new Error('Pointage déjà effectué pour aujourd\'hui');

    const { data, error } = await supabase
      .from('attendance')
      .insert({
        student_id: qrRecord.user_id,
        school_id: schoolId,
        date: today,
        status: 'PRESENT',
        method: 'QR',
        operator: operatorId,
      })
      .select()
      .single();
    if (error) throw error;

    await supabase.from('attendance_events').insert({
      school_id: schoolId,
      student_id: qrRecord.user_id,
      user_id: qrRecord.user_id,
      event_type: 'ARRIVAL',
      scanned_by: operatorId,
      qr_code_id: qrRecord.id,
    });

    return camel(data);
  },

  async scanStaffQR(qrCode: string, operatorId: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();

    const { data: qrRecord, error: qrError } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('qr_data', qrCode)
      .eq('school_id', schoolId)
      .eq('is_active', true)
      .single();
    if (qrError || !qrRecord) throw new Error('QR Code invalide ou inactif');

    const { data: staff } = await supabase
      .from('staff')
      .select('id')
      .eq('user_id', qrRecord.user_id)
      .eq('school_id', schoolId)
      .single();
    if (!staff) throw new Error('Membre du personnel non trouvé');

    const { data, error } = await supabase.rpc('record_staff_attendance_by_surveillant', {
      p_staff_id: staff.id,
      p_action: 'ARRIVAL',
      p_operator_id: operatorId,
    });
    if (error) throw error;
    return data;
  },

  async recordStudentArrival(studentId: string, operatorId: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];

    const { data: existing } = await supabase
      .from('attendance')
      .select('id')
      .eq('student_id', studentId)
      .eq('date', today)
      .single();
    if (existing) throw new Error('Pointage déjà effectué pour aujourd\'hui');

    const { data, error } = await supabase
      .from('attendance')
      .insert({
        student_id: studentId,
        school_id: schoolId,
        date: today,
        status: 'PRESENT',
        method: 'MANUAL',
        operator: operatorId,
      })
      .select()
      .single();
    if (error) throw error;
    return camel(data);
  },

  async recordStudentDeparture(studentId: string, operatorId: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];

    await supabase.from('attendance_events').insert({
      school_id: schoolId,
      student_id: studentId,
      user_id: studentId,
      event_type: 'DEPARTURE',
      scanned_by: operatorId,
    });

    return { success: true, message: 'Départ enregistré' };
  },

  async getStudentAttendance(date?: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const targetDate = date || new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('attendance')
      .select('*, student:students(*, user:users(*))')
      .eq('school_id', schoolId)
      .eq('date', targetDate)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data || []);
  },

  async getStaffAttendance(date?: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const targetDate = date || new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('staff_attendance')
      .select('*, staff:staff(*, user:users(*))')
      .eq('school_id', schoolId)
      .eq('date', targetDate)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data || []);
  },

  async getSurveillanceLog(filters?: { startDate?: string; endDate?: string; operatorId?: string }) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();

    let query = supabase
      .from('audit_logs')
      .select('*')
      .eq('school_id', schoolId)
      .like('action', '%SURVEILLANCE%');
    if (filters?.startDate) query = query.gte('created_at', filters.startDate);
    if (filters?.endDate) query = query.lte('created_at', filters.endDate);
    if (filters?.operatorId) query = query.eq('user_id', filters.operatorId);

    const { data, error } = await query.order('created_at', { ascending: false }).limit(100);
    if (error) throw error;
    return camel(data || []);
  },

  async getTodayStats() {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];

    const [studentRes, staffRes, visitorRes] = await Promise.all([
      supabase
        .from('attendance')
        .select('status')
        .eq('school_id', schoolId)
        .eq('date', today),
      supabase
        .from('staff_attendance')
        .select('status')
        .eq('school_id', schoolId)
        .eq('date', today),
      supabase
        .from('visitors')
        .select('status')
        .eq('school_id', schoolId)
        .gte('entry_time', `${today}T00:00:00`)
        .lt('entry_time', `${today}T23:59:59`),
    ]);

    const students = studentRes.data || [];
    const staff = staffRes.data || [];
    const visitors = visitorRes.data || [];

    return {
      students: {
        total: students.length,
        present: students.filter((s: any) => s.status === 'PRESENT').length,
        late: students.filter((s: any) => s.status === 'LATE').length,
        absent: students.filter((s: any) => s.status === 'ABSENT').length,
      },
      staff: {
        total: staff.length,
        present: staff.filter((s: any) => s.status === 'PRESENT').length,
        late: staff.filter((s: any) => s.status === 'LATE').length,
        absent: staff.filter((s: any) => s.status === 'ABSENT').length,
      },
      visitors: {
        total: visitors.length,
        inside: visitors.filter((v: any) => v.status === 'INSIDE').length,
        exited: visitors.filter((v: any) => v.status === 'EXITED').length,
      },
    };
  },
};
