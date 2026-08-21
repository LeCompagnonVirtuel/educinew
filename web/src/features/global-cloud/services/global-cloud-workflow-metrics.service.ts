import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowMetrics } from '@educi/types';
import { EduCloudWorkflowMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudWorkflowMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getWorkflowMetrics(schoolId: string, id: string): Promise<WorkflowMetrics> {
    const item = await this.repo.getWorkflowMetrics(schoolId, id);
    if (!item) throw new EduCloudWorkflowMetricsError(id);
    return item;
  }
  async listWorkflowMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowMetrics[]> {
    return this.repo.listWorkflowMetrics(schoolId, filters);
  }
  async createWorkflowMetrics(schoolId: string, data: Partial<WorkflowMetrics>): Promise<WorkflowMetrics> {
    return this.repo.createWorkflowMetrics(schoolId, data as any);
  }
  async updateWorkflowMetrics(schoolId: string, id: string, data: Partial<WorkflowMetrics>): Promise<WorkflowMetrics> {
    const existing = await this.repo.getWorkflowMetrics(schoolId, id);
    if (!existing) throw new EduCloudWorkflowMetricsError(id);
    return this.repo.updateWorkflowMetrics(schoolId, id, data as any);
  }
  async deleteWorkflowMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowMetrics(schoolId, id);
    if (!existing) throw new EduCloudWorkflowMetricsError(id);
    return this.repo.deleteWorkflowMetrics(schoolId, id);
  }
}
