import type { TeacherRepository, TeacherAvailability } from '../types';
import { TeacherNotFoundError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AuditTeacherService } from './audit-teacher.service';

export class AvailabilityService {
  constructor(
    private readonly teacherRepo: TeacherRepository,
    private readonly auditService: AuditTeacherService,
  ) {}

  async getAvailability(teacherId: string) {
    const existing = await this.teacherRepo.findById(teacherId);
    if (!existing) throw new TeacherNotFoundError(teacherId);

    return this.teacherRepo.getAvailability(teacherId);
  }

  async createAvailability(data: Omit<TeacherAvailability, 'id' | 'createdAt'>) {
    const existing = await this.teacherRepo.findById(data.teacherId);
    if (!existing) throw new TeacherNotFoundError(data.teacherId);

    await this.auditService.log({
      action: 'TEACHER_SCHEDULE_CHANGE',
      teacherId: data.teacherId,
      details: { dayOfWeek: data.dayOfWeek, isAvailable: data.isAvailable },
    });
    logger.info('Availability created', { teacherId: data.teacherId }, 'teachers');
  }
}
