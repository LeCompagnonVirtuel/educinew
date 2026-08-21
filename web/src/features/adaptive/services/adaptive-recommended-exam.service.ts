import type { SupabaseClient } from '@supabase/supabase-js';
import type { RecommendedExam, RecommendedExamCreate } from '@educi/types';
import { AdaptiveRecommendedExamError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveRecommendedExamService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getExam(schoolId: string, id: string): Promise<RecommendedExam> {
    const item = await this.repo.getRecommendedExam(schoolId, id);
    if (!item) throw new AdaptiveRecommendedExamError(id);
    return item;
  }
  async listExams(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedExam[]> {
    return this.repo.listRecommendedExams(schoolId, filters);
  }
  async createExam(schoolId: string, data: RecommendedExamCreate): Promise<RecommendedExam> {
    return this.repo.createRecommendedExam(schoolId, data);
  }
  async updateExam(schoolId: string, id: string, data: Partial<RecommendedExamCreate>): Promise<RecommendedExam> {
    const existing = await this.repo.getRecommendedExam(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedExamError(id);
    return this.repo.updateRecommendedExam(schoolId, id, data);
  }
  async deleteExam(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRecommendedExam(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedExamError(id);
    return this.repo.deleteRecommendedExam(schoolId, id);
  }
}
