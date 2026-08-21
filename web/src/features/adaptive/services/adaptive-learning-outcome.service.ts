// Adaptive Learning Service - LearningOutcome
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { LearningOutcome } from '@educi/types';
import { AdaptiveLearningOutcomeError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveLearningOutcomeService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getLearningOutcome(schoolId: string, id: string): Promise<LearningOutcome> {
    const item = await this.repo.getLearningOutcome(schoolId, id);
    if (!item) throw new AdaptiveLearningOutcomeError(id);
    return item;
  }
  async listLearningOutcomes(schoolId: string, filters?: Record<string, unknown>): Promise<LearningOutcome[]> {
    return this.repo.listLearningOutcomes(schoolId, filters);
  }
  async createLearningOutcome(schoolId: string, data: Omit<LearningOutcome, 'id' | 'created_at'>): Promise<LearningOutcome> {
    return this.repo.createLearningOutcome(schoolId, data);
  }
  async updateLearningOutcome(schoolId: string, id: string, data: Partial<Omit<LearningOutcome, 'id' | 'created_at'>>): Promise<LearningOutcome> {
    const existing = await this.repo.getLearningOutcome(schoolId, id);
    if (!existing) throw new AdaptiveLearningOutcomeError(id);
    return this.repo.updateLearningOutcome(schoolId, id, data);
  }
  async deleteLearningOutcome(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLearningOutcome(schoolId, id);
    if (!existing) throw new AdaptiveLearningOutcomeError(id);
    return this.repo.deleteLearningOutcome(schoolId, id);
  }
}
