// Enterprise Platform Service - AnalyticsSearch
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AnalyticsSearch, AnalyticsSearchCreate } from '@educi/types';
import { EntAnalyticsSearchNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAnalyticsSearchService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAnalyticsSearch(schoolId: string, id: string): Promise<AnalyticsSearch> {
    const item = await this.repo.findAnalyticsSearchById(schoolId, id);
    if (!item) throw new EntAnalyticsSearchNotFoundError(id);
    return item;
  }
  async listAnalyticsSearchs(schoolId: string, filters?: Record<string, unknown>): Promise<AnalyticsSearch[]> {
    return this.repo.findAllAnalyticsSearchs(schoolId, filters);
  }
  async createAnalyticsSearch(schoolId: string, data: AnalyticsSearchCreate): Promise<AnalyticsSearch> {
    return this.repo.createAnalyticsSearch(schoolId, data);
  }
  async updateAnalyticsSearch(schoolId: string, id: string, data: Partial<AnalyticsSearchCreate>): Promise<AnalyticsSearch> {
    const existing = await this.repo.findAnalyticsSearchById(schoolId, id);
    if (!existing) throw new EntAnalyticsSearchNotFoundError(id);
    return this.repo.updateAnalyticsSearch(schoolId, id, data);
  }
  async deleteAnalyticsSearch(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAnalyticsSearchById(schoolId, id);
    if (!existing) throw new EntAnalyticsSearchNotFoundError(id);
    return this.repo.deleteAnalyticsSearch(schoolId, id);
  }
  async countAnalyticsSearchs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAnalyticsSearchs(schoolId, filters);
  }
}
