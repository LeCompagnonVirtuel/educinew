import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuantumBenchmark } from '@educi/types';
import { AEIPQuantumReadyBenchmarkError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPQuantumReadyBenchmarkService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getBenchmark(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listBenchmarks(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createBenchmark(schoolId: string, data: Partial<QuantumBenchmark>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateBenchmark(schoolId: string, id: string, data: Partial<QuantumBenchmark>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteBenchmark(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}