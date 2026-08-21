import type { SupabaseClient } from '@supabase/supabase-js';
import type { DeploymentPlan } from '@educi/types';
import { EduCloudDeploymentPlanError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudDeploymentPlan {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getDeploymentPlan(schoolId: string, id: string): Promise<DeploymentPlan> {
    const item = await this.repo.getDeploymentPlan(schoolId, id);
    if (!item) throw new EduCloudDeploymentPlanError(id);
    return item;
  }
  async listDeploymentPlans(schoolId: string, filters?: Record<string, unknown>): Promise<DeploymentPlan[]> {
    return this.repo.listDeploymentPlan(schoolId, filters);
  }
  async createDeploymentPlan(schoolId: string, data: Partial<DeploymentPlan>): Promise<DeploymentPlan> {
    return this.repo.createDeploymentPlan(schoolId, data as any);
  }
  async updateDeploymentPlan(schoolId: string, id: string, data: Partial<DeploymentPlan>): Promise<DeploymentPlan> {
    const existing = await this.repo.getDeploymentPlan(schoolId, id);
    if (!existing) throw new EduCloudDeploymentPlanError(id);
    return this.repo.updateDeploymentPlan(schoolId, id, data as any);
  }
  async deleteDeploymentPlan(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDeploymentPlan(schoolId, id);
    if (!existing) throw new EduCloudDeploymentPlanError(id);
    return this.repo.deleteDeploymentPlan(schoolId, id);
  }
}
