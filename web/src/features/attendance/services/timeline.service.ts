import type { AttendanceRepository, AttendanceTimeline } from '../types';
import { logger } from '@educi/logger';

export class AttendanceTimelineService {
  constructor(private readonly repo: AttendanceRepository) {}

  async getTimeline(schoolId: string, studentId?: string, teacherId?: string, page = 1, limit = 50): Promise<AttendanceTimeline> {
    logger.info('Getting attendance timeline', { schoolId, studentId, teacherId }, 'attendance');
    return this.repo.getTimeline(schoolId, studentId, teacherId, page, limit);
  }

  async addEvent(schoolId: string, userId: string, entityType: string, entityId: string, action: string, details?: Record<string, unknown>): Promise<void> {
    return this.repo.logAudit(schoolId, userId, action, entityType, entityId, details);
  }

  async getByStudent(schoolId: string, studentId: string, page = 1, limit = 50): Promise<AttendanceTimeline> {
    return this.repo.getTimeline(schoolId, studentId, undefined, page, limit);
  }

  async getByTeacher(schoolId: string, teacherId: string, page = 1, limit = 50): Promise<AttendanceTimeline> {
    return this.repo.getTimeline(schoolId, undefined, teacherId, page, limit);
  }

  async getByClass(schoolId: string, classId: string, page = 1, limit = 50): Promise<AttendanceTimeline> {
    return this.repo.getTimeline(schoolId, undefined, undefined, page, limit);
  }
}
