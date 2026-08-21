import { sbGrades } from './supabase-client';
import { createClient } from '@/lib/supabase/client';
import { sbEmailTrigger } from '@/lib/api/domains/email-trigger.service';

export const gradesApi = {
  getGrades(filters: { studentId?: string; classId?: string; subjectId?: string; term?: string; periodId?: string; gradeType?: string; isValidated?: boolean } = {}) {
    return sbGrades.list({
      studentId: filters.studentId,
      classId: filters.classId,
      periodId: filters.periodId,
      subjectId: filters.subjectId,
    }) as Promise<any[]>;
  },

  async getClassReport(classId: string, term: string) {
    const supabase = createClient();
    // First get student IDs for this class
    const { data: students } = await supabase
      .from('students')
      .select('id')
      .eq('class_id', classId);
    const studentIds = (students || []).map((s: any) => s.id);
    if (studentIds.length === 0) return [];

    const { data, error } = await supabase
      .from('grades')
      .select('*, student:students(*, user:users!students_user_id_fkey(*)), subject:subjects(*)')
      .in('student_id', studentIds)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as any[];
  },

  createGrade(data: any) {
    return sbGrades.create(data);
  },

  createBulkGrades(grades: any[]) {
    return sbGrades.createBulk(grades);
  },

  updateGrade(id: string, data: any) {
    return sbGrades.update(id, data) as Promise<any>;
  },

  deleteGrade(id: string) {
    return sbGrades.remove(id) as Promise<any>;
  },

  validateGrade(id: string) {
    return sbGrades.validate(id) as Promise<any>;
  },

  getUnvalidatedGrades(classId?: string, subjectId?: string) {
    return sbGrades.getUnvalidated(classId || '', subjectId) as Promise<any[]>;
  },

  getStudentAverages(studentId: string, periodId: string) {
    return sbGrades.getAverages(studentId, periodId) as Promise<any>;
  },

  getClassAverages(classId: string, periodId: string) {
    return sbGrades.getClassAverages(classId, periodId) as Promise<any>;
  },

  getClassDashboard(classId: string, periodId: string) {
    return sbGrades.getClassDashboard(classId, periodId) as Promise<any>;
  },

  getStudentEvolution(studentId: string) {
    return sbGrades.getStudentEvolution(studentId) as Promise<any>;
  },

  generateBulletins(classId: string, periodId: string) {
    return sbGrades.generateBulletins(classId, periodId) as Promise<any>;
  },

  async getBulletin(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('grades')
      .select('*, student:students(*, user:users!students_user_id_fkey(*)), subject:subjects(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as any;
  },

  async getStudentBulletins(studentId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('grades')
      .select('*, subject:subjects(*), period:periods(*)')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as any[];
  },

  async getClassBulletins(classId: string, periodId: string) {
    const supabase = createClient();
    // Get student IDs for this class
    const { data: students } = await supabase
      .from('students')
      .select('id')
      .eq('class_id', classId);
    const studentIds = (students || []).map((s: any) => s.id);
    if (studentIds.length === 0) return [];

    const { data, error } = await supabase
      .from('grades')
      .select('*, student:students(*, user:users!students_user_id_fkey(*)), subject:subjects(*)')
      .in('student_id', studentIds)
      .eq('period_id', periodId);
    if (error) throw error;
    return data as any[];
  },

  async validateBulletin(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('grades')
      .update({ is_validated: true, validated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as any;
  },

  async publishBulletin(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('bulletins')
      .update({ status: 'PUBLISHED' })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    if (data) {
      const student = data.student || data.student_name;
      const studentName = typeof student === 'object' ? student?.user?.name || student?.name : student || '';
      const parentEmail = data.parent_email || data.student?.user?.email || '';
      const className = data.class_name || data.student?.class?.name || '';
      const periodName = data.period_name || '';
      const generalAverage = data.average || data.general_average || 0;
      const mention = data.mention || '';
      if (parentEmail && studentName) {
        sbEmailTrigger.onBulletinPublished(parentEmail, studentName, className, periodName, generalAverage, mention);
      }
    }
    return data as any;
  },

  async createPeriod(data: { name: string; periodType: string; startDate: string; endDate: string; academicYearId: string; orderIndex?: number }) {
    const supabase = createClient();
    const { data: period, error } = await supabase
      .from('periods')
      .insert({
        name: data.name,
        period_type: data.periodType,
        start_date: data.startDate,
        end_date: data.endDate,
        academic_year_id: data.academicYearId,
        order_index: data.orderIndex ?? 0,
      })
      .select()
      .single();
    if (error) throw error;
    return period as any;
  },

  getPeriods(academicYearId?: string) {
    return sbGrades.getPeriods() as Promise<any[]>;
  },

  async activatePeriod(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('periods')
      .update({ is_active: true })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as any;
  },
};
