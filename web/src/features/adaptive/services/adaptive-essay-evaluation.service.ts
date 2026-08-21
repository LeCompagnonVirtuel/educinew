import type { SupabaseClient } from '@supabase/supabase-js';
import type { EssayEvaluation } from '@educi/types';
import { AdaptiveEssayEvaluationError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveEssayEvaluationService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getEssayEvaluation(schoolId: string, id: string): Promise<EssayEvaluation> {
    const item = await this.repo.getEssayEvaluation(schoolId, id);
    if (!item) throw new AdaptiveEssayEvaluationError(id);
    return item;
  }
  async listEssayEvaluations(schoolId: string, filters?: Record<string, unknown>): Promise<EssayEvaluation[]> {
    return this.repo.listEssayEvaluations(schoolId, filters);
  }
  async createEssayEvaluation(schoolId: string, data: Omit<EssayEvaluation, 'id' | 'created_at'>): Promise<EssayEvaluation> {
    return this.repo.createEssayEvaluation(schoolId, data);
  }
  async updateEssayEvaluation(schoolId: string, id: string, data: Partial<Omit<EssayEvaluation, 'id' | 'created_at'>>): Promise<EssayEvaluation> {
    const existing = await this.repo.getEssayEvaluation(schoolId, id);
    if (!existing) throw new AdaptiveEssayEvaluationError(id);
    return this.repo.updateEssayEvaluation(schoolId, id, data);
  }
  async deleteEssayEvaluation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEssayEvaluation(schoolId, id);
    if (!existing) throw new AdaptiveEssayEvaluationError(id);
    return this.repo.deleteEssayEvaluation(schoolId, id);
  }
}
