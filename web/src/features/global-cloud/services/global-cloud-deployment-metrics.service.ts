import type { SupabaseClient } from '@supabase/supabase-js';
import type { DeploymentMetrics } from '@educi/types';
import { EduCloudDeploymentMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudDeploymentMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getDeploymentMetrics(schoolId: string, id: string): Promise<DeploymentMetrics> {
    const item = await this.repo.getDeploymentMetrics(schoolId, id);
    if (!item) throw new EduCloudDeploymentMetricsError(id);
    return item;
  }
  async listDeploymentMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<DeploymentMetrics[]> {
    return this.repo.listDeploymentMetrics(schoolId, filters);
  }
  async createDeploymentMetrics(schoolId: string, data: Partial<DeploymentMetrics>): Promise<DeploymentMetrics> {
    return this.repo.createDeploymentMetrics(schoolId, data as any);
  }
  async updateDeploymentMetrics(schoolId: string, id: string, data: Partial<DeploymentMetrics>): Promise<DeploymentMetrics> {
    const existing = await this.repo.getDeploymentMetrics(schoolId, id);
    if (!existing) throw new EduCloudDeploymentMetricsError(id);
    return this.repo.updateDeploymentMetrics(schoolId, id, data as any);
  }
  async deleteDeploymentMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDeploymentMetrics(schoolId, id);
    if (!existing) throw new EduCloudDeploymentMetricsError(id);
    return this.repo.deleteDeploymentMetrics(schoolId, id);
  }
}
