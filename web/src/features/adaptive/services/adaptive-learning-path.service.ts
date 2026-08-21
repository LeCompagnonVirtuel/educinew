// Adaptive Learning Service - LearningPath
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { LearningPath } from '@educi/types';
import { AdaptiveLearningPathNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveLearningPathService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getLearningPath(schoolId: string, id: string): Promise<LearningPath> {
    const item = await this.repo.getLearningPath(schoolId, id);
    if (!item) throw new AdaptiveLearningPathNotFoundError(id);
    return item;
  }
  async listLearningPaths(schoolId: string, filters?: Record<string, unknown>): Promise<LearningPath[]> {
    return this.repo.listLearningPaths(schoolId, filters);
  }
  async createLearningPath(schoolId: string, data: Omit<LearningPath, 'id' | 'created_at' | 'updated_at'>): Promise<LearningPath> {
    return this.repo.createLearningPath(schoolId, data);
  }
  async updateLearningPath(schoolId: string, id: string, data: Partial<Omit<LearningPath, 'id' | 'created_at' | 'updated_at'>>): Promise<LearningPath> {
    const existing = await this.repo.getLearningPath(schoolId, id);
    if (!existing) throw new AdaptiveLearningPathNotFoundError(id);
    return this.repo.updateLearningPath(schoolId, id, data);
  }
  async deleteLearningPath(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLearningPath(schoolId, id);
    if (!existing) throw new AdaptiveLearningPathNotFoundError(id);
    return this.repo.deleteLearningPath(schoolId, id);
  }
}
