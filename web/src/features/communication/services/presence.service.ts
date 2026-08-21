import type { CommunicationRepositoryExtended, UserPresence } from '@/features/communication/types';
import { logger } from '@educi/logger';

export function createPresenceService(repository: CommunicationRepositoryExtended) {
  return {
    async updatePresence(schoolId: string, userId: string, status: string, data?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!status) throw new Error('presence status is required');
        if (!['online', 'away', 'busy', 'offline'].includes(status)) {
          throw new Error('Invalid presence status');
        }

        logger.info('Updating presence', { schoolId, userId, status }, 'PresenceService');

        const presence = await repository.updatePresence({
          schoolId,
          userId,
          status,
          ...data,
          lastSeenAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'presence.updated', { userId, status });

        logger.info('Presence updated', { userId, status }, 'PresenceService');

        return presence;
      } catch (error) {
        logger.error('Failed to update presence', { schoolId, userId }, 'PresenceService');
        throw error;
      }
    },

    async getPresence(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching presence', { schoolId, userId }, 'PresenceService');

        const presence = await repository.getPresence(schoolId, userId);

        logger.info('Presence fetched', { schoolId, userId }, 'PresenceService');

        return presence;
      } catch (error) {
        logger.error('Failed to fetch presence', { schoolId, userId }, 'PresenceService');
        throw error;
      }
    },

    async getPresenceStats(schoolId: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');

        logger.info('Fetching presence stats', { schoolId }, 'PresenceService');

        const stats = await repository.getPresenceStats(schoolId);

        logger.info('Presence stats fetched', { schoolId }, 'PresenceService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch presence stats', { schoolId }, 'PresenceService');
        throw error;
      }
    },
  };
}
