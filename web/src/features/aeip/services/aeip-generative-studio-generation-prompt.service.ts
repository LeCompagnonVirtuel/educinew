import type { SupabaseClient } from '@supabase/supabase-js';
import type { GenerationPrompt } from '@educi/types';
import { AEIPGenerativeStudioPromptError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPGenerativeStudioPromptService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getPrompt(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listPrompts(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createPrompt(schoolId: string, data: Partial<GenerationPrompt>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updatePrompt(schoolId: string, id: string, data: Partial<GenerationPrompt>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deletePrompt(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}