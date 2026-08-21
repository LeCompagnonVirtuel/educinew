import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseStatisticsService(repo: EnterpriseRepositoryExtended) {
  return {
    async getStatistics(enterpriseId: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getStatistics(enterpriseId);
    },

    async getTopSchools(enterpriseId: string, limit?: number) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getTopSchools(enterpriseId, limit);
    },
  };
}
