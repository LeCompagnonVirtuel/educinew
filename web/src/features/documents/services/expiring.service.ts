import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocExpiredError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createExpiringService(repository: DocumentRepositoryEnterprise) {
  return {
    async getExpiringDocuments(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching expiring documents', { schoolId, userId }, 'ExpiringService');

        const documents = await repository.getExpiredDocuments(schoolId);

        logger.info('Expiring documents fetched', { schoolId, count: documents.length }, 'ExpiringService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch expiring documents', { schoolId, error }, 'ExpiringService');
        throw error;
      }
    },

    async getExpiringDocument(documentId: string, schoolId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Fetching expiring document', { documentId, schoolId }, 'ExpiringService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        logger.info('Expiring document fetched', { documentId }, 'ExpiringService');

        return document;
      } catch (error) {
        logger.error('Failed to fetch expiring document', { documentId, error }, 'ExpiringService');
        throw error;
      }
    },

    async createExpiry(documentId: string, schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('expiry data is required');

        logger.info('Creating expiry', { documentId, schoolId, userId }, 'ExpiringService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        logger.info('Expiry created successfully', { documentId }, 'ExpiringService');

        return { documentId, ...data, createdBy: userId, createdAt: new Date().toISOString() };
      } catch (error) {
        logger.error('Failed to create expiry', { documentId, error }, 'ExpiringService');
        throw error;
      }
    },

    async updateExpiry(documentId: string, schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating expiry', { documentId, schoolId, userId }, 'ExpiringService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        logger.info('Expiry updated successfully', { documentId }, 'ExpiringService');

        return { documentId, ...data, updatedBy: userId, updatedAt: new Date().toISOString() };
      } catch (error) {
        logger.error('Failed to update expiry', { documentId, error }, 'ExpiringService');
        throw error;
      }
    },

    async deleteExpiry(documentId: string, schoolId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting expiry', { documentId, schoolId, userId }, 'ExpiringService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        logger.info('Expiry deleted successfully', { documentId }, 'ExpiringService');
      } catch (error) {
        logger.error('Failed to delete expiry', { documentId, error }, 'ExpiringService');
        throw error;
      }
    },

    async extendExpiry(documentId: string, schoolId: string, userId: string, extensionDays: number) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!extensionDays || extensionDays <= 0) throw new DocValidationError('extensionDays must be a positive number');

        logger.info('Extending expiry', { documentId, schoolId, userId, extensionDays }, 'ExpiringService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        logger.info('Expiry extended successfully', { documentId, extensionDays }, 'ExpiringService');

        return { documentId, extendedBy: extensionDays, extendedAt: new Date().toISOString() };
      } catch (error) {
        logger.error('Failed to extend expiry', { documentId, error }, 'ExpiringService');
        throw error;
      }
    },

    async getExpiryStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching expiry stats', { schoolId, userId }, 'ExpiringService');

        const stats = await repository.getDocumentStats(schoolId);

        logger.info('Expiry stats fetched', { schoolId }, 'ExpiringService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch expiry stats', { schoolId, error }, 'ExpiringService');
        throw error;
      }
    },
  };
}
