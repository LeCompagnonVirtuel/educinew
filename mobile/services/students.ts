import { supabase, camel, getUserSchoolId, getAuthCookies } from './supabase';
import { cached } from './base';
import { cacheManager } from './cacheManager';

export async function getStudents(schoolId?: string) {
  const sid = schoolId || await getUserSchoolId();
  return cached(`students_${sid}`, 300000, async () => {
    let q = supabase.from('students').select('*, user:users(*), class:classes(*)');
    if (sid) q = q.eq('school_id', sid);
    const { data, error } = await q;
    if (error) throw error;
    return camel(data);
  });
}

export async function getStudent(id: string) {
  const { data, error } = await supabase.from('students').select('*, user:users(*), class:classes(*)').eq('id', id).single();
  if (error) throw error;
  return camel(data);
}

export async function createStudent(studentData: { firstName: string; lastName: string; email?: string; phone?: string; classId?: string; matricule?: string; password?: string }) {
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
      name: `${studentData.firstName} ${studentData.lastName}`,
      email: studentData.email || undefined,
      role: 'STUDENT',
      phone: studentData.phone || null,
      classId: studentData.classId || null,
      matricule: studentData.matricule || null,
    }),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || result.message || 'Erreur création élève');

  const { data: student, error } = await supabase
    .from('students')
    .select('*, user:users(*), class:classes(*)')
    .eq('user_id', result.user.id)
    .single();
  if (error) throw error;
  return camel(student);
}

export async function updateStudent(id: string, updates: { firstName?: string; lastName?: string; classId?: string; matricule?: string; phone?: string }) {
  await cacheManager.clear();
  const fields: any = {};
  if (updates.firstName) fields.first_name = updates.firstName;
  if (updates.lastName) fields.last_name = updates.lastName;
  if (updates.classId !== undefined) fields.class_id = updates.classId || null;
  if (updates.matricule !== undefined) fields.matricule = updates.matricule;
  if (updates.phone !== undefined) fields.phone = updates.phone;
  const { data: student, error } = await supabase.from('students').update(fields).eq('id', id).select('*, user:users(*), class:classes(*)').single();
  if (error) throw error;
  return camel(student);
}

export async function deleteStudent(id: string) {
  await cacheManager.clear();
  const { error } = await supabase.from('students').delete().eq('id', id);
  if (error) throw error;
}

export async function getStudentPerformance(id: string) {
  const { data, error } = await supabase.from('grades').select('*, subject:subjects(*), period:periods(*)').eq('student_id', id);
  if (error) throw error;
  return camel(data);
}

export async function getParentChildren(parentId: string) {
  const { data, error } = await supabase.from('students').select('*, user:users(*), class:classes(*), school:schools(name)').eq('parent_id', parentId);
  if (error) throw error;
  return camel(data);
}

export async function getChildGrades(studentId: string, _period?: string) {
  const { data, error } = await supabase.from('grades')
    .select('*, subject:subjects(name, coefficient)')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });
  if (error) throw error;

  const grades = camel(data || []);
  const subjectMap: Record<string, any> = {};
  for (const g of grades) {
    const name = g.subject?.name || 'Sans matière';
    if (!subjectMap[name]) {
      subjectMap[name] = { subject: name, coefficient: g.subject?.coefficient || 1, grades: [] };
    }
    subjectMap[name].grades.push({
      id: g.id, subject: name, grade: g.score || 0, maxGrade: g.maxScore || 20,
      coefficient: g.coefficient || 1, date: g.createdAt || g.created_at,
      type: g.type || 'Devoir', comment: g.comment, teacherName: g.teacherName,
    });
  }

  const subjects = Object.values(subjectMap).map((s: any) => ({
    ...s,
    average: s.grades.length > 0 ? s.grades.reduce((sum: number, g: any) => sum + (g.grade / g.maxGrade * 20), 0) / s.grades.length : 0,
  }));

  const allGrades = grades.filter((g: any) => g.score != null && g.maxScore);
  const totalAvg = allGrades.length > 0 ? allGrades.reduce((s: number, g: any) => s + (g.score / g.maxScore * 20), 0) / allGrades.length : 0;

  return { subjects, average: totalAvg };
}

