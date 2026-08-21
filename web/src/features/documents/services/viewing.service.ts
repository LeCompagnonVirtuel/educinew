import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocCreateError,
  DocDeleteError,
  DocConflictError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createViewingService(repository: DocumentRepositoryEnterprise) {
  return {
    async createViewingSession(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Creating viewing session', { documentId, schoolId, userId }, 'ViewingService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        await repository.trackDocumentView(documentId, userId);

        const session = {
          documentId,
          userId,
          schoolId,
          startedAt: new Date().toISOString(),
          status: 'active',
        };

        logger.info('Viewing session created successfully', { documentId, userId }, 'ViewingService');

        return session;
      } catch (error) {
        logger.error('Failed to create viewing session', { documentId, error }, 'ViewingService');
        throw error;
      }
    },

    async getViewingSession(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching viewing session', { documentId, userId }, 'ViewingService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        const analytics = await repository.getDocumentAnalytics(documentId);

        logger.info('Viewing session fetched', { documentId }, 'ViewingService');

        return { document, analytics };
      } catch (error) {
        logger.error('Failed to fetch viewing session', { documentId, error }, 'ViewingService');
        throw error;
      }
    },

    async endViewingSession(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Ending viewing session', { documentId, userId }, 'ViewingService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        logger.info('Viewing session ended successfully', { documentId, userId }, 'ViewingService');
      } catch (error) {
        logger.error('Failed to end viewing session', { documentId, error }, 'ViewingService');
        throw error;
      }
    },

    async getViewingHistory(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching viewing history', { documentId, userId }, 'ViewingService');

        const timeline = await repository.getDocumentTimeline(documentId);

        logger.info('Viewing history fetched', { documentId, count: timeline.length }, 'ViewingService');

        return timeline;
      } catch (error) {
        logger.error('Failed to fetch viewing history', { documentId, error }, 'ViewingService');
        throw error;
      }
    },

    async getActiveViewers(documentId: string, schoolId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Fetching active viewers', { documentId, schoolId }, 'ViewingService');

        const analytics = await repository.getDocumentAnalytics(documentId);

        logger.info('Active viewers fetched', { documentId }, 'ViewingService');

        return analytics;
      } catch (error) {
        logger.error('Failed to fetch active viewers', { documentId, error }, 'ViewingService');
        throw error;
      }
    },

    async getViewingStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching viewing stats', { schoolId, userId }, 'ViewingService');

        const stats = await repository.getDocumentStats(schoolId, dateFrom, dateTo);

        logger.info('Viewing stats fetched', { schoolId }, 'ViewingService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch viewing stats', { schoolId, error }, 'ViewingService');
        throw error;
      }
    },
  };
}
