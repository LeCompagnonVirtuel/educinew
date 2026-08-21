// Enterprise Platform Service - SecuritySettings
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSecuritySettingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSecuritySetting(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSecuritySettingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSecuritySettings(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSecuritySettings(schoolId, filters);
  }
  async createSecuritySetting(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSecuritySetting(schoolId, data);
  }
  async updateSecuritySetting(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSecuritySettingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSecuritySetting(schoolId, id, data);
  }
  async deleteSecuritySetting(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSecuritySettingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSecuritySetting(schoolId, id);
  }
  async countSecuritySettings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSecuritySettings(schoolId, filters);
  }
}
