// Enterprise Platform Service - CacheInvalidation
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CacheInvalidation, CacheInvalidationCreate } from '@educi/types';
import { EntCacheInvalidationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCacheInvalidationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCacheInvalidation(schoolId: string, id: string): Promise<CacheInvalidation> {
    const item = await this.repo.findCacheInvalidationById(schoolId, id);
    if (!item) throw new EntCacheInvalidationNotFoundError(id);
    return item;
  }
  async listCacheInvalidations(schoolId: string, filters?: Record<string, unknown>): Promise<CacheInvalidation[]> {
    return this.repo.findAllCacheInvalidations(schoolId, filters);
  }
  async createCacheInvalidation(schoolId: string, data: CacheInvalidationCreate): Promise<CacheInvalidation> {
    return this.repo.createCacheInvalidation(schoolId, data);
  }
  async updateCacheInvalidation(schoolId: string, id: string, data: Partial<CacheInvalidationCreate>): Promise<CacheInvalidation> {
    const existing = await this.repo.findCacheInvalidationById(schoolId, id);
    if (!existing) throw new EntCacheInvalidationNotFoundError(id);
    return this.repo.updateCacheInvalidation(schoolId, id, data);
  }
  async deleteCacheInvalidation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCacheInvalidationById(schoolId, id);
    if (!existing) throw new EntCacheInvalidationNotFoundError(id);
    return this.repo.deleteCacheInvalidation(schoolId, id);
  }
  async countCacheInvalidations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCacheInvalidations(schoolId, filters);
  }
}
