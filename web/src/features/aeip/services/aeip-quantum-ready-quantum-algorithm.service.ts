import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuantumAlgorithm } from '@educi/types';
import { AEIPQuantumReadyAlgorithmError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPQuantumReadyAlgorithmService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getAlgorithm(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listAlgorithms(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createAlgorithm(schoolId: string, data: Partial<QuantumAlgorithm>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateAlgorithm(schoolId: string, id: string, data: Partial<QuantumAlgorithm>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteAlgorithm(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}