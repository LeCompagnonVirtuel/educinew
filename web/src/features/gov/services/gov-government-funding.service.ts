// Government & National Governance Service - GovernmentFunding
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { GovernmentFunding, GovernmentFundingCreate } from '@educi/types';
import { GovGovernmentFundingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovGovernmentFundingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getGovernmentFunding(schoolId: string, id: string): Promise<GovernmentFunding> {
    const item = await this.repo.findGovernmentFundingById(schoolId, id);
    if (!item) throw new GovGovernmentFundingNotFoundError(id);
    return item;
  }

  async listGovernmentFundings(schoolId: string, filters?: Record<string, unknown>): Promise<GovernmentFunding[]> {
    return this.repo.findAllGovernmentFundings(schoolId, filters);
  }

  async createGovernmentFunding(schoolId: string, data: GovernmentFundingCreate): Promise<GovernmentFunding> {
    return this.repo.createGovernmentFunding(schoolId, data);
  }

  async updateGovernmentFunding(schoolId: string, id: string, data: Partial<GovernmentFundingCreate>): Promise<GovernmentFunding> {
    const existing = await this.repo.findGovernmentFundingById(schoolId, id);
    if (!existing) throw new GovGovernmentFundingNotFoundError(id);
    return this.repo.updateGovernmentFunding(schoolId, id, data);
  }

  async deleteGovernmentFunding(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGovernmentFundingById(schoolId, id);
    if (!existing) throw new GovGovernmentFundingNotFoundError(id);
    return this.repo.deleteGovernmentFunding(schoolId, id);
  }

  async countGovernmentFundings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countGovernmentFundings(schoolId, filters);
  }
}
