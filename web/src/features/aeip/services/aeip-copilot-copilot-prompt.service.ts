import type { SupabaseClient } from '@supabase/supabase-js';
import type { CopilotPrompt } from '@educi/types';
import { AEIPCopilotPromptError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPCopilotPromptService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getPrompt(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listPrompts(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createPrompt(schoolId: string, data: Partial<CopilotPrompt>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updatePrompt(schoolId: string, id: string, data: Partial<CopilotPrompt>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deletePrompt(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}