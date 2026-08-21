// Enterprise Platform Service - SettingsGeneral
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntGeneralSettingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSettingsGeneral(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSettingsGeneralById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSettingsGeneral(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSettingsGeneral(schoolId, filters);
  }
  async createSettingsGeneral(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSettingsGeneral(schoolId, data);
  }
  async updateSettingsGeneral(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSettingsGeneralById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSettingsGeneral(schoolId, id, data);
  }
  async deleteSettingsGeneral(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSettingsGeneralById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSettingsGeneral(schoolId, id);
  }
  async countSettingsGeneral(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSettingsGeneral(schoolId, filters);
  }
}
