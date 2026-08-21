import type { SupabaseClient } from '@supabase/supabase-js';
import type { HealthReport, HealthReportCreate } from '@educi/types';
import { ScHealthReportNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScHealthReportService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getReport(schoolId: string, id: string): Promise<HealthReport> {
    const report = await this.repo.findHealthReportById(schoolId, id);
    if (!report) throw new ScHealthReportNotFoundError(id);
    return report;
  }

  async listReports(schoolId: string, filters?: Record<string, unknown>): Promise<HealthReport[]> {
    return this.repo.findAllHealthReports(schoolId, filters);
  }

  async createReport(schoolId: string, data: HealthReportCreate): Promise<HealthReport> {
    return this.repo.createHealthReport(schoolId, data);
  }

  async updateReport(schoolId: string, id: string, data: Partial<HealthReportCreate>): Promise<HealthReport> {
    const existing = await this.repo.findHealthReportById(schoolId, id);
    if (!existing) throw new ScHealthReportNotFoundError(id);
    return this.repo.updateHealthReport(schoolId, id, data);
  }

  async deleteReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findHealthReportById(schoolId, id);
    if (!existing) throw new ScHealthReportNotFoundError(id);
    return this.repo.deleteHealthReport(schoolId, id);
  }

  async countReports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countHealthReports(schoolId, filters);
  }
}
