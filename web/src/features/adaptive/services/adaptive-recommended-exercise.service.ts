import type { SupabaseClient } from '@supabase/supabase-js';
import type { RecommendedExercise, RecommendedExerciseCreate } from '@educi/types';
import { AdaptiveRecommendedExerciseError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveRecommendedExerciseService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getExercise(schoolId: string, id: string): Promise<RecommendedExercise> {
    const item = await this.repo.getRecommendedExercise(schoolId, id);
    if (!item) throw new AdaptiveRecommendedExerciseError(id);
    return item;
  }
  async listExercises(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedExercise[]> {
    return this.repo.listRecommendedExercises(schoolId, filters);
  }
  async createExercise(schoolId: string, data: RecommendedExerciseCreate): Promise<RecommendedExercise> {
    return this.repo.createRecommendedExercise(schoolId, data);
  }
  async updateExercise(schoolId: string, id: string, data: Partial<RecommendedExerciseCreate>): Promise<RecommendedExercise> {
    const existing = await this.repo.getRecommendedExercise(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedExerciseError(id);
    return this.repo.updateRecommendedExercise(schoolId, id, data);
  }
  async deleteExercise(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRecommendedExercise(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedExerciseError(id);
    return this.repo.deleteRecommendedExercise(schoolId, id);
  }
}
