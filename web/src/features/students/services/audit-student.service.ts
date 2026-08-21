import { logger } from '@educi/logger';

export interface AuditStudentEvent {
  action: string;
  studentId?: string;
  schoolId?: string;
  userId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export class AuditStudentService {
  async log(event: AuditStudentEvent): Promise<void> {
    logger.info('Student audit event', {
      action: event.action,
      studentId: event.studentId,
      schoolId: event.schoolId,
      userId: event.userId,
      details: event.details,
    }, 'students');
  }
}
