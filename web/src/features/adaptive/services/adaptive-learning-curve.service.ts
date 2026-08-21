import type { SupabaseClient } from '@supabase/supabase-js';
import type { LearningCurve, LearningCurveCreate } from '@educi/types';
import { AdaptiveLearningCurveNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveLearningCurveService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getLearningCurve(schoolId: string, id: string): Promise<LearningCurve> {
    const item = await this.repo.getLearningCurve(schoolId, id);
    if (!item) throw new AdaptiveLearningCurveNotFoundError(id);
    return item;
  }
  async listLearningCurves(schoolId: string, filters?: Record<string, unknown>): Promise<LearningCurve[]> {
    return this.repo.listLearningCurves(schoolId, filters);
  }
  async createLearningCurve(schoolId: string, data: LearningCurveCreate): Promise<LearningCurve> {
    return this.repo.createLearningCurve(schoolId, { ...data } as any);
  }
  async updateLearningCurve(schoolId: string, id: string, data: Partial<LearningCurveCreate>): Promise<LearningCurve> {
    const existing = await this.repo.getLearningCurve(schoolId, id);
    if (!existing) throw new AdaptiveLearningCurveNotFoundError(id);
    return this.repo.updateLearningCurve(schoolId, id, data);
  }
  async deleteLearningCurve(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLearningCurve(schoolId, id);
    if (!existing) throw new AdaptiveLearningCurveNotFoundError(id);
    return this.repo.deleteLearningCurve(schoolId, id);
  }
}
