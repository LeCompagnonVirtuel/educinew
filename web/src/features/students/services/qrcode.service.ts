import type { StudentRepository } from '../types';
import { StudentNotFoundError, StudentQRCodeError } from '@educi/errors';
import { STUDENT_QRCODE } from '@educi/config';
import { logger } from '@educi/logger';
import { AuditStudentService } from './audit-student.service';

export class QRCodeService {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly auditService: AuditStudentService,
  ) {}

  async generate(studentId: string, type: 'ATTENDANCE' | 'IDENTITY' | 'PAYMENT' | 'GENERAL' = 'GENERAL'): Promise<string> {
    const existing = await this.studentRepo.findById(studentId);
    if (!existing) throw new StudentNotFoundError(studentId);

    try {
      const code = await this.studentRepo.generateQRCode(studentId);

      await this.auditService.log({
        action: 'STUDENT_QRCODE_GENERATE',
        studentId,
        details: { type, code },
      });

      logger.info('QR Code generated', { studentId, type }, 'students');
      return code;
    } catch (err) {
      throw new StudentQRCodeError();
    }
  }

  getExpiryHours(type: string): number {
    return STUDENT_QRCODE.EXPIRY_HOURS[type as keyof typeof STUDENT_QRCODE.EXPIRY_HOURS] || 4320;
  }
}
