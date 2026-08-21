import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionalConfig } from '@educi/types';
import { EduCloudRegionalConfigError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudRegionalConfig {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getRegionalConfig(schoolId: string, id: string): Promise<RegionalConfig> {
    const item = await this.repo.getRegionalConfig(schoolId, id);
    if (!item) throw new EduCloudRegionalConfigError(id);
    return item;
  }
  async listRegionalConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<RegionalConfig[]> {
    return this.repo.listRegionalConfig(schoolId, filters);
  }
  async createRegionalConfig(schoolId: string, data: Partial<RegionalConfig>): Promise<RegionalConfig> {
    return this.repo.createRegionalConfig(schoolId, data as any);
  }
  async updateRegionalConfig(schoolId: string, id: string, data: Partial<RegionalConfig>): Promise<RegionalConfig> {
    const existing = await this.repo.getRegionalConfig(schoolId, id);
    if (!existing) throw new EduCloudRegionalConfigError(id);
    return this.repo.updateRegionalConfig(schoolId, id, data as any);
  }
  async deleteRegionalConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRegionalConfig(schoolId, id);
    if (!existing) throw new EduCloudRegionalConfigError(id);
    return this.repo.deleteRegionalConfig(schoolId, id);
  }
}
