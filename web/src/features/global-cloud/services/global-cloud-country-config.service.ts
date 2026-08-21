import type { SupabaseClient } from '@supabase/supabase-js';
import type { CountryConfig } from '@educi/types';
import { EduCloudCountryConfigError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCountryConfig {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCountryConfig(schoolId: string, id: string): Promise<CountryConfig> {
    const item = await this.repo.getCountryConfig(schoolId, id);
    if (!item) throw new EduCloudCountryConfigError(id);
    return item;
  }
  async listCountryConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<CountryConfig[]> {
    return this.repo.listCountryConfig(schoolId, filters);
  }
  async createCountryConfig(schoolId: string, data: Partial<CountryConfig>): Promise<CountryConfig> {
    return this.repo.createCountryConfig(schoolId, data as any);
  }
  async updateCountryConfig(schoolId: string, id: string, data: Partial<CountryConfig>): Promise<CountryConfig> {
    const existing = await this.repo.getCountryConfig(schoolId, id);
    if (!existing) throw new EduCloudCountryConfigError(id);
    return this.repo.updateCountryConfig(schoolId, id, data as any);
  }
  async deleteCountryConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCountryConfig(schoolId, id);
    if (!existing) throw new EduCloudCountryConfigError(id);
    return this.repo.deleteCountryConfig(schoolId, id);
  }
}
