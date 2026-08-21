import type { SupabaseClient } from '@supabase/supabase-js';
import type { CopilotResponse } from '@educi/types';
import { AEIPCopilotResponseError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPCopilotResponseService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getResponse(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listResponses(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createResponse(schoolId: string, data: Partial<CopilotResponse>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateResponse(schoolId: string, id: string, data: Partial<CopilotResponse>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteResponse(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}