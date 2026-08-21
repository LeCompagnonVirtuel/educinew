import type { SupabaseClient } from '@supabase/supabase-js';
import type { FeatureMetrics } from '@educi/types';
import { EduCloudFeatureMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudFeatureMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getFeatureMetrics(schoolId: string, id: string): Promise<FeatureMetrics> {
    const item = await this.repo.getFeatureMetrics(schoolId, id);
    if (!item) throw new EduCloudFeatureMetricsError(id);
    return item;
  }
  async listFeatureMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<FeatureMetrics[]> {
    return this.repo.listFeatureMetrics(schoolId, filters);
  }
  async createFeatureMetrics(schoolId: string, data: Partial<FeatureMetrics>): Promise<FeatureMetrics> {
    return this.repo.createFeatureMetrics(schoolId, data as any);
  }
  async updateFeatureMetrics(schoolId: string, id: string, data: Partial<FeatureMetrics>): Promise<FeatureMetrics> {
    const existing = await this.repo.getFeatureMetrics(schoolId, id);
    if (!existing) throw new EduCloudFeatureMetricsError(id);
    return this.repo.updateFeatureMetrics(schoolId, id, data as any);
  }
  async deleteFeatureMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getFeatureMetrics(schoolId, id);
    if (!existing) throw new EduCloudFeatureMetricsError(id);
    return this.repo.deleteFeatureMetrics(schoolId, id);
  }
}
