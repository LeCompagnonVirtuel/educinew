// Enterprise Platform Service - SecretsAccess
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSecretAccessService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecretsAccess(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSecretsAccessById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSecretsAccess(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSecretsAccess(schoolId, filters);
  }
  async createSecretsAccess(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSecretsAccess(schoolId, data);
  }
  async updateSecretsAccess(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSecretsAccessById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSecretsAccess(schoolId, id, data);
  }
  async deleteSecretsAccess(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecretsAccessById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSecretsAccess(schoolId, id);
  }
  async countSecretsAccess(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecretsAccess(schoolId, filters);
  }
}
