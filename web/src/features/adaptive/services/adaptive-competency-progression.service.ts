// Adaptive Learning Service - CompetencyProgression
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CompetencyProgression } from '@educi/types';
import { AdaptiveCompetencyProgressionNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveCompetencyProgressionService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getCompetencyProgression(schoolId: string, id: string): Promise<CompetencyProgression> {
    const item = await this.repo.getCompetencyProgression(schoolId, id);
    if (!item) throw new AdaptiveCompetencyProgressionNotFoundError(id);
    return item;
  }
  async listCompetencyProgressions(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyProgression[]> {
    return this.repo.listCompetencyProgressions(schoolId, filters);
  }
  async createCompetencyProgression(schoolId: string, data: Omit<CompetencyProgression, 'id' | 'created_at'>): Promise<CompetencyProgression> {
    return this.repo.createCompetencyProgression(schoolId, data);
  }
  async updateCompetencyProgression(schoolId: string, id: string, data: Partial<Omit<CompetencyProgression, 'id' | 'created_at'>>): Promise<CompetencyProgression> {
    const existing = await this.repo.getCompetencyProgression(schoolId, id);
    if (!existing) throw new AdaptiveCompetencyProgressionNotFoundError(id);
    return this.repo.updateCompetencyProgression(schoolId, id, data);
  }
  async deleteCompetencyProgression(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCompetencyProgression(schoolId, id);
    if (!existing) throw new AdaptiveCompetencyProgressionNotFoundError(id);
    return this.repo.deleteCompetencyProgression(schoolId, id);
  }
}
