import { sbTeacherCheckin } from './supabase-client';
import { createClient } from '@/lib/supabase/client';

export const teacherCheckinApi = {
  teacherCheckinGPS(teacherId: string, latitude: number, longitude: number) {
    return sbTeacherCheckin.checkinGPS(teacherId, latitude, longitude) as Promise<any>;
  },

  async teacherCheckinQR(teacherId: string, qrCode: string) {
    const supabase = createClient();
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
        method: 'QR',
        school_id: teacher?.school_id,
      }, { onConflict: 'teacher_id,date' })
      .select()
      .single();
    if (error) throw error;
    return data as any;
  },

  async teacherCheckinFace(teacherId: string, faceMatchScore: number) {
    const supabase = createClient();
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
        method: 'FACE',
        face_match_score: faceMatchScore,
        school_id: teacher?.school_id,
      }, { onConflict: 'teacher_id,date' })
      .select()
      .single();
    if (error) throw error;
    return data as any;
  },

  validateGPSPresence(teacherId: string, latitude: number, longitude: number) {
    return sbTeacherCheckin.validateGPS(teacherId, latitude, longitude) as Promise<any>;
  },

  teacherCheckout(teacherId: string, location?: { lat: number; lng: number }) {
    return sbTeacherCheckin.checkout(teacherId) as Promise<any>;
  },

  async getTeacherCheckinStatsBySchool(schoolId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('teacher_attendance')
      .select('status, date')
      .eq('school_id', schoolId);
    if (error) throw error;
    const total = (data || []).length;
    const present = (data || []).filter((r: any) => r.status === 'PRESENT').length;
    return {
      total,
      present,
      rate: total > 0 ? Math.round((present / total) * 100) : 0,
    } as any;
  },

  getTeacherCheckinRecords(filters: { date?: string; teacherId?: string; method?: string } = {}) {
    return sbTeacherCheckin.getRecords({ teacherId: filters.teacherId, date: filters.date }) as Promise<any[]>;
  },

  getTeacherMonthlyStats(teacherId: string, month: number, year: number) {
    return sbTeacherCheckin.getMonthlyStats(teacherId, month, year) as Promise<any>;
  },

  async getTeacherBadges(teacherId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('teacher_attendance')
      .select('status, date')
      .eq('teacher_id', teacherId);
    if (error) throw error;
    const records = data || [];
    const totalCheckins = records.length;
    const streak = records.reduce((acc: number, r: any, i: number) => {
      if (i === 0) return r.status === 'PRESENT' ? 1 : 0;
      return r.status === 'PRESENT' ? acc + 1 : acc;
    }, 0);
    return { totalCheckins, streak, badges: streak >= 5 ? ['Consistent'] : [] } as any;
  },

  async checkTimetableConflict(teacherId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('timetable_slots')
      .select('*, subject:subjects(*), class:classes(*)')
      .eq('teacher_id', teacherId);
    if (error) throw error;
    return (data || []) as any[];
  },
};
