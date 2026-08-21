// Intelligence Platform Service - PredictiveModel
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PredictiveModel, PredictiveModelCreate } from '@educi/types';
import { IntPredictiveModelNotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntPredictiveModelService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getPredictiveModel(schoolId: string, id: string): Promise<PredictiveModel> {
    const item = await this.repo.getPredictiveModel(id, schoolId);
    if (!item) throw new IntPredictiveModelNotFoundError(id);
    return item;
  }
  async listPredictiveModels(schoolId: string, filters?: Record<string, unknown>): Promise<PredictiveModel[]> {
    return this.repo.listPredictiveModels(schoolId, filters);
  }
  async createPredictiveModel(schoolId: string, data: PredictiveModelCreate): Promise<PredictiveModel> {
    return this.repo.createPredictiveModel({ ...data, school_id: schoolId });
  }
  async updatePredictiveModel(schoolId: string, id: string, data: Partial<PredictiveModelCreate>): Promise<PredictiveModel> {
    const existing = await this.repo.getPredictiveModel(id, schoolId);
    if (!existing) throw new IntPredictiveModelNotFoundError(id);
    return this.repo.updatePredictiveModel(id, schoolId, data);
  }
  async deletePredictiveModel(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPredictiveModel(id, schoolId);
    if (!existing) throw new IntPredictiveModelNotFoundError(id);
    return this.repo.deletePredictiveModel(id, schoolId);
  }
}
