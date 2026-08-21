import { sbAudit } from './domains/audit.service';

export const auditApi = {
  getAuditLogs: (filters?: { schoolId?: string; userId?: string; action?: string; entityType?: string; startDate?: string; endDate?: string; limit?: number; offset?: number }) =>
    sbAudit.list(filters),
};