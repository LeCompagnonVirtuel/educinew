import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudWorkflow } from '@educi/types';
import { EduCloudCloudWorkflowError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudWorkflow {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudWorkflow(schoolId: string, id: string): Promise<CloudWorkflow> {
    const item = await this.repo.getCloudWorkflow(schoolId, id);
    if (!item) throw new EduCloudCloudWorkflowError(id);
    return item;
  }
  async listCloudWorkflows(schoolId: string, filters?: Record<string, unknown>): Promise<CloudWorkflow[]> {
    return this.repo.listCloudWorkflow(schoolId, filters);
  }
  async createCloudWorkflow(schoolId: string, data: Partial<CloudWorkflow>): Promise<CloudWorkflow> {
    return this.repo.createCloudWorkflow(schoolId, data as any);
  }
  async updateCloudWorkflow(schoolId: string, id: string, data: Partial<CloudWorkflow>): Promise<CloudWorkflow> {
    const existing = await this.repo.getCloudWorkflow(schoolId, id);
    if (!existing) throw new EduCloudCloudWorkflowError(id);
    return this.repo.updateCloudWorkflow(schoolId, id, data as any);
  }
  async deleteCloudWorkflow(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudWorkflow(schoolId, id);
    if (!existing) throw new EduCloudCloudWorkflowError(id);
    return this.repo.deleteCloudWorkflow(schoolId, id);
  }
}
