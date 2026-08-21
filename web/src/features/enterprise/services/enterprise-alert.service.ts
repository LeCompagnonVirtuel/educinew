import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseAlertService(repo: EnterpriseRepositoryExtended) {
  return {
    async getAlerts(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getAlerts(enterpriseId, filters);
    },
  };
}
