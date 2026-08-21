import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowTimer } from '@educi/types';
import { EduOSWorkflowTimerError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowTimerService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowTimer(schoolId: string, id: string): Promise<WorkflowTimer> {
    const item = await this.repo.getWorkflowTimer(schoolId, id);
    if (!item) throw new EduOSWorkflowTimerError(id);
    return item;
  }
  async listWorkflowTimers(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowTimer[]> {
    return this.repo.listWorkflowTimers(schoolId, filters);
  }
  async createWorkflowTimer(schoolId: string, data: Partial<WorkflowTimer>): Promise<WorkflowTimer> {
    return this.repo.createWorkflowTimer(schoolId, data as any);
  }
  async updateWorkflowTimer(schoolId: string, id: string, data: Partial<WorkflowTimer>): Promise<WorkflowTimer> {
    const existing = await this.repo.getWorkflowTimer(schoolId, id);
    if (!existing) throw new EduOSWorkflowTimerError(id);
    return this.repo.updateWorkflowTimer(schoolId, id, data as any);
  }
  async deleteWorkflowTimer(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowTimer(schoolId, id);
    if (!existing) throw new EduOSWorkflowTimerError(id);
    return this.repo.deleteWorkflowTimer(schoolId, id);
  }
}

