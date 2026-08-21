import type { SupabaseClient } from '@supabase/supabase-js';
import type { SAMLConfiguration } from '@educi/types';
import { EduOSSAMLConfigurationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSSAMLConfigurationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getSAMLConfiguration(schoolId: string, id: string): Promise<SAMLConfiguration> {
    const item = await this.repo.getSAMLConfiguration(schoolId, id);
    if (!item) throw new EduOSSAMLConfigurationError(id);
    return item;
  }
  async listSAMLConfigurations(schoolId: string, filters?: Record<string, unknown>): Promise<SAMLConfiguration[]> {
    return this.repo.listSamlConfigurations(schoolId, filters);
  }
  async createSAMLConfiguration(schoolId: string, data: Partial<SAMLConfiguration>): Promise<SAMLConfiguration> {
    return this.repo.createSAMLConfiguration(schoolId, data as any);
  }
  async updateSAMLConfiguration(schoolId: string, id: string, data: Partial<SAMLConfiguration>): Promise<SAMLConfiguration> {
    const existing = await this.repo.getSAMLConfiguration(schoolId, id);
    if (!existing) throw new EduOSSAMLConfigurationError(id);
    return this.repo.updateSAMLConfiguration(schoolId, id, data as any);
  }
  async deleteSAMLConfiguration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSAMLConfiguration(schoolId, id);
    if (!existing) throw new EduOSSAMLConfigurationError(id);
    return this.repo.deleteSAMLConfiguration(schoolId, id);
  }
}

