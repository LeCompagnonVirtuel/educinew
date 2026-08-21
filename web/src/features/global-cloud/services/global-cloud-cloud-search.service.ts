import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudSearch } from '@educi/types';
import { EduCloudCloudSearchError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudSearch {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudSearch(schoolId: string, id: string): Promise<CloudSearch> {
    const item = await this.repo.getCloudSearch(schoolId, id);
    if (!item) throw new EduCloudCloudSearchError(id);
    return item;
  }
  async listCloudSearchs(schoolId: string, filters?: Record<string, unknown>): Promise<CloudSearch[]> {
    return this.repo.listCloudSearch(schoolId, filters);
  }
  async createCloudSearch(schoolId: string, data: Partial<CloudSearch>): Promise<CloudSearch> {
    return this.repo.createCloudSearch(schoolId, data as any);
  }
  async updateCloudSearch(schoolId: string, id: string, data: Partial<CloudSearch>): Promise<CloudSearch> {
    const existing = await this.repo.getCloudSearch(schoolId, id);
    if (!existing) throw new EduCloudCloudSearchError(id);
    return this.repo.updateCloudSearch(schoolId, id, data as any);
  }
  async deleteCloudSearch(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudSearch(schoolId, id);
    if (!existing) throw new EduCloudCloudSearchError(id);
    return this.repo.deleteCloudSearch(schoolId, id);
  }
}
