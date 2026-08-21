// Government & National Governance Service - ComplianceReport
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceReport, ComplianceReportCreate } from '@educi/types';
import { GovComplianceReportNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovComplianceReportService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getComplianceReport(schoolId: string, id: string): Promise<ComplianceReport> {
    const item = await this.repo.findComplianceReportById(schoolId, id);
    if (!item) throw new GovComplianceReportNotFoundError(id);
    return item;
  }

  async listComplianceReports(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceReport[]> {
    return this.repo.findAllComplianceReports(schoolId, filters);
  }

  async createComplianceReport(schoolId: string, data: ComplianceReportCreate): Promise<ComplianceReport> {
    return this.repo.createComplianceReport(schoolId, data);
  }

  async updateComplianceReport(schoolId: string, id: string, data: Partial<ComplianceReportCreate>): Promise<ComplianceReport> {
    const existing = await this.repo.findComplianceReportById(schoolId, id);
    if (!existing) throw new GovComplianceReportNotFoundError(id);
    return this.repo.updateComplianceReport(schoolId, id, data);
  }

  async deleteComplianceReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceReportById(schoolId, id);
    if (!existing) throw new GovComplianceReportNotFoundError(id);
    return this.repo.deleteComplianceReport(schoolId, id);
  }

  async countComplianceReports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countComplianceReports(schoolId, filters);
  }
}
