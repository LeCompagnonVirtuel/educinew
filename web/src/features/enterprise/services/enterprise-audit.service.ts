import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseAuditService(repo: EnterpriseRepositoryExtended) {
  return {
    async logAudit(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!data?.action) throw new AppError('L\'action est requise');
      return repo.logAudit({ ...data, enterprise_id: enterpriseId });
    },

    async findAuditLogs(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findAuditLogs(enterpriseId, filters);
    },

    async getAuditStats(enterpriseId: string, startDate?: string, endDate?: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getAuditStats(enterpriseId, startDate, endDate);
    },

    async exportAuditLogs(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.exportAuditLogs(enterpriseId, filters);
    },
  };
}
