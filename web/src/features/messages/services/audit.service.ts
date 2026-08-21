import { logger } from '@educi/logger';
import type { SupabaseMessageRepository } from '../repositories/message.repository';

export class AuditService {
  private readonly repository: SupabaseMessageRepository;
  private readonly schoolId: string;
  constructor(deps: { repository: SupabaseMessageRepository; schoolId: string }) { this.repository = deps.repository; this.schoolId = deps.schoolId; }

  async logAudit(userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>) {
    logger.info('Logging audit', { userId, action, entityType, entityId, schoolId: this.schoolId });
    return this.repository.logAudit(this.schoolId, userId, action, entityType, entityId, previousValue, newValue);
  }

  async getAuditLog(filters?: Record<string, unknown>) {
    logger.info('Getting audit log', { schoolId: this.schoolId });
    return this.repository.getAuditLog(this.schoolId, filters);
  }

  async getAuditEntry(id: string) {
    logger.info('Getting audit entry', { id, schoolId: this.schoolId });
    const { data } = await this.repository.getAuditLog(this.schoolId, { limit: 1000 });
    return data.find((a) => a.id === id) || null;
  }
}
