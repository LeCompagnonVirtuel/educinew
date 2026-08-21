// Enterprise Platform Service - AppStoreVersions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAppVersionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAppStoreVersion(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAppStoreVersionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAppStoreVersions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAppStoreVersions(schoolId, filters);
  }
  async createAppStoreVersion(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAppStoreVersion(schoolId, data);
  }
  async updateAppStoreVersion(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAppStoreVersionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAppStoreVersion(schoolId, id, data);
  }
  async deleteAppStoreVersion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAppStoreVersionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAppStoreVersion(schoolId, id);
  }
  async countAppStoreVersions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAppStoreVersions(schoolId, filters);
  }
}
