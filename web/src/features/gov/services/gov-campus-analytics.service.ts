// Government & National Governance Service - CampusAnalytics
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CampusAnalytics, CampusAnalyticsCreate } from '@educi/types';
import { GovCampusAnalyticsNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCampusAnalyticsService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCampusAnalytics(schoolId: string, id: string): Promise<CampusAnalytics> {
    const item = await this.repo.findCampusAnalyticsById(schoolId, id);
    if (!item) throw new GovCampusAnalyticsNotFoundError(id);
    return item;
  }

  async listCampusAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<CampusAnalytics[]> {
    return this.repo.findAllCampusAnalytics(schoolId, filters);
  }

  async createCampusAnalytics(schoolId: string, data: CampusAnalyticsCreate): Promise<CampusAnalytics> {
    return this.repo.createCampusAnalytics(schoolId, data);
  }

  async updateCampusAnalytics(schoolId: string, id: string, data: Partial<CampusAnalyticsCreate>): Promise<CampusAnalytics> {
    const existing = await this.repo.findCampusAnalyticsById(schoolId, id);
    if (!existing) throw new GovCampusAnalyticsNotFoundError(id);
    return this.repo.updateCampusAnalytics(schoolId, id, data);
  }

  async deleteCampusAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCampusAnalyticsById(schoolId, id);
    if (!existing) throw new GovCampusAnalyticsNotFoundError(id);
    return this.repo.deleteCampusAnalytics(schoolId, id);
  }

  async countCampusAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCampusAnalytics(schoolId, filters);
  }
}
