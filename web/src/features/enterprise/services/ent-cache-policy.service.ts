// Enterprise Platform Service - CachePolicy
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CachePolicy, CachePolicyCreate } from '@educi/types';
import { EntCachePolicyNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCachePolicyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCachePolicy(schoolId: string, id: string): Promise<CachePolicy> {
    const item = await this.repo.findCachePolicyById(schoolId, id);
    if (!item) throw new EntCachePolicyNotFoundError(id);
    return item;
  }
  async listCachePolicys(schoolId: string, filters?: Record<string, unknown>): Promise<CachePolicy[]> {
    return this.repo.findAllCachePolicys(schoolId, filters);
  }
  async createCachePolicy(schoolId: string, data: CachePolicyCreate): Promise<CachePolicy> {
    return this.repo.createCachePolicy(schoolId, data);
  }
  async updateCachePolicy(schoolId: string, id: string, data: Partial<CachePolicyCreate>): Promise<CachePolicy> {
    const existing = await this.repo.findCachePolicyById(schoolId, id);
    if (!existing) throw new EntCachePolicyNotFoundError(id);
    return this.repo.updateCachePolicy(schoolId, id, data);
  }
  async deleteCachePolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCachePolicyById(schoolId, id);
    if (!existing) throw new EntCachePolicyNotFoundError(id);
    return this.repo.deleteCachePolicy(schoolId, id);
  }
  async countCachePolicys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCachePolicys(schoolId, filters);
  }
}
