import type { TeacherRepository, TeacherCertification } from '../types';
import { TeacherNotFoundError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AuditTeacherService } from './audit-teacher.service';

export class CertificationService {
  constructor(
    private readonly teacherRepo: TeacherRepository,
    private readonly auditService: AuditTeacherService,
  ) {}

  async getCertifications(teacherId: string) {
    const existing = await this.teacherRepo.findById(teacherId);
    if (!existing) throw new TeacherNotFoundError(teacherId);

    return this.teacherRepo.getCertifications(teacherId);
  }

  async addCertification(data: Omit<TeacherCertification, 'id' | 'createdAt'>) {
    const existing = await this.teacherRepo.findById(data.teacherId);
    if (!existing) throw new TeacherNotFoundError(data.teacherId);

    if (data.expiryDate && data.issueDate > data.expiryDate) {
      throw new Error('La date d\'expiration doit être après la date d\'émission');
    }

    await this.auditService.log({
      action: 'TEACHER_DOCUMENT',
      teacherId: data.teacherId,
      details: { name: data.name, issuingOrganization: data.issuingOrganization },
    });
    logger.info('Certification added', { teacherId: data.teacherId }, 'teachers');
  }
}
