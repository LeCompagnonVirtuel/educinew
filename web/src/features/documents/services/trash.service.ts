import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocTrashNotFoundError,
  DocTrashEmptyError,
  DocTrashPermanentError,
  DocTrashQuotaError,
  DocTrashRetentionError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createTrashService(repository: DocumentRepositoryEnterprise) {
  return {
    async restoreFromTrash(trashId: string, userId: string) {
      try {
        if (!trashId) throw new DocValidationError('trashId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Restoring from trash', { trashId, userId }, 'TrashService');

        const document = await repository.restoreFromTrash(trashId);

        logger.info('Document restored from trash', { trashId }, 'TrashService');

        return document;
      } catch (error) {
        logger.error('Failed to restore from trash', { trashId, error }, 'TrashService');
        throw error;
      }
    },

    async permanentDelete(trashId: string, userId: string) {
      try {
        if (!trashId) throw new DocValidationError('trashId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Permanently deleting from trash', { trashId, userId }, 'TrashService');

        await repository.permanentlyDeleteFromTrash(trashId);

        logger.info('Document permanently deleted from trash', { trashId }, 'TrashService');
      } catch (error) {
        logger.error('Failed to permanently delete from trash', { trashId, error }, 'TrashService');
        throw error;
      }
    },

    async emptyTrash(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Emptying trash', { schoolId, userId }, 'TrashService');

        await repository.emptyTrash(schoolId);

        logger.info('Trash emptied successfully', { schoolId }, 'TrashService');
      } catch (error) {
        logger.error('Failed to empty trash', { schoolId, error }, 'TrashService');
        throw error;
      }
    },

    async getTrashStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching trash stats', { schoolId, userId }, 'TrashService');

        const stats = await repository.getTrashStats(schoolId);

        logger.info('Trash stats fetched', { schoolId }, 'TrashService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch trash stats', { schoolId, error }, 'TrashService');
        throw error;
      }
    },

    async getTrashByUser(schoolId: string, userId: string, targetUserId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!targetUserId) throw new DocValidationError('targetUserId is required');

        logger.info('Fetching trash by user', { schoolId, userId, targetUserId }, 'TrashService');

        const items = await repository.getTrashItems(schoolId);
        const userItems = items.filter((item: any) => item.deletedBy === targetUserId);

        logger.info('Trash by user fetched', { schoolId, count: userItems.length }, 'TrashService');

        return userItems;
      } catch (error) {
        logger.error('Failed to fetch trash by user', { schoolId, error }, 'TrashService');
        throw error;
      }
    },

    async getTrashByDate(schoolId: string, userId: string, dateFrom: string, dateTo: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!dateFrom) throw new DocValidationError('dateFrom is required');
        if (!dateTo) throw new DocValidationError('dateTo is required');

        logger.info('Fetching trash by date', { schoolId, userId, dateFrom, dateTo }, 'TrashService');

        const items = await repository.getTrashItems(schoolId);
        const filtered = items.filter((item: any) => {
          const deletedAt = new Date(item.deletedAt);
          return deletedAt >= new Date(dateFrom) && deletedAt <= new Date(dateTo);
        });

        logger.info('Trash by date fetched', { schoolId, count: filtered.length }, 'TrashService');

        return filtered;
      } catch (error) {
        logger.error('Failed to fetch trash by date', { schoolId, error }, 'TrashService');
        throw error;
      }
    },

    async getTrashByType(schoolId: string, userId: string, mimeType: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!mimeType) throw new DocValidationError('mimeType is required');

        logger.info('Fetching trash by type', { schoolId, userId, mimeType }, 'TrashService');

        const items = await repository.getTrashItems(schoolId);
        const filtered = items.filter((item: any) => item.mimeType === mimeType);

        logger.info('Trash by type fetched', { schoolId, count: filtered.length }, 'TrashService');

        return filtered;
      } catch (error) {
        logger.error('Failed to fetch trash by type', { schoolId, error }, 'TrashService');
        throw error;
      }
    },

    async getTrashRetention(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching trash retention', { schoolId, userId }, 'TrashService');

        const items = await repository.getTrashItems(schoolId);
        const retention = {
          totalItems: items.length,
          totalSize: items.reduce((sum: number, item: any) => sum + (item.size || 0), 0),
          oldestItem: items.length > 0 ? items[items.length - 1] : null,
          newestItem: items.length > 0 ? items[0] : null,
        };

        logger.info('Trash retention fetched', { schoolId }, 'TrashService');

        return retention;
      } catch (error) {
        logger.error('Failed to fetch trash retention', { schoolId, error }, 'TrashService');
        throw error;
      }
    },

    async autoEmptyTrash(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Auto-emptying trash', { schoolId, userId }, 'TrashService');

        const items = await repository.getTrashItems(schoolId);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const expiredItems = items.filter((item: any) => {
          const deletedAt = new Date(item.deletedAt);
          return deletedAt < thirtyDaysAgo;
        });

        for (const item of expiredItems) {
          try {
            await repository.permanentlyDeleteFromTrash(item.id);
          } catch {
            continue;
          }
        }

        logger.info('Auto-empty trash completed', { schoolId, deletedCount: expiredItems.length }, 'TrashService');

        return { deletedCount: expiredItems.length };
      } catch (error) {
        logger.error('Failed to auto-empty trash', { schoolId, error }, 'TrashService');
        throw error;
      }
    },

    async getTrashItems(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching trash items', { schoolId, userId }, 'TrashService');

        const items = await repository.getTrashItems(schoolId);

        logger.info('Trash items fetched', { schoolId, count: items.length }, 'TrashService');

        return items;
      } catch (error) {
        logger.error('Failed to fetch trash items', { schoolId, error }, 'TrashService');
        throw error;
      }
    },
  };
}
