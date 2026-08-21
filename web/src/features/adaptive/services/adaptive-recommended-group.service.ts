import type { SupabaseClient } from '@supabase/supabase-js';
import type { RecommendedGroup, RecommendedGroupCreate } from '@educi/types';
import { AdaptiveRecommendedGroupError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveRecommendedGroupService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getGroup(schoolId: string, id: string): Promise<RecommendedGroup> {
    const item = await this.repo.getRecommendedGroup(schoolId, id);
    if (!item) throw new AdaptiveRecommendedGroupError(id);
    return item;
  }
  async listGroups(schoolId: string, filters?: Record<string, unknown>): Promise<RecommendedGroup[]> {
    return this.repo.listRecommendedGroups(schoolId, filters);
  }
  async createGroup(schoolId: string, data: RecommendedGroupCreate): Promise<RecommendedGroup> {
    return this.repo.createRecommendedGroup(schoolId, data);
  }
  async updateGroup(schoolId: string, id: string, data: Partial<RecommendedGroupCreate>): Promise<RecommendedGroup> {
    const existing = await this.repo.getRecommendedGroup(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedGroupError(id);
    return this.repo.updateRecommendedGroup(schoolId, id, data);
  }
  async deleteGroup(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRecommendedGroup(schoolId, id);
    if (!existing) throw new AdaptiveRecommendedGroupError(id);
    return this.repo.deleteRecommendedGroup(schoolId, id);
  }
}
