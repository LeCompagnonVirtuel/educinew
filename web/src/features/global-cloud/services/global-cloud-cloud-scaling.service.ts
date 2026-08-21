import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudScaling } from '@educi/types';
import { EduCloudCloudScalingError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudScaling {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudScaling(schoolId: string, id: string): Promise<CloudScaling> {
    const item = await this.repo.getCloudScaling(schoolId, id);
    if (!item) throw new EduCloudCloudScalingError(id);
    return item;
  }
  async listCloudScalings(schoolId: string, filters?: Record<string, unknown>): Promise<CloudScaling[]> {
    return this.repo.listCloudScaling(schoolId, filters);
  }
  async createCloudScaling(schoolId: string, data: Partial<CloudScaling>): Promise<CloudScaling> {
    return this.repo.createCloudScaling(schoolId, data as any);
  }
  async updateCloudScaling(schoolId: string, id: string, data: Partial<CloudScaling>): Promise<CloudScaling> {
    const existing = await this.repo.getCloudScaling(schoolId, id);
    if (!existing) throw new EduCloudCloudScalingError(id);
    return this.repo.updateCloudScaling(schoolId, id, data as any);
  }
  async deleteCloudScaling(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudScaling(schoolId, id);
    if (!existing) throw new EduCloudCloudScalingError(id);
    return this.repo.deleteCloudScaling(schoolId, id);
  }
}
