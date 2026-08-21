import type { SupabaseClient } from '@supabase/supabase-js';
import type { DigitalCertificateWallet } from '@educi/types';
import { EduOSDigitalCertificateWalletError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDigitalCertificateWalletService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDigitalCertificateWallet(schoolId: string, id: string): Promise<DigitalCertificateWallet> {
    const item = await this.repo.getDigitalCertificateWallet(schoolId, id);
    if (!item) throw new EduOSDigitalCertificateWalletError(id);
    return item;
  }
  async listDigitalCertificateWallets(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalCertificateWallet[]> {
    return this.repo.listDigitalCertificateWallets(schoolId, filters);
  }
  async createDigitalCertificateWallet(schoolId: string, data: Partial<DigitalCertificateWallet>): Promise<DigitalCertificateWallet> {
    return this.repo.createDigitalCertificateWallet(schoolId, data as any);
  }
  async updateDigitalCertificateWallet(schoolId: string, id: string, data: Partial<DigitalCertificateWallet>): Promise<DigitalCertificateWallet> {
    const existing = await this.repo.getDigitalCertificateWallet(schoolId, id);
    if (!existing) throw new EduOSDigitalCertificateWalletError(id);
    return this.repo.updateDigitalCertificateWallet(schoolId, id, data as any);
  }
  async deleteDigitalCertificateWallet(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDigitalCertificateWallet(schoolId, id);
    if (!existing) throw new EduOSDigitalCertificateWalletError(id);
    return this.repo.deleteDigitalCertificateWallet(schoolId, id);
  }
}

