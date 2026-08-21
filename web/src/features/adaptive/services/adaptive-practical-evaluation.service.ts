import type { SupabaseClient } from '@supabase/supabase-js';
import type { PracticalEvaluation } from '@educi/types';
import { AdaptivePracticalEvaluationError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptivePracticalEvaluationService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getPracticalEvaluation(schoolId: string, id: string): Promise<PracticalEvaluation> {
    const item = await this.repo.getPracticalEvaluation(schoolId, id);
    if (!item) throw new AdaptivePracticalEvaluationError(id);
    return item;
  }
  async listPracticalEvaluations(schoolId: string, filters?: Record<string, unknown>): Promise<PracticalEvaluation[]> {
    return this.repo.listPracticalEvaluations(schoolId, filters);
  }
  async createPracticalEvaluation(schoolId: string, data: Omit<PracticalEvaluation, 'id' | 'created_at'>): Promise<PracticalEvaluation> {
    return this.repo.createPracticalEvaluation(schoolId, data);
  }
  async updatePracticalEvaluation(schoolId: string, id: string, data: Partial<Omit<PracticalEvaluation, 'id' | 'created_at'>>): Promise<PracticalEvaluation> {
    const existing = await this.repo.getPracticalEvaluation(schoolId, id);
    if (!existing) throw new AdaptivePracticalEvaluationError(id);
    return this.repo.updatePracticalEvaluation(schoolId, id, data);
  }
  async deletePracticalEvaluation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPracticalEvaluation(schoolId, id);
    if (!existing) throw new AdaptivePracticalEvaluationError(id);
    return this.repo.deletePracticalEvaluation(schoolId, id);
  }
}
