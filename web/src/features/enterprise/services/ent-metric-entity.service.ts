// Enterprise Platform Service - MetricEntity
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { MetricEntity, MetricEntityCreate } from '@educi/types';
import { EntMetricNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMetricEntityService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMetricEntity(schoolId: string, id: string): Promise<MetricEntity> {
    const item = await this.repo.findMetricEntityById(schoolId, id);
    if (!item) throw new EntMetricNotFoundError(id);
    return item;
  }
  async listMetricEntitys(schoolId: string, filters?: Record<string, unknown>): Promise<MetricEntity[]> {
    return this.repo.findAllMetricEntitys(schoolId, filters);
  }
  async createMetricEntity(schoolId: string, data: MetricEntityCreate): Promise<MetricEntity> {
    return this.repo.createMetricEntity(schoolId, data);
  }
  async updateMetricEntity(schoolId: string, id: string, data: Partial<MetricEntityCreate>): Promise<MetricEntity> {
    const existing = await this.repo.findMetricEntityById(schoolId, id);
    if (!existing) throw new EntMetricNotFoundError(id);
    return this.repo.updateMetricEntity(schoolId, id, data);
  }
  async deleteMetricEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMetricEntityById(schoolId, id);
    if (!existing) throw new EntMetricNotFoundError(id);
    return this.repo.deleteMetricEntity(schoolId, id);
  }
  async countMetricEntitys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMetricEntitys(schoolId, filters);
  }
}
