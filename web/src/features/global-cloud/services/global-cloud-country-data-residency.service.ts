import type { SupabaseClient } from '@supabase/supabase-js';
import type { CountryDataResidency } from '@educi/types';
import { EduCloudCountryDataResidencyError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCountryDataResidency {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCountryDataResidency(schoolId: string, id: string): Promise<CountryDataResidency> {
    const item = await this.repo.getCountryDataResidency(schoolId, id);
    if (!item) throw new EduCloudCountryDataResidencyError(id);
    return item;
  }
  async listCountryDataResidencys(schoolId: string, filters?: Record<string, unknown>): Promise<CountryDataResidency[]> {
    return this.repo.listCountryDataResidency(schoolId, filters);
  }
  async createCountryDataResidency(schoolId: string, data: Partial<CountryDataResidency>): Promise<CountryDataResidency> {
    return this.repo.createCountryDataResidency(schoolId, data as any);
  }
  async updateCountryDataResidency(schoolId: string, id: string, data: Partial<CountryDataResidency>): Promise<CountryDataResidency> {
    const existing = await this.repo.getCountryDataResidency(schoolId, id);
    if (!existing) throw new EduCloudCountryDataResidencyError(id);
    return this.repo.updateCountryDataResidency(schoolId, id, data as any);
  }
  async deleteCountryDataResidency(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCountryDataResidency(schoolId, id);
    if (!existing) throw new EduCloudCountryDataResidencyError(id);
    return this.repo.deleteCountryDataResidency(schoolId, id);
  }
}
