import type { SupabaseClient } from '@supabase/supabase-js';
import type { BudgetAnalytic, BudgetAnalyticCreate } from '@educi/types';
import { GovBudgetAnalyticNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAnalyticsBudgetAnalyticService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<BudgetAnalytic> {
    const item = await this.repo.findBudgetAnalyticById(schoolId, id);
    if (!item) throw new GovBudgetAnalyticNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<BudgetAnalytic[]> {
    return this.repo.findAllBudgetAnalytics(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<BudgetAnalyticCreate>): Promise<BudgetAnalytic> {
    return this.repo.createBudgetAnalytic(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<BudgetAnalyticCreate>): Promise<BudgetAnalytic> {
    const existing = await this.repo.findBudgetAnalyticById(schoolId, id);
    if (!existing) throw new GovBudgetAnalyticNotFoundError(id);
    return this.repo.updateBudgetAnalytic(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBudgetAnalyticById(schoolId, id);
    if (!existing) throw new GovBudgetAnalyticNotFoundError(id);
    return this.repo.deleteBudgetAnalytic(schoolId, id);
  }
}
