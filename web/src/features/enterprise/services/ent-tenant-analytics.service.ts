// Enterprise Platform Service - TenantAnalytics
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantAnalytics, TenantAnalyticsCreate } from '@educi/types';
import { EntTenantAnalyticsNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantAnalyticsService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantAnalytics(schoolId: string, id: string): Promise<TenantAnalytics> {
    const item = await this.repo.findTenantAnalyticsById(schoolId, id);
    if (!item) throw new EntTenantAnalyticsNotFoundError(id);
    return item;
  }
  async listTenantAnalyticss(schoolId: string, filters?: Record<string, unknown>): Promise<TenantAnalytics[]> {
    return this.repo.findAllTenantAnalyticss(schoolId, filters);
  }
  async createTenantAnalytics(schoolId: string, data: TenantAnalyticsCreate): Promise<TenantAnalytics> {
    return this.repo.createTenantAnalytics(schoolId, data);
  }
  async updateTenantAnalytics(schoolId: string, id: string, data: Partial<TenantAnalyticsCreate>): Promise<TenantAnalytics> {
    const existing = await this.repo.findTenantAnalyticsById(schoolId, id);
    if (!existing) throw new EntTenantAnalyticsNotFoundError(id);
    return this.repo.updateTenantAnalytics(schoolId, id, data);
  }
  async deleteTenantAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantAnalyticsById(schoolId, id);
    if (!existing) throw new EntTenantAnalyticsNotFoundError(id);
    return this.repo.deleteTenantAnalytics(schoolId, id);
  }
  async countTenantAnalyticss(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantAnalyticss(schoolId, filters);
  }
}
