import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocHighlightNotFoundError,
  DocHighlightCreateError,
  DocHighlightUpdateError,
  DocHighlightDeleteError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createHighlightService(repository: DocumentRepositoryEnterprise) {
  return {
    async getHighlights(documentId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching highlights', { documentId, userId }, 'HighlightService');

        const highlights = await repository.getHighlights(documentId);

        logger.info('Highlights fetched successfully', { documentId, count: highlights.length }, 'HighlightService');

        return highlights;
      } catch (error) {
        logger.error('Failed to fetch highlights', { documentId, error }, 'HighlightService');
        throw error;
      }
    },

    async createHighlight(documentId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('highlight data is required');

        logger.info('Creating highlight', { documentId, userId }, 'HighlightService');

        const highlight = await repository.createHighlight(documentId, userId, data);

        logger.info('Highlight created successfully', { documentId }, 'HighlightService');

        return highlight;
      } catch (error) {
        logger.error('Failed to create highlight', { documentId, error }, 'HighlightService');
        throw error;
      }
    },

    async updateHighlight(documentId: string, highlightId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!highlightId) throw new DocValidationError('highlightId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('highlight data is required');

        logger.info('Updating highlight', { documentId, highlightId, userId }, 'HighlightService');

        const highlights = await repository.getHighlights(documentId);
        const existing = highlights.find((h: { id: string }) => h.id === highlightId);
        if (!existing) throw new DocHighlightNotFoundError(highlightId);

        const updated = await repository.updateHighlight(highlightId, userId, data);

        logger.info('Highlight updated successfully', { highlightId }, 'HighlightService');

        return updated;
      } catch (error) {
        logger.error('Failed to update highlight', { documentId, highlightId, error }, 'HighlightService');
        throw error;
      }
    },

    async deleteHighlight(documentId: string, highlightId: string, userId: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!highlightId) throw new DocValidationError('highlightId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting highlight', { documentId, highlightId, userId }, 'HighlightService');

        const highlights = await repository.getHighlights(documentId);
        const existing = highlights.find((h: { id: string }) => h.id === highlightId);
        if (!existing) throw new DocHighlightNotFoundError(highlightId);

        await repository.deleteHighlight(highlightId, userId);

        logger.info('Highlight deleted successfully', { highlightId }, 'HighlightService');
      } catch (error) {
        logger.error('Failed to delete highlight', { documentId, highlightId, error }, 'HighlightService');
        throw error;
      }
    },

    async getHighlightStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching highlight stats', { schoolId, userId }, 'HighlightService');

        const stats = await repository.getHighlightStats(schoolId);

        logger.info('Highlight stats fetched', { schoolId }, 'HighlightService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch highlight stats', { schoolId, error }, 'HighlightService');
        throw error;
      }
    },
  };
}
