import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createBillingService(repo: EnterpriseRepositoryExtended) {
  return {
    async getBillingCycles(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getBillingCycles(enterpriseId, filters);
    },

    async getInvoices(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getInvoices(enterpriseId, filters);
    },
  };
}
