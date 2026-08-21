import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceReport, ComplianceReportCreate } from '@educi/types';
import { GovComplianceReportNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovObservatoryComplianceReportService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<ComplianceReport> {
    const item = await this.repo.findComplianceReportById(schoolId, id);
    if (!item) throw new GovComplianceReportNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceReport[]> {
    return this.repo.findAllComplianceReports(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<ComplianceReportCreate>): Promise<ComplianceReport> {
    return this.repo.createComplianceReport(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<ComplianceReportCreate>): Promise<ComplianceReport> {
    const existing = await this.repo.findComplianceReportById(schoolId, id);
    if (!existing) throw new GovComplianceReportNotFoundError(id);
    return this.repo.updateComplianceReport(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceReportById(schoolId, id);
    if (!existing) throw new GovComplianceReportNotFoundError(id);
    return this.repo.deleteComplianceReport(schoolId, id);
  }
}
