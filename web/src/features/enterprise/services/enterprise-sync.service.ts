import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseSyncService(repo: EnterpriseRepositoryExtended) {
  return {
    async sync(enterpriseId: string, type: string, options?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!type) throw new AppError('Le type de synchronisation est requis');
      return repo.sync(enterpriseId, type, options);
    },
  };
}
