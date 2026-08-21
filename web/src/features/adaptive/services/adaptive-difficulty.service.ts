// Adaptive Learning Service - DifficultyAdjustmentRecord
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DifficultyAdjustmentRecord } from '@educi/types';
import { AdaptiveDifficultyNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveDifficultyService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getDifficultyAdjustment(schoolId: string, id: string): Promise<DifficultyAdjustmentRecord> {
    const item = await this.repo.getDifficultyAdjustment(schoolId, id);
    if (!item) throw new AdaptiveDifficultyNotFoundError(id);
    return item;
  }
  async listDifficultyAdjustments(schoolId: string, filters?: Record<string, unknown>): Promise<DifficultyAdjustmentRecord[]> {
    return this.repo.listDifficultyAdjustments(schoolId, filters);
  }
  async createDifficultyAdjustment(schoolId: string, data: Omit<DifficultyAdjustmentRecord, 'id' | 'adjusted_at'>): Promise<DifficultyAdjustmentRecord> {
    return this.repo.createDifficultyAdjustment(schoolId, data);
  }
  async updateDifficultyAdjustment(schoolId: string, id: string, data: Partial<Omit<DifficultyAdjustmentRecord, 'id' | 'adjusted_at'>>): Promise<DifficultyAdjustmentRecord> {
    const existing = await this.repo.getDifficultyAdjustment(schoolId, id);
    if (!existing) throw new AdaptiveDifficultyNotFoundError(id);
    return this.repo.updateDifficultyAdjustment(schoolId, id, data);
  }
  async deleteDifficultyAdjustment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDifficultyAdjustment(schoolId, id);
    if (!existing) throw new AdaptiveDifficultyNotFoundError(id);
    return this.repo.deleteDifficultyAdjustment(schoolId, id);
  }
}
