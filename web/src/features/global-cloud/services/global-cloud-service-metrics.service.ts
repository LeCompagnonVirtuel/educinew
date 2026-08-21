import type { SupabaseClient } from '@supabase/supabase-js';
import type { ServiceMetrics } from '@educi/types';
import { EduCloudServiceMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudServiceMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getServiceMetrics(schoolId: string, id: string): Promise<ServiceMetrics> {
    const item = await this.repo.getServiceMetrics(schoolId, id);
    if (!item) throw new EduCloudServiceMetricsError(id);
    return item;
  }
  async listServiceMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<ServiceMetrics[]> {
    return this.repo.listServiceMetrics(schoolId, filters);
  }
  async createServiceMetrics(schoolId: string, data: Partial<ServiceMetrics>): Promise<ServiceMetrics> {
    return this.repo.createServiceMetrics(schoolId, data as any);
  }
  async updateServiceMetrics(schoolId: string, id: string, data: Partial<ServiceMetrics>): Promise<ServiceMetrics> {
    const existing = await this.repo.getServiceMetrics(schoolId, id);
    if (!existing) throw new EduCloudServiceMetricsError(id);
    return this.repo.updateServiceMetrics(schoolId, id, data as any);
  }
  async deleteServiceMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getServiceMetrics(schoolId, id);
    if (!existing) throw new EduCloudServiceMetricsError(id);
    return this.repo.deleteServiceMetrics(schoolId, id);
  }
}
