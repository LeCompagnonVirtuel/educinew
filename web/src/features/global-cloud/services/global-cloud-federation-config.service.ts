import type { SupabaseClient } from '@supabase/supabase-js';
import type { FederationConfig } from '@educi/types';
import { EduCloudFederationConfigError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudFederationConfig {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getFederationConfig(schoolId: string, id: string): Promise<FederationConfig> {
    const item = await this.repo.getFederationConfig(schoolId, id);
    if (!item) throw new EduCloudFederationConfigError(id);
    return item;
  }
  async listFederationConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<FederationConfig[]> {
    return this.repo.listFederationConfig(schoolId, filters);
  }
  async createFederationConfig(schoolId: string, data: Partial<FederationConfig>): Promise<FederationConfig> {
    return this.repo.createFederationConfig(schoolId, data as any);
  }
  async updateFederationConfig(schoolId: string, id: string, data: Partial<FederationConfig>): Promise<FederationConfig> {
    const existing = await this.repo.getFederationConfig(schoolId, id);
    if (!existing) throw new EduCloudFederationConfigError(id);
    return this.repo.updateFederationConfig(schoolId, id, data as any);
  }
  async deleteFederationConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getFederationConfig(schoolId, id);
    if (!existing) throw new EduCloudFederationConfigError(id);
    return this.repo.deleteFederationConfig(schoolId, id);
  }
}
