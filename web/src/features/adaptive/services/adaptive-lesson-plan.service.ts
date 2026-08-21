import type { SupabaseClient } from '@supabase/supabase-js';
import type { LessonPlan } from '@educi/types';
import { AdaptiveLessonPlanError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveLessonPlanService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getLessonPlan(schoolId: string, id: string): Promise<LessonPlan> {
    const item = await this.repo.getLessonPlan(schoolId, id);
    if (!item) throw new AdaptiveLessonPlanError(id);
    return item;
  }
  async listLessonPlans(schoolId: string, filters?: Record<string, unknown>): Promise<LessonPlan[]> {
    return this.repo.listLessonPlans(schoolId, filters);
  }
  async createLessonPlan(schoolId: string, data: Omit<LessonPlan, 'id' | 'created_at'>): Promise<LessonPlan> {
    return this.repo.createLessonPlan(schoolId, data);
  }
  async updateLessonPlan(schoolId: string, id: string, data: Partial<Omit<LessonPlan, 'id' | 'created_at'>>): Promise<LessonPlan> {
    const existing = await this.repo.getLessonPlan(schoolId, id);
    if (!existing) throw new AdaptiveLessonPlanError(id);
    return this.repo.updateLessonPlan(schoolId, id, data);
  }
  async deleteLessonPlan(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLessonPlan(schoolId, id);
    if (!existing) throw new AdaptiveLessonPlanError(id);
    return this.repo.deleteLessonPlan(schoolId, id);
  }
}
