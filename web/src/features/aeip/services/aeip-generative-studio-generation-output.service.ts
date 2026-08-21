import type { SupabaseClient } from '@supabase/supabase-js';
import type { GenerationOutput } from '@educi/types';
import { AEIPGenerativeStudioOutputError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPGenerativeStudioOutputService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getOutput(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listOutputs(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createOutput(schoolId: string, data: Partial<GenerationOutput>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateOutput(schoolId: string, id: string, data: Partial<GenerationOutput>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteOutput(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}