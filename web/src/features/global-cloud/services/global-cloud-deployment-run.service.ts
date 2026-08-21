import type { SupabaseClient } from '@supabase/supabase-js';
import type { DeploymentRun } from '@educi/types';
import { EduCloudDeploymentRunError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudDeploymentRun {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getDeploymentRun(schoolId: string, id: string): Promise<DeploymentRun> {
    const item = await this.repo.getDeploymentRun(schoolId, id);
    if (!item) throw new EduCloudDeploymentRunError(id);
    return item;
  }
  async listDeploymentRuns(schoolId: string, filters?: Record<string, unknown>): Promise<DeploymentRun[]> {
    return this.repo.listDeploymentRun(schoolId, filters);
  }
  async createDeploymentRun(schoolId: string, data: Partial<DeploymentRun>): Promise<DeploymentRun> {
    return this.repo.createDeploymentRun(schoolId, data as any);
  }
  async updateDeploymentRun(schoolId: string, id: string, data: Partial<DeploymentRun>): Promise<DeploymentRun> {
    const existing = await this.repo.getDeploymentRun(schoolId, id);
    if (!existing) throw new EduCloudDeploymentRunError(id);
    return this.repo.updateDeploymentRun(schoolId, id, data as any);
  }
  async deleteDeploymentRun(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDeploymentRun(schoolId, id);
    if (!existing) throw new EduCloudDeploymentRunError(id);
    return this.repo.deleteDeploymentRun(schoolId, id);
  }
}
