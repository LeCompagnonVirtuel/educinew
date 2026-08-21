import type { SupabaseClient } from '@supabase/supabase-js';
import type { CognitiveModel } from '@educi/types';
import { AEIPDigitalBrainCognitiveError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPDigitalBrainCognitiveService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getCognitiveModel(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listCognitiveModels(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createCognitiveModel(schoolId: string, data: Partial<CognitiveModel>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateCognitiveModel(schoolId: string, id: string, data: Partial<CognitiveModel>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteCognitiveModel(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}