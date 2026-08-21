import type { SupabaseClient } from '@supabase/supabase-js';
import type { Reward, RewardCreate } from '@educi/types';
import { LxpRewardNotFoundError, LxpRewardRedeemError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpRewardService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getReward(schoolId: string, id: string): Promise<Reward> {
    const reward = await this.repo.findRewardById(schoolId, id);
    if (!reward) throw new LxpRewardNotFoundError(id);
    return reward;
  }

  async listRewards(schoolId: string): Promise<readonly Reward[]> {
    return this.repo.findRewards(schoolId);
  }

  async createReward(data: RewardCreate): Promise<Reward> {
    const created = await this.repo.createReward(data);
    if (!created) throw new LxpRewardNotFoundError();
    return created;
  }

  async redeemReward(schoolId: string, id: string, userId: string): Promise<boolean> {
    const existing = await this.repo.findRewardById(schoolId, id);
    if (!existing) throw new LxpRewardNotFoundError(id);
    const redeemed = await this.repo.redeemReward(id, userId);
    if (!redeemed) throw new LxpRewardRedeemError();
    return redeemed;
  }

  async deleteReward(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRewardById(schoolId, id);
    if (!existing) throw new LxpRewardNotFoundError(id);
    await this.repo.deleteReward(id);
  }
}
