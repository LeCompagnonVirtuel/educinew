import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocNotFoundError,
  DocCreateError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createChainOfCustodyService(repository: DocumentRepositoryEnterprise) {
  return {
    async getChainOfCustody(documentId: string, schoolId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Fetching chain of custody', { documentId, schoolId }, 'ChainOfCustodyService');

        const chain = await repository.getChainOfCustody(documentId);

        logger.info('Chain of custody fetched', { documentId, count: chain.length }, 'ChainOfCustodyService');

        return chain;
      } catch (error) {
        logger.error('Failed to fetch chain of custody', { documentId, error }, 'ChainOfCustodyService');
        throw error;
      }
    },

    async createChainOfCustodyEntry(documentId: string, schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('entry data is required');

        logger.info('Creating chain of custody entry', { documentId, schoolId, userId }, 'ChainOfCustodyService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        const entry = {
          documentId,
          userId,
          schoolId,
          ...data,
          createdAt: new Date().toISOString(),
        };

        logger.info('Chain of custody entry created successfully', { documentId }, 'ChainOfCustodyService');

        return entry;
      } catch (error) {
        logger.error('Failed to create chain of custody entry', { documentId, error }, 'ChainOfCustodyService');
        throw error;
      }
    },

    async getChainOfCustodyTimeline(documentId: string, schoolId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Fetching chain of custody timeline', { documentId, schoolId }, 'ChainOfCustodyService');

        const timeline = await repository.getDocumentTimeline(documentId);

        logger.info('Chain of custody timeline fetched', { documentId, count: timeline.length }, 'ChainOfCustodyService');

        return timeline;
      } catch (error) {
        logger.error('Failed to fetch chain of custody timeline', { documentId, error }, 'ChainOfCustodyService');
        throw error;
      }
    },

    async getChainOfCustodyStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching chain of custody stats', { schoolId, userId }, 'ChainOfCustodyService');

        const stats = await repository.getDocumentStats(schoolId, dateFrom, dateTo);

        logger.info('Chain of custody stats fetched', { schoolId }, 'ChainOfCustodyService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch chain of custody stats', { schoolId, error }, 'ChainOfCustodyService');
        throw error;
      }
    },

    async validateChainOfCustody(documentId: string, schoolId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Validating chain of custody', { documentId, schoolId }, 'ChainOfCustodyService');

        const chain = await repository.getChainOfCustody(documentId);

        const isValid = chain.length > 0;

        logger.info('Chain of custody validated', { documentId, isValid }, 'ChainOfCustodyService');

        return { isValid, entryCount: chain.length };
      } catch (error) {
        logger.error('Failed to validate chain of custody', { documentId, error }, 'ChainOfCustodyService');
        throw error;
      }
    },

    async getChainOfCustodyDocument(documentId: string, schoolId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');

        logger.info('Fetching chain of custody document', { documentId, schoolId }, 'ChainOfCustodyService');

        const document = await repository.getDocument(documentId);
        if (!document) throw new DocNotFoundError(documentId);

        const chain = await repository.getChainOfCustody(documentId);

        logger.info('Chain of custody document fetched', { documentId }, 'ChainOfCustodyService');

        return { document, chain };
      } catch (error) {
        logger.error('Failed to fetch chain of custody document', { documentId, error }, 'ChainOfCustodyService');
        throw error;
      }
    },
  };
}
