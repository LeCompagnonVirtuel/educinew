// Enterprise Platform Service - AnalyticsSnapshotsDimensions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAnalyticsDimensionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAnalyticsSnapshotsDimension(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAnalyticsSnapshotsDimensionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAnalyticsSnapshotsDimensions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAnalyticsSnapshotsDimensions(schoolId, filters);
  }
  async createAnalyticsSnapshotsDimension(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAnalyticsSnapshotsDimension(schoolId, data);
  }
  async updateAnalyticsSnapshotsDimension(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAnalyticsSnapshotsDimensionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAnalyticsSnapshotsDimension(schoolId, id, data);
  }
  async deleteAnalyticsSnapshotsDimension(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAnalyticsSnapshotsDimensionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAnalyticsSnapshotsDimension(schoolId, id);
  }
  async countAnalyticsSnapshotsDimensions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAnalyticsSnapshotsDimensions(schoolId, filters);
  }
}
