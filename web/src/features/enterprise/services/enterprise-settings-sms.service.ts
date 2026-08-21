import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseSettingsSmsService(repo: EnterpriseRepositoryExtended) {
  return {
    async findSmsConfig(enterpriseId: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findSmsConfig(enterpriseId);
    },

    async updateSmsConfig(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.updateSmsConfig(enterpriseId, data);
    },
  };
}
