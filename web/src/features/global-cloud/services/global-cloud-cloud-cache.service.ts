import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudCache } from '@educi/types';
import { EduCloudCloudCacheError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudCache {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudCache(schoolId: string, id: string): Promise<CloudCache> {
    const item = await this.repo.getCloudCache(schoolId, id);
    if (!item) throw new EduCloudCloudCacheError(id);
    return item;
  }
  async listCloudCaches(schoolId: string, filters?: Record<string, unknown>): Promise<CloudCache[]> {
    return this.repo.listCloudCache(schoolId, filters);
  }
  async createCloudCache(schoolId: string, data: Partial<CloudCache>): Promise<CloudCache> {
    return this.repo.createCloudCache(schoolId, data as any);
  }
  async updateCloudCache(schoolId: string, id: string, data: Partial<CloudCache>): Promise<CloudCache> {
    const existing = await this.repo.getCloudCache(schoolId, id);
    if (!existing) throw new EduCloudCloudCacheError(id);
    return this.repo.updateCloudCache(schoolId, id, data as any);
  }
  async deleteCloudCache(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudCache(schoolId, id);
    if (!existing) throw new EduCloudCloudCacheError(id);
    return this.repo.deleteCloudCache(schoolId, id);
  }
}
