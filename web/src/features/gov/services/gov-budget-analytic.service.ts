// Government & National Governance Service - BudgetAnalytic
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { BudgetAnalytic, BudgetAnalyticCreate } from '@educi/types';
import { GovBudgetAnalyticNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovBudgetAnalyticService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getBudgetAnalytic(schoolId: string, id: string): Promise<BudgetAnalytic> {
    const item = await this.repo.findBudgetAnalyticById(schoolId, id);
    if (!item) throw new GovBudgetAnalyticNotFoundError(id);
    return item;
  }

  async listBudgetAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<BudgetAnalytic[]> {
    return this.repo.findAllBudgetAnalytics(schoolId, filters);
  }

  async createBudgetAnalytic(schoolId: string, data: BudgetAnalyticCreate): Promise<BudgetAnalytic> {
    return this.repo.createBudgetAnalytic(schoolId, data);
  }

  async updateBudgetAnalytic(schoolId: string, id: string, data: Partial<BudgetAnalyticCreate>): Promise<BudgetAnalytic> {
    const existing = await this.repo.findBudgetAnalyticById(schoolId, id);
    if (!existing) throw new GovBudgetAnalyticNotFoundError(id);
    return this.repo.updateBudgetAnalytic(schoolId, id, data);
  }

  async deleteBudgetAnalytic(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBudgetAnalyticById(schoolId, id);
    if (!existing) throw new GovBudgetAnalyticNotFoundError(id);
    return this.repo.deleteBudgetAnalytic(schoolId, id);
  }

  async countBudgetAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBudgetAnalytics(schoolId, filters);
  }
}
