import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantConfig } from '@educi/types';
import { EduCloudTenantConfigError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudTenantConfig {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getTenantConfig(schoolId: string, id: string): Promise<TenantConfig> {
    const item = await this.repo.getTenantConfig(schoolId, id);
    if (!item) throw new EduCloudTenantConfigError(id);
    return item;
  }
  async listTenantConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<TenantConfig[]> {
    return this.repo.listTenantConfig(schoolId, filters);
  }
  async createTenantConfig(schoolId: string, data: Partial<TenantConfig>): Promise<TenantConfig> {
    return this.repo.createTenantConfig(schoolId, data as any);
  }
  async updateTenantConfig(schoolId: string, id: string, data: Partial<TenantConfig>): Promise<TenantConfig> {
    const existing = await this.repo.getTenantConfig(schoolId, id);
    if (!existing) throw new EduCloudTenantConfigError(id);
    return this.repo.updateTenantConfig(schoolId, id, data as any);
  }
  async deleteTenantConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTenantConfig(schoolId, id);
    if (!existing) throw new EduCloudTenantConfigError(id);
    return this.repo.deleteTenantConfig(schoolId, id);
  }
}
