import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocCreateError,
  DocDeleteError,
  DocDuplicateError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createRecentService(repository: DocumentRepositoryEnterprise) {
  return {
    async getRecentDocuments(schoolId: string, userId: string, limit?: number) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching recent documents', { schoolId, userId, limit }, 'RecentService');

        const documents = await repository.getRecentDocuments(schoolId, userId, limit);

        logger.info('Recent documents fetched', { schoolId, count: documents.length }, 'RecentService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch recent documents', { schoolId, error }, 'RecentService');
        throw error;
      }
    },

    async getRecentFolders(schoolId: string, userId: string, limit?: number) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching recent folders', { schoolId, userId, limit }, 'RecentService');

        const folders = await repository.getRecentFolders(schoolId);

        logger.info('Recent folders fetched', { schoolId, count: folders.length }, 'RecentService');

        return folders;
      } catch (error) {
        logger.error('Failed to fetch recent folders', { schoolId, error }, 'RecentService');
        throw error;
      }
    },

    async getRecentActivities(schoolId: string, userId: string, limit?: number) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching recent activities', { schoolId, userId, limit }, 'RecentService');

        const activities = await repository.getRecentActivities(schoolId, limit);

        logger.info('Recent activities fetched', { schoolId, count: activities.length }, 'RecentService');

        return activities;
      } catch (error) {
        logger.error('Failed to fetch recent activities', { schoolId, error }, 'RecentService');
        throw error;
      }
    },

    async clearRecentHistory(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Clearing recent history', { schoolId, userId }, 'RecentService');

        const documents = await repository.getRecentDocuments(schoolId, userId);
        for (const doc of documents) {
          await repository.logActivity({ documentId: doc.id, action: 'recent_cleared' } as never, schoolId);
        }

        logger.info('Recent history cleared', { schoolId }, 'RecentService');
      } catch (error) {
        logger.error('Failed to clear recent history', { schoolId, error }, 'RecentService');
        throw error;
      }
    },

    async getRecentStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching recent stats', { schoolId, userId }, 'RecentService');

        const documents = await repository.getRecentDocuments(schoolId, userId);
        const stats = { totalRecent: documents.length, schoolId, userId };

        logger.info('Recent stats fetched', { schoolId }, 'RecentService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch recent stats', { schoolId, error }, 'RecentService');
        throw error;
      }
    },

    async addToRecent(documentId: string, schoolId: string, userId: string, type: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!type) throw new DocValidationError('type is required');

        logger.info('Adding to recent', { documentId, schoolId, userId, type }, 'RecentService');

        const recent = await repository.logActivity({ documentId, action: 'recent_view', userId, type } as never, schoolId);

        logger.info('Added to recent successfully', { documentId }, 'RecentService');

        return recent;
      } catch (error) {
        logger.error('Failed to add to recent', { documentId, error }, 'RecentService');
        throw error;
      }
    },
  };
}
