import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createApiUsageService(repo: EnterpriseRepositoryExtended) {
  return {
    async logApiUsage(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!data?.endpoint) throw new AppError('L\'endpoint est requis');
      return repo.logApiUsage({ ...data, enterprise_id: enterpriseId });
    },

    async findApiUsage(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findApiUsage(enterpriseId, filters);
    },
  };
}
