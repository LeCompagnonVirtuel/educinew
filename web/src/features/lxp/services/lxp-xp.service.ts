import type { SupabaseClient } from '@supabase/supabase-js';
import type { XP, XPTransaction } from '@educi/types';
import { LxpXPNotFoundError, LxpXPAwardError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpXPService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getXP(userId: string): Promise<XP> {
    const xp = await this.repo.findXPByUserId(userId);
    if (!xp) throw new LxpXPNotFoundError();
    return xp;
  }

  async awardXP(userId: string, amount: number, action: string, description: string): Promise<XP> {
    const awarded = await this.repo.awardXP(userId, amount, action, description);
    if (!awarded) throw new LxpXPAwardError();
    return awarded;
  }

  async getXPTransactions(userId: string): Promise<readonly XPTransaction[]> {
    return this.repo.findXPTransactions(userId);
  }

  async getXPLeaderboard(): Promise<readonly { userId: string; xp: number; level: number }[]> {
    return this.repo.getXPLeaderboard();
  }

  async getUserLevel(userId: string): Promise<{ level: number; currentXP: number; nextLevelXP: number }> {
    const xp = await this.repo.findXPByUserId(userId);
    if (!xp) throw new LxpXPNotFoundError();
    return { level: xp.level, currentXP: xp.currentLevelXP, nextLevelXP: xp.nextLevelXP };
  }
}
