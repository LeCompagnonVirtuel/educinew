import type { CommunicationRepositoryExtended, CollaborationSession } from '@/features/communication/types';
import {
  CommCollaborationError,
  CommCollaborationSessionError,
  CommCollaborationConflictError,
  CommCollaborationPresenceError,
  CommCollaborationCursorError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createCollaborationService(repository: CommunicationRepositoryExtended) {
  return {
    async startCollaborationSession(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.documentId) throw new Error('documentId is required');

        logger.info('Starting collaboration session', { schoolId, userId, documentId: data.documentId }, 'CollaborationService');

        const session = await repository.startCollaborationSession({
          ...data,
          schoolId,
          createdBy: userId,
          status: 'active',
          participants: [{ userId, joinedAt: new Date().toISOString(), cursor: null }],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'collaboration.session_started', {
          sessionId: session.id,
          userId,
        });

        logger.info('Collaboration session started', { sessionId: session.id }, 'CollaborationService');

        return session;
      } catch (error) {
        logger.error('Failed to start collaboration session', { schoolId }, 'CollaborationService');
        throw error;
      }
    },

    async updateCollaborationPresence(sessionId: string, userId: string, presence: any) {
      try {
        if (!sessionId) throw new Error('sessionId is required');
        if (!userId) throw new Error('userId is required');
        if (!presence) throw new Error('presence data is required');

        logger.info('Updating collaboration presence', { sessionId, userId }, 'CollaborationService');

        const session = await repository.getCollaborationSession(sessionId);
        if (!session) throw new CommCollaborationSessionError('Session not found');

        const updated = await repository.updateCollaborationSession(sessionId, {
          participants: (session as any).participants.map((p: any) =>
            p.userId === userId ? { ...p, ...presence, updatedAt: new Date().toISOString() } : p
          ),
          updatedAt: new Date().toISOString(),
        });

        logger.info('Collaboration presence updated', { sessionId, userId }, 'CollaborationService');

        return updated;
      } catch (error) {
        logger.error('Failed to update collaboration presence', { sessionId }, 'CollaborationService');
        throw error;
      }
    },

    async endCollaborationSession(sessionId: string, userId: string) {
      try {
        if (!sessionId) throw new Error('sessionId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Ending collaboration session', { sessionId, userId }, 'CollaborationService');

        const session = await repository.getCollaborationSession(sessionId);
        if (!session) throw new CommCollaborationSessionError('Session not found');

        const updated = await repository.updateCollaborationSession(sessionId, {
          status: 'ended',
          endedAt: new Date().toISOString(),
          endedBy: userId,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((session as any).schoolId, 'collaboration.session_ended', {
          sessionId,
          userId,
        });

        logger.info('Collaboration session ended', { sessionId }, 'CollaborationService');

        return updated;
      } catch (error) {
        logger.error('Failed to end collaboration session', { sessionId }, 'CollaborationService');
        throw error;
      }
    },

    async getCollaborationSessions(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching collaboration sessions', { schoolId, userId }, 'CollaborationService');

        const sessions = await repository.getCollaborationSessions(schoolId, userId, filters);

        logger.info('Collaboration sessions fetched', { schoolId, count: sessions.length }, 'CollaborationService');

        return sessions;
      } catch (error) {
        logger.error('Failed to fetch collaboration sessions', { schoolId }, 'CollaborationService');
        throw error;
      }
    },

    async getActiveCollaborators(schoolId: string, documentId: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!documentId) throw new Error('documentId is required');

        logger.info('Fetching active collaborators', { schoolId, documentId }, 'CollaborationService');

        const sessions = await repository.getCollaborationSessions(schoolId, undefined, {
          documentId,
          status: 'active',
        });

        const activeCollaborators = sessions.flatMap((s: any) =>
          (s.participants || []).filter((p: any) => !p.leftAt)
        );

        logger.info('Active collaborators fetched', { documentId, count: activeCollaborators.length }, 'CollaborationService');

        return activeCollaborators;
      } catch (error) {
        logger.error('Failed to fetch active collaborators', { documentId }, 'CollaborationService');
        throw error;
      }
    },
  };
}
