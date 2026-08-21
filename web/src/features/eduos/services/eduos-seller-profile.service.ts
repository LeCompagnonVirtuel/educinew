import type { SupabaseClient } from '@supabase/supabase-js';
import type { SellerProfile } from '@educi/types';
import { EduOSSellerProfileError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSSellerProfileService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getSellerProfile(schoolId: string, id: string): Promise<SellerProfile> {
    const item = await this.repo.getSellerProfile(schoolId, id);
    if (!item) throw new EduOSSellerProfileError(id);
    return item;
  }
  async listSellerProfiles(schoolId: string, filters?: Record<string, unknown>): Promise<SellerProfile[]> {
    return this.repo.listSellerProfiles(schoolId, filters);
  }
  async createSellerProfile(schoolId: string, data: Partial<SellerProfile>): Promise<SellerProfile> {
    return this.repo.createSellerProfile(schoolId, data as any);
  }
  async updateSellerProfile(schoolId: string, id: string, data: Partial<SellerProfile>): Promise<SellerProfile> {
    const existing = await this.repo.getSellerProfile(schoolId, id);
    if (!existing) throw new EduOSSellerProfileError(id);
    return this.repo.updateSellerProfile(schoolId, id, data as any);
  }
  async deleteSellerProfile(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSellerProfile(schoolId, id);
    if (!existing) throw new EduOSSellerProfileError(id);
    return this.repo.deleteSellerProfile(schoolId, id);
  }
}

