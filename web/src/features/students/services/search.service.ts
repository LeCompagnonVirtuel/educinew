import type { StudentRepository } from '../types';
import { StudentNotFoundError } from '@educi/errors';
import { STUDENT_SEARCH } from '@educi/config';
import { logger } from '@educi/logger';

export class SearchService {
  constructor(private readonly studentRepo: StudentRepository) {}

  async search(schoolId: string, query: string, limit?: number) {
    if (query.length < STUDENT_SEARCH.MIN_QUERY_LENGTH) {
      return [];
    }
    return this.studentRepo.search(schoolId, query, limit || STUDENT_SEARCH.MAX_RESULTS);
  }
}
