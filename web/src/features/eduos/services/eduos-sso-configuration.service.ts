import type { SupabaseClient } from '@supabase/supabase-js';
import type { SSOConfiguration } from '@educi/types';
import { EduOSSSOConfigurationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSSSOConfigurationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getSSOConfiguration(schoolId: string, id: string): Promise<SSOConfiguration> {
    const item = await this.repo.getSSOConfiguration(schoolId, id);
    if (!item) throw new EduOSSSOConfigurationError(id);
    return item;
  }
  async listSSOConfigurations(schoolId: string, filters?: Record<string, unknown>): Promise<SSOConfiguration[]> {
    return this.repo.listSsoConfigurations(schoolId, filters);
  }
  async createSSOConfiguration(schoolId: string, data: Partial<SSOConfiguration>): Promise<SSOConfiguration> {
    return this.repo.createSSOConfiguration(schoolId, data as any);
  }
  async updateSSOConfiguration(schoolId: string, id: string, data: Partial<SSOConfiguration>): Promise<SSOConfiguration> {
    const existing = await this.repo.getSSOConfiguration(schoolId, id);
    if (!existing) throw new EduOSSSOConfigurationError(id);
    return this.repo.updateSSOConfiguration(schoolId, id, data as any);
  }
  async deleteSSOConfiguration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSSOConfiguration(schoolId, id);
    if (!existing) throw new EduOSSSOConfigurationError(id);
    return this.repo.deleteSSOConfiguration(schoolId, id);
  }
}

