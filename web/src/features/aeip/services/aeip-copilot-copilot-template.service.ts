import type { SupabaseClient } from '@supabase/supabase-js';
import type { CopilotTemplate } from '@educi/types';
import { AEIPCopilotTemplateError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPCopilotTemplateService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getTemplate(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listTemplates(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createTemplate(schoolId: string, data: Partial<CopilotTemplate>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateTemplate(schoolId: string, id: string, data: Partial<CopilotTemplate>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteTemplate(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}