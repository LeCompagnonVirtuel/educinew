// Enterprise Platform Service - AppStore
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAppStoreService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAppStore(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAppStoreById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAppStore(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAppStore(schoolId, filters);
  }
  async createAppStore(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAppStore(schoolId, data);
  }
  async updateAppStore(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAppStoreById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAppStore(schoolId, id, data);
  }
  async deleteAppStore(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAppStoreById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAppStore(schoolId, id);
  }
  async countAppStore(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAppStore(schoolId, filters);
  }
}
