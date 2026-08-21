import type { SupabaseExamRepository } from '../repositories';
import { logger } from '@educi/logger';

interface AnalyticsServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class AnalyticsService {
  constructor(private readonly deps: AnalyticsServiceDeps) {}

  async getAnalytics(termId?: string) {
    return this.deps.repository.getExamAnalytics(this.deps.schoolId, termId);
  }

  async getTrends(academicYearId: string) {
    const { data: terms } = await (this.deps.repository as any).supabase
      .from('terms')
      .select('id, name, semester')
      .eq('academic_year_id', academicYearId)
      .order('semester');

    const trends = [];
    for (const term of terms || []) {
      const { data: exams } = await (this.deps.repository as any).supabase
        .from('exams')
        .select('id')
        .eq('term_id', term.id)
        .eq('school_id', this.deps.schoolId);

      let totalAvg = 0;
      let count = 0;
      for (const exam of exams || []) {
        const stats = await this.deps.repository.getExamStatistics(exam.id);
        if (stats.totalStudents > 0) {
          totalAvg += stats.average;
          count++;
        }
      }

      trends.push({
        termId: term.id,
        termName: term.name,
        semester: term.semester,
        average: count > 0 ? Math.round((totalAvg / count) * 100) / 100 : 0,
        examCount: exams?.length || 0,
      });
    }

    return trends;
  }

  async getSubjectPerformance(classId: string, termId: string) {
    const { data: subjects } = await (this.deps.repository as any).supabase
      .from('class_subjects')
      .select('*, subject:subjects(id, name)')
      .eq('class_id', classId);

    const performance = [];
    for (const cs of subjects || []) {
      const { data: marks } = await (this.deps.repository as any).supabase
        .from('marks')
        .select('mark, max_mark')
        .in('exam_id', (await (this.deps.repository as any).supabase
          .from('exams')
          .select('id')
          .eq('subject_id', cs.subject?.id)
          .eq('class_id', classId)
          .eq('term_id', termId)).data?.map((e: any) => e.id) || []);

      const markList = marks || [];
      const avg = markList.length > 0 ? Math.round((markList.reduce((s: number, m: any) => s + (m.mark / m.max_mark) * 20, 0) / markList.length) * 100) / 100 : 0;

      performance.push({
        subjectId: cs.subject?.id,
        subjectName: cs.subject?.name,
        average: avg,
        totalMarks: markList.length,
        passRate: markList.length > 0 ? Math.round((markList.filter((m: any) => (m.mark / m.max_mark) * 20 >= 10).length / markList.length) * 100) : 0,
      });
    }

    return performance;
  }

  async getStudentProgress(studentId: string, academicYearId: string) {
    const { data: terms } = await (this.deps.repository as any).supabase
      .from('terms')
      .select('id, name')
      .eq('academic_year_id', academicYearId)
      .order('semester');

    const progress = [];
    for (const term of terms || []) {
      const termAvg = await (this.deps.repository as any).supabase
        .from('term_averages')
        .select('average, rank, total_students')
        .eq('student_id', studentId)
        .eq('term_id', term.id)
        .single();

      progress.push({
        termId: term.id,
        termName: term.name,
        average: termAvg?.data?.average || 0,
        rank: termAvg?.data?.rank || 0,
        totalStudents: termAvg?.data?.total_students || 0,
      });
    }

    return progress;
  }

  async getComparison(classId: string, termId: string) {
    const { data: students } = await (this.deps.repository as any).supabase
      .from('students')
      .select('id')
      .eq('class_id', classId);

    const { data: exams } = await (this.deps.repository as any).supabase
      .from('exams')
      .select('id, name, subject_id')
      .eq('class_id', classId)
      .eq('term_id', termId);

    const examIds = (exams || []).map((e: any) => e.id);
    if (examIds.length === 0) return { students: [], exams: [] };

    const comparison = [];
    for (const student of students || []) {
      const { data: marks } = await (this.deps.repository as any).supabase
        .from('marks')
        .select('mark, max_mark, exam_id')
        .eq('student_id', student.id)
        .in('exam_id', examIds);

      const marksByExam: Record<string, number> = {};
      for (const m of marks || []) {
        marksByExam[m.exam_id] = Math.round((m.mark / m.max_mark) * 20 * 100) / 100;
      }

      comparison.push({ studentId: student.id, marks: marksByExam });
    }

    return { students: comparison, exams: exams || [] };
  }
}
