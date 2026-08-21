import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseSettingsService(repo: EnterpriseRepositoryExtended) {
  return {
    async findSettings(enterpriseId: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findSettings(enterpriseId);
    },

    async updateSettings(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.updateSettings(enterpriseId, data);
    },
  };
}
