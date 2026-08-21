import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocProcessingError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createPrintService(repository: DocumentRepositoryEnterprise) {
  return {
    async printDocument(documentId: string, schoolId: string, userId: string, options?: { printerId?: string; copies?: number; paperSize?: string; color?: boolean }) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Printing document', { documentId, schoolId, userId, options }, 'PrintService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        const metadata = await repository.getFileMetadata(documentId);

        logger.info('Document print job created', { documentId }, 'PrintService');

        return { document, metadata, options };
      } catch (error) {
        logger.error('Failed to print document', { documentId, error }, 'PrintService');
        throw error;
      }
    },

    async getPrintHistory(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching print history', { schoolId, userId }, 'PrintService');

        const activities = await repository.getUserActivities(schoolId, userId);

        logger.info('Print history fetched', { schoolId, count: activities.length }, 'PrintService');

        return activities;
      } catch (error) {
        logger.error('Failed to fetch print history', { schoolId, error }, 'PrintService');
        throw error;
      }
    },

    async getPrintStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching print stats', { schoolId, userId }, 'PrintService');

        const stats = await repository.getDocumentStats(schoolId, dateFrom, dateTo);

        logger.info('Print stats fetched', { schoolId }, 'PrintService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch print stats', { schoolId, error }, 'PrintService');
        throw error;
      }
    },

    async getPrinters(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching printers', { schoolId, userId }, 'PrintService');

        const quotas = await repository.getStorageUsage(schoolId);

        logger.info('Printers fetched', { schoolId }, 'PrintService');

        return quotas;
      } catch (error) {
        logger.error('Failed to fetch printers', { schoolId, error }, 'PrintService');
        throw error;
      }
    },

    async getPrintConfig(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching print config', { schoolId, userId }, 'PrintService');

        const config = await repository.getWatermarkConfig(schoolId);

        logger.info('Print config fetched', { schoolId }, 'PrintService');

        return config;
      } catch (error) {
        logger.error('Failed to fetch print config', { schoolId, error }, 'PrintService');
        throw error;
      }
    },

    async updatePrintConfig(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('config data is required');

        logger.info('Updating print config', { schoolId, userId }, 'PrintService');

        const config = await repository.updateWatermarkConfig(schoolId, data as never);

        logger.info('Print config updated successfully', { schoolId }, 'PrintService');

        return config;
      } catch (error) {
        logger.error('Failed to update print config', { schoolId, error }, 'PrintService');
        throw error;
      }
    },
  };
}
