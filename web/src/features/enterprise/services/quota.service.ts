import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createQuotaService(repo: EnterpriseRepositoryExtended) {
  return {
    async checkQuota(enterpriseId: string, resource: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!resource) throw new AppError('La ressource est requise');
      return repo.checkQuota(enterpriseId, resource);
    },

    async updateQuota(enterpriseId: string, resource: string, limit: number) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!resource) throw new AppError('La ressource est requise');
      if (limit < 0) throw new AppError('La limite doit être positive');
      return repo.updateQuota(enterpriseId, resource, limit);
    },
  };
}
