import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocRedactionNotFoundError,
  DocRedactionCreateError,
  DocRedactionApplyError,
  DocRedactionRemoveError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createRedactionService(repository: DocumentRepositoryEnterprise) {
  return {
    async getRedactions(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching redactions', { documentId, userId }, 'RedactionService');

        const redactions = await repository.getRedactions(documentId);

        logger.info('Redactions fetched successfully', { documentId, count: redactions.length }, 'RedactionService');

        return redactions;
      } catch (error) {
        logger.error('Failed to fetch redactions', { documentId, error }, 'RedactionService');
        throw error;
      }
    },

    async createRedaction(documentId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('redaction data is required');

        logger.info('Creating redaction', { documentId, userId }, 'RedactionService');

        const redaction = await repository.createRedaction(documentId, userId, data);

        logger.info('Redaction created successfully', { documentId }, 'RedactionService');

        return redaction;
      } catch (error) {
        logger.error('Failed to create redaction', { documentId, error }, 'RedactionService');
        throw error;
      }
    },

    async applyRedaction(documentId: string, redactionId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!redactionId) throw new DocValidationError('redactionId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Applying redaction', { documentId, redactionId, userId }, 'RedactionService');

        const redactions = await repository.getRedactions(documentId);
        const redaction = redactions.find((r: { id: string }) => r.id === redactionId);
        if (!redaction) throw new DocRedactionNotFoundError(redactionId);

        await repository.applyRedaction(documentId, redactionId);

        logger.info('Redaction applied successfully', { documentId, redactionId }, 'RedactionService');
      } catch (error) {
        logger.error('Failed to apply redaction', { documentId, redactionId, error }, 'RedactionService');
        throw error;
      }
    },

    async removeRedaction(documentId: string, redactionId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!redactionId) throw new DocValidationError('redactionId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Removing redaction', { documentId, redactionId, userId }, 'RedactionService');

        const redactions = await repository.getRedactions(documentId);
        const redaction = redactions.find((r: { id: string }) => r.id === redactionId);
        if (!redaction) throw new DocRedactionNotFoundError(redactionId);

        await repository.removeRedaction(documentId, redactionId);

        logger.info('Redaction removed successfully', { documentId, redactionId }, 'RedactionService');
      } catch (error) {
        logger.error('Failed to remove redaction', { documentId, redactionId, error }, 'RedactionService');
        throw error;
      }
    },

    async getRedactionStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching redaction stats', { schoolId, userId }, 'RedactionService');

        const stats = await repository.getRedactionStats(schoolId);

        logger.info('Redaction stats fetched', { schoolId }, 'RedactionService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch redaction stats', { schoolId, error }, 'RedactionService');
        throw error;
      }
    },
  };
}
