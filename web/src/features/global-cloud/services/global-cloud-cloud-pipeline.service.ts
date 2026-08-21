import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudPipeline } from '@educi/types';
import { EduCloudCloudPipelineError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudPipeline {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudPipeline(schoolId: string, id: string): Promise<CloudPipeline> {
    const item = await this.repo.getCloudPipeline(schoolId, id);
    if (!item) throw new EduCloudCloudPipelineError(id);
    return item;
  }
  async listCloudPipelines(schoolId: string, filters?: Record<string, unknown>): Promise<CloudPipeline[]> {
    return this.repo.listCloudPipeline(schoolId, filters);
  }
  async createCloudPipeline(schoolId: string, data: Partial<CloudPipeline>): Promise<CloudPipeline> {
    return this.repo.createCloudPipeline(schoolId, data as any);
  }
  async updateCloudPipeline(schoolId: string, id: string, data: Partial<CloudPipeline>): Promise<CloudPipeline> {
    const existing = await this.repo.getCloudPipeline(schoolId, id);
    if (!existing) throw new EduCloudCloudPipelineError(id);
    return this.repo.updateCloudPipeline(schoolId, id, data as any);
  }
  async deleteCloudPipeline(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudPipeline(schoolId, id);
    if (!existing) throw new EduCloudCloudPipelineError(id);
    return this.repo.deleteCloudPipeline(schoolId, id);
  }
}
