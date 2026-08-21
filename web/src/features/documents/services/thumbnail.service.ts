import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocProcessingError,
  DocStorageError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createThumbnailService(repository: DocumentRepositoryEnterprise) {
  return {
    async generateThumbnail(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Generating thumbnail', { documentId, schoolId, userId }, 'ThumbnailService');

        const thumbnail = await repository.getFileMetadata(documentId);

        logger.info('Thumbnail generated successfully', { documentId }, 'ThumbnailService');

        return thumbnail;
      } catch (error) {
        logger.error('Failed to generate thumbnail', { documentId, error }, 'ThumbnailService');
        throw error;
      }
    },

    async getThumbnail(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching thumbnail', { documentId, schoolId, userId }, 'ThumbnailService');

        const thumbnail = await repository.getDocument(documentId);
        if (!thumbnail) throw new DocNotFoundError(documentId);

        logger.info('Thumbnail fetched', { documentId }, 'ThumbnailService');

        return thumbnail;
      } catch (error) {
        logger.error('Failed to fetch thumbnail', { documentId, error }, 'ThumbnailService');
        throw error;
      }
    },

    async deleteThumbnail(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting thumbnail', { documentId, schoolId, userId }, 'ThumbnailService');

        await repository.deleteDocument(documentId);

        logger.info('Thumbnail deleted successfully', { documentId }, 'ThumbnailService');
      } catch (error) {
        logger.error('Failed to delete thumbnail', { documentId, error }, 'ThumbnailService');
        throw error;
      }
    },

    async getThumbnails(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching thumbnails', { schoolId, userId }, 'ThumbnailService');

        const thumbnails = await repository.getDocuments(schoolId);

        logger.info('Thumbnails fetched successfully', { schoolId, count: thumbnails.length }, 'ThumbnailService');

        return thumbnails;
      } catch (error) {
        logger.error('Failed to fetch thumbnails', { schoolId, error }, 'ThumbnailService');
        throw error;
      }
    },

    async regenerateThumbnail(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Regenerating thumbnail', { documentId, schoolId, userId }, 'ThumbnailService');

        const thumbnail = await repository.getFileMetadata(documentId);

        logger.info('Thumbnail regenerated', { documentId }, 'ThumbnailService');

        return thumbnail;
      } catch (error) {
        logger.error('Failed to regenerate thumbnail', { documentId, error }, 'ThumbnailService');
        throw error;
      }
    },

    async getThumbnailConfig(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching thumbnail config', { schoolId, userId }, 'ThumbnailService');

        const config = await repository.getWatermarkConfig(schoolId);

        logger.info('Thumbnail config fetched', { schoolId }, 'ThumbnailService');

        return config;
      } catch (error) {
        logger.error('Failed to fetch thumbnail config', { schoolId, error }, 'ThumbnailService');
        throw error;
      }
    },

    async updateThumbnailConfig(schoolId: string, userId: string, config: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!config) throw new DocValidationError('config is required');

        logger.info('Updating thumbnail config', { schoolId, userId }, 'ThumbnailService');

        const updated = await repository.updateWatermarkConfig(schoolId, config as never);

        logger.info('Thumbnail config updated', { schoolId }, 'ThumbnailService');

        return updated;
      } catch (error) {
        logger.error('Failed to update thumbnail config', { schoolId, error }, 'ThumbnailService');
        throw error;
      }
    },
  };
}
