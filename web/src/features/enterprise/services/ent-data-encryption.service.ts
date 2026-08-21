// Enterprise Platform Service - DataEncryption
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataEncryption, DataEncryptionCreate } from '@educi/types';
import { EntDataEncryptionNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataEncryptionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataEncryption(schoolId: string, id: string): Promise<DataEncryption> {
    const item = await this.repo.findDataEncryptionById(schoolId, id);
    if (!item) throw new EntDataEncryptionNotFoundError(id);
    return item;
  }
  async listDataEncryptions(schoolId: string, filters?: Record<string, unknown>): Promise<DataEncryption[]> {
    return this.repo.findAllDataEncryptions(schoolId, filters);
  }
  async createDataEncryption(schoolId: string, data: DataEncryptionCreate): Promise<DataEncryption> {
    return this.repo.createDataEncryption(schoolId, data);
  }
  async updateDataEncryption(schoolId: string, id: string, data: Partial<DataEncryptionCreate>): Promise<DataEncryption> {
    const existing = await this.repo.findDataEncryptionById(schoolId, id);
    if (!existing) throw new EntDataEncryptionNotFoundError(id);
    return this.repo.updateDataEncryption(schoolId, id, data);
  }
  async deleteDataEncryption(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataEncryptionById(schoolId, id);
    if (!existing) throw new EntDataEncryptionNotFoundError(id);
    return this.repo.deleteDataEncryption(schoolId, id);
  }
  async countDataEncryptions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataEncryptions(schoolId, filters);
  }
}
