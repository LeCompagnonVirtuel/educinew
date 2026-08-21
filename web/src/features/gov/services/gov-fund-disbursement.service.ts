// Government & National Governance Service - FundDisbursement
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FundDisbursement, FundDisbursementCreate } from '@educi/types';
import { GovFundDisbursementNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovFundDisbursementService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getFundDisbursement(schoolId: string, id: string): Promise<FundDisbursement> {
    const item = await this.repo.findFundDisbursementById(schoolId, id);
    if (!item) throw new GovFundDisbursementNotFoundError(id);
    return item;
  }

  async listFundDisbursements(schoolId: string, filters?: Record<string, unknown>): Promise<FundDisbursement[]> {
    return this.repo.findAllFundDisbursements(schoolId, filters);
  }

  async createFundDisbursement(schoolId: string, data: FundDisbursementCreate): Promise<FundDisbursement> {
    return this.repo.createFundDisbursement(schoolId, data);
  }

  async updateFundDisbursement(schoolId: string, id: string, data: Partial<FundDisbursementCreate>): Promise<FundDisbursement> {
    const existing = await this.repo.findFundDisbursementById(schoolId, id);
    if (!existing) throw new GovFundDisbursementNotFoundError(id);
    return this.repo.updateFundDisbursement(schoolId, id, data);
  }

  async deleteFundDisbursement(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFundDisbursementById(schoolId, id);
    if (!existing) throw new GovFundDisbursementNotFoundError(id);
    return this.repo.deleteFundDisbursement(schoolId, id);
  }

  async countFundDisbursements(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFundDisbursements(schoolId, filters);
  }
}
