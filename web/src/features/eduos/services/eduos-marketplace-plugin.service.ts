import type { SupabaseClient } from '@supabase/supabase-js';
import type { MarketplacePlugin } from '@educi/types';
import { EduOSMarketplacePluginError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMarketplacePluginService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMarketplacePlugin(schoolId: string, id: string): Promise<MarketplacePlugin> {
    const item = await this.repo.getMarketplacePlugin(schoolId, id);
    if (!item) throw new EduOSMarketplacePluginError(id);
    return item;
  }
  async listMarketplacePlugins(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplacePlugin[]> {
    return this.repo.listMarketplacePlugins(schoolId, filters);
  }
  async createMarketplacePlugin(schoolId: string, data: Partial<MarketplacePlugin>): Promise<MarketplacePlugin> {
    return this.repo.createMarketplacePlugin(schoolId, data as any);
  }
  async updateMarketplacePlugin(schoolId: string, id: string, data: Partial<MarketplacePlugin>): Promise<MarketplacePlugin> {
    const existing = await this.repo.getMarketplacePlugin(schoolId, id);
    if (!existing) throw new EduOSMarketplacePluginError(id);
    return this.repo.updateMarketplacePlugin(schoolId, id, data as any);
  }
  async deleteMarketplacePlugin(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMarketplacePlugin(schoolId, id);
    if (!existing) throw new EduOSMarketplacePluginError(id);
    return this.repo.deleteMarketplacePlugin(schoolId, id);
  }
}

