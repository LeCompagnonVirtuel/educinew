import type { SupabaseClient } from '@supabase/supabase-js';
import type { SearchQuery } from '@educi/types';
import { EduCloudSearchQueryError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudSearchQuery {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getSearchQuery(schoolId: string, id: string): Promise<SearchQuery> {
    const item = await this.repo.getSearchQuery(schoolId, id);
    if (!item) throw new EduCloudSearchQueryError(id);
    return item;
  }
  async listSearchQuerys(schoolId: string, filters?: Record<string, unknown>): Promise<SearchQuery[]> {
    return this.repo.listSearchQuery(schoolId, filters);
  }
  async createSearchQuery(schoolId: string, data: Partial<SearchQuery>): Promise<SearchQuery> {
    return this.repo.createSearchQuery(schoolId, data as any);
  }
  async updateSearchQuery(schoolId: string, id: string, data: Partial<SearchQuery>): Promise<SearchQuery> {
    const existing = await this.repo.getSearchQuery(schoolId, id);
    if (!existing) throw new EduCloudSearchQueryError(id);
    return this.repo.updateSearchQuery(schoolId, id, data as any);
  }
  async deleteSearchQuery(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSearchQuery(schoolId, id);
    if (!existing) throw new EduCloudSearchQueryError(id);
    return this.repo.deleteSearchQuery(schoolId, id);
  }
}
