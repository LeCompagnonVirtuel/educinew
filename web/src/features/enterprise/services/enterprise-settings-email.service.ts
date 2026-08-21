import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseSettingsEmailService(repo: EnterpriseRepositoryExtended) {
  return {
    async findEmailConfig(enterpriseId: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findEmailConfig(enterpriseId);
    },

    async updateEmailConfig(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.updateEmailConfig(enterpriseId, data);
    },
  };
}
