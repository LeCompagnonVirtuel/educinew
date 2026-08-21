// Enterprise Platform Service - PlatformMetric
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformMetric, PlatformMetricCreate } from '@educi/types';
import { EntPlatformMetricNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformMetricService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformMetric(schoolId: string, id: string): Promise<PlatformMetric> {
    const item = await this.repo.findPlatformMetricById(schoolId, id);
    if (!item) throw new EntPlatformMetricNotFoundError(id);
    return item;
  }
  async listPlatformMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformMetric[]> {
    return this.repo.findAllPlatformMetrics(schoolId, filters);
  }
  async createPlatformMetric(schoolId: string, data: PlatformMetricCreate): Promise<PlatformMetric> {
    return this.repo.createPlatformMetric(schoolId, data);
  }
  async updatePlatformMetric(schoolId: string, id: string, data: Partial<PlatformMetricCreate>): Promise<PlatformMetric> {
    const existing = await this.repo.findPlatformMetricById(schoolId, id);
    if (!existing) throw new EntPlatformMetricNotFoundError(id);
    return this.repo.updatePlatformMetric(schoolId, id, data);
  }
  async deletePlatformMetric(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformMetricById(schoolId, id);
    if (!existing) throw new EntPlatformMetricNotFoundError(id);
    return this.repo.deletePlatformMetric(schoolId, id);
  }
  async countPlatformMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformMetrics(schoolId, filters);
  }
}
