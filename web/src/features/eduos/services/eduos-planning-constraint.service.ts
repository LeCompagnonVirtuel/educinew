import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlanningConstraint } from '@educi/types';
import { EduOSPlanningConstraintError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSPlanningConstraintService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getPlanningConstraint(schoolId: string, id: string): Promise<PlanningConstraint> {
    const item = await this.repo.getPlanningConstraint(schoolId, id);
    if (!item) throw new EduOSPlanningConstraintError(id);
    return item;
  }
  async listPlanningConstraints(schoolId: string, filters?: Record<string, unknown>): Promise<PlanningConstraint[]> {
    return this.repo.listPlanningConstraints(schoolId, filters);
  }
  async createPlanningConstraint(schoolId: string, data: Partial<PlanningConstraint>): Promise<PlanningConstraint> {
    return this.repo.createPlanningConstraint(schoolId, data as any);
  }
  async updatePlanningConstraint(schoolId: string, id: string, data: Partial<PlanningConstraint>): Promise<PlanningConstraint> {
    const existing = await this.repo.getPlanningConstraint(schoolId, id);
    if (!existing) throw new EduOSPlanningConstraintError(id);
    return this.repo.updatePlanningConstraint(schoolId, id, data as any);
  }
  async deletePlanningConstraint(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPlanningConstraint(schoolId, id);
    if (!existing) throw new EduOSPlanningConstraintError(id);
    return this.repo.deletePlanningConstraint(schoolId, id);
  }
}

