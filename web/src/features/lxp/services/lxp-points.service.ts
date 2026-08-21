import type { SupabaseClient } from '@supabase/supabase-js';
import type { Points } from '@educi/types';
import { LxpPointsNotFoundError, LxpPointsAwardError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpPointsService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getPoints(schoolId: string, userId: string): Promise<Points> {
    const points = await this.repo.findPointsById(schoolId, userId);
    if (!points) throw new LxpPointsNotFoundError();
    return points;
  }

  async awardPoints(userId: string, schoolId: string, amount: number, description: string): Promise<Points> {
    const awarded = await this.repo.awardPoints(userId, schoolId, amount, description);
    if (!awarded) throw new LxpPointsAwardError();
    return awarded;
  }

  async spendPoints(userId: string, schoolId: string, amount: number, description: string): Promise<Points> {
    const spent = await this.repo.spendPoints(userId, schoolId, amount, description);
    if (!spent) throw new LxpPointsAwardError();
    return spent;
  }

  async getPointsHistory(schoolId: string, userId: string): Promise<readonly Points[]> {
    return this.repo.findPointsHistory(schoolId, userId);
  }

  async getPointsLeaderboard(schoolId: string): Promise<readonly { userId: string; points: number }[]> {
    return this.repo.getPointsLeaderboard(schoolId);
  }
}
