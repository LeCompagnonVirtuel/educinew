// Enterprise Platform Service - CacheConfigs
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCacheConfigService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCacheConfig(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findCacheConfigById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listCacheConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllCacheConfigs(schoolId, filters);
  }
  async createCacheConfig(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createCacheConfig(schoolId, data);
  }
  async updateCacheConfig(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findCacheConfigById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateCacheConfig(schoolId, id, data);
  }
  async deleteCacheConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCacheConfigById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteCacheConfig(schoolId, id);
  }
  async countCacheConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCacheConfigs(schoolId, filters);
  }
}
