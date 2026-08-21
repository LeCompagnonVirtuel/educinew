import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseSettingsPaymentService(repo: EnterpriseRepositoryExtended) {
  return {
    async findPaymentConfig(enterpriseId: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findPaymentConfig(enterpriseId);
    },

    async updatePaymentConfig(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.updatePaymentConfig(enterpriseId, data);
    },
  };
}
