import type { SupabaseClient } from '@supabase/supabase-js';
import type { CachePolicy } from '@educi/types';
import { EduCloudCachePolicyError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCachePolicy {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCachePolicy(schoolId: string, id: string): Promise<CachePolicy> {
    const item = await this.repo.getCachePolicy(schoolId, id);
    if (!item) throw new EduCloudCachePolicyError(id);
    return item;
  }
  async listCachePolicys(schoolId: string, filters?: Record<string, unknown>): Promise<CachePolicy[]> {
    return this.repo.listCachePolicy(schoolId, filters);
  }
  async createCachePolicy(schoolId: string, data: Partial<CachePolicy>): Promise<CachePolicy> {
    return this.repo.createCachePolicy(schoolId, data as any);
  }
  async updateCachePolicy(schoolId: string, id: string, data: Partial<CachePolicy>): Promise<CachePolicy> {
    const existing = await this.repo.getCachePolicy(schoolId, id);
    if (!existing) throw new EduCloudCachePolicyError(id);
    return this.repo.updateCachePolicy(schoolId, id, data as any);
  }
  async deleteCachePolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCachePolicy(schoolId, id);
    if (!existing) throw new EduCloudCachePolicyError(id);
    return this.repo.deleteCachePolicy(schoolId, id);
  }
}
