import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseHealthService(repo: EnterpriseRepositoryExtended) {
  return {
    async runHealthChecks(enterpriseId: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.runHealthChecks(enterpriseId);
    },
  };
}
