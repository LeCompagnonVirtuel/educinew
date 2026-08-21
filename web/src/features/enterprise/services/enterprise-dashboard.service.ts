import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseDashboardService(repo: EnterpriseRepositoryExtended) {
  return {
    async getDashboard(enterpriseId: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getDashboard(enterpriseId);
    },

    async getKPIs(enterpriseId: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getKPIs(enterpriseId);
    },
  };
}
