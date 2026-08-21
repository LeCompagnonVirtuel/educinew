import type { CommunicationRepositoryExtended } from '@/features/communication/types';
import { CommMessageNotFoundError, MessageThreadLockedError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createThreadService(repository: CommunicationRepositoryExtended) {
  return {
    async getThread(threadId: string, userId: string) {
      try {
        if (!threadId) throw new Error('threadId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching thread', { threadId, userId }, 'ThreadService');

        const thread = await repository.getThread(threadId);
        if (!thread) throw new CommMessageNotFoundError(threadId);

        return thread;
      } catch (error) {
        logger.error('Failed to fetch thread', { threadId }, 'ThreadService');
        throw error;
      }
    },

    async getThreadMessages(threadId: string, userId: string, filters?: any) {
      try {
        if (!threadId) throw new Error('threadId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching thread messages', { threadId, userId }, 'ThreadService');

        const thread = await repository.getThread(threadId);
        if (!thread) throw new CommMessageNotFoundError(threadId);

        const messages = await repository.getThreadMessages(threadId, filters);

        logger.info('Thread messages fetched', { threadId, count: messages.length }, 'ThreadService');

        return messages;
      } catch (error) {
        logger.error('Failed to fetch thread messages', { threadId }, 'ThreadService');
        throw error;
      }
    },

    async lockThread(threadId: string, userId: string, locked: boolean) {
      try {
        if (!threadId) throw new Error('threadId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Toggling lock on thread', { threadId, userId, locked }, 'ThreadService');

        const thread = await repository.getThread(threadId);
        if (!thread) throw new CommMessageNotFoundError(threadId);

        const updated = await repository.updateThread(threadId, {
          locked,
          lockedAt: locked ? new Date().toISOString() : null,
          lockedBy: locked ? userId : null,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(thread.schoolId, 'thread.locked', { threadId, userId, locked });

        logger.info('Thread lock toggled', { threadId, locked }, 'ThreadService');

        return updated;
      } catch (error) {
        logger.error('Failed to toggle thread lock', { threadId }, 'ThreadService');
        throw error;
      }
    },

    async getThreadStats(threadId: string) {
      try {
        if (!threadId) throw new Error('threadId is required');

        logger.info('Fetching thread stats', { threadId }, 'ThreadService');

        const stats = await repository.getThreadStats(threadId);

        logger.info('Thread stats fetched', { threadId }, 'ThreadService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch thread stats', { threadId }, 'ThreadService');
        throw error;
      }
    },
  };
}
