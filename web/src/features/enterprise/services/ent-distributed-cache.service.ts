// Enterprise Platform Service - DistributedCache
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DistributedCache, DistributedCacheCreate } from '@educi/types';
import { EntDistributedCacheNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDistributedCacheService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDistributedCache(schoolId: string, id: string): Promise<DistributedCache> {
    const item = await this.repo.findDistributedCacheById(schoolId, id);
    if (!item) throw new EntDistributedCacheNotFoundError(id);
    return item;
  }
  async listDistributedCaches(schoolId: string, filters?: Record<string, unknown>): Promise<DistributedCache[]> {
    return this.repo.findAllDistributedCaches(schoolId, filters);
  }
  async createDistributedCache(schoolId: string, data: DistributedCacheCreate): Promise<DistributedCache> {
    return this.repo.createDistributedCache(schoolId, data);
  }
  async updateDistributedCache(schoolId: string, id: string, data: Partial<DistributedCacheCreate>): Promise<DistributedCache> {
    const existing = await this.repo.findDistributedCacheById(schoolId, id);
    if (!existing) throw new EntDistributedCacheNotFoundError(id);
    return this.repo.updateDistributedCache(schoolId, id, data);
  }
  async deleteDistributedCache(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDistributedCacheById(schoolId, id);
    if (!existing) throw new EntDistributedCacheNotFoundError(id);
    return this.repo.deleteDistributedCache(schoolId, id);
  }
  async countDistributedCaches(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDistributedCaches(schoolId, filters);
  }
}
