// Government & National Governance Service - RegionAnalytics
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionAnalytics, RegionAnalyticsCreate } from '@educi/types';
import { GovRegionAnalyticsNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRegionAnalyticsService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getRegionAnalytics(schoolId: string, id: string): Promise<RegionAnalytics> {
    const item = await this.repo.findRegionAnalyticsById(schoolId, id);
    if (!item) throw new GovRegionAnalyticsNotFoundError(id);
    return item;
  }

  async listRegionAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<RegionAnalytics[]> {
    return this.repo.findAllRegionAnalytics(schoolId, filters);
  }

  async createRegionAnalytics(schoolId: string, data: RegionAnalyticsCreate): Promise<RegionAnalytics> {
    return this.repo.createRegionAnalytics(schoolId, data);
  }

  async updateRegionAnalytics(schoolId: string, id: string, data: Partial<RegionAnalyticsCreate>): Promise<RegionAnalytics> {
    const existing = await this.repo.findRegionAnalyticsById(schoolId, id);
    if (!existing) throw new GovRegionAnalyticsNotFoundError(id);
    return this.repo.updateRegionAnalytics(schoolId, id, data);
  }

  async deleteRegionAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRegionAnalyticsById(schoolId, id);
    if (!existing) throw new GovRegionAnalyticsNotFoundError(id);
    return this.repo.deleteRegionAnalytics(schoolId, id);
  }

  async countRegionAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRegionAnalytics(schoolId, filters);
  }
}
