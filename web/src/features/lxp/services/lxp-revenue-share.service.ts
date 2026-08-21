import type { SupabaseClient } from '@supabase/supabase-js';
import type { RevenueShare } from '@educi/types';
import { LxpRevenueShareNotFoundError, LxpRevenueShareCreateError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpRevenueShareService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getRevenueShare(schoolId: string, id: string): Promise<RevenueShare> {
    const share = await this.repo.findRevenueShareById(schoolId, id);
    if (!share) throw new LxpRevenueShareNotFoundError(id);
    return share;
  }

  async listRevenueShares(schoolId: string, publisherId: string): Promise<readonly RevenueShare[]> {
    return this.repo.findRevenueShares(schoolId, publisherId);
  }

  async createRevenueShare(data: Omit<RevenueShare, 'id' | 'createdAt' | 'updatedAt'>): Promise<RevenueShare> {
    const created = await this.repo.createRevenueShare(data);
    if (!created) throw new LxpRevenueShareCreateError();
    return created;
  }

  async calculatePayout(schoolId: string, publisherId: string, period: string): Promise<{ totalRevenue: number; shareAmount: number; platformFee: number }> {
    const payout = await this.repo.calculatePayout(schoolId, publisherId, period);
    if (!payout) throw new LxpRevenueShareNotFoundError();
    return payout;
  }

  async deleteRevenueShare(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRevenueShareById(schoolId, id);
    if (!existing) throw new LxpRevenueShareNotFoundError(id);
    await this.repo.deleteRevenueShare(id);
  }
}
