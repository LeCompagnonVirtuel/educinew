import type { SupabaseClient } from '@supabase/supabase-js';
import type { ParentRecommendation } from '@educi/types';
import { AdaptiveParentRecommendationError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveParentRecommendationService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getParentRecommendation(schoolId: string, id: string): Promise<ParentRecommendation> {
    const item = await this.repo.getParentRecommendation(schoolId, id);
    if (!item) throw new AdaptiveParentRecommendationError(id);
    return item;
  }
  async listParentRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<ParentRecommendation[]> {
    return this.repo.listParentRecommendations(schoolId, filters);
  }
  async createParentRecommendation(schoolId: string, data: Omit<ParentRecommendation, 'id' | 'created_at'>): Promise<ParentRecommendation> {
    return this.repo.createParentRecommendation(schoolId, data);
  }
  async updateParentRecommendation(schoolId: string, id: string, data: Partial<Omit<ParentRecommendation, 'id' | 'created_at'>>): Promise<ParentRecommendation> {
    const existing = await this.repo.getParentRecommendation(schoolId, id);
    if (!existing) throw new AdaptiveParentRecommendationError(id);
    return this.repo.updateParentRecommendation(schoolId, id, data);
  }
  async deleteParentRecommendation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getParentRecommendation(schoolId, id);
    if (!existing) throw new AdaptiveParentRecommendationError(id);
    return this.repo.deleteParentRecommendation(schoolId, id);
  }
}
