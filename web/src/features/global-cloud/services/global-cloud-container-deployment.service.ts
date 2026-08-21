import type { SupabaseClient } from '@supabase/supabase-js';
import type { ContainerDeployment } from '@educi/types';
import { EduCloudContainerDeploymentError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudContainerDeployment {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getContainerDeployment(schoolId: string, id: string): Promise<ContainerDeployment> {
    const item = await this.repo.getContainerDeployment(schoolId, id);
    if (!item) throw new EduCloudContainerDeploymentError(id);
    return item;
  }
  async listContainerDeployments(schoolId: string, filters?: Record<string, unknown>): Promise<ContainerDeployment[]> {
    return this.repo.listContainerDeployment(schoolId, filters);
  }
  async createContainerDeployment(schoolId: string, data: Partial<ContainerDeployment>): Promise<ContainerDeployment> {
    return this.repo.createContainerDeployment(schoolId, data as any);
  }
  async updateContainerDeployment(schoolId: string, id: string, data: Partial<ContainerDeployment>): Promise<ContainerDeployment> {
    const existing = await this.repo.getContainerDeployment(schoolId, id);
    if (!existing) throw new EduCloudContainerDeploymentError(id);
    return this.repo.updateContainerDeployment(schoolId, id, data as any);
  }
  async deleteContainerDeployment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getContainerDeployment(schoolId, id);
    if (!existing) throw new EduCloudContainerDeploymentError(id);
    return this.repo.deleteContainerDeployment(schoolId, id);
  }
}
