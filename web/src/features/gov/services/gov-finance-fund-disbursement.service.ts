import type { SupabaseClient } from '@supabase/supabase-js';
import type { FundDisbursement, FundDisbursementCreate } from '@educi/types';
import { GovFundDisbursementNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovFinanceFundDisbursementService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<FundDisbursement> {
    const item = await this.repo.findFundDisbursementById(schoolId, id);
    if (!item) throw new GovFundDisbursementNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<FundDisbursement[]> {
    return this.repo.findAllFundDisbursements(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<FundDisbursementCreate>): Promise<FundDisbursement> {
    return this.repo.createFundDisbursement(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<FundDisbursementCreate>): Promise<FundDisbursement> {
    const existing = await this.repo.findFundDisbursementById(schoolId, id);
    if (!existing) throw new GovFundDisbursementNotFoundError(id);
    return this.repo.updateFundDisbursement(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFundDisbursementById(schoolId, id);
    if (!existing) throw new GovFundDisbursementNotFoundError(id);
    return this.repo.deleteFundDisbursement(schoolId, id);
  }
}
