import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseSettingsSecurityService(repo: EnterpriseRepositoryExtended) {
  return {
    async findSecurityConfig(enterpriseId: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findSecurityConfig(enterpriseId);
    },

    async updateSecurityConfig(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.updateSecurityConfig(enterpriseId, data);
    },
  };
}
