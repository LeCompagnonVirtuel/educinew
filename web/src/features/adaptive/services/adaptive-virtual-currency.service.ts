import type { SupabaseClient } from '@supabase/supabase-js';
import type { VirtualCurrency } from '@educi/types';
import { AdaptiveVirtualCurrencyError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveVirtualCurrencyService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getVirtualCurrency(schoolId: string, id: string): Promise<VirtualCurrency> {
    const item = await this.repo.getVirtualCurrency(schoolId, id);
    if (!item) throw new AdaptiveVirtualCurrencyError(id);
    return item;
  }
  async listVirtualCurrencies(schoolId: string, filters?: Record<string, unknown>): Promise<VirtualCurrency[]> {
    return this.repo.listVirtualCurrencies(schoolId, filters);
  }
  async createVirtualCurrency(schoolId: string, data: Omit<VirtualCurrency, 'id' | 'created_at'>): Promise<VirtualCurrency> {
    return this.repo.createVirtualCurrency(schoolId, data);
  }
  async updateVirtualCurrency(schoolId: string, id: string, data: Partial<Omit<VirtualCurrency, 'id' | 'created_at'>>): Promise<VirtualCurrency> {
    const existing = await this.repo.getVirtualCurrency(schoolId, id);
    if (!existing) throw new AdaptiveVirtualCurrencyError(id);
    return this.repo.updateVirtualCurrency(schoolId, id, data);
  }
  async deleteVirtualCurrency(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getVirtualCurrency(schoolId, id);
    if (!existing) throw new AdaptiveVirtualCurrencyError(id);
    return this.repo.deleteVirtualCurrency(schoolId, id);
  }
}
