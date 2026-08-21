// Government & National Governance Service - BudgetAllocation
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { BudgetAllocation, BudgetAllocationCreate } from '@educi/types';
import { GovBudgetAllocationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovBudgetAllocationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getBudgetAllocation(schoolId: string, id: string): Promise<BudgetAllocation> {
    const item = await this.repo.findBudgetAllocationById(schoolId, id);
    if (!item) throw new GovBudgetAllocationNotFoundError(id);
    return item;
  }

  async listBudgetAllocations(schoolId: string, filters?: Record<string, unknown>): Promise<BudgetAllocation[]> {
    return this.repo.findAllBudgetAllocations(schoolId, filters);
  }

  async createBudgetAllocation(schoolId: string, data: BudgetAllocationCreate): Promise<BudgetAllocation> {
    return this.repo.createBudgetAllocation(schoolId, data);
  }

  async updateBudgetAllocation(schoolId: string, id: string, data: Partial<BudgetAllocationCreate>): Promise<BudgetAllocation> {
    const existing = await this.repo.findBudgetAllocationById(schoolId, id);
    if (!existing) throw new GovBudgetAllocationNotFoundError(id);
    return this.repo.updateBudgetAllocation(schoolId, id, data);
  }

  async deleteBudgetAllocation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBudgetAllocationById(schoolId, id);
    if (!existing) throw new GovBudgetAllocationNotFoundError(id);
    return this.repo.deleteBudgetAllocation(schoolId, id);
  }

  async countBudgetAllocations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBudgetAllocations(schoolId, filters);
  }
}
