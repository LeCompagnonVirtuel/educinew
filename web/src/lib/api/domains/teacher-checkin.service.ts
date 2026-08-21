import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbTeacherCheckin = {
  async getRecords(filters?: { teacherId?: string; date?: string }) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let query = supabase
      .from('teacher_attendance')
      .select('*');
    if (schoolId) query = query.eq('school_id', schoolId);
    if (filters?.teacherId) query = query.eq('teacher_id', filters.teacherId);
    if (filters?.date) query = query.eq('date', filters.date);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data || []);
  },

  async getMonthlyStats(teacherId: string, month: number, year: number) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endMonth = month === 12 ? 1 : month + 1;
    const endYear = month === 12 ? year + 1 : year;
    const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`;
    let query = supabase
      .from('teacher_attendance')
      .select('status, date')
      .eq('teacher_id', teacherId)
      .gte('date', startDate)
      .lt('date', endDate);
    if (schoolId) query = query.eq('school_id', schoolId);
    const { data, error } = await query;
    if (error) throw error;
    const total = data.length;
    const present = data.filter((r: any) => r.status === 'PRESENT').length;
    const late = data.filter((r: any) => r.status === 'LATE').length;
    const absent = data.filter((r: any) => r.status === 'ABSENT').length;
    return { total, present, late, absent, rate: total > 0 ? Math.round((present / total) * 100) : 0 };
  },

  async checkinGPS(teacherId: string, lat: number, lng: number) {
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];
    const { data: teacher } = await supabase
      .from('teachers')
      .select('school_id')
      .eq('id', teacherId)
      .single();
    const { data, error } = await supabase
      .from('teacher_attendance')
      .upsert({
        teacher_id: teacherId,
        date: today,
        status: 'PRESENT',
        check_in_time: new Date().toISOString(),
        latitude: lat,
        longitude: lng,
        school_id: teacher?.school_id,
      }, { onConflict: 'teacher_id,date' })
      .select()
      .single();
    if (error) throw error;
    return camel(data);
  },

  async validateGPS(teacherId: string, lat: number, lng: number) {
    return sbTeacherCheckin.checkinGPS(teacherId, lat, lng);
  },

  async checkout(teacherId: string) {
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('teacher_attendance')
      .update({ check_out_time: new Date().toISOString() })
      .eq('teacher_id', teacherId)
      .eq('date', today)
      .select()
      .single();
    if (error) throw error;
    return camel(data);
  },
};
