import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocSearchError,
  DocSearchIndexError,
  DocSearchTimeoutError,
  DocSearchQueryError,
  DocSearchPermissionError,
  DocSearchNoResultsError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createSearchService(repository: DocumentRepositoryEnterprise) {
  return {
    async searchDocuments(schoolId: string, query: string, userId: string, options?: { limit?: number; offset?: number; filters?: Record<string, unknown> }) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!query || query.trim().length < 2) throw new DocSearchQueryError('Search query must be at least 2 characters');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Searching documents', { schoolId, query, userId }, 'SearchService');

        const results = await repository.fullTextSearch(schoolId, query, options);

        logger.info('Search completed', { schoolId, count: results.length }, 'SearchService');

        return results;
      } catch (error) {
        logger.error('Failed to search documents', { schoolId, query, error }, 'SearchService');
        throw error;
      }
    },

    async searchFullText(schoolId: string, query: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!query || query.trim().length < 2) throw new DocSearchQueryError('Search query must be at least 2 characters');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Performing full text search', { schoolId, query, userId }, 'SearchService');

        const results = await repository.fullTextSearch(schoolId, query);

        logger.info('Full text search completed', { schoolId, count: results.length }, 'SearchService');

        return results;
      } catch (error) {
        logger.error('Failed to perform full text search', { schoolId, query, error }, 'SearchService');
        throw error;
      }
    },

    async searchOCR(schoolId: string, query: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!query || query.trim().length < 2) throw new DocSearchQueryError('Search query must be at least 2 characters');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Searching OCR content', { schoolId, query, userId }, 'SearchService');

        const results = await repository.searchByContent(schoolId, query);

        logger.info('OCR search completed', { schoolId, count: results.length }, 'SearchService');

        return results;
      } catch (error) {
        logger.error('Failed to search OCR content', { schoolId, query, error }, 'SearchService');
        throw error;
      }
    },

    async searchByMetadata(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!filters) throw new DocValidationError('filters are required');

        logger.info('Searching by metadata', { schoolId, userId, filters }, 'SearchService');

        const results = await repository.searchByMetadata(schoolId, filters);

        logger.info('Metadata search completed', { schoolId, count: results.length }, 'SearchService');

        return results;
      } catch (error) {
        logger.error('Failed to search by metadata', { schoolId, error }, 'SearchService');
        throw error;
      }
    },

    async searchByTags(schoolId: string, tagIds: string[], userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!tagIds || tagIds.length === 0) throw new DocValidationError('tagIds are required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Searching by tags', { schoolId, tagIds, userId }, 'SearchService');

        const documents = [];
        for (const tagId of tagIds) {
          try {
            const docs = await repository.getDocumentsByTag(schoolId, tagId);
            documents.push(...docs);
          } catch {
            continue;
          }
        }

        const uniqueDocuments = documents.filter((doc: any, index: number, self: any[]) =>
          index === self.findIndex((d: any) => d.id === doc.id)
        );

        logger.info('Tag search completed', { schoolId, count: uniqueDocuments.length }, 'SearchService');

        return uniqueDocuments;
      } catch (error) {
        logger.error('Failed to search by tags', { schoolId, error }, 'SearchService');
        throw error;
      }
    },

    async searchByCategory(schoolId: string, category: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!category) throw new DocValidationError('category is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Searching by category', { schoolId, category, userId }, 'SearchService');

        const results = await repository.getDocumentsByCategory(schoolId, category);

        logger.info('Category search completed', { schoolId, count: results.length }, 'SearchService');

        return results;
      } catch (error) {
        logger.error('Failed to search by category', { schoolId, category, error }, 'SearchService');
        throw error;
      }
    },

    async searchByDate(schoolId: string, dateFrom: string, dateTo: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!dateFrom) throw new DocValidationError('dateFrom is required');
        if (!dateTo) throw new DocValidationError('dateTo is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Searching by date', { schoolId, dateFrom, dateTo, userId }, 'SearchService');

        const results = await repository.getDocumentsByDate(schoolId, dateFrom, dateTo);

        logger.info('Date search completed', { schoolId, count: results.length }, 'SearchService');

        return results;
      } catch (error) {
        logger.error('Failed to search by date', { schoolId, dateFrom, dateTo, error }, 'SearchService');
        throw error;
      }
    },

    async searchByAuthor(schoolId: string, authorId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!authorId) throw new DocValidationError('authorId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Searching by author', { schoolId, authorId, userId }, 'SearchService');

        const results = await repository.getDocumentsByAuthor(schoolId, authorId);

        logger.info('Author search completed', { schoolId, count: results.length }, 'SearchService');

        return results;
      } catch (error) {
        logger.error('Failed to search by author', { schoolId, authorId, error }, 'SearchService');
        throw error;
      }
    },

    async getSearchHistory(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching search history', { schoolId, userId }, 'SearchService');

        const savedSearches = await repository.getSavedSearches(schoolId, userId);

        logger.info('Search history fetched', { schoolId, count: savedSearches.length }, 'SearchService');

        return savedSearches;
      } catch (error) {
        logger.error('Failed to fetch search history', { schoolId, error }, 'SearchService');
        throw error;
      }
    },

    async getSearchStats(schoolId: string, userId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching search stats', { schoolId, userId }, 'SearchService');

        const stats = await repository.getSearchStats(schoolId, dateFrom, dateTo);

        logger.info('Search stats fetched', { schoolId }, 'SearchService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch search stats', { schoolId, error }, 'SearchService');
        throw error;
      }
    },
  };
}
