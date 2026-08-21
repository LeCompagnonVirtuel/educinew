// Enterprise Platform Service - MarketplaceListingsAnalytics
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMarketplaceAnalyticsService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMarketplaceListingsAnalytic(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findMarketplaceListingsAnalyticById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listMarketplaceListingsAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllMarketplaceListingsAnalytics(schoolId, filters);
  }
  async createMarketplaceListingsAnalytic(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createMarketplaceListingsAnalytic(schoolId, data);
  }
  async updateMarketplaceListingsAnalytic(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findMarketplaceListingsAnalyticById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateMarketplaceListingsAnalytic(schoolId, id, data);
  }
  async deleteMarketplaceListingsAnalytic(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMarketplaceListingsAnalyticById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteMarketplaceListingsAnalytic(schoolId, id);
  }
  async countMarketplaceListingsAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMarketplaceListingsAnalytics(schoolId, filters);
  }
}
