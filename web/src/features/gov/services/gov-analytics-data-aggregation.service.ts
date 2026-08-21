// Government & National Governance Service - AnalyticsDataAggregation
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AnalyticsDataAggregation, AnalyticsDataAggregationCreate } from '@educi/types';
import { GovAnalyticsDataAggregationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAnalyticsDataAggregationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAnalyticsDataAggregation(schoolId: string, id: string): Promise<AnalyticsDataAggregation> {
    const item = await this.repo.findAnalyticsDataAggregationById(schoolId, id);
    if (!item) throw new GovAnalyticsDataAggregationNotFoundError(id);
    return item;
  }

  async listAnalyticsDataAggregations(schoolId: string, filters?: Record<string, unknown>): Promise<AnalyticsDataAggregation[]> {
    return this.repo.findAllAnalyticsDataAggregations(schoolId, filters);
  }

  async createAnalyticsDataAggregation(schoolId: string, data: AnalyticsDataAggregationCreate): Promise<AnalyticsDataAggregation> {
    return this.repo.createAnalyticsDataAggregation(schoolId, data);
  }

  async updateAnalyticsDataAggregation(schoolId: string, id: string, data: Partial<AnalyticsDataAggregationCreate>): Promise<AnalyticsDataAggregation> {
    const existing = await this.repo.findAnalyticsDataAggregationById(schoolId, id);
    if (!existing) throw new GovAnalyticsDataAggregationNotFoundError(id);
    return this.repo.updateAnalyticsDataAggregation(schoolId, id, data);
  }

  async deleteAnalyticsDataAggregation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAnalyticsDataAggregationById(schoolId, id);
    if (!existing) throw new GovAnalyticsDataAggregationNotFoundError(id);
    return this.repo.deleteAnalyticsDataAggregation(schoolId, id);
  }

  async countAnalyticsDataAggregations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAnalyticsDataAggregations(schoolId, filters);
  }
}
