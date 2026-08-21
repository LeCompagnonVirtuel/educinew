import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseMonitoringService(repo: EnterpriseRepositoryExtended) {
  return {
    async getEvents(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getMonitoringEvents(enterpriseId, filters);
    },

    async resolveEvent(enterpriseId: string, eventId: string, resolution?: string) {
      if (!enterpriseId || !eventId) throw new AppError('Identifiants requis');
      return repo.resolveMonitoringEvent(enterpriseId, eventId, resolution);
    },

    async getHealth(enterpriseId: string) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.getHealth(enterpriseId);
    },
  };
}
