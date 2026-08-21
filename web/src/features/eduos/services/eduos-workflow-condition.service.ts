import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowCondition } from '@educi/types';
import { EduOSWorkflowConditionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowConditionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowCondition(schoolId: string, id: string): Promise<WorkflowCondition> {
    const item = await this.repo.getWorkflowCondition(schoolId, id);
    if (!item) throw new EduOSWorkflowConditionError(id);
    return item;
  }
  async listWorkflowConditions(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowCondition[]> {
    return this.repo.listWorkflowConditions(schoolId, filters);
  }
  async createWorkflowCondition(schoolId: string, data: Partial<WorkflowCondition>): Promise<WorkflowCondition> {
    return this.repo.createWorkflowCondition(schoolId, data as any);
  }
  async updateWorkflowCondition(schoolId: string, id: string, data: Partial<WorkflowCondition>): Promise<WorkflowCondition> {
    const existing = await this.repo.getWorkflowCondition(schoolId, id);
    if (!existing) throw new EduOSWorkflowConditionError(id);
    return this.repo.updateWorkflowCondition(schoolId, id, data as any);
  }
  async deleteWorkflowCondition(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowCondition(schoolId, id);
    if (!existing) throw new EduOSWorkflowConditionError(id);
    return this.repo.deleteWorkflowCondition(schoolId, id);
  }
}

