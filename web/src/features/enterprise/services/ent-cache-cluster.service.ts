// Enterprise Platform Service - CacheCluster
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CacheCluster, CacheClusterCreate } from '@educi/types';
import { EntCacheClusterNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCacheClusterService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCacheCluster(schoolId: string, id: string): Promise<CacheCluster> {
    const item = await this.repo.findCacheClusterById(schoolId, id);
    if (!item) throw new EntCacheClusterNotFoundError(id);
    return item;
  }
  async listCacheClusters(schoolId: string, filters?: Record<string, unknown>): Promise<CacheCluster[]> {
    return this.repo.findAllCacheClusters(schoolId, filters);
  }
  async createCacheCluster(schoolId: string, data: CacheClusterCreate): Promise<CacheCluster> {
    return this.repo.createCacheCluster(schoolId, data);
  }
  async updateCacheCluster(schoolId: string, id: string, data: Partial<CacheClusterCreate>): Promise<CacheCluster> {
    const existing = await this.repo.findCacheClusterById(schoolId, id);
    if (!existing) throw new EntCacheClusterNotFoundError(id);
    return this.repo.updateCacheCluster(schoolId, id, data);
  }
  async deleteCacheCluster(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCacheClusterById(schoolId, id);
    if (!existing) throw new EntCacheClusterNotFoundError(id);
    return this.repo.deleteCacheCluster(schoolId, id);
  }
  async countCacheClusters(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCacheClusters(schoolId, filters);
  }
}
