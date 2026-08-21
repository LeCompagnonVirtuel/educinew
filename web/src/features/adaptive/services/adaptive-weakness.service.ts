// Adaptive Learning Service - WeaknessDetection
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { WeaknessDetection } from '@educi/types';
import { AdaptiveWeaknessNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveWeaknessService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getWeaknessDetection(schoolId: string, id: string): Promise<WeaknessDetection> {
    const item = await this.repo.getWeaknessDetection(schoolId, id);
    if (!item) throw new AdaptiveWeaknessNotFoundError(id);
    return item;
  }
  async listWeaknessDetections(schoolId: string, filters?: Record<string, unknown>): Promise<WeaknessDetection[]> {
    return this.repo.listWeaknessDetections(schoolId, filters);
  }
  async createWeaknessDetection(schoolId: string, data: Omit<WeaknessDetection, 'id' | 'detected_at'>): Promise<WeaknessDetection> {
    return this.repo.createWeaknessDetection(schoolId, data);
  }
  async updateWeaknessDetection(schoolId: string, id: string, data: Partial<Omit<WeaknessDetection, 'id' | 'detected_at'>>): Promise<WeaknessDetection> {
    const existing = await this.repo.getWeaknessDetection(schoolId, id);
    if (!existing) throw new AdaptiveWeaknessNotFoundError(id);
    return this.repo.updateWeaknessDetection(schoolId, id, data);
  }
  async deleteWeaknessDetection(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWeaknessDetection(schoolId, id);
    if (!existing) throw new AdaptiveWeaknessNotFoundError(id);
    return this.repo.deleteWeaknessDetection(schoolId, id);
  }
}
