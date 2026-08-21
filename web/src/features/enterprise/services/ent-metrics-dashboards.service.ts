// Enterprise Platform Service - MetricsDashboards
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMetricsDashboardService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMetricsDashboard(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findMetricsDashboardById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listMetricsDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllMetricsDashboards(schoolId, filters);
  }
  async createMetricsDashboard(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createMetricsDashboard(schoolId, data);
  }
  async updateMetricsDashboard(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findMetricsDashboardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateMetricsDashboard(schoolId, id, data);
  }
  async deleteMetricsDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMetricsDashboardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteMetricsDashboard(schoolId, id);
  }
  async countMetricsDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMetricsDashboards(schoolId, filters);
  }
}
