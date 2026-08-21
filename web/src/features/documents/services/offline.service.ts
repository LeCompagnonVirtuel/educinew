import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocCreateError,
  DocDeleteError,
  DocProcessingError,
  DocConflictError,
  DocStorageError,
  DocStorageQuotaExceededError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createOfflineService(repository: DocumentRepositoryEnterprise) {
  return {
    async getOfflineDocuments(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching offline documents', { schoolId, userId }, 'OfflineService');

        const documents = await repository.getOfflineDocuments(schoolId, userId);

        logger.info('Offline documents fetched', { schoolId, count: documents.length }, 'OfflineService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch offline documents', { schoolId, error }, 'OfflineService');
        throw error;
      }
    },

    async markForOffline(documentId: string, userId: string, options?: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Marking document for offline', { documentId, userId }, 'OfflineService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);
        const schoolId = (document as any).schoolId || '';

        const result = await repository.markForOffline(documentId, schoolId, userId);

        logger.info('Document marked for offline successfully', { documentId }, 'OfflineService');

        return result;
      } catch (error) {
        logger.error('Failed to mark document for offline', { documentId, error }, 'OfflineService');
        throw error;
      }
    },

    async removeFromOffline(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Removing document from offline', { documentId, userId }, 'OfflineService');

        const result = await repository.removeFromOffline(documentId, userId);

        logger.info('Document removed from offline successfully', { documentId }, 'OfflineService');

        return result;
      } catch (error) {
        logger.error('Failed to remove document from offline', { documentId, error }, 'OfflineService');
        throw error;
      }
    },

    async syncOfflineChanges(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Syncing offline changes', { schoolId, userId }, 'OfflineService');

        const result = await repository.syncOfflineChanges(userId);

        logger.info('Offline changes synced successfully', { schoolId }, 'OfflineService');

        return result;
      } catch (error) {
        logger.error('Failed to sync offline changes', { schoolId, error }, 'OfflineService');
        throw error;
      }
    },

    async getOfflineSyncStatus(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching offline sync status', { schoolId, userId }, 'OfflineService');

        const status = await repository.getOfflineSyncStatus(userId);

        logger.info('Offline sync status fetched', { schoolId }, 'OfflineService');

        return status;
      } catch (error) {
        logger.error('Failed to fetch offline sync status', { schoolId, error }, 'OfflineService');
        throw error;
      }
    },

    async updateOfflineDocument(documentId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating offline document', { documentId, userId }, 'OfflineService');

        const result = await repository.updateOfflineDocument(documentId, userId, data as any);

        logger.info('Offline document updated successfully', { documentId }, 'OfflineService');

        return result;
      } catch (error) {
        logger.error('Failed to update offline document', { documentId, error }, 'OfflineService');
        throw error;
      }
    },
  };
}
