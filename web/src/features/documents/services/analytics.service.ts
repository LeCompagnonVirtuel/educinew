import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createAnalyticsService(repository: DocumentRepositoryEnterprise) {
  return {
    async getAnalytics(schoolId: string, userId: string, filters?: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching analytics', { schoolId, userId }, 'AnalyticsService');

        const analytics = await repository.getAnalytics(schoolId);

        logger.info('Analytics fetched successfully', { schoolId }, 'AnalyticsService');

        return analytics;
      } catch (error) {
        logger.error('Failed to fetch analytics', { schoolId, userId, error }, 'AnalyticsService');
        throw error;
      }
    },

    async getDocumentAnalytics(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching document analytics', { documentId, schoolId, userId }, 'AnalyticsService');

        const analytics = await repository.getDocumentAnalytics(documentId);

        logger.info('Document analytics fetched', { documentId }, 'AnalyticsService');

        return analytics;
      } catch (error) {
        logger.error('Failed to fetch document analytics', { documentId, error }, 'AnalyticsService');
        throw error;
      }
    },

    async trackDocumentView(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Tracking document view', { documentId, schoolId, userId }, 'AnalyticsService');

        const event = await repository.trackDocumentView(documentId, userId);

        logger.info('Document view tracked', { documentId }, 'AnalyticsService');

        return event;
      } catch (error) {
        logger.error('Failed to track document view', { documentId, error }, 'AnalyticsService');
        throw error;
      }
    },

    async trackDocumentDownload(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Tracking document download', { documentId, schoolId, userId }, 'AnalyticsService');

        const event = await repository.trackDocumentDownload(documentId, userId);

        logger.info('Document download tracked', { documentId }, 'AnalyticsService');

        return event;
      } catch (error) {
        logger.error('Failed to track document download', { documentId, error }, 'AnalyticsService');
        throw error;
      }
    },

    async getTopDocuments(schoolId: string, userId: string, limit?: number) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching top documents', { schoolId, userId, limit }, 'AnalyticsService');

        const documents = await repository.getTopDocuments(schoolId, 'views', limit);

        logger.info('Top documents fetched', { schoolId, count: documents.length }, 'AnalyticsService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch top documents', { schoolId, error }, 'AnalyticsService');
        throw error;
      }
    },

    async getUsageStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching usage stats', { schoolId, userId }, 'AnalyticsService');

        const stats = await repository.getUsageStats(schoolId, dateFrom, dateTo);

        logger.info('Usage stats fetched', { schoolId }, 'AnalyticsService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch usage stats', { schoolId, error }, 'AnalyticsService');
        throw error;
      }
    },
  };
}
