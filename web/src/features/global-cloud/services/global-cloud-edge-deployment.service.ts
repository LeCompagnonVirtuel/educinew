import type { SupabaseClient } from '@supabase/supabase-js';
import type { EdgeDeployment } from '@educi/types';
import { EduCloudEdgeDeploymentError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudEdgeDeployment {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getEdgeDeployment(schoolId: string, id: string): Promise<EdgeDeployment> {
    const item = await this.repo.getEdgeDeployment(schoolId, id);
    if (!item) throw new EduCloudEdgeDeploymentError(id);
    return item;
  }
  async listEdgeDeployments(schoolId: string, filters?: Record<string, unknown>): Promise<EdgeDeployment[]> {
    return this.repo.listEdgeDeployment(schoolId, filters);
  }
  async createEdgeDeployment(schoolId: string, data: Partial<EdgeDeployment>): Promise<EdgeDeployment> {
    return this.repo.createEdgeDeployment(schoolId, data as any);
  }
  async updateEdgeDeployment(schoolId: string, id: string, data: Partial<EdgeDeployment>): Promise<EdgeDeployment> {
    const existing = await this.repo.getEdgeDeployment(schoolId, id);
    if (!existing) throw new EduCloudEdgeDeploymentError(id);
    return this.repo.updateEdgeDeployment(schoolId, id, data as any);
  }
  async deleteEdgeDeployment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEdgeDeployment(schoolId, id);
    if (!existing) throw new EduCloudEdgeDeploymentError(id);
    return this.repo.deleteEdgeDeployment(schoolId, id);
  }
}
