import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowRollback } from '@educi/types';
import { EduOSWorkflowRollbackError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowRollbackService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowRollback(schoolId: string, id: string): Promise<WorkflowRollback> {
    const item = await this.repo.getWorkflowRollback(schoolId, id);
    if (!item) throw new EduOSWorkflowRollbackError(id);
    return item;
  }
  async listWorkflowRollbacks(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowRollback[]> {
    return this.repo.listWorkflowRollbacks(schoolId, filters);
  }
  async createWorkflowRollback(schoolId: string, data: Partial<WorkflowRollback>): Promise<WorkflowRollback> {
    return this.repo.createWorkflowRollback(schoolId, data as any);
  }
  async updateWorkflowRollback(schoolId: string, id: string, data: Partial<WorkflowRollback>): Promise<WorkflowRollback> {
    const existing = await this.repo.getWorkflowRollback(schoolId, id);
    if (!existing) throw new EduOSWorkflowRollbackError(id);
    return this.repo.updateWorkflowRollback(schoolId, id, data as any);
  }
  async deleteWorkflowRollback(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowRollback(schoolId, id);
    if (!existing) throw new EduOSWorkflowRollbackError(id);
    return this.repo.deleteWorkflowRollback(schoolId, id);
  }
}

