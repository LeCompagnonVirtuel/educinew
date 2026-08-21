// Enterprise Platform Service - SearchAnalytics
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SearchAnalytics, SearchAnalyticsCreate } from '@educi/types';
import { EntSearchAnalyticsNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSearchAnalyticsService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSearchAnalytics(schoolId: string, id: string): Promise<SearchAnalytics> {
    const item = await this.repo.findSearchAnalyticsById(schoolId, id);
    if (!item) throw new EntSearchAnalyticsNotFoundError(id);
    return item;
  }
  async listSearchAnalyticss(schoolId: string, filters?: Record<string, unknown>): Promise<SearchAnalytics[]> {
    return this.repo.findAllSearchAnalyticss(schoolId, filters);
  }
  async createSearchAnalytics(schoolId: string, data: SearchAnalyticsCreate): Promise<SearchAnalytics> {
    return this.repo.createSearchAnalytics(schoolId, data);
  }
  async updateSearchAnalytics(schoolId: string, id: string, data: Partial<SearchAnalyticsCreate>): Promise<SearchAnalytics> {
    const existing = await this.repo.findSearchAnalyticsById(schoolId, id);
    if (!existing) throw new EntSearchAnalyticsNotFoundError(id);
    return this.repo.updateSearchAnalytics(schoolId, id, data);
  }
  async deleteSearchAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSearchAnalyticsById(schoolId, id);
    if (!existing) throw new EntSearchAnalyticsNotFoundError(id);
    return this.repo.deleteSearchAnalytics(schoolId, id);
  }
  async countSearchAnalyticss(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSearchAnalyticss(schoolId, filters);
  }
}
