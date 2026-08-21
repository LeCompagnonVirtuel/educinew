// Government & National Governance Service - FundingAllocationOptimization
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FundingAllocationOptimization, FundingAllocationOptimizationCreate } from '@educi/types';
import { GovFundingAllocationOptimizationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovFundingAllocationOptimizationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getFundingAllocationOptimization(schoolId: string, id: string): Promise<FundingAllocationOptimization> {
    const item = await this.repo.findFundingAllocationOptimizationById(schoolId, id);
    if (!item) throw new GovFundingAllocationOptimizationNotFoundError(id);
    return item;
  }

  async listFundingAllocationOptimizations(schoolId: string, filters?: Record<string, unknown>): Promise<FundingAllocationOptimization[]> {
    return this.repo.findAllFundingAllocationOptimizations(schoolId, filters);
  }

  async createFundingAllocationOptimization(schoolId: string, data: FundingAllocationOptimizationCreate): Promise<FundingAllocationOptimization> {
    return this.repo.createFundingAllocationOptimization(schoolId, data);
  }

  async updateFundingAllocationOptimization(schoolId: string, id: string, data: Partial<FundingAllocationOptimizationCreate>): Promise<FundingAllocationOptimization> {
    const existing = await this.repo.findFundingAllocationOptimizationById(schoolId, id);
    if (!existing) throw new GovFundingAllocationOptimizationNotFoundError(id);
    return this.repo.updateFundingAllocationOptimization(schoolId, id, data);
  }

  async deleteFundingAllocationOptimization(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFundingAllocationOptimizationById(schoolId, id);
    if (!existing) throw new GovFundingAllocationOptimizationNotFoundError(id);
    return this.repo.deleteFundingAllocationOptimization(schoolId, id);
  }

  async countFundingAllocationOptimizations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFundingAllocationOptimizations(schoolId, filters);
  }
}
