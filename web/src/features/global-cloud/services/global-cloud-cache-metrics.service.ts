import type { SupabaseClient } from '@supabase/supabase-js';
import type { CacheMetrics } from '@educi/types';
import { EduCloudCacheMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCacheMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCacheMetrics(schoolId: string, id: string): Promise<CacheMetrics> {
    const item = await this.repo.getCacheMetrics(schoolId, id);
    if (!item) throw new EduCloudCacheMetricsError(id);
    return item;
  }
  async listCacheMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<CacheMetrics[]> {
    return this.repo.listCacheMetrics(schoolId, filters);
  }
  async createCacheMetrics(schoolId: string, data: Partial<CacheMetrics>): Promise<CacheMetrics> {
    return this.repo.createCacheMetrics(schoolId, data as any);
  }
  async updateCacheMetrics(schoolId: string, id: string, data: Partial<CacheMetrics>): Promise<CacheMetrics> {
    const existing = await this.repo.getCacheMetrics(schoolId, id);
    if (!existing) throw new EduCloudCacheMetricsError(id);
    return this.repo.updateCacheMetrics(schoolId, id, data as any);
  }
  async deleteCacheMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCacheMetrics(schoolId, id);
    if (!existing) throw new EduCloudCacheMetricsError(id);
    return this.repo.deleteCacheMetrics(schoolId, id);
  }
}
