import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuantumHybrid } from '@educi/types';
import { AEIPQuantumReadyHybridError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPQuantumReadyHybridService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getHybrid(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listHybrids(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createHybrid(schoolId: string, data: Partial<QuantumHybrid>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateHybrid(schoolId: string, id: string, data: Partial<QuantumHybrid>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteHybrid(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}