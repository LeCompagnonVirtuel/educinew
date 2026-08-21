// Enterprise Platform Service - SearchIndexer
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SearchIndexer, SearchIndexerCreate } from '@educi/types';
import { EntSearchIndexerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSearchIndexerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSearchIndexer(schoolId: string, id: string): Promise<SearchIndexer> {
    const item = await this.repo.findSearchIndexerById(schoolId, id);
    if (!item) throw new EntSearchIndexerNotFoundError(id);
    return item;
  }
  async listSearchIndexers(schoolId: string, filters?: Record<string, unknown>): Promise<SearchIndexer[]> {
    return this.repo.findAllSearchIndexers(schoolId, filters);
  }
  async createSearchIndexer(schoolId: string, data: SearchIndexerCreate): Promise<SearchIndexer> {
    return this.repo.createSearchIndexer(schoolId, data);
  }
  async updateSearchIndexer(schoolId: string, id: string, data: Partial<SearchIndexerCreate>): Promise<SearchIndexer> {
    const existing = await this.repo.findSearchIndexerById(schoolId, id);
    if (!existing) throw new EntSearchIndexerNotFoundError(id);
    return this.repo.updateSearchIndexer(schoolId, id, data);
  }
  async deleteSearchIndexer(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSearchIndexerById(schoolId, id);
    if (!existing) throw new EntSearchIndexerNotFoundError(id);
    return this.repo.deleteSearchIndexer(schoolId, id);
  }
  async countSearchIndexers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSearchIndexers(schoolId, filters);
  }
}
