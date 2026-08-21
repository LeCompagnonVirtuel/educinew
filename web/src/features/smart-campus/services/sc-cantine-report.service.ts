import type { SupabaseClient } from '@supabase/supabase-js';
import { ScMenuNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScCantineReportService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getReport(schoolId: string, id: string): Promise<Record<string, unknown>> {
    const report = await this.repo.findCantineReportById(schoolId, id);
    if (!report) throw new ScMenuNotFoundError(id);
    return report;
  }

  async listReports(schoolId: string, filters?: Record<string, unknown>): Promise<Record<string, unknown>[]> {
    return this.repo.findAllCantineReports(schoolId, filters);
  }

  async generateDailyReport(schoolId: string, date: string): Promise<Record<string, unknown>> {
    return this.repo.generateCantineDailyReport(schoolId, date);
  }

  async generateWeeklyReport(schoolId: string, weekNumber: number, year: number): Promise<Record<string, unknown>> {
    return this.repo.generateCantineWeeklyReport(schoolId, weekNumber, year);
  }

  async deleteReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCantineReportById(schoolId, id);
    if (!existing) throw new ScMenuNotFoundError(id);
    return this.repo.deleteCantineReport(schoolId, id);
  }

  async countReports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCantineReports(schoolId, filters);
  }
}
