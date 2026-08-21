import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionalReport, RegionalReportCreate } from '@educi/types';
import { GovRegionalReportNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRegistryRegionalReportService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<RegionalReport> {
    const item = await this.repo.findRegionalReportById(schoolId, id);
    if (!item) throw new GovRegionalReportNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<RegionalReport[]> {
    return this.repo.findAllRegionalReports(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<RegionalReportCreate>): Promise<RegionalReport> {
    return this.repo.createRegionalReport(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<RegionalReportCreate>): Promise<RegionalReport> {
    const existing = await this.repo.findRegionalReportById(schoolId, id);
    if (!existing) throw new GovRegionalReportNotFoundError(id);
    return this.repo.updateRegionalReport(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRegionalReportById(schoolId, id);
    if (!existing) throw new GovRegionalReportNotFoundError(id);
    return this.repo.deleteRegionalReport(schoolId, id);
  }
}
