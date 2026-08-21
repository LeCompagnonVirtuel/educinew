import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataQualityReport } from '@educi/types';
import { EduOSDataQualityReportError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDataQualityReportService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDataQualityReport(schoolId: string, id: string): Promise<DataQualityReport> {
    const item = await this.repo.getDataQualityReport(schoolId, id);
    if (!item) throw new EduOSDataQualityReportError(id);
    return item;
  }
  async listDataQualityReports(schoolId: string, filters?: Record<string, unknown>): Promise<DataQualityReport[]> {
    return this.repo.listDataQualityReports(schoolId, filters);
  }
  async createDataQualityReport(schoolId: string, data: Partial<DataQualityReport>): Promise<DataQualityReport> {
    return this.repo.createDataQualityReport(schoolId, data as any);
  }
  async updateDataQualityReport(schoolId: string, id: string, data: Partial<DataQualityReport>): Promise<DataQualityReport> {
    const existing = await this.repo.getDataQualityReport(schoolId, id);
    if (!existing) throw new EduOSDataQualityReportError(id);
    return this.repo.updateDataQualityReport(schoolId, id, data as any);
  }
  async deleteDataQualityReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDataQualityReport(schoolId, id);
    if (!existing) throw new EduOSDataQualityReportError(id);
    return this.repo.deleteDataQualityReport(schoolId, id);
  }
}

