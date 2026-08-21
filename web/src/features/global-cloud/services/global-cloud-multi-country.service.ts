import type { SupabaseClient } from '@supabase/supabase-js';
import type { MultiCountry } from '@educi/types';
import { EduCloudMultiCountryError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudMultiCountry {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getMultiCountry(schoolId: string, id: string): Promise<MultiCountry> {
    const item = await this.repo.getMultiCountry(schoolId, id);
    if (!item) throw new EduCloudMultiCountryError(id);
    return item;
  }
  async listMultiCountrys(schoolId: string, filters?: Record<string, unknown>): Promise<MultiCountry[]> {
    return this.repo.listMultiCountry(schoolId, filters);
  }
  async createMultiCountry(schoolId: string, data: Partial<MultiCountry>): Promise<MultiCountry> {
    return this.repo.createMultiCountry(schoolId, data as any);
  }
  async updateMultiCountry(schoolId: string, id: string, data: Partial<MultiCountry>): Promise<MultiCountry> {
    const existing = await this.repo.getMultiCountry(schoolId, id);
    if (!existing) throw new EduCloudMultiCountryError(id);
    return this.repo.updateMultiCountry(schoolId, id, data as any);
  }
  async deleteMultiCountry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMultiCountry(schoolId, id);
    if (!existing) throw new EduCloudMultiCountryError(id);
    return this.repo.deleteMultiCountry(schoolId, id);
  }
}
