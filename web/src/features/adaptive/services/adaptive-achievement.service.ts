import type { SupabaseClient } from '@supabase/supabase-js';
import type { Achievement } from '@educi/types';
import { AdaptiveAchievementError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveAchievementService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getAchievement(schoolId: string, id: string): Promise<Achievement> {
    const item = await this.repo.getAchievement(schoolId, id);
    if (!item) throw new AdaptiveAchievementError(id);
    return item;
  }
  async listAchievements(schoolId: string, filters?: Record<string, unknown>): Promise<Achievement[]> {
    return this.repo.listAchievements(schoolId, filters);
  }
  async createAchievement(schoolId: string, data: Omit<Achievement, 'id' | 'created_at'>): Promise<Achievement> {
    return this.repo.createAchievement(schoolId, data);
  }
  async updateAchievement(schoolId: string, id: string, data: Partial<Omit<Achievement, 'id' | 'created_at'>>): Promise<Achievement> {
    const existing = await this.repo.getAchievement(schoolId, id);
    if (!existing) throw new AdaptiveAchievementError(id);
    return this.repo.updateAchievement(schoolId, id, data);
  }
  async deleteAchievement(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAchievement(schoolId, id);
    if (!existing) throw new AdaptiveAchievementError(id);
    return this.repo.deleteAchievement(schoolId, id);
  }
}
