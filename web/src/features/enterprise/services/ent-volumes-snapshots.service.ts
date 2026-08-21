// Enterprise Platform Service - VolumesSnapshots
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntVolumeSnapshotService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getVolumesSnapshot(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findVolumesSnapshotById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listVolumesSnapshots(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllVolumesSnapshots(schoolId, filters);
  }
  async createVolumesSnapshot(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createVolumesSnapshot(schoolId, data);
  }
  async updateVolumesSnapshot(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findVolumesSnapshotById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateVolumesSnapshot(schoolId, id, data);
  }
  async deleteVolumesSnapshot(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVolumesSnapshotById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteVolumesSnapshot(schoolId, id);
  }
  async countVolumesSnapshots(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVolumesSnapshots(schoolId, filters);
  }
}
