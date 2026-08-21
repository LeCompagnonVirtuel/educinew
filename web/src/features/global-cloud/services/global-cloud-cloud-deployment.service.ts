import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudDeployment } from '@educi/types';
import { EduCloudCloudDeploymentError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudDeployment {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudDeployment(schoolId: string, id: string): Promise<CloudDeployment> {
    const item = await this.repo.getCloudDeployment(schoolId, id);
    if (!item) throw new EduCloudCloudDeploymentError(id);
    return item;
  }
  async listCloudDeployments(schoolId: string, filters?: Record<string, unknown>): Promise<CloudDeployment[]> {
    return this.repo.listCloudDeployment(schoolId, filters);
  }
  async createCloudDeployment(schoolId: string, data: Partial<CloudDeployment>): Promise<CloudDeployment> {
    return this.repo.createCloudDeployment(schoolId, data as any);
  }
  async updateCloudDeployment(schoolId: string, id: string, data: Partial<CloudDeployment>): Promise<CloudDeployment> {
    const existing = await this.repo.getCloudDeployment(schoolId, id);
    if (!existing) throw new EduCloudCloudDeploymentError(id);
    return this.repo.updateCloudDeployment(schoolId, id, data as any);
  }
  async deleteCloudDeployment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudDeployment(schoolId, id);
    if (!existing) throw new EduCloudCloudDeploymentError(id);
    return this.repo.deleteCloudDeployment(schoolId, id);
  }
}
