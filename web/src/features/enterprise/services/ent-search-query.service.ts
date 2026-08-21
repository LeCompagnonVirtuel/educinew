// Enterprise Platform Service - SearchQuery
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SearchQuery, SearchQueryCreate } from '@educi/types';
import { EntSearchQueryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSearchQueryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSearchQuery(schoolId: string, id: string): Promise<SearchQuery> {
    const item = await this.repo.findSearchQueryById(schoolId, id);
    if (!item) throw new EntSearchQueryNotFoundError(id);
    return item;
  }
  async listSearchQuerys(schoolId: string, filters?: Record<string, unknown>): Promise<SearchQuery[]> {
    return this.repo.findAllSearchQuerys(schoolId, filters);
  }
  async createSearchQuery(schoolId: string, data: SearchQueryCreate): Promise<SearchQuery> {
    return this.repo.createSearchQuery(schoolId, data);
  }
  async updateSearchQuery(schoolId: string, id: string, data: Partial<SearchQueryCreate>): Promise<SearchQuery> {
    const existing = await this.repo.findSearchQueryById(schoolId, id);
    if (!existing) throw new EntSearchQueryNotFoundError(id);
    return this.repo.updateSearchQuery(schoolId, id, data);
  }
  async deleteSearchQuery(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSearchQueryById(schoolId, id);
    if (!existing) throw new EntSearchQueryNotFoundError(id);
    return this.repo.deleteSearchQuery(schoolId, id);
  }
  async countSearchQuerys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSearchQuerys(schoolId, filters);
  }
}
