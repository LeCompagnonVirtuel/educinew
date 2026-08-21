import type { SupabaseClient } from '@supabase/supabase-js';
import type { PluginConfig } from '@educi/types';
import { EduCloudPluginConfigError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudPluginConfig {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getPluginConfig(schoolId: string, id: string): Promise<PluginConfig> {
    const item = await this.repo.getPluginConfig(schoolId, id);
    if (!item) throw new EduCloudPluginConfigError(id);
    return item;
  }
  async listPluginConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<PluginConfig[]> {
    return this.repo.listPluginConfig(schoolId, filters);
  }
  async createPluginConfig(schoolId: string, data: Partial<PluginConfig>): Promise<PluginConfig> {
    return this.repo.createPluginConfig(schoolId, data as any);
  }
  async updatePluginConfig(schoolId: string, id: string, data: Partial<PluginConfig>): Promise<PluginConfig> {
    const existing = await this.repo.getPluginConfig(schoolId, id);
    if (!existing) throw new EduCloudPluginConfigError(id);
    return this.repo.updatePluginConfig(schoolId, id, data as any);
  }
  async deletePluginConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPluginConfig(schoolId, id);
    if (!existing) throw new EduCloudPluginConfigError(id);
    return this.repo.deletePluginConfig(schoolId, id);
  }
}
