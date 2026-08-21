// Enterprise Platform Service - CacheLayer
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CacheLayer, CacheLayerCreate } from '@educi/types';
import { EntCacheLayerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCacheLayerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCacheLayer(schoolId: string, id: string): Promise<CacheLayer> {
    const item = await this.repo.findCacheLayerById(schoolId, id);
    if (!item) throw new EntCacheLayerNotFoundError(id);
    return item;
  }
  async listCacheLayers(schoolId: string, filters?: Record<string, unknown>): Promise<CacheLayer[]> {
    return this.repo.findAllCacheLayers(schoolId, filters);
  }
  async createCacheLayer(schoolId: string, data: CacheLayerCreate): Promise<CacheLayer> {
    return this.repo.createCacheLayer(schoolId, data);
  }
  async updateCacheLayer(schoolId: string, id: string, data: Partial<CacheLayerCreate>): Promise<CacheLayer> {
    const existing = await this.repo.findCacheLayerById(schoolId, id);
    if (!existing) throw new EntCacheLayerNotFoundError(id);
    return this.repo.updateCacheLayer(schoolId, id, data);
  }
  async deleteCacheLayer(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCacheLayerById(schoolId, id);
    if (!existing) throw new EntCacheLayerNotFoundError(id);
    return this.repo.deleteCacheLayer(schoolId, id);
  }
  async countCacheLayers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCacheLayers(schoolId, filters);
  }
}
