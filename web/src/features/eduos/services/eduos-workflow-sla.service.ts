import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowSLA } from '@educi/types';
import { EduOSWorkflowSLAError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowSLAService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowSLA(schoolId: string, id: string): Promise<WorkflowSLA> {
    const item = await this.repo.getWorkflowSLA(schoolId, id);
    if (!item) throw new EduOSWorkflowSLAError(id);
    return item;
  }
  async listWorkflowSLAs(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowSLA[]> {
    return this.repo.listWorkflowSlas(schoolId, filters);
  }
  async createWorkflowSLA(schoolId: string, data: Partial<WorkflowSLA>): Promise<WorkflowSLA> {
    return this.repo.createWorkflowSLA(schoolId, data as any);
  }
  async updateWorkflowSLA(schoolId: string, id: string, data: Partial<WorkflowSLA>): Promise<WorkflowSLA> {
    const existing = await this.repo.getWorkflowSLA(schoolId, id);
    if (!existing) throw new EduOSWorkflowSLAError(id);
    return this.repo.updateWorkflowSLA(schoolId, id, data as any);
  }
  async deleteWorkflowSLA(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowSLA(schoolId, id);
    if (!existing) throw new EduOSWorkflowSLAError(id);
    return this.repo.deleteWorkflowSLA(schoolId, id);
  }
}

