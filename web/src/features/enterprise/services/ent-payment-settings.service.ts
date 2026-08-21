// Enterprise Platform Service - PaymentSettings
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPaymentSettingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPaymentSetting(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPaymentSettingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPaymentSettings(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPaymentSettings(schoolId, filters);
  }
  async createPaymentSetting(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPaymentSetting(schoolId, data);
  }
  async updatePaymentSetting(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPaymentSettingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePaymentSetting(schoolId, id, data);
  }
  async deletePaymentSetting(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPaymentSettingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePaymentSetting(schoolId, id);
  }
  async countPaymentSettings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPaymentSettings(schoolId, filters);
  }
}
