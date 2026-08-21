// Enterprise Platform Service - CacheSnapshot
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CacheSnapshot, CacheSnapshotCreate } from '@educi/types';
import { EntCacheSnapshotNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCacheSnapshotService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCacheSnapshot(schoolId: string, id: string): Promise<CacheSnapshot> {
    const item = await this.repo.findCacheSnapshotById(schoolId, id);
    if (!item) throw new EntCacheSnapshotNotFoundError(id);
    return item;
  }
  async listCacheSnapshots(schoolId: string, filters?: Record<string, unknown>): Promise<CacheSnapshot[]> {
    return this.repo.findAllCacheSnapshots(schoolId, filters);
  }
  async createCacheSnapshot(schoolId: string, data: CacheSnapshotCreate): Promise<CacheSnapshot> {
    return this.repo.createCacheSnapshot(schoolId, data);
  }
  async updateCacheSnapshot(schoolId: string, id: string, data: Partial<CacheSnapshotCreate>): Promise<CacheSnapshot> {
    const existing = await this.repo.findCacheSnapshotById(schoolId, id);
    if (!existing) throw new EntCacheSnapshotNotFoundError(id);
    return this.repo.updateCacheSnapshot(schoolId, id, data);
  }
  async deleteCacheSnapshot(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCacheSnapshotById(schoolId, id);
    if (!existing) throw new EntCacheSnapshotNotFoundError(id);
    return this.repo.deleteCacheSnapshot(schoolId, id);
  }
  async countCacheSnapshots(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCacheSnapshots(schoolId, filters);
  }
}
