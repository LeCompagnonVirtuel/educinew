import type { TeacherRepository, TeacherSchedule } from '../types';
import { TeacherNotFoundError, TeacherScheduleConflictError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AuditTeacherService } from './audit-teacher.service';

export class ScheduleService {
  constructor(
    private readonly teacherRepo: TeacherRepository,
    private readonly auditService: AuditTeacherService,
  ) {}

  async getSchedule(teacherId: string) {
    const existing = await this.teacherRepo.findById(teacherId);
    if (!existing) throw new TeacherNotFoundError(teacherId);

    return this.teacherRepo.getSchedule(teacherId);
  }

  async createScheduleEntry(data: Omit<TeacherSchedule, 'id' | 'createdAt'>) {
    const existing = await this.teacherRepo.findById(data.teacherId);
    if (!existing) throw new TeacherNotFoundError(data.teacherId);

    const schedule = await this.teacherRepo.getSchedule(data.teacherId);
    const hasConflict = schedule.some(
      (s) => s.dayOfWeek === data.dayOfWeek &&
        s.startTime < data.endTime &&
        data.startTime < s.endTime &&
        s.isActive
    );
    if (hasConflict) throw new TeacherScheduleConflictError('Conflit avec un cours existant');

    await this.auditService.log({
      action: 'TEACHER_SCHEDULE_CHANGE',
      teacherId: data.teacherId,
      details: { dayOfWeek: data.dayOfWeek, startTime: data.startTime, endTime: data.endTime },
    });
    logger.info('Schedule entry created', { teacherId: data.teacherId }, 'teachers');
  }
}
