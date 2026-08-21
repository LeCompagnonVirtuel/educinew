// Adaptive Learning Service - PersonalizedCurriculum
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PersonalizedCurriculum } from '@educi/types';
import { AdaptiveCurriculumNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveCurriculumService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getPersonalizedCurriculum(schoolId: string, id: string): Promise<PersonalizedCurriculum> {
    const item = await this.repo.getPersonalizedCurriculum(schoolId, id);
    if (!item) throw new AdaptiveCurriculumNotFoundError(id);
    return item;
  }
  async listPersonalizedCurriculums(schoolId: string, filters?: Record<string, unknown>): Promise<PersonalizedCurriculum[]> {
    return this.repo.listPersonalizedCurriculums(schoolId, filters);
  }
  async createPersonalizedCurriculum(schoolId: string, data: Omit<PersonalizedCurriculum, 'id' | 'created_at' | 'updated_at'>): Promise<PersonalizedCurriculum> {
    return this.repo.createPersonalizedCurriculum(schoolId, data);
  }
  async updatePersonalizedCurriculum(schoolId: string, id: string, data: Partial<Omit<PersonalizedCurriculum, 'id' | 'created_at' | 'updated_at'>>): Promise<PersonalizedCurriculum> {
    const existing = await this.repo.getPersonalizedCurriculum(schoolId, id);
    if (!existing) throw new AdaptiveCurriculumNotFoundError(id);
    return this.repo.updatePersonalizedCurriculum(schoolId, id, data);
  }
  async deletePersonalizedCurriculum(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPersonalizedCurriculum(schoolId, id);
    if (!existing) throw new AdaptiveCurriculumNotFoundError(id);
    return this.repo.deletePersonalizedCurriculum(schoolId, id);
  }
}
