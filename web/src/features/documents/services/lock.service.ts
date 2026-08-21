import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocLockedError,
  DocNotFoundError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createLockService(repository: DocumentRepositoryEnterprise) {
  return {
    async lockDocument(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Locking document', { documentId, schoolId, userId }, 'LockService');

        const lock = await repository.lockDocument(documentId, userId, schoolId);

        logger.info('Document locked successfully', { documentId, lockId: lock.id }, 'LockService');

        return lock;
      } catch (error) {
        logger.error('Failed to lock document', { documentId, error }, 'LockService');
        throw error;
      }
    },

    async unlockDocument(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Unlocking document', { documentId, schoolId, userId }, 'LockService');

        await repository.unlockDocument(documentId, userId);

        logger.info('Document unlocked successfully', { documentId }, 'LockService');
      } catch (error) {
        logger.error('Failed to unlock document', { documentId, error }, 'LockService');
        throw error;
      }
    },

    async getLockedDocuments(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching locked documents', { schoolId, userId }, 'LockService');

        const documents = await repository.getLockedDocuments(schoolId);

        logger.info('Locked documents fetched', { schoolId, count: documents.length }, 'LockService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch locked documents', { schoolId, error }, 'LockService');
        throw error;
      }
    },

    async forceUnlock(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Force unlocking document', { documentId, schoolId, userId }, 'LockService');

        await repository.unlockDocument(documentId, userId);

        logger.info('Document force unlocked', { documentId }, 'LockService');
      } catch (error) {
        logger.error('Failed to force unlock document', { documentId, error }, 'LockService');
        throw error;
      }
    },
  };
}
