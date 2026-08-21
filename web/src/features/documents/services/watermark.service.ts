import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocWatermarkError,
  DocWatermarkApplyError,
  DocWatermarkRemoveError,
  DocWatermarkFormatError,
  DocWatermarkPositionError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createWatermarkService(repository: DocumentRepositoryEnterprise) {
  return {
    async applyWatermark(documentId: string, watermarkId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!watermarkId) throw new DocValidationError('watermarkId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Applying watermark', { documentId, watermarkId, userId }, 'WatermarkService');

        await repository.applyWatermark(documentId, watermarkId);

        logger.info('Watermark applied successfully', { documentId, watermarkId }, 'WatermarkService');
      } catch (error) {
        logger.error('Failed to apply watermark', { documentId, watermarkId, error }, 'WatermarkService');
        throw error;
      }
    },

    async removeWatermark(documentId: string, watermarkId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!watermarkId) throw new DocValidationError('watermarkId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Removing watermark', { documentId, watermarkId, userId }, 'WatermarkService');

        await repository.removeWatermark(documentId, watermarkId);

        logger.info('Watermark removed successfully', { documentId, watermarkId }, 'WatermarkService');
      } catch (error) {
        logger.error('Failed to remove watermark', { documentId, watermarkId, error }, 'WatermarkService');
        throw error;
      }
    },

    async getWatermarkConfig(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching watermark config', { schoolId, userId }, 'WatermarkService');

        const config = await repository.getWatermarkConfig(schoolId);

        logger.info('Watermark config fetched', { schoolId }, 'WatermarkService');

        return config;
      } catch (error) {
        logger.error('Failed to fetch watermark config', { schoolId, error }, 'WatermarkService');
        throw error;
      }
    },

    async updateWatermarkConfig(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('config data is required');

        logger.info('Updating watermark config', { schoolId, userId }, 'WatermarkService');

        const config = await repository.updateWatermarkConfig(schoolId, data as any);

        logger.info('Watermark config updated successfully', { schoolId }, 'WatermarkService');

        return config;
      } catch (error) {
        logger.error('Failed to update watermark config', { schoolId, error }, 'WatermarkService');
        throw error;
      }
    },

    async previewWatermark(documentId: string, watermarkId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!watermarkId) throw new DocValidationError('watermarkId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Previewing watermark', { documentId, watermarkId, userId }, 'WatermarkService');

        const watermarks = await repository.getWatermarks(documentId);
        const watermark = watermarks.find((w: any) => w.id === watermarkId);

        const preview = {
          documentId,
          watermarkId,
          watermark,
          previewUrl: `/api/documents/${documentId}/watermark/${watermarkId}/preview`,
        };

        logger.info('Watermark preview generated', { documentId, watermarkId }, 'WatermarkService');

        return preview;
      } catch (error) {
        logger.error('Failed to preview watermark', { documentId, watermarkId, error }, 'WatermarkService');
        throw error;
      }
    },

    async getWatermarkHistory(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching watermark history', { documentId, userId }, 'WatermarkService');

        const watermarks = await repository.getWatermarks(documentId);

        logger.info('Watermark history fetched', { documentId, count: watermarks.length }, 'WatermarkService');

        return watermarks;
      } catch (error) {
        logger.error('Failed to fetch watermark history', { documentId, error }, 'WatermarkService');
        throw error;
      }
    },

    async bulkApplyWatermark(documentIds: string[], watermarkId: string, userId: string) {
      try {
        if (!documentIds || documentIds.length === 0) throw new DocValidationError('documentIds are required');
        if (!watermarkId) throw new DocValidationError('watermarkId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Bulk applying watermark', { count: documentIds.length, watermarkId, userId }, 'WatermarkService');

        let successCount = 0;
        let failureCount = 0;

        for (const documentId of documentIds) {
          try {
            await repository.applyWatermark(documentId, watermarkId);
            successCount++;
          } catch {
            failureCount++;
          }
        }

        logger.info('Bulk watermark applied', { successCount, failureCount }, 'WatermarkService');

        return { totalProcessed: documentIds.length, successCount, failureCount };
      } catch (error) {
        logger.error('Failed to bulk apply watermark', { error }, 'WatermarkService');
        throw error;
      }
    },

    async getWatermarks(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching watermarks', { documentId, userId }, 'WatermarkService');

        const watermarks = await repository.getWatermarks(documentId);

        logger.info('Watermarks fetched successfully', { documentId, count: watermarks.length }, 'WatermarkService');

        return watermarks;
      } catch (error) {
        logger.error('Failed to fetch watermarks', { documentId, error }, 'WatermarkService');
        throw error;
      }
    },
  };
}
