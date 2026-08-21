import type { SupabaseClient } from '@supabase/supabase-js';
import type { TrafficMetrics } from '@educi/types';
import { EduCloudTrafficMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudTrafficMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getTrafficMetrics(schoolId: string, id: string): Promise<TrafficMetrics> {
    const item = await this.repo.getTrafficMetrics(schoolId, id);
    if (!item) throw new EduCloudTrafficMetricsError(id);
    return item;
  }
  async listTrafficMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<TrafficMetrics[]> {
    return this.repo.listTrafficMetrics(schoolId, filters);
  }
  async createTrafficMetrics(schoolId: string, data: Partial<TrafficMetrics>): Promise<TrafficMetrics> {
    return this.repo.createTrafficMetrics(schoolId, data as any);
  }
  async updateTrafficMetrics(schoolId: string, id: string, data: Partial<TrafficMetrics>): Promise<TrafficMetrics> {
    const existing = await this.repo.getTrafficMetrics(schoolId, id);
    if (!existing) throw new EduCloudTrafficMetricsError(id);
    return this.repo.updateTrafficMetrics(schoolId, id, data as any);
  }
  async deleteTrafficMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTrafficMetrics(schoolId, id);
    if (!existing) throw new EduCloudTrafficMetricsError(id);
    return this.repo.deleteTrafficMetrics(schoolId, id);
  }
}
