import { supabase, camel, getAuthCookies, getUserSchoolId } from './supabase';
import { cacheManager } from './cacheManager';

export async function getGrades(filters: any = {}) {
  if (filters.classId) {
    const { data: classStudents } = await supabase.from('students').select('id').eq('class_id', filters.classId);
    const studentIds = (classStudents || []).map((s: any) => s.id);
    if (studentIds.length === 0) return [];
    let q = supabase.from('grades').select('*, student:students(*, user:users(*)), subject:subjects(*), period:periods(*)').in('student_id', studentIds);
    if (filters.periodId) q = q.eq('period_id', filters.periodId);
    if (filters.subjectId) q = q.eq('subject_id', filters.subjectId);
    const { data, error } = await q;
    if (error) throw error;
    return camel(data);
  }
  const schoolId = await getUserSchoolId();
  let q = supabase.from('grades').select('*, student:students(*, user:users(*)), subject:subjects(*), period:periods(*)');
  if (filters.studentId) q = q.eq('student_id', filters.studentId);
  else if (schoolId) q = q.eq('school_id', schoolId);
  if (filters.periodId) q = q.eq('period_id', filters.periodId);
  if (filters.subjectId) q = q.eq('subject_id', filters.subjectId);
  const { data, error } = await q;
  if (error) throw error;
  return camel(data);
}

export async function getClassReport(classId: string, _term: string) {
  const { data: classStudents } = await supabase.from('students').select('id').eq('class_id', classId);
  const studentIds = (classStudents || []).map((s: any) => s.id);
  if (studentIds.length === 0) return [];
  const { data, error } = await supabase.from('grades').select('*, subject:subjects(*)').in('student_id', studentIds);
  if (error) throw error;
  return camel(data);
}

export async function createGrade(gradeData: any) {
  await cacheManager.clear();
  const cookies = await getAuthCookies();

  const apiBase = process.env.EXPO_PUBLIC_API_URL || process.env.EXPO_PUBLIC_SITE_URL;
  if (!apiBase) throw new Error('URL API non configurée');

  const res = await fetch(`${apiBase}/api/grades`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies,
    },
    body: JSON.stringify(gradeData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erreur création note' }));
    throw new Error(err.error || 'Erreur création note');
  }
  return res.json();
}

export async function createBulkGrades(grades: any[]) {
  await cacheManager.clear();

  const mapped = grades.map((g: any) => ({
    student_id: g.student_id || g.studentId,
    subject_id: g.subject_id || g.subjectId,
    teacher_id: g.teacher_id || g.teacherId || null,
    school_id: g.school_id || g.schoolId,
    score: parseFloat(g.score),
    max_score: g.max_score || g.maxScore || 20,
    grade_type: g.grade_type || g.gradeType || 'DEVOIR',
    coefficient: g.coefficient || 1,
    period_id: g.period_id || g.periodId || null,
    academic_year_id: g.academic_year_id || g.academicYearId || null,
    comment: g.comment || null,
    is_validated: false,
  }));

  const { data, error } = await supabase.from('grades').insert(mapped).select();
  if (error) throw error;
  return data;
}

export async function updateGrade(id: string, data: any) {
  await cacheManager.clear();
  const { data: grade, error } = await supabase.from('grades').update(data).eq('id', id).select().single();
  if (error) throw error;
  return grade;
}

export async function deleteGrade(id: string) {
  await cacheManager.clear();
  const { error } = await supabase.from('grades').delete().eq('id', id);
  if (error) throw error;
}

