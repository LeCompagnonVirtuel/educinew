// Government & National Governance Service - NetworkReport
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { NetworkReport, NetworkReportCreate } from '@educi/types';
import { GovNetworkReportNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovNetworkReportService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getNetworkReport(schoolId: string, id: string): Promise<NetworkReport> {
    const item = await this.repo.findNetworkReportById(schoolId, id);
    if (!item) throw new GovNetworkReportNotFoundError(id);
    return item;
  }

  async listNetworkReports(schoolId: string, filters?: Record<string, unknown>): Promise<NetworkReport[]> {
    return this.repo.findAllNetworkReports(schoolId, filters);
  }

  async createNetworkReport(schoolId: string, data: NetworkReportCreate): Promise<NetworkReport> {
    return this.repo.createNetworkReport(schoolId, data);
  }

  async updateNetworkReport(schoolId: string, id: string, data: Partial<NetworkReportCreate>): Promise<NetworkReport> {
    const existing = await this.repo.findNetworkReportById(schoolId, id);
    if (!existing) throw new GovNetworkReportNotFoundError(id);
    return this.repo.updateNetworkReport(schoolId, id, data);
  }

  async deleteNetworkReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNetworkReportById(schoolId, id);
    if (!existing) throw new GovNetworkReportNotFoundError(id);
    return this.repo.deleteNetworkReport(schoolId, id);
  }

  async countNetworkReports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNetworkReports(schoolId, filters);
  }
}
