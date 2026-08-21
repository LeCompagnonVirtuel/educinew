import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocProcessingError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createPreviewService(repository: DocumentRepositoryEnterprise) {
  return {
    async getDocumentPreview(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching document preview', { documentId, schoolId, userId }, 'PreviewService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        logger.info('Document preview fetched successfully', { documentId }, 'PreviewService');

        return document;
      } catch (error) {
        logger.error('Failed to fetch document preview', { documentId, error }, 'PreviewService');
        throw error;
      }
    },

    async generatePreview(documentId: string, schoolId: string, options?: { format?: string; width?: number; height?: number }) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Generating document preview', { documentId, schoolId, options }, 'PreviewService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        const result = await repository.convertDocument(documentId, schoolId, options?.format || 'pdf');

        logger.info('Document preview generated successfully', { documentId }, 'PreviewService');

        return result;
      } catch (error) {
        logger.error('Failed to generate document preview', { documentId, error }, 'PreviewService');
        throw error;
      }
    },

    async getPreviewConfig(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching preview config', { schoolId, userId }, 'PreviewService');

        const config = await repository.getWatermarkConfig(schoolId);

        logger.info('Preview config fetched', { schoolId }, 'PreviewService');

        return config;
      } catch (error) {
        logger.error('Failed to fetch preview config', { schoolId, error }, 'PreviewService');
        throw error;
      }
    },

    async updatePreviewConfig(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('config data is required');

        logger.info('Updating preview config', { schoolId, userId }, 'PreviewService');

        const config = await repository.updateWatermarkConfig(schoolId, data as never);

        logger.info('Preview config updated successfully', { schoolId }, 'PreviewService');

        return config;
      } catch (error) {
        logger.error('Failed to update preview config', { schoolId, error }, 'PreviewService');
        throw error;
      }
    },

    async getPreviewHistory(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching preview history', { documentId, userId }, 'PreviewService');

        const history = await repository.getDocumentTimeline(documentId);

        logger.info('Preview history fetched', { documentId, count: history.length }, 'PreviewService');

        return history;
      } catch (error) {
        logger.error('Failed to fetch preview history', { documentId, error }, 'PreviewService');
        throw error;
      }
    },

    async getPreviewStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching preview stats', { schoolId, userId }, 'PreviewService');

        const stats = await repository.getDocumentStats(schoolId, dateFrom, dateTo);

        logger.info('Preview stats fetched', { schoolId }, 'PreviewService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch preview stats', { schoolId, error }, 'PreviewService');
        throw error;
      }
    },
  };
}
