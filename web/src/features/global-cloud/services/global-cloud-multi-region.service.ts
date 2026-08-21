import type { SupabaseClient } from '@supabase/supabase-js';
import type { MultiRegion } from '@educi/types';
import { EduCloudMultiRegionError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudMultiRegion {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getMultiRegion(schoolId: string, id: string): Promise<MultiRegion> {
    const item = await this.repo.getMultiRegion(schoolId, id);
    if (!item) throw new EduCloudMultiRegionError(id);
    return item;
  }
  async listMultiRegions(schoolId: string, filters?: Record<string, unknown>): Promise<MultiRegion[]> {
    return this.repo.listMultiRegion(schoolId, filters);
  }
  async createMultiRegion(schoolId: string, data: Partial<MultiRegion>): Promise<MultiRegion> {
    return this.repo.createMultiRegion(schoolId, data as any);
  }
  async updateMultiRegion(schoolId: string, id: string, data: Partial<MultiRegion>): Promise<MultiRegion> {
    const existing = await this.repo.getMultiRegion(schoolId, id);
    if (!existing) throw new EduCloudMultiRegionError(id);
    return this.repo.updateMultiRegion(schoolId, id, data as any);
  }
  async deleteMultiRegion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMultiRegion(schoolId, id);
    if (!existing) throw new EduCloudMultiRegionError(id);
    return this.repo.deleteMultiRegion(schoolId, id);
  }
}
