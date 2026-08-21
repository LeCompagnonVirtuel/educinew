import type { SupabaseClient } from '@supabase/supabase-js';
import type { CopilotSession } from '@educi/types';
import { AEIPCopilotSessionError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPCopilotSessionService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getSession(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listSessions(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createSession(schoolId: string, data: Partial<CopilotSession>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateSession(schoolId: string, id: string, data: Partial<CopilotSession>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteSession(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}