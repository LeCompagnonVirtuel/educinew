// Enterprise Platform Service - Snapshots
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSnapshotService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSnapshot(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSnapshotById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSnapshots(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSnapshots(schoolId, filters);
  }
  async createSnapshot(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSnapshot(schoolId, data);
  }
  async updateSnapshot(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSnapshotById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSnapshot(schoolId, id, data);
  }
  async deleteSnapshot(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSnapshotById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSnapshot(schoolId, id);
  }
  async countSnapshots(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSnapshots(schoolId, filters);
  }
}
