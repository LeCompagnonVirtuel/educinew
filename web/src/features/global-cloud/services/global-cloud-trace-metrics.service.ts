import type { SupabaseClient } from '@supabase/supabase-js';
import type { TraceMetrics } from '@educi/types';
import { EduCloudTraceMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudTraceMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getTraceMetrics(schoolId: string, id: string): Promise<TraceMetrics> {
    const item = await this.repo.getTraceMetrics(schoolId, id);
    if (!item) throw new EduCloudTraceMetricsError(id);
    return item;
  }
  async listTraceMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<TraceMetrics[]> {
    return this.repo.listTraceMetrics(schoolId, filters);
  }
  async createTraceMetrics(schoolId: string, data: Partial<TraceMetrics>): Promise<TraceMetrics> {
    return this.repo.createTraceMetrics(schoolId, data as any);
  }
  async updateTraceMetrics(schoolId: string, id: string, data: Partial<TraceMetrics>): Promise<TraceMetrics> {
    const existing = await this.repo.getTraceMetrics(schoolId, id);
    if (!existing) throw new EduCloudTraceMetricsError(id);
    return this.repo.updateTraceMetrics(schoolId, id, data as any);
  }
  async deleteTraceMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTraceMetrics(schoolId, id);
    if (!existing) throw new EduCloudTraceMetricsError(id);
    return this.repo.deleteTraceMetrics(schoolId, id);
  }
}
