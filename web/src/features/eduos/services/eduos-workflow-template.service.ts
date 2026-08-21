import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowTemplate } from '@educi/types';
import { EduOSWorkflowTemplateError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowTemplateService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowTemplate(schoolId: string, id: string): Promise<WorkflowTemplate> {
    const item = await this.repo.getWorkflowTemplate(schoolId, id);
    if (!item) throw new EduOSWorkflowTemplateError(id);
    return item;
  }
  async listWorkflowTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowTemplate[]> {
    return this.repo.listWorkflowTemplates(schoolId, filters);
  }
  async createWorkflowTemplate(schoolId: string, data: Partial<WorkflowTemplate>): Promise<WorkflowTemplate> {
    return this.repo.createWorkflowTemplate(schoolId, data as any);
  }
  async updateWorkflowTemplate(schoolId: string, id: string, data: Partial<WorkflowTemplate>): Promise<WorkflowTemplate> {
    const existing = await this.repo.getWorkflowTemplate(schoolId, id);
    if (!existing) throw new EduOSWorkflowTemplateError(id);
    return this.repo.updateWorkflowTemplate(schoolId, id, data as any);
  }
  async deleteWorkflowTemplate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowTemplate(schoolId, id);
    if (!existing) throw new EduOSWorkflowTemplateError(id);
    return this.repo.deleteWorkflowTemplate(schoolId, id);
  }
}

