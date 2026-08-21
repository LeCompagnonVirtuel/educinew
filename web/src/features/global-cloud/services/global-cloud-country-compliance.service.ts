import type { SupabaseClient } from '@supabase/supabase-js';
import type { CountryCompliance } from '@educi/types';
import { EduCloudCountryComplianceError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCountryCompliance {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCountryCompliance(schoolId: string, id: string): Promise<CountryCompliance> {
    const item = await this.repo.getCountryCompliance(schoolId, id);
    if (!item) throw new EduCloudCountryComplianceError(id);
    return item;
  }
  async listCountryCompliances(schoolId: string, filters?: Record<string, unknown>): Promise<CountryCompliance[]> {
    return this.repo.listCountryCompliance(schoolId, filters);
  }
  async createCountryCompliance(schoolId: string, data: Partial<CountryCompliance>): Promise<CountryCompliance> {
    return this.repo.createCountryCompliance(schoolId, data as any);
  }
  async updateCountryCompliance(schoolId: string, id: string, data: Partial<CountryCompliance>): Promise<CountryCompliance> {
    const existing = await this.repo.getCountryCompliance(schoolId, id);
    if (!existing) throw new EduCloudCountryComplianceError(id);
    return this.repo.updateCountryCompliance(schoolId, id, data as any);
  }
  async deleteCountryCompliance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCountryCompliance(schoolId, id);
    if (!existing) throw new EduCloudCountryComplianceError(id);
    return this.repo.deleteCountryCompliance(schoolId, id);
  }
}
