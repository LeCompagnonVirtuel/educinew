import type { SupabaseClient } from '@supabase/supabase-js';
import type { AcademicGoal } from '@educi/types';
import { AEIPAutonomousAcademicGoalError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousAcademicGoalService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getGoal(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listGoals(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createGoal(schoolId: string, data: Partial<AcademicGoal>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateGoal(schoolId: string, id: string, data: Partial<AcademicGoal>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteGoal(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}