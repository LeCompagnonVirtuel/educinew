// Government & National Governance Service - RegionalBudget
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionalBudget, RegionalBudgetCreate } from '@educi/types';
import { GovRegionalBudgetNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRegionalBudgetService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getRegionalBudget(schoolId: string, id: string): Promise<RegionalBudget> {
    const item = await this.repo.findRegionalBudgetById(schoolId, id);
    if (!item) throw new GovRegionalBudgetNotFoundError(id);
    return item;
  }

  async listRegionalBudgets(schoolId: string, filters?: Record<string, unknown>): Promise<RegionalBudget[]> {
    return this.repo.findAllRegionalBudgets(schoolId, filters);
  }

  async createRegionalBudget(schoolId: string, data: RegionalBudgetCreate): Promise<RegionalBudget> {
    return this.repo.createRegionalBudget(schoolId, data);
  }

  async updateRegionalBudget(schoolId: string, id: string, data: Partial<RegionalBudgetCreate>): Promise<RegionalBudget> {
    const existing = await this.repo.findRegionalBudgetById(schoolId, id);
    if (!existing) throw new GovRegionalBudgetNotFoundError(id);
    return this.repo.updateRegionalBudget(schoolId, id, data);
  }

  async deleteRegionalBudget(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRegionalBudgetById(schoolId, id);
    if (!existing) throw new GovRegionalBudgetNotFoundError(id);
    return this.repo.deleteRegionalBudget(schoolId, id);
  }

  async countRegionalBudgets(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRegionalBudgets(schoolId, filters);
  }
}
