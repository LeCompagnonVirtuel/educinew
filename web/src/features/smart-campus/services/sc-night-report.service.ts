import type { SupabaseClient } from '@supabase/supabase-js';
import type { NightReport, NightReportCreate } from '@educi/types';
import { ScNightReportNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScNightReportService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getReport(schoolId: string, id: string): Promise<NightReport> {
    const report = await this.repo.findNightReportById(schoolId, id);
    if (!report) throw new ScNightReportNotFoundError(id);
    return report;
  }

  async listReports(schoolId: string, filters?: Record<string, unknown>): Promise<NightReport[]> {
    return this.repo.findAllNightReports(schoolId, filters);
  }

  async createReport(schoolId: string, data: NightReportCreate): Promise<NightReport> {
    return this.repo.createNightReport(schoolId, data);
  }

  async updateReport(schoolId: string, id: string, data: Partial<NightReportCreate>): Promise<NightReport> {
    const existing = await this.repo.findNightReportById(schoolId, id);
    if (!existing) throw new ScNightReportNotFoundError(id);
    return this.repo.updateNightReport(schoolId, id, data);
  }

  async deleteReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNightReportById(schoolId, id);
    if (!existing) throw new ScNightReportNotFoundError(id);
    return this.repo.deleteNightReport(schoolId, id);
  }

  async countReports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNightReports(schoolId, filters);
  }
}
