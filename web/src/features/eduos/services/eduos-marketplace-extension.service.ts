import type { SupabaseClient } from '@supabase/supabase-js';
import type { MarketplaceExtension } from '@educi/types';
import { EduOSMarketplaceExtensionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMarketplaceExtensionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMarketplaceExtension(schoolId: string, id: string): Promise<MarketplaceExtension> {
    const item = await this.repo.getMarketplaceExtension(schoolId, id);
    if (!item) throw new EduOSMarketplaceExtensionError(id);
    return item;
  }
  async listMarketplaceExtensions(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceExtension[]> {
    return this.repo.listMarketplaceExtensions(schoolId, filters);
  }
  async createMarketplaceExtension(schoolId: string, data: Partial<MarketplaceExtension>): Promise<MarketplaceExtension> {
    return this.repo.createMarketplaceExtension(schoolId, data as any);
  }
  async updateMarketplaceExtension(schoolId: string, id: string, data: Partial<MarketplaceExtension>): Promise<MarketplaceExtension> {
    const existing = await this.repo.getMarketplaceExtension(schoolId, id);
    if (!existing) throw new EduOSMarketplaceExtensionError(id);
    return this.repo.updateMarketplaceExtension(schoolId, id, data as any);
  }
  async deleteMarketplaceExtension(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMarketplaceExtension(schoolId, id);
    if (!existing) throw new EduOSMarketplaceExtensionError(id);
    return this.repo.deleteMarketplaceExtension(schoolId, id);
  }
}

