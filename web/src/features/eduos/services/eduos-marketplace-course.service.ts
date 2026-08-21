import type { SupabaseClient } from '@supabase/supabase-js';
import type { MarketplaceCourse } from '@educi/types';
import { EduOSMarketplaceCourseError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMarketplaceCourseService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMarketplaceCourse(schoolId: string, id: string): Promise<MarketplaceCourse> {
    const item = await this.repo.getMarketplaceCourse(schoolId, id);
    if (!item) throw new EduOSMarketplaceCourseError(id);
    return item;
  }
  async listMarketplaceCourses(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceCourse[]> {
    return this.repo.listMarketplaceCourses(schoolId, filters);
  }
  async createMarketplaceCourse(schoolId: string, data: Partial<MarketplaceCourse>): Promise<MarketplaceCourse> {
    return this.repo.createMarketplaceCourse(schoolId, data as any);
  }
  async updateMarketplaceCourse(schoolId: string, id: string, data: Partial<MarketplaceCourse>): Promise<MarketplaceCourse> {
    const existing = await this.repo.getMarketplaceCourse(schoolId, id);
    if (!existing) throw new EduOSMarketplaceCourseError(id);
    return this.repo.updateMarketplaceCourse(schoolId, id, data as any);
  }
  async deleteMarketplaceCourse(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMarketplaceCourse(schoolId, id);
    if (!existing) throw new EduOSMarketplaceCourseError(id);
    return this.repo.deleteMarketplaceCourse(schoolId, id);
  }
}

