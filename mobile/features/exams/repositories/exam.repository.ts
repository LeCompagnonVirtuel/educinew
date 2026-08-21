import { createClient } from '@supabase/supabase-js';

export class MobileExamRepository {
  private readonly supabase: ReturnType<typeof createClient>;

  constructor(url: string, key: string) {
    this.supabase = createClient(url, key);
  }

  async findExam(id: string) {
    const { data, error } = await this.supabase.from('exams').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async findAllExams(filters: Record<string, unknown>) {
    let query = this.supabase.from('exams').select('*', { count: 'exact' });
    if (filters.classId) query = query.eq('class_id', filters.classId);
    if (filters.subjectId) query = query.eq('subject_id', filters.subjectId);
    if (filters.academicYearId) query = query.eq('academic_year_id', filters.academicYearId);
    if (filters.termId) query = query.eq('term_id', filters.termId);
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.examType) query = query.eq('exam_type', filters.examType);
    if (filters.search) query = query.ilike('name', `%${filters.search}%`);
    if (filters.dateFrom) query = query.gte('exam_date', filters.dateFrom);
    if (filters.dateTo) query = query.lte('exam_date', filters.dateTo);
    const page = (filters.page as number) || 1;
    const limit = (filters.limit as number) || 20;
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const sortBy = (filters.sortBy as string) || 'exam_date';
    const sortOrder = (filters.sortOrder as string) || 'desc';
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });
    query = query.range(from, to);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createExam(examData: Record<string, unknown>) {
    const { data, error } = await this.supabase.from('exams').insert(examData).select().single();
    if (error) throw error;
    return data;
  }

  async updateExam(id: string, examData: Record<string, unknown>) {
    const { data, error } = await this.supabase.from('exams').update(examData).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async deleteExam(id: string) {
    const { error } = await this.supabase.from('exams').delete().eq('id', id);
    if (error) throw error;
  }

  async findMarks(examId: string) {
    const { data, error } = await this.supabase
      .from('marks')
      .select('*')
      .eq('exam_id', examId)
      .order('student_id');
    if (error) throw error;
    return data || [];
  }

  async enterMark(markData: Record<string, unknown>) {
    const { data, error } = await this.supabase.from('marks').insert(markData).select().single();
    if (error) throw error;
    return data;
  }

  async bulkEnterMarks(marks: Record<string, unknown>[]) {
    const { data, error } = await this.supabase.from('marks').insert(marks).select();
    if (error) throw error;
    return data || [];
  }

  async updateMark(id: string, markData: Record<string, unknown>) {
    const { data, error } = await this.supabase.from('marks').update(markData).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async validateMarks(examId: string, validatedBy: string) {
    const { error } = await this.supabase
      .from('marks')
      .update({ status: 'VALIDATED', validated_by: validatedBy, validated_at: new Date().toISOString() })
      .eq('exam_id', examId)
      .eq('status', 'SUBMITTED');
    if (error) throw error;
  }

  async calculateAverage(studentId: string, classId: string, academicYearId: string, termId?: string) {
    let query = this.supabase
      .from('subject_averages')
      .select('*')
      .eq('student_id', studentId)
      .eq('class_id', classId)
      .eq('academic_year_id', academicYearId);
    if (termId) query = query.eq('term_id', termId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async findRanking(classId: string, academicYearId: string, termId?: string) {
    let query = this.supabase
      .from('class_rankings')
      .select('*')
      .eq('class_id', classId)
      .eq('academic_year_id', academicYearId);
    if (termId) query = query.eq('term_id', termId);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async findDecisions(classId: string, academicYearId: string) {
    const { data, error } = await this.supabase
      .from('decisions')
      .select('*')
      .eq('class_id', classId)
      .eq('academic_year_id', academicYearId);
    if (error) throw error;
    return data || [];
  }

  async createDecision(decisionData: Record<string, unknown>) {
    const { data, error } = await this.supabase.from('decisions').insert(decisionData).select().single();
    if (error) throw error;
    return data;
  }

  async findCompetencies(classId?: string) {
    let query = this.supabase.from('competencies').select('*');
    if (classId) query = query.eq('class_id', classId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async findCompetencyResults(studentId: string, classId: string, academicYearId: string) {
    const { data, error } = await this.supabase
      .from('competency_results')
      .select('*')
      .eq('student_id', studentId)
      .eq('class_id', classId)
      .eq('academic_year_id', academicYearId);
    if (error) throw error;
    return data || [];
  }

  async findReportCards(classId: string, termId: string) {
    const { data, error } = await this.supabase
      .from('report_cards')
      .select('*')
      .eq('class_id', classId)
      .eq('term_id', termId);
    if (error) throw error;
    return data || [];
  }

  async findReportCard(id: string) {
    const { data, error } = await this.supabase.from('report_cards').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async findTranscripts(studentId: string) {
    const { data, error } = await this.supabase
      .from('transcripts')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async findTranscript(id: string) {
    const { data, error } = await this.supabase.from('transcripts').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async getExamStatistics(examId: string) {
    const { data, error } = await this.supabase
      .from('exam_statistics')
      .select('*')
      .eq('exam_id', examId)
      .single();
    if (error) throw error;
    return data;
  }

  async getExamDashboard(schoolId: string) {
    const { data: exams, error: examsError } = await this.supabase
      .from('exams')
      .select('*')
      .eq('school_id', schoolId);
    if (examsError) throw examsError;

    const now = new Date().toISOString();
    const totalExams = exams?.length || 0;
    const publishedExams = exams?.filter((e: Record<string, unknown>) => e.is_published).length || 0;
    const pendingExams = exams?.filter((e: Record<string, unknown>) => e.status === 'DRAFT').length || 0;
    const lockedExams = exams?.filter((e: Record<string, unknown>) => e.is_locked).length || 0;
    const upcomingExams = exams?.filter((e: Record<string, unknown>) => (e.exam_date as string) > now).slice(0, 5) || [];

    const { data: marks } = await this.supabase
      .from('marks')
      .select('*')
      .eq('school_id', schoolId);

    const totalMarks = marks?.length || 0;
    const pendingMarks = marks?.filter((m: Record<string, unknown>) => m.status === 'SUBMITTED').length || 0;

    const { data: notifications } = await this.supabase
      .from('exam_notifications')
      .select('*')
      .eq('school_id', schoolId)
      .eq('read', false);

    return {
      schoolId,
      totalExams,
      publishedExams,
      pendingExams,
      lockedExams,
      totalMarks,
      pendingMarks,
      averagePassRate: 0,
      upcomingExams,
      recentResults: [],
      alerts: notifications || [],
      createdAt: now,
    };
  }

  async searchExams(schoolId: string, query: string) {
    const { data, error } = await this.supabase
      .from('exams')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('name', `%${query}%`)
      .limit(20);
    if (error) throw error;
    return data || [];
  }

  async getTimeline(schoolId: string, examId?: string, studentId?: string) {
    let query = this.supabase
      .from('exam_timeline')
      .select('*')
      .eq('school_id', schoolId);
    if (examId) query = query.eq('exam_id', examId);
    if (studentId) query = query.eq('student_id', studentId);
    const { data, error } = await query.order('date', { ascending: false }).limit(50);
    if (error) throw error;
    return { events: data || [], totalEvents: data?.length || 0, page: 1, limit: 50, schoolId, examId, studentId };
  }

  async findCorrections(examId: string) {
    const { data, error } = await this.supabase
      .from('corrections')
      .select('*')
      .eq('exam_id', examId);
    if (error) throw error;
    return data || [];
  }

  async createCorrection(correctionData: Record<string, unknown>) {
    const { data, error } = await this.supabase.from('corrections').insert(correctionData).select().single();
    if (error) throw error;
    return data;
  }

  async approveCorrection(id: string, reviewedBy: string, reviewNote?: string) {
    const { error } = await this.supabase
      .from('corrections')
      .update({
        status: 'APPROVED',
        reviewed_by: reviewedBy,
        reviewed_at: new Date().toISOString(),
        review_note: reviewNote,
      })
      .eq('id', id);
    if (error) throw error;
  }

  async findNotifications(recipientId: string) {
    const { data, error } = await this.supabase
      .from('exam_notifications')
      .select('*')
      .eq('recipient_id', recipientId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async markNotificationRead(id: string) {
    const { error } = await this.supabase
      .from('exam_notifications')
      .update({ read: true, read_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
  }

  async getAuditLog(schoolId: string) {
    const { data, error } = await this.supabase
      .from('exam_audit')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) throw error;
    return data || [];
  }

  async exportMarks(examId: string, format: string) {
    const { data, error } = await this.supabase
      .from('marks')
      .select('*')
      .eq('exam_id', examId);
    if (error) throw error;
    return { data: data || [], format, examId, generatedAt: new Date().toISOString() };
  }
}
