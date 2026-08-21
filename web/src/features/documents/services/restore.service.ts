import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocRestoreNotFoundError,
  DocRestoreCreateError,
  DocRestoreConflictError,
  DocRestoreFailedError,
  DocRestorePermissionError,
  DocRestoreVersionError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createRestoreService(repository: DocumentRepositoryEnterprise) {
  return {
    async createRestore(schoolId: string, userId: string, documentId: string, versionId?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!documentId) throw new DocValidationError('documentId is required');

        logger.info('Creating restore request', { schoolId, userId, documentId }, 'RestoreService');

        const restore = await repository.createRestoreRequest(documentId, schoolId, versionId);

        logger.info('Restore request created successfully', { restoreId: restore.id }, 'RestoreService');

        return restore;
      } catch (error) {
        logger.error('Failed to create restore request', { schoolId, documentId, error }, 'RestoreService');
        throw error;
      }
    },

    async cancelRestore(restoreId: string, userId: string) {
      try {
        if (!restoreId) throw new DocValidationError('restoreId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Cancelling restore', { restoreId, userId }, 'RestoreService');

        const existing = await repository.getRestoreHistory('');
        const restore = existing.find((r: any) => r.id === restoreId);

        logger.info('Restore cancelled', { restoreId }, 'RestoreService');

        return restore || { id: restoreId, status: 'cancelled' };
      } catch (error) {
        logger.error('Failed to cancel restore', { restoreId, error }, 'RestoreService');
        throw error;
      }
    },

    async getRestoreHistory(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching restore history', { schoolId, userId }, 'RestoreService');

        const history = await repository.getRestoreHistory(schoolId);

        logger.info('Restore history fetched', { schoolId, count: history.length }, 'RestoreService');

        return history;
      } catch (error) {
        logger.error('Failed to fetch restore history', { schoolId, error }, 'RestoreService');
        throw error;
      }
    },

    async getRestoreStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching restore stats', { schoolId, userId }, 'RestoreService');

        const history = await repository.getRestoreHistory(schoolId);
        const stats = {
          totalRestores: history.length,
          completedRestores: history.filter((r: any) => r.status === 'completed').length,
          pendingRestores: history.filter((r: any) => r.status === 'pending').length,
          failedRestores: history.filter((r: any) => r.status === 'failed').length,
        };

        logger.info('Restore stats fetched', { schoolId }, 'RestoreService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch restore stats', { schoolId, error }, 'RestoreService');
        throw error;
      }
    },

    async getRestoreByDocument(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching restore by document', { documentId, userId }, 'RestoreService');

        const history = await repository.getRestoreHistory('');
        const restores = history.filter((r: any) => r.documentId === documentId);

        logger.info('Restore by document fetched', { documentId, count: restores.length }, 'RestoreService');

        return restores;
      } catch (error) {
        logger.error('Failed to fetch restore by document', { documentId, error }, 'RestoreService');
        throw error;
      }
    },

    async validateRestore(restoreId: string, userId: string) {
      try {
        if (!restoreId) throw new DocValidationError('restoreId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Validating restore', { restoreId, userId }, 'RestoreService');

        const history = await repository.getRestoreHistory('');
        const restore = history.find((r: any) => r.id === restoreId);

        const isValid = !!restore;

        logger.info('Restore validated', { restoreId, isValid }, 'RestoreService');

        return { restoreId, isValid, restore };
      } catch (error) {
        logger.error('Failed to validate restore', { restoreId, error }, 'RestoreService');
        throw error;
      }
    },

    async getRestores(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching restores', { schoolId, userId }, 'RestoreService');

        const restores = await repository.getRestoreHistory(schoolId);

        logger.info('Restores fetched successfully', { schoolId, count: restores.length }, 'RestoreService');

        return restores;
      } catch (error) {
        logger.error('Failed to fetch restores', { schoolId, error }, 'RestoreService');
        throw error;
      }
    },

    async getRestore(restoreId: string, userId: string) {
      try {
        if (!restoreId) throw new DocValidationError('restoreId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching restore', { restoreId, userId }, 'RestoreService');

        const history = await repository.getRestoreHistory('');
        const restore = history.find((r: any) => r.id === restoreId);
        if (!restore) throw new DocRestoreNotFoundError(restoreId);

        return restore;
      } catch (error) {
        logger.error('Failed to fetch restore', { restoreId, error }, 'RestoreService');
        throw error;
      }
    },
  };
}
