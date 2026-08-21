import type { SupabaseClient } from '@supabase/supabase-js';
import type { RecommendedLesson, RecommendedLessonCreate } from '@educi/types';
import { AdaptiveRecommendedLessonError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveRecommendedLessonService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getLesson(schoolId: string, id: string): Promise<RecommendedLesson> {
    const item = await this.repo.getRecommendedLesson(schoolId, id);
    if (!item) throw new AdaptiveRecommendedLessonError(id);
    return item;
  }
  async listLessons(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedLesson[]> {
    return this.repo.listRecommendedLessons(schoolId, filters);
  }
  async createLesson(schoolId: string, data: RecommendedLessonCreate): Promise<RecommendedLesson> {
    return this.repo.createRecommendedLesson(schoolId, data);
  }
  async updateLesson(schoolId: string, id: string, data: Partial<RecommendedLessonCreate>): Promise<RecommendedLesson> {
    const existing = await this.repo.getRecommendedLesson(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedLessonError(id);
    return this.repo.updateRecommendedLesson(schoolId, id, data);
  }
  async deleteLesson(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRecommendedLesson(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedLessonError(id);
    return this.repo.deleteRecommendedLesson(schoolId, id);
  }
}
