import type { SupabaseClient } from '@supabase/supabase-js';
import type { MarketplaceBook } from '@educi/types';
import { EduOSMarketplaceBookError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMarketplaceBookService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMarketplaceBook(schoolId: string, id: string): Promise<MarketplaceBook> {
    const item = await this.repo.getMarketplaceBook(schoolId, id);
    if (!item) throw new EduOSMarketplaceBookError(id);
    return item;
  }
  async listMarketplaceBooks(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceBook[]> {
    return this.repo.listMarketplaceBooks(schoolId, filters);
  }
  async createMarketplaceBook(schoolId: string, data: Partial<MarketplaceBook>): Promise<MarketplaceBook> {
    return this.repo.createMarketplaceBook(schoolId, data as any);
  }
  async updateMarketplaceBook(schoolId: string, id: string, data: Partial<MarketplaceBook>): Promise<MarketplaceBook> {
    const existing = await this.repo.getMarketplaceBook(schoolId, id);
    if (!existing) throw new EduOSMarketplaceBookError(id);
    return this.repo.updateMarketplaceBook(schoolId, id, data as any);
  }
  async deleteMarketplaceBook(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMarketplaceBook(schoolId, id);
    if (!existing) throw new EduOSMarketplaceBookError(id);
    return this.repo.deleteMarketplaceBook(schoolId, id);
  }
}

