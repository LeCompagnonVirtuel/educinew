// Adaptive Learning Service - SkillAssessment
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SkillAssessment } from '@educi/types';
import { AdaptiveSkillAssessmentNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveSkillAssessmentService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getSkillAssessment(schoolId: string, id: string): Promise<SkillAssessment> {
    const item = await this.repo.getSkillAssessment(schoolId, id);
    if (!item) throw new AdaptiveSkillAssessmentNotFoundError(id);
    return item;
  }
  async listSkillAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<SkillAssessment[]> {
    return this.repo.listSkillAssessments(schoolId, filters);
  }
  async createSkillAssessment(schoolId: string, data: Omit<SkillAssessment, 'id' | 'assessed_at'>): Promise<SkillAssessment> {
    return this.repo.createSkillAssessment(schoolId, data);
  }
  async updateSkillAssessment(schoolId: string, id: string, data: Partial<Omit<SkillAssessment, 'id' | 'assessed_at'>>): Promise<SkillAssessment> {
    const existing = await this.repo.getSkillAssessment(schoolId, id);
    if (!existing) throw new AdaptiveSkillAssessmentNotFoundError(id);
    return this.repo.updateSkillAssessment(schoolId, id, data);
  }
  async deleteSkillAssessment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSkillAssessment(schoolId, id);
    if (!existing) throw new AdaptiveSkillAssessmentNotFoundError(id);
    return this.repo.deleteSkillAssessment(schoolId, id);
  }
}
