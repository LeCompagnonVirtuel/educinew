// Adaptive Learning Service - AdaptiveRecommendation
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AdaptiveRecommendation } from '@educi/types';
import { AdaptiveRecommendationNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveRecommendationService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getAdaptiveRecommendation(schoolId: string, id: string): Promise<AdaptiveRecommendation> {
    const item = await this.repo.getAdaptiveRecommendation(schoolId, id);
    if (!item) throw new AdaptiveRecommendationNotFoundError(id);
    return item;
  }
  async listAdaptiveRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveRecommendation[]> {
    return this.repo.listAdaptiveRecommendations(schoolId, filters);
  }
  async createAdaptiveRecommendation(schoolId: string, data: Omit<AdaptiveRecommendation, 'id' | 'created_at'>): Promise<AdaptiveRecommendation> {
    return this.repo.createAdaptiveRecommendation(schoolId, data);
  }
  async updateAdaptiveRecommendation(schoolId: string, id: string, data: Partial<Omit<AdaptiveRecommendation, 'id' | 'created_at'>>): Promise<AdaptiveRecommendation> {
    const existing = await this.repo.getAdaptiveRecommendation(schoolId, id);
    if (!existing) throw new AdaptiveRecommendationNotFoundError(id);
    return this.repo.updateAdaptiveRecommendation(schoolId, id, data);
  }
  async deleteAdaptiveRecommendation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAdaptiveRecommendation(schoolId, id);
    if (!existing) throw new AdaptiveRecommendationNotFoundError(id);
    return this.repo.deleteAdaptiveRecommendation(schoolId, id);
  }
}
