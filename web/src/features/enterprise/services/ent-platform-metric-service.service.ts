// Enterprise Platform Service - PlatformMetric
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformMetric, PlatformMetricCreate } from '@educi/types';
import { EntPlatformMetricNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformMetricServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformMetricService(schoolId: string, id: string): Promise<PlatformMetric> {
    const item = await this.repo.findPlatformMetricServiceById(schoolId, id);
    if (!item) throw new EntPlatformMetricNotFoundError(id);
    return item;
  }
  async listPlatformMetricServices(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformMetric[]> {
    return this.repo.findAllPlatformMetricServices(schoolId, filters);
  }
  async createPlatformMetricService(schoolId: string, data: PlatformMetricCreate): Promise<PlatformMetric> {
    return this.repo.createPlatformMetricService(schoolId, data);
  }
  async updatePlatformMetricService(schoolId: string, id: string, data: Partial<PlatformMetricCreate>): Promise<PlatformMetric> {
    const existing = await this.repo.findPlatformMetricServiceById(schoolId, id);
    if (!existing) throw new EntPlatformMetricNotFoundError(id);
    return this.repo.updatePlatformMetricService(schoolId, id, data);
  }
  async deletePlatformMetricService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformMetricServiceById(schoolId, id);
    if (!existing) throw new EntPlatformMetricNotFoundError(id);
    return this.repo.deletePlatformMetricService(schoolId, id);
  }
  async countPlatformMetricServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformMetricServices(schoolId, filters);
  }
}
