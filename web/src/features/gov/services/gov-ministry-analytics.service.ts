// Government & National Governance Service - MinistryAnalytics
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { MinistryAnalytics, MinistryAnalyticsCreate } from '@educi/types';
import { GovMinistryAnalyticsNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryAnalyticsService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getMinistryAnalytics(schoolId: string, id: string): Promise<MinistryAnalytics> {
    const item = await this.repo.findMinistryAnalyticsById(schoolId, id);
    if (!item) throw new GovMinistryAnalyticsNotFoundError(id);
    return item;
  }

  async listMinistryAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<MinistryAnalytics[]> {
    return this.repo.findAllMinistryAnalytics(schoolId, filters);
  }

  async createMinistryAnalytics(schoolId: string, data: MinistryAnalyticsCreate): Promise<MinistryAnalytics> {
    return this.repo.createMinistryAnalytics(schoolId, data);
  }

  async updateMinistryAnalytics(schoolId: string, id: string, data: Partial<MinistryAnalyticsCreate>): Promise<MinistryAnalytics> {
    const existing = await this.repo.findMinistryAnalyticsById(schoolId, id);
    if (!existing) throw new GovMinistryAnalyticsNotFoundError(id);
    return this.repo.updateMinistryAnalytics(schoolId, id, data);
  }

  async deleteMinistryAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMinistryAnalyticsById(schoolId, id);
    if (!existing) throw new GovMinistryAnalyticsNotFoundError(id);
    return this.repo.deleteMinistryAnalytics(schoolId, id);
  }

  async countMinistryAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMinistryAnalytics(schoolId, filters);
  }
}
