// Government & National Governance Service - NetworkReporting
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { NetworkReporting, NetworkReportingCreate } from '@educi/types';
import { GovNetworkReportingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovNetworkReportingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getNetworkReporting(schoolId: string, id: string): Promise<NetworkReporting> {
    const item = await this.repo.findNetworkReportingById(schoolId, id);
    if (!item) throw new GovNetworkReportingNotFoundError(id);
    return item;
  }

  async listNetworkReportings(schoolId: string, filters?: Record<string, unknown>): Promise<NetworkReporting[]> {
    return this.repo.findAllNetworkReportings(schoolId, filters);
  }

  async createNetworkReporting(schoolId: string, data: NetworkReportingCreate): Promise<NetworkReporting> {
    return this.repo.createNetworkReporting(schoolId, data);
  }

  async updateNetworkReporting(schoolId: string, id: string, data: Partial<NetworkReportingCreate>): Promise<NetworkReporting> {
    const existing = await this.repo.findNetworkReportingById(schoolId, id);
    if (!existing) throw new GovNetworkReportingNotFoundError(id);
    return this.repo.updateNetworkReporting(schoolId, id, data);
  }

  async deleteNetworkReporting(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNetworkReportingById(schoolId, id);
    if (!existing) throw new GovNetworkReportingNotFoundError(id);
    return this.repo.deleteNetworkReporting(schoolId, id);
  }

  async countNetworkReportings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNetworkReportings(schoolId, filters);
  }
}
