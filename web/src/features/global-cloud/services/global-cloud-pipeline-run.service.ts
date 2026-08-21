import type { SupabaseClient } from '@supabase/supabase-js';
import type { PipelineRun } from '@educi/types';
import { EduCloudPipelineRunError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudPipelineRun {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getPipelineRun(schoolId: string, id: string): Promise<PipelineRun> {
    const item = await this.repo.getPipelineRun(schoolId, id);
    if (!item) throw new EduCloudPipelineRunError(id);
    return item;
  }
  async listPipelineRuns(schoolId: string, filters?: Record<string, unknown>): Promise<PipelineRun[]> {
    return this.repo.listPipelineRun(schoolId, filters);
  }
  async createPipelineRun(schoolId: string, data: Partial<PipelineRun>): Promise<PipelineRun> {
    return this.repo.createPipelineRun(schoolId, data as any);
  }
  async updatePipelineRun(schoolId: string, id: string, data: Partial<PipelineRun>): Promise<PipelineRun> {
    const existing = await this.repo.getPipelineRun(schoolId, id);
    if (!existing) throw new EduCloudPipelineRunError(id);
    return this.repo.updatePipelineRun(schoolId, id, data as any);
  }
  async deletePipelineRun(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPipelineRun(schoolId, id);
    if (!existing) throw new EduCloudPipelineRunError(id);
    return this.repo.deletePipelineRun(schoolId, id);
  }
}
