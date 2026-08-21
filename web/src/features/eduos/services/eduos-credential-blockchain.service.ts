import type { SupabaseClient } from '@supabase/supabase-js';
import type { CredentialBlockchain } from '@educi/types';
import { EduOSCredentialBlockchainError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSCredentialBlockchainService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getCredentialBlockchain(schoolId: string, id: string): Promise<CredentialBlockchain> {
    const item = await this.repo.getCredentialBlockchain(schoolId, id);
    if (!item) throw new EduOSCredentialBlockchainError(id);
    return item;
  }
  async listCredentialBlockchains(schoolId: string, filters?: Record<string, unknown>): Promise<CredentialBlockchain[]> {
    return this.repo.listCredentialBlockchains(schoolId, filters);
  }
  async createCredentialBlockchain(schoolId: string, data: Partial<CredentialBlockchain>): Promise<CredentialBlockchain> {
    return this.repo.createCredentialBlockchain(schoolId, data as any);
  }
  async updateCredentialBlockchain(schoolId: string, id: string, data: Partial<CredentialBlockchain>): Promise<CredentialBlockchain> {
    const existing = await this.repo.getCredentialBlockchain(schoolId, id);
    if (!existing) throw new EduOSCredentialBlockchainError(id);
    return this.repo.updateCredentialBlockchain(schoolId, id, data as any);
  }
  async deleteCredentialBlockchain(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCredentialBlockchain(schoolId, id);
    if (!existing) throw new EduOSCredentialBlockchainError(id);
    return this.repo.deleteCredentialBlockchain(schoolId, id);
  }
}

