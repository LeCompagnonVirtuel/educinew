import type { SupabaseClient } from '@supabase/supabase-js';
import type { LDAPConfiguration } from '@educi/types';
import { EduOSLDAPConfigurationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSLDAPConfigurationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getLDAPConfiguration(schoolId: string, id: string): Promise<LDAPConfiguration> {
    const item = await this.repo.getLDAPConfiguration(schoolId, id);
    if (!item) throw new EduOSLDAPConfigurationError(id);
    return item;
  }
  async listLDAPConfigurations(schoolId: string, filters?: Record<string, unknown>): Promise<LDAPConfiguration[]> {
    return this.repo.listLdapConfigurations(schoolId, filters);
  }
  async createLDAPConfiguration(schoolId: string, data: Partial<LDAPConfiguration>): Promise<LDAPConfiguration> {
    return this.repo.createLDAPConfiguration(schoolId, data as any);
  }
  async updateLDAPConfiguration(schoolId: string, id: string, data: Partial<LDAPConfiguration>): Promise<LDAPConfiguration> {
    const existing = await this.repo.getLDAPConfiguration(schoolId, id);
    if (!existing) throw new EduOSLDAPConfigurationError(id);
    return this.repo.updateLDAPConfiguration(schoolId, id, data as any);
  }
  async deleteLDAPConfiguration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLDAPConfiguration(schoolId, id);
    if (!existing) throw new EduOSLDAPConfigurationError(id);
    return this.repo.deleteLDAPConfiguration(schoolId, id);
  }
}

