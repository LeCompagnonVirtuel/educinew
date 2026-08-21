// Enterprise Platform Service - Settings
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSettingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSetting(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSettingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSettings(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSettings(schoolId, filters);
  }
  async createSetting(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSetting(schoolId, data);
  }
  async updateSetting(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSettingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSetting(schoolId, id, data);
  }
  async deleteSetting(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSettingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSetting(schoolId, id);
  }
  async countSettings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSettings(schoolId, filters);
  }
}
