// Enterprise Platform Service - MetricsAggregation
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { MetricsAggregation, MetricsAggregationCreate } from '@educi/types';
import { EntMetricsAggregationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMetricsAggregationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMetricsAggregation(schoolId: string, id: string): Promise<MetricsAggregation> {
    const item = await this.repo.findMetricsAggregationById(schoolId, id);
    if (!item) throw new EntMetricsAggregationNotFoundError(id);
    return item;
  }
  async listMetricsAggregations(schoolId: string, filters?: Record<string, unknown>): Promise<MetricsAggregation[]> {
    return this.repo.findAllMetricsAggregations(schoolId, filters);
  }
  async createMetricsAggregation(schoolId: string, data: MetricsAggregationCreate): Promise<MetricsAggregation> {
    return this.repo.createMetricsAggregation(schoolId, data);
  }
  async updateMetricsAggregation(schoolId: string, id: string, data: Partial<MetricsAggregationCreate>): Promise<MetricsAggregation> {
    const existing = await this.repo.findMetricsAggregationById(schoolId, id);
    if (!existing) throw new EntMetricsAggregationNotFoundError(id);
    return this.repo.updateMetricsAggregation(schoolId, id, data);
  }
  async deleteMetricsAggregation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMetricsAggregationById(schoolId, id);
    if (!existing) throw new EntMetricsAggregationNotFoundError(id);
    return this.repo.deleteMetricsAggregation(schoolId, id);
  }
  async countMetricsAggregations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMetricsAggregations(schoolId, filters);
  }
}
