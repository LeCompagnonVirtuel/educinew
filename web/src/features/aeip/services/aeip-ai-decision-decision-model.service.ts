import type { SupabaseClient } from '@supabase/supabase-js';
import type { DecisionModel } from '@educi/types';
import { AEIPDecisionModelError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPDecisionModelService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getModel(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listModels(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createModel(schoolId: string, data: Partial<DecisionModel>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateModel(schoolId: string, id: string, data: Partial<DecisionModel>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteModel(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}