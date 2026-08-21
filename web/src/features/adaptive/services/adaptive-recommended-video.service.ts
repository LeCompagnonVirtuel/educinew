import type { SupabaseClient } from '@supabase/supabase-js';
import type { RecommendedVideo, RecommendedVideoCreate } from '@educi/types';
import { AdaptiveRecommendedVideoError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveRecommendedVideoService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getVideo(schoolId: string, id: string): Promise<RecommendedVideo> {
    const item = await this.repo.getRecommendedVideo(schoolId, id);
    if (!item) throw new AdaptiveRecommendedVideoError(id);
    return item;
  }
  async listVideos(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedVideo[]> {
    return this.repo.listRecommendedVideos(schoolId, filters);
  }
  async createVideo(schoolId: string, data: RecommendedVideoCreate): Promise<RecommendedVideo> {
    return this.repo.createRecommendedVideo(schoolId, data);
  }
  async updateVideo(schoolId: string, id: string, data: Partial<RecommendedVideoCreate>): Promise<RecommendedVideo> {
    const existing = await this.repo.getRecommendedVideo(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedVideoError(id);
    return this.repo.updateRecommendedVideo(schoolId, id, data);
  }
  async deleteVideo(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRecommendedVideo(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedVideoError(id);
    return this.repo.deleteRecommendedVideo(schoolId, id);
  }
}
