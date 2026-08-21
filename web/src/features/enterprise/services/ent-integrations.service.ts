// Enterprise Platform Service - Integrations
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntIntegrationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getIntegration(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findIntegrationById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listIntegrations(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllIntegrations(schoolId, filters);
  }
  async createIntegration(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createIntegration(schoolId, data);
  }
  async updateIntegration(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findIntegrationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateIntegration(schoolId, id, data);
  }
  async deleteIntegration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIntegrationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteIntegration(schoolId, id);
  }
  async countIntegrations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIntegrations(schoolId, filters);
  }
}
