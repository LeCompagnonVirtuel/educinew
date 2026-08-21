import type { SupabaseClient } from '@supabase/supabase-js';
import type { EnvironmentConfig } from '@educi/types';
import { EduCloudEnvironmentConfigError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudEnvironmentConfig {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getEnvironmentConfig(schoolId: string, id: string): Promise<EnvironmentConfig> {
    const item = await this.repo.getEnvironmentConfig(schoolId, id);
    if (!item) throw new EduCloudEnvironmentConfigError(id);
    return item;
  }
  async listEnvironmentConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<EnvironmentConfig[]> {
    return this.repo.listEnvironmentConfig(schoolId, filters);
  }
  async createEnvironmentConfig(schoolId: string, data: Partial<EnvironmentConfig>): Promise<EnvironmentConfig> {
    return this.repo.createEnvironmentConfig(schoolId, data as any);
  }
  async updateEnvironmentConfig(schoolId: string, id: string, data: Partial<EnvironmentConfig>): Promise<EnvironmentConfig> {
    const existing = await this.repo.getEnvironmentConfig(schoolId, id);
    if (!existing) throw new EduCloudEnvironmentConfigError(id);
    return this.repo.updateEnvironmentConfig(schoolId, id, data as any);
  }
  async deleteEnvironmentConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEnvironmentConfig(schoolId, id);
    if (!existing) throw new EduCloudEnvironmentConfigError(id);
    return this.repo.deleteEnvironmentConfig(schoolId, id);
  }
}
