// Enterprise Platform Service - CacheManager
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CacheManager, CacheManagerCreate } from '@educi/types';
import { EntCacheManagerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCacheManagerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCacheManager(schoolId: string, id: string): Promise<CacheManager> {
    const item = await this.repo.findCacheManagerById(schoolId, id);
    if (!item) throw new EntCacheManagerNotFoundError(id);
    return item;
  }
  async listCacheManagers(schoolId: string, filters?: Record<string, unknown>): Promise<CacheManager[]> {
    return this.repo.findAllCacheManagers(schoolId, filters);
  }
  async createCacheManager(schoolId: string, data: CacheManagerCreate): Promise<CacheManager> {
    return this.repo.createCacheManager(schoolId, data);
  }
  async updateCacheManager(schoolId: string, id: string, data: Partial<CacheManagerCreate>): Promise<CacheManager> {
    const existing = await this.repo.findCacheManagerById(schoolId, id);
    if (!existing) throw new EntCacheManagerNotFoundError(id);
    return this.repo.updateCacheManager(schoolId, id, data);
  }
  async deleteCacheManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCacheManagerById(schoolId, id);
    if (!existing) throw new EntCacheManagerNotFoundError(id);
    return this.repo.deleteCacheManager(schoolId, id);
  }
  async countCacheManagers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCacheManagers(schoolId, filters);
  }
}
