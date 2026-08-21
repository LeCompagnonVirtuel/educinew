import type { SupabaseClient } from '@supabase/supabase-js';
import type { Currency, CurrencyCreate } from '@educi/types';
import { GovCurrencyNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovOpendataCurrencyService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<Currency> {
    const item = await this.repo.findCurrencyById(schoolId, id);
    if (!item) throw new GovCurrencyNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<Currency[]> {
    return this.repo.findAllCurrencies(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<CurrencyCreate>): Promise<Currency> {
    return this.repo.createCurrency(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<CurrencyCreate>): Promise<Currency> {
    const existing = await this.repo.findCurrencyById(schoolId, id);
    if (!existing) throw new GovCurrencyNotFoundError(id);
    return this.repo.updateCurrency(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCurrencyById(schoolId, id);
    if (!existing) throw new GovCurrencyNotFoundError(id);
    return this.repo.deleteCurrency(schoolId, id);
  }
}
