import type { SupabaseClient } from '@supabase/supabase-js';
import type { GlobalConfig } from '@educi/types';
import { EduCloudGlobalConfigError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudGlobalConfig {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getGlobalConfig(schoolId: string, id: string): Promise<GlobalConfig> {
    const item = await this.repo.getGlobalConfig(schoolId, id);
    if (!item) throw new EduCloudGlobalConfigError(id);
    return item;
  }
  async listGlobalConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<GlobalConfig[]> {
    return this.repo.listGlobalConfig(schoolId, filters);
  }
  async createGlobalConfig(schoolId: string, data: Partial<GlobalConfig>): Promise<GlobalConfig> {
    return this.repo.createGlobalConfig(schoolId, data as any);
  }
  async updateGlobalConfig(schoolId: string, id: string, data: Partial<GlobalConfig>): Promise<GlobalConfig> {
    const existing = await this.repo.getGlobalConfig(schoolId, id);
    if (!existing) throw new EduCloudGlobalConfigError(id);
    return this.repo.updateGlobalConfig(schoolId, id, data as any);
  }
  async deleteGlobalConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getGlobalConfig(schoolId, id);
    if (!existing) throw new EduCloudGlobalConfigError(id);
    return this.repo.deleteGlobalConfig(schoolId, id);
  }
}
