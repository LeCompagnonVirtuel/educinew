import type { SupabaseClient } from '@supabase/supabase-js';
import type { Reward } from '@educi/types';
import { AdaptiveRewardError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveRewardService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getReward(schoolId: string, id: string): Promise<Reward> {
    const item = await this.repo.getReward(schoolId, id);
    if (!item) throw new AdaptiveRewardError(id);
    return item;
  }
  async listRewards(schoolId: string, filters?: Record<string, unknown>): Promise<Reward[]> {
    return this.repo.listRewards(schoolId, filters);
  }
  async createReward(schoolId: string, data: Omit<Reward, 'id' | 'created_at'>): Promise<Reward> {
    return this.repo.createReward(schoolId, data);
  }
  async updateReward(schoolId: string, id: string, data: Partial<Omit<Reward, 'id' | 'created_at'>>): Promise<Reward> {
    const existing = await this.repo.getReward(schoolId, id);
    if (!existing) throw new AdaptiveRewardError(id);
    return this.repo.updateReward(schoolId, id, data);
  }
  async deleteReward(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getReward(schoolId, id);
    if (!existing) throw new AdaptiveRewardError(id);
    return this.repo.deleteReward(schoolId, id);
  }
}
