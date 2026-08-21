import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseTimelineService(repo: EnterpriseRepositoryExtended) {
  return {
    async getTimeline(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getTimeline(enterpriseId, filters);
    },
  };
}
