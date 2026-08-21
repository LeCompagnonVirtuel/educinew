import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowVersioning } from '@educi/types';
import { EduOSWorkflowVersioningError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowVersioningService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowVersioning(schoolId: string, id: string): Promise<WorkflowVersioning> {
    const item = await this.repo.getWorkflowVersioning(schoolId, id);
    if (!item) throw new EduOSWorkflowVersioningError(id);
    return item;
  }
  async listWorkflowVersionings(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowVersioning[]> {
    return this.repo.listWorkflowVersionings(schoolId, filters);
  }
  async createWorkflowVersioning(schoolId: string, data: Partial<WorkflowVersioning>): Promise<WorkflowVersioning> {
    return this.repo.createWorkflowVersioning(schoolId, data as any);
  }
  async updateWorkflowVersioning(schoolId: string, id: string, data: Partial<WorkflowVersioning>): Promise<WorkflowVersioning> {
    const existing = await this.repo.getWorkflowVersioning(schoolId, id);
    if (!existing) throw new EduOSWorkflowVersioningError(id);
    return this.repo.updateWorkflowVersioning(schoolId, id, data as any);
  }
  async deleteWorkflowVersioning(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowVersioning(schoolId, id);
    if (!existing) throw new EduOSWorkflowVersioningError(id);
    return this.repo.deleteWorkflowVersioning(schoolId, id);
  }
}

