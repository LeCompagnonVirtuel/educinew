import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createStorageService(repo: EnterpriseRepositoryExtended) {
  return {
    async getUsage(enterpriseId: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getStorageUsage(enterpriseId);
    },

    async getQuota(enterpriseId: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getStorageQuota(enterpriseId);
    },
  };
}
