import type { SupabaseClient } from '@supabase/supabase-js';
import type { MarketplaceProduct } from '@educi/types';
import { EduOSMarketplaceProductError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMarketplaceProductService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMarketplaceProduct(schoolId: string, id: string): Promise<MarketplaceProduct> {
    const item = await this.repo.getMarketplaceProduct(schoolId, id);
    if (!item) throw new EduOSMarketplaceProductError(id);
    return item;
  }
  async listMarketplaceProducts(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceProduct[]> {
    return this.repo.listMarketplaceProducts(schoolId, filters);
  }
  async createMarketplaceProduct(schoolId: string, data: Partial<MarketplaceProduct>): Promise<MarketplaceProduct> {
    return this.repo.createMarketplaceProduct(schoolId, data as any);
  }
  async updateMarketplaceProduct(schoolId: string, id: string, data: Partial<MarketplaceProduct>): Promise<MarketplaceProduct> {
    const existing = await this.repo.getMarketplaceProduct(schoolId, id);
    if (!existing) throw new EduOSMarketplaceProductError(id);
    return this.repo.updateMarketplaceProduct(schoolId, id, data as any);
  }
  async deleteMarketplaceProduct(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMarketplaceProduct(schoolId, id);
    if (!existing) throw new EduOSMarketplaceProductError(id);
    return this.repo.deleteMarketplaceProduct(schoolId, id);
  }
}

