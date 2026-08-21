import type { SupabaseClient } from '@supabase/supabase-js';
import type { Challenge, ChallengeCreate } from '@educi/types';
import { LxpChallengeNotFoundError, LxpChallengeCreateError, LxpChallengeCompleteError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpChallengeService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getChallenge(schoolId: string, id: string): Promise<Challenge> {
    const challenge = await this.repo.findChallengeById(schoolId, id);
    if (!challenge) throw new LxpChallengeNotFoundError(id);
    return challenge;
  }

  async listChallenges(schoolId: string): Promise<readonly Challenge[]> {
    return this.repo.findChallenges(schoolId);
  }

  async createChallenge(data: ChallengeCreate): Promise<Challenge> {
    const created = await this.repo.createChallenge(data);
    if (!created) throw new LxpChallengeCreateError();
    return created;
  }

  async completeChallenge(schoolId: string, id: string, userId: string): Promise<boolean> {
    const existing = await this.repo.findChallengeById(schoolId, id);
    if (!existing) throw new LxpChallengeNotFoundError(id);
    const completed = await this.repo.completeChallenge(id, userId);
    if (!completed) throw new LxpChallengeCompleteError();
    return completed;
  }

  async deleteChallenge(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findChallengeById(schoolId, id);
    if (!existing) throw new LxpChallengeNotFoundError(id);
    await this.repo.deleteChallenge(id);
  }
}
