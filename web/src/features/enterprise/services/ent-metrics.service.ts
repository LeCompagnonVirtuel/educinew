// Enterprise Platform Service - Metrics
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMetricService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMetric(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findMetricById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllMetrics(schoolId, filters);
  }
  async createMetric(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createMetric(schoolId, data);
  }
  async updateMetric(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findMetricById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateMetric(schoolId, id, data);
  }
  async deleteMetric(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMetricById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteMetric(schoolId, id);
  }
  async countMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMetrics(schoolId, filters);
  }
}
