import type { SupabaseClient } from '@supabase/supabase-js';
import type { AgentCommunication } from '@educi/types';
import { AEIPMultiAgentCommunicationError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPMultiAgentCommunicationService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getCommunication(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listCommunications(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createCommunication(schoolId: string, data: Partial<AgentCommunication>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateCommunication(schoolId: string, id: string, data: Partial<AgentCommunication>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteCommunication(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}