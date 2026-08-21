import type { SupabaseClient } from '@supabase/supabase-js';
import type { LearningSpeed, LearningSpeedCreate } from '@educi/types';
import { AdaptiveLearningSpeedNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveLearningSpeedService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getLearningSpeed(schoolId: string, id: string): Promise<LearningSpeed> {
    const item = await this.repo.getLearningSpeed(schoolId, id);
    if (!item) throw new AdaptiveLearningSpeedNotFoundError(id);
    return item;
  }
  async listLearningSpeeds(schoolId: string, filters?: Record<string, unknown>): Promise<LearningSpeed[]> {
    return this.repo.listLearningSpeeds(schoolId, filters);
  }
  async createLearningSpeed(schoolId: string, data: LearningSpeedCreate): Promise<LearningSpeed> {
    return this.repo.createLearningSpeed(schoolId, { ...data } as any);
  }
  async updateLearningSpeed(schoolId: string, id: string, data: Partial<LearningSpeedCreate>): Promise<LearningSpeed> {
    const existing = await this.repo.getLearningSpeed(schoolId, id);
    if (!existing) throw new AdaptiveLearningSpeedNotFoundError(id);
    return this.repo.updateLearningSpeed(schoolId, id, data);
  }
  async deleteLearningSpeed(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLearningSpeed(schoolId, id);
    if (!existing) throw new AdaptiveLearningSpeedNotFoundError(id);
    return this.repo.deleteLearningSpeed(schoolId, id);
  }
}
