import type { SupabaseClient } from '@supabase/supabase-js';
import type { TeacherInsights, TeacherInsightsCreate } from '@educi/types';
import { AdaptiveTeacherInsightsError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveTeacherInsightsService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getInsights(schoolId: string, id: string): Promise<TeacherInsights> {
    const item = await this.repo.getTeacherInsights(schoolId, id);
    if (!item) throw new AdaptiveTeacherInsightsError(id);
    return item;
  }
  async listInsights(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherInsights[]> {
    return this.repo.listTeacherInsights(schoolId, filters);
  }
  async createInsights(schoolId: string, data: TeacherInsightsCreate): Promise<TeacherInsights> {
    return this.repo.createTeacherInsights(schoolId, data);
  }
  async updateInsights(schoolId: string, id: string, data: Partial<TeacherInsightsCreate>): Promise<TeacherInsights> {
    const existing = await this.repo.getTeacherInsights(schoolId, id);
    if (!existing) throw new AdaptiveTeacherInsightsError(id);
    return this.repo.updateTeacherInsights(schoolId, id, data);
  }
  async deleteInsights(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTeacherInsights(schoolId, id);
    if (!existing) throw new AdaptiveTeacherInsightsError(id);
    return this.repo.deleteTeacherInsights(schoolId, id);
  }
}
