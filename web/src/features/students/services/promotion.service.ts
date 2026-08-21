import type { StudentRepository, StudentPromotion, StudentTransfer } from '../types';
import { StudentNotFoundError, StudentPromotionError, StudentTransferError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AuditStudentService } from './audit-student.service';

export class PromotionService {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly auditService: AuditStudentService,
  ) {}

  async promote(studentId: string, data: Omit<StudentPromotion, 'id' | 'studentId'>) {
    const existing = await this.studentRepo.findById(studentId);
    if (!existing) throw new StudentNotFoundError(studentId);

    try {
      const promotion = await this.studentRepo.promote(studentId, data);
      await this.auditService.log({
        action: 'STUDENT_PROMOTE',
        studentId,
        details: { type: data.type, toClassId: data.toClassId },
      });
      logger.info('Student promoted', { studentId, type: data.type }, 'students');
      return promotion;
    } catch (err) {
      logger.error('Promotion failed', { studentId, error: err }, 'students');
      throw new StudentPromotionError();
    }
  }

  async getPromotionHistory(studentId: string) {
    return this.studentRepo.getTimeline(studentId, 100);
  }
}
