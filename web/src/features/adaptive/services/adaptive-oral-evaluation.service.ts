import type { SupabaseClient } from '@supabase/supabase-js';
import type { OralEvaluation } from '@educi/types';
import { AdaptiveOralEvaluationError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveOralEvaluationService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getOralEvaluation(schoolId: string, id: string): Promise<OralEvaluation> {
    const item = await this.repo.getOralEvaluation(schoolId, id);
    if (!item) throw new AdaptiveOralEvaluationError(id);
    return item;
  }
  async listOralEvaluations(schoolId: string, filters?: Record<string, unknown>): Promise<OralEvaluation[]> {
    return this.repo.listOralEvaluations(schoolId, filters);
  }
  async createOralEvaluation(schoolId: string, data: Omit<OralEvaluation, 'id' | 'created_at'>): Promise<OralEvaluation> {
    return this.repo.createOralEvaluation(schoolId, data);
  }
  async updateOralEvaluation(schoolId: string, id: string, data: Partial<Omit<OralEvaluation, 'id' | 'created_at'>>): Promise<OralEvaluation> {
    const existing = await this.repo.getOralEvaluation(schoolId, id);
    if (!existing) throw new AdaptiveOralEvaluationError(id);
    return this.repo.updateOralEvaluation(schoolId, id, data);
  }
  async deleteOralEvaluation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getOralEvaluation(schoolId, id);
    if (!existing) throw new AdaptiveOralEvaluationError(id);
    return this.repo.deleteOralEvaluation(schoolId, id);
  }
}
