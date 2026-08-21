import type { SupabaseClient } from '@supabase/supabase-js';
import type { CopilotHistory } from '@educi/types';
import { AEIPCopilotHistoryError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPCopilotHistoryService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getHistory(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listHistory(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createHistory(schoolId: string, data: Partial<CopilotHistory>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateHistory(schoolId: string, id: string, data: Partial<CopilotHistory>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteHistory(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}