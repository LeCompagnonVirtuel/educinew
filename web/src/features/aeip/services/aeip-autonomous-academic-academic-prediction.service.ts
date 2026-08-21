import type { SupabaseClient } from '@supabase/supabase-js';
import type { AcademicPrediction } from '@educi/types';
import { AEIPAutonomousAcademicPredictionError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousAcademicPredictionService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getPrediction(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listPredictions(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createPrediction(schoolId: string, data: Partial<AcademicPrediction>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updatePrediction(schoolId: string, id: string, data: Partial<AcademicPrediction>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deletePrediction(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}