import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class AuditService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async logAudit(userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>) {
    await this.repository.logAuditEntry(this.schoolId, userId, action, entityType, entityId, previousValue, newValue);
    logger.info('Audit entry logged', { userId, action, entityType, entityId }, 'finance');
  }

  async getAuditLog(filters?: Record<string, unknown>) {
    return this.repository.getAuditLog(this.schoolId, filters);
  }

  async getAuditEntry(id: string) {
    const entry = await this.repository.findAuditEntryById(id);
    if (!entry) {
      logger.warn('Audit entry not found', { entryId: id }, 'finance');
    }
    return entry;
  }
}