export async function validateGrade(id: string) {
  const { data, error } = await supabase.from('grades').update({ is_validated: true, validated_at: new Date().toISOString() }).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function getUnvalidatedGrades(classId?: string, subjectId?: string) {
  if (classId) {
    const { data: classStudents } = await supabase.from('students').select('id').eq('class_id', classId);
    const studentIds = (classStudents || []).map((s: any) => s.id);
    if (studentIds.length === 0) return [];
    let q = supabase.from('grades').select('*, student:students(*, user:users(*)), subject:subjects(*)').eq('is_validated', false).in('student_id', studentIds);
    if (subjectId) q = q.eq('subject_id', subjectId);
    const { data, error } = await q;
    if (error) throw error;
    return camel(data);
  }
  let q = supabase.from('grades').select('*, student:students(*, user:users(*)), subject:subjects(*)').eq('is_validated', false);
  if (subjectId) q = q.eq('subject_id', subjectId);
  const { data, error } = await q;
  if (error) throw error;
  return camel(data);
}

export async function getStudentAverages(studentId: string, periodId?: string) {
  let q = supabase.from('grades').select('*, subject:subjects(name, coefficient)').eq('student_id', studentId);
  if (periodId) q = q.eq('period_id', periodId);
  const { data, error } = await q;
  if (error) throw error;

  const grades = data || [];
  const subjectMap: Record<string, { subject: string; subjectId: string; coefficient: number; scores: number[]; maxScores: number[]; count: number }> = {};
  for (const g of grades) {
    const name = g.subject?.name || 'Sans matière';
    const sid = g.subject_id || g.id;
    if (!subjectMap[name]) {
      subjectMap[name] = { subject: name, subjectId: sid, coefficient: g.subject?.coefficient || 1, scores: [], maxScores: [], count: 0 };
    }
    subjectMap[name].scores.push(g.score || 0);
    subjectMap[name].maxScores.push(g.max_score || 20);
    subjectMap[name].count++;
  }

  const averages = Object.values(subjectMap).map(s => {
    const avg = s.scores.length > 0
      ? s.scores.reduce((sum, score, i) => sum + (score / (s.maxScores[i] || 20)) * 20, 0) / s.scores.length
      : 0;
    return { subject: s.subject, subjectId: s.subjectId, coefficient: s.coefficient, average: avg, count: s.count };
  });

  let totalWeighted = 0, totalCoeff = 0;
  for (const a of averages) {
    totalWeighted += a.average * a.coefficient;
    totalCoeff += a.coefficient;
  }
  const generalAverage = totalCoeff > 0 ? totalWeighted / totalCoeff : 0;

  return { generalAverage, averages };
}

export async function getClassAverages(classId: string, periodId: string) {
  const { data: classStudents } = await supabase.from('students').select('id').eq('class_id', classId);
  const studentIds = (classStudents || []).map((s: any) => s.id);
  if (studentIds.length === 0) return [];
  const { data, error } = await supabase.from('grades').select('score, student:students(id, user:users(name)), subject:subjects(name)').in('student_id', studentIds).eq('period_id', periodId);
  if (error) throw error;
  const byStudent = (data || []).reduce((acc: any, g: any) => {
    const sid = g.student?.id;
    if (!sid) return acc;
    if (!acc[sid]) acc[sid] = { name: g.student?.user?.name, scores: [], total: 0 };
    acc[sid].scores.push(g.score);
    acc[sid].total += g.score;
    return acc;
  }, {});
  return Object.entries(byStudent).map(([studentId, d]: any) => ({ studentId, name: d.name, average: d.scores.length > 0 ? Math.round(d.total / d.scores.length) : 0 }));
}

export async function getClassDashboard(classId: string, periodId: string) {
  const { data: classStudents } = await supabase.from('students').select('id').eq('class_id', classId);
  const studentIds = (classStudents || []).map((s: any) => s.id);
  if (studentIds.length === 0) return [];
  const { data, error } = await supabase.from('grades').select('score, subject:subjects(name)').in('student_id', studentIds).eq('period_id', periodId);
  if (error) throw error;
  const bySubject = (data || []).reduce((acc: any, g: any) => {
    const name = g.subject?.name || 'N/A';
    if (!acc[name]) acc[name] = { scores: [], total: 0 };
    acc[name].scores.push(g.score);
    acc[name].total += g.score;
    return acc;
  }, {});
  return Object.entries(bySubject).map(([subject, d]: any) => ({ subject, average: d.total / d.scores.length }));
}

export async function getStudentEvolution(studentId: string) {
  const { data, error } = await supabase.from('grades').select('score, period:periods(name), subject:subjects(name)').eq('student_id', studentId).order('created_at');
  if (error) throw error;
  return camel(data);
}

export async function generateBulletins(classId: string, periodId: string) {
  const avgs = await getClassAverages(classId, periodId);
  return { generated: avgs.length, bulletins: avgs };
}

export async function getBulletin(id: string) {
  const { data, error } = await supabase.from('grades').select('*').eq('id', id).single();
  if (error) throw error;
  return camel(data);
}

export async function getStudentBulletins(studentId: string) {
  const tableResult = await supabase.from('bulletins').select('*, period:periods(*), class:classes(*)').eq('student_id', studentId).order('created_at', { ascending: false });
  if (!tableResult.error && tableResult.data && tableResult.data.length > 0) {
    return camel(tableResult.data);
  }

  const { data, error } = await supabase.from('grades').select('score, max_score, subject:subjects(name, coefficient), period:periods(id, name)').eq('student_id', studentId);
  if (error) throw error;

  const byPeriod: Record<string, { periodId: string; periodName: string; grades: any[] }> = {};
  for (const g of (data || [])) {
    const pId = (g as any).period?.id || 'default';
    const pName = (g as any).period?.name || 'Période';
    if (!byPeriod[pId]) byPeriod[pId] = { periodId: pId, periodName: pName, grades: [] };
    byPeriod[pId].grades.push(g);
  }

  return Object.values(byPeriod).map(p => {
    const avg = p.grades.length > 0
      ? p.grades.reduce((s, g) => s + ((g.score || 0) / (g.max_score || 20)) * 20, 0) / p.grades.length
      : 0;
    const mention = avg >= 16 ? 'Très Bien' : avg >= 14 ? 'Bien' : avg >= 12 ? 'Assez Bien' : avg >= 10 ? 'Passable' : 'Insuffisant';
    return { id: p.periodId, period: { id: p.periodId, name: p.periodName }, generalAverage: avg, mention, rank: null };
  });
}

export async function getClassBulletins(classId: string, periodId: string) {
  return getClassAverages(classId, periodId);
}

export async function validateBulletin(id: string) {
  const { data, error } = await supabase.from('bulletins').update({ status: 'VALIDATED', validated_at: new Date().toISOString() }).eq('id', id).select().single();
  if (error) throw error;
  return data;
}
export async function publishBulletin(id: string) {
  const { data, error } = await supabase.from('bulletins').update({ status: 'PUBLISHED', published_at: new Date().toISOString() }).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function getPeriods() {
  const { data, error } = await supabase.from('periods').select('*').order('start_date');
  if (error) throw error;
  return camel(data);
}
