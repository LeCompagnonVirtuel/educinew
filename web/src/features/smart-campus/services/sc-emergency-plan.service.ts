import type { SupabaseClient } from '@supabase/supabase-js';
import type { EmergencyPlan, EmergencyPlanCreate, EmergencyPlanUpdate } from '@educi/types';
import { ScEmergencyPlanNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScEmergencyPlanService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getPlan(schoolId: string, id: string): Promise<EmergencyPlan> {
    const plan = await this.repo.findEmergencyPlanById(schoolId, id);
    if (!plan) throw new ScEmergencyPlanNotFoundError(id);
    return plan;
  }

  async listPlans(schoolId: string, filters?: Record<string, unknown>): Promise<EmergencyPlan[]> {
    return this.repo.findAllEmergencyPlans(schoolId, filters);
  }

  async createPlan(schoolId: string, data: EmergencyPlanCreate): Promise<EmergencyPlan> {
    return this.repo.createEmergencyPlan(schoolId, data);
  }

  async updatePlan(schoolId: string, id: string, data: EmergencyPlanUpdate): Promise<EmergencyPlan> {
    const existing = await this.repo.findEmergencyPlanById(schoolId, id);
    if (!existing) throw new ScEmergencyPlanNotFoundError(id);
    return this.repo.updateEmergencyPlan(schoolId, id, data);
  }

  async deletePlan(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEmergencyPlanById(schoolId, id);
    if (!existing) throw new ScEmergencyPlanNotFoundError(id);
    return this.repo.deleteEmergencyPlan(schoolId, id);
  }

  async findByName(schoolId: string, name: string): Promise<EmergencyPlan | null> {
    return this.repo.findEmergencyPlanByName(schoolId, name);
  }

  async findByType(schoolId: string, type: string): Promise<EmergencyPlan[]> {
    return this.repo.findEmergencyPlansByType(schoolId, type);
  }

  async countPlans(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEmergencyPlans(schoolId, filters);
  }
}
