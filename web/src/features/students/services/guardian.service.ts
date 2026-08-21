import type { StudentRepository, StudentGuardian } from '../types';
import { StudentNotFoundError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AuditStudentService } from './audit-student.service';

export class GuardianService {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly auditService: AuditStudentService,
  ) {}

  async getGuardians(studentId: string) {
    const existing = await this.studentRepo.findById(studentId);
    if (!existing) throw new StudentNotFoundError(studentId);
    return this.studentRepo.getGuardians(studentId);
  }

  async addGuardian(studentId: string, guardian: Omit<StudentGuardian, 'id' | 'studentId'>) {
    const existing = await this.studentRepo.findById(studentId);
    if (!existing) throw new StudentNotFoundError(studentId);

    const result = await this.studentRepo.addGuardian(studentId, guardian);

    await this.auditService.log({
      action: 'STUDENT_GUARDIAN_ADD',
      studentId,
      details: { name: guardian.name, relationship: guardian.relationship },
    });

    logger.info('Guardian added', { studentId, name: guardian.name }, 'students');
    return result;
  }

  async removeGuardian(guardianId: string) {
    await this.studentRepo.removeGuardian(guardianId);
    await this.auditService.log({ action: 'STUDENT_GUARDIAN_REMOVE', details: { guardianId } });
  }
}
