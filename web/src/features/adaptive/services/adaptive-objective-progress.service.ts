// Adaptive Learning Service - LearningObjectiveProgress
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { LearningObjectiveProgress } from '@educi/types';
import { AdaptiveObjectiveProgressError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveObjectiveProgressService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getObjectiveProgress(schoolId: string, id: string): Promise<LearningObjectiveProgress> {
    const item = await this.repo.getObjectiveProgress(schoolId, id);
    if (!item) throw new AdaptiveObjectiveProgressError(id);
    return item;
  }
  async listObjectiveProgresses(schoolId: string, filters?: Record<string, unknown>): Promise<LearningObjectiveProgress[]> {
    return this.repo.listObjectiveProgresses(schoolId, filters);
  }
  async createObjectiveProgress(schoolId: string, data: Omit<LearningObjectiveProgress, 'id' | 'assessed_at'>): Promise<LearningObjectiveProgress> {
    return this.repo.createObjectiveProgress(schoolId, data);
  }
  async updateObjectiveProgress(schoolId: string, id: string, data: Partial<Omit<LearningObjectiveProgress, 'id' | 'assessed_at'>>): Promise<LearningObjectiveProgress> {
    const existing = await this.repo.getObjectiveProgress(schoolId, id);
    if (!existing) throw new AdaptiveObjectiveProgressError(id);
    return this.repo.updateObjectiveProgress(schoolId, id, data);
  }
  async deleteObjectiveProgress(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getObjectiveProgress(schoolId, id);
    if (!existing) throw new AdaptiveObjectiveProgressError(id);
    return this.repo.deleteObjectiveProgress(schoolId, id);
  }
}
