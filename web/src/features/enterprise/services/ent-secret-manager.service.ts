// Enterprise Platform Service - SecretManager
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecretManager, SecretManagerCreate } from '@educi/types';
import { EntSecretManagerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSecretManagerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecretManager(schoolId: string, id: string): Promise<SecretManager> {
    const item = await this.repo.findSecretManagerById(schoolId, id);
    if (!item) throw new EntSecretManagerNotFoundError(id);
    return item;
  }
  async listSecretManagers(schoolId: string, filters?: Record<string, unknown>): Promise<SecretManager[]> {
    return this.repo.findAllSecretManagers(schoolId, filters);
  }
  async createSecretManager(schoolId: string, data: SecretManagerCreate): Promise<SecretManager> {
    return this.repo.createSecretManager(schoolId, data);
  }
  async updateSecretManager(schoolId: string, id: string, data: Partial<SecretManagerCreate>): Promise<SecretManager> {
    const existing = await this.repo.findSecretManagerById(schoolId, id);
    if (!existing) throw new EntSecretManagerNotFoundError(id);
    return this.repo.updateSecretManager(schoolId, id, data);
  }
  async deleteSecretManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecretManagerById(schoolId, id);
    if (!existing) throw new EntSecretManagerNotFoundError(id);
    return this.repo.deleteSecretManager(schoolId, id);
  }
  async countSecretManagers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecretManagers(schoolId, filters);
  }
}
