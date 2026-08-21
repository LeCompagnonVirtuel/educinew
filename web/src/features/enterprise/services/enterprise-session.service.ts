import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseSessionService(repo: EnterpriseRepositoryExtended) {
  return {
    async findSessions(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findSessions(enterpriseId, filters);
    },

    async findSessionById(enterpriseId: string, sessionId: string) {
      if (!enterpriseId || !sessionId) throw new AppError('Identifiants requis');
      const session = await repo.findSessionById(enterpriseId, sessionId);
      if (!session) throw new AppError('Session non trouvée');
      return session;
    },

    async revokeSession(enterpriseId: string, sessionId: string) {
      if (!enterpriseId || !sessionId) throw new AppError('Identifiants requis');
      const existing = await repo.findSessionById(enterpriseId, sessionId);
      if (!existing) throw new AppError('Session non trouvée');
      return repo.revokeSession(enterpriseId, sessionId);
    },

    async revokeAllSessions(enterpriseId: string, userId: string) {
      if (!enterpriseId || !userId) throw new AppError('Identifiants requis');
      return repo.revokeAllSessions(enterpriseId, userId);
    },
  };
}
