import type { SupabaseClient } from '@supabase/supabase-js';
import type { WalletCredits } from '@educi/types';
import { EduOSWalletCreditsError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWalletCreditsService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWalletCredits(schoolId: string, id: string): Promise<WalletCredits> {
    const item = await this.repo.getWalletCredits(schoolId, id);
    if (!item) throw new EduOSWalletCreditsError(id);
    return item;
  }
  async listWalletCredits(schoolId: string, filters?: Record<string, unknown>): Promise<WalletCredits[]> {
    return this.repo.listWalletCredits(schoolId, filters);
  }
  async createWalletCredits(schoolId: string, data: Partial<WalletCredits>): Promise<WalletCredits> {
    return this.repo.createWalletCredits(schoolId, data as any);
  }
  async updateWalletCredits(schoolId: string, id: string, data: Partial<WalletCredits>): Promise<WalletCredits> {
    const existing = await this.repo.getWalletCredits(schoolId, id);
    if (!existing) throw new EduOSWalletCreditsError(id);
    return this.repo.updateWalletCredits(schoolId, id, data as any);
  }
  async deleteWalletCredits(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWalletCredits(schoolId, id);
    if (!existing) throw new EduOSWalletCreditsError(id);
    return this.repo.deleteWalletCredits(schoolId, id);
  }
}

