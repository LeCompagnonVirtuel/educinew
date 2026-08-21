import type { SupabaseExamRepository } from '../repositories';
import { logger } from '@educi/logger';

interface AverageServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class AverageService {
  constructor(private readonly deps: AverageServiceDeps) {}

  async calculateSubjectAverage(studentId: string, subjectId: string, classId: string, termId: string, academicYearId: string) {
    const marks = await (this.deps.repository as any).supabase
      .from('marks')
      .select('mark, max_mark, exam:exams(coefficient, subject_id)')
      .eq('student_id', studentId)
      .eq('exam.subject_id', subjectId)
      .eq('exam.term_id', termId);

    const markList = marks?.data || [];
    if (markList.length === 0) return { average: 0, rank: 0, totalStudents: 0 };

    let totalWeighted = 0;
    let totalCoeff = 0;
    for (const m of markList) {
      const coeff = m.exam?.coefficient || 1;
      const pct = m.max_mark > 0 ? (m.mark / m.max_mark) * 20 : 0;
      totalWeighted += pct * coeff;
      totalCoeff += coeff;
    }
    const average = totalCoeff > 0 ? Math.round((totalWeighted / totalCoeff) * 100) / 100 : 0;

    const { data: ranking } = await (this.deps.repository as any).supabase
      .from('subject_averages')
      .upsert({
        student_id: studentId,
        subject_id: subjectId,
        class_id: classId,
        term_id: termId,
        academic_year_id: academicYearId,
        school_id: this.deps.schoolId,
        average,
      }, { onConflict: 'student_id,subject_id,term_id' })
      .select()
      .single();

    logger.info('Subject average calculated', { studentId, subjectId, average }, 'exams');
    return ranking || { average, rank: 0, totalStudents: 0 };
  }

  async calculateTermAverage(studentId: string, classId: string, termId: string, academicYearId: string) {
    const { data: averages } = await (this.deps.repository as any).supabase
      .from('subject_averages')
      .select('average, subject:subjects(id)')
      .eq('student_id', studentId)
      .eq('class_id', classId)
      .eq('term_id', termId);

    const { data: coefficients } = await (this.deps.repository as any).supabase
      .from('subject_coefficients')
      .select('subject_id, coefficient')
      .eq('class_id', classId)
      .eq('academic_year_id', academicYearId);

    const avgList = averages || [];
    const coeffMap: Record<string, number> = {};
    for (const c of coefficients || []) coeffMap[c.subject_id] = c.coefficient;

    let totalWeighted = 0;
    let totalCoeff = 0;
    for (const avg of avgList) {
      const coeff = coeffMap[avg.subject?.id] || 1;
      totalWeighted += avg.average * coeff;
      totalCoeff += coeff;
    }
    const average = totalCoeff > 0 ? Math.round((totalWeighted / totalCoeff) * 100) / 100 : 0;

    const result = await this.deps.repository.calculateTermAverage(studentId, classId, termId);
    if (result) {
      await (this.deps.repository as any).supabase
        .from('term_averages')
        .update({ average, updated_at: new Date().toISOString() })
        .eq('id', result.id);
    } else {
      await (this.deps.repository as any).supabase
        .from('term_averages')
        .insert({ student_id: studentId, class_id: classId, term_id: termId, academic_year_id: academicYearId, school_id: this.deps.schoolId, average });
    }

    logger.info('Term average calculated', { studentId, termId, average }, 'exams');
    return { average };
  }

  async calculateSemesterAverage(studentId: string, classId: string, semester: number, academicYearId: string) {
    const { data: terms } = await (this.deps.repository as any).supabase
      .from('terms')
      .select('id, semester')
      .eq('academic_year_id', academicYearId)
      .eq('semester', semester);

    const termAverages = [];
    for (const term of terms || []) {
      const avg = await this.deps.repository.calculateTermAverage(studentId, classId, term.id);
      if (avg) termAverages.push(avg);
    }

    if (termAverages.length === 0) return { average: 0 };
    const average = Math.round((termAverages.reduce((s: number, a: any) => s + a.average, 0) / termAverages.length) * 100) / 100;

    const result = await (this.deps.repository as any).supabase
      .from('semester_averages')
      .upsert({
        student_id: studentId,
        class_id: classId,
        semester,
        academic_year_id: academicYearId,
        school_id: this.deps.schoolId,
        average,
      }, { onConflict: 'student_id,semester,academic_year_id' })
      .select()
      .single();

    logger.info('Semester average calculated', { studentId, semester, average }, 'exams');
    return result?.data || { average };
  }

  async calculateAnnualAverage(studentId: string, classId: string, academicYearId: string) {
    const { data: semesters } = await (this.deps.repository as any).supabase
      .from('semester_averages')
      .select('average')
      .eq('student_id', studentId)
      .eq('class_id', classId)
      .eq('academic_year_id', academicYearId);

    const semList = semesters || [];
    if (semList.length === 0) return { average: 0 };
    const average = Math.round((semList.reduce((s: number, a: any) => s + a.average, 0) / semList.length) * 100) / 100;

    const result = await (this.deps.repository as any).supabase
      .from('annual_averages')
      .upsert({
        student_id: studentId,
        class_id: classId,
        academic_year_id: academicYearId,
        school_id: this.deps.schoolId,
        average,
      }, { onConflict: 'student_id,academic_year_id' })
      .select()
      .single();

    logger.info('Annual average calculated', { studentId, average }, 'exams');
    return result?.data || { average };
  }

  async findSubjectAverages(termId: string, classId: string) {
    return this.deps.repository.findSubjectAverages(termId, classId);
  }
}
