import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowRun } from '@educi/types';
import { EduCloudWorkflowRunError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudWorkflowRun {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getWorkflowRun(schoolId: string, id: string): Promise<WorkflowRun> {
    const item = await this.repo.getWorkflowRun(schoolId, id);
    if (!item) throw new EduCloudWorkflowRunError(id);
    return item;
  }
  async listWorkflowRuns(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowRun[]> {
    return this.repo.listWorkflowRun(schoolId, filters);
  }
  async createWorkflowRun(schoolId: string, data: Partial<WorkflowRun>): Promise<WorkflowRun> {
    return this.repo.createWorkflowRun(schoolId, data as any);
  }
  async updateWorkflowRun(schoolId: string, id: string, data: Partial<WorkflowRun>): Promise<WorkflowRun> {
    const existing = await this.repo.getWorkflowRun(schoolId, id);
    if (!existing) throw new EduCloudWorkflowRunError(id);
    return this.repo.updateWorkflowRun(schoolId, id, data as any);
  }
  async deleteWorkflowRun(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowRun(schoolId, id);
    if (!existing) throw new EduCloudWorkflowRunError(id);
    return this.repo.deleteWorkflowRun(schoolId, id);
  }
}
