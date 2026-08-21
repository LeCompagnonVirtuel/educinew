import type { SupabaseClient } from '@supabase/supabase-js';
import type { DynamicQuiz, DynamicQuizCreate } from '@educi/types';
import { AdaptiveQuizNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveQuizService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getDynamicQuiz(schoolId: string, id: string): Promise<DynamicQuiz> {
    const item = await this.repo.getDynamicQuiz(schoolId, id);
    if (!item) throw new AdaptiveQuizNotFoundError(id);
    return item;
  }
  async listDynamicQuizzes(schoolId: string, filters?: Record<string, unknown>): Promise<DynamicQuiz[]> {
    return this.repo.listDynamicQuizzes(schoolId, filters);
  }
  async createDynamicQuiz(schoolId: string, data: DynamicQuizCreate): Promise<DynamicQuiz> {
    return this.repo.createDynamicQuiz(schoolId, { ...data } as any);
  }
  async updateDynamicQuiz(schoolId: string, id: string, data: Partial<DynamicQuizCreate>): Promise<DynamicQuiz> {
    const existing = await this.repo.getDynamicQuiz(schoolId, id);
    if (!existing) throw new AdaptiveQuizNotFoundError(id);
    return this.repo.updateDynamicQuiz(schoolId, id, data);
  }
  async deleteDynamicQuiz(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDynamicQuiz(schoolId, id);
    if (!existing) throw new AdaptiveQuizNotFoundError(id);
    return this.repo.deleteDynamicQuiz(schoolId, id);
  }
}
