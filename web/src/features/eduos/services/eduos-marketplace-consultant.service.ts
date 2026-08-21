import type { SupabaseClient } from '@supabase/supabase-js';
import type { MarketplaceConsultant } from '@educi/types';
import { EduOSMarketplaceConsultantError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMarketplaceConsultantService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMarketplaceConsultant(schoolId: string, id: string): Promise<MarketplaceConsultant> {
    const item = await this.repo.getMarketplaceConsultant(schoolId, id);
    if (!item) throw new EduOSMarketplaceConsultantError(id);
    return item;
  }
  async listMarketplaceConsultants(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceConsultant[]> {
    return this.repo.listMarketplaceConsultants(schoolId, filters);
  }
  async createMarketplaceConsultant(schoolId: string, data: Partial<MarketplaceConsultant>): Promise<MarketplaceConsultant> {
    return this.repo.createMarketplaceConsultant(schoolId, data as any);
  }
  async updateMarketplaceConsultant(schoolId: string, id: string, data: Partial<MarketplaceConsultant>): Promise<MarketplaceConsultant> {
    const existing = await this.repo.getMarketplaceConsultant(schoolId, id);
    if (!existing) throw new EduOSMarketplaceConsultantError(id);
    return this.repo.updateMarketplaceConsultant(schoolId, id, data as any);
  }
  async deleteMarketplaceConsultant(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMarketplaceConsultant(schoolId, id);
    if (!existing) throw new EduOSMarketplaceConsultantError(id);
    return this.repo.deleteMarketplaceConsultant(schoolId, id);
  }
}

