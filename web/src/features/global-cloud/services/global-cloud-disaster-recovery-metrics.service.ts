import type { SupabaseClient } from '@supabase/supabase-js';
import type { DisasterRecoveryMetrics } from '@educi/types';
import { EduCloudDisasterRecoveryMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudDisasterRecoveryMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getDisasterRecoveryMetrics(schoolId: string, id: string): Promise<DisasterRecoveryMetrics> {
    const item = await this.repo.getDisasterRecoveryMetrics(schoolId, id);
    if (!item) throw new EduCloudDisasterRecoveryMetricsError(id);
    return item;
  }
  async listDisasterRecoveryMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<DisasterRecoveryMetrics[]> {
    return this.repo.listDisasterRecoveryMetrics(schoolId, filters);
  }
  async createDisasterRecoveryMetrics(schoolId: string, data: Partial<DisasterRecoveryMetrics>): Promise<DisasterRecoveryMetrics> {
    return this.repo.createDisasterRecoveryMetrics(schoolId, data as any);
  }
  async updateDisasterRecoveryMetrics(schoolId: string, id: string, data: Partial<DisasterRecoveryMetrics>): Promise<DisasterRecoveryMetrics> {
    const existing = await this.repo.getDisasterRecoveryMetrics(schoolId, id);
    if (!existing) throw new EduCloudDisasterRecoveryMetricsError(id);
    return this.repo.updateDisasterRecoveryMetrics(schoolId, id, data as any);
  }
  async deleteDisasterRecoveryMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDisasterRecoveryMetrics(schoolId, id);
    if (!existing) throw new EduCloudDisasterRecoveryMetricsError(id);
    return this.repo.deleteDisasterRecoveryMetrics(schoolId, id);
  }
}
