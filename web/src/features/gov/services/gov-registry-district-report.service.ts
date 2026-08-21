import type { SupabaseClient } from '@supabase/supabase-js';
import type { DistrictReport, DistrictReportCreate } from '@educi/types';
import { GovDistrictReportNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRegistryDistrictReportService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<DistrictReport> {
    const item = await this.repo.findDistrictReportById(schoolId, id);
    if (!item) throw new GovDistrictReportNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<DistrictReport[]> {
    return this.repo.findAllDistrictReports(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<DistrictReportCreate>): Promise<DistrictReport> {
    return this.repo.createDistrictReport(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<DistrictReportCreate>): Promise<DistrictReport> {
    const existing = await this.repo.findDistrictReportById(schoolId, id);
    if (!existing) throw new GovDistrictReportNotFoundError(id);
    return this.repo.updateDistrictReport(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDistrictReportById(schoolId, id);
    if (!existing) throw new GovDistrictReportNotFoundError(id);
    return this.repo.deleteDistrictReport(schoolId, id);
  }
}
