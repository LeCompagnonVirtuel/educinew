import type { SupabaseClient } from '@supabase/supabase-js';
import type { EnvironmentalGoal, EnvironmentalGoalCreate } from '@educi/types';
import { ScEnvironmentalGoalNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScEnvironmentalGoalService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getGoal(schoolId: string, id: string): Promise<EnvironmentalGoal> {
    const goal = await this.repo.findEnvironmentalGoalById(schoolId, id);
    if (!goal) throw new ScEnvironmentalGoalNotFoundError(id);
    return goal;
  }

  async listGoals(schoolId: string, filters?: Record<string, unknown>): Promise<EnvironmentalGoal[]> {
    return this.repo.findAllEnvironmentalGoals(schoolId, filters);
  }

  async createGoal(schoolId: string, data: EnvironmentalGoalCreate): Promise<EnvironmentalGoal> {
    return this.repo.createEnvironmentalGoal(schoolId, data);
  }

  async updateGoal(schoolId: string, id: string, data: Partial<EnvironmentalGoalCreate>): Promise<EnvironmentalGoal> {
    const existing = await this.repo.findEnvironmentalGoalById(schoolId, id);
    if (!existing) throw new ScEnvironmentalGoalNotFoundError(id);
    return this.repo.updateEnvironmentalGoal(schoolId, id, data);
  }

  async deleteGoal(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEnvironmentalGoalById(schoolId, id);
    if (!existing) throw new ScEnvironmentalGoalNotFoundError(id);
    return this.repo.deleteEnvironmentalGoal(schoolId, id);
  }

  async countGoals(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEnvironmentalGoals(schoolId, filters);
  }
}
