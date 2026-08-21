import type { SupabaseClient } from '@supabase/supabase-js';
import type { RecommendedTutor, RecommendedTutorCreate } from '@educi/types';
import { AdaptiveRecommendedTutorError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveRecommendedTutorService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getTutor(schoolId: string, id: string): Promise<RecommendedTutor> {
    const item = await this.repo.getRecommendedTutor(schoolId, id);
    if (!item) throw new AdaptiveRecommendedTutorError(id);
    return item;
  }
  async listTutors(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedTutor[]> {
    return this.repo.listRecommendedTutors(schoolId, filters);
  }
  async createTutor(schoolId: string, data: RecommendedTutorCreate): Promise<RecommendedTutor> {
    return this.repo.createRecommendedTutor(schoolId, data);
  }
  async updateTutor(schoolId: string, id: string, data: Partial<RecommendedTutorCreate>): Promise<RecommendedTutor> {
    const existing = await this.repo.getRecommendedTutor(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedTutorError(id);
    return this.repo.updateRecommendedTutor(schoolId, id, data);
  }
  async deleteTutor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRecommendedTutor(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedTutorError(id);
    return this.repo.deleteRecommendedTutor(schoolId, id);
  }
}
