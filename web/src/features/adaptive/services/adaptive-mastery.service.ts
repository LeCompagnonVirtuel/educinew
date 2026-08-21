// Adaptive Learning Service - MasteryTracking
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { MasteryTracking } from '@educi/types';
import { AdaptiveMasteryNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveMasteryService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getMasteryTracking(schoolId: string, id: string): Promise<MasteryTracking> {
    const item = await this.repo.getMasteryTracking(schoolId, id);
    if (!item) throw new AdaptiveMasteryNotFoundError(id);
    return item;
  }
  async listMasteryTrackings(schoolId: string, filters?: Record<string, unknown>): Promise<MasteryTracking[]> {
    return this.repo.listMasteryTrackings(schoolId, filters);
  }
  async createMasteryTracking(schoolId: string, data: Omit<MasteryTracking, 'id' | 'created_at' | 'updated_at'>): Promise<MasteryTracking> {
    return this.repo.createMasteryTracking(schoolId, data);
  }
  async updateMasteryTracking(schoolId: string, id: string, data: Partial<Omit<MasteryTracking, 'id' | 'created_at' | 'updated_at'>>): Promise<MasteryTracking> {
    const existing = await this.repo.getMasteryTracking(schoolId, id);
    if (!existing) throw new AdaptiveMasteryNotFoundError(id);
    return this.repo.updateMasteryTracking(schoolId, id, data);
  }
  async deleteMasteryTracking(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMasteryTracking(schoolId, id);
    if (!existing) throw new AdaptiveMasteryNotFoundError(id);
    return this.repo.deleteMasteryTracking(schoolId, id);
  }
}
