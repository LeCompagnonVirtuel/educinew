import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbGrades = {
  async list(filters?: { studentId?: string; classId?: string; periodId?: string; subjectId?: string }) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();

    let studentIds: string[] = [];
    if (filters?.classId) {
      let classQuery = supabase
        .from('students')
        .select('id')
        .eq('class_id', filters.classId);
      if (schoolId) classQuery = classQuery.eq('school_id', schoolId);
      const { data: classStudents } = await classQuery;
      studentIds = (classStudents || []).map((s: any) => s.id);
      if (studentIds.length === 0) return [];
    }

    let query = supabase
      .from('grades')
      .select('*, student:students(*, user:users!students_user_id_fkey(*)), subject:subjects(*), teacher:teachers(*, user:users(*)), period:periods(*)');
    if (schoolId) query = query.eq('school_id', schoolId);
    if (filters?.studentId) query = query.eq('student_id', filters.studentId);
    if (studentIds.length > 0) query = query.in('student_id', studentIds);
    if (filters?.periodId) query = query.eq('period_id', filters.periodId);
    if (filters?.subjectId) query = query.eq('subject_id', filters.subjectId);
    const { data, error } = await query;
    if (error) throw error;
    return camel(data);
  },

  async create(data: any) {
    const supabase = getSupabase();
    const schoolId = data.schoolId || data.school_id || await getAuthenticatedSchoolId();
    if (!data.student_id && !data.studentId) throw new Error('Élève requis');
    if (!data.subject_id && !data.subjectId) throw new Error('Matière requise');

    const score = parseFloat(data.score);
    if (isNaN(score) || score < 0 || score > (data.max_score || data.maxScore || 20)) {
      throw new Error('La note doit être entre 0 et 20');
    }

    const insertData = {
      student_id: data.student_id || data.studentId,
      subject_id: data.subject_id || data.subjectId,
      teacher_id: data.teacher_id || data.teacherId || null,
      school_id: schoolId,
      score,
      max_score: data.max_score || data.maxScore || 20,
      grade_type: data.grade_type || data.gradeType || 'DEVOIR',
      coefficient: data.coefficient || 1,
      period_id: data.period_id || data.periodId || null,
      academic_year_id: data.academic_year_id || data.academicYearId || null,
      comment: data.comment || null,
      is_validated: false,
    };

    const { data: grade, error } = await supabase
      .from('grades')
      .insert(insertData)
      .select()
      .single();
    if (error) throw new Error(`Erreur enregistrement note: ${error.message}`);
    return grade;
  },

  async createBulk(grades: any[]) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();

    const mapped = grades.map((g, i) => {
      const score = parseFloat(g.score);
      const maxScore = g.max_score || g.maxScore || 20;
      if (isNaN(score) || score < 0 || score > maxScore) {
        throw new Error(`Note invalide à la ligne ${i + 1}: doit être entre 0 et ${maxScore}`);
      }
      if (!g.student_id && !g.studentId) throw new Error(`Élève manquant à la ligne ${i + 1}`);
      if (!g.subject_id && !g.subjectId) throw new Error(`Matière manquante à la ligne ${i + 1}`);
      return {
        student_id: g.student_id || g.studentId,
        subject_id: g.subject_id || g.subjectId,
        teacher_id: g.teacher_id || g.teacherId || null,
        school_id: g.school_id || g.schoolId || schoolId,
        score,
        max_score: maxScore,
        grade_type: g.grade_type || g.gradeType || 'DEVOIR',
        coefficient: g.coefficient || 1,
        period_id: g.period_id || g.periodId || null,
        academic_year_id: g.academic_year_id || g.academicYearId || null,
        comment: g.comment || null,
        is_validated: false,
      };
    });

    const { data, error } = await supabase
      .from('grades')
      .insert(mapped)
      .select();
    if (error) throw new Error(`Erreur enregistrement notes: ${error.message}`);
    return data;
  },

  async update(id: string, data: any) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();

    if (schoolId) {
      const { data: existing } = await supabase
        .from('grades')
        .select('school_id')
        .eq('id', id)
        .single();
      if (existing && existing.school_id !== schoolId) {
        throw new Error('Accès non autorisé à cette note');
      }
    }

    const allowedFields = ['score', 'max_score', 'grade_type', 'coefficient', 'comment', 'is_validated', 'validated_at', 'period_id'];
    const updateData: Record<string, any> = {};
    for (const key of allowedFields) {
      if (data[key] !== undefined) updateData[key] = data[key];
    }
    if (updateData.score !== undefined) {
      updateData.score = parseFloat(updateData.score);
      if (isNaN(updateData.score) || updateData.score < 0) throw new Error('Score invalide');
    }
    const { data: grade, error } = await supabase
      .from('grades')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return grade;
  },

  async remove(id: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();

    if (schoolId) {
      const { data: existing } = await supabase
        .from('grades')
        .select('school_id')
        .eq('id', id)
        .single();
      if (existing && existing.school_id !== schoolId) {
        throw new Error('Accès non autorisé à cette note');
      }
    }

    const { error } = await supabase
      .from('grades')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async validate(id: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    if (schoolId) {
      const { data: existing } = await supabase.from('grades').select('school_id').eq('id', id).single();
      if (existing && existing.school_id !== schoolId) throw new Error('Accès non autorisé à cette note');
    }
    const { data, error } = await supabase
      .from('grades')
      .update({ is_validated: true, validated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getAverages(studentId: string, periodId?: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let query = supabase
      .from('grades')
      .select('*, subject:subjects(*)')
      .eq('student_id', studentId);
    if (schoolId) query = query.eq('school_id', schoolId);
    if (periodId) query = query.eq('period_id', periodId);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getPeriods(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase
      .from('periods')
      .select('*');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query.order('start_date');
    if (error) throw error;
    return data;
  },

  async getUnvalidated(classId: string, subjectId?: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const { data: classStudents } = await supabase
      .from('students').select('id').eq('class_id', classId);
    const studentIds = (classStudents || []).map((s: any) => s.id);
    if (studentIds.length === 0) return [];

    let query = supabase
      .from('grades')
      .select('*, student:students(*, user:users!students_user_id_fkey(*)), subject:subjects(*)')
      .in('student_id', studentIds)
      .eq('is_validated', false);
    if (schoolId) query = query.eq('school_id', schoolId);
    if (subjectId) query = query.eq('subject_id', subjectId);
    const { data, error } = await query;
    if (error) throw error;
    return camel(data);
  },

  async getStudentEvolution(studentId: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let query = supabase
      .from('grades')
      .select('*, subject:subjects(*), period:periods(*)')
      .eq('student_id', studentId)
      .order('created_at', { ascending: true });
    if (schoolId) query = query.eq('school_id', schoolId);
    const { data, error } = await query;
    if (error) throw error;
    return camel(data);
  },

  async getClassDashboard(classId: string, periodId: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const { data: classStudents } = await supabase
      .from('students').select('id').eq('class_id', classId);
    const studentIds = (classStudents || []).map((s: any) => s.id);
    if (studentIds.length === 0) return { dashboard: [], totalGrades: 0 };

    let gradesQuery = supabase
      .from('grades')
      .select('score, subject:subjects(name), student:students(id)')
      .in('student_id', studentIds)
      .eq('period_id', periodId);
    if (schoolId) gradesQuery = gradesQuery.eq('school_id', schoolId);
    const { data: grades, error } = await gradesQuery;
    if (error) throw error;
    type SubjectData = { scores: number[]; count: number; total: number };
    const bySubject: Record<string, SubjectData> = (grades || []).reduce((acc: Record<string, SubjectData>, g: any) => {
      const name = g.subject?.name || 'N/A';
      if (!acc[name]) acc[name] = { scores: [], count: 0, total: 0 };
      acc[name].scores.push(g.score);
      acc[name].count++;
      acc[name].total += g.score;
      return acc;
    }, {} as Record<string, SubjectData>);
    const dashboard = Object.entries(bySubject).map(([subject, data]: [string, SubjectData]) => ({
      subject,
      average: data.count > 0 ? Math.round(data.total / data.count) : 0,
      min: Math.min(...data.scores),
      max: Math.max(...data.scores),
      count: data.count,
    }));
    return { dashboard, totalGrades: grades?.length || 0 };
  },

  async getClassAverages(classId: string, periodId: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const { data: classStudents } = await supabase
      .from('students').select('id').eq('class_id', classId);
    const studentIds = (classStudents || []).map((s: any) => s.id);
    if (studentIds.length === 0) return [];

    let gradesQuery = supabase
      .from('grades')
      .select('score, student:students(id, user:users(name)), subject:subjects(name)')
      .in('student_id', studentIds)
      .eq('period_id', periodId);
    if (schoolId) gradesQuery = gradesQuery.eq('school_id', schoolId);
    const { data: grades, error } = await gradesQuery;
    if (error) throw error;
    type StudentData = { name: string; scores: number[]; total: number };
    const byStudent: Record<string, StudentData> = (grades || []).reduce((acc: Record<string, StudentData>, g: any) => {
      const sid = g.student?.id;
      if (!sid) return acc;
      if (!acc[sid]) acc[sid] = { name: g.student?.user?.name || 'N/A', scores: [], total: 0 };
      acc[sid].scores.push(g.score);
      acc[sid].total += g.score;
      return acc;
    }, {} as Record<string, StudentData>);
    return Object.entries(byStudent).map(([studentId, data]: [string, StudentData]) => ({
      studentId,
      name: data.name,
      average: data.scores.length > 0 ? Math.round(data.total / data.scores.length) : 0,
      subjectAverages: data.scores,
    }));
  },

  async getBulletins(classId: string, periodId: string) {
    return sbGrades.getClassAverages(classId, periodId);
  },

  async generateBulletins(classId: string, periodId: string) {
    const averages = await sbGrades.getClassAverages(classId, periodId);
    return { generated: averages.length, bulletins: averages };
  },
};
