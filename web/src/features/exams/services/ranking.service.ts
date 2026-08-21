import type { SupabaseExamRepository } from '../repositories';
import { classRankingSchema, schoolRankingSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface RankingServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class RankingService {
  constructor(private readonly deps: RankingServiceDeps) {}

  async calculateClassRanking(classId: string, academicYearId: string, termId?: string) {
    const students = await this.deps.repository.findStudentsByClass(classId);
    const rankings = [];

    for (const student of students) {
      let totalWeighted = 0;
      let totalCoeff = 0;
      const { data: averages } = await (this.deps.repository as any).supabase
        .from('subject_averages')
        .select('average, subject_id')
        .eq('student_id', student.id)
        .eq('class_id', classId)
        .eq(termId ? 'term_id' : 'academic_year_id', termId || academicYearId);

      const { data: coefficients } = await (this.deps.repository as any).supabase
        .from('subject_coefficients')
        .select('subject_id, coefficient')
        .eq('class_id', classId)
        .eq('academic_year_id', academicYearId);

      const coeffMap: Record<string, number> = {};
      for (const c of coefficients || []) coeffMap[c.subject_id] = c.coefficient;

      for (const avg of averages || []) {
        const coeff = coeffMap[avg.subject_id] || 1;
        totalWeighted += avg.average * coeff;
        totalCoeff += coeff;
      }

      const average = totalCoeff > 0 ? Math.round((totalWeighted / totalCoeff) * 100) / 100 : 0;
      rankings.push({ studentId: student.id, average });
    }

    rankings.sort((a: any, b: any) => b.average - a.average);
    for (let i = 0; i < rankings.length; i++) {
      rankings[i].rank = i + 1;
      rankings[i].totalStudents = rankings.length;
    }

    for (const r of rankings) {
      await (this.deps.repository as any).supabase
        .from('student_rankings')
        .upsert({
          student_id: r.studentId,
          class_id: classId,
          academic_year_id: academicYearId,
          term_id: termId || null,
          school_id: this.deps.schoolId,
          average: r.average,
          rank: r.rank,
          total_students: r.totalStudents,
        }, { onConflict: 'student_id,academic_year_id,term_id' });
    }

    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'RANKING_CALCULATE_CLASS', 'ranking', classId, undefined, { count: rankings.length });
    logger.info('Class ranking calculated', { classId, count: rankings.length }, 'exams');
    return rankings;
  }

  async calculateSchoolRanking(academicYearId: string, termId?: string) {
    const classes = await (this.deps.repository as any).supabase
      .from('classes')
      .select('id')
      .eq('school_id', this.deps.schoolId);

    const allRankings = [];
    for (const cls of classes?.data || []) {
      const rankings = await this.calculateClassRanking(cls.id, academicYearId, termId);
      allRankings.push(...rankings);
    }

    allRankings.sort((a: any, b: any) => b.average - a.average);
    for (let i = 0; i < allRankings.length; i++) {
      allRankings[i].schoolRank = i + 1;
    }

    for (const r of allRankings) {
      await (this.deps.repository as any).supabase
        .from('school_rankings')
        .upsert({
          student_id: r.studentId,
          school_id: this.deps.schoolId,
          academic_year_id: academicYearId,
          term_id: termId || null,
          average: r.average,
          class_rank: r.rank,
          school_rank: r.schoolRank,
          total_students: allRankings.length,
        }, { onConflict: 'student_id,school_id,academic_year_id,term_id' });
    }

    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'RANKING_CALCULATE_SCHOOL', 'ranking', this.deps.schoolId, undefined, { count: allRankings.length });
    logger.info('School ranking calculated', { count: allRankings.length }, 'exams');
    return allRankings;
  }

  async findStudentRanking(studentId: string, academicYearId: string, termId?: string) {
    return this.deps.repository.findStudentRanking(studentId, academicYearId, termId);
  }
}
