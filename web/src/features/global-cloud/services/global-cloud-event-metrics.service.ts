import type { SupabaseClient } from '@supabase/supabase-js';
import type { EventMetrics } from '@educi/types';
import { EduCloudEventMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudEventMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getEventMetrics(schoolId: string, id: string): Promise<EventMetrics> {
    const item = await this.repo.getEventMetrics(schoolId, id);
    if (!item) throw new EduCloudEventMetricsError(id);
    return item;
  }
  async listEventMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<EventMetrics[]> {
    return this.repo.listEventMetrics(schoolId, filters);
  }
  async createEventMetrics(schoolId: string, data: Partial<EventMetrics>): Promise<EventMetrics> {
    return this.repo.createEventMetrics(schoolId, data as any);
  }
  async updateEventMetrics(schoolId: string, id: string, data: Partial<EventMetrics>): Promise<EventMetrics> {
    const existing = await this.repo.getEventMetrics(schoolId, id);
    if (!existing) throw new EduCloudEventMetricsError(id);
    return this.repo.updateEventMetrics(schoolId, id, data as any);
  }
  async deleteEventMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEventMetrics(schoolId, id);
    if (!existing) throw new EduCloudEventMetricsError(id);
    return this.repo.deleteEventMetrics(schoolId, id);
  }
}
