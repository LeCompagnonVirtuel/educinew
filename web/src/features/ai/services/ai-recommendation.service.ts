import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiRecommendation, AiRecommendationQuery, AiRecommendationCreate, AiRecommendationUpdate } from '@educi/types';
import { AiRecommendationNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiRecommendationService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getRecommendation(schoolId: string, id: string): Promise<AiRecommendation> {
    const recommendation = await this.repo.findById(schoolId, id);
    if (!recommendation) throw new AiRecommendationNotFoundError(id);
    return recommendation;
  }

  async listRecommendations(schoolId: string, query: AiRecommendationQuery): Promise<AiRecommendation[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createRecommendation(schoolId: string, data: AiRecommendationCreate): Promise<AiRecommendation> {
    return this.repo.create(schoolId, data);
  }

  async updateRecommendation(schoolId: string, id: string, data: AiRecommendationUpdate): Promise<AiRecommendation> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiRecommendationNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteRecommendation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiRecommendationNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async getRecommendationsByUser(schoolId: string, userId: string): Promise<AiRecommendation[]> {
    return this.repo.findRecommendationsByUserId(schoolId, userId);
  }
}
