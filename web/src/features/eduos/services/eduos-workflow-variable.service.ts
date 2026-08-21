import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowVariable } from '@educi/types';
import { EduOSWorkflowVariableError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowVariableService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowVariable(schoolId: string, id: string): Promise<WorkflowVariable> {
    const item = await this.repo.getWorkflowVariable(schoolId, id);
    if (!item) throw new EduOSWorkflowVariableError(id);
    return item;
  }
  async listWorkflowVariables(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowVariable[]> {
    return this.repo.listWorkflowVariables(schoolId, filters);
  }
  async createWorkflowVariable(schoolId: string, data: Partial<WorkflowVariable>): Promise<WorkflowVariable> {
    return this.repo.createWorkflowVariable(schoolId, data as any);
  }
  async updateWorkflowVariable(schoolId: string, id: string, data: Partial<WorkflowVariable>): Promise<WorkflowVariable> {
    const existing = await this.repo.getWorkflowVariable(schoolId, id);
    if (!existing) throw new EduOSWorkflowVariableError(id);
    return this.repo.updateWorkflowVariable(schoolId, id, data as any);
  }
  async deleteWorkflowVariable(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowVariable(schoolId, id);
    if (!existing) throw new EduOSWorkflowVariableError(id);
    return this.repo.deleteWorkflowVariable(schoolId, id);
  }
}

