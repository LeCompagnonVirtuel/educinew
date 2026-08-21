import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolInsights, SchoolInsightsCreate } from '@educi/types';
import { AdaptiveSchoolInsightsError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveSchoolInsightsService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getInsights(schoolId: string, id: string): Promise<SchoolInsights> {
    const item = await this.repo.getSchoolInsights(schoolId, id);
    if (!item) throw new AdaptiveSchoolInsightsError(id);
    return item;
  }
  async listInsights(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolInsights[]> {
    return this.repo.listSchoolInsights(schoolId, filters);
  }
  async createInsights(schoolId: string, data: SchoolInsightsCreate): Promise<SchoolInsights> {
    return this.repo.createSchoolInsights(schoolId, data);
  }
  async updateInsights(schoolId: string, id: string, data: Partial<SchoolInsightsCreate>): Promise<SchoolInsights> {
    const existing = await this.repo.getSchoolInsights(schoolId, id);
    if (!existing) throw new AdaptiveSchoolInsightsError(id);
    return this.repo.updateSchoolInsights(schoolId, id, data);
  }
  async deleteInsights(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSchoolInsights(schoolId, id);
    if (!existing) throw new AdaptiveSchoolInsightsError(id);
    return this.repo.deleteSchoolInsights(schoolId, id);
  }
}
