import type { SupabaseClient } from '@supabase/supabase-js';
import type { EngagementIndex, EngagementIndexCreate } from '@educi/types';
import { AdaptiveEngagementNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveEngagementService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getEngagementIndex(schoolId: string, id: string): Promise<EngagementIndex> {
    const item = await this.repo.getEngagementIndex(schoolId, id);
    if (!item) throw new AdaptiveEngagementNotFoundError(id);
    return item;
  }
  async listEngagementIndices(schoolId: string, filters?: Record<string, unknown>): Promise<EngagementIndex[]> {
    return this.repo.listEngagementIndices(schoolId, filters);
  }
  async createEngagementIndex(schoolId: string, data: EngagementIndexCreate): Promise<EngagementIndex> {
    return this.repo.createEngagementIndex(schoolId, { ...data } as any);
  }
  async updateEngagementIndex(schoolId: string, id: string, data: Partial<EngagementIndexCreate>): Promise<EngagementIndex> {
    const existing = await this.repo.getEngagementIndex(schoolId, id);
    if (!existing) throw new AdaptiveEngagementNotFoundError(id);
    return this.repo.updateEngagementIndex(schoolId, id, data);
  }
  async deleteEngagementIndex(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEngagementIndex(schoolId, id);
    if (!existing) throw new AdaptiveEngagementNotFoundError(id);
    return this.repo.deleteEngagementIndex(schoolId, id);
  }
}
