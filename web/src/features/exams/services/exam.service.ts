import type { SupabaseExamRepository } from '../repositories';
import { createExamSchema, updateExamSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface ExamServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class ExamService {
  constructor(private readonly deps: ExamServiceDeps) {}

  async create(data: Record<string, unknown>) {
    const parsed = createExamSchema.parse({ ...data, schoolId: this.deps.schoolId });
    const exam = await this.deps.repository.createExam(parsed as Record<string, unknown>);
    await this.deps.repository.logAudit(this.deps.schoolId, parsed.schoolId as string, 'EXAM_CREATE', 'exam', exam.id, undefined, exam);
    logger.info('Exam created', { examId: exam.id }, 'exams');
    return exam;
  }

  async update(id: string, data: Record<string, unknown>) {
    const existing = await this.deps.repository.findExam(id);
    if (!existing) throw new Error('Exam not found');
    const parsed = updateExamSchema.parse(data);
    const exam = await this.deps.repository.updateExam(id, parsed as Record<string, unknown>);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'EXAM_UPDATE', 'exam', id, existing, exam);
    return exam;
  }

  async delete(id: string) {
    const existing = await this.deps.repository.findExam(id);
    if (!existing) throw new Error('Exam not found');
    await this.deps.repository.deleteExam(id);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'EXAM_DELETE', 'exam', id, existing, undefined);
    logger.info('Exam deleted', { examId: id }, 'exams');
  }

  async archive(id: string) {
    const existing = await this.deps.repository.findExam(id);
    if (!existing) throw new Error('Exam not found');
    const exam = await this.deps.repository.archiveExam(id);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'EXAM_ARCHIVE', 'exam', id, existing, exam);
    return exam;
  }

  async publish(id: string) {
    const existing = await this.deps.repository.findExam(id);
    if (!existing) throw new Error('Exam not found');
    if (existing.status !== 'DRAFT') throw new Error('Only draft exams can be published');
    const exam = await this.deps.repository.publishExam(id);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'EXAM_PUBLISH', 'exam', id, existing, exam);
    return exam;
  }

  async lock(id: string) {
    const existing = await this.deps.repository.findExam(id);
    if (!existing) throw new Error('Exam not found');
    if (existing.status !== 'PUBLISHED') throw new Error('Only published exams can be locked');
    const exam = await this.deps.repository.lockExam(id);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'EXAM_LOCK', 'exam', id, existing, exam);
    return exam;
  }

  async findById(id: string) {
    const exam = await this.deps.repository.findExam(id);
    if (!exam) throw new Error('Exam not found');
    return exam;
  }

  async findAll(filters?: Record<string, unknown>) {
    return this.deps.repository.findAllExams(this.deps.schoolId, filters);
  }

  async search(query: string) {
    return this.deps.repository.searchExams(this.deps.schoolId, query);
  }

  async getStatistics(examId: string) {
    return this.deps.repository.getExamStatistics(examId);
  }

  async getDashboard() {
    return this.deps.repository.getExamDashboard(this.deps.schoolId);
  }

  async getAnalytics(termId?: string) {
    return this.deps.repository.getExamAnalytics(this.deps.schoolId, termId);
  }

  async getTimeline(limit?: number) {
    return this.deps.repository.getTimeline(this.deps.schoolId, limit);
  }
}
