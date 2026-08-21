import type { StudentRepository, StudentMedicalRecord } from '../types';
import { StudentNotFoundError, StudentMedicalError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AuditStudentService } from './audit-student.service';

export class MedicalService {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly auditService: AuditStudentService,
  ) {}

  async getMedicalRecord(studentId: string) {
    const existing = await this.studentRepo.findById(studentId);
    if (!existing) throw new StudentNotFoundError(studentId);
    return this.studentRepo.getMedicalRecord(studentId);
  }

  async updateMedicalRecord(studentId: string, data: Partial<StudentMedicalRecord>) {
    const existing = await this.studentRepo.findById(studentId);
    if (!existing) throw new StudentNotFoundError(studentId);

    try {
      await this.studentRepo.updateMedicalRecord(studentId, data);
      await this.auditService.log({
        action: 'STUDENT_MEDICAL_UPDATE',
        studentId,
        details: { fields: Object.keys(data) },
      });
      logger.info('Medical record updated', { studentId }, 'students');
    } catch (err) {
      throw new StudentMedicalError();
    }
  }
}
