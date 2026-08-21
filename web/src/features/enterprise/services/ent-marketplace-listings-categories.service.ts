// Enterprise Platform Service - MarketplaceListingsCategories
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMarketplaceCategoryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMarketplaceListingsCategorie(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findMarketplaceListingsCategorieById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listMarketplaceListingsCategories(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllMarketplaceListingsCategories(schoolId, filters);
  }
  async createMarketplaceListingsCategorie(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createMarketplaceListingsCategorie(schoolId, data);
  }
  async updateMarketplaceListingsCategorie(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findMarketplaceListingsCategorieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateMarketplaceListingsCategorie(schoolId, id, data);
  }
  async deleteMarketplaceListingsCategorie(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMarketplaceListingsCategorieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteMarketplaceListingsCategorie(schoolId, id);
  }
  async countMarketplaceListingsCategories(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMarketplaceListingsCategories(schoolId, filters);
  }
}
