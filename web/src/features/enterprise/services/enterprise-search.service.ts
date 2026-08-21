import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseSearchService(repo: EnterpriseRepositoryExtended) {
  return {
    async searchSchools(enterpriseId: string, query: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!query || query.trim().length < 2) throw new AppError('Le terme de recherche doit contenir au moins 2 caractères');
      return repo.searchSchools(enterpriseId, query.trim());
    },

    async searchUsers(enterpriseId: string, query: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!query || query.trim().length < 2) throw new AppError('Le terme de recherche doit contenir au moins 2 caractères');
      return repo.searchUsers(enterpriseId, query.trim());
    },
  };
}
