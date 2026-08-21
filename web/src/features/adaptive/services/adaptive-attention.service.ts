import type { SupabaseClient } from '@supabase/supabase-js';
import type { AttentionScore, AttentionScoreCreate } from '@educi/types';
import { AdaptiveAttentionNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveAttentionService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getAttentionScore(schoolId: string, id: string): Promise<AttentionScore> {
    const item = await this.repo.getAttentionScore(schoolId, id);
    if (!item) throw new AdaptiveAttentionNotFoundError(id);
    return item;
  }
  async listAttentionScores(schoolId: string, filters?: Record<string, unknown>): Promise<AttentionScore[]> {
    return this.repo.listAttentionScores(schoolId, filters);
  }
  async createAttentionScore(schoolId: string, data: AttentionScoreCreate): Promise<AttentionScore> {
    return this.repo.createAttentionScore(schoolId, { ...data } as any);
  }
  async updateAttentionScore(schoolId: string, id: string, data: Partial<AttentionScoreCreate>): Promise<AttentionScore> {
    const existing = await this.repo.getAttentionScore(schoolId, id);
    if (!existing) throw new AdaptiveAttentionNotFoundError(id);
    return this.repo.updateAttentionScore(schoolId, id, data);
  }
  async deleteAttentionScore(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAttentionScore(schoolId, id);
    if (!existing) throw new AdaptiveAttentionNotFoundError(id);
    return this.repo.deleteAttentionScore(schoolId, id);
  }
}
