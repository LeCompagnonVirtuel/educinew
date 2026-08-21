// Enterprise Platform Service - ApiKeys
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntApiKeyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getApiKey(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findApiKeyById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listApiKeys(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllApiKeys(schoolId, filters);
  }
  async createApiKey(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createApiKey(schoolId, data);
  }
  async updateApiKey(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findApiKeyById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateApiKey(schoolId, id, data);
  }
  async deleteApiKey(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findApiKeyById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteApiKey(schoolId, id);
  }
  async countApiKeys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countApiKeys(schoolId, filters);
  }
}
