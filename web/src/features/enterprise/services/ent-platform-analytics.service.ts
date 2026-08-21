// Enterprise Platform Service - PlatformAnalytics
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformAnalytics, PlatformAnalyticsCreate } from '@educi/types';
import { EntPlatformAnalyticsNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformAnalyticsService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformAnalytics(schoolId: string, id: string): Promise<PlatformAnalytics> {
    const item = await this.repo.findPlatformAnalyticsById(schoolId, id);
    if (!item) throw new EntPlatformAnalyticsNotFoundError(id);
    return item;
  }
  async listPlatformAnalyticss(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformAnalytics[]> {
    return this.repo.findAllPlatformAnalyticss(schoolId, filters);
  }
  async createPlatformAnalytics(schoolId: string, data: PlatformAnalyticsCreate): Promise<PlatformAnalytics> {
    return this.repo.createPlatformAnalytics(schoolId, data);
  }
  async updatePlatformAnalytics(schoolId: string, id: string, data: Partial<PlatformAnalyticsCreate>): Promise<PlatformAnalytics> {
    const existing = await this.repo.findPlatformAnalyticsById(schoolId, id);
    if (!existing) throw new EntPlatformAnalyticsNotFoundError(id);
    return this.repo.updatePlatformAnalytics(schoolId, id, data);
  }
  async deletePlatformAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformAnalyticsById(schoolId, id);
    if (!existing) throw new EntPlatformAnalyticsNotFoundError(id);
    return this.repo.deletePlatformAnalytics(schoolId, id);
  }
  async countPlatformAnalyticss(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformAnalyticss(schoolId, filters);
  }
}
