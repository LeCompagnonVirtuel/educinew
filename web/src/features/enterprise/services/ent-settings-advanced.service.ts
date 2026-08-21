// Enterprise Platform Service - SettingsAdvanced
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAdvancedSettingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSettingsAdvanced(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSettingsAdvancedById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSettingsAdvanced(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSettingsAdvanced(schoolId, filters);
  }
  async createSettingsAdvanced(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSettingsAdvanced(schoolId, data);
  }
  async updateSettingsAdvanced(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSettingsAdvancedById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSettingsAdvanced(schoolId, id, data);
  }
  async deleteSettingsAdvanced(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSettingsAdvancedById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSettingsAdvanced(schoolId, id);
  }
  async countSettingsAdvanced(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSettingsAdvanced(schoolId, filters);
  }
}
