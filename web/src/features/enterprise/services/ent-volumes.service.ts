// Enterprise Platform Service - Volumes
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntVolumeService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getVolume(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findVolumeById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listVolumes(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllVolumes(schoolId, filters);
  }
  async createVolume(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createVolume(schoolId, data);
  }
  async updateVolume(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findVolumeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateVolume(schoolId, id, data);
  }
  async deleteVolume(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVolumeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteVolume(schoolId, id);
  }
  async countVolumes(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVolumes(schoolId, filters);
  }
}
