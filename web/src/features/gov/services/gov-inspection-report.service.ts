// Government & National Governance Service - InspectionReport
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionReport, InspectionReportCreate } from '@educi/types';
import { GovInspectionReportNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInspectionReportService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInspectionReport(schoolId: string, id: string): Promise<InspectionReport> {
    const item = await this.repo.findInspectionReportById(schoolId, id);
    if (!item) throw new GovInspectionReportNotFoundError(id);
    return item;
  }

  async listInspectionReports(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionReport[]> {
    return this.repo.findAllInspectionReports(schoolId, filters);
  }

  async createInspectionReport(schoolId: string, data: InspectionReportCreate): Promise<InspectionReport> {
    return this.repo.createInspectionReport(schoolId, data);
  }

  async updateInspectionReport(schoolId: string, id: string, data: Partial<InspectionReportCreate>): Promise<InspectionReport> {
    const existing = await this.repo.findInspectionReportById(schoolId, id);
    if (!existing) throw new GovInspectionReportNotFoundError(id);
    return this.repo.updateInspectionReport(schoolId, id, data);
  }

  async deleteInspectionReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionReportById(schoolId, id);
    if (!existing) throw new GovInspectionReportNotFoundError(id);
    return this.repo.deleteInspectionReport(schoolId, id);
  }

  async countInspectionReports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInspectionReports(schoolId, filters);
  }
}
