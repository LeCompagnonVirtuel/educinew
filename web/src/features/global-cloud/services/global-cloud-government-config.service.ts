import type { SupabaseClient } from '@supabase/supabase-js';
import type { GovernmentConfig } from '@educi/types';
import { EduCloudGovernmentConfigError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudGovernmentConfig {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getGovernmentConfig(schoolId: string, id: string): Promise<GovernmentConfig> {
    const item = await this.repo.getGovernmentConfig(schoolId, id);
    if (!item) throw new EduCloudGovernmentConfigError(id);
    return item;
  }
  async listGovernmentConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<GovernmentConfig[]> {
    return this.repo.listGovernmentConfig(schoolId, filters);
  }
  async createGovernmentConfig(schoolId: string, data: Partial<GovernmentConfig>): Promise<GovernmentConfig> {
    return this.repo.createGovernmentConfig(schoolId, data as any);
  }
  async updateGovernmentConfig(schoolId: string, id: string, data: Partial<GovernmentConfig>): Promise<GovernmentConfig> {
    const existing = await this.repo.getGovernmentConfig(schoolId, id);
    if (!existing) throw new EduCloudGovernmentConfigError(id);
    return this.repo.updateGovernmentConfig(schoolId, id, data as any);
  }
  async deleteGovernmentConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getGovernmentConfig(schoolId, id);
    if (!existing) throw new EduCloudGovernmentConfigError(id);
    return this.repo.deleteGovernmentConfig(schoolId, id);
  }
}
