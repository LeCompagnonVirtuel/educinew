import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionFailover } from '@educi/types';
import { EduCloudRegionFailoverError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudRegionFailover {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getRegionFailover(schoolId: string, id: string): Promise<RegionFailover> {
    const item = await this.repo.getRegionFailover(schoolId, id);
    if (!item) throw new EduCloudRegionFailoverError(id);
    return item;
  }
  async listRegionFailovers(schoolId: string, filters?: Record<string, unknown>): Promise<RegionFailover[]> {
    return this.repo.listRegionFailover(schoolId, filters);
  }
  async createRegionFailover(schoolId: string, data: Partial<RegionFailover>): Promise<RegionFailover> {
    return this.repo.createRegionFailover(schoolId, data as any);
  }
  async updateRegionFailover(schoolId: string, id: string, data: Partial<RegionFailover>): Promise<RegionFailover> {
    const existing = await this.repo.getRegionFailover(schoolId, id);
    if (!existing) throw new EduCloudRegionFailoverError(id);
    return this.repo.updateRegionFailover(schoolId, id, data as any);
  }
  async deleteRegionFailover(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRegionFailover(schoolId, id);
    if (!existing) throw new EduCloudRegionFailoverError(id);
    return this.repo.deleteRegionFailover(schoolId, id);
  }
}
