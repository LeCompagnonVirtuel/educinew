// Enterprise Platform Service - CacheWarmer
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CacheWarmer, CacheWarmerCreate } from '@educi/types';
import { EntCacheWarmerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCacheWarmerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCacheWarmer(schoolId: string, id: string): Promise<CacheWarmer> {
    const item = await this.repo.findCacheWarmerById(schoolId, id);
    if (!item) throw new EntCacheWarmerNotFoundError(id);
    return item;
  }
  async listCacheWarmers(schoolId: string, filters?: Record<string, unknown>): Promise<CacheWarmer[]> {
    return this.repo.findAllCacheWarmers(schoolId, filters);
  }
  async createCacheWarmer(schoolId: string, data: CacheWarmerCreate): Promise<CacheWarmer> {
    return this.repo.createCacheWarmer(schoolId, data);
  }
  async updateCacheWarmer(schoolId: string, id: string, data: Partial<CacheWarmerCreate>): Promise<CacheWarmer> {
    const existing = await this.repo.findCacheWarmerById(schoolId, id);
    if (!existing) throw new EntCacheWarmerNotFoundError(id);
    return this.repo.updateCacheWarmer(schoolId, id, data);
  }
  async deleteCacheWarmer(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCacheWarmerById(schoolId, id);
    if (!existing) throw new EntCacheWarmerNotFoundError(id);
    return this.repo.deleteCacheWarmer(schoolId, id);
  }
  async countCacheWarmers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCacheWarmers(schoolId, filters);
  }
}
