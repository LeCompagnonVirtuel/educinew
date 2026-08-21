import type { SupabaseClient } from '@supabase/supabase-js';
import type { EnvironmentalReport, EnvironmentalReportCreate } from '@educi/types';
import { ScEnvironmentalReportNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScEnvironmentalReportService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getReport(schoolId: string, id: string): Promise<EnvironmentalReport> {
    const report = await this.repo.findEnvironmentalReportById(schoolId, id);
    if (!report) throw new ScEnvironmentalReportNotFoundError(id);
    return report;
  }

  async listReports(schoolId: string, filters?: Record<string, unknown>): Promise<EnvironmentalReport[]> {
    return this.repo.findAllEnvironmentalReports(schoolId, filters);
  }

  async createReport(schoolId: string, data: EnvironmentalReportCreate): Promise<EnvironmentalReport> {
    return this.repo.createEnvironmentalReport(schoolId, data);
  }

  async updateReport(schoolId: string, id: string, data: Partial<EnvironmentalReportCreate>): Promise<EnvironmentalReport> {
    const existing = await this.repo.findEnvironmentalReportById(schoolId, id);
    if (!existing) throw new ScEnvironmentalReportNotFoundError(id);
    return this.repo.updateEnvironmentalReport(schoolId, id, data);
  }

  async deleteReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEnvironmentalReportById(schoolId, id);
    if (!existing) throw new ScEnvironmentalReportNotFoundError(id);
    return this.repo.deleteEnvironmentalReport(schoolId, id);
  }

  async countReports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEnvironmentalReports(schoolId, filters);
  }
}
