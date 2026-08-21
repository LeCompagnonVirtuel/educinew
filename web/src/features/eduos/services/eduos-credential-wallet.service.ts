import type { SupabaseClient } from '@supabase/supabase-js';
import type { CredentialWallet } from '@educi/types';
import { EduOSCredentialWalletError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSCredentialWalletService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getCredentialWallet(schoolId: string, id: string): Promise<CredentialWallet> {
    const item = await this.repo.getCredentialWallet(schoolId, id);
    if (!item) throw new EduOSCredentialWalletError(id);
    return item;
  }
  async listCredentialWallets(schoolId: string, filters?: Record<string, unknown>): Promise<CredentialWallet[]> {
    return this.repo.listCredentialWallets(schoolId, filters);
  }
  async createCredentialWallet(schoolId: string, data: Partial<CredentialWallet>): Promise<CredentialWallet> {
    return this.repo.createCredentialWallet(schoolId, data as any);
  }
  async updateCredentialWallet(schoolId: string, id: string, data: Partial<CredentialWallet>): Promise<CredentialWallet> {
    const existing = await this.repo.getCredentialWallet(schoolId, id);
    if (!existing) throw new EduOSCredentialWalletError(id);
    return this.repo.updateCredentialWallet(schoolId, id, data as any);
  }
  async deleteCredentialWallet(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCredentialWallet(schoolId, id);
    if (!existing) throw new EduOSCredentialWalletError(id);
    return this.repo.deleteCredentialWallet(schoolId, id);
  }
}

