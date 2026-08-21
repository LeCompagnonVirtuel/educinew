import type { SupabaseClient } from '@supabase/supabase-js';
import type { WalletAnalytics } from '@educi/types';
import { EduOSWalletAnalyticsError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWalletAnalyticsService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWalletAnalytics(schoolId: string, id: string): Promise<WalletAnalytics> {
    const item = await this.repo.getWalletAnalytics(schoolId, id);
    if (!item) throw new EduOSWalletAnalyticsError(id);
    return item;
  }
  async listWalletAnalyticss(schoolId: string, filters?: Record<string, unknown>): Promise<WalletAnalytics[]> {
    return this.repo.listWalletAnalyticss(schoolId, filters);
  }
  async createWalletAnalytics(schoolId: string, data: Partial<WalletAnalytics>): Promise<WalletAnalytics> {
    return this.repo.createWalletAnalytics(schoolId, data as any);
  }
  async updateWalletAnalytics(schoolId: string, id: string, data: Partial<WalletAnalytics>): Promise<WalletAnalytics> {
    const existing = await this.repo.getWalletAnalytics(schoolId, id);
    if (!existing) throw new EduOSWalletAnalyticsError(id);
    return this.repo.updateWalletAnalytics(schoolId, id, data as any);
  }
  async deleteWalletAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWalletAnalytics(schoolId, id);
    if (!existing) throw new EduOSWalletAnalyticsError(id);
    return this.repo.deleteWalletAnalytics(schoolId, id);
  }
}

