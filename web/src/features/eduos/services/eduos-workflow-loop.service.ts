import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowLoop } from '@educi/types';
import { EduOSWorkflowLoopError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowLoopService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowLoop(schoolId: string, id: string): Promise<WorkflowLoop> {
    const item = await this.repo.getWorkflowLoop(schoolId, id);
    if (!item) throw new EduOSWorkflowLoopError(id);
    return item;
  }
  async listWorkflowLoops(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowLoop[]> {
    return this.repo.listWorkflowLoops(schoolId, filters);
  }
  async createWorkflowLoop(schoolId: string, data: Partial<WorkflowLoop>): Promise<WorkflowLoop> {
    return this.repo.createWorkflowLoop(schoolId, data as any);
  }
  async updateWorkflowLoop(schoolId: string, id: string, data: Partial<WorkflowLoop>): Promise<WorkflowLoop> {
    const existing = await this.repo.getWorkflowLoop(schoolId, id);
    if (!existing) throw new EduOSWorkflowLoopError(id);
    return this.repo.updateWorkflowLoop(schoolId, id, data as any);
  }
  async deleteWorkflowLoop(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowLoop(schoolId, id);
    if (!existing) throw new EduOSWorkflowLoopError(id);
    return this.repo.deleteWorkflowLoop(schoolId, id);
  }
}

