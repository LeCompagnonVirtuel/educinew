import type { SupabaseClient } from '@supabase/supabase-js';
import type { WalletTransaction } from '@educi/types';
import { EduOSWalletTransactionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWalletTransactionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWalletTransaction(schoolId: string, id: string): Promise<WalletTransaction> {
    const item = await this.repo.getWalletTransaction(schoolId, id);
    if (!item) throw new EduOSWalletTransactionError(id);
    return item;
  }
  async listWalletTransactions(schoolId: string, filters?: Record<string, unknown>): Promise<WalletTransaction[]> {
    return this.repo.listWalletTransactions(schoolId, filters);
  }
  async createWalletTransaction(schoolId: string, data: Partial<WalletTransaction>): Promise<WalletTransaction> {
    return this.repo.createWalletTransaction(schoolId, data as any);
  }
  async updateWalletTransaction(schoolId: string, id: string, data: Partial<WalletTransaction>): Promise<WalletTransaction> {
    const existing = await this.repo.getWalletTransaction(schoolId, id);
    if (!existing) throw new EduOSWalletTransactionError(id);
    return this.repo.updateWalletTransaction(schoolId, id, data as any);
  }
  async deleteWalletTransaction(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWalletTransaction(schoolId, id);
    if (!existing) throw new EduOSWalletTransactionError(id);
    return this.repo.deleteWalletTransaction(schoolId, id);
  }
}

