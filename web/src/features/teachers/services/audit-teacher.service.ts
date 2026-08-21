import { logger } from '@educi/logger';

interface AuditLogEntry {
  action: string;
  teacherId: string;
  schoolId?: string;
  details?: Record<string, unknown>;
}

export class AuditTeacherService {
  async log(entry: AuditLogEntry): Promise<void> {
    logger.info(`[AUDIT] ${entry.action}`, {
      teacherId: entry.teacherId,
      schoolId: entry.schoolId,
      details: entry.details,
    }, 'teachers');
  }
}
