import type { SupabaseClient } from '@supabase/supabase-js';
import type { AdaptiveExam } from '@educi/types';
import { AdaptiveAdaptiveExamNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveAdaptiveExamService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getAdaptiveExam(schoolId: string, id: string): Promise<AdaptiveExam> {
    const item = await this.repo.getAdaptiveExam(schoolId, id);
    if (!item) throw new AdaptiveAdaptiveExamNotFoundError(id);
    return item;
  }
  async listAdaptiveExams(schoolId: string, filters?: Record<string, unknown>): Promise<AdaptiveExam[]> {
    return this.repo.listAdaptiveExams(schoolId, filters);
  }
  async createAdaptiveExam(schoolId: string, data: Omit<AdaptiveExam, 'id' | 'created_at'>): Promise<AdaptiveExam> {
    return this.repo.createAdaptiveExam(schoolId, data);
  }
  async updateAdaptiveExam(schoolId: string, id: string, data: Partial<Omit<AdaptiveExam, 'id' | 'created_at'>>): Promise<AdaptiveExam> {
    const existing = await this.repo.getAdaptiveExam(schoolId, id);
    if (!existing) throw new AdaptiveAdaptiveExamNotFoundError(id);
    return this.repo.updateAdaptiveExam(schoolId, id, data);
  }
  async deleteAdaptiveExam(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAdaptiveExam(schoolId, id);
    if (!existing) throw new AdaptiveAdaptiveExamNotFoundError(id);
    return this.repo.deleteAdaptiveExam(schoolId, id);
  }
}
