import type { SupabaseClient } from '@supabase/supabase-js';
import type { ReplicationMetrics } from '@educi/types';
import { EduCloudReplicationMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudReplicationMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getReplicationMetrics(schoolId: string, id: string): Promise<ReplicationMetrics> {
    const item = await this.repo.getReplicationMetrics(schoolId, id);
    if (!item) throw new EduCloudReplicationMetricsError(id);
    return item;
  }
  async listReplicationMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<ReplicationMetrics[]> {
    return this.repo.listReplicationMetrics(schoolId, filters);
  }
  async createReplicationMetrics(schoolId: string, data: Partial<ReplicationMetrics>): Promise<ReplicationMetrics> {
    return this.repo.createReplicationMetrics(schoolId, data as any);
  }
  async updateReplicationMetrics(schoolId: string, id: string, data: Partial<ReplicationMetrics>): Promise<ReplicationMetrics> {
    const existing = await this.repo.getReplicationMetrics(schoolId, id);
    if (!existing) throw new EduCloudReplicationMetricsError(id);
    return this.repo.updateReplicationMetrics(schoolId, id, data as any);
  }
  async deleteReplicationMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getReplicationMetrics(schoolId, id);
    if (!existing) throw new EduCloudReplicationMetricsError(id);
    return this.repo.deleteReplicationMetrics(schoolId, id);
  }
}
