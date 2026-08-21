import type { SupabaseClient } from '@supabase/supabase-js';
import type { CdnCache } from '@educi/types';
import { EduCloudCdnCacheError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCdnCache {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCdnCache(schoolId: string, id: string): Promise<CdnCache> {
    const item = await this.repo.getCdnCache(schoolId, id);
    if (!item) throw new EduCloudCdnCacheError(id);
    return item;
  }
  async listCdnCaches(schoolId: string, filters?: Record<string, unknown>): Promise<CdnCache[]> {
    return this.repo.listCdnCache(schoolId, filters);
  }
  async createCdnCache(schoolId: string, data: Partial<CdnCache>): Promise<CdnCache> {
    return this.repo.createCdnCache(schoolId, data as any);
  }
  async updateCdnCache(schoolId: string, id: string, data: Partial<CdnCache>): Promise<CdnCache> {
    const existing = await this.repo.getCdnCache(schoolId, id);
    if (!existing) throw new EduCloudCdnCacheError(id);
    return this.repo.updateCdnCache(schoolId, id, data as any);
  }
  async deleteCdnCache(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCdnCache(schoolId, id);
    if (!existing) throw new EduCloudCdnCacheError(id);
    return this.repo.deleteCdnCache(schoolId, id);
  }
}
