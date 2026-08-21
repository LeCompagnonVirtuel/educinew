import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlanningGoal } from '@educi/types';
import { EduOSPlanningGoalError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSPlanningGoalService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getPlanningGoal(schoolId: string, id: string): Promise<PlanningGoal> {
    const item = await this.repo.getPlanningGoal(schoolId, id);
    if (!item) throw new EduOSPlanningGoalError(id);
    return item;
  }
  async listPlanningGoals(schoolId: string, filters?: Record<string, unknown>): Promise<PlanningGoal[]> {
    return this.repo.listPlanningGoals(schoolId, filters);
  }
  async createPlanningGoal(schoolId: string, data: Partial<PlanningGoal>): Promise<PlanningGoal> {
    return this.repo.createPlanningGoal(schoolId, data as any);
  }
  async updatePlanningGoal(schoolId: string, id: string, data: Partial<PlanningGoal>): Promise<PlanningGoal> {
    const existing = await this.repo.getPlanningGoal(schoolId, id);
    if (!existing) throw new EduOSPlanningGoalError(id);
    return this.repo.updatePlanningGoal(schoolId, id, data as any);
  }
  async deletePlanningGoal(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPlanningGoal(schoolId, id);
    if (!existing) throw new EduOSPlanningGoalError(id);
    return this.repo.deletePlanningGoal(schoolId, id);
  }
}

