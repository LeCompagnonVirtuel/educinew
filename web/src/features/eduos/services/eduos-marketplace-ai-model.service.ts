import type { SupabaseClient } from '@supabase/supabase-js';
import type { MarketplaceAIModel } from '@educi/types';
import { EduOSMarketplaceAIModelError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMarketplaceAIModelService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMarketplaceAIModel(schoolId: string, id: string): Promise<MarketplaceAIModel> {
    const item = await this.repo.getMarketplaceAIModel(schoolId, id);
    if (!item) throw new EduOSMarketplaceAIModelError(id);
    return item;
  }
  async listMarketplaceAIModels(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceAIModel[]> {
    return this.repo.listMarketplaceAIModels(schoolId, filters);
  }
  async createMarketplaceAIModel(schoolId: string, data: Partial<MarketplaceAIModel>): Promise<MarketplaceAIModel> {
    return this.repo.createMarketplaceAIModel(schoolId, data as any);
  }
  async updateMarketplaceAIModel(schoolId: string, id: string, data: Partial<MarketplaceAIModel>): Promise<MarketplaceAIModel> {
    const existing = await this.repo.getMarketplaceAIModel(schoolId, id);
    if (!existing) throw new EduOSMarketplaceAIModelError(id);
    return this.repo.updateMarketplaceAIModel(schoolId, id, data as any);
  }
  async deleteMarketplaceAIModel(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMarketplaceAIModel(schoolId, id);
    if (!existing) throw new EduOSMarketplaceAIModelError(id);
    return this.repo.deleteMarketplaceAIModel(schoolId, id);
  }
}

