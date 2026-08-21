import type { SupabaseExamRepository } from '../repositories';
import { examStatisticsSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface StatisticsServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class StatisticsService {
  constructor(private readonly deps: StatisticsServiceDeps) {}

  async getExamStatistics(examId: string) {
    return this.deps.repository.getExamStatistics(examId);
  }

  async getStatisticsByClass(classId: string, termId: string) {
    const { data: exams } = await (this.deps.repository as any).supabase
      .from('exams')
      .select('id, name, type, coefficient, subject_id')
      .eq('class_id', classId)
      .eq('term_id', termId);

    const statistics = [];
    for (const exam of exams || []) {
      const stats = await this.deps.repository.getExamStatistics(exam.id);
      statistics.push({ ...exam, ...stats });
    }
    return statistics;
  }

  async getStatisticsBySubject(subjectId: string, classId: string, termId: string) {
    const { data: exams } = await (this.deps.repository as any).supabase
      .from('exams')
      .select('id, name, type, coefficient')
      .eq('subject_id', subjectId)
      .eq('class_id', classId)
      .eq('term_id', termId);

    const statistics = [];
    for (const exam of exams || []) {
      const stats = await this.deps.repository.getExamStatistics(exam.id);
      statistics.push({ ...exam, ...stats });
    }

    const allAvgs = statistics.map((s: any) => s.average).filter((a: number) => a > 0);
    const overallAverage = allAvgs.length > 0 ? Math.round((allAvgs.reduce((s: number, v: number) => s + v, 0) / allAvgs.length) * 100) / 100 : 0;

    return { subjectId, classId, termId, exams: statistics, overallAverage };
  }

  async getTermStatistics(classId: string, termId: string) {
    const { data: students } = await (this.deps.repository as any).supabase
      .from('students')
      .select('id')
      .eq('class_id', classId);

    const studentStats = [];
    for (const student of students || []) {
      const { data: marks } = await (this.deps.repository as any).supabase
        .from('marks')
        .select('mark, max_mark')
        .eq('student_id', student.id)
        .in('exam_id', (await (this.deps.repository as any).supabase
          .from('exams')
          .select('id')
          .eq('class_id', classId)
          .eq('term_id', termId)).data?.map((e: any) => e.id) || []);

      const markList = marks || [];
      const avg = markList.length > 0 ? Math.round((markList.reduce((s: number, m: any) => s + (m.mark / m.max_mark) * 20, 0) / markList.length) * 100) / 100 : 0;
      studentStats.push({ studentId: student.id, average: avg, totalMarks: markList.length });
    }

    studentStats.sort((a: any, b: any) => b.average - a.average);
    for (let i = 0; i < studentStats.length; i++) studentStats[i].rank = i + 1;

    const allAvgs = studentStats.map((s: any) => s.average);
    return {
      classId,
      termId,
      totalStudents: studentStats.length,
      classAverage: allAvgs.length > 0 ? Math.round((allAvgs.reduce((s: number, v: number) => s + v, 0) / allAvgs.length) * 100) / 100 : 0,
      highestAverage: allAvgs.length > 0 ? Math.max(...allAvgs) : 0,
      lowestAverage: allAvgs.length > 0 ? Math.min(...allAvgs) : 0,
      passRate: allAvgs.length > 0 ? Math.round((allAvgs.filter((a: number) => a >= 10).length / allAvgs.length) * 100) : 0,
      students: studentStats,
    };
  }

  async getDistribution(examId: string) {
    const { data: marks } = await (this.deps.repository as any).supabase
      .from('marks')
      .select('mark, max_mark')
      .eq('exam_id', examId);

    const markList = marks || [];
    if (markList.length === 0) return { examId, distribution: [], totalStudents: 0 };

    const distribution = [
      { range: '0-4', count: 0, percentage: 0 },
      { range: '5-9', count: 0, percentage: 0 },
      { range: '10-14', count: 0, percentage: 0 },
      { range: '15-19', count: 0, percentage: 0 },
      { range: '20', count: 0, percentage: 0 },
    ];

    for (const m of markList) {
      const pct = (m.mark / m.max_mark) * 20;
      if (pct < 5) distribution[0].count++;
      else if (pct < 10) distribution[1].count++;
      else if (pct < 15) distribution[2].count++;
      else if (pct < 20) distribution[3].count++;
      else distribution[4].count++;
    }

    for (const d of distribution) d.percentage = Math.round((d.count / markList.length) * 100);

    return { examId, distribution, totalStudents: markList.length };
  }
}
