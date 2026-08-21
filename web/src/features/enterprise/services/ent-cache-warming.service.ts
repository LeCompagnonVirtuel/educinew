// Enterprise Platform Service - CacheWarming
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CacheWarming, CacheWarmingCreate } from '@educi/types';
import { EntCacheWarmingNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCacheWarmingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCacheWarming(schoolId: string, id: string): Promise<CacheWarming> {
    const item = await this.repo.findCacheWarmingById(schoolId, id);
    if (!item) throw new EntCacheWarmingNotFoundError(id);
    return item;
  }
  async listCacheWarmings(schoolId: string, filters?: Record<string, unknown>): Promise<CacheWarming[]> {
    return this.repo.findAllCacheWarmings(schoolId, filters);
  }
  async createCacheWarming(schoolId: string, data: CacheWarmingCreate): Promise<CacheWarming> {
    return this.repo.createCacheWarming(schoolId, data);
  }
  async updateCacheWarming(schoolId: string, id: string, data: Partial<CacheWarmingCreate>): Promise<CacheWarming> {
    const existing = await this.repo.findCacheWarmingById(schoolId, id);
    if (!existing) throw new EntCacheWarmingNotFoundError(id);
    return this.repo.updateCacheWarming(schoolId, id, data);
  }
  async deleteCacheWarming(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCacheWarmingById(schoolId, id);
    if (!existing) throw new EntCacheWarmingNotFoundError(id);
    return this.repo.deleteCacheWarming(schoolId, id);
  }
  async countCacheWarmings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCacheWarmings(schoolId, filters);
  }
}
