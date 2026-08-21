import type { SupabaseClient } from '@supabase/supabase-js';
import type { ScheduledWorkflow } from '@educi/types';
import { EduOSScheduledWorkflowError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSScheduledWorkflowService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getScheduledWorkflow(schoolId: string, id: string): Promise<ScheduledWorkflow> {
    const item = await this.repo.getScheduledWorkflow(schoolId, id);
    if (!item) throw new EduOSScheduledWorkflowError(id);
    return item;
  }
  async listScheduledWorkflows(schoolId: string, filters?: Record<string, unknown>): Promise<ScheduledWorkflow[]> {
    return this.repo.listScheduledWorkflows(schoolId, filters);
  }
  async createScheduledWorkflow(schoolId: string, data: Partial<ScheduledWorkflow>): Promise<ScheduledWorkflow> {
    return this.repo.createScheduledWorkflow(schoolId, data as any);
  }
  async updateScheduledWorkflow(schoolId: string, id: string, data: Partial<ScheduledWorkflow>): Promise<ScheduledWorkflow> {
    const existing = await this.repo.getScheduledWorkflow(schoolId, id);
    if (!existing) throw new EduOSScheduledWorkflowError(id);
    return this.repo.updateScheduledWorkflow(schoolId, id, data as any);
  }
  async deleteScheduledWorkflow(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getScheduledWorkflow(schoolId, id);
    if (!existing) throw new EduOSScheduledWorkflowError(id);
    return this.repo.deleteScheduledWorkflow(schoolId, id);
  }
}

