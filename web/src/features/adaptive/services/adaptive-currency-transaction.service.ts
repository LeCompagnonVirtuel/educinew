import type { SupabaseClient } from '@supabase/supabase-js';
import type { CurrencyTransaction } from '@educi/types';
import { AdaptiveCurrencyTransactionError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveCurrencyTransactionService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getCurrencyTransaction(schoolId: string, id: string): Promise<CurrencyTransaction> {
    const item = await this.repo.getCurrencyTransaction(schoolId, id);
    if (!item) throw new AdaptiveCurrencyTransactionError(id);
    return item;
  }
  async listCurrencyTransactions(schoolId: string, filters?: Record<string, unknown>): Promise<CurrencyTransaction[]> {
    return this.repo.listCurrencyTransactions(schoolId, filters);
  }
  async createCurrencyTransaction(schoolId: string, data: Omit<CurrencyTransaction, 'id' | 'created_at'>): Promise<CurrencyTransaction> {
    return this.repo.createCurrencyTransaction(schoolId, data);
  }
  async updateCurrencyTransaction(schoolId: string, id: string, data: Partial<Omit<CurrencyTransaction, 'id' | 'created_at'>>): Promise<CurrencyTransaction> {
    const existing = await this.repo.getCurrencyTransaction(schoolId, id);
    if (!existing) throw new AdaptiveCurrencyTransactionError(id);
    return this.repo.updateCurrencyTransaction(schoolId, id, data);
  }
  async deleteCurrencyTransaction(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCurrencyTransaction(schoolId, id);
    if (!existing) throw new AdaptiveCurrencyTransactionError(id);
    return this.repo.deleteCurrencyTransaction(schoolId, id);
  }
}
