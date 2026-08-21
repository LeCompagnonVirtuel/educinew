// Enterprise Platform Service - EmailSettings
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntEmailSettingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getEmailSetting(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findEmailSettingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listEmailSettings(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllEmailSettings(schoolId, filters);
  }
  async createEmailSetting(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createEmailSetting(schoolId, data);
  }
  async updateEmailSetting(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findEmailSettingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateEmailSetting(schoolId, id, data);
  }
  async deleteEmailSetting(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEmailSettingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteEmailSetting(schoolId, id);
  }
  async countEmailSettings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEmailSettings(schoolId, filters);
  }
}
