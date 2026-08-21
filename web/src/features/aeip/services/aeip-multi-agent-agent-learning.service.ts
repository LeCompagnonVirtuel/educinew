import type { SupabaseClient } from '@supabase/supabase-js';
import type { AgentLearning } from '@educi/types';
import { AEIPMultiAgentLearningError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPMultiAgentLearningService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getLearning(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listLearnings(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createLearning(schoolId: string, data: Partial<AgentLearning>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateLearning(schoolId: string, id: string, data: Partial<AgentLearning>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteLearning(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}