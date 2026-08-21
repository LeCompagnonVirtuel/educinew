// Adaptive Learning Service - LearningObjective
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { LearningObjective } from '@educi/types';
import { AdaptiveLearningObjectiveNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveLearningObjectiveService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getLearningObjective(schoolId: string, id: string): Promise<LearningObjective> {
    const item = await this.repo.getLearningObjective(schoolId, id);
    if (!item) throw new AdaptiveLearningObjectiveNotFoundError(id);
    return item;
  }
  async listLearningObjectives(schoolId: string, filters?: Record<string, unknown>): Promise<LearningObjective[]> {
    return this.repo.listLearningObjectives(schoolId, filters);
  }
  async createLearningObjective(schoolId: string, data: Omit<LearningObjective, 'id' | 'created_at' | 'updated_at'>): Promise<LearningObjective> {
    return this.repo.createLearningObjective(schoolId, data);
  }
  async updateLearningObjective(schoolId: string, id: string, data: Partial<Omit<LearningObjective, 'id' | 'created_at' | 'updated_at'>>): Promise<LearningObjective> {
    const existing = await this.repo.getLearningObjective(schoolId, id);
    if (!existing) throw new AdaptiveLearningObjectiveNotFoundError(id);
    return this.repo.updateLearningObjective(schoolId, id, data);
  }
  async deleteLearningObjective(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLearningObjective(schoolId, id);
    if (!existing) throw new AdaptiveLearningObjectiveNotFoundError(id);
    return this.repo.deleteLearningObjective(schoolId, id);
  }
}
