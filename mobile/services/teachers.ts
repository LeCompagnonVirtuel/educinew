import { supabase, camel, getUserSchoolId, getAuthCookies } from './supabase';
import { cached } from './base';
import { cacheManager } from './cacheManager';

export async function getTeachers(schoolId?: string) {
  const sid = schoolId || await getUserSchoolId();
  return cached(`teachers_${sid}`, 300000, async () => {
    let q = supabase.from('teachers').select('*, user:users(*)');
    if (sid) q = q.eq('school_id', sid);
    const { data, error } = await q;
    if (error) throw error;
    return camel(data);
  });
}

export async function getTeacher(id: string) {
  const { data, error } = await supabase.from('teachers').select('*, user:users(*), subject:subjects(*)').eq('id', id).single();
  if (error) throw error;
  return camel(data);
}

export async function createTeacher(teacherData: { firstName: string; lastName: string; email: string; phone?: string; subjectId?: string; password?: string }) {
  await cacheManager.clear();
  const cookies = await getAuthCookies();

  const apiBase = process.env.EXPO_PUBLIC_API_URL || process.env.EXPO_PUBLIC_SITE_URL;
  if (!apiBase) throw new Error('URL API non configurée');

  const res = await fetch(`${apiBase}/api/admin/create-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies,
    },
    body: JSON.stringify({
      name: `${teacherData.firstName} ${teacherData.lastName}`,
      email: teacherData.email,
      role: 'TEACHER',
      phone: teacherData.phone || null,
      subjectId: teacherData.subjectId || null,
    }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error || result.message || 'Erreur création enseignant');

  const { data: teacher, error } = await supabase
    .from('teachers')
    .select('*, user:users(*)')
    .eq('user_id', result.user.id)
    .single();
  if (error) throw error;
  return camel(teacher);
}

export async function updateTeacher(id: string, updates: { firstName?: string; lastName?: string; email?: string; phone?: string; subjectId?: string }) {
  await cacheManager.clear();
  const fields: any = {};
  if (updates.firstName) fields.first_name = updates.firstName;
  if (updates.lastName) fields.last_name = updates.lastName;
  if (updates.email) fields.email = updates.email;
  if (updates.phone !== undefined) fields.phone = updates.phone;
  if (updates.subjectId !== undefined) fields.subject_id = updates.subjectId || null;
  const { data: teacher, error } = await supabase.from('teachers').update(fields).eq('id', id).select('*, user:users(*)').single();
  if (error) throw error;
  return camel(teacher);
}

export async function deleteTeacher(id: string) {
  await cacheManager.clear();
  const { error } = await supabase.from('teachers').delete().eq('id', id);
  if (error) throw error;
}

export async function getTeacherSchedule(teacherId: string) {
  const schoolId = await getUserSchoolId();
  let q = supabase.from('timetable_slots').select('*, subject:subjects(*), class:classes(*)').eq('teacher_id', teacherId);
  if (schoolId) q = q.eq('school_id', schoolId);
  const { data, error } = await q;
  if (error) throw error;
  return camel(data);
}

export async function getTeacherClasses(teacherId: string) {
  const schoolId = await getUserSchoolId();
  let q = supabase.from('class_subjects').select('class:classes(*)').eq('teacher_id', teacherId);
  if (schoolId) q = q.eq('school_id', schoolId);
  const { data, error } = await q;
  if (error) throw error;
  return camel((data || []).map((d: any) => d.class).filter(Boolean));
}

export async function getTeacherDashboardQuickActions() {
  return [
    { id: '1', icon: 'people', label: 'Mes classes', screen: 'TeacherClasses' },
    { id: '2', icon: 'check-circle', label: 'Présences', screen: 'TeacherAttendance' },
    { id: '3', icon: 'grade', label: 'Notes', screen: 'TeacherGrades' },
    { id: '4', icon: 'schedule', label: 'Emploi du temps', screen: 'TeacherSchedule' },
  ];
}

export async function getTeacherRecentMessages(_teacherId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase.from('messages')
    .select('*, sender:users!messages_sender_id_fkey(*), receiver:users!messages_receiver_id_fkey(*)')
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
    .order('created_at', { ascending: false })
    .limit(5);
  if (error) throw error;
  return camel(data);
}

export async function getTeacherAttendanceStats(teacherId: string) {
  const { data } = await supabase.from('teacher_attendance').select('status').eq('teacher_id', teacherId);
  const total = data?.length || 0;
  const present = data?.filter(r => r.status === 'PRESENT').length || 0;
  const late = data?.filter(r => r.status === 'LATE').length || 0;
  return { total, present, late, rate: total > 0 ? Math.round((present / total) * 100) : 0 };
}

export async function getTeacherDashboardStats(teacherId: string) {
  const { data } = await supabase.from('teacher_attendance').select('status').eq('teacher_id', teacherId);
  const total = data?.length || 0;
  const present = data?.filter(r => r.status === 'PRESENT').length || 0;
  return { total, present, rate: total > 0 ? Math.round((present / total) * 100) : 0 };
}

export async function getTeacherRecentActions(teacherId: string) {
  const { data, error } = await supabase
    .from('teacher_attendance')
    .select('*')
    .eq('teacher_id', teacherId)
    .order('created_at', { ascending: false })
    .limit(5);
  if (error) throw error;
  return camel(data || []);
}

export async function teacherCheckinGPS(teacherId: string, latitude: number, longitude: number) {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase.from('teacher_attendance').upsert({ teacher_id: teacherId, date: today, status: 'PRESENT', check_in_time: new Date().toISOString(), latitude, longitude }, { onConflict: 'teacher_id,date' }).select().single();
  if (error) throw error;
  return { success: true, message: 'Arrivée enregistrée', ...camel(data) };
}

export async function teacherCheckinQR(teacherId: string, qrCode: string) {
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
      scan_type: 'ARRIVAL',
      device_info: 'Mobile',
      operator_name: user?.user_metadata?.name || user?.email,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erreur pointage' }));
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

export async function teacherCheckinFace(_teacherId: string, _score: number) {
  throw new Error('La reconnaissance faciale n\'est pas encore disponible. Utilisez le pointage GPS ou QR code.');
}

export async function teacherCheckout(teacherId: string) {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase.from('teacher_attendance').update({ check_out_time: new Date().toISOString() }).eq('teacher_id', teacherId).eq('date', today).select().single();
  if (error) throw error;
  return { success: true, ...camel(data) };
}

export async function validateTeacherPresence(latitude: number, longitude: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Non authentifié');
  const { data: teacher } = await supabase.from('teachers').select('id').eq('user_id', user.id).single();
  if (!teacher) throw new Error('Profil enseignant non trouvé');
  return teacherCheckinGPS(teacher.id, latitude, longitude);
}

export async function getTeacherCheckinStats(schoolId: string) {
  const { data } = await supabase.from('teacher_attendance').select('status').eq('school_id', schoolId);
  const total = data?.length || 0;
  const present = data?.filter(r => r.status === 'PRESENT').length || 0;
  return { total, present, rate: total > 0 ? Math.round((present / total) * 100) : 0 };
}

export async function getTeacherCheckinRecords(filters: any = {}) {
  let q = supabase.from('teacher_attendance').select('*');
  if (filters.teacherId) q = q.eq('teacher_id', filters.teacherId);
  if (filters.date) q = q.eq('date', filters.date);
  const { data, error } = await q.order('created_at', { ascending: false });
  if (error) throw error;
  return camel(data || []);
}

export async function getTeacherMonthlyStats(teacherId: string, month: number, year: number) {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endMonth = month === 12 ? 1 : month + 1;
  const endYear = month === 12 ? year + 1 : year;
  const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`;
  const { data } = await supabase.from('teacher_attendance').select('status').eq('teacher_id', teacherId).gte('date', startDate).lt('date', endDate);
  const total = data?.length || 0;
  const present = data?.filter(r => r.status === 'PRESENT').length || 0;
  return { totalDays: total, presentDays: present, lateDays: data?.filter(r => r.status === 'LATE').length || 0, punctualityScore: total > 0 ? Math.round((present / total) * 100) : 100 };
}

export async function getTeacherBadges(teacherId: string) {
  const { data, error } = await supabase.from('teacher_badges').select('*').eq('teacher_id', teacherId).order('earned_at', { ascending: false });
  if (error) throw error;
  return camel(data || []);
}

export async function checkTimetableConflict(teacherId: string, day?: string, startTime?: string, endTime?: string) {
  let query = supabase
    .from('timetable_slots')
    .select('*')
    .eq('teacher_id', teacherId);
  if (day) query = query.eq('day_of_week', day);
  const { data, error } = await query;
  if (error) throw error;
  if (startTime && endTime && data) {
    const conflict = data.some((slot: any) =>
      slot.day_of_week === day &&
      startTime < slot.end_time && endTime > slot.start_time
    );
    return { conflict };
  }
  return { conflict: false };
}

export async function getTeacherAssignments(teacherId: string) {
  const { data, error } = await supabase.from('assignments').select('*, subject:subjects(*), class:classes(*)').eq('teacher_id', teacherId).order('created_at', { ascending: false });
  if (error) throw error;
  return camel(data || []);
}

export async function createAssignment(assignment: { title: string; description?: string; subject_id: string; class_id: string; due_date: string; teacher_id: string; school_id: string }) {
  const { data, error } = await supabase.from('assignments').insert(assignment).select().single();
  if (error) throw error;
  return data;
}

export async function updateAssignment(id: string, updates: { title?: string; description?: string; subject_id?: string; class_id?: string; due_date?: string }) {
  const { data, error } = await supabase.from('assignments').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteAssignment(id: string) {
  const { error } = await supabase.from('assignments').delete().eq('id', id);
  if (error) throw error;
}
