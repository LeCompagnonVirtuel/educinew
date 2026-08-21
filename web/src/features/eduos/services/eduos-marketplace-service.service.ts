import type { SupabaseClient } from '@supabase/supabase-js';
import type { MarketplaceService } from '@educi/types';
import { EduOSMarketplaceServiceError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMarketplaceServiceService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMarketplaceService(schoolId: string, id: string): Promise<MarketplaceService> {
    const item = await this.repo.getMarketplaceService(schoolId, id);
    if (!item) throw new EduOSMarketplaceServiceError(id);
    return item;
  }
  async listMarketplaceServices(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceService[]> {
    return this.repo.listMarketplaceServices(schoolId, filters);
  }
  async createMarketplaceService(schoolId: string, data: Partial<MarketplaceService>): Promise<MarketplaceService> {
    return this.repo.createMarketplaceService(schoolId, data as any);
  }
  async updateMarketplaceService(schoolId: string, id: string, data: Partial<MarketplaceService>): Promise<MarketplaceService> {
    const existing = await this.repo.getMarketplaceService(schoolId, id);
    if (!existing) throw new EduOSMarketplaceServiceError(id);
    return this.repo.updateMarketplaceService(schoolId, id, data as any);
  }
  async deleteMarketplaceService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMarketplaceService(schoolId, id);
    if (!existing) throw new EduOSMarketplaceServiceError(id);
    return this.repo.deleteMarketplaceService(schoolId, id);
  }
}

