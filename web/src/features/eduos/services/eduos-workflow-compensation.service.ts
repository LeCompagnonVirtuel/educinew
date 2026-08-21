import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowCompensation } from '@educi/types';
import { EduOSWorkflowCompensationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowCompensationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowCompensation(schoolId: string, id: string): Promise<WorkflowCompensation> {
    const item = await this.repo.getWorkflowCompensation(schoolId, id);
    if (!item) throw new EduOSWorkflowCompensationError(id);
    return item;
  }
  async listWorkflowCompensations(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowCompensation[]> {
    return this.repo.listWorkflowCompensations(schoolId, filters);
  }
  async createWorkflowCompensation(schoolId: string, data: Partial<WorkflowCompensation>): Promise<WorkflowCompensation> {
    return this.repo.createWorkflowCompensation(schoolId, data as any);
  }
  async updateWorkflowCompensation(schoolId: string, id: string, data: Partial<WorkflowCompensation>): Promise<WorkflowCompensation> {
    const existing = await this.repo.getWorkflowCompensation(schoolId, id);
    if (!existing) throw new EduOSWorkflowCompensationError(id);
    return this.repo.updateWorkflowCompensation(schoolId, id, data as any);
  }
  async deleteWorkflowCompensation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowCompensation(schoolId, id);
    if (!existing) throw new EduOSWorkflowCompensationError(id);
    return this.repo.deleteWorkflowCompensation(schoolId, id);
  }
}

