import type { SupabaseClient } from '@supabase/supabase-js';
import type { PipelineMetric } from '@educi/types';
import { EduCloudPipelineMetricError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudPipelineMetric {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getPipelineMetric(schoolId: string, id: string): Promise<PipelineMetric> {
    const item = await this.repo.getPipelineMetric(schoolId, id);
    if (!item) throw new EduCloudPipelineMetricError(id);
    return item;
  }
  async listPipelineMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<PipelineMetric[]> {
    return this.repo.listPipelineMetric(schoolId, filters);
  }
  async createPipelineMetric(schoolId: string, data: Partial<PipelineMetric>): Promise<PipelineMetric> {
    return this.repo.createPipelineMetric(schoolId, data as any);
  }
  async updatePipelineMetric(schoolId: string, id: string, data: Partial<PipelineMetric>): Promise<PipelineMetric> {
    const existing = await this.repo.getPipelineMetric(schoolId, id);
    if (!existing) throw new EduCloudPipelineMetricError(id);
    return this.repo.updatePipelineMetric(schoolId, id, data as any);
  }
  async deletePipelineMetric(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPipelineMetric(schoolId, id);
    if (!existing) throw new EduCloudPipelineMetricError(id);
    return this.repo.deletePipelineMetric(schoolId, id);
  }
}
