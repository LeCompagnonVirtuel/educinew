import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocStorageError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createEncryptionService(repository: DocumentRepositoryEnterprise) {
  return {
    async getEncryptionConfig(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching encryption config', { schoolId, userId }, 'EncryptionService');

        const config = await repository.getEncryptionConfig(schoolId);

        logger.info('Encryption config fetched', { schoolId }, 'EncryptionService');

        return config;
      } catch (error) {
        logger.error('Failed to fetch encryption config', { schoolId, error }, 'EncryptionService');
        throw error;
      }
    },

    async encryptDocument(documentId: string, userId: string, options?: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Encrypting document', { documentId, userId }, 'EncryptionService');

        const result = await repository.encryptDocument(documentId, options as any);

        logger.info('Document encrypted successfully', { documentId }, 'EncryptionService');

        return result;
      } catch (error) {
        logger.error('Failed to encrypt document', { documentId, error }, 'EncryptionService');
        throw error;
      }
    },

    async decryptDocument(documentId: string, userId: string, options?: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Decrypting document', { documentId, userId }, 'EncryptionService');

        const result = await repository.decryptDocument(documentId, options as any);

        logger.info('Document decrypted successfully', { documentId }, 'EncryptionService');

        return result;
      } catch (error) {
        logger.error('Failed to decrypt document', { documentId, error }, 'EncryptionService');
        throw error;
      }
    },

    async getEncryptionStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching encryption stats', { schoolId, userId }, 'EncryptionService');

        const stats = await repository.getEncryptionStats(schoolId);

        logger.info('Encryption stats fetched', { schoolId }, 'EncryptionService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch encryption stats', { schoolId, error }, 'EncryptionService');
        throw error;
      }
    },
  };
}
