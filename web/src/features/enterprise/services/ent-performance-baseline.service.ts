// Enterprise Platform Service - PerformanceBaseline
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PerformanceBaseline, PerformanceBaselineCreate } from '@educi/types';
import { EntPerformanceBaselineNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPerformanceBaselineService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPerformanceBaseline(schoolId: string, id: string): Promise<PerformanceBaseline> {
    const item = await this.repo.findPerformanceBaselineById(schoolId, id);
    if (!item) throw new EntPerformanceBaselineNotFoundError(id);
    return item;
  }
  async listPerformanceBaselines(schoolId: string, filters?: Record<string, unknown>): Promise<PerformanceBaseline[]> {
    return this.repo.findAllPerformanceBaselines(schoolId, filters);
  }
  async createPerformanceBaseline(schoolId: string, data: PerformanceBaselineCreate): Promise<PerformanceBaseline> {
    return this.repo.createPerformanceBaseline(schoolId, data);
  }
  async updatePerformanceBaseline(schoolId: string, id: string, data: Partial<PerformanceBaselineCreate>): Promise<PerformanceBaseline> {
    const existing = await this.repo.findPerformanceBaselineById(schoolId, id);
    if (!existing) throw new EntPerformanceBaselineNotFoundError(id);
    return this.repo.updatePerformanceBaseline(schoolId, id, data);
  }
  async deletePerformanceBaseline(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPerformanceBaselineById(schoolId, id);
    if (!existing) throw new EntPerformanceBaselineNotFoundError(id);
    return this.repo.deletePerformanceBaseline(schoolId, id);
  }
  async countPerformanceBaselines(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPerformanceBaselines(schoolId, filters);
  }
}
