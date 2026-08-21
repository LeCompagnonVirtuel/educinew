import type { AcademicRepository } from '../types';
import { AppError } from '@educi/errors';
import { logger } from '@educi/logger';
import { ACADEMIC_SEARCH } from '@educi/config';

interface SearchResult {
  id: string;
  name: string;
  type: string;
}

interface SearchOptions {
  types?: string[];
  limit?: number;
}

interface RecentSearch {
  query: string;
  type: string;
  timestamp: string;
}

export class SearchService {
  private readonly recentSearches = new Map<string, RecentSearch[]>();

  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Searches across classes, subjects, rooms, teachers, departments, levels, sections, and streams.
   */
  async search(
    schoolId: string,
    query: string,
    options?: SearchOptions,
  ): Promise<SearchResult[]> {
    if (!query || query.trim().length < ACADEMIC_SEARCH.MIN_QUERY_LENGTH) {
      throw new AppError(
        `La recherche doit contenir au moins ${ACADEMIC_SEARCH.MIN_QUERY_LENGTH} caractères`,
        'SEARCH_QUERY_TOO_SHORT',
        400,
      );
    }

    const limit = options?.limit || ACADEMIC_SEARCH.MAX_RESULTS;
    const types = options?.types || [...ACADEMIC_SEARCH.TYPES];

    const results = await this.academicRepo.search(schoolId, query.trim(), types, limit);

    logger.info('Search executed', { schoolId, query: query.trim(), resultCount: results.length }, 'academic');
    return results;
  }

  /**
   * Retrieves recent searches for a school.
   */
  async getRecentSearches(schoolId: string): Promise<RecentSearch[]> {
    const searches = this.recentSearches.get(schoolId) || [];
    logger.info('Recent searches retrieved', { schoolId, count: searches.length }, 'academic');
    return searches.slice(0, 20);
  }

  /**
   * Saves a recent search query for a user.
   */
  async saveRecentSearch(
    schoolId: string,
    userId: string,
    query: string,
    type: string,
  ): Promise<void> {
    if (!query || query.trim().length === 0) {
      throw new AppError('La requête de recherche est requise', 'SEARCH_EMPTY_QUERY', 400);
    }

    const searches = this.recentSearches.get(schoolId) || [];

    const filtered = searches.filter(
      (s) => !(s.query.toLowerCase() === query.trim().toLowerCase() && s.type === type),
    );

    filtered.unshift({
      query: query.trim(),
      type,
      timestamp: new Date().toISOString(),
    });

    this.recentSearches.set(schoolId, filtered.slice(0, 50));

    logger.info('Recent search saved', { schoolId, userId, query: query.trim(), type }, 'academic');
  }
}
