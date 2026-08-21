import type { SupabaseClient } from '@supabase/supabase-js';
import type { Agent } from '@educi/types';
import { AEIPMultiAgentAgentError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPMultiAgentAgentService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getAgent(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listAgents(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createAgent(schoolId: string, data: Partial<Agent>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateAgent(schoolId: string, id: string, data: Partial<Agent>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteAgent(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}