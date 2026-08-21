import type { SupabaseClient } from '@supabase/supabase-js';
import type { LearningCredits } from '@educi/types';
import { EduOSLearningCreditsError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSLearningCreditsService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getLearningCredits(schoolId: string, id: string): Promise<LearningCredits> {
    const item = await this.repo.getLearningCredits(schoolId, id);
    if (!item) throw new EduOSLearningCreditsError(id);
    return item;
  }
  async listLearningCreditss(schoolId: string, filters?: Record<string, unknown>): Promise<LearningCredits[]> {
    return this.repo.listLearningCreditss(schoolId, filters);
  }
  async createLearningCredits(schoolId: string, data: Partial<LearningCredits>): Promise<LearningCredits> {
    return this.repo.createLearningCredits(schoolId, data as any);
  }
  async updateLearningCredits(schoolId: string, id: string, data: Partial<LearningCredits>): Promise<LearningCredits> {
    const existing = await this.repo.getLearningCredits(schoolId, id);
    if (!existing) throw new EduOSLearningCreditsError(id);
    return this.repo.updateLearningCredits(schoolId, id, data as any);
  }
  async deleteLearningCredits(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLearningCredits(schoolId, id);
    if (!existing) throw new EduOSLearningCreditsError(id);
    return this.repo.deleteLearningCredits(schoolId, id);
  }
}

