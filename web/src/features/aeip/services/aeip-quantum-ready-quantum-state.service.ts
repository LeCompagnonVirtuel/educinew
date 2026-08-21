import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuantumState } from '@educi/types';
import { AEIPQuantumReadyStateError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPQuantumReadyStateService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getState(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listStates(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createState(schoolId: string, data: Partial<QuantumState>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateState(schoolId: string, id: string, data: Partial<QuantumState>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteState(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}