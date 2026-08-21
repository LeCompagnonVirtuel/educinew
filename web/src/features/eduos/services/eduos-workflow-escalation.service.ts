import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowEscalation } from '@educi/types';
import { EduOSWorkflowEscalationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowEscalationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowEscalation(schoolId: string, id: string): Promise<WorkflowEscalation> {
    const item = await this.repo.getWorkflowEscalation(schoolId, id);
    if (!item) throw new EduOSWorkflowEscalationError(id);
    return item;
  }
  async listWorkflowEscalations(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowEscalation[]> {
    return this.repo.listWorkflowEscalations(schoolId, filters);
  }
  async createWorkflowEscalation(schoolId: string, data: Partial<WorkflowEscalation>): Promise<WorkflowEscalation> {
    return this.repo.createWorkflowEscalation(schoolId, data as any);
  }
  async updateWorkflowEscalation(schoolId: string, id: string, data: Partial<WorkflowEscalation>): Promise<WorkflowEscalation> {
    const existing = await this.repo.getWorkflowEscalation(schoolId, id);
    if (!existing) throw new EduOSWorkflowEscalationError(id);
    return this.repo.updateWorkflowEscalation(schoolId, id, data as any);
  }
  async deleteWorkflowEscalation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowEscalation(schoolId, id);
    if (!existing) throw new EduOSWorkflowEscalationError(id);
    return this.repo.deleteWorkflowEscalation(schoolId, id);
  }
}

