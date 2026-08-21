import type { SupabaseClient } from '@supabase/supabase-js';
import type { AgentCollaboration } from '@educi/types';
import { AEIPMultiAgentCollaborationError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPMultiAgentCollaborationService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getCollaboration(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listCollaborations(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createCollaboration(schoolId: string, data: Partial<AgentCollaboration>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateCollaboration(schoolId: string, id: string, data: Partial<AgentCollaboration>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteCollaboration(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}