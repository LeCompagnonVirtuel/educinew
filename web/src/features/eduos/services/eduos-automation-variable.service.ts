import type { SupabaseClient } from '@supabase/supabase-js';
import type { AutomationVariable } from '@educi/types';
import { EduOSAutomationVariableError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSAutomationVariableService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getAutomationVariable(schoolId: string, id: string): Promise<AutomationVariable> {
    const item = await this.repo.getAutomationVariable(schoolId, id);
    if (!item) throw new EduOSAutomationVariableError(id);
    return item;
  }
  async listAutomationVariables(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationVariable[]> {
    return this.repo.listAutomationVariables(schoolId, filters);
  }
  async createAutomationVariable(schoolId: string, data: Partial<AutomationVariable>): Promise<AutomationVariable> {
    return this.repo.createAutomationVariable(schoolId, data as any);
  }
  async updateAutomationVariable(schoolId: string, id: string, data: Partial<AutomationVariable>): Promise<AutomationVariable> {
    const existing = await this.repo.getAutomationVariable(schoolId, id);
    if (!existing) throw new EduOSAutomationVariableError(id);
    return this.repo.updateAutomationVariable(schoolId, id, data as any);
  }
  async deleteAutomationVariable(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAutomationVariable(schoolId, id);
    if (!existing) throw new EduOSAutomationVariableError(id);
    return this.repo.deleteAutomationVariable(schoolId, id);
  }
}

