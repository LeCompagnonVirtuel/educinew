import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionConfig } from '@educi/types';
import { EduCloudRegionConfigError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudRegionConfig {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getRegionConfig(schoolId: string, id: string): Promise<RegionConfig> {
    const item = await this.repo.getRegionConfig(schoolId, id);
    if (!item) throw new EduCloudRegionConfigError(id);
    return item;
  }
  async listRegionConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<RegionConfig[]> {
    return this.repo.listRegionConfig(schoolId, filters);
  }
  async createRegionConfig(schoolId: string, data: Partial<RegionConfig>): Promise<RegionConfig> {
    return this.repo.createRegionConfig(schoolId, data as any);
  }
  async updateRegionConfig(schoolId: string, id: string, data: Partial<RegionConfig>): Promise<RegionConfig> {
    const existing = await this.repo.getRegionConfig(schoolId, id);
    if (!existing) throw new EduCloudRegionConfigError(id);
    return this.repo.updateRegionConfig(schoolId, id, data as any);
  }
  async deleteRegionConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRegionConfig(schoolId, id);
    if (!existing) throw new EduCloudRegionConfigError(id);
    return this.repo.deleteRegionConfig(schoolId, id);
  }
}
