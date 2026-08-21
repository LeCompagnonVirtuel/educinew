// Government & National Governance Service - FundingComplianceChecking
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FundingComplianceChecking, FundingComplianceCheckingCreate } from '@educi/types';
import { GovFundingComplianceCheckingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovFundingComplianceCheckingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getFundingComplianceChecking(schoolId: string, id: string): Promise<FundingComplianceChecking> {
    const item = await this.repo.findFundingComplianceCheckingById(schoolId, id);
    if (!item) throw new GovFundingComplianceCheckingNotFoundError(id);
    return item;
  }

  async listFundingComplianceCheckings(schoolId: string, filters?: Record<string, unknown>): Promise<FundingComplianceChecking[]> {
    return this.repo.findAllFundingComplianceCheckings(schoolId, filters);
  }

  async createFundingComplianceChecking(schoolId: string, data: FundingComplianceCheckingCreate): Promise<FundingComplianceChecking> {
    return this.repo.createFundingComplianceChecking(schoolId, data);
  }

  async updateFundingComplianceChecking(schoolId: string, id: string, data: Partial<FundingComplianceCheckingCreate>): Promise<FundingComplianceChecking> {
    const existing = await this.repo.findFundingComplianceCheckingById(schoolId, id);
    if (!existing) throw new GovFundingComplianceCheckingNotFoundError(id);
    return this.repo.updateFundingComplianceChecking(schoolId, id, data);
  }

  async deleteFundingComplianceChecking(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFundingComplianceCheckingById(schoolId, id);
    if (!existing) throw new GovFundingComplianceCheckingNotFoundError(id);
    return this.repo.deleteFundingComplianceChecking(schoolId, id);
  }

  async countFundingComplianceCheckings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFundingComplianceCheckings(schoolId, filters);
  }
}
