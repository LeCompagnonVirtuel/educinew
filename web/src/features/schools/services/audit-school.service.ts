import { logger } from '@educi/logger';

export interface AuditSchoolEvent {
  action: string;
  entity: string;
  schoolId?: string;
  userId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export class AuditSchoolService {
  async log(event: AuditSchoolEvent): Promise<void> {
    logger.info('School audit event', {
      action: event.action,
      entity: event.entity,
      schoolId: event.schoolId,
      userId: event.userId,
      details: event.details,
    }, 'schools');
  }
}
