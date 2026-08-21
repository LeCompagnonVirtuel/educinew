import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuantumError } from '@educi/types';
import { AEIPQuantumReadyErrorCorrectionError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPQuantumReadyErrorService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getError(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listErrors(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createError(schoolId: string, data: Partial<QuantumError>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateError(schoolId: string, id: string, data: Partial<QuantumError>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteError(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}