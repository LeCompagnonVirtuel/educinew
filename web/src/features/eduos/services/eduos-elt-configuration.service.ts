import type { SupabaseClient } from '@supabase/supabase-js';
import type { ELTConfiguration } from '@educi/types';
import { EduOSELTConfigurationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSELTConfigurationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getELTConfiguration(schoolId: string, id: string): Promise<ELTConfiguration> {
    const item = await this.repo.getELTConfiguration(schoolId, id);
    if (!item) throw new EduOSELTConfigurationError(id);
    return item;
  }
  async listELTConfigurations(schoolId: string, filters?: Record<string, unknown>): Promise<ELTConfiguration[]> {
    return this.repo.listELTConfigurations(schoolId, filters);
  }
  async createELTConfiguration(schoolId: string, data: Partial<ELTConfiguration>): Promise<ELTConfiguration> {
    return this.repo.createELTConfiguration(schoolId, data as any);
  }
  async updateELTConfiguration(schoolId: string, id: string, data: Partial<ELTConfiguration>): Promise<ELTConfiguration> {
    const existing = await this.repo.getELTConfiguration(schoolId, id);
    if (!existing) throw new EduOSELTConfigurationError(id);
    return this.repo.updateELTConfiguration(schoolId, id, data as any);
  }
  async deleteELTConfiguration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getELTConfiguration(schoolId, id);
    if (!existing) throw new EduOSELTConfigurationError(id);
    return this.repo.deleteELTConfiguration(schoolId, id);
  }
}

