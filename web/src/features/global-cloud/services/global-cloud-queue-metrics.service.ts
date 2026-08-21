import type { SupabaseClient } from '@supabase/supabase-js';
import type { QueueMetrics } from '@educi/types';
import { EduCloudQueueMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudQueueMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getQueueMetrics(schoolId: string, id: string): Promise<QueueMetrics> {
    const item = await this.repo.getQueueMetrics(schoolId, id);
    if (!item) throw new EduCloudQueueMetricsError(id);
    return item;
  }
  async listQueueMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<QueueMetrics[]> {
    return this.repo.listQueueMetrics(schoolId, filters);
  }
  async createQueueMetrics(schoolId: string, data: Partial<QueueMetrics>): Promise<QueueMetrics> {
    return this.repo.createQueueMetrics(schoolId, data as any);
  }
  async updateQueueMetrics(schoolId: string, id: string, data: Partial<QueueMetrics>): Promise<QueueMetrics> {
    const existing = await this.repo.getQueueMetrics(schoolId, id);
    if (!existing) throw new EduCloudQueueMetricsError(id);
    return this.repo.updateQueueMetrics(schoolId, id, data as any);
  }
  async deleteQueueMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getQueueMetrics(schoolId, id);
    if (!existing) throw new EduCloudQueueMetricsError(id);
    return this.repo.deleteQueueMetrics(schoolId, id);
  }
}
