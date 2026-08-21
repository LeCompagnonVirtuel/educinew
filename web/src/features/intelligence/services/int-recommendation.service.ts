// Intelligence Platform Service - Recommendation
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Recommendation, RecommendationCreate } from '@educi/types';
import { IntRecommendationNotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntRecommendationService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getRecommendation(schoolId: string, id: string): Promise<Recommendation> {
    const item = await this.repo.getRecommendation(id, schoolId);
    if (!item) throw new IntRecommendationNotFoundError(id);
    return item;
  }
  async listRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<Recommendation[]> {
    return this.repo.listRecommendations(schoolId, filters);
  }
  async createRecommendation(schoolId: string, data: RecommendationCreate): Promise<Recommendation> {
    return this.repo.createRecommendation({ ...data, school_id: schoolId });
  }
  async updateRecommendation(schoolId: string, id: string, data: Partial<RecommendationCreate>): Promise<Recommendation> {
    const existing = await this.repo.getRecommendation(id, schoolId);
    if (!existing) throw new IntRecommendationNotFoundError(id);
    return this.repo.updateRecommendation(id, schoolId, data);
  }
  async deleteRecommendation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRecommendation(id, schoolId);
    if (!existing) throw new IntRecommendationNotFoundError(id);
    return this.repo.deleteRecommendation(id, schoolId);
  }
}
