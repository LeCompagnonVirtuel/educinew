import type { SupabaseClient } from '@supabase/supabase-js';
import type { Achievement, AchievementCreate } from '@educi/types';
import { LxpAchievementNotFoundError, LxpAchievementAwardError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpAchievementService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getAchievement(schoolId: string, id: string): Promise<Achievement> {
    const achievement = await this.repo.findAchievementById(schoolId, id);
    if (!achievement) throw new LxpAchievementNotFoundError(id);
    return achievement;
  }

  async listAchievements(schoolId: string): Promise<readonly Achievement[]> {
    return this.repo.findAchievements(schoolId);
  }

  async createAchievement(data: AchievementCreate): Promise<Achievement> {
    const created = await this.repo.createAchievement(data);
    if (!created) throw new LxpAchievementNotFoundError();
    return created;
  }

  async awardAchievement(schoolId: string, id: string, userId: string): Promise<boolean> {
    const existing = await this.repo.findAchievementById(schoolId, id);
    if (!existing) throw new LxpAchievementNotFoundError(id);
    const awarded = await this.repo.awardAchievement(id, userId);
    if (!awarded) throw new LxpAchievementAwardError();
    return awarded;
  }

  async getUserAchievements(schoolId: string, userId: string): Promise<readonly Achievement[]> {
    return this.repo.findUserAchievements(schoolId, userId);
  }
}
