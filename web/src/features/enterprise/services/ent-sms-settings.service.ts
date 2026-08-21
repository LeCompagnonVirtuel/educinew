// Enterprise Platform Service - SmsSettings
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSmsSettingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSmsSetting(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSmsSettingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSmsSettings(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSmsSettings(schoolId, filters);
  }
  async createSmsSetting(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSmsSetting(schoolId, data);
  }
  async updateSmsSetting(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSmsSettingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSmsSetting(schoolId, id, data);
  }
  async deleteSmsSetting(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSmsSettingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSmsSetting(schoolId, id);
  }
  async countSmsSettings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSmsSettings(schoolId, filters);
  }
}
