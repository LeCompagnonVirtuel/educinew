// Adaptive Learning Service - LearningProfile
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { LearningProfile } from '@educi/types';
import { AdaptiveLearningProfileNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveLearningProfileService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getLearningProfile(schoolId: string, id: string): Promise<LearningProfile> {
    const item = await this.repo.getLearningProfile(schoolId, id);
    if (!item) throw new AdaptiveLearningProfileNotFoundError(id);
    return item;
  }
  async listLearningProfiles(schoolId: string, filters?: Record<string, unknown>): Promise<LearningProfile[]> {
    return this.repo.listLearningProfiles(schoolId, filters);
  }
  async createLearningProfile(schoolId: string, data: Omit<LearningProfile, 'id' | 'created_at' | 'updated_at'>): Promise<LearningProfile> {
    return this.repo.createLearningProfile(schoolId, data);
  }
  async updateLearningProfile(schoolId: string, id: string, data: Partial<Omit<LearningProfile, 'id' | 'created_at' | 'updated_at'>>): Promise<LearningProfile> {
    const existing = await this.repo.getLearningProfile(schoolId, id);
    if (!existing) throw new AdaptiveLearningProfileNotFoundError(id);
    return this.repo.updateLearningProfile(schoolId, id, data);
  }
  async deleteLearningProfile(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLearningProfile(schoolId, id);
    if (!existing) throw new AdaptiveLearningProfileNotFoundError(id);
    return this.repo.deleteLearningProfile(schoolId, id);
  }
}
