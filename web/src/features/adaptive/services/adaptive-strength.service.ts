// Adaptive Learning Service - StrengthDetection
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { StrengthDetection } from '@educi/types';
import { AdaptiveStrengthNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveStrengthService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getStrengthDetection(schoolId: string, id: string): Promise<StrengthDetection> {
    const item = await this.repo.getStrengthDetection(schoolId, id);
    if (!item) throw new AdaptiveStrengthNotFoundError(id);
    return item;
  }
  async listStrengthDetections(schoolId: string, filters?: Record<string, unknown>): Promise<StrengthDetection[]> {
    return this.repo.listStrengthDetections(schoolId, filters);
  }
  async createStrengthDetection(schoolId: string, data: Omit<StrengthDetection, 'id' | 'detected_at'>): Promise<StrengthDetection> {
    return this.repo.createStrengthDetection(schoolId, data);
  }
  async updateStrengthDetection(schoolId: string, id: string, data: Partial<Omit<StrengthDetection, 'id' | 'detected_at'>>): Promise<StrengthDetection> {
    const existing = await this.repo.getStrengthDetection(schoolId, id);
    if (!existing) throw new AdaptiveStrengthNotFoundError(id);
    return this.repo.updateStrengthDetection(schoolId, id, data);
  }
  async deleteStrengthDetection(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getStrengthDetection(schoolId, id);
    if (!existing) throw new AdaptiveStrengthNotFoundError(id);
    return this.repo.deleteStrengthDetection(schoolId, id);
  }
}
