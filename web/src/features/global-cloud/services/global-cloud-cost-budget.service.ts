import type { SupabaseClient } from '@supabase/supabase-js';
import type { CostBudget } from '@educi/types';
import { EduCloudCostBudgetError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCostBudget {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCostBudget(schoolId: string, id: string): Promise<CostBudget> {
    const item = await this.repo.getCostBudget(schoolId, id);
    if (!item) throw new EduCloudCostBudgetError(id);
    return item;
  }
  async listCostBudgets(schoolId: string, filters?: Record<string, unknown>): Promise<CostBudget[]> {
    return this.repo.listCostBudget(schoolId, filters);
  }
  async createCostBudget(schoolId: string, data: Partial<CostBudget>): Promise<CostBudget> {
    return this.repo.createCostBudget(schoolId, data as any);
  }
  async updateCostBudget(schoolId: string, id: string, data: Partial<CostBudget>): Promise<CostBudget> {
    const existing = await this.repo.getCostBudget(schoolId, id);
    if (!existing) throw new EduCloudCostBudgetError(id);
    return this.repo.updateCostBudget(schoolId, id, data as any);
  }
  async deleteCostBudget(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCostBudget(schoolId, id);
    if (!existing) throw new EduCloudCostBudgetError(id);
    return this.repo.deleteCostBudget(schoolId, id);
  }
}
