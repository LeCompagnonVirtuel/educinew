import type { SupabaseClient } from '@supabase/supabase-js';
import type { FundingReport, FundingReportCreate } from '@educi/types';
import { GovFundingReportNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovFinanceFundingReportService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<FundingReport> {
    const item = await this.repo.findFundingReportById(schoolId, id);
    if (!item) throw new GovFundingReportNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<FundingReport[]> {
    return this.repo.findAllFundingReports(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<FundingReportCreate>): Promise<FundingReport> {
    return this.repo.createFundingReport(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<FundingReportCreate>): Promise<FundingReport> {
    const existing = await this.repo.findFundingReportById(schoolId, id);
    if (!existing) throw new GovFundingReportNotFoundError(id);
    return this.repo.updateFundingReport(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFundingReportById(schoolId, id);
    if (!existing) throw new GovFundingReportNotFoundError(id);
    return this.repo.deleteFundingReport(schoolId, id);
  }
}
