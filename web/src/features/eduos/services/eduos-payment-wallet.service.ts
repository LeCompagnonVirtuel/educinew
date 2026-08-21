import type { SupabaseClient } from '@supabase/supabase-js';
import type { PaymentWallet } from '@educi/types';
import { EduOSPaymentWalletError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSPaymentWalletService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getPaymentWallet(schoolId: string, id: string): Promise<PaymentWallet> {
    const item = await this.repo.getPaymentWallet(schoolId, id);
    if (!item) throw new EduOSPaymentWalletError(id);
    return item;
  }
  async listPaymentWallets(schoolId: string, filters?: Record<string, unknown>): Promise<PaymentWallet[]> {
    return this.repo.listPaymentWallets(schoolId, filters);
  }
  async createPaymentWallet(schoolId: string, data: Partial<PaymentWallet>): Promise<PaymentWallet> {
    return this.repo.createPaymentWallet(schoolId, data as any);
  }
  async updatePaymentWallet(schoolId: string, id: string, data: Partial<PaymentWallet>): Promise<PaymentWallet> {
    const existing = await this.repo.getPaymentWallet(schoolId, id);
    if (!existing) throw new EduOSPaymentWalletError(id);
    return this.repo.updatePaymentWallet(schoolId, id, data as any);
  }
  async deletePaymentWallet(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPaymentWallet(schoolId, id);
    if (!existing) throw new EduOSPaymentWalletError(id);
    return this.repo.deletePaymentWallet(schoolId, id);
  }
}

