import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuantumCircuit } from '@educi/types';
import { AEIPQuantumReadyCircuitError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPQuantumReadyCircuitService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getCircuit(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listCircuits(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createCircuit(schoolId: string, data: Partial<QuantumCircuit>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateCircuit(schoolId: string, id: string, data: Partial<QuantumCircuit>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteCircuit(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}