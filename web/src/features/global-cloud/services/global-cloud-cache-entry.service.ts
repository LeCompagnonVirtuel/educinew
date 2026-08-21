import type { SupabaseClient } from '@supabase/supabase-js';
import type { CacheEntry } from '@educi/types';
import { EduCloudCacheEntryError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCacheEntry {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCacheEntry(schoolId: string, id: string): Promise<CacheEntry> {
    const item = await this.repo.getCacheEntry(schoolId, id);
    if (!item) throw new EduCloudCacheEntryError(id);
    return item;
  }
  async listCacheEntrys(schoolId: string, filters?: Record<string, unknown>): Promise<CacheEntry[]> {
    return this.repo.listCacheEntry(schoolId, filters);
  }
  async createCacheEntry(schoolId: string, data: Partial<CacheEntry>): Promise<CacheEntry> {
    return this.repo.createCacheEntry(schoolId, data as any);
  }
  async updateCacheEntry(schoolId: string, id: string, data: Partial<CacheEntry>): Promise<CacheEntry> {
    const existing = await this.repo.getCacheEntry(schoolId, id);
    if (!existing) throw new EduCloudCacheEntryError(id);
    return this.repo.updateCacheEntry(schoolId, id, data as any);
  }
  async deleteCacheEntry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCacheEntry(schoolId, id);
    if (!existing) throw new EduCloudCacheEntryError(id);
    return this.repo.deleteCacheEntry(schoolId, id);
  }
}
