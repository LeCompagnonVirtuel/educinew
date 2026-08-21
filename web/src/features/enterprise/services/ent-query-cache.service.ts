// Enterprise Platform Service - QueryCache
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { QueryCache, QueryCacheCreate } from '@educi/types';
import { EntQueryCacheNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntQueryCacheService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getQueryCache(schoolId: string, id: string): Promise<QueryCache> {
    const item = await this.repo.findQueryCacheById(schoolId, id);
    if (!item) throw new EntQueryCacheNotFoundError(id);
    return item;
  }
  async listQueryCaches(schoolId: string, filters?: Record<string, unknown>): Promise<QueryCache[]> {
    return this.repo.findAllQueryCaches(schoolId, filters);
  }
  async createQueryCache(schoolId: string, data: QueryCacheCreate): Promise<QueryCache> {
    return this.repo.createQueryCache(schoolId, data);
  }
  async updateQueryCache(schoolId: string, id: string, data: Partial<QueryCacheCreate>): Promise<QueryCache> {
    const existing = await this.repo.findQueryCacheById(schoolId, id);
    if (!existing) throw new EntQueryCacheNotFoundError(id);
    return this.repo.updateQueryCache(schoolId, id, data);
  }
  async deleteQueryCache(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findQueryCacheById(schoolId, id);
    if (!existing) throw new EntQueryCacheNotFoundError(id);
    return this.repo.deleteQueryCache(schoolId, id);
  }
  async countQueryCaches(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countQueryCaches(schoolId, filters);
  }
}
