import { logger } from '@educi/logger';

export class SupabaseExamRepository {
  constructor(private readonly supabase: any) {}

  async findExam(id: string) {
    const { data, error } = await this.supabase
      .from('exams')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return data;
  }

  async findAllExams(schoolId: string, filters?: Record<string, unknown>) {
    let query = this.supabase
      .from('exams')
      .select('*')
      .eq('school_id', schoolId);
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      }
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createExam(examData: Record<string, unknown>) {
    const { data, error } = await this.supabase
      .from('exams')
      .insert(examData)
      .select()
      .single();
    if (error) throw error;
    logger.info('Exam created', { examId: data.id }, 'exams');
    return data;
  }

  async updateExam(id: string, examData: Record<string, unknown>) {
    const { data, error } = await this.supabase
      .from('exams')
      .update({ ...examData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async deleteExam(id: string) {
    const { error } = await this.supabase
      .from('exams')
      .delete()
      .eq('id', id);
    if (error) throw error;
    logger.info('Exam deleted', { examId: id }, 'exams');
  }

  async archiveExam(id: string) {
    const { data, error } = await this.supabase
      .from('exams')
      .update({ status: 'ARCHIVED', archived_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async publishExam(id: string) {
    const { data, error } = await this.supabase
      .from('exams')
      .update({ status: 'PUBLISHED', published_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async lockExam(id: string) {
    const { data, error } = await this.supabase
      .from('exams')
      .update({ status: 'LOCKED', locked_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findMark(id: string) {
    const { data, error } = await this.supabase
      .from('marks')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return data;
  }

  async findAllMarks(examId: string) {
    const { data, error } = await this.supabase
      .from('marks')
      .select('*')
      .eq('exam_id', examId);
    if (error) throw error;
    return data || [];
  }

  async enterMark(markData: Record<string, unknown>) {
    const { data, error } = await this.supabase
      .from('marks')
      .insert(markData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async bulkEnterMarks(entries: Record<string, unknown>[]) {
    const { data, error } = await this.supabase
      .from('marks')
      .insert(entries)
      .select();
    if (error) throw error;
    return data || [];
  }

  async updateMark(id: string, markData: Record<string, unknown>) {
    const { data, error } = await this.supabase
      .from('marks')
      .update({ ...markData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async deleteMark(id: string) {
    const { error } = await this.supabase
      .from('marks')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  async validateMarks(examId: string, validatedBy: string) {
    const { data, error } = await this.supabase
      .from('marks')
      .update({ status: 'VALIDATED', validated_by: validatedBy, validated_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('exam_id', examId)
      .select();
    if (error) throw error;
    return data || [];
  }

  async publishMarks(examId: string) {
    const { data, error } = await this.supabase
      .from('marks')
      .update({ status: 'PUBLISHED', published_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('exam_id', examId)
      .select();
    if (error) throw error;
    return data || [];
  }

  async importMarks(marksData: Record<string, unknown>[]) {
    const { data, error } = await this.supabase
      .from('marks')
      .upsert(marksData, { onConflict: 'exam_id,student_id' })
      .select();
    if (error) throw error;
    return data || [];
  }

  async findGrades(schoolId: string) {
    const { data, error } = await this.supabase
      .from('grades')
      .select('*')
      .eq('school_id', schoolId)
      .order('order');
    if (error) throw error;
    return data || [];
  }

  async createGrade(gradeData: Record<string, unknown>) {
    const { data, error } = await this.supabase
      .from('grades')
      .insert(gradeData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateGrade(id: string, gradeData: Record<string, unknown>) {
    const { data, error } = await this.supabase
      .from('grades')
      .update(gradeData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findGradeRules(schoolId: string) {
    const { data, error } = await this.supabase
      .from('grade_rules')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data || [];
  }

  async createGradeRule(ruleData: Record<string, unknown>) {
    const { data, error } = await this.supabase
      .from('grade_rules')
      .insert(ruleData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findCoefficients(schoolId: string, classId?: string) {
    let query = this.supabase
      .from('subject_coefficients')
      .select('*')
      .eq('school_id', schoolId);
    if (classId) query = query.eq('class_id', classId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async updateCoefficient(id: string, coeffData: Record<string, unknown>) {
    const { data, error } = await this.supabase
      .from('subject_coefficients')
      .update(coeffData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async calculateSubjectAverage(studentId: string, subjectId: string, termId: string) {
    const { data, error } = await this.supabase
      .from('subject_averages')
      .select('*')
      .eq('student_id', studentId)
      .eq('subject_id', subjectId)
      .eq('term_id', termId)
      .single();
    if (error || !data) return null;
    return data;
  }

  async calculateTermAverage(studentId: string, classId: string, termId: string) {
    const { data, error } = await this.supabase
      .from('term_averages')
      .select('*')
      .eq('student_id', studentId)
      .eq('class_id', classId)
      .eq('term_id', termId)
      .single();
    if (error || !data) return null;
    return data;
  }

  async findSubjectAverages(termId: string, classId: string) {
    const { data, error } = await this.supabase
      .from('subject_averages')
      .select('*')
      .eq('term_id', termId)
      .eq('class_id', classId);
    if (error) throw error;
    return data || [];
  }

  async calculateClassRanking(classId: string, academicYearId: string, termId?: string) {
    let query = this.supabase
      .from('student_rankings')
      .select('*')
      .eq('class_id', classId)
      .eq('academic_year_id', academicYearId)
      .order('rank');
    if (termId) query = query.eq('term_id', termId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async calculateSchoolRanking(schoolId: string, academicYearId: string, termId?: string) {
    let query = this.supabase
      .from('school_rankings')
      .select('*')
      .eq('school_id', schoolId)
      .eq('academic_year_id', academicYearId)
      .order('rank');
    if (termId) query = query.eq('term_id', termId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async findStudentRanking(studentId: string, academicYearId: string, termId?: string) {
    let query = this.supabase
      .from('student_rankings')
      .select('*')
      .eq('student_id', studentId)
      .eq('academic_year_id', academicYearId);
    if (termId) query = query.eq('term_id', termId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async findDecision(id: string) {
    const { data, error } = await this.supabase
      .from('decisions')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return data;
  }

  async createDecision(decisionData: Record<string, unknown>) {
    const { data, error } = await this.supabase
      .from('decisions')
      .insert(decisionData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async approveDecision(id: string, approvedBy: string) {
    const { data, error } = await this.supabase
      .from('decisions')
      .update({ status: 'APPROVED', approved_by: approvedBy, approved_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findCompetencies(schoolId: string, subjectId?: string) {
    let query = this.supabase
      .from('competencies')
      .select('*')
      .eq('school_id', schoolId);
    if (subjectId) query = query.eq('subject_id', subjectId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createCompetency(competencyData: Record<string, unknown>) {
    const { data, error } = await this.supabase
      .from('competencies')
      .insert(competencyData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findCompetencyResults(examId: string, studentId?: string) {
    let query = this.supabase
      .from('competency_results')
      .select('*')
      .eq('exam_id', examId);
    if (studentId) query = query.eq('student_id', studentId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async generateReportCard(reportData: Record<string, unknown>) {
    const { data, error } = await this.supabase
      .from('report_cards')
      .insert(reportData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findReportCards(schoolId: string, termId?: string) {
    let query = this.supabase
      .from('report_cards')
      .select('*')
      .eq('school_id', schoolId);
    if (termId) query = query.eq('term_id', termId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async findReportCard(id: string) {
    const { data, error } = await this.supabase
      .from('report_cards')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return data;
  }

  async generateTranscript(transcriptData: Record<string, unknown>) {
    const { data, error } = await this.supabase
      .from('transcripts')
      .insert(transcriptData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findTranscripts(schoolId: string, academicYearId?: string) {
    let query = this.supabase
      .from('transcripts')
      .select('*')
      .eq('school_id', schoolId);
    if (academicYearId) query = query.eq('academic_year_id', academicYearId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async findTranscript(id: string) {
    const { data, error } = await this.supabase
      .from('transcripts')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return data;
  }

  async getExamStatistics(examId: string) {
    const { data: marks } = await this.supabase
      .from('marks')
      .select('mark, max_mark, student_id')
      .eq('exam_id', examId);
    const markList = marks || [];
    if (markList.length === 0) {
      return { examId, totalStudents: 0, average: 0, median: 0, minMark: 0, maxMark: 0, passRate: 0, distribution: {} };
    }
    const percentages = markList.map((m: any) => (m.mark / m.max_mark) * 100);
    const sorted = [...percentages].sort((a: number, b: number) => a - b);
    const avg = percentages.reduce((s: number, v: number) => s + v, 0) / percentages.length;
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
    const distribution: Record<string, number> = {};
    for (const p of percentages) {
      const bracket = `${Math.floor(p / 10) * 10}-${Math.floor(p / 10) * 10 + 9}`;
      distribution[bracket] = (distribution[bracket] || 0) + 1;
    }
    return {
      examId,
      totalStudents: markList.length,
      average: Math.round(avg * 100) / 100,
      median: Math.round(median * 100) / 100,
      minMark: Math.min(...percentages),
      maxMark: Math.max(...percentages),
      passRate: Math.round((percentages.filter((p: number) => p >= 50).length / percentages.length) * 100),
      distribution,
    };
  }

  async getExamDashboard(schoolId: string) {
    const { data: exams } = await this.supabase
      .from('exams')
      .select('id, status, type, date')
      .eq('school_id', schoolId);
    const list = exams || [];
    const now = new Date();
    return {
      schoolId,
      totalExams: list.length,
      draftExams: list.filter((e: any) => e.status === 'DRAFT').length,
      publishedExams: list.filter((e: any) => e.status === 'PUBLISHED').length,
      lockedExams: list.filter((e: any) => e.status === 'LOCKED').length,
      archivedExams: list.filter((e: any) => e.status === 'ARCHIVED').length,
      upcomingExams: list.filter((e: any) => new Date(e.date) > now).length,
      byType: list.reduce((acc: Record<string, number>, e: any) => { acc[e.type] = (acc[e.type] || 0) + 1; return acc; }, {}),
    };
  }

  async getExamAnalytics(schoolId: string, termId?: string) {
    let query = this.supabase
      .from('exams')
      .select('id, subject_id, class_id, type, coefficient, date')
      .eq('school_id', schoolId);
    if (termId) query = query.eq('term_id', termId);
    const { data: exams } = await query;
    return { schoolId, exams: exams || [], totalExams: (exams || []).length };
  }

  async searchExams(schoolId: string, queryStr: string) {
    const { data, error } = await this.supabase
      .from('exams')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('name', `%${queryStr}%`);
    if (error) throw error;
    return data || [];
  }

  async getTimeline(schoolId: string, limit = 50) {
    const { data, error } = await this.supabase
      .from('exam_timeline')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  }

  async findCorrection(id: string) {
    const { data, error } = await this.supabase
      .from('corrections')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return data;
  }

  async createCorrection(correctionData: Record<string, unknown>) {
    const { data, error } = await this.supabase
      .from('corrections')
      .insert(correctionData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async approveCorrection(id: string, approvedBy: string) {
    const { data, error } = await this.supabase
      .from('corrections')
      .update({ status: 'APPROVED', approved_by: approvedBy, approved_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    const correction = data;
    if (correction) {
      await this.supabase
        .from('marks')
        .update({ mark: correction.corrected_mark, updated_at: new Date().toISOString() })
        .eq('exam_id', correction.exam_id)
        .eq('student_id', correction.student_id);
    }
    return data;
  }

  async rejectCorrection(id: string, rejectedBy: string, reason: string) {
    const { data, error } = await this.supabase
      .from('corrections')
      .update({ status: 'REJECTED', rejected_by: rejectedBy, rejection_reason: reason, rejected_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findNotifications(schoolId: string, userId?: string) {
    let query = this.supabase
      .from('exam_notifications')
      .select('*')
      .eq('school_id', schoolId);
    if (userId) query = query.eq('user_id', userId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async markNotificationRead(id: string) {
    const { data, error } = await this.supabase
      .from('exam_notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async getSettings(schoolId: string) {
    const { data, error } = await this.supabase
      .from('exam_settings')
      .select('*')
      .eq('school_id', schoolId)
      .single();
    if (error || !data) return null;
    return data;
  }

  async updateSettings(schoolId: string, settingsData: Record<string, unknown>) {
    const { data, error } = await this.supabase
      .from('exam_settings')
      .upsert({ school_id: schoolId, ...settingsData, updated_at: new Date().toISOString() }, { onConflict: 'school_id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async logAudit(schoolId: string, userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>) {
    const { error } = await this.supabase
      .from('exam_audit_logs')
      .insert({
        school_id: schoolId,
        user_id: userId,
        action,
        entity_type: entityType,
        entity_id: entityId,
        previous_value: previousValue || null,
        new_value: newValue || null,
        created_at: new Date().toISOString(),
      });
    if (error) throw error;
  }

  async getAuditLog(schoolId: string, filters?: Record<string, unknown>) {
    let query = this.supabase
      .from('exam_audit_logs')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      }
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async exportMarks(schoolId: string, filters: Record<string, unknown>) {
    let query = this.supabase
      .from('marks')
      .select('*, exams!inner(school_id, name, subject_id, class_id)')
      .eq('exams.school_id', schoolId);
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) query = query.eq(key, value);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async exportResults(schoolId: string, termId: string) {
    const { data, error } = await this.supabase
      .from('term_averages')
      .select('*')
      .eq('school_id', schoolId)
      .eq('term_id', termId)
      .order('rank');
    if (error) throw error;
    return data || [];
  }

  async exportRankings(schoolId: string, academicYearId: string) {
    const { data, error } = await this.supabase
      .from('school_rankings')
      .select('*')
      .eq('school_id', schoolId)
      .eq('academic_year_id', academicYearId)
      .order('rank');
    if (error) throw error;
    return data || [];
  }

  async findStudent(studentId: string) {
    const { data, error } = await this.supabase
      .from('students')
      .select('*')
      .eq('id', studentId)
      .single();
    if (error || !data) return null;
    return data;
  }

  async findClass(classId: string) {
    const { data, error } = await this.supabase
      .from('classes')
      .select('*')
      .eq('id', classId)
      .single();
    if (error || !data) return null;
    return data;
  }

  async findSubject(subjectId: string) {
    const { data, error } = await this.supabase
      .from('subjects')
      .select('*')
      .eq('id', subjectId)
      .single();
    if (error || !data) return null;
    return data;
  }

  async findAcademicYear(yearId: string) {
    const { data, error } = await this.supabase
      .from('academic_years')
      .select('*')
      .eq('id', yearId)
      .single();
    if (error || !data) return null;
    return data;
  }

  async findTerm(termId: string) {
    const { data, error } = await this.supabase
      .from('terms')
      .select('*')
      .eq('id', termId)
      .single();
    if (error || !data) return null;
    return data;
  }

  async findUser(userId: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    if (error || !data) return null;
    return data;
  }

  async findStudentsByClass(classId: string) {
    const { data, error } = await this.supabase
      .from('students')
      .select('*')
      .eq('class_id', classId);
    if (error) throw error;
    return data || [];
  }

  async findSubjectsByClass(classId: string) {
    const { data, error } = await this.supabase
      .from('class_subjects')
      .select('*, subject:subjects(*)')
      .eq('class_id', classId);
    if (error) throw error;
    return data || [];
  }

  async getSchoolSettings(schoolId: string) {
    const { data, error } = await this.supabase
      .from('school_settings')
      .select('*')
      .eq('school_id', schoolId)
      .single();
    if (error || !data) return null;
    return data;
  }
}
