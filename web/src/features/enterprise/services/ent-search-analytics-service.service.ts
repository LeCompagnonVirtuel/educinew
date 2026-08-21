// Enterprise Platform Service - SearchAnalytics
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SearchAnalytics, SearchAnalyticsCreate } from '@educi/types';
import { EntSearchAnalyticsNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSearchAnalyticsServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSearchAnalyticsService(schoolId: string, id: string): Promise<SearchAnalytics> {
    const item = await this.repo.findSearchAnalyticsServiceById(schoolId, id);
    if (!item) throw new EntSearchAnalyticsNotFoundError(id);
    return item;
  }
  async listSearchAnalyticsServices(schoolId: string, filters?: Record<string, unknown>): Promise<SearchAnalytics[]> {
    return this.repo.findAllSearchAnalyticsServices(schoolId, filters);
  }
  async createSearchAnalyticsService(schoolId: string, data: SearchAnalyticsCreate): Promise<SearchAnalytics> {
    return this.repo.createSearchAnalyticsService(schoolId, data);
  }
  async updateSearchAnalyticsService(schoolId: string, id: string, data: Partial<SearchAnalyticsCreate>): Promise<SearchAnalytics> {
    const existing = await this.repo.findSearchAnalyticsServiceById(schoolId, id);
    if (!existing) throw new EntSearchAnalyticsNotFoundError(id);
    return this.repo.updateSearchAnalyticsService(schoolId, id, data);
  }
  async deleteSearchAnalyticsService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSearchAnalyticsServiceById(schoolId, id);
    if (!existing) throw new EntSearchAnalyticsNotFoundError(id);
    return this.repo.deleteSearchAnalyticsService(schoolId, id);
  }
  async countSearchAnalyticsServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSearchAnalyticsServices(schoolId, filters);
  }
}
