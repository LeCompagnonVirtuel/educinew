// Enterprise Platform Service - FeatureFlagsMetrics
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFeatureFlagMetricService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFeatureFlagsMetric(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findFeatureFlagsMetricById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listFeatureFlagsMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllFeatureFlagsMetrics(schoolId, filters);
  }
  async createFeatureFlagsMetric(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createFeatureFlagsMetric(schoolId, data);
  }
  async updateFeatureFlagsMetric(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findFeatureFlagsMetricById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateFeatureFlagsMetric(schoolId, id, data);
  }
  async deleteFeatureFlagsMetric(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFeatureFlagsMetricById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteFeatureFlagsMetric(schoolId, id);
  }
  async countFeatureFlagsMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFeatureFlagsMetrics(schoolId, filters);
  }
}
