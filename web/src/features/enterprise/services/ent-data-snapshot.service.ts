// Enterprise Platform Service - DataSnapshot
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataSnapshot, DataSnapshotCreate } from '@educi/types';
import { EntDataSnapshotNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataSnapshotService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataSnapshot(schoolId: string, id: string): Promise<DataSnapshot> {
    const item = await this.repo.findDataSnapshotById(schoolId, id);
    if (!item) throw new EntDataSnapshotNotFoundError(id);
    return item;
  }
  async listDataSnapshots(schoolId: string, filters?: Record<string, unknown>): Promise<DataSnapshot[]> {
    return this.repo.findAllDataSnapshots(schoolId, filters);
  }
  async createDataSnapshot(schoolId: string, data: DataSnapshotCreate): Promise<DataSnapshot> {
    return this.repo.createDataSnapshot(schoolId, data);
  }
  async updateDataSnapshot(schoolId: string, id: string, data: Partial<DataSnapshotCreate>): Promise<DataSnapshot> {
    const existing = await this.repo.findDataSnapshotById(schoolId, id);
    if (!existing) throw new EntDataSnapshotNotFoundError(id);
    return this.repo.updateDataSnapshot(schoolId, id, data);
  }
  async deleteDataSnapshot(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataSnapshotById(schoolId, id);
    if (!existing) throw new EntDataSnapshotNotFoundError(id);
    return this.repo.deleteDataSnapshot(schoolId, id);
  }
  async countDataSnapshots(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataSnapshots(schoolId, filters);
  }
}
