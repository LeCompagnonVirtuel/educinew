import type { CommunicationRepositoryExtended } from '@/features/communication/types';
import {
  CommSearchError,
  CommSearchQueryTooShortError,
  CommSearchIndexError,
  CommSearchTimeoutError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createSearchService(repository: CommunicationRepositoryExtended) {
  return {
    async search(schoolId: string, userId: string, query: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!query || query.trim().length === 0) throw new Error('search query is required');
        if (query.trim().length < 2) throw new CommSearchQueryTooShortError();

        logger.info('Performing search', { schoolId, userId, query }, 'SearchService');

        const results = await repository.search(schoolId, userId, query, filters);

        await repository.logCommunicationEvent(schoolId, 'search.performed', {
          userId,
          query,
          resultCount: Array.isArray(results) ? results.length : 0,
        });

        logger.info('Search completed', { schoolId, query }, 'SearchService');

        return results;
      } catch (error) {
        logger.error('Search failed', { schoolId, query }, 'SearchService');
        throw error;
      }
    },

    async searchStats(schoolId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');

        logger.info('Fetching search stats', { schoolId, dateFrom, dateTo }, 'SearchService');

        const stats = await repository.getSearchStats(schoolId, dateFrom, dateTo);

        logger.info('Search stats fetched', { schoolId }, 'SearchService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch search stats', { schoolId }, 'SearchService');
        throw error;
      }
    },
  };
}
