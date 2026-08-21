import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseReportService(repo: EnterpriseRepositoryExtended) {
  return {
    async getReports(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getReports(enterpriseId, filters);
    },
  };
}
