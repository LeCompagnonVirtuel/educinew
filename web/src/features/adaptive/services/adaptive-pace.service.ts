// Adaptive Learning Service - LearningPace
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { LearningPace } from '@educi/types';
import { AdaptivePaceNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptivePaceService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getLearningPace(schoolId: string, id: string): Promise<LearningPace> {
    const item = await this.repo.getLearningPace(schoolId, id);
    if (!item) throw new AdaptivePaceNotFoundError(id);
    return item;
  }
  async listLearningPaces(schoolId: string, filters?: Record<string, unknown>): Promise<LearningPace[]> {
    return this.repo.listLearningPaces(schoolId, filters);
  }
  async createLearningPace(schoolId: string, data: Omit<LearningPace, 'id' | 'created_at' | 'updated_at'>): Promise<LearningPace> {
    return this.repo.createLearningPace(schoolId, data);
  }
  async updateLearningPace(schoolId: string, id: string, data: Partial<Omit<LearningPace, 'id' | 'created_at' | 'updated_at'>>): Promise<LearningPace> {
    const existing = await this.repo.getLearningPace(schoolId, id);
    if (!existing) throw new AdaptivePaceNotFoundError(id);
    return this.repo.updateLearningPace(schoolId, id, data);
  }
  async deleteLearningPace(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLearningPace(schoolId, id);
    if (!existing) throw new AdaptivePaceNotFoundError(id);
    return this.repo.deleteLearningPace(schoolId, id);
  }
}
