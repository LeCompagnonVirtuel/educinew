import type { TeacherRepository, TeacherQualification } from '../types';
import { TeacherNotFoundError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AuditTeacherService } from './audit-teacher.service';

export class QualificationService {
  constructor(
    private readonly teacherRepo: TeacherRepository,
    private readonly auditService: AuditTeacherService,
  ) {}

  async getQualifications(teacherId: string) {
    const existing = await this.teacherRepo.findById(teacherId);
    if (!existing) throw new TeacherNotFoundError(teacherId);

    return this.teacherRepo.getQualifications(teacherId);
  }

  async addQualification(data: Omit<TeacherQualification, 'id' | 'createdAt'>) {
    const existing = await this.teacherRepo.findById(data.teacherId);
    if (!existing) throw new TeacherNotFoundError(data.teacherId);

    await this.auditService.log({
      action: 'TEACHER_DOCUMENT',
      teacherId: data.teacherId,
      details: { degree: data.degree, institution: data.institution },
    });
    logger.info('Qualification added', { teacherId: data.teacherId }, 'teachers');
  }
}
