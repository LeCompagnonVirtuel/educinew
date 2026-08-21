import type { SupabaseClient } from '@supabase/supabase-js';
import type { SearchMetrics } from '@educi/types';
import { EduCloudSearchMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudSearchMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getSearchMetrics(schoolId: string, id: string): Promise<SearchMetrics> {
    const item = await this.repo.getSearchMetrics(schoolId, id);
    if (!item) throw new EduCloudSearchMetricsError(id);
    return item;
  }
  async listSearchMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<SearchMetrics[]> {
    return this.repo.listSearchMetrics(schoolId, filters);
  }
  async createSearchMetrics(schoolId: string, data: Partial<SearchMetrics>): Promise<SearchMetrics> {
    return this.repo.createSearchMetrics(schoolId, data as any);
  }
  async updateSearchMetrics(schoolId: string, id: string, data: Partial<SearchMetrics>): Promise<SearchMetrics> {
    const existing = await this.repo.getSearchMetrics(schoolId, id);
    if (!existing) throw new EduCloudSearchMetricsError(id);
    return this.repo.updateSearchMetrics(schoolId, id, data as any);
  }
  async deleteSearchMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSearchMetrics(schoolId, id);
    if (!existing) throw new EduCloudSearchMetricsError(id);
    return this.repo.deleteSearchMetrics(schoolId, id);
  }
}
