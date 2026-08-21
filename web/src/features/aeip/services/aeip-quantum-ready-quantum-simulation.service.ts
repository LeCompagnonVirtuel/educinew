import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuantumSimulation } from '@educi/types';
import { AEIPQuantumReadySimulationError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPQuantumReadySimulationService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getSimulation(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listSimulations(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createSimulation(schoolId: string, data: Partial<QuantumSimulation>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateSimulation(schoolId: string, id: string, data: Partial<QuantumSimulation>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteSimulation(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}