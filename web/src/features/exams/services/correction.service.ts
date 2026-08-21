import type { SupabaseExamRepository } from '../repositories';
import { correctionSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface CorrectionServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class CorrectionService {
  constructor(private readonly deps: CorrectionServiceDeps) {}

  async create(data: Record<string, unknown>) {
    const parsed = correctionSchema.parse({ ...data, schoolId: this.deps.schoolId });
    const correction = await this.deps.repository.createCorrection(parsed as Record<string, unknown>);
    await this.deps.repository.logAudit(this.deps.schoolId, parsed.correctedBy as string, 'CORRECTION_CREATE', 'correction', correction.id, undefined, correction);
    logger.info('Correction created', { correctionId: correction.id }, 'exams');
    return correction;
  }

  async approve(id: string, approvedBy: string) {
    const existing = await this.deps.repository.findCorrection(id);
    if (!existing) throw new Error('Correction not found');
    if (existing.status !== 'PENDING') throw new Error('Correction is not pending');

    const correction = await this.deps.repository.approveCorrection(id, approvedBy);
    await this.deps.repository.logAudit(this.deps.schoolId, approvedBy, 'CORRECTION_APPROVE', 'correction', id, existing, correction);
    logger.info('Correction approved', { correctionId: id }, 'exams');
    return correction;
  }

  async reject(id: string, rejectedBy: string, reason: string) {
    const existing = await this.deps.repository.findCorrection(id);
    if (!existing) throw new Error('Correction not found');
    if (existing.status !== 'PENDING') throw new Error('Correction is not pending');

    const correction = await this.deps.repository.rejectCorrection(id, rejectedBy, reason);
    await this.deps.repository.logAudit(this.deps.schoolId, rejectedBy, 'CORRECTION_REJECT', 'correction', id, existing, correction);
    logger.info('Correction rejected', { correctionId: id }, 'exams');
    return correction;
  }

  async findById(id: string) {
    const correction = await this.deps.repository.findCorrection(id);
    if (!correction) throw new Error('Correction not found');
    return correction;
  }

  async findByExam(examId: string) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('corrections')
      .select('*')
      .eq('exam_id', examId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async findPending() {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('corrections')
      .select('*')
      .eq('school_id', this.deps.schoolId)
      .eq('status', 'PENDING')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
}
