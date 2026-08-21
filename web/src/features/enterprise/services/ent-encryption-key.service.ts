// Enterprise Platform Service - EncryptionKey
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { EncryptionKey, EncryptionKeyCreate } from '@educi/types';
import { EntEncryptionKeyNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntEncryptionKeyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getEncryptionKey(schoolId: string, id: string): Promise<EncryptionKey> {
    const item = await this.repo.findEncryptionKeyById(schoolId, id);
    if (!item) throw new EntEncryptionKeyNotFoundError(id);
    return item;
  }
  async listEncryptionKeys(schoolId: string, filters?: Record<string, unknown>): Promise<EncryptionKey[]> {
    return this.repo.findAllEncryptionKeys(schoolId, filters);
  }
  async createEncryptionKey(schoolId: string, data: EncryptionKeyCreate): Promise<EncryptionKey> {
    return this.repo.createEncryptionKey(schoolId, data);
  }
  async updateEncryptionKey(schoolId: string, id: string, data: Partial<EncryptionKeyCreate>): Promise<EncryptionKey> {
    const existing = await this.repo.findEncryptionKeyById(schoolId, id);
    if (!existing) throw new EntEncryptionKeyNotFoundError(id);
    return this.repo.updateEncryptionKey(schoolId, id, data);
  }
  async deleteEncryptionKey(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEncryptionKeyById(schoolId, id);
    if (!existing) throw new EntEncryptionKeyNotFoundError(id);
    return this.repo.deleteEncryptionKey(schoolId, id);
  }
  async countEncryptionKeys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEncryptionKeys(schoolId, filters);
  }
}
