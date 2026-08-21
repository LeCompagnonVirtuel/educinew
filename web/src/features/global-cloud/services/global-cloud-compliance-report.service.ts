import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceReport } from '@educi/types';
import { EduCloudComplianceReportError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudComplianceReport {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getComplianceReport(schoolId: string, id: string): Promise<ComplianceReport> {
    const item = await this.repo.getComplianceReport(schoolId, id);
    if (!item) throw new EduCloudComplianceReportError(id);
    return item;
  }
  async listComplianceReports(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceReport[]> {
    return this.repo.listComplianceReport(schoolId, filters);
  }
  async createComplianceReport(schoolId: string, data: Partial<ComplianceReport>): Promise<ComplianceReport> {
    return this.repo.createComplianceReport(schoolId, data as any);
  }
  async updateComplianceReport(schoolId: string, id: string, data: Partial<ComplianceReport>): Promise<ComplianceReport> {
    const existing = await this.repo.getComplianceReport(schoolId, id);
    if (!existing) throw new EduCloudComplianceReportError(id);
    return this.repo.updateComplianceReport(schoolId, id, data as any);
  }
  async deleteComplianceReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getComplianceReport(schoolId, id);
    if (!existing) throw new EduCloudComplianceReportError(id);
    return this.repo.deleteComplianceReport(schoolId, id);
  }
}
