import type { SupabaseExamRepository } from '../repositories';
import { markValidationSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface ValidationServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class ValidationService {
  constructor(private readonly deps: ValidationServiceDeps) {}

  async validateMarks(data: Record<string, unknown>) {
    const parsed = markValidationSchema.parse({ ...data, schoolId: this.deps.schoolId });
    const results = await this.deps.repository.validateMarks(parsed.examId, parsed.validatedBy);

    for (const item of parsed.marks) {
      await (this.deps.repository as any).supabase
        .from('marks')
        .update({
          status: item.approved ? 'VALIDATED' : 'DRAFT',
          validation_comment: item.comment,
          validated_by: parsed.validatedBy,
          validated_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', item.markEntryId);
    }

    await this.deps.repository.logAudit(this.deps.schoolId, parsed.validatedBy, 'MARKS_VALIDATE', 'marks', parsed.examId, undefined, { approved: parsed.marks.filter((m: any) => m.approved).length, rejected: parsed.marks.filter((m: any) => !m.approved).length });
    logger.info('Marks validated', { examId: parsed.examId }, 'exams');
    return results;
  }

  async checkIntegrity(examId: string) {
    const exam = await this.deps.repository.findExam(examId);
    if (!exam) throw new Error('Exam not found');

    const students = await this.deps.repository.findStudentsByClass(exam.class_id);
    const marks = await this.deps.repository.findAllMarks(examId);

    const studentIds = students.map((s: any) => s.id);
    const markStudentIds = marks.map((m: any) => m.student_id);

    const missingStudents = studentIds.filter((id: string) => !markStudentIds.includes(id));
    const extraMarks = markStudentIds.filter((id: string) => !studentIds.includes(id));

    const duplicateMarks: Record<string, number> = {};
    for (const m of markStudentIds) {
      duplicateMarks[m] = (duplicateMarks[m] || 0) + 1;
    }
    const duplicates = Object.entries(duplicateMarks).filter(([, count]) => count > 1).map(([id, count]) => ({ studentId: id, count }));

    const invalidMarks = marks.filter((m: any) => m.mark < 0 || m.mark > m.max_mark);

    const issues = [];
    if (missingStudents.length > 0) issues.push({ type: 'MISSING_MARKS', count: missingStudents.length, studentIds: missingStudents });
    if (extraMarks.length > 0) issues.push({ type: 'EXTRA_MARKS', count: extraMarks.length, studentIds: extraMarks });
    if (duplicates.length > 0) issues.push({ type: 'DUPLICATE_MARKS', duplicates });
    if (invalidMarks.length > 0) issues.push({ type: 'INVALID_MARKS', count: invalidMarks.length });

    return {
      examId,
      totalStudents: studentIds.length,
      totalMarks: marks.length,
      isValid: issues.length === 0,
      issues,
    };
  }

  async getValidationStatus(examId: string) {
    const { data: marks } = await (this.deps.repository as any).supabase
      .from('marks')
      .select('status')
      .eq('exam_id', examId);

    const markList = marks || [];
    return {
      examId,
      total: markList.length,
      draft: markList.filter((m: any) => m.status === 'DRAFT').length,
      submitted: markList.filter((m: any) => m.status === 'SUBMITTED').length,
      validated: markList.filter((m: any) => m.status === 'VALIDATED').length,
      published: markList.filter((m: any) => m.status === 'PUBLISHED').length,
      allValidated: markList.every((m: any) => m.status === 'VALIDATED' || m.status === 'PUBLISHED'),
    };
  }
}
