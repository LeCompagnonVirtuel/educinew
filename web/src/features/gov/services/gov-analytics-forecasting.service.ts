// Government & National Governance Service - AnalyticsForecasting
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AnalyticsForecasting, AnalyticsForecastingCreate } from '@educi/types';
import { GovAnalyticsForecastingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAnalyticsForecastingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAnalyticsForecasting(schoolId: string, id: string): Promise<AnalyticsForecasting> {
    const item = await this.repo.findAnalyticsForecastingById(schoolId, id);
    if (!item) throw new GovAnalyticsForecastingNotFoundError(id);
    return item;
  }

  async listAnalyticsForecastings(schoolId: string, filters?: Record<string, unknown>): Promise<AnalyticsForecasting[]> {
    return this.repo.findAllAnalyticsForecastings(schoolId, filters);
  }

  async createAnalyticsForecasting(schoolId: string, data: AnalyticsForecastingCreate): Promise<AnalyticsForecasting> {
    return this.repo.createAnalyticsForecasting(schoolId, data);
  }

  async updateAnalyticsForecasting(schoolId: string, id: string, data: Partial<AnalyticsForecastingCreate>): Promise<AnalyticsForecasting> {
    const existing = await this.repo.findAnalyticsForecastingById(schoolId, id);
    if (!existing) throw new GovAnalyticsForecastingNotFoundError(id);
    return this.repo.updateAnalyticsForecasting(schoolId, id, data);
  }

  async deleteAnalyticsForecasting(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAnalyticsForecastingById(schoolId, id);
    if (!existing) throw new GovAnalyticsForecastingNotFoundError(id);
    return this.repo.deleteAnalyticsForecasting(schoolId, id);
  }

  async countAnalyticsForecastings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAnalyticsForecastings(schoolId, filters);
  }
}
