// Government & National Governance Service - Country
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Country, CountryCreate } from '@educi/types';
import { GovCountryNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCountryService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCountry(schoolId: string, id: string): Promise<Country> {
    const item = await this.repo.findCountryById(schoolId, id);
    if (!item) throw new GovCountryNotFoundError(id);
    return item;
  }

  async listCountries(schoolId: string, filters?: Record<string, unknown>): Promise<Country[]> {
    return this.repo.findAllCountries(schoolId, filters);
  }

  async createCountry(schoolId: string, data: CountryCreate): Promise<Country> {
    return this.repo.createCountry(schoolId, data);
  }

  async updateCountry(schoolId: string, id: string, data: Partial<CountryCreate>): Promise<Country> {
    const existing = await this.repo.findCountryById(schoolId, id);
    if (!existing) throw new GovCountryNotFoundError(id);
    return this.repo.updateCountry(schoolId, id, data);
  }

  async deleteCountry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCountryById(schoolId, id);
    if (!existing) throw new GovCountryNotFoundError(id);
    return this.repo.deleteCountry(schoolId, id);
  }

  async countCountries(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCountries(schoolId, filters);
  }
}
