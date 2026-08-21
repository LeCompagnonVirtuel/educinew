import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowInstance } from '@educi/types';
import { EduOSWorkflowInstanceError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowInstanceService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowInstance(schoolId: string, id: string): Promise<WorkflowInstance> {
    const item = await this.repo.getWorkflowInstance(schoolId, id);
    if (!item) throw new EduOSWorkflowInstanceError(id);
    return item;
  }
  async listWorkflowInstances(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowInstance[]> {
    return this.repo.listWorkflowInstances(schoolId, filters);
  }
  async createWorkflowInstance(schoolId: string, data: Partial<WorkflowInstance>): Promise<WorkflowInstance> {
    return this.repo.createWorkflowInstance(schoolId, data as any);
  }
  async updateWorkflowInstance(schoolId: string, id: string, data: Partial<WorkflowInstance>): Promise<WorkflowInstance> {
    const existing = await this.repo.getWorkflowInstance(schoolId, id);
    if (!existing) throw new EduOSWorkflowInstanceError(id);
    return this.repo.updateWorkflowInstance(schoolId, id, data as any);
  }
  async deleteWorkflowInstance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowInstance(schoolId, id);
    if (!existing) throw new EduOSWorkflowInstanceError(id);
    return this.repo.deleteWorkflowInstance(schoolId, id);
  }
}

