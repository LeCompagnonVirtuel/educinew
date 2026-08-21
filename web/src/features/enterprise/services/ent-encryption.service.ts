// Enterprise Platform Service - Encryption
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Encryption, EncryptionCreate } from '@educi/types';
import { EntEncryptionNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntEncryptionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getEncryption(schoolId: string, id: string): Promise<Encryption> {
    const item = await this.repo.findEncryptionById(schoolId, id);
    if (!item) throw new EntEncryptionNotFoundError(id);
    return item;
  }
  async listEncryptions(schoolId: string, filters?: Record<string, unknown>): Promise<Encryption[]> {
    return this.repo.findAllEncryptions(schoolId, filters);
  }
  async createEncryption(schoolId: string, data: EncryptionCreate): Promise<Encryption> {
    return this.repo.createEncryption(schoolId, data);
  }
  async updateEncryption(schoolId: string, id: string, data: Partial<EncryptionCreate>): Promise<Encryption> {
    const existing = await this.repo.findEncryptionById(schoolId, id);
    if (!existing) throw new EntEncryptionNotFoundError(id);
    return this.repo.updateEncryption(schoolId, id, data);
  }
  async deleteEncryption(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEncryptionById(schoolId, id);
    if (!existing) throw new EntEncryptionNotFoundError(id);
    return this.repo.deleteEncryption(schoolId, id);
  }
  async countEncryptions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEncryptions(schoolId, filters);
  }
}
