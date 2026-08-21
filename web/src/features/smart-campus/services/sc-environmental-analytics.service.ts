import type { SupabaseClient } from '@supabase/supabase-js';
import type { EnvironmentalReport, EnvironmentalReportCreate } from '@educi/types';
import { ScEnvironmentalReportNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScEnvironmentalAnalyticsService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getReport(schoolId: string, id: string): Promise<EnvironmentalReport> {
    const report = await this.repo.findEnvironmentalReportById(schoolId, id);
    if (!report) throw new ScEnvironmentalReportNotFoundError(id);
    return report;
  }

  async listReports(schoolId: string): Promise<EnvironmentalReport[]> {
    return this.repo.findAllEnvironmentalReports(schoolId);
  }

  async createReport(schoolId: string, data: EnvironmentalReportCreate): Promise<EnvironmentalReport> {
    return this.repo.createEnvironmentalReport(schoolId, data);
  }

  async generateMonthly(schoolId: string, month: number, year: number): Promise<EnvironmentalReport> {
    return this.repo.generateMonthlyEnvironmentalReport(schoolId, month, year);
  }

  async generateAnnual(schoolId: string, year: number): Promise<EnvironmentalReport> {
    return this.repo.generateAnnualEnvironmentalReport(schoolId, year);
  }

  async approveReport(schoolId: string, id: string, approvedBy: string): Promise<EnvironmentalReport> {
    const existing = await this.repo.findEnvironmentalReportById(schoolId, id);
    if (!existing) throw new ScEnvironmentalReportNotFoundError(id);
    return this.repo.approveEnvironmentalReport(schoolId, id, approvedBy);
  }

  async getLatestByType(schoolId: string, type: string): Promise<EnvironmentalReport | null> {
    return this.repo.getLatestEnvironmentalReport(schoolId, type);
  }

  async deleteReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEnvironmentalReportById(schoolId, id);
    if (!existing) throw new ScEnvironmentalReportNotFoundError(id);
    return this.repo.deleteEnvironmentalReport(schoolId, id);
  }
}
