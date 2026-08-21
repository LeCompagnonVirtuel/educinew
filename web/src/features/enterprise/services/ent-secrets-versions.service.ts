// Enterprise Platform Service - SecretsVersions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSecretVersionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecretsVersion(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSecretsVersionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSecretsVersions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSecretsVersions(schoolId, filters);
  }
  async createSecretsVersion(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSecretsVersion(schoolId, data);
  }
  async updateSecretsVersion(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSecretsVersionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSecretsVersion(schoolId, id, data);
  }
  async deleteSecretsVersion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecretsVersionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSecretsVersion(schoolId, id);
  }
  async countSecretsVersions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecretsVersions(schoolId, filters);
  }
}
