import type { SupabaseClient } from '@supabase/supabase-js';
import type { Leaderboard, LeaderboardEntry } from '@educi/types';
import { LxpLeaderboardNotFoundError, LxpLeaderboardUpdateError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpLeaderboardService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getLeaderboard(schoolId: string, id: string): Promise<Leaderboard> {
    const leaderboard = await this.repo.findLeaderboardById(schoolId, id);
    if (!leaderboard) throw new LxpLeaderboardNotFoundError(id);
    return leaderboard;
  }

  async listLeaderboards(schoolId: string): Promise<readonly Leaderboard[]> {
    return this.repo.findLeaderboards(schoolId);
  }

  async updateLeaderboard(schoolId: string, id: string): Promise<Leaderboard> {
    const existing = await this.repo.findLeaderboardById(schoolId, id);
    if (!existing) throw new LxpLeaderboardNotFoundError(id);
    const updated = await this.repo.updateLeaderboard(id);
    if (!updated) throw new LxpLeaderboardUpdateError();
    return updated;
  }

  async getLeaderboardEntries(leaderboardId: string): Promise<readonly LeaderboardEntry[]> {
    return this.repo.findLeaderboardEntries(leaderboardId);
  }

  async getUserRank(leaderboardId: string, userId: string): Promise<LeaderboardEntry | null> {
    return this.repo.findUserLeaderboardRank(leaderboardId, userId);
  }
}
