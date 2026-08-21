import type { SupabaseClient } from '@supabase/supabase-js';
import type { BehaviourPrediction, BehaviourPredictionCreate } from '@educi/types';
import { AdaptiveBehaviourNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveBehaviourService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getBehaviourPrediction(schoolId: string, id: string): Promise<BehaviourPrediction> {
    const item = await this.repo.getBehaviourPrediction(schoolId, id);
    if (!item) throw new AdaptiveBehaviourNotFoundError(id);
    return item;
  }
  async listBehaviourPredictions(schoolId: string, filters?: Record<string, unknown>): Promise<BehaviourPrediction[]> {
    return this.repo.listBehaviourPredictions(schoolId, filters);
  }
  async createBehaviourPrediction(schoolId: string, data: BehaviourPredictionCreate): Promise<BehaviourPrediction> {
    return this.repo.createBehaviourPrediction(schoolId, { ...data } as any);
  }
  async updateBehaviourPrediction(schoolId: string, id: string, data: Partial<BehaviourPredictionCreate>): Promise<BehaviourPrediction> {
    const existing = await this.repo.getBehaviourPrediction(schoolId, id);
    if (!existing) throw new AdaptiveBehaviourNotFoundError(id);
    return this.repo.updateBehaviourPrediction(schoolId, id, data);
  }
  async deleteBehaviourPrediction(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBehaviourPrediction(schoolId, id);
    if (!existing) throw new AdaptiveBehaviourNotFoundError(id);
    return this.repo.deleteBehaviourPrediction(schoolId, id);
  }
}
