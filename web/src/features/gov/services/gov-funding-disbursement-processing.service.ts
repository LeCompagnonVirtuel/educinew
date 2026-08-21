// Government & National Governance Service - FundingDisbursementProcessing
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FundingDisbursementProcessing, FundingDisbursementProcessingCreate } from '@educi/types';
import { GovFundingDisbursementProcessingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovFundingDisbursementProcessingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getFundingDisbursementProcessing(schoolId: string, id: string): Promise<FundingDisbursementProcessing> {
    const item = await this.repo.findFundingDisbursementProcessingById(schoolId, id);
    if (!item) throw new GovFundingDisbursementProcessingNotFoundError(id);
    return item;
  }

  async listFundingDisbursementProcessings(schoolId: string, filters?: Record<string, unknown>): Promise<FundingDisbursementProcessing[]> {
    return this.repo.findAllFundingDisbursementProcessings(schoolId, filters);
  }

  async createFundingDisbursementProcessing(schoolId: string, data: FundingDisbursementProcessingCreate): Promise<FundingDisbursementProcessing> {
    return this.repo.createFundingDisbursementProcessing(schoolId, data);
  }

  async updateFundingDisbursementProcessing(schoolId: string, id: string, data: Partial<FundingDisbursementProcessingCreate>): Promise<FundingDisbursementProcessing> {
    const existing = await this.repo.findFundingDisbursementProcessingById(schoolId, id);
    if (!existing) throw new GovFundingDisbursementProcessingNotFoundError(id);
    return this.repo.updateFundingDisbursementProcessing(schoolId, id, data);
  }

  async deleteFundingDisbursementProcessing(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFundingDisbursementProcessingById(schoolId, id);
    if (!existing) throw new GovFundingDisbursementProcessingNotFoundError(id);
    return this.repo.deleteFundingDisbursementProcessing(schoolId, id);
  }

  async countFundingDisbursementProcessings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFundingDisbursementProcessings(schoolId, filters);
  }
}
