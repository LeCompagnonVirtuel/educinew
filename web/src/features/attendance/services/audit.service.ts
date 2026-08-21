import type { AttendanceRepository, AttendanceAudit } from '../types';
import { logger } from '@educi/logger';

export class AttendanceAuditService {
  constructor(private readonly repo: AttendanceRepository) {}

  async logAction(schoolId: string, userId: string, action: string, entityType: string, entityId: string, details?: Record<string, unknown>): Promise<void> {
    logger.info('Logging attendance audit', { schoolId, userId, action, entityType, entityId }, 'attendance');
    return this.repo.logAudit(schoolId, userId, action, entityType, entityId, details);
  }

  async getAuditLog(schoolId: string, filters?: any): Promise<AttendanceAudit[]> {
    return this.repo.getAuditLog(schoolId, filters);
  }

  async getEntityHistory(schoolId: string, entityType: string, entityId: string): Promise<AttendanceAudit[]> {
    const allAudits = await this.repo.getAuditLog(schoolId);
    return allAudits.filter(a => a.entityType === entityType && a.entityId === entityId);
  }

  async getRecentActivity(schoolId: string, limit = 10): Promise<AttendanceAudit[]> {
    const audits = await this.repo.getAuditLog(schoolId);
    return audits.slice(0, limit);
  }
}
