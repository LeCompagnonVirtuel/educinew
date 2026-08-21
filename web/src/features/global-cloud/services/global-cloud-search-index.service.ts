import type { SupabaseClient } from '@supabase/supabase-js';
import type { SearchIndex } from '@educi/types';
import { EduCloudSearchIndexError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudSearchIndex {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getSearchIndex(schoolId: string, id: string): Promise<SearchIndex> {
    const item = await this.repo.getSearchIndex(schoolId, id);
    if (!item) throw new EduCloudSearchIndexError(id);
    return item;
  }
  async listSearchIndexs(schoolId: string, filters?: Record<string, unknown>): Promise<SearchIndex[]> {
    return this.repo.listSearchIndex(schoolId, filters);
  }
  async createSearchIndex(schoolId: string, data: Partial<SearchIndex>): Promise<SearchIndex> {
    return this.repo.createSearchIndex(schoolId, data as any);
  }
  async updateSearchIndex(schoolId: string, id: string, data: Partial<SearchIndex>): Promise<SearchIndex> {
    const existing = await this.repo.getSearchIndex(schoolId, id);
    if (!existing) throw new EduCloudSearchIndexError(id);
    return this.repo.updateSearchIndex(schoolId, id, data as any);
  }
  async deleteSearchIndex(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSearchIndex(schoolId, id);
    if (!existing) throw new EduCloudSearchIndexError(id);
    return this.repo.deleteSearchIndex(schoolId, id);
  }
}
