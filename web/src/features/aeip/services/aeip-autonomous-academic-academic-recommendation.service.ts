import type { SupabaseClient } from '@supabase/supabase-js';
import type { AcademicRecommendation } from '@educi/types';
import { AEIPAutonomousAcademicRecommendationError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousAcademicRecommendationService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getRecommendation(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listRecommendations(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createRecommendation(schoolId: string, data: Partial<AcademicRecommendation>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateRecommendation(schoolId: string, id: string, data: Partial<AcademicRecommendation>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteRecommendation(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}