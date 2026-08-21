import { supabase, camel, getUserSchoolId, getUserProfile } from './supabase';
import { cacheManager } from './cacheManager';

export async function getAttendance(filters: any = {}) {
  const schoolId = filters.schoolId || await getUserSchoolId();
  if (filters.classId) {
    const { data: classStudents } = await supabase.from('students').select('id').eq('class_id', filters.classId);
    const studentIds = (classStudents || []).map((s: any) => s.id);
    if (studentIds.length === 0) return [];
    let q = supabase.from('attendance').select('*, student:students(*, user:users(*))').in('student_id', studentIds);
    if (filters.date) q = q.eq('date', filters.date);
    const { data, error } = await q;
    if (error) throw error;
    return camel(data);
  }
  let q = supabase.from('attendance').select('*, student:students(*, user:users(*))');
  if (schoolId) q = q.eq('school_id', schoolId);
  if (filters.studentId) q = q.eq('student_id', filters.studentId);
  if (filters.date) q = q.eq('date', filters.date);
  const { data, error } = await q;
  if (error) throw error;
  return camel(data);
}

export async function getAttendanceStats(classId?: string) {
  if (classId) {
    const { data: classStudents } = await supabase.from('students').select('id').eq('class_id', classId);
    const studentIds = (classStudents || []).map((s: any) => s.id);
    if (studentIds.length === 0) return { total: 0, present: 0, rate: 0 };
    const [totalResult, presentResult] = await Promise.all([
      supabase.from('attendance').select('id', { count: 'exact', head: true }).in('student_id', studentIds),
      supabase.from('attendance').select('id', { count: 'exact', head: true }).in('student_id', studentIds).eq('status', 'PRESENT'),
    ]);
    const total = totalResult.count || 0;
    const present = presentResult.count || 0;
    return { total, present, rate: total > 0 ? Math.round((present / total) * 100) : 0 };
  }
  const schoolId = await getUserSchoolId();
  let totalQ = supabase.from('attendance').select('id', { count: 'exact', head: true });
  let presentQ = supabase.from('attendance').select('id', { count: 'exact', head: true }).eq('status', 'PRESENT');
  if (schoolId) { totalQ = totalQ.eq('school_id', schoolId); presentQ = presentQ.eq('school_id', schoolId); }
  const [totalResult, presentResult] = await Promise.all([totalQ, presentQ]);
  const total = totalResult.count || 0;
  const present = presentResult.count || 0;
  return { total, present, rate: total > 0 ? Math.round((present / total) * 100) : 0 };
}

export async function createAttendanceBulk(date: string, records: any[]) {
  await cacheManager.clear();
  const schoolId = await getUserSchoolId();
  const mapped = records.map(r => ({
    student_id: r.studentId,
    school_id: r.schoolId || schoolId,
    date,
    status: r.status,
    remark: r.remark || null,
  }));
  const { data, error } = await supabase.from('attendance').upsert(mapped, { onConflict: 'student_id,date' }).select();
  if (error) throw error;
  return data;
}

export async function getTodayAttendance(classId?: string) {
  const today = new Date().toISOString().split('T')[0];
  if (classId) {
    const { data: classStudents } = await supabase.from('students').select('id').eq('class_id', classId);
    const studentIds = (classStudents || []).map((s: any) => s.id);
    if (studentIds.length === 0) return [];
    const { data, error } = await supabase.from('attendance').select('*, student:students(*, user:users(*))').eq('date', today).in('student_id', studentIds);
    if (error) throw error;
    return camel(data || []);
  }
  const schoolId = await getUserSchoolId();
  let q = supabase.from('attendance').select('*, student:students(*, user:users(*))').eq('date', today);
  if (schoolId) q = q.eq('school_id', schoolId);
  const { data, error } = await q;
  if (error) throw error;
  return camel(data || []);
}

export async function scanStudentQR(qrCode: string, type = 'ARRIVAL') {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Non authentifié');

  const { data: { user } } = await supabase.auth.getUser();
  const res = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/scan-pointage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      qr_code: qrCode,
      scan_type: type,
      device_info: 'Mobile',
      operator_name: user?.user_metadata?.name || user?.email,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erreur scan' }));
    throw new Error(err.error || `Erreur HTTP ${res.status}`);
  }

  const data = await res.json();
  return {
    success: true,
    person: data.person,
    scan: data.scan,
    message: data.message,
  };
}

export async function getDailyQRCode() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Non authentifié');

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Non authentifié');
  const profile = await getUserProfile();
  const schoolId = profile?.school_id;
  if (!schoolId) throw new Error('Établissement non trouvé');

  const role = profile?.role || 'STUDENT';
  const userId = user.id;

  const res = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/generate-qr`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      user_id: userId,
      type: role === 'TEACHER' ? 'teacher' : 'student',
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erreur génération QR' }));
    throw new Error(err.error || `Erreur HTTP ${res.status}`);
  }

  const data = await res.json();
  return {
    qrCode: data.qr_data || data.data,
    qrUrl: data.qr_url || data.url,
    expiresAt: data.expires_at || new Date(Date.now() + 86400000).toISOString(),
  };
}

export async function staffCheckIn(staffId: string, method: string = 'GPS', latitude?: number, longitude?: number) {
  const today = new Date().toISOString().split('T')[0];
  const { data: { user } } = await supabase.auth.getUser();
  const { data: staff } = await supabase.from('staff').select('school_id').eq('id', staffId).single();
  if (!staff) throw new Error('Profil personnel non trouvé');

  const { data, error } = await supabase.from('staff_attendance').upsert({
    staff_id: staffId,
    user_id: user?.id,
    school_id: staff.school_id,
    date: today,
    check_in_time: new Date().toISOString(),
    status: 'PRESENT',
    method,
    latitude: latitude || null,
    longitude: longitude || null,
    recorded_by_type: 'SELF',
  }, { onConflict: 'staff_id,date' }).select().single();
  if (error) throw error;
  return { success: true, message: 'Arrivée enregistrée', ...camel(data) };
}

export async function staffCheckOut(staffId: string) {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase.from('staff_attendance').update({ check_out_time: new Date().toISOString() }).eq('staff_id', staffId).eq('date', today).select().single();
  if (error) throw error;
  return { success: true, ...camel(data) };
}

export async function staffStartBreak(staffId: string) {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase.from('staff_attendance').update({ break_start: new Date().toISOString() }).eq('staff_id', staffId).eq('date', today).select().single();
  if (error) throw error;
  return { success: true, ...camel(data) };
}

export async function staffEndBreak(staffId: string) {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase.from('staff_attendance').update({ break_end: new Date().toISOString() }).eq('staff_id', staffId).eq('date', today).select().single();
  if (error) throw error;
  return { success: true, ...camel(data) };
}

export async function getStaffTodayRecord() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Non authentifié');
  const { data: staff } = await supabase.from('staff').select('id').eq('user_id', user.id).single();
  if (!staff) return null;
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase.from('staff_attendance').select('*').eq('staff_id', staff.id).eq('date', today).single();
  if (error && error.code !== 'PGRST116') throw error;
  return data ? camel(data) : null;
}

export async function getStaffAttendanceHistory(staffId: string) {
  const { data, error } = await supabase.from('staff_attendance').select('*').eq('staff_id', staffId).order('created_at', { ascending: false }).limit(10);
  if (error) throw error;
  return camel(data || []);
}
