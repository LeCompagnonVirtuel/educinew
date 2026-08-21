import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityEncryption } from '@educi/types';
import { EduOSIdentityEncryptionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSIdentityEncryptionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getIdentityEncryption(schoolId: string, id: string): Promise<IdentityEncryption> {
    const item = await this.repo.getIdentityEncryption(schoolId, id);
    if (!item) throw new EduOSIdentityEncryptionError(id);
    return item;
  }
  async listIdentityEncryptions(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityEncryption[]> {
    return this.repo.listIdentityEncryptions(schoolId, filters);
  }
  async createIdentityEncryption(schoolId: string, data: Partial<IdentityEncryption>): Promise<IdentityEncryption> {
    return this.repo.createIdentityEncryption(schoolId, data as any);
  }
  async updateIdentityEncryption(schoolId: string, id: string, data: Partial<IdentityEncryption>): Promise<IdentityEncryption> {
    const existing = await this.repo.getIdentityEncryption(schoolId, id);
    if (!existing) throw new EduOSIdentityEncryptionError(id);
    return this.repo.updateIdentityEncryption(schoolId, id, data as any);
  }
  async deleteIdentityEncryption(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getIdentityEncryption(schoolId, id);
    if (!existing) throw new EduOSIdentityEncryptionError(id);
    return this.repo.deleteIdentityEncryption(schoolId, id);
  }
}

