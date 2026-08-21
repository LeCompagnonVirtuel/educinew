import type { SupabaseClient } from '@supabase/supabase-js';
import type { AutomationExecution } from '@educi/types';
import { EduOSAutomationExecutionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSAutomationExecutionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getAutomationExecution(schoolId: string, id: string): Promise<AutomationExecution> {
    const item = await this.repo.getAutomationExecution(schoolId, id);
    if (!item) throw new EduOSAutomationExecutionError(id);
    return item;
  }
  async listAutomationExecutions(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationExecution[]> {
    return this.repo.listAutomationExecutions(schoolId, filters);
  }
  async createAutomationExecution(schoolId: string, data: Partial<AutomationExecution>): Promise<AutomationExecution> {
    return this.repo.createAutomationExecution(schoolId, data as any);
  }
  async updateAutomationExecution(schoolId: string, id: string, data: Partial<AutomationExecution>): Promise<AutomationExecution> {
    const existing = await this.repo.getAutomationExecution(schoolId, id);
    if (!existing) throw new EduOSAutomationExecutionError(id);
    return this.repo.updateAutomationExecution(schoolId, id, data as any);
  }
  async deleteAutomationExecution(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAutomationExecution(schoolId, id);
    if (!existing) throw new EduOSAutomationExecutionError(id);
    return this.repo.deleteAutomationExecution(schoolId, id);
  }
}

