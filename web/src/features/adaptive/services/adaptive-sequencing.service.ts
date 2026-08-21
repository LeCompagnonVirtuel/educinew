// Adaptive Learning Service - AdaptiveSequencing
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AdaptiveSequencing } from '@educi/types';
import { AdaptiveSequencingNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveSequencingService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getAdaptiveSequencing(schoolId: string, id: string): Promise<AdaptiveSequencing> {
    const item = await this.repo.getAdaptiveSequencing(schoolId, id);
    if (!item) throw new AdaptiveSequencingNotFoundError(id);
    return item;
  }
  async listAdaptiveSequencings(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveSequencing[]> {
    return this.repo.listAdaptiveSequencings(schoolId, filters);
  }
  async createAdaptiveSequencing(schoolId: string, data: Omit<AdaptiveSequencing, 'id' | 'created_at' | 'updated_at'>): Promise<AdaptiveSequencing> {
    return this.repo.createAdaptiveSequencing(schoolId, data);
  }
  async updateAdaptiveSequencing(schoolId: string, id: string, data: Partial<Omit<AdaptiveSequencing, 'id' | 'created_at' | 'updated_at'>>): Promise<AdaptiveSequencing> {
    const existing = await this.repo.getAdaptiveSequencing(schoolId, id);
    if (!existing) throw new AdaptiveSequencingNotFoundError(id);
    return this.repo.updateAdaptiveSequencing(schoolId, id, data);
  }
  async deleteAdaptiveSequencing(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAdaptiveSequencing(schoolId, id);
    if (!existing) throw new AdaptiveSequencingNotFoundError(id);
    return this.repo.deleteAdaptiveSequencing(schoolId, id);
  }
}
