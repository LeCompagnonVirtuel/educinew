import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocCompressionError,
  DocCompressionLevelError,
  DocDecompressionError,
  DocCompressionFormatError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createCompressionService(repository: DocumentRepositoryEnterprise) {
  return {
    async compressDocuments(documentIds: string[], schoolId: string, userId: string, level?: string) {
      try {
        if (!documentIds || documentIds.length === 0) throw new DocValidationError('documentIds are required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Compressing documents', { count: documentIds.length, schoolId, userId, level }, 'CompressionService');

        let successCount = 0;
        let failureCount = 0;
        const results = [];

        for (const documentId of documentIds) {
          try {
            const result = await repository.compressDocument(documentId, schoolId, level);
            results.push(result);
            successCount++;
          } catch {
            failureCount++;
          }
        }

        logger.info('Compression completed', { successCount, failureCount }, 'CompressionService');

        return { totalProcessed: documentIds.length, successCount, failureCount, results };
      } catch (error) {
        logger.error('Failed to compress documents', { documentIds, schoolId, error }, 'CompressionService');
        throw error;
      }
    },

    async decompressDocument(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Decompressing document', { documentId, schoolId, userId }, 'CompressionService');

        const result = await repository.decompressDocument(documentId, schoolId);

        logger.info('Document decompressed successfully', { documentId }, 'CompressionService');

        return result;
      } catch (error) {
        logger.error('Failed to decompress document', { documentId, schoolId, error }, 'CompressionService');
        throw error;
      }
    },

    async getCompressionStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching compression stats', { schoolId, userId }, 'CompressionService');

        const stats = await repository.getCompressionStats(schoolId);

        logger.info('Compression stats fetched', { schoolId }, 'CompressionService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch compression stats', { schoolId, error }, 'CompressionService');
        throw error;
      }
    },

    async getCompressionHistory(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching compression history', { schoolId, userId }, 'CompressionService');

        const history = await repository.getConversionHistory(schoolId);
        const compressionJobs = history.filter((h: any) => h.type === 'compression');

        logger.info('Compression history fetched', { schoolId, count: compressionJobs.length }, 'CompressionService');

        return compressionJobs;
      } catch (error) {
        logger.error('Failed to fetch compression history', { schoolId, error }, 'CompressionService');
        throw error;
      }
    },

    async previewCompression(documentId: string, userId: string, level?: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Previewing compression', { documentId, userId, level }, 'CompressionService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocValidationError('Document not found');

        const originalSize = (document as any).size || 0;
        const estimatedRatio = level === 'high' ? 0.3 : level === 'medium' ? 0.5 : 0.7;
        const estimatedSize = Math.round(originalSize * estimatedRatio);

        const preview = {
          documentId,
          originalSize,
          estimatedSize,
          estimatedSavings: originalSize - estimatedSize,
          estimatedRatio: ((1 - estimatedRatio) * 100).toFixed(1) + '%',
          level: level || 'medium',
        };

        logger.info('Compression preview generated', { documentId }, 'CompressionService');

        return preview;
      } catch (error) {
        logger.error('Failed to preview compression', { documentId, error }, 'CompressionService');
        throw error;
      }
    },

    async bulkCompress(documentIds: string[], schoolId: string, userId: string, level?: string) {
      try {
        if (!documentIds || documentIds.length === 0) throw new DocValidationError('documentIds are required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Bulk compressing documents', { count: documentIds.length, schoolId, userId, level }, 'CompressionService');

        let successCount = 0;
        let failureCount = 0;

        for (const documentId of documentIds) {
          try {
            await repository.compressDocument(documentId, schoolId, level);
            successCount++;
          } catch {
            failureCount++;
          }
        }

        logger.info('Bulk compression completed', { successCount, failureCount }, 'CompressionService');

        return { totalProcessed: documentIds.length, successCount, failureCount };
      } catch (error) {
        logger.error('Failed to bulk compress documents', { error }, 'CompressionService');
        throw error;
      }
    },
  };
}
