// Government & National Governance Service - FundingAllocation
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FundingAllocation, FundingAllocationCreate } from '@educi/types';
import { GovFundingAllocationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovFundingAllocationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getFundingAllocation(schoolId: string, id: string): Promise<FundingAllocation> {
    const item = await this.repo.findFundingAllocationById(schoolId, id);
    if (!item) throw new GovFundingAllocationNotFoundError(id);
    return item;
  }

  async listFundingAllocations(schoolId: string, filters?: Record<string, unknown>): Promise<FundingAllocation[]> {
    return this.repo.findAllFundingAllocations(schoolId, filters);
  }

  async createFundingAllocation(schoolId: string, data: FundingAllocationCreate): Promise<FundingAllocation> {
    return this.repo.createFundingAllocation(schoolId, data);
  }

  async updateFundingAllocation(schoolId: string, id: string, data: Partial<FundingAllocationCreate>): Promise<FundingAllocation> {
    const existing = await this.repo.findFundingAllocationById(schoolId, id);
    if (!existing) throw new GovFundingAllocationNotFoundError(id);
    return this.repo.updateFundingAllocation(schoolId, id, data);
  }

  async deleteFundingAllocation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFundingAllocationById(schoolId, id);
    if (!existing) throw new GovFundingAllocationNotFoundError(id);
    return this.repo.deleteFundingAllocation(schoolId, id);
  }

  async countFundingAllocations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFundingAllocations(schoolId, filters);
  }
}
