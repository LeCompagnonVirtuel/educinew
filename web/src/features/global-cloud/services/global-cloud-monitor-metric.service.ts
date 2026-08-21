import type { SupabaseClient } from '@supabase/supabase-js';
import type { MonitorMetric } from '@educi/types';
import { EduCloudMonitorMetricError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudMonitorMetric {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getMonitorMetric(schoolId: string, id: string): Promise<MonitorMetric> {
    const item = await this.repo.getMonitorMetric(schoolId, id);
    if (!item) throw new EduCloudMonitorMetricError(id);
    return item;
  }
  async listMonitorMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<MonitorMetric[]> {
    return this.repo.listMonitorMetric(schoolId, filters);
  }
  async createMonitorMetric(schoolId: string, data: Partial<MonitorMetric>): Promise<MonitorMetric> {
    return this.repo.createMonitorMetric(schoolId, data as any);
  }
  async updateMonitorMetric(schoolId: string, id: string, data: Partial<MonitorMetric>): Promise<MonitorMetric> {
    const existing = await this.repo.getMonitorMetric(schoolId, id);
    if (!existing) throw new EduCloudMonitorMetricError(id);
    return this.repo.updateMonitorMetric(schoolId, id, data as any);
  }
  async deleteMonitorMetric(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMonitorMetric(schoolId, id);
    if (!existing) throw new EduCloudMonitorMetricError(id);
    return this.repo.deleteMonitorMetric(schoolId, id);
  }
}
