import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntegrationMapping } from '@educi/types';
import { EduOSIntegrationMappingError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSIntegrationMappingService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getIntegrationMapping(schoolId: string, id: string): Promise<IntegrationMapping> {
    const item = await this.repo.getIntegrationMapping(schoolId, id);
    if (!item) throw new EduOSIntegrationMappingError(id);
    return item;
  }
  async listIntegrationMappings(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrationMapping[]> {
    return this.repo.listIntegrationMappings(schoolId, filters);
  }
  async createIntegrationMapping(schoolId: string, data: Partial<IntegrationMapping>): Promise<IntegrationMapping> {
    return this.repo.createIntegrationMapping(schoolId, data as any);
  }
  async updateIntegrationMapping(schoolId: string, id: string, data: Partial<IntegrationMapping>): Promise<IntegrationMapping> {
    const existing = await this.repo.getIntegrationMapping(schoolId, id);
    if (!existing) throw new EduOSIntegrationMappingError(id);
    return this.repo.updateIntegrationMapping(schoolId, id, data as any);
  }
  async deleteIntegrationMapping(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getIntegrationMapping(schoolId, id);
    if (!existing) throw new EduOSIntegrationMappingError(id);
    return this.repo.deleteIntegrationMapping(schoolId, id);
  }
}

