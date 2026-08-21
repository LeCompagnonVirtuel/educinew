import type { SupabaseClient } from '@supabase/supabase-js';
import type { DisasterRecoveryPlan } from '@educi/types';
import { EduCloudDisasterRecoveryPlanError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudDisasterRecoveryPlan {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getDisasterRecoveryPlan(schoolId: string, id: string): Promise<DisasterRecoveryPlan> {
    const item = await this.repo.getDisasterRecoveryPlan(schoolId, id);
    if (!item) throw new EduCloudDisasterRecoveryPlanError(id);
    return item;
  }
  async listDisasterRecoveryPlans(schoolId: string, filters?: Record<string, unknown>): Promise<DisasterRecoveryPlan[]> {
    return this.repo.listDisasterRecoveryPlan(schoolId, filters);
  }
  async createDisasterRecoveryPlan(schoolId: string, data: Partial<DisasterRecoveryPlan>): Promise<DisasterRecoveryPlan> {
    return this.repo.createDisasterRecoveryPlan(schoolId, data as any);
  }
  async updateDisasterRecoveryPlan(schoolId: string, id: string, data: Partial<DisasterRecoveryPlan>): Promise<DisasterRecoveryPlan> {
    const existing = await this.repo.getDisasterRecoveryPlan(schoolId, id);
    if (!existing) throw new EduCloudDisasterRecoveryPlanError(id);
    return this.repo.updateDisasterRecoveryPlan(schoolId, id, data as any);
  }
  async deleteDisasterRecoveryPlan(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDisasterRecoveryPlan(schoolId, id);
    if (!existing) throw new EduCloudDisasterRecoveryPlanError(id);
    return this.repo.deleteDisasterRecoveryPlan(schoolId, id);
  }
}
