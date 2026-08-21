// Enterprise Platform Service - CacheEntry
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CacheEntry, CacheEntryCreate } from '@educi/types';
import { EntCacheEntryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCacheEntryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCacheEntry(schoolId: string, id: string): Promise<CacheEntry> {
    const item = await this.repo.findCacheEntryById(schoolId, id);
    if (!item) throw new EntCacheEntryNotFoundError(id);
    return item;
  }
  async listCacheEntrys(schoolId: string, filters?: Record<string, unknown>): Promise<CacheEntry[]> {
    return this.repo.findAllCacheEntrys(schoolId, filters);
  }
  async createCacheEntry(schoolId: string, data: CacheEntryCreate): Promise<CacheEntry> {
    return this.repo.createCacheEntry(schoolId, data);
  }
  async updateCacheEntry(schoolId: string, id: string, data: Partial<CacheEntryCreate>): Promise<CacheEntry> {
    const existing = await this.repo.findCacheEntryById(schoolId, id);
    if (!existing) throw new EntCacheEntryNotFoundError(id);
    return this.repo.updateCacheEntry(schoolId, id, data);
  }
  async deleteCacheEntry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCacheEntryById(schoolId, id);
    if (!existing) throw new EntCacheEntryNotFoundError(id);
    return this.repo.deleteCacheEntry(schoolId, id);
  }
  async countCacheEntrys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCacheEntrys(schoolId, filters);
  }
}
