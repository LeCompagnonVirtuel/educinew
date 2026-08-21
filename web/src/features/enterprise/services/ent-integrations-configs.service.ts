// Enterprise Platform Service - IntegrationsConfigs
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntIntegrationConfigService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getIntegrationsConfig(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findIntegrationsConfigById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listIntegrationsConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllIntegrationsConfigs(schoolId, filters);
  }
  async createIntegrationsConfig(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createIntegrationsConfig(schoolId, data);
  }
  async updateIntegrationsConfig(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findIntegrationsConfigById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateIntegrationsConfig(schoolId, id, data);
  }
  async deleteIntegrationsConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIntegrationsConfigById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteIntegrationsConfig(schoolId, id);
  }
  async countIntegrationsConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIntegrationsConfigs(schoolId, filters);
  }
}
