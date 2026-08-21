import type { SupabaseClient } from '@supabase/supabase-js';
import type { CopilotContext } from '@educi/types';
import { AEIPCopilotContextError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPCopilotContextService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getContext(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listContexts(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createContext(schoolId: string, data: Partial<CopilotContext>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateContext(schoolId: string, id: string, data: Partial<CopilotContext>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteContext(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}