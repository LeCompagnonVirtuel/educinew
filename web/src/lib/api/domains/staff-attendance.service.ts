import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbStaffAttendance = {
  async getRecords(filters?: { staffId?: string; date?: string; startDate?: string; endDate?: string }) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let query = supabase
      .from('staff_attendance')
      .select('*, staff:staff(*, user:users(*))')
      .eq('school_id', schoolId);
    if (filters?.staffId) query = query.eq('staff_id', filters.staffId);
    if (filters?.date) query = query.eq('date', filters.date);
    if (filters?.startDate) query = query.gte('date', filters.startDate);
    if (filters?.endDate) query = query.lte('date', filters.endDate);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data || []);
  },

  async getTodayRecords() {
    const today = new Date().toISOString().split('T')[0];
    return this.getRecords({ date: today });
  },

  async getMyTodayRecord() {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];
    const { data: staff } = await supabase
      .from('staff')
      .select('id')
      .eq('user_id', user.id)
      .single();
    if (!staff) throw new Error('Profil personnel non trouvé');

    let query = supabase
      .from('staff_attendance')
      .select('*')
      .eq('staff_id', staff.id)
      .eq('date', today);
    if (schoolId) query = query.eq('school_id', schoolId);
    const { data, error } = await query.single();
    if (error && error.code !== 'PGRST116') throw error;
    return data ? camel(data) : null;
  },

  async checkIn(staffId: string, method: string = 'GPS', lat?: number, lng?: number) {
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];

    const { data: staff } = await supabase
      .from('staff')
      .select('school_id')
      .eq('id', staffId)
      .single();
    if (!staff) throw new Error('Membre du personnel non trouvé');

    const { data, error } = await supabase
      .from('staff_attendance')
      .upsert({
        staff_id: staffId,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        school_id: staff.school_id,
        date: today,
        check_in_time: new Date().toISOString(),
        status: 'PRESENT',
        method,
        latitude: lat || null,
        longitude: lng || null,
        recorded_by_type: 'SELF',
      }, { onConflict: 'staff_id,date' })
      .select()
      .single();
    if (error) throw error;
    return camel(data);
  },

  async checkOut(staffId: string) {
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('staff_attendance')
      .update({ check_out_time: new Date().toISOString() })
      .eq('staff_id', staffId)
      .eq('date', today)
      .select()
      .single();
    if (error) throw error;
    return camel(data);
  },

  async startBreak(staffId: string) {
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('staff_attendance')
      .update({ break_start: new Date().toISOString() })
      .eq('staff_id', staffId)
      .eq('date', today)
      .select()
      .single();
    if (error) throw error;
    return camel(data);
  },

  async endBreak(staffId: string) {
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('staff_attendance')
      .update({ break_end: new Date().toISOString() })
      .eq('staff_id', staffId)
      .eq('date', today)
      .select()
      .single();
    if (error) throw error;
    return camel(data);
  },

  async recordServiceStart(staffId: string) {
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('staff_attendance')
      .update({ service_start: new Date().toISOString() })
      .eq('staff_id', staffId)
      .eq('date', today)
      .select()
      .single();
    if (error) throw error;
    return camel(data);
  },

  async recordReprise(staffId: string) {
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('staff_attendance')
      .update({ reprise_time: new Date().toISOString() })
      .eq('staff_id', staffId)
      .eq('date', today)
      .select()
      .single();
    if (error) throw error;
    return camel(data);
  },

  async getDailyStats(date?: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const targetDate = date || new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('staff_attendance')
      .select('status')
      .eq('school_id', schoolId)
      .eq('date', targetDate);
    if (error) throw error;

    const total = data.length;
    const present = data.filter((r: any) => r.status === 'PRESENT').length;
    const late = data.filter((r: any) => r.status === 'LATE').length;
    const absent = data.filter((r: any) => r.status === 'ABSENT').length;
    const departed = data.filter((r: any) => r.status === 'DEPARTED').length;
    const onBreak = data.filter((r: any) => r.status === 'ON_BREAK').length;

    return {
      total,
      present,
      late,
      absent,
      departed,
      onBreak,
      rate: total > 0 ? Math.round((present / total) * 100) : 0,
    };
  },

  async getMonthlyStats(staffId: string, month: number, year: number) {
    const supabase = getSupabase();
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endMonth = month === 12 ? 1 : month + 1;
    const endYear = month === 12 ? year + 1 : year;
    const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`;

    const { data, error } = await supabase
      .from('staff_attendance')
      .select('status, date')
      .eq('staff_id', staffId)
      .gte('date', startDate)
      .lt('date', endDate);
    if (error) throw error;

    const total = data.length;
    const present = data.filter((r: any) => r.status === 'PRESENT').length;
    const late = data.filter((r: any) => r.status === 'LATE').length;
    const absent = data.filter((r: any) => r.status === 'ABSENT').length;

    return {
      total,
      present,
      late,
      absent,
      rate: total > 0 ? Math.round((present / total) * 100) : 0,
    };
  },

  async recordBySurveillant(staffId: string, action: 'ARRIVAL' | 'DEPARTURE' | 'ABSENCE') {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data, error } = await supabase.rpc('record_staff_attendance_by_surveillant', {
      p_staff_id: staffId,
      p_action: action,
      p_operator_id: user.id,
    });
    if (error) throw error;
    return data;
  },
};
