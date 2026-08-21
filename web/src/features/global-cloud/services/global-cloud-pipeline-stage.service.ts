import type { SupabaseClient } from '@supabase/supabase-js';
import type { PipelineStage } from '@educi/types';
import { EduCloudPipelineStageError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudPipelineStage {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getPipelineStage(schoolId: string, id: string): Promise<PipelineStage> {
    const item = await this.repo.getPipelineStage(schoolId, id);
    if (!item) throw new EduCloudPipelineStageError(id);
    return item;
  }
  async listPipelineStages(schoolId: string, filters?: Record<string, unknown>): Promise<PipelineStage[]> {
    return this.repo.listPipelineStage(schoolId, filters);
  }
  async createPipelineStage(schoolId: string, data: Partial<PipelineStage>): Promise<PipelineStage> {
    return this.repo.createPipelineStage(schoolId, data as any);
  }
  async updatePipelineStage(schoolId: string, id: string, data: Partial<PipelineStage>): Promise<PipelineStage> {
    const existing = await this.repo.getPipelineStage(schoolId, id);
    if (!existing) throw new EduCloudPipelineStageError(id);
    return this.repo.updatePipelineStage(schoolId, id, data as any);
  }
  async deletePipelineStage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPipelineStage(schoolId, id);
    if (!existing) throw new EduCloudPipelineStageError(id);
    return this.repo.deletePipelineStage(schoolId, id);
  }
}
