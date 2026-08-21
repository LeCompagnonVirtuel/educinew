// Enterprise Platform Service - UsersApiKeys
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntUserApiKeyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getUsersApiKey(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findUsersApiKeyById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listUsersApiKeys(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllUsersApiKeys(schoolId, filters);
  }
  async createUsersApiKey(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createUsersApiKey(schoolId, data);
  }
  async updateUsersApiKey(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findUsersApiKeyById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateUsersApiKey(schoolId, id, data);
  }
  async deleteUsersApiKey(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findUsersApiKeyById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteUsersApiKey(schoolId, id);
  }
  async countUsersApiKeys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countUsersApiKeys(schoolId, filters);
  }
}
