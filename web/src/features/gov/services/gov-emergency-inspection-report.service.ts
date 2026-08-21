import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionReport, InspectionReportCreate } from '@educi/types';
import { GovInspectionReportNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEmergencyInspectionReportService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<InspectionReport> {
    const item = await this.repo.findInspectionReportById(schoolId, id);
    if (!item) throw new GovInspectionReportNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionReport[]> {
    return this.repo.findAllInspectionReports(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<InspectionReportCreate>): Promise<InspectionReport> {
    return this.repo.createInspectionReport(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<InspectionReportCreate>): Promise<InspectionReport> {
    const existing = await this.repo.findInspectionReportById(schoolId, id);
    if (!existing) throw new GovInspectionReportNotFoundError(id);
    return this.repo.updateInspectionReport(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionReportById(schoolId, id);
    if (!existing) throw new GovInspectionReportNotFoundError(id);
    return this.repo.deleteInspectionReport(schoolId, id);
  }
}
