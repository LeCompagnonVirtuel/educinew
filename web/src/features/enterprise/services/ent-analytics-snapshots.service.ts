// Enterprise Platform Service - AnalyticsSnapshots
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAnalyticsSnapshotService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAnalyticsSnapshot(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAnalyticsSnapshotById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAnalyticsSnapshots(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAnalyticsSnapshots(schoolId, filters);
  }
  async createAnalyticsSnapshot(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAnalyticsSnapshot(schoolId, data);
  }
  async updateAnalyticsSnapshot(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAnalyticsSnapshotById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAnalyticsSnapshot(schoolId, id, data);
  }
  async deleteAnalyticsSnapshot(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAnalyticsSnapshotById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAnalyticsSnapshot(schoolId, id);
  }
  async countAnalyticsSnapshots(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAnalyticsSnapshots(schoolId, filters);
  }
}
