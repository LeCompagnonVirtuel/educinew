// Enterprise Platform Service - Secrets
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSecretService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecret(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSecretById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSecrets(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSecrets(schoolId, filters);
  }
  async createSecret(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSecret(schoolId, data);
  }
  async updateSecret(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSecretById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSecret(schoolId, id, data);
  }
  async deleteSecret(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecretById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSecret(schoolId, id);
  }
  async countSecrets(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecrets(schoolId, filters);
  }
}
