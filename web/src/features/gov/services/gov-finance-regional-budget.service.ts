import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionalBudget, RegionalBudgetCreate } from '@educi/types';
import { GovRegionalBudgetNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovFinanceRegionalBudgetService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<RegionalBudget> {
    const item = await this.repo.findRegionalBudgetById(schoolId, id);
    if (!item) throw new GovRegionalBudgetNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<RegionalBudget[]> {
    return this.repo.findAllRegionalBudgets(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<RegionalBudgetCreate>): Promise<RegionalBudget> {
    return this.repo.createRegionalBudget(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<RegionalBudgetCreate>): Promise<RegionalBudget> {
    const existing = await this.repo.findRegionalBudgetById(schoolId, id);
    if (!existing) throw new GovRegionalBudgetNotFoundError(id);
    return this.repo.updateRegionalBudget(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRegionalBudgetById(schoolId, id);
    if (!existing) throw new GovRegionalBudgetNotFoundError(id);
    return this.repo.deleteRegionalBudget(schoolId, id);
  }
}
