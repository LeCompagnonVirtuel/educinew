import type { SupabaseClient } from '@supabase/supabase-js';
import type { MinistryConfig } from '@educi/types';
import { EduCloudMinistryConfigError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudMinistryConfig {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getMinistryConfig(schoolId: string, id: string): Promise<MinistryConfig> {
    const item = await this.repo.getMinistryConfig(schoolId, id);
    if (!item) throw new EduCloudMinistryConfigError(id);
    return item;
  }
  async listMinistryConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<MinistryConfig[]> {
    return this.repo.listMinistryConfig(schoolId, filters);
  }
  async createMinistryConfig(schoolId: string, data: Partial<MinistryConfig>): Promise<MinistryConfig> {
    return this.repo.createMinistryConfig(schoolId, data as any);
  }
  async updateMinistryConfig(schoolId: string, id: string, data: Partial<MinistryConfig>): Promise<MinistryConfig> {
    const existing = await this.repo.getMinistryConfig(schoolId, id);
    if (!existing) throw new EduCloudMinistryConfigError(id);
    return this.repo.updateMinistryConfig(schoolId, id, data as any);
  }
  async deleteMinistryConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMinistryConfig(schoolId, id);
    if (!existing) throw new EduCloudMinistryConfigError(id);
    return this.repo.deleteMinistryConfig(schoolId, id);
  }
}
