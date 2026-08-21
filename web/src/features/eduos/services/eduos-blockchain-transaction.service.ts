import type { SupabaseClient } from '@supabase/supabase-js';
import type { BlockchainTransaction } from '@educi/types';
import { EduOSBlockchainTransactionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSBlockchainTransactionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getBlockchainTransaction(schoolId: string, id: string): Promise<BlockchainTransaction> {
    const item = await this.repo.getBlockchainTransaction(schoolId, id);
    if (!item) throw new EduOSBlockchainTransactionError(id);
    return item;
  }
  async listBlockchainTransactions(schoolId: string, filters?: Record<string, unknown>): Promise<BlockchainTransaction[]> {
    return this.repo.listBlockchainTransactions(schoolId, filters);
  }
  async createBlockchainTransaction(schoolId: string, data: Partial<BlockchainTransaction>): Promise<BlockchainTransaction> {
    return this.repo.createBlockchainTransaction(schoolId, data as any);
  }
  async updateBlockchainTransaction(schoolId: string, id: string, data: Partial<BlockchainTransaction>): Promise<BlockchainTransaction> {
    const existing = await this.repo.getBlockchainTransaction(schoolId, id);
    if (!existing) throw new EduOSBlockchainTransactionError(id);
    return this.repo.updateBlockchainTransaction(schoolId, id, data as any);
  }
  async deleteBlockchainTransaction(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBlockchainTransaction(schoolId, id);
    if (!existing) throw new EduOSBlockchainTransactionError(id);
    return this.repo.deleteBlockchainTransaction(schoolId, id);
  }
}

