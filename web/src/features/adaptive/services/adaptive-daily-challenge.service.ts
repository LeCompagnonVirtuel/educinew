import type { SupabaseClient } from '@supabase/supabase-js';
import type { DailyChallenge } from '@educi/types';
import { AdaptiveDailyChallengeError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveDailyChallengeService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getDailyChallenge(schoolId: string, id: string): Promise<DailyChallenge> {
    const item = await this.repo.getDailyChallenge(schoolId, id);
    if (!item) throw new AdaptiveDailyChallengeError(id);
    return item;
  }
  async listDailyChallenges(schoolId: string, filters?: Record<string, unknown>): Promise<DailyChallenge[]> {
    return this.repo.listDailyChallenges(schoolId, filters);
  }
  async createDailyChallenge(schoolId: string, data: Omit<DailyChallenge, 'id' | 'created_at'>): Promise<DailyChallenge> {
    return this.repo.createDailyChallenge(schoolId, data);
  }
  async updateDailyChallenge(schoolId: string, id: string, data: Partial<Omit<DailyChallenge, 'id' | 'created_at'>>): Promise<DailyChallenge> {
    const existing = await this.repo.getDailyChallenge(schoolId, id);
    if (!existing) throw new AdaptiveDailyChallengeError(id);
    return this.repo.updateDailyChallenge(schoolId, id, data);
  }
  async deleteDailyChallenge(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDailyChallenge(schoolId, id);
    if (!existing) throw new AdaptiveDailyChallengeError(id);
    return this.repo.deleteDailyChallenge(schoolId, id);
  }
}
