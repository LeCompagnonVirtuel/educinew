// Government & National Governance Service - FundingReport
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FundingReport, FundingReportCreate } from '@educi/types';
import { GovFundingReportNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovFundingReportService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getFundingReport(schoolId: string, id: string): Promise<FundingReport> {
    const item = await this.repo.findFundingReportById(schoolId, id);
    if (!item) throw new GovFundingReportNotFoundError(id);
    return item;
  }

  async listFundingReports(schoolId: string, filters?: Record<string, unknown>): Promise<FundingReport[]> {
    return this.repo.findAllFundingReports(schoolId, filters);
  }

  async createFundingReport(schoolId: string, data: FundingReportCreate): Promise<FundingReport> {
    return this.repo.createFundingReport(schoolId, data);
  }

  async updateFundingReport(schoolId: string, id: string, data: Partial<FundingReportCreate>): Promise<FundingReport> {
    const existing = await this.repo.findFundingReportById(schoolId, id);
    if (!existing) throw new GovFundingReportNotFoundError(id);
    return this.repo.updateFundingReport(schoolId, id, data);
  }

  async deleteFundingReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFundingReportById(schoolId, id);
    if (!existing) throw new GovFundingReportNotFoundError(id);
    return this.repo.deleteFundingReport(schoolId, id);
  }

  async countFundingReports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFundingReports(schoolId, filters);
  }
}
