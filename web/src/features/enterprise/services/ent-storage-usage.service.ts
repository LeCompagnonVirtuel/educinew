// Enterprise Platform Service - StorageUsage
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntStorageUsageService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getStorageUsage(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findStorageUsageById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listStorageUsage(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllStorageUsage(schoolId, filters);
  }
  async createStorageUsage(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createStorageUsage(schoolId, data);
  }
  async updateStorageUsage(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findStorageUsageById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateStorageUsage(schoolId, id, data);
  }
  async deleteStorageUsage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findStorageUsageById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteStorageUsage(schoolId, id);
  }
  async countStorageUsage(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countStorageUsage(schoolId, filters);
  }
}
