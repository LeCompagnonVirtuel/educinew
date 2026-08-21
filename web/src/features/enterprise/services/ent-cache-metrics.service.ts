// Enterprise Platform Service - CacheMetrics
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CacheMetrics, CacheMetricsCreate } from '@educi/types';
import { EntCacheMetricsNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCacheMetricsService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCacheMetrics(schoolId: string, id: string): Promise<CacheMetrics> {
    const item = await this.repo.findCacheMetricsById(schoolId, id);
    if (!item) throw new EntCacheMetricsNotFoundError(id);
    return item;
  }
  async listCacheMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<CacheMetrics[]> {
    return this.repo.findAllCacheMetricss(schoolId, filters);
  }
  async createCacheMetrics(schoolId: string, data: CacheMetricsCreate): Promise<CacheMetrics> {
    return this.repo.createCacheMetrics(schoolId, data);
  }
  async updateCacheMetrics(schoolId: string, id: string, data: Partial<CacheMetricsCreate>): Promise<CacheMetrics> {
    const existing = await this.repo.findCacheMetricsById(schoolId, id);
    if (!existing) throw new EntCacheMetricsNotFoundError(id);
    return this.repo.updateCacheMetrics(schoolId, id, data);
  }
  async deleteCacheMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCacheMetricsById(schoolId, id);
    if (!existing) throw new EntCacheMetricsNotFoundError(id);
    return this.repo.deleteCacheMetrics(schoolId, id);
  }
  async countCacheMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCacheMetricss(schoolId, filters);
  }
}
