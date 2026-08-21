import type { SupabaseExamRepository } from '../repositories';
import { markEntrySchema, bulkMarkEntrySchema, markValidationSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface MarkServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class MarkService {
  constructor(private readonly deps: MarkServiceDeps) {}

  async enter(data: Record<string, unknown>) {
    const parsed = markEntrySchema.parse(data);
    const entries = parsed.marks.map((m: any) => ({
      exam_id: parsed.examId,
      student_id: parsed.studentId,
      subject_id: m.subjectId,
      mark: m.mark,
      max_mark: m.maxMark,
      comment: m.comment,
      status: parsed.status || 'DRAFT',
      school_id: this.deps.schoolId,
    }));
    const marks = await this.deps.repository.bulkEnterMarks(entries);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'MARK_ENTER', 'mark', parsed.examId, undefined, { studentId: parsed.studentId, count: marks.length });
    logger.info('Marks entered', { examId: parsed.examId, studentId: parsed.studentId }, 'exams');
    return marks;
  }

  async bulkEnter(data: Record<string, unknown>) {
    const parsed = bulkMarkEntrySchema.parse(data);
    const entries = parsed.entries.flatMap((e: any) =>
      e.marks.map((m: any) => ({
        exam_id: parsed.examId,
        student_id: e.studentId,
        subject_id: m.subjectId,
        mark: m.mark,
        max_mark: m.maxMark,
        comment: m.comment,
        status: parsed.status || 'DRAFT',
        school_id: this.deps.schoolId,
      }))
    );
    const marks = await this.deps.repository.bulkEnterMarks(entries);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'MARK_BULK_ENTER', 'mark', parsed.examId, undefined, { count: marks.length });
    logger.info('Bulk marks entered', { examId: parsed.examId, count: marks.length }, 'exams');
    return marks;
  }

  async update(id: string, data: Record<string, unknown>) {
    const existing = await this.deps.repository.findMark(id);
    if (!existing) throw new Error('Mark not found');
    const mark = await this.deps.repository.updateMark(id, data);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'MARK_UPDATE', 'mark', id, existing, mark);
    return mark;
  }

  async delete(id: string) {
    const existing = await this.deps.repository.findMark(id);
    if (!existing) throw new Error('Mark not found');
    await this.deps.repository.deleteMark(id);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'MARK_DELETE', 'mark', id, existing, undefined);
  }

  async validate(data: Record<string, unknown>) {
    const parsed = markValidationSchema.parse({ ...data, schoolId: this.deps.schoolId });
    const results = await this.deps.repository.validateMarks(parsed.examId, parsed.validatedBy);
    await this.deps.repository.logAudit(this.deps.schoolId, parsed.validatedBy, 'MARK_VALIDATE', 'mark', parsed.examId, undefined, { count: results.length });
    logger.info('Marks validated', { examId: parsed.examId, count: results.length }, 'exams');
    return results;
  }

  async publish(examId: string) {
    const results = await this.deps.repository.publishMarks(examId);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'MARK_PUBLISH', 'mark', examId, undefined, { count: results.length });
    logger.info('Marks published', { examId, count: results.length }, 'exams');
    return results;
  }

  async findByExam(examId: string) {
    return this.deps.repository.findAllMarks(examId);
  }

  async findById(id: string) {
    const mark = await this.deps.repository.findMark(id);
    if (!mark) throw new Error('Mark not found');
    return mark;
  }
}
