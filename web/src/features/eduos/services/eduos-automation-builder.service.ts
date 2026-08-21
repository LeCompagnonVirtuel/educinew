import type { SupabaseClient } from '@supabase/supabase-js';
import type { AutomationBuilder } from '@educi/types';
import { EduOSAutomationBuilderError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSAutomationBuilderService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getAutomationBuilder(schoolId: string, id: string): Promise<AutomationBuilder> {
    const item = await this.repo.getAutomationBuilder(schoolId, id);
    if (!item) throw new EduOSAutomationBuilderError(id);
    return item;
  }
  async listAutomationBuilders(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationBuilder[]> {
    return this.repo.listAutomationBuilders(schoolId, filters);
  }
  async createAutomationBuilder(schoolId: string, data: Partial<AutomationBuilder>): Promise<AutomationBuilder> {
    return this.repo.createAutomationBuilder(schoolId, data as any);
  }
  async updateAutomationBuilder(schoolId: string, id: string, data: Partial<AutomationBuilder>): Promise<AutomationBuilder> {
    const existing = await this.repo.getAutomationBuilder(schoolId, id);
    if (!existing) throw new EduOSAutomationBuilderError(id);
    return this.repo.updateAutomationBuilder(schoolId, id, data as any);
  }
  async deleteAutomationBuilder(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAutomationBuilder(schoolId, id);
    if (!existing) throw new EduOSAutomationBuilderError(id);
    return this.repo.deleteAutomationBuilder(schoolId, id);
  }
}

