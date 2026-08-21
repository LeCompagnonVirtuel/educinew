import type { StudentRepository, StudentTransfer } from '../types';
import { StudentNotFoundError, StudentTransferError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AuditStudentService } from './audit-student.service';

export class TransferService {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly auditService: AuditStudentService,
  ) {}

  async transfer(studentId: string, data: Omit<StudentTransfer, 'id' | 'studentId'>) {
    const existing = await this.studentRepo.findById(studentId);
    if (!existing) throw new StudentNotFoundError(studentId);

    try {
      const transfer = await this.studentRepo.transfer(studentId, data);
      await this.auditService.log({
        action: 'STUDENT_TRANSFER',
        studentId,
        details: { reason: data.reason, toSchoolId: data.toSchoolId },
      });
      logger.info('Student transferred', { studentId }, 'students');
      return transfer;
    } catch (err) {
      logger.error('Transfer failed', { studentId, error: err }, 'students');
      throw new StudentTransferError();
    }
  }
}
