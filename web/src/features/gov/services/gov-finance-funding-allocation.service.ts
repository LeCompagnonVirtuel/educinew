import type { SupabaseClient } from '@supabase/supabase-js';
import type { FundingAllocation, FundingAllocationCreate } from '@educi/types';
import { GovFundingAllocationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovFinanceFundingAllocationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<FundingAllocation> {
    const item = await this.repo.findFundingAllocationById(schoolId, id);
    if (!item) throw new GovFundingAllocationNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<FundingAllocation[]> {
    return this.repo.findAllFundingAllocations(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<FundingAllocationCreate>): Promise<FundingAllocation> {
    return this.repo.createFundingAllocation(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<FundingAllocationCreate>): Promise<FundingAllocation> {
    const existing = await this.repo.findFundingAllocationById(schoolId, id);
    if (!existing) throw new GovFundingAllocationNotFoundError(id);
    return this.repo.updateFundingAllocation(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFundingAllocationById(schoolId, id);
    if (!existing) throw new GovFundingAllocationNotFoundError(id);
    return this.repo.deleteFundingAllocation(schoolId, id);
  }
}
