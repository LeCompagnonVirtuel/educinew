// Enterprise Platform Service - ApiCache
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ApiCache, ApiCacheCreate } from '@educi/types';
import { EntApiCacheNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntApiCacheService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getApiCache(schoolId: string, id: string): Promise<ApiCache> {
    const item = await this.repo.findApiCacheById(schoolId, id);
    if (!item) throw new EntApiCacheNotFoundError(id);
    return item;
  }
  async listApiCaches(schoolId: string, filters?: Record<string, unknown>): Promise<ApiCache[]> {
    return this.repo.findAllApiCaches(schoolId, filters);
  }
  async createApiCache(schoolId: string, data: ApiCacheCreate): Promise<ApiCache> {
    return this.repo.createApiCache(schoolId, data);
  }
  async updateApiCache(schoolId: string, id: string, data: Partial<ApiCacheCreate>): Promise<ApiCache> {
    const existing = await this.repo.findApiCacheById(schoolId, id);
    if (!existing) throw new EntApiCacheNotFoundError(id);
    return this.repo.updateApiCache(schoolId, id, data);
  }
  async deleteApiCache(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findApiCacheById(schoolId, id);
    if (!existing) throw new EntApiCacheNotFoundError(id);
    return this.repo.deleteApiCache(schoolId, id);
  }
  async countApiCaches(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countApiCaches(schoolId, filters);
  }
}
