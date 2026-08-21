import type { SupabaseClient } from '@supabase/supabase-js';
import type { MarketplaceAnalytics } from '@educi/types';
import { EduOSMarketplaceAnalyticsError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMarketplaceAnalyticsService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMarketplaceAnalytics(schoolId: string, id: string): Promise<MarketplaceAnalytics> {
    const item = await this.repo.getMarketplaceAnalytics(schoolId, id);
    if (!item) throw new EduOSMarketplaceAnalyticsError(id);
    return item;
  }
  async listMarketplaceAnalyticss(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceAnalytics[]> {
    return this.repo.listMarketplaceAnalyticss(schoolId, filters);
  }
  async createMarketplaceAnalytics(schoolId: string, data: Partial<MarketplaceAnalytics>): Promise<MarketplaceAnalytics> {
    return this.repo.createMarketplaceAnalytics(schoolId, data as any);
  }
  async updateMarketplaceAnalytics(schoolId: string, id: string, data: Partial<MarketplaceAnalytics>): Promise<MarketplaceAnalytics> {
    const existing = await this.repo.getMarketplaceAnalytics(schoolId, id);
    if (!existing) throw new EduOSMarketplaceAnalyticsError(id);
    return this.repo.updateMarketplaceAnalytics(schoolId, id, data as any);
  }
  async deleteMarketplaceAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMarketplaceAnalytics(schoolId, id);
    if (!existing) throw new EduOSMarketplaceAnalyticsError(id);
    return this.repo.deleteMarketplaceAnalytics(schoolId, id);
  }
}

