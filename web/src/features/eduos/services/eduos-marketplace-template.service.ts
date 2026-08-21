import type { SupabaseClient } from '@supabase/supabase-js';
import type { MarketplaceTemplate } from '@educi/types';
import { EduOSMarketplaceTemplateError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMarketplaceTemplateService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMarketplaceTemplate(schoolId: string, id: string): Promise<MarketplaceTemplate> {
    const item = await this.repo.getMarketplaceTemplate(schoolId, id);
    if (!item) throw new EduOSMarketplaceTemplateError(id);
    return item;
  }
  async listMarketplaceTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceTemplate[]> {
    return this.repo.listMarketplaceTemplates(schoolId, filters);
  }
  async createMarketplaceTemplate(schoolId: string, data: Partial<MarketplaceTemplate>): Promise<MarketplaceTemplate> {
    return this.repo.createMarketplaceTemplate(schoolId, data as any);
  }
  async updateMarketplaceTemplate(schoolId: string, id: string, data: Partial<MarketplaceTemplate>): Promise<MarketplaceTemplate> {
    const existing = await this.repo.getMarketplaceTemplate(schoolId, id);
    if (!existing) throw new EduOSMarketplaceTemplateError(id);
    return this.repo.updateMarketplaceTemplate(schoolId, id, data as any);
  }
  async deleteMarketplaceTemplate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMarketplaceTemplate(schoolId, id);
    if (!existing) throw new EduOSMarketplaceTemplateError(id);
    return this.repo.deleteMarketplaceTemplate(schoolId, id);
  }
}

