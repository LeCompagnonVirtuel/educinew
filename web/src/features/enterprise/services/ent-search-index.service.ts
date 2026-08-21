// Enterprise Platform Service - SearchIndex
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SearchIndex, SearchIndexCreate } from '@educi/types';
import { EntSearchIndexNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSearchIndexService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSearchIndex(schoolId: string, id: string): Promise<SearchIndex> {
    const item = await this.repo.findSearchIndexById(schoolId, id);
    if (!item) throw new EntSearchIndexNotFoundError(id);
    return item;
  }
  async listSearchIndexs(schoolId: string, filters?: Record<string, unknown>): Promise<SearchIndex[]> {
    return this.repo.findAllSearchIndexs(schoolId, filters);
  }
  async createSearchIndex(schoolId: string, data: SearchIndexCreate): Promise<SearchIndex> {
    return this.repo.createSearchIndex(schoolId, data);
  }
  async updateSearchIndex(schoolId: string, id: string, data: Partial<SearchIndexCreate>): Promise<SearchIndex> {
    const existing = await this.repo.findSearchIndexById(schoolId, id);
    if (!existing) throw new EntSearchIndexNotFoundError(id);
    return this.repo.updateSearchIndex(schoolId, id, data);
  }
  async deleteSearchIndex(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSearchIndexById(schoolId, id);
    if (!existing) throw new EntSearchIndexNotFoundError(id);
    return this.repo.deleteSearchIndex(schoolId, id);
  }
  async countSearchIndexs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSearchIndexs(schoolId, filters);
  }
}
