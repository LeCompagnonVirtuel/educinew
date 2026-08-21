// Enterprise Platform Service - SdkVersions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSdkVersionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSdkVersion(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSdkVersionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSdkVersions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSdkVersions(schoolId, filters);
  }
  async createSdkVersion(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSdkVersion(schoolId, data);
  }
  async updateSdkVersion(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSdkVersionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSdkVersion(schoolId, id, data);
  }
  async deleteSdkVersion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSdkVersionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSdkVersion(schoolId, id);
  }
  async countSdkVersions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSdkVersions(schoolId, filters);
  }
}
