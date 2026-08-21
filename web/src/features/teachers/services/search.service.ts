import type { TeacherRepository } from '../types';
import { TEACHER_SEARCH } from '@educi/config';
import { logger } from '@educi/logger';

export class SearchService {
  constructor(private readonly teacherRepo: TeacherRepository) {}

  async search(schoolId: string, query: string, limit?: number) {
    if (query.length < TEACHER_SEARCH.MIN_QUERY_LENGTH) {
      return [];
    }
    return this.teacherRepo.search(schoolId, query, limit || TEACHER_SEARCH.MAX_RESULTS);
  }
}
