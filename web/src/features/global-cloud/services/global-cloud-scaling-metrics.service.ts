import type { SupabaseClient } from '@supabase/supabase-js';
import type { ScalingMetrics } from '@educi/types';
import { EduCloudScalingMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudScalingMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getScalingMetrics(schoolId: string, id: string): Promise<ScalingMetrics> {
    const item = await this.repo.getScalingMetrics(schoolId, id);
    if (!item) throw new EduCloudScalingMetricsError(id);
    return item;
  }
  async listScalingMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<ScalingMetrics[]> {
    return this.repo.listScalingMetrics(schoolId, filters);
  }
  async createScalingMetrics(schoolId: string, data: Partial<ScalingMetrics>): Promise<ScalingMetrics> {
    return this.repo.createScalingMetrics(schoolId, data as any);
  }
  async updateScalingMetrics(schoolId: string, id: string, data: Partial<ScalingMetrics>): Promise<ScalingMetrics> {
    const existing = await this.repo.getScalingMetrics(schoolId, id);
    if (!existing) throw new EduCloudScalingMetricsError(id);
    return this.repo.updateScalingMetrics(schoolId, id, data as any);
  }
  async deleteScalingMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getScalingMetrics(schoolId, id);
    if (!existing) throw new EduCloudScalingMetricsError(id);
    return this.repo.deleteScalingMetrics(schoolId, id);
  }
}
