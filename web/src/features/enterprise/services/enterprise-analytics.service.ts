import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseAnalyticsService(repo: EnterpriseRepositoryExtended) {
  return {
    async getSnapshots(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getSnapshots(enterpriseId, filters);
    },

    async getRange(enterpriseId: string, startDate: string, endDate: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!startDate || !endDate) throw new AppError('Les dates de début et de fin sont requises');
      return repo.getAnalyticsRange(enterpriseId, startDate, endDate);
    },

    async getGrowth(enterpriseId: string, period?: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getGrowth(enterpriseId, period);
    },
  };
}
