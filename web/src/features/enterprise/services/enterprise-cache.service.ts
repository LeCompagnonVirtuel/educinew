import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseCacheService(repo: EnterpriseRepositoryExtended) {
  return {
    async clearCache(enterpriseId: string, pattern?: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.clearCache(enterpriseId, pattern);
    },
  };
}
