// Adaptive Learning Service - Competency
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Competency } from '@educi/types';
import { AdaptiveCompetencyNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveCompetencyService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getCompetency(schoolId: string, id: string): Promise<Competency> {
    const item = await this.repo.getCompetency(schoolId, id);
    if (!item) throw new AdaptiveCompetencyNotFoundError(id);
    return item;
  }
  async listCompetencies(schoolId: string, filters?: Record<string, unknown>): Promise<Competency[]> {
    return this.repo.listCompetencies(schoolId, filters);
  }
  async createCompetency(schoolId: string, data: Omit<Competency, 'id' | 'created_at' | 'updated_at'>): Promise<Competency> {
    return this.repo.createCompetency(schoolId, data);
  }
  async updateCompetency(schoolId: string, id: string, data: Partial<Omit<Competency, 'id' | 'created_at' | 'updated_at'>>): Promise<Competency> {
    const existing = await this.repo.getCompetency(schoolId, id);
    if (!existing) throw new AdaptiveCompetencyNotFoundError(id);
    return this.repo.updateCompetency(schoolId, id, data);
  }
  async deleteCompetency(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCompetency(schoolId, id);
    if (!existing) throw new AdaptiveCompetencyNotFoundError(id);
    return this.repo.deleteCompetency(schoolId, id);
  }
}
