import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionDeployment } from '@educi/types';
import { EduCloudRegionDeploymentError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudRegionDeployment {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getRegionDeployment(schoolId: string, id: string): Promise<RegionDeployment> {
    const item = await this.repo.getRegionDeployment(schoolId, id);
    if (!item) throw new EduCloudRegionDeploymentError(id);
    return item;
  }
  async listRegionDeployments(schoolId: string, filters?: Record<string, unknown>): Promise<RegionDeployment[]> {
    return this.repo.listRegionDeployment(schoolId, filters);
  }
  async createRegionDeployment(schoolId: string, data: Partial<RegionDeployment>): Promise<RegionDeployment> {
    return this.repo.createRegionDeployment(schoolId, data as any);
  }
  async updateRegionDeployment(schoolId: string, id: string, data: Partial<RegionDeployment>): Promise<RegionDeployment> {
    const existing = await this.repo.getRegionDeployment(schoolId, id);
    if (!existing) throw new EduCloudRegionDeploymentError(id);
    return this.repo.updateRegionDeployment(schoolId, id, data as any);
  }
  async deleteRegionDeployment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRegionDeployment(schoolId, id);
    if (!existing) throw new EduCloudRegionDeploymentError(id);
    return this.repo.deleteRegionDeployment(schoolId, id);
  }
}
