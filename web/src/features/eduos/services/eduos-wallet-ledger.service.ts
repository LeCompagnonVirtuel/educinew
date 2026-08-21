import type { SupabaseClient } from '@supabase/supabase-js';
import type { WalletLedger } from '@educi/types';
import { EduOSWalletLedgerError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWalletLedgerService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWalletLedger(schoolId: string, id: string): Promise<WalletLedger> {
    const item = await this.repo.getWalletLedger(schoolId, id);
    if (!item) throw new EduOSWalletLedgerError(id);
    return item;
  }
  async listWalletLedgers(schoolId: string, filters?: Record<string, unknown>): Promise<WalletLedger[]> {
    return this.repo.listWalletLedgers(schoolId, filters);
  }
  async createWalletLedger(schoolId: string, data: Partial<WalletLedger>): Promise<WalletLedger> {
    return this.repo.createWalletLedger(schoolId, data as any);
  }
  async updateWalletLedger(schoolId: string, id: string, data: Partial<WalletLedger>): Promise<WalletLedger> {
    const existing = await this.repo.getWalletLedger(schoolId, id);
    if (!existing) throw new EduOSWalletLedgerError(id);
    return this.repo.updateWalletLedger(schoolId, id, data as any);
  }
  async deleteWalletLedger(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWalletLedger(schoolId, id);
    if (!existing) throw new EduOSWalletLedgerError(id);
    return this.repo.deleteWalletLedger(schoolId, id);
  }
}

