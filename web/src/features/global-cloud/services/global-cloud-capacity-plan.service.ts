import type { SupabaseClient } from '@supabase/supabase-js';
import type { CapacityPlan } from '@educi/types';
import { EduCloudCapacityPlanError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCapacityPlan {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCapacityPlan(schoolId: string, id: string): Promise<CapacityPlan> {
    const item = await this.repo.getCapacityPlan(schoolId, id);
    if (!item) throw new EduCloudCapacityPlanError(id);
    return item;
  }
  async listCapacityPlans(schoolId: string, filters?: Record<string, unknown>): Promise<CapacityPlan[]> {
    return this.repo.listCapacityPlan(schoolId, filters);
  }
  async createCapacityPlan(schoolId: string, data: Partial<CapacityPlan>): Promise<CapacityPlan> {
    return this.repo.createCapacityPlan(schoolId, data as any);
  }
  async updateCapacityPlan(schoolId: string, id: string, data: Partial<CapacityPlan>): Promise<CapacityPlan> {
    const existing = await this.repo.getCapacityPlan(schoolId, id);
    if (!existing) throw new EduCloudCapacityPlanError(id);
    return this.repo.updateCapacityPlan(schoolId, id, data as any);
  }
  async deleteCapacityPlan(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCapacityPlan(schoolId, id);
    if (!existing) throw new EduCloudCapacityPlanError(id);
    return this.repo.deleteCapacityPlan(schoolId, id);
  }
}
