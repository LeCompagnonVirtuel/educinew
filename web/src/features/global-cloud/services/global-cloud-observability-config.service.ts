import type { SupabaseClient } from '@supabase/supabase-js';
import type { ObservabilityConfig } from '@educi/types';
import { EduCloudObservabilityConfigError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudObservabilityConfig {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getObservabilityConfig(schoolId: string, id: string): Promise<ObservabilityConfig> {
    const item = await this.repo.getObservabilityConfig(schoolId, id);
    if (!item) throw new EduCloudObservabilityConfigError(id);
    return item;
  }
  async listObservabilityConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<ObservabilityConfig[]> {
    return this.repo.listObservabilityConfig(schoolId, filters);
  }
  async createObservabilityConfig(schoolId: string, data: Partial<ObservabilityConfig>): Promise<ObservabilityConfig> {
    return this.repo.createObservabilityConfig(schoolId, data as any);
  }
  async updateObservabilityConfig(schoolId: string, id: string, data: Partial<ObservabilityConfig>): Promise<ObservabilityConfig> {
    const existing = await this.repo.getObservabilityConfig(schoolId, id);
    if (!existing) throw new EduCloudObservabilityConfigError(id);
    return this.repo.updateObservabilityConfig(schoolId, id, data as any);
  }
  async deleteObservabilityConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getObservabilityConfig(schoolId, id);
    if (!existing) throw new EduCloudObservabilityConfigError(id);
    return this.repo.deleteObservabilityConfig(schoolId, id);
  }
}
