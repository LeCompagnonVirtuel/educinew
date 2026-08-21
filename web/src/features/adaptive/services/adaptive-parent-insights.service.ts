import type { SupabaseClient } from '@supabase/supabase-js';
import type { ParentInsights, ParentInsightsCreate } from '@educi/types';
import { AdaptiveParentInsightsError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveParentInsightsService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getInsights(schoolId: string, id: string): Promise<ParentInsights> {
    const item = await this.repo.getParentInsights(schoolId, id);
    if (!item) throw new AdaptiveParentInsightsError(id);
    return item;
  }
  async listInsights(schoolId: string, filters?: Record<string, unknown>): Promise<ParentInsights[]> {
    return this.repo.listParentInsights(schoolId, filters);
  }
  async createInsights(schoolId: string, data: ParentInsightsCreate): Promise<ParentInsights> {
    return this.repo.createParentInsights(schoolId, data);
  }
  async updateInsights(schoolId: string, id: string, data: Partial<ParentInsightsCreate>): Promise<ParentInsights> {
    const existing = await this.repo.getParentInsights(schoolId, id);
    if (!existing) throw new AdaptiveParentInsightsError(id);
    return this.repo.updateParentInsights(schoolId, id, data);
  }
  async deleteInsights(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getParentInsights(schoolId, id);
    if (!existing) throw new AdaptiveParentInsightsError(id);
    return this.repo.deleteParentInsights(schoolId, id);
  }
}
