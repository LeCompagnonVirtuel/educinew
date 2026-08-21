import type { SupabaseClient } from '@supabase/supabase-js';
import type { Country, CountryCreate } from '@educi/types';
import { GovCountryNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovOpendataCountryService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<Country> {
    const item = await this.repo.findCountryById(schoolId, id);
    if (!item) throw new GovCountryNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<Country[]> {
    return this.repo.findAllCountries(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<CountryCreate>): Promise<Country> {
    return this.repo.createCountry(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<CountryCreate>): Promise<Country> {
    const existing = await this.repo.findCountryById(schoolId, id);
    if (!existing) throw new GovCountryNotFoundError(id);
    return this.repo.updateCountry(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCountryById(schoolId, id);
    if (!existing) throw new GovCountryNotFoundError(id);
    return this.repo.deleteCountry(schoolId, id);
  }
}
