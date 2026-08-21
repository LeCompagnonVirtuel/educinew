import type { SupabaseClient } from '@supabase/supabase-js';
import type { AutomationTemplate } from '@educi/types';
import { EduOSAutomationTemplateError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSAutomationTemplateService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getAutomationTemplate(schoolId: string, id: string): Promise<AutomationTemplate> {
    const item = await this.repo.getAutomationTemplate(schoolId, id);
    if (!item) throw new EduOSAutomationTemplateError(id);
    return item;
  }
  async listAutomationTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationTemplate[]> {
    return this.repo.listAutomationTemplates(schoolId, filters);
  }
  async createAutomationTemplate(schoolId: string, data: Partial<AutomationTemplate>): Promise<AutomationTemplate> {
    return this.repo.createAutomationTemplate(schoolId, data as any);
  }
  async updateAutomationTemplate(schoolId: string, id: string, data: Partial<AutomationTemplate>): Promise<AutomationTemplate> {
    const existing = await this.repo.getAutomationTemplate(schoolId, id);
    if (!existing) throw new EduOSAutomationTemplateError(id);
    return this.repo.updateAutomationTemplate(schoolId, id, data as any);
  }
  async deleteAutomationTemplate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAutomationTemplate(schoolId, id);
    if (!existing) throw new EduOSAutomationTemplateError(id);
    return this.repo.deleteAutomationTemplate(schoolId, id);
  }
}

