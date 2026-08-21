// Adaptive Learning Service - AdaptiveLearningConfig
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AdaptiveLearningConfig } from '@educi/types';
import { AdaptiveConfigNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveLearningConfigService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getLearningConfig(schoolId: string, id: string): Promise<AdaptiveLearningConfig> {
    const item = await this.repo.getLearningConfig(schoolId, id);
    if (!item) throw new AdaptiveConfigNotFoundError(id);
    return item;
  }
  async listLearningConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveLearningConfig[]> {
    return this.repo.listLearningConfigs(schoolId, filters);
  }
  async createLearningConfig(schoolId: string, data: Omit<AdaptiveLearningConfig, 'id'>): Promise<AdaptiveLearningConfig> {
    return this.repo.createLearningConfig(schoolId, data);
  }
  async updateLearningConfig(schoolId: string, id: string, data: Partial<Omit<AdaptiveLearningConfig, 'id'>>): Promise<AdaptiveLearningConfig> {
    const existing = await this.repo.getLearningConfig(schoolId, id);
    if (!existing) throw new AdaptiveConfigNotFoundError(id);
    return this.repo.updateLearningConfig(schoolId, id, data);
  }
  async deleteLearningConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLearningConfig(schoolId, id);
    if (!existing) throw new AdaptiveConfigNotFoundError(id);
    return this.repo.deleteLearningConfig(schoolId, id);
  }
}
