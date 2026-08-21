// Enterprise Platform Service - MarketplaceListings
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMarketplaceListingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMarketplaceListing(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findMarketplaceListingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listMarketplaceListings(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllMarketplaceListings(schoolId, filters);
  }
  async createMarketplaceListing(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createMarketplaceListing(schoolId, data);
  }
  async updateMarketplaceListing(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findMarketplaceListingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateMarketplaceListing(schoolId, id, data);
  }
  async deleteMarketplaceListing(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMarketplaceListingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteMarketplaceListing(schoolId, id);
  }
  async countMarketplaceListings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMarketplaceListings(schoolId, filters);
  }
}
