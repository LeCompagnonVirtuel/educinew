import type { SupabaseClient } from '@supabase/supabase-js';
import type { MarketplaceTutor } from '@educi/types';
import { EduOSMarketplaceTutorError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMarketplaceTutorService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMarketplaceTutor(schoolId: string, id: string): Promise<MarketplaceTutor> {
    const item = await this.repo.getMarketplaceTutor(schoolId, id);
    if (!item) throw new EduOSMarketplaceTutorError(id);
    return item;
  }
  async listMarketplaceTutors(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceTutor[]> {
    return this.repo.listMarketplaceTutors(schoolId, filters);
  }
  async createMarketplaceTutor(schoolId: string, data: Partial<MarketplaceTutor>): Promise<MarketplaceTutor> {
    return this.repo.createMarketplaceTutor(schoolId, data as any);
  }
  async updateMarketplaceTutor(schoolId: string, id: string, data: Partial<MarketplaceTutor>): Promise<MarketplaceTutor> {
    const existing = await this.repo.getMarketplaceTutor(schoolId, id);
    if (!existing) throw new EduOSMarketplaceTutorError(id);
    return this.repo.updateMarketplaceTutor(schoolId, id, data as any);
  }
  async deleteMarketplaceTutor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMarketplaceTutor(schoolId, id);
    if (!existing) throw new EduOSMarketplaceTutorError(id);
    return this.repo.deleteMarketplaceTutor(schoolId, id);
  }
}