export async function getChildAttendance(studentId: string) {
  const { data, error } = await supabase.from('attendance')
    .select('*')
    .eq('student_id', studentId)
    .order('date', { ascending: false })
    .limit(60);
  if (error) throw error;

  const records = (data || []).map((r: any) => ({
    id: r.id, date: r.date, status: r.status || 'PRESENT',
    arrivalTime: r.check_in_time, departureTime: r.check_out_time, reason: r.reason,
  }));

  const total = records.length;
  const present = records.filter((r: any) => r.status === 'PRESENT').length;
  const absent = records.filter((r: any) => r.status === 'ABSENT').length;
  const late = records.filter((r: any) => r.status === 'LATE').length;
  const rate = total > 0 ? Math.round((present / total) * 100) : 100;

  return { records, stats: { totalDays: total, present, absent, late, rate } };
}

export async function getChildSchedule(studentId: string) {
  const { data: student } = await supabase.from('students').select('class_id').eq('id', studentId).single();
  if (!student?.class_id) return [];

  const { data, error } = await supabase.from('timetable_slots')
    .select('*, subject:subjects(name), teacher:teachers(*, user:users(name))')
    .eq('class_id', student.class_id)
    .order('start_time', { ascending: true });
  if (error) return [];

  return (data || []).map((s: any) => ({
    id: s.id, day: s.day || s.day_of_week,
    startTime: s.start_time, endTime: s.end_time,
    subject: s.subject?.name || 'Cours', teacherName: s.teacher?.user?.name || '',
    room: s.room,
  }));
}

export async function getChildDocuments(studentId: string) {
  const { data: student } = await supabase.from('students').select('school_id').eq('id', studentId).single();
  if (!student) return [];

  const { data, error } = await supabase.from('documents')
    .select('*')
    .or(`student_id.eq.${studentId},and(school_id.eq.${student.school_id},is_public.eq.true)`)
    .order('created_at', { ascending: false });
  if (error) return [];

  return (data || []).map((d: any) => ({
    id: d.id, title: d.title || d.name, type: d.type || 'other',
    url: d.url || d.file_url, date: d.created_at,
    size: d.size, period: d.period,
  }));
}

export async function getStudentAttendanceByUser(userId: string) {
  const { data: student } = await supabase.from('students').select('id').eq('user_id', userId).single();
  if (!student) return { records: [], stats: { totalDays: 0, present: 0, absent: 0, late: 0, rate: 100 } };
  return getChildAttendance(student.id);
}

export async function getStudentBulletinsSummary(studentId: string) {
  const { data, error } = await supabase.from('grades').select('score, subject:subjects(name), period:periods(name)').eq('student_id', studentId);
  if (error) throw error;
  return camel(data);
}

export async function getStudentAssignments(studentId: string, classId?: string) {
  let q = supabase.from('assignments').select('*, subject:subjects(*), class:classes(*)');
  if (classId) q = q.eq('class_id', classId);
  const { data, error } = await q.order('due_date', { ascending: false });
  if (error) return [];
  return camel(data || []);
}

export async function getStudentDocuments(studentId: string) {
  const { data, error } = await supabase.from('student_documents').select('*').eq('student_id', studentId).order('created_at', { ascending: false });
  if (error) return [];
  return camel(data || []);
}

export async function getStudentBulletinsFromTable(studentId: string) {
  const { data, error } = await supabase.from('bulletins').select('*, period:periods(*), class:classes(*)').eq('student_id', studentId).order('created_at', { ascending: false });
  if (error) throw error;
  return camel(data || []);
}

export async function submitAssignment(studentId: string, assignmentId: string, fileUrl?: string, content?: string) {
  const cookies = await getAuthCookies();

  const apiBase = process.env.EXPO_PUBLIC_API_URL || process.env.EXPO_PUBLIC_SITE_URL;
  if (!apiBase) throw new Error('URL API non configurée');

  const res = await fetch(`${apiBase}/api/assignments/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies,
    },
    body: JSON.stringify({ student_id: studentId, assignment_id: assignmentId, file_url: fileUrl, content }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erreur soumission' }));
    throw new Error(err.error || 'Erreur lors de la soumission');
  }
  return res.json();
}

export async function getQuizzes(schoolId?: string) {
  let q = supabase.from('quizzes').select('*, subject:subjects(*)');
  if (schoolId) q = q.eq('school_id', schoolId);
  const { data, error } = await q.order('created_at', { ascending: false });
  if (error) throw error;
  return camel(data || []);
}

export async function getQuizQuestions(quizId: string) {
  const { data, error } = await supabase.from('quiz_questions').select('*').eq('quiz_id', quizId).order('order');
  if (error) return [];
  return camel(data || []);
}

export async function submitQuizResult(studentId: string, quizId: string, score: number, answers: Record<string, string>) {
  const { data, error } = await supabase.from('quiz_results').insert({ student_id: studentId, quiz_id: quizId, score, answers }).select().single();
  if (error) throw error;
  return data;
}
