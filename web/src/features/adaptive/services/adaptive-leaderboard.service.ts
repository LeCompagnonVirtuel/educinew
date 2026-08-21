import type { SupabaseClient } from '@supabase/supabase-js';
import type { Leaderboard } from '@educi/types';
import { AdaptiveLeaderboardError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveLeaderboardService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getLeaderboard(schoolId: string, id: string): Promise<Leaderboard> {
    const item = await this.repo.getLeaderboard(schoolId, id);
    if (!item) throw new AdaptiveLeaderboardError(id);
    return item;
  }
  async listLeaderboards(schoolId: string, filters?: Record<string, unknown>): Promise<Leaderboard[]> {
    return this.repo.listLeaderboards(schoolId, filters);
  }
  async createLeaderboard(schoolId: string, data: Omit<Leaderboard, 'id' | 'created_at'>): Promise<Leaderboard> {
    return this.repo.createLeaderboard(schoolId, data);
  }
  async updateLeaderboard(schoolId: string, id: string, data: Partial<Omit<Leaderboard, 'id' | 'created_at'>>): Promise<Leaderboard> {
    const existing = await this.repo.getLeaderboard(schoolId, id);
    if (!existing) throw new AdaptiveLeaderboardError(id);
    return this.repo.updateLeaderboard(schoolId, id, data);
  }
  async deleteLeaderboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLeaderboard(schoolId, id);
    if (!existing) throw new AdaptiveLeaderboardError(id);
    return this.repo.deleteLeaderboard(schoolId, id);
  }
}
