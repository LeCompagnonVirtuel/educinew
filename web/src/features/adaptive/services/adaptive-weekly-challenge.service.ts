import type { SupabaseClient } from '@supabase/supabase-js';
import type { WeeklyChallenge } from '@educi/types';
import { AdaptiveWeeklyChallengeError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveWeeklyChallengeService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getWeeklyChallenge(schoolId: string, id: string): Promise<WeeklyChallenge> {
    const item = await this.repo.getWeeklyChallenge(schoolId, id);
    if (!item) throw new AdaptiveWeeklyChallengeError(id);
    return item;
  }
  async listWeeklyChallenges(schoolId: string, filters?: Record<string, unknown>): Promise<WeeklyChallenge[]> {
    return this.repo.listWeeklyChallenges(schoolId, filters);
  }
  async createWeeklyChallenge(schoolId: string, data: Omit<WeeklyChallenge, 'id' | 'created_at'>): Promise<WeeklyChallenge> {
    return this.repo.createWeeklyChallenge(schoolId, data);
  }
  async updateWeeklyChallenge(schoolId: string, id: string, data: Partial<Omit<WeeklyChallenge, 'id' | 'created_at'>>): Promise<WeeklyChallenge> {
    const existing = await this.repo.getWeeklyChallenge(schoolId, id);
    if (!existing) throw new AdaptiveWeeklyChallengeError(id);
    return this.repo.updateWeeklyChallenge(schoolId, id, data);
  }
  async deleteWeeklyChallenge(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWeeklyChallenge(schoolId, id);
    if (!existing) throw new AdaptiveWeeklyChallengeError(id);
    return this.repo.deleteWeeklyChallenge(schoolId, id);
  }
}
