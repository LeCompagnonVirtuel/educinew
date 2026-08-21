import type { SupabaseExamRepository } from '../repositories';
import { publicationSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface PublicationServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class PublicationService {
  constructor(private readonly deps: PublicationServiceDeps) {}

  async publishExam(data: Record<string, unknown>) {
    const parsed = publicationSchema.parse({ ...data, schoolId: this.deps.schoolId });
    const exam = await this.deps.repository.publishExam(parsed.examId as string);

    if (parsed.publishMarks) {
      await this.deps.repository.publishMarks(parsed.examId as string);
    }

    if (parsed.notifyStudents) {
      const marks = await this.deps.repository.findAllMarks(parsed.examId as string);
      const studentIds = [...new Set(marks.map((m: any) => m.student_id))];
      for (const studentId of studentIds) {
        await (this.deps.repository as any).supabase
          .from('exam_notifications')
          .insert({
            school_id: this.deps.schoolId,
            exam_id: parsed.examId,
            user_id: studentId,
            type: 'PUBLICATION',
            message: parsed.message || 'Your exam results have been published.',
            is_read: false,
          });
      }
    }

    if (parsed.notifyParents) {
      const marks = await this.deps.repository.findAllMarks(parsed.examId as string);
      const studentIds = [...new Set(marks.map((m: any) => m.student_id))];
      for (const studentId of studentIds) {
        const student = await this.deps.repository.findStudent(studentId);
        if (student?.parent_id) {
          await (this.deps.repository as any).supabase
            .from('exam_notifications')
            .insert({
              school_id: this.deps.schoolId,
              exam_id: parsed.examId,
              user_id: student.parent_id,
              type: 'PUBLICATION',
              message: parsed.message || 'Your child exam results have been published.',
              is_read: false,
            });
        }
      }
    }

    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'EXAM_PUBLISH_FULL', 'exam', parsed.examId as string, undefined, parsed);
    logger.info('Exam published with full options', { examId: parsed.examId }, 'exams');
    return exam;
  }

  async publishMarks(examId: string) {
    const results = await this.deps.repository.publishMarks(examId);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'MARKS_PUBLISH', 'marks', examId, undefined, { count: results.length });
    logger.info('Marks published', { examId, count: results.length }, 'exams');
    return results;
  }

  async publishResults(examId: string) {
    const exam = await this.deps.repository.findExam(examId);
    if (!exam) throw new Error('Exam not found');

    const marks = await this.deps.repository.findAllMarks(examId);
    const results = [];
    for (const mark of marks) {
      const { data: result, error } = await (this.deps.repository as any).supabase
        .from('exam_results')
        .upsert({
          exam_id: examId,
          student_id: mark.student_id,
          school_id: this.deps.schoolId,
          mark: mark.mark,
          max_mark: mark.max_mark,
          status: 'PUBLISHED',
        }, { onConflict: 'exam_id,student_id' })
        .select()
        .single();
      if (!error && result) results.push(result);
    }

    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'RESULTS_PUBLISH', 'exam_results', examId, undefined, { count: results.length });
    logger.info('Results published', { examId, count: results.length }, 'exams');
    return results;
  }
}
