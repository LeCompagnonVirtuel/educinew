// Government & National Governance Service - Decryption
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Decryption, DecryptionCreate } from '@educi/types';
import { GovDecryptionNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDecryptionService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getDecryption(schoolId: string, id: string): Promise<Decryption> {
    const item = await this.repo.findDecryptionById(schoolId, id);
    if (!item) throw new GovDecryptionNotFoundError(id);
    return item;
  }

  async listDecryptions(schoolId: string, filters?: Record<string, unknown>): Promise<Decryption[]> {
    return this.repo.findAllDecryptions(schoolId, filters);
  }

  async createDecryption(schoolId: string, data: DecryptionCreate): Promise<Decryption> {
    return this.repo.createDecryption(schoolId, data);
  }

  async updateDecryption(schoolId: string, id: string, data: Partial<DecryptionCreate>): Promise<Decryption> {
    const existing = await this.repo.findDecryptionById(schoolId, id);
    if (!existing) throw new GovDecryptionNotFoundError(id);
    return this.repo.updateDecryption(schoolId, id, data);
  }

  async deleteDecryption(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDecryptionById(schoolId, id);
    if (!existing) throw new GovDecryptionNotFoundError(id);
    return this.repo.deleteDecryption(schoolId, id);
  }

  async countDecryptions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDecryptions(schoolId, filters);
  }
}
