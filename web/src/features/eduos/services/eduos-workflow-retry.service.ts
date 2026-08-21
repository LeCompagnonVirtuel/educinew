import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowRetry } from '@educi/types';
import { EduOSWorkflowRetryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowRetryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowRetry(schoolId: string, id: string): Promise<WorkflowRetry> {
    const item = await this.repo.getWorkflowRetry(schoolId, id);
    if (!item) throw new EduOSWorkflowRetryError(id);
    return item;
  }
  async listWorkflowRetries(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowRetry[]> {
    return this.repo.listWorkflowRetries(schoolId, filters);
  }
  async createWorkflowRetry(schoolId: string, data: Partial<WorkflowRetry>): Promise<WorkflowRetry> {
    return this.repo.createWorkflowRetry(schoolId, data as any);
  }
  async updateWorkflowRetry(schoolId: string, id: string, data: Partial<WorkflowRetry>): Promise<WorkflowRetry> {
    const existing = await this.repo.getWorkflowRetry(schoolId, id);
    if (!existing) throw new EduOSWorkflowRetryError(id);
    return this.repo.updateWorkflowRetry(schoolId, id, data as any);
  }
  async deleteWorkflowRetry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowRetry(schoolId, id);
    if (!existing) throw new EduOSWorkflowRetryError(id);
    return this.repo.deleteWorkflowRetry(schoolId, id);
  }
}


