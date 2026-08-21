// Government & National Governance Service - NetworkAnalytics
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { NetworkAnalytics, NetworkAnalyticsCreate } from '@educi/types';
import { GovNetworkAnalyticsNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovNetworkAnalyticsService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getNetworkAnalytics(schoolId: string, id: string): Promise<NetworkAnalytics> {
    const item = await this.repo.findNetworkAnalyticsById(schoolId, id);
    if (!item) throw new GovNetworkAnalyticsNotFoundError(id);
    return item;
  }

  async listNetworkAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<NetworkAnalytics[]> {
    return this.repo.findAllNetworkAnalytics(schoolId, filters);
  }

  async createNetworkAnalytics(schoolId: string, data: NetworkAnalyticsCreate): Promise<NetworkAnalytics> {
    return this.repo.createNetworkAnalytics(schoolId, data);
  }

  async updateNetworkAnalytics(schoolId: string, id: string, data: Partial<NetworkAnalyticsCreate>): Promise<NetworkAnalytics> {
    const existing = await this.repo.findNetworkAnalyticsById(schoolId, id);
    if (!existing) throw new GovNetworkAnalyticsNotFoundError(id);
    return this.repo.updateNetworkAnalytics(schoolId, id, data);
  }

  async deleteNetworkAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNetworkAnalyticsById(schoolId, id);
    if (!existing) throw new GovNetworkAnalyticsNotFoundError(id);
    return this.repo.deleteNetworkAnalytics(schoolId, id);
  }

  async countNetworkAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNetworkAnalytics(schoolId, filters);
  }
}
