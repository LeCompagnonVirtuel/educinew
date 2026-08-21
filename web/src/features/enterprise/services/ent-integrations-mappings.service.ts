// Enterprise Platform Service - IntegrationsMappings
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntIntegrationMappingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getIntegrationsMapping(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findIntegrationsMappingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listIntegrationsMappings(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllIntegrationsMappings(schoolId, filters);
  }
  async createIntegrationsMapping(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createIntegrationsMapping(schoolId, data);
  }
  async updateIntegrationsMapping(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findIntegrationsMappingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateIntegrationsMapping(schoolId, id, data);
  }
  async deleteIntegrationsMapping(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIntegrationsMappingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteIntegrationsMapping(schoolId, id);
  }
  async countIntegrationsMappings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIntegrationsMappings(schoolId, filters);
  }
}
