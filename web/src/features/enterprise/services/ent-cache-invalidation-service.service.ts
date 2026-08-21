// Enterprise Platform Service - CacheInvalidation
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CacheInvalidation, CacheInvalidationCreate } from '@educi/types';
import { EntCacheInvalidationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCacheInvalidationServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCacheInvalidationService(schoolId: string, id: string): Promise<CacheInvalidation> {
    const item = await this.repo.findCacheInvalidationServiceById(schoolId, id);
    if (!item) throw new EntCacheInvalidationNotFoundError(id);
    return item;
  }
  async listCacheInvalidationServices(schoolId: string, filters?: Record<string, unknown>): Promise<CacheInvalidation[]> {
    return this.repo.findAllCacheInvalidationServices(schoolId, filters);
  }
  async createCacheInvalidationService(schoolId: string, data: CacheInvalidationCreate): Promise<CacheInvalidation> {
    return this.repo.createCacheInvalidationService(schoolId, data);
  }
  async updateCacheInvalidationService(schoolId: string, id: string, data: Partial<CacheInvalidationCreate>): Promise<CacheInvalidation> {
    const existing = await this.repo.findCacheInvalidationServiceById(schoolId, id);
    if (!existing) throw new EntCacheInvalidationNotFoundError(id);
    return this.repo.updateCacheInvalidationService(schoolId, id, data);
  }
  async deleteCacheInvalidationService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCacheInvalidationServiceById(schoolId, id);
    if (!existing) throw new EntCacheInvalidationNotFoundError(id);
    return this.repo.deleteCacheInvalidationService(schoolId, id);
  }
  async countCacheInvalidationServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCacheInvalidationServices(schoolId, filters);
  }
}
