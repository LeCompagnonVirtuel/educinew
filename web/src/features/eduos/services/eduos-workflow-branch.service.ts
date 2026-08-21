import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowBranch } from '@educi/types';
import { EduOSWorkflowBranchError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowBranchService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowBranch(schoolId: string, id: string): Promise<WorkflowBranch> {
    const item = await this.repo.getWorkflowBranch(schoolId, id);
    if (!item) throw new EduOSWorkflowBranchError(id);
    return item;
  }
  async listWorkflowBranches(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowBranch[]> {
    return this.repo.listWorkflowBranches(schoolId, filters);
  }
  async createWorkflowBranch(schoolId: string, data: Partial<WorkflowBranch>): Promise<WorkflowBranch> {
    return this.repo.createWorkflowBranch(schoolId, data as any);
  }
  async updateWorkflowBranch(schoolId: string, id: string, data: Partial<WorkflowBranch>): Promise<WorkflowBranch> {
    const existing = await this.repo.getWorkflowBranch(schoolId, id);
    if (!existing) throw new EduOSWorkflowBranchError(id);
    return this.repo.updateWorkflowBranch(schoolId, id, data as any);
  }
  async deleteWorkflowBranch(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowBranch(schoolId, id);
    if (!existing) throw new EduOSWorkflowBranchError(id);
    return this.repo.deleteWorkflowBranch(schoolId, id);
  }
}


