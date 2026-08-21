import type { SupabaseClient } from '@supabase/supabase-js';
import type { LearningTimeline, LearningTimelineCreate } from '@educi/types';
import { AdaptiveTimelineNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveTimelineService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getTimeline(schoolId: string, id: string): Promise<LearningTimeline> {
    const item = await this.repo.getLearningTimeline(schoolId, id);
    if (!item) throw new AdaptiveTimelineNotFoundError(id);
    return item;
  }
  async listTimelines(schoolId: string, filters?: Record<string, unknown>): Promise<LearningTimeline[]> {
    return this.repo.listLearningTimelines(schoolId, filters);
  }
  async createTimeline(schoolId: string, data: LearningTimelineCreate): Promise<LearningTimeline> {
    return this.repo.createLearningTimeline(schoolId, data);
  }
  async updateTimeline(schoolId: string, id: string, data: Partial<LearningTimelineCreate>): Promise<LearningTimeline> {
    const existing = await this.repo.getLearningTimeline(schoolId, id);
    if (!existing) throw new AdaptiveTimelineNotFoundError(id);
    return this.repo.updateLearningTimeline(schoolId, id, data);
  }
  async deleteTimeline(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLearningTimeline(schoolId, id);
    if (!existing) throw new AdaptiveTimelineNotFoundError(id);
    return this.repo.deleteLearningTimeline(schoolId, id);
  }
}
