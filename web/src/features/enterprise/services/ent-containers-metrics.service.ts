// Enterprise Platform Service - ContainersMetrics
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntContainerMetricService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getContainersMetric(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findContainersMetricById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listContainersMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllContainersMetrics(schoolId, filters);
  }
  async createContainersMetric(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createContainersMetric(schoolId, data);
  }
  async updateContainersMetric(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findContainersMetricById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateContainersMetric(schoolId, id, data);
  }
  async deleteContainersMetric(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findContainersMetricById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteContainersMetric(schoolId, id);
  }
  async countContainersMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countContainersMetrics(schoolId, filters);
  }
}
