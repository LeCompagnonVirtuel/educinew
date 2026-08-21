// Enterprise Platform Service - AnalyticsSnapshotsMeasures
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAnalyticsMeasureService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAnalyticsSnapshotsMeasure(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAnalyticsSnapshotsMeasureById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAnalyticsSnapshotsMeasures(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAnalyticsSnapshotsMeasures(schoolId, filters);
  }
  async createAnalyticsSnapshotsMeasure(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAnalyticsSnapshotsMeasure(schoolId, data);
  }
  async updateAnalyticsSnapshotsMeasure(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAnalyticsSnapshotsMeasureById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAnalyticsSnapshotsMeasure(schoolId, id, data);
  }
  async deleteAnalyticsSnapshotsMeasure(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAnalyticsSnapshotsMeasureById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAnalyticsSnapshotsMeasure(schoolId, id);
  }
  async countAnalyticsSnapshotsMeasures(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAnalyticsSnapshotsMeasures(schoolId, filters);
  }
}
