import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocCreateError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createBatchService(repository: DocumentRepositoryEnterprise) {
  return {
    async createBatchProcess(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.type) throw new DocValidationError('batch process type is required');

        logger.info('Creating batch process', { schoolId, userId, type: data.type }, 'BatchService');

        const batch = await repository.createBatchProcess(
          { ...data, createdBy: userId } as never,
          schoolId
        );

        logger.info('Batch process created successfully', { batchId: batch.id }, 'BatchService');

        return batch;
      } catch (error) {
        logger.error('Failed to create batch process', { schoolId, userId, error }, 'BatchService');
        throw error;
      }
    },

    async getBatchProcess(batchId: string, userId: string) {
      try {
        if (!batchId) throw new DocValidationError('batchId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching batch process', { batchId, userId }, 'BatchService');

        const batch = await repository.getBatchProcess(batchId);
        if (!batch) throw new DocNotFoundError(batchId);

        logger.info('Batch process fetched', { batchId }, 'BatchService');

        return batch;
      } catch (error) {
        logger.error('Failed to fetch batch process', { batchId, error }, 'BatchService');
        throw error;
      }
    },

    async getBatchProcesses(schoolId: string, userId: string, filters?: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching batch processes', { schoolId, userId }, 'BatchService');

        const batches = await repository.getBatchProcesses(schoolId);

        logger.info('Batch processes fetched', { schoolId, count: batches.length }, 'BatchService');

        return batches;
      } catch (error) {
        logger.error('Failed to fetch batch processes', { schoolId, error }, 'BatchService');
        throw error;
      }
    },

    async cancelBatchProcess(batchId: string, userId: string) {
      try {
        if (!batchId) throw new DocValidationError('batchId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Cancelling batch process', { batchId, userId }, 'BatchService');

        const batch = await repository.cancelBatchProcess(batchId);

        logger.info('Batch process cancelled', { batchId }, 'BatchService');

        return batch;
      } catch (error) {
        logger.error('Failed to cancel batch process', { batchId, error }, 'BatchService');
        throw error;
      }
    },

    async getQueueItems(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching queue items', { schoolId, userId }, 'BatchService');

        const items = await repository.getQueueItems(schoolId);

        logger.info('Queue items fetched', { schoolId, count: items.length }, 'BatchService');

        return items;
      } catch (error) {
        logger.error('Failed to fetch queue items', { schoolId, error }, 'BatchService');
        throw error;
      }
    },

    async addToQueue(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('queue item data is required');

        logger.info('Adding to queue', { schoolId, userId }, 'BatchService');

        const item = await repository.addToQueue(
          { ...data, userId } as never,
          schoolId
        );

        logger.info('Item added to queue', { itemId: item.id }, 'BatchService');

        return item;
      } catch (error) {
        logger.error('Failed to add to queue', { schoolId, userId, error }, 'BatchService');
        throw error;
      }
    },

    async processQueueItem(itemId: string, userId: string) {
      try {
        if (!itemId) throw new DocValidationError('itemId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Processing queue item', { itemId, userId }, 'BatchService');

        const result = await repository.processQueueItem(itemId);

        logger.info('Queue item processed', { itemId }, 'BatchService');

        return result;
      } catch (error) {
        logger.error('Failed to process queue item', { itemId, error }, 'BatchService');
        throw error;
      }
    },

    async retryQueueItem(itemId: string, userId: string) {
      try {
        if (!itemId) throw new DocValidationError('itemId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Retrying queue item', { itemId, userId }, 'BatchService');

        const result = await repository.retryQueueItem(itemId);

        logger.info('Queue item retry initiated', { itemId }, 'BatchService');

        return result;
      } catch (error) {
        logger.error('Failed to retry queue item', { itemId, error }, 'BatchService');
        throw error;
      }
    },
  };
}
