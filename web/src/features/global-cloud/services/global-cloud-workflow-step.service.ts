import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowStep } from '@educi/types';
import { EduCloudWorkflowStepError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudWorkflowStep {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getWorkflowStep(schoolId: string, id: string): Promise<WorkflowStep> {
    const item = await this.repo.getWorkflowStep(schoolId, id);
    if (!item) throw new EduCloudWorkflowStepError(id);
    return item;
  }
  async listWorkflowSteps(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowStep[]> {
    return this.repo.listWorkflowStep(schoolId, filters);
  }
  async createWorkflowStep(schoolId: string, data: Partial<WorkflowStep>): Promise<WorkflowStep> {
    return this.repo.createWorkflowStep(schoolId, data as any);
  }
  async updateWorkflowStep(schoolId: string, id: string, data: Partial<WorkflowStep>): Promise<WorkflowStep> {
    const existing = await this.repo.getWorkflowStep(schoolId, id);
    if (!existing) throw new EduCloudWorkflowStepError(id);
    return this.repo.updateWorkflowStep(schoolId, id, data as any);
  }
  async deleteWorkflowStep(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowStep(schoolId, id);
    if (!existing) throw new EduCloudWorkflowStepError(id);
    return this.repo.deleteWorkflowStep(schoolId, id);
  }
}
