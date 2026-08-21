// Enterprise Platform Service - MetricCollector
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { MetricCollector, MetricCollectorCreate } from '@educi/types';
import { EntMetricCollectorNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMetricCollectorService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMetricCollector(schoolId: string, id: string): Promise<MetricCollector> {
    const item = await this.repo.findMetricCollectorById(schoolId, id);
    if (!item) throw new EntMetricCollectorNotFoundError(id);
    return item;
  }
  async listMetricCollectors(schoolId: string, filters?: Record<string, unknown>): Promise<MetricCollector[]> {
    return this.repo.findAllMetricCollectors(schoolId, filters);
  }
  async createMetricCollector(schoolId: string, data: MetricCollectorCreate): Promise<MetricCollector> {
    return this.repo.createMetricCollector(schoolId, data);
  }
  async updateMetricCollector(schoolId: string, id: string, data: Partial<MetricCollectorCreate>): Promise<MetricCollector> {
    const existing = await this.repo.findMetricCollectorById(schoolId, id);
    if (!existing) throw new EntMetricCollectorNotFoundError(id);
    return this.repo.updateMetricCollector(schoolId, id, data);
  }
  async deleteMetricCollector(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMetricCollectorById(schoolId, id);
    if (!existing) throw new EntMetricCollectorNotFoundError(id);
    return this.repo.deleteMetricCollector(schoolId, id);
  }
  async countMetricCollectors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMetricCollectors(schoolId, filters);
  }
}
